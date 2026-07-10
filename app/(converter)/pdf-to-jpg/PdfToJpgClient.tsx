'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { pdfToImages } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';
import JSZip from 'jszip';

interface ExtractedPage {
  pageNumber: number;
  dataUrl: string;
}

export default function PdfToJpgClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedPages, setExtractedPages] = useState<ExtractedPage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState('');

  const handleFilesSelected = (filesList: File[]) => {
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setExtractedPages([]);
    
    const pdfFiles = filesList.filter(file => file.name.toLowerCase().endsWith('.pdf'));
    if (pdfFiles.length === 0) {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }

    setUploadedFiles([pdfFiles[0]]); // Only process one PDF at a time
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setExtractedPages([]);
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setDownloadName('');
    setProgress(0);
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      setErrorMsg('Please upload a PDF file first.');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setErrorMsg('');

    try {
      setProgress(40);
      const pages = await pdfToImages(uploadedFiles[0]);
      setProgress(70);
      setExtractedPages(pages);

      let outBlob: Blob;
      let outName = '';

      if (pages.length === 1) {
        // Single page, download JPG directly
        const imgResponse = await fetch(pages[0].dataUrl);
        outBlob = await imgResponse.blob();
        outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_page1.jpg`;
      } else {
        // Multiple pages, zip them
        const zip = new JSZip();
        pages.forEach((page) => {
          const base64Data = page.dataUrl.split(',')[1];
          zip.file(`page_${page.pageNumber}.jpg`, base64Data, { base64: true });
        });
        setProgress(90);
        outBlob = await zip.generateAsync({ type: 'blob' });
        outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_pages.zip`;
      }

      setProgress(100);
      setDownloadBlob(outBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'PDF to JPG');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during PDF-to-images conversion.');
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

  const downloadSinglePage = (page: ExtractedPage) => {
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}_page_${page.pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="pt-24 pb-12 animate-fade-in">
      <ToolLayout
        title="Convert PDF to JPG online — free and private"
        description="Convert your PDF document into high-quality JPEG images instantly. View page previews and download individual sheets or grab all pages in a single ZIP."
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
        {/* Custom Render for PDF Pages Extracted */}
        {extractedPages.length > 0 && (
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 block border-b border-card-border pb-1.5">
              Extracted Pages ({extractedPages.length})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-1">
              {extractedPages.map((page) => (
                <div key={page.pageNumber} className="group relative rounded border border-card-border overflow-hidden bg-background">
                  <img src={page.dataUrl} className="w-full h-32 object-contain bg-neutral-100 dark:bg-neutral-800" alt={`page ${page.pageNumber}`} />
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => downloadSinglePage(page)}
                      className="px-2 py-1 bg-accent text-white text-[10px] font-bold rounded shadow hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      Download JPG
                    </button>
                  </div>
                  <div className="bg-background-subtle py-1 px-2 border-t border-card-border text-[10px] font-bold text-center text-foreground/75">
                    Page {page.pageNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ToolLayout>
    </main>
  );
}
