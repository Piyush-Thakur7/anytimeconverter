'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { docxToPdf } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';

export default function WordToPdfClient() {
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

    const validFiles = filesList.filter(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return ext === '.docx' || ext === '.txt';
    });

    if (validFiles.length === 0) {
      setErrorMsg('Please upload a valid Word document (.docx) or Text file (.txt).');
      return;
    }

    setUploadedFiles([validFiles[0]]); // Only process one document at a time
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
      setErrorMsg('Please upload a Word or text document first.');
      return;
    }

    setIsProcessing(true);
    setProgress(30);
    setErrorMsg('');

    try {
      setProgress(60);
      const pdfBlob = await docxToPdf(uploadedFiles[0]);
      setProgress(90);

      const outName = `${uploadedFiles[0].name.replace(/\.[^/.]+$/, '')}.pdf`;
      setProgress(100);
      setDownloadBlob(pdfBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'Word to PDF');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during Word-to-PDF conversion.');
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
        title="Convert Word to PDF online — free and private"
        description="Convert your Microsoft Word (.docx) or plain text (.txt) files into clean, readable PDF documents. Completely client-side — your document contents never touch a server."
        accept=".docx,.txt"
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
      />
    </main>
  );
}
