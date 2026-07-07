'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { addHistoryItem } from '@/lib/history';
import JSZip from 'jszip';

export default function CompressFileClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<number>(6);
  const [zipName, setZipName] = useState<string>('compressed_files.zip');

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState('');

  const [originalTotalSize, setOriginalTotalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleFilesSelected = (filesList: File[]) => {
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);

    // Append to existing files list
    setUploadedFiles(prev => [...prev, ...filesList]);
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setDownloadName('');
    setProgress(0);
    setOriginalTotalSize(0);
    setCompressedSize(0);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setSuccess(false);
    setDownloadBlob(null);
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      setErrorMsg('Please upload at least one file to compress.');
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setErrorMsg('');
    setSuccess(false);

    try {
      const zip = new JSZip();
      
      // Calculate total original size
      const totalOrigSize = uploadedFiles.reduce((acc, f) => acc + f.size, 0);
      setOriginalTotalSize(totalOrigSize);

      // Add each file to ZIP archive
      for (const file of uploadedFiles) {
        zip.file(file.name, file);
      }

      // Generate zip locally with DEFLATE compression
      const finalName = zipName.toLowerCase().endsWith('.zip') ? zipName : `${zipName}.zip`;
      
      const zipBlob = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: {
            level: compressionLevel
          }
        },
        (metadata) => {
          setProgress(Math.round(5 + metadata.percent * 0.95));
        }
      );

      setCompressedSize(zipBlob.size);
      setProgress(100);
      setDownloadBlob(zipBlob);
      setDownloadName(finalName);
      setSuccess(true);
      addHistoryItem(finalName, 'File Compressor');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during file compression.');
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

  const getCompressionInfo = () => {
    if (originalTotalSize === 0) return null;
    const saved = originalTotalSize - compressedSize;
    const percentage = Math.max(0, Math.round((saved / originalTotalSize) * 100));
    
    return {
      origStr: (originalTotalSize / 1024).toFixed(1) + ' KB',
      compStr: (compressedSize / 1024).toFixed(1) + ' KB',
      percentage,
      savedStr: (saved / 1024).toFixed(1) + ' KB'
    };
  };

  const info = getCompressionInfo();

  return (
    <main className="pt-24 pb-12 animate-fade-in">
      <ToolLayout
        title="Compress files online — free and private"
        description="Pack and compress multiple documents, photos, or media files of any format into a secure, space-saving ZIP archive locally inside your browser."
        accept="*/*"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-foreground/75" htmlFor="zip-filename">
              Output Archive Name
            </label>
            <input
              id="zip-filename"
              type="text"
              value={zipName}
              onChange={(e) => setZipName(e.target.value)}
              placeholder="compressed_files.zip"
              className="bg-card border border-card-border rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-foreground font-semibold"
            />
            <p className="text-[10px] text-foreground/50 pt-0.5">Specify the name of the output .zip archive file.</p>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-foreground/75" htmlFor="zip-level">
              Compression Level
            </label>
            <select
              id="zip-level"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(parseInt(e.target.value, 10))}
              className="bg-card border border-card-border rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-foreground font-semibold"
            >
              <option value="1">Level 1 (Fastest, Larger Size)</option>
              <option value="3">Level 3 (Fast, Reduced Size)</option>
              <option value="6">Level 6 (Normal, Balanced - Default)</option>
              <option value="9">Level 9 (Maximum, Slowest, Best Compression)</option>
            </select>
            <p className="text-[10px] text-foreground/50 pt-0.5">Higher levels offer better space reduction but take longer to process.</p>
          </div>

        </div>

        {/* Compression summary panel */}
        {success && info && (
          <div className="mt-5 p-4 rounded-lg bg-accent-bg/40 border border-accent/15 text-left text-xs space-y-2">
            <span className="font-bold text-accent uppercase tracking-wider text-[10px] block">Compression Report</span>
            <div className="grid grid-cols-3 gap-4 font-semibold text-foreground/80">
              <div>
                <p className="text-[10px] text-foreground/50">Original Size</p>
                <p className="text-sm font-bold">{info.origStr}</p>
              </div>
              <div>
                <p className="text-[10px] text-foreground/50">Compressed Size</p>
                <p className="text-sm font-bold text-accent">{info.compStr}</p>
              </div>
              <div>
                <p className="text-[10px] text-foreground/50">Space Saved</p>
                <p className="text-sm font-bold text-accent">{info.percentage}% ({info.savedStr})</p>
              </div>
            </div>
          </div>
        )}
      </ToolLayout>
    </main>
  );
}
