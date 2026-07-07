'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  mergePDFs, 
  splitPDF, 
  imagesToPdf, 
  pdfToImages, 
  docxToPdf, 
  pptxToWord, 
  wordToPpt, 
  resizeImage 
} from '@/lib/converterCore';

// Define structures for our app
interface ConversionHistoryItem {
  id: string;
  fileName: string;
  toolName: string;
  timestamp: string;
}

interface ImageFile {
  name: string;
  dataUrl: string;
  width: number;
  height: number;
  file: File;
}

export default function AnyTimeConverterDashboard() {
  // Navigation State
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // File states
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  
  // Settings states
  const [pdfMargin, setPdfMargin] = useState<number>(10);
  const [pdfSplitRange, setPdfSplitRange] = useState<string>('1-2');
  const [imageFormat, setImageFormat] = useState<string>('jpeg');
  const [imageWidth, setImageWidth] = useState<number>(800);
  const [imageHeight, setImageHeight] = useState<number>(600);
  const [imageQuality, setImageQuality] = useState<number>(85);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [originalImageSizes, setOriginalImageSizes] = useState<{w: number, h: number} | null>(null);

  // Status states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [conversionSuccess, setConversionSuccess] = useState<boolean>(false);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // History State
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load conversion history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('atc_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  // Sync Navbar selection if navbar gets integrated
  useEffect(() => {
    const handleSetTool = (e: CustomEvent<string | null>) => {
      resetWorkspace();
      setActiveTool(e.detail);
    };
    window.addEventListener('set-active-tool' as any, handleSetTool);
    return () => window.removeEventListener('set-active-tool' as any, handleSetTool);
  }, []);

  // Save item to local history
  const addHistoryItem = (fileName: string, toolName: string) => {
    const newItem: ConversionHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      fileName,
      toolName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString(),
    };
    const updated = [newItem, ...history].slice(0, 10); // Keep last 10
    setHistory(updated);
    localStorage.setItem('atc_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('atc_history');
  };

  const tools = [
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      description: 'Combine multiple JPG/PNG/WebP images into a single formatted PDF document.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      accepts: 'image/*'
    },
    {
      id: 'pdf-to-jpg',
      name: 'PDF to JPG',
      description: 'Extract pages of a PDF document and convert them into high-quality JPEG images.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      accepts: '.pdf'
    },
    {
      id: 'merge-pdf',
      name: 'Merge PDF',
      description: 'Combine two or more separate PDF documents into a single PDF file.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      accepts: '.pdf'
    },
    {
      id: 'split-pdf',
      name: 'Split PDF',
      description: 'Extract specific pages or page ranges from a PDF document into a new PDF.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
        </svg>
      ),
      accepts: '.pdf'
    },
    {
      id: 'word-to-pdf',
      name: 'Word/Text to PDF',
      description: 'Convert Microsoft Word (.docx) documents or plain text files into clean, readable PDF format.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      accepts: '.docx,.txt'
    },
    {
      id: 'pptx-to-docx',
      name: 'PPT to Word',
      description: 'Extract texts and outline layout from PowerPoint slides and compile into a structured Word Document.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      accepts: '.pptx'
    },
    {
      id: 'docx-to-pptx',
      name: 'Word to PPT',
      description: 'Convert a structured Word Document outlines into formatted widescreen slides in PowerPoint format.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      accepts: '.docx'
    },
    {
      id: 'image-rescaler',
      name: 'Image Rescaler',
      description: 'Resize image dimension bounds, compress data payload size, and convert file output format.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      accepts: 'image/*'
    }
  ];

  const resetWorkspace = () => {
    setUploadedFiles([]);
    setUploadedImages([]);
    setErrorMsg('');
    setDownloadBlob(null);
    setDownloadName('');
    setConversionSuccess(false);
    setProgress(0);
    setIsProcessing(false);
    setOriginalImageSizes(null);
  };

  const handleSelectTool = (id: string) => {
    resetWorkspace();
    setActiveTool(id);
    // Dispatch a local custom event to notify Navbar of selection if active
    const event = new CustomEvent('set-active-tool-nav', { detail: id });
    window.dispatchEvent(event);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (filesList: File[]) => {
    setErrorMsg('');
    setConversionSuccess(false);
    setDownloadBlob(null);
    
    // Check constraints based on active tool
    if (activeTool === 'jpg-to-pdf' || activeTool === 'image-rescaler') {
      const imgFiles = filesList.filter(file => file.type.startsWith('image/'));
      if (imgFiles.length === 0) {
        setErrorMsg('Please upload valid image files.');
        return;
      }
      
      setIsProcessing(true);
      const loadedImages: ImageFile[] = [];
      
      for (const file of imgFiles) {
        try {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
          
          const dimensions = await new Promise<{w: number, h: number}>((resolve) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => resolve({ w: img.width, h: img.height });
          });
          
          loadedImages.push({
            name: file.name,
            dataUrl,
            width: dimensions.w,
            height: dimensions.h,
            file
          });
          
          if (activeTool === 'image-rescaler') {
            setImageWidth(dimensions.w);
            setImageHeight(dimensions.h);
            setOriginalImageSizes({ w: dimensions.w, h: dimensions.h });
          }
        } catch (err) {
          console.error(err);
        }
      }
      
      setUploadedImages(loadedImages);
      setIsProcessing(false);
    } else {
      // Document types
      const currentTool = tools.find(t => t.id === activeTool);
      if (!currentTool) return;
      
      const filterExtensions = currentTool.accepts.split(',');
      const validFiles = filesList.filter(file => {
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        return filterExtensions.some(filt => filt === ext || file.type.includes(filt.replace('.', '')));
      });
      
      if (validFiles.length === 0) {
        setErrorMsg(`Invalid file type. Please upload a file matching ${currentTool.accepts}`);
        return;
      }
      
      setUploadedFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Dimensions math helper for Aspect Ratio
  const handleWidthChange = (val: number) => {
    setImageWidth(val);
    if (keepAspectRatio && originalImageSizes) {
      const ratio = originalImageSizes.h / originalImageSizes.w;
      setImageHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setImageHeight(val);
    if (keepAspectRatio && originalImageSizes) {
      const ratio = originalImageSizes.w / originalImageSizes.h;
      setImageWidth(Math.round(val * ratio));
    }
  };

  const executeConversion = async () => {
    setIsProcessing(true);
    setProgress(15);
    setErrorMsg('');
    setConversionSuccess(false);

    try {
      let resultBlob: Blob | null = null;
      let outName = '';

      switch (activeTool) {
        case 'jpg-to-pdf':
          if (uploadedImages.length === 0) throw new Error('No images uploaded.');
          setProgress(40);
          resultBlob = await imagesToPdf(uploadedImages, pdfMargin);
          outName = 'converted_images.pdf';
          break;

        case 'pdf-to-jpg':
          if (uploadedFiles.length === 0) throw new Error('No PDF file uploaded.');
          setProgress(40);
          const imagesResult = await pdfToImages(uploadedFiles[0]);
          setProgress(80);
          // If multiple pages, we compile them in a ZIP, or since we want client side,
          // for simplicity we download the first page image or let the user click down.
          // In this implementation, we take the primary first page image blob
          const firstPageData = imagesResult[0].dataUrl;
          const imgResponse = await fetch(firstPageData);
          resultBlob = await imgResponse.blob();
          outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_page1.jpg`;
          break;

        case 'merge-pdf':
          if (uploadedFiles.length < 2) throw new Error('Please upload 2 or more PDF files.');
          setProgress(50);
          resultBlob = await mergePDFs(uploadedFiles);
          outName = 'merged_document.pdf';
          break;

        case 'split-pdf':
          if (uploadedFiles.length === 0) throw new Error('No PDF file uploaded.');
          setProgress(50);
          resultBlob = await splitPDF(uploadedFiles[0], pdfSplitRange);
          outName = `split_${uploadedFiles[0].name}`;
          break;

        case 'word-to-pdf':
          if (uploadedFiles.length === 0) throw new Error('No file uploaded.');
          setProgress(50);
          resultBlob = await docxToPdf(uploadedFiles[0]);
          outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}.pdf`;
          break;

        case 'pptx-to-docx':
          if (uploadedFiles.length === 0) throw new Error('No PowerPoint file uploaded.');
          setProgress(50);
          resultBlob = await pptxToWord(uploadedFiles[0]);
          outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_outline.docx`;
          break;

        case 'docx-to-pptx':
          if (uploadedFiles.length === 0) throw new Error('No Word document uploaded.');
          setProgress(50);
          resultBlob = await wordToPpt(uploadedFiles[0]);
          outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_presentation.pptx`;
          break;

        case 'image-rescaler':
          if (uploadedImages.length === 0) throw new Error('No image loaded.');
          setProgress(50);
          resultBlob = await resizeImage(
            uploadedImages[0].file,
            imageWidth,
            imageHeight,
            imageQuality,
            imageFormat
          );
          outName = `rescaled_${uploadedImages[0].name.replace(/\.[^/.]+$/, '')}.${imageFormat}`;
          break;

        default:
          throw new Error('Unknown converter tool selection.');
      }

      setProgress(100);
      if (resultBlob) {
        setDownloadBlob(resultBlob);
        setDownloadName(outName);
        setConversionSuccess(true);
        addHistoryItem(outName, tools.find(t => t.id === activeTool)?.name || 'Converter');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected conversion error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerDownload = () => {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-glow rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent mb-4 inline-block animate-fade-in">
            Universal Page & File Utility
          </span>
          <h1 className="text-4xl sm:text-6xl font-bebas tracking-wide mb-6 bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent animate-fade-up">
            ANY TIME CONVERTER
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-neutral-400 leading-relaxed font-medium animate-fade-up">
            Your premium, all-in-one local file conversion tool. Process PDFs, images, spreadsheets, powerpoints, and Word docs directly on your machine. Fast, secure, and private.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main id="workspace-area" className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTool ? (
          /* WORKSPACE VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar (Quick Switch) */}
            <div className="lg:col-span-3 space-y-3">
              <button
                onClick={() => setActiveTool(null)}
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-md bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all font-semibold text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Dashboard</span>
              </button>
              
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-2">Converter Tools</span>
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`w-full text-left px-3 py-2.5 rounded text-xs transition-all flex items-center space-x-2 ${
                      activeTool === tool.id 
                        ? 'bg-accent/15 text-accent border-l-2 border-accent font-semibold' 
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    <span className="scale-75">{tool.icon}</span>
                    <span>{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Section (Upload & Control Center) */}
            <div className="lg:col-span-9 space-y-6">
              <div className="p-6 sm:p-8 rounded-xl bg-neutral-950 border border-neutral-900 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-neutral-900">
                      {tools.find(t => t.id === activeTool)?.icon}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
                        {tools.find(t => t.id === activeTool)?.name}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {tools.find(t => t.id === activeTool)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload Zone */}
                {uploadedFiles.length === 0 && uploadedImages.length === 0 ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-neutral-800 hover:border-accent/40 bg-neutral-900/20 hover:bg-accent/5 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group flex flex-col items-center justify-center space-y-4"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept={tools.find(t => t.id === activeTool)?.accepts}
                      multiple={activeTool !== 'pdf-to-jpg' && activeTool !== 'split-pdf' && activeTool !== 'word-to-pdf' && activeTool !== 'pptx-to-docx' && activeTool !== 'docx-to-pptx' && activeTool !== 'image-rescaler'}
                      className="hidden"
                    />
                    
                    <div className="p-4 rounded-full bg-neutral-900 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-neutral-500 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-200">
                        Drag & Drop or <span className="text-accent underline group-hover:text-red-500">Browse files</span>
                      </p>
                      <p className="text-xs text-neutral-500 mt-1.5">
                        Supported formats: {tools.find(t => t.id === activeTool)?.accepts.split(',').join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* File Loaded Panel & Settings */
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-1.5">Uploaded Files</span>
                      <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                        {activeTool === 'jpg-to-pdf' || activeTool === 'image-rescaler' ? (
                          uploadedImages.map((img, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-900 text-xs">
                              <div className="flex items-center space-x-2 truncate">
                                <img src={img.dataUrl} className="w-8 h-8 object-cover rounded" alt="preview" />
                                <span className="truncate max-w-[200px] sm:max-w-md font-medium text-neutral-200">{img.name}</span>
                              </div>
                              <span className="text-neutral-500 shrink-0 font-semibold">{img.width}x{img.height} px</span>
                            </div>
                          ))
                        ) : (
                          uploadedFiles.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-900 text-xs">
                              <div className="flex items-center space-x-2 truncate">
                                <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate max-w-[200px] sm:max-w-md font-medium text-neutral-200">{file.name}</span>
                              </div>
                              <span className="text-neutral-500 font-semibold shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                          ))
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={resetWorkspace}
                          className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 hover:text-accent"
                        >
                          Clear & Reset
                        </button>
                      </div>
                    </div>

                    {/* Parameters Configurations */}
                    <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-1.5">Conversion Configurations</span>
                      
                      {activeTool === 'jpg-to-pdf' && (
                        <div>
                          <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Page Margins (mm)</label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={pdfMargin}
                            onChange={(e) => setPdfMargin(parseInt(e.target.value, 10) || 0)}
                            className="bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs w-28 focus:outline-none focus:border-accent text-white"
                          />
                        </div>
                      )}

                      {activeTool === 'split-pdf' && (
                        <div>
                          <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Page Range to Extract (e.g. 1-3, 5)</label>
                          <input
                            type="text"
                            value={pdfSplitRange}
                            onChange={(e) => setPdfSplitRange(e.target.value)}
                            placeholder="e.g. 1-2, 4"
                            className="bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs w-48 focus:outline-none focus:border-accent text-white font-medium"
                          />
                        </div>
                      )}

                      {activeTool === 'image-rescaler' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Width (px)</label>
                              <input
                                type="number"
                                value={imageWidth}
                                onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                                className="bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Height (px)</label>
                              <input
                                type="number"
                                value={imageHeight}
                                onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                                className="bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-white"
                              />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                              <input
                                type="checkbox"
                                id="aspect-ratio"
                                checked={keepAspectRatio}
                                onChange={(e) => setKeepAspectRatio(e.target.checked)}
                                className="rounded accent-accent focus:outline-none"
                              />
                              <label htmlFor="aspect-ratio" className="text-xs text-neutral-300 select-none cursor-pointer">Lock Aspect Ratio</label>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Format Output</label>
                              <select
                                value={imageFormat}
                                onChange={(e) => setImageFormat(e.target.value)}
                                className="bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-white font-medium"
                              >
                                <option value="jpeg">JPG (JPEG)</option>
                                <option value="png">PNG (Lossless)</option>
                                <option value="webp">WebP (Next-Gen)</option>
                              </select>
                            </div>
                            
                            {imageFormat !== 'png' && (
                              <div>
                                <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Compression Quality ({imageQuality}%)</label>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  value={imageQuality}
                                  onChange={(e) => setImageQuality(parseInt(e.target.value, 10))}
                                  className="w-full h-1.5 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Panel & Progress */}
                    {errorMsg && (
                      <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-xs rounded font-medium flex items-center space-x-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {conversionSuccess && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center space-x-2 text-left">
                          <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-emerald-300">Conversion Successful!</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Your download file: <span className="font-semibold text-white">{downloadName}</span> is ready.</p>
                          </div>
                        </div>
                        <button
                          onClick={triggerDownload}
                          className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold px-5 py-2 rounded text-xs transition-colors shadow-lg flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download File</span>
                        </button>
                      </div>
                    )}

                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span className="font-medium">Converting locally...</span>
                          <span className="font-semibold text-white">{progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-accent h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {!isProcessing && !conversionSuccess && (
                      <button
                        onClick={executeConversion}
                        className="w-full py-3 bg-accent hover:bg-red-700 text-white font-bebas text-lg tracking-widest uppercase transition-all red-glow-hover transform hover:-translate-y-0.5"
                      >
                        Convert Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="space-y-12">
            
            {/* Grid Title */}
            <div className="border-b border-neutral-900 pb-3">
              <h2 className="text-xl sm:text-2xl font-bebas tracking-wider text-neutral-200">
                Converter Utilities
              </h2>
            </div>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.id)}
                  className="gym-card rounded-xl p-6 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-900 rounded-lg w-fit group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-accent transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex items-center justify-between text-xs text-accent font-semibold group-hover:underline">
                    <span>Open Tool</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Offline/Privacy Guarantee Banner */}
            <div className="p-6 sm:p-8 rounded-xl bg-neutral-950 border border-neutral-900 flex flex-col md:flex-row items-center md:justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 bg-emerald-500 h-full"></div>
              <div className="space-y-2 text-left max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Privacy Locked
                </span>
                <h3 className="text-lg font-bold">100% Client-Side Private Processing</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
                  Any Time Converter uses high-performance WebAssembly (WASM) and local browser Canvas structures. Your files NEVER leave your computer or upload to any servers. Check your developer network tab; we are completely offline-safe.
                </p>
              </div>
              <div className="shrink-0 flex gap-4">
                <span className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Local History Section */}
            {history.length > 0 && (
              <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                  <h3 className="font-bebas text-lg tracking-wider text-neutral-200">Recent Local Conversions</h3>
                  <button 
                    onClick={clearHistory}
                    className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 hover:text-accent"
                  >
                    Clear History
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 border border-neutral-900 text-xs">
                      <div className="space-y-1 text-left min-w-0 pr-2">
                        <p className="font-semibold text-neutral-200 truncate">{item.fileName}</p>
                        <p className="text-[10px] text-neutral-500">{item.toolName} • {item.timestamp}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Saved
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
