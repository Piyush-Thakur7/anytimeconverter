'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { mergePDFs } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';

export default function MergePdfClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
      setErrorMsg('Please upload valid PDF files.');
      return;
    }

    // Append to existing list if multiple files selected
    setUploadedFiles(prev => [...prev, ...pdfFiles]);
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
    if (uploadedFiles.length < 2) {
      setErrorMsg('Please upload at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setProgress(30);
    setErrorMsg('');

    try {
      setProgress(60);
      const mergedBlob = await mergePDFs(uploadedFiles);
      setProgress(90);

      const outName = 'merged_documents.pdf';
      setProgress(100);
      setDownloadBlob(mergedBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'Merge PDF');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during PDF merging.');
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
        title="Merge PDF Files Free"
        description="Combine two or more PDF documents into a single PDF file instantly. No file uploads, no page limits, and 100% private local execution."
        accept=".pdf"
        multiple={true}
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
      />
    </main>
  );
}
