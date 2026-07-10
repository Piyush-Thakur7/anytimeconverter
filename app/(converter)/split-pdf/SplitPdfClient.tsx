'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { splitPDF } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';

export default function SplitPdfClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pdfSplitRange, setPdfSplitRange] = useState('1-2');
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

    const pdfFiles = filesList.filter(file => file.name.toLowerCase().endsWith('.pdf'));
    if (pdfFiles.length === 0) {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }

    setUploadedFiles([pdfFiles[0]]); // Only process one PDF at a time
  };

  const handleClear = () => {
    setUploadedFiles([]);
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

    if (!pdfSplitRange.trim()) {
      setErrorMsg('Please enter a page range (e.g. 1-2, 4).');
      return;
    }

    setIsProcessing(true);
    setProgress(30);
    setErrorMsg('');

    try {
      setProgress(60);
      const splitBlob = await splitPDF(uploadedFiles[0], pdfSplitRange);
      setProgress(90);

      const outName = `split_${uploadedFiles[0].name}`;
      setProgress(100);
      setDownloadBlob(splitBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'Split PDF');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during PDF splitting. Make sure the page numbers are valid.');
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

  return (
    <main className="pt-24 pb-12 animate-fade-in">
      <ToolLayout
        title="Split PDF pages online — free and private"
        description="Extract specific pages or custom page ranges from your PDF document into a new file. Runs entirely locally in your browser for maximum privacy."
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
        <div className="flex flex-col space-y-1 text-left">
          <label className="text-xs font-bold text-foreground/75" htmlFor="pdf-split-range">
            Page Range (e.g. 1-3, 5)
          </label>
          <input
            id="pdf-split-range"
            type="text"
            value={pdfSplitRange}
            onChange={(e) => setPdfSplitRange(e.target.value)}
            placeholder="e.g. 1-2, 4"
            className="bg-card border border-card-border rounded px-3 py-2 text-xs w-48 focus:outline-none focus:border-accent text-foreground font-semibold"
          />
          <p className="text-[10px] text-foreground/50 pt-0.5">Enter comma-separated single page numbers or page ranges with hyphens.</p>
        </div>
      </ToolLayout>
    </main>
  );
}
