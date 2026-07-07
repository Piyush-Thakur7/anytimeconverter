'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { addHistoryItem } from '@/lib/history';

let pdfjsLib: any = null;
if (typeof window !== 'undefined') {
  pdfjsLib = require('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
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

  const handleFilesSelected = (filesList: File[]) => {
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setExtractedText('');

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

    try {
      const arrayBuffer = await uploadedFiles[0].arrayBuffer();
      setProgress(40);
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      const numPages = pdf.numPages;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Group items that are on similar vertical positions or just join with space
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
          
        fullText += `[Page ${pageNum}]\n${pageText}\n\n`;
        setProgress(Math.round(40 + (pageNum / numPages) * 50));
      }

      if (!fullText.trim()) {
        throw new Error('Could not extract any text from this PDF file (it might be scanned/image-only).');
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-24 pb-12 animate-fade-in">
      <ToolLayout
        title="Extract text from PDF online — free and private"
        description="Extract raw text layout from any PDF document instantly. Runs entirely in your browser to safeguard your sensitive documents. Copy text directly or download as a text file."
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
        {/* Custom display of extracted text */}
        {extractedText && (
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-card-border pb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                Extracted Text Contents
              </span>
              <button
                onClick={handleCopyToClipboard}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-background-subtle border border-card-border hover:border-accent text-accent rounded transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            <textarea
              readOnly
              value={extractedText}
              className="w-full h-64 p-3 bg-background border border-card-border rounded text-xs text-foreground/80 focus:outline-none font-mono resize-none"
            />
          </div>
        )}
      </ToolLayout>
    </main>
  );
}
