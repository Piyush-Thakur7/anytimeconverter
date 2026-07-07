import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';
import * as docx from 'docx';
import JSZip from 'jszip';
import pptxgen from 'pptxgenjs';

// Setup pdfjs worker using a reliable CDN path matching the installed version
let pdfjsLib: any = null;
if (typeof window !== 'undefined') {
  pdfjsLib = require('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';
}

/**
 * Merge multiple PDF files into one.
 */
export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
}

/**
 * Split a PDF file by ranges (e.g. "1, 3-5").
 */
export async function splitPDF(file: File, rangeText: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();
  
  const selectedPages: number[] = [];
  const parts = rangeText.split(',');
  
  for (const part of parts) {
    const cleanPart = part.trim();
    if (cleanPart.includes('-')) {
      const [startStr, endStr] = cleanPart.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            selectedPages.push(i - 1); // 0-indexed
          }
        }
      }
    } else {
      const val = parseInt(cleanPart, 10);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        selectedPages.push(val - 1);
      }
    }
  }
  
  if (selectedPages.length === 0) {
    throw new Error('No valid pages selected.');
  }

  const splitPdf = await PDFDocument.create();
  const copiedPages = await splitPdf.copyPages(pdfDoc, selectedPages);
  copiedPages.forEach((page) => splitPdf.addPage(page));
  
  const splitPdfBytes = await splitPdf.save();
  return new Blob([splitPdfBytes as any], { type: 'application/pdf' });
}

/**
 * Convert images to a single PDF document.
 */
export async function imagesToPdf(
  images: { name: string; dataUrl: string; width: number; height: number }[],
  margin = 10
): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  for (let i = 0; i < images.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }
    
    const img = images[i];
    
    // Scale image to fit A4 page while maintaining aspect ratio
    const maxWidth = pdfWidth - margin * 2;
    const maxHeight = pdfHeight - margin * 2;
    
    let w = img.width;
    let h = img.height;
    
    const ratio = w / h;
    
    if (w > maxWidth) {
      w = maxWidth;
      h = w / ratio;
    }
    if (h > maxHeight) {
      h = maxHeight;
      w = h * ratio;
    }
    
    // Center it on page
    const x = margin + (maxWidth - w) / 2;
    const y = margin + (maxHeight - h) / 2;
    
    // Guess type from base64 data url
    let format = 'JPEG';
    if (img.dataUrl.includes('image/png')) format = 'PNG';
    if (img.dataUrl.includes('image/webp')) format = 'WEBP';
    
    pdf.addImage(img.dataUrl, format, x, y, w, h);
  }
  
  const pdfBlob = pdf.output('blob');
  return pdfBlob;
}

/**
 * Convert PDF to individual images of pages.
 */
export async function pdfToImages(file: File): Promise<{ pageNumber: number; dataUrl: string }[]> {
  if (!pdfjsLib) throw new Error('PDF.js not loaded.');
  
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const result: { pageNumber: number; dataUrl: string }[] = [];
  
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for high quality
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    result.push({ pageNumber: pageNum, dataUrl });
  }
  
  return result;
}

/**
 * Word (DOCX) to PDF.
 * Extracts text/layout via mammoth and creates a formatted PDF via jsPDF.
 */
