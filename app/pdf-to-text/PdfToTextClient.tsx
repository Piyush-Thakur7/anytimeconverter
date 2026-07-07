'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { addHistoryItem } from '@/lib/history';
import { pdfToImages } from '@/lib/converterCore';
import { createWorker } from 'tesseract.js';

let pdfjsLib: any = null;
if (typeof window !== 'undefined') {
  pdfjsLib = require('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';
}

export default function PdfToTextClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showOcrPrompt, setShowOcrPrompt] = useState(false);

  const handleFilesSelected = (filesList: File[]) => {
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setExtractedText('');
    setShowOcrPrompt(false);

    const pdfFiles = filesList.filter(file => file.name.toLowerCase().endsWith('.pdf'));
    if (pdfFiles.length === 0) {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }

    setUploadedFiles([pdfFiles[0]]); // Only process one PDF at a time
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setExtractedText('');
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setDownloadName('');
    setProgress(0);
    setCopied(false);
    setShowOcrPrompt(false);
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      setErrorMsg('Please upload a PDF file first.');
      return;
    }

    if (!pdfjsLib) {
      setErrorMsg('PDF library is not initialized yet. Please try again.');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setErrorMsg('');
    setExtractedText('');
    setShowOcrPrompt(false);

    try {
      const arrayBuffer = await uploadedFiles[0].arrayBuffer();
      setProgress(40);
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      const numPages = pdf.numPages;
      let actualContentFound = false;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
          
        if (pageText.trim().length > 0) {
          actualContentFound = true;
        }
          
        fullText += `[Page ${pageNum}]\n${pageText}\n\n`;
        setProgress(Math.round(40 + (pageNum / numPages) * 50));
      }

      if (!actualContentFound) {
        setShowOcrPrompt(true);
        throw new Error(
          'This PDF appears to be a scanned image or photo with no selectable text. ' +
          'Text extraction only works on PDFs with real embedded text (not scanned documents).'
        );
      }

      setExtractedText(fullText);
      const textBlob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
      const outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_extracted.txt`;

      setProgress(100);
      setDownloadBlob(textBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'PDF to Text');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during text extraction.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunOcr = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsProcessing(true);
    setProgress(10);
    setErrorMsg('');
    setExtractedText('');
    setShowOcrPrompt(false);

    try {
      // Step 1: Render PDF pages to images
      const images = await pdfToImages(uploadedFiles[0]);
      setProgress(25);

      if (images.length === 0) {
        throw new Error('Failed to render PDF pages into images.');
      }

      // Step 2: Initialize Tesseract.js Worker locally
      const worker = await createWorker('eng', 1, {
        workerPath: '/assets/tesseract/worker.min.js',
        langPath: '/assets/tesseract',
        corePath: '/assets/tesseract/',
      });

      setProgress(40);
      let ocrText = '';
      const numPages = images.length;

      // Step 3: Run OCR page-by-page
      for (let i = 0; i < numPages; i++) {
        const { data: { text } } = await worker.recognize(images[i].dataUrl);
        ocrText += `[Page ${i + 1} - OCR Extracted]\n${text}\n\n`;
        setProgress(Math.round(40 + ((i + 1) / numPages) * 55));
      }

      await worker.terminate();

      if (!ocrText.trim()) {
        throw new Error('OCR completed but failed to extract any readable characters.');
      }

      setExtractedText(ocrText);
      const textBlob = new Blob([ocrText], { type: 'text/plain;charset=utf-8' });
      const outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_ocr_extracted.txt`;

      setProgress(100);
      setDownloadBlob(textBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'PDF to Text (OCR)');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during OCR text extraction.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadBlob) return;
    const url = URL.createObjectURL(downloadBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-24 pb-12 animate-fade-in">
      <ToolLayout
        title="Extract text from PDF online — free and private"
        description="Pull selectable text from any PDF document. Works fully in your browser — files are never uploaded to any server."
        accept=".pdf"
        multiple={false}
        uploadedFiles={uploadedFiles}
        isProcessing={isProcessing}
        progress={progress}
        success={success}
        errorMsg={errorMsg}
        downloadName={downloadName}
        onFilesSelected={handleFilesSelected}
        onClear={handleClear}
        onConvert={handleConvert}
        onDownload={handleDownload}
      >
        {/* Custom Settings Config */}
        {showOcrPrompt && !isProcessing && (
          <div className="p-4 bg-accent-bg/40 border border-accent/15 rounded-lg flex flex-col items-center space-y-3 text-center">
            <svg className="w-6 h-6 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="space-y-1">
              <p className="text-xs text-foreground/80 font-bold">
                No selectable text layer found. Would you like to run optical character recognition (OCR) instead?
              </p>
              <p className="text-[10px] text-foreground/50 leading-relaxed font-semibold">
                OCR extracts text from image data locally inside your browser. No server calls are made. 
                Best results are achieved with clear, high-resolution scans.
              </p>
            </div>
            <button
              onClick={handleRunOcr}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded shadow transition-colors cursor-pointer"
            >
              Run Local OCR
            </button>
          </div>
        )}

        {extractedText && (
          <div className="space-y-3 pt-4 border-t border-card-border text-left">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                Extracted Text Output
              </span>
              <button
                onClick={handleCopy}
                className="text-[10px] uppercase tracking-wider font-bold text-accent hover:underline cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <textarea
              readOnly
              value={extractedText}
              className="w-full h-48 bg-background-subtle border border-card-border rounded p-3 text-xs focus:outline-none text-foreground/80 font-mono font-medium resize-none"
            />
          </div>
        )}
      </ToolLayout>
    </main>
  );
}
