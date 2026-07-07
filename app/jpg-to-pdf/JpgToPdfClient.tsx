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

    setUploadedFiles(imgFiles);
    setUploadedImages(loadedImages);
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
      >
        {/* Custom Settings Config */}
        <div className="flex flex-col space-y-1 text-left">
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
      </ToolLayout>
    </main>
  );
}