export async function docxToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Extract text content using mammoth
  const parseResult = await mammoth.extractRawText({ arrayBuffer });
  const textContent = parseResult.value;
  
  if (!textContent.trim()) {
    throw new Error('The Word document appears to be empty.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const margin = 20;
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const maxLineWidth = pdfWidth - margin * 2;
  const pageLimit = pdfHeight - margin;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  
  // Process paragraph splits and word wrapping
  const paragraphs = textContent.split('\n');
  let cursorY = margin;
  
  for (const para of paragraphs) {
    if (!para.trim()) {
      cursorY += 6; // paragraph spacer
      continue;
    }
    
    const lines = pdf.splitTextToSize(para, maxLineWidth);
    
    for (const line of lines) {
      if (cursorY + 6 > pageLimit) {
        pdf.addPage();
        cursorY = margin;
      }
      pdf.text(line, margin, cursorY);
      cursorY += 6;
    }
    cursorY += 4; // space after paragraph
  }
  
  return pdf.output('blob');
}

/**
 * PPTX to Word (DOCX)
 * Unzips PPTX using JSZip, reads slide XML files, extracts raw text content, and builds a DOCX.
 */
export async function pptxToWord(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  
  // Find all slide XML files
  const slideFiles = Object.keys(zip.files)
    .filter((name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, ''), 10);
      const numB = parseInt(b.replace(/[^0-9]/g, ''), 10);
      return numA - numB;
    });
    
  if (slideFiles.length === 0) {
    throw new Error('No slides found in the PowerPoint presentation.');
  }
  
  const parsedSlides: { title: string; content: string[] }[] = [];
  const parser = new DOMParser();
  
  for (let idx = 0; idx < slideFiles.length; idx++) {
    const xmlText = await zip.files[slideFiles[idx]].async('string');
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    
    // In pptx, text runs are stored in <a:t> elements inside paragraph <a:p> elements
    // Let's group texts by paragraphs to maintain structure
    const pElements = xmlDoc.getElementsByTagName('a:p');
    const paragraphsList: string[] = [];
    
    for (let pIdx = 0; pIdx < pElements.length; pIdx++) {
      const pNode = pElements[pIdx];
      const tElements = pNode.getElementsByTagName('a:t');
      const textRun = Array.from(tElements)
        .map((el) => el.textContent)
        .filter(Boolean)
        .join('');
        
      if (textRun.trim()) {
        paragraphsList.push(textRun.trim());
      }
    }
    
    // We treat the first substantial paragraph as the slide title, rest as content
    const title = paragraphsList.length > 0 ? paragraphsList[0] : `Slide ${idx + 1}`;
    const content = paragraphsList.length > 1 ? paragraphsList.slice(1) : [];
    
    parsedSlides.push({ title, content });
  }

  // Create a structured DOCX document using docx library
  const docSections = parsedSlides.map((slide, sIdx) => {
    const children: any[] = [
      new docx.Paragraph({
        text: `Slide ${sIdx + 1}: ${slide.title}`,
        heading: docx.HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      }),
    ];
    
    if (slide.content.length > 0) {
      slide.content.forEach((bullet) => {
        children.push(
          new docx.Paragraph({
            text: bullet,
            bullet: { level: 0 },
            spacing: { before: 80, after: 80 },
          })
        );
      });
    } else {
      children.push(
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: '[Empty Slide]',
              italics: true,
            }),
          ],
          spacing: { before: 80, after: 80 },
        })
      );
    }
    
    // Add page break after slides, except the last one
    if (sIdx < parsedSlides.length - 1) {
      children.push(new docx.Paragraph({ children: [new docx.PageBreak()] }));
    }
    
    return children;
  }).flat();
  
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            text: 'PowerPoint Slide Content Extraction',
            heading: docx.HeadingLevel.HEADING_1,
            alignment: docx.AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          ...docSections,
        ],
      },
    ],
  });
  
  const blob = await docx.Packer.toBlob(doc);
  return blob;
}

/**
 * Word (DOCX) to PowerPoint (PPTX)
 * Extracts paragraphs from DOCX via mammoth and makes structured slides using pptxgenjs.
 */
