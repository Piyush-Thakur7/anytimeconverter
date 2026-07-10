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

    // Append to existing list
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

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setSuccess(false);
    setDownloadBlob(null);
  };

  const handleMoveFile = (idx: number, direction: 'up' | 'down') => {
    const nextList = [...uploadedFiles];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= nextList.length) return;
    
    // Swap
    const temp = nextList[idx];
    nextList[idx] = nextList[targetIdx];
    nextList[targetIdx] = temp;
    
    setUploadedFiles(nextList);
    setSuccess(false);
    setDownloadBlob(null);
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
        title="Merge PDF files online — free and private"
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
        onRemoveFile={handleRemoveFile}
      >
        {uploadedFiles.length > 1 && (
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-foreground/75 block border-b border-card-border pb-1 mb-2">
              Arrange Merge Sequence
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-card border border-card-border text-xs">
                  <span className="truncate font-semibold text-foreground">{idx + 1}. {file.name}</span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => handleMoveFile(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 px-2 bg-accent text-white text-[10px] font-bold rounded hover:bg-accent-hover transition-colors disabled:opacity-40 cursor-pointer"
                      title="Move Up"
                    >
                      &uarr;
                    </button>
                    <button
                      onClick={() => handleMoveFile(idx, 'down')}
                      disabled={idx === uploadedFiles.length - 1}
                      className="p-1 px-2 bg-accent text-white text-[10px] font-bold rounded hover:bg-accent-hover transition-colors disabled:opacity-40 cursor-pointer"
                      title="Move Down"
                    >
                      &darr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-foreground/50 pt-0.5">Use the arrows to adjust the sequence of documents before merging.</p>
          </div>
        )}
      </ToolLayout>
    </main>
  );
}
