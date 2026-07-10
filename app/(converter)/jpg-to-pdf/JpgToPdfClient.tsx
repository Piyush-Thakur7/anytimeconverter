'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { imagesToPdf } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';

interface ImageFile {
  name: string;
  dataUrl: string;
  width: number;
  height: number;
  file: File;
}

export default function JpgToPdfClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const [pdfMargin, setPdfMargin] = useState<number>(10);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState('');

  const handleFilesSelected = async (filesList: File[]) => {
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    
    const imgFiles = filesList.filter(file => file.type.startsWith('image/'));
    if (imgFiles.length === 0) {
      setErrorMsg('Please upload valid image files (JPG, PNG, or WebP).');
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

        const dimensions = await new Promise<{ w: number; h: number }>((resolve) => {
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
      } catch (err) {
        console.error(err);
      }
    }

    setUploadedFiles(prev => [...prev, ...imgFiles]);
    setUploadedImages(prev => [...prev, ...loadedImages]);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setUploadedImages([]);
    setErrorMsg('');
    setSuccess(false);
    setDownloadBlob(null);
    setDownloadName('');
    setProgress(0);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setSuccess(false);
    setDownloadBlob(null);
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= uploadedImages.length) return;
    
    const updated = [...uploadedImages];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    
    setUploadedImages(updated);
    setSuccess(false);
    setDownloadBlob(null);
  };

  const handleConvert = async () => {
    if (uploadedImages.length === 0) {
      setErrorMsg('Please upload at least one image first.');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setErrorMsg('');

    try {
      setProgress(50);
      const pdfBlob = await imagesToPdf(uploadedImages, pdfMargin);
      setProgress(85);
      
      const outName = uploadedImages.length === 1 
        ? `${uploadedImages[0].name.replace(/\.[^/.]+$/, '')}.pdf`
        : 'converted_images.pdf';

      setProgress(100);
      setDownloadBlob(pdfBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'JPG to PDF');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during image-to-PDF conversion.');
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
        title="Convert JPG to PDF online — free and private"
        description="Combine and convert your images (JPG, PNG, WebP) into a high-quality PDF document instantly. All conversions run locally inside your browser for total privacy."
        accept="image/*"
        multiple={true}
        uploadedFiles={uploadedFiles}
        uploadedImages={uploadedImages}
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
        <div className="space-y-4 text-left">
          {/* Custom Settings Config */}
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-foreground/75" htmlFor="pdf-margin">
              Page Margins (mm)
            </label>
            <input
              id="pdf-margin"
              type="number"
              min="0"
              max="50"
              value={pdfMargin}
              onChange={(e) => setPdfMargin(parseInt(e.target.value, 10) || 0)}
              className="bg-card border border-card-border rounded px-3 py-2 text-xs w-28 focus:outline-none focus:border-accent text-foreground font-semibold"
            />
            <p className="text-[10px] text-foreground/50 pt-0.5">Define empty margins around each page of the generated PDF file.</p>
          </div>

          {/* Reordering Preview Panel */}
          {uploadedImages.length > 1 && (
            <div className="space-y-3 pt-4 border-t border-card-border">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 block">
                Adjust Page Sequence
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="group relative rounded border border-card-border overflow-hidden bg-background">
                    <img src={img.dataUrl} className="w-full h-24 object-contain bg-neutral-100 dark:bg-neutral-800" alt={`page ${idx + 1}`} />
                    
                    {/* Reorder Buttons Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5">
                      <button
                        onClick={() => handleMoveImage(idx, 'left')}
                        disabled={idx === 0}
                        className="p-1 px-2 bg-accent text-white text-xs font-bold rounded hover:bg-accent-hover transition-colors disabled:opacity-40 cursor-pointer"
                        title="Move Left"
                      >
                        &larr;
                      </button>
                      <button
                        onClick={() => handleMoveImage(idx, 'right')}
                        disabled={idx === uploadedImages.length - 1}
                        className="p-1 px-2 bg-accent text-white text-xs font-bold rounded hover:bg-accent-hover transition-colors disabled:opacity-40 cursor-pointer"
                        title="Move Right"
                      >
                        &rarr;
                      </button>
                    </div>
                    
                    <div className="bg-background-subtle py-1 px-2 border-t border-card-border text-[9px] font-bold text-center text-foreground/75">
                      Page {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-foreground/50 pt-0.5">Hover over previews and use arrows to arrange document pages.</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </main>
  );
}