export async function wordToPpt(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Extract paragraphs (separate text by newlines)
  const parseResult = await mammoth.extractRawText({ arrayBuffer });
  const textContent = parseResult.value;
  
  if (!textContent.trim()) {
    throw new Error('The Word document is empty.');
  }
  
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  
  // Add a Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { fill: '1A1A1A' };
  titleSlide.addText(file.name.replace(/\.[^/.]+$/, ''), {
    x: 0.5,
    y: 2.2,
    w: '90%',
    h: 1.5,
    fontSize: 32,
    color: 'FFFFFF',
    fontFace: 'Helvetica',
    align: 'center',
    bold: true,
  });
  titleSlide.addText('Converted from Word via FlexConvert', {
    x: 0.5,
    y: 3.8,
    w: '90%',
    h: 0.8,
    fontSize: 16,
    color: 'e11d2e',
    fontFace: 'Helvetica',
    align: 'center',
  });

  const lines = textContent.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  
  let currentSlideTitle = '';
  let bulletPoints: string[] = [];
  
  const addSlideToPresentation = (title: string, bullets: string[]) => {
    const slide = pptx.addSlide();
    slide.background = { fill: '121212' };
    
    // Slide Header banner
    slide.addText(title || 'Content Slide', {
      x: 0.5,
      y: 0.5,
      w: '90%',
      h: 0.8,
      fontSize: 24,
      color: 'FFFFFF',
      fontFace: 'Helvetica',
      bold: true,
    });
    
    // Add glowing accent border line under title
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.3,
      w: 12.33, // 16:9 widescreen layout width minus margins
      h: 0.04,
      fill: { color: 'e11d2e' },
    });
    
    // Process bullets
    if (bullets.length > 0) {
      const textObjects = bullets.map((bp) => ({
        text: bp,
        options: { bullet: true, valign: 'top' as any, color: 'CCCCCC' },
      }));
      
      slide.addText(textObjects, {
        x: 0.5,
        y: 1.6,
        w: '90%',
        h: 4.8,
        fontSize: 14,
        fontFace: 'Helvetica',
        lineSpacing: 22,
      });
    } else {
      slide.addText('[No slide content]', {
        x: 0.5,
        y: 1.6,
        w: '90%',
        h: 1.0,
        fontSize: 14,
        fontFace: 'Helvetica',
        color: '666666',
        italic: true,
      });
    }
  };

  // We group text into slides. Lines starting with numbers, dashes, or short lines could denote titles.
  // Standard heuristic: short sentences or headings become slide titles, and following lines become bullets.
  for (const line of lines) {
    // If it's a short line (less than 60 characters) and doesn't end with a period, it's likely a heading/slide title
    const isHeading = line.length < 60 && !line.endsWith('.') && !line.includes(', ');
    
    if (isHeading) {
      if (currentSlideTitle || bulletPoints.length > 0) {
        addSlideToPresentation(currentSlideTitle, bulletPoints);
      }
      currentSlideTitle = line;
      bulletPoints = [];
    } else {
      // Add as bullet point
      bulletPoints.push(line);
      
      // If we collect more than 6 bullet points, split onto a new slide to prevent text overflow
      if (bulletPoints.length >= 6) {
        addSlideToPresentation(currentSlideTitle, bulletPoints);
        bulletPoints = [];
        // Keep the heading same, it will append (Contd.) on next cycle if it runs over
        if (!currentSlideTitle.endsWith('(Contd.)')) {
          currentSlideTitle += ' (Contd.)';
        }
      }
    }
  }
  
  // Flush remaining content
  if (currentSlideTitle || bulletPoints.length > 0) {
    addSlideToPresentation(currentSlideTitle, bulletPoints);
  }
  
  const blob = await pptx.write({ outputType: 'blob' }) as Blob;
  return blob;
}

/**
 * Rescale, resize and compress an image file.
 */
export function resizeImage(
  file: File,
  width: number,
  height: number,
  quality: number,
  format: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas 2D context'));
          return;
        }
        
        // Draw image onto canvas scaling to new dimensions
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export to Blob
        const mimeType = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas export to blob failed'));
            }
          },
          mimeType,
          format === 'png' ? undefined : quality / 100
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image file'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read image file'));
  });
}

/**
 * Convert a list of images to a PowerPoint presentation (.pptx), one image per slide.
 */
export async function imagesToPpt(
  images: { name: string; dataUrl: string; width: number; height: number }[],
  options: { orientation: '16x9' | '4x3'; fitMode: 'contain' | 'cover' }
): Promise<Blob> {
  const pptx = new pptxgen();
  
  // Set layout
  pptx.layout = options.orientation === '4x3' ? 'LAYOUT_4x3' : 'LAYOUT_16x9';
  
  // Slide dimensions in inches:
  // 16:9 -> 10 x 5.625 inches
  // 4:3 -> 10 x 7.5 inches
  const slideWidth = 10;
  const slideHeight = options.orientation === '4x3' ? 7.5 : 5.625;

  for (const img of images) {
    const slide = pptx.addSlide();
    slide.background = { fill: 'FFFFFF' }; // White background for clean look
    
    slide.addImage({
      data: img.dataUrl,
      x: 0,
      y: 0,
      w: slideWidth,
      h: slideHeight,
      sizing: {
        type: options.fitMode,
        w: slideWidth,
        h: slideHeight
      }
    });
  }

  const blob = await pptx.write({ outputType: 'blob' }) as Blob;
  return blob;
}

