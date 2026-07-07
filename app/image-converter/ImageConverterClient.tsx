'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { resizeImage } from '@/lib/converterCore';
import { addHistoryItem } from '@/lib/history';

interface ImageFile {
  name: string;
  dataUrl: string;
  width: number;
  height: number;
  file: File;
}

export default function ImageConverterClient() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const [imageFormat, setImageFormat] = useState('jpeg');
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [imageQuality, setImageQuality] = useState(85);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [originalSizes, setOriginalSizes] = useState<{ w: number; h: number } | null>(null);

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
      setErrorMsg('Please upload a valid image file.');
      return;
    }

    setIsProcessing(true);
    const loadedImages: ImageFile[] = [];

    // Only process the first image for resizing
    const file = imgFiles[0];
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

      setImageWidth(dimensions.w);
      setImageHeight(dimensions.h);
      setOriginalSizes({ w: dimensions.w, h: dimensions.h });
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not read this image file.');
    }

    setUploadedFiles([file]);
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
    setOriginalSizes(null);
  };

  const handleWidthChange = (val: number) => {
    setImageWidth(val);
    if (keepAspectRatio && originalSizes) {
      const ratio = originalSizes.h / originalSizes.w;
      setImageHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setImageHeight(val);
    if (keepAspectRatio && originalSizes) {
      const ratio = originalSizes.w / originalSizes.h;
      setImageWidth(Math.round(val * ratio));
    }
  };

  const handleConvert = async () => {
    if (uploadedImages.length === 0) {
      setErrorMsg('Please upload an image first.');
      return;
    }

    setIsProcessing(true);
    setProgress(30);
    setErrorMsg('');

    try {
      setProgress(60);
      const resBlob = await resizeImage(
        uploadedImages[0].file,
        imageWidth,
        imageHeight,
        imageQuality,
        imageFormat
      );
      setProgress(90);

      const outName = `rescaled_${uploadedImages[0].name.replace(/\.[^/.]+$/, '')}.${imageFormat === 'jpeg' ? 'jpg' : imageFormat}`;
      setProgress(100);
      setDownloadBlob(resBlob);
      setDownloadName(outName);
      setSuccess(true);
      addHistoryItem(outName, 'Image Rescaler');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during image processing.');
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
        title="Resize and convert images online — free and private"
        description="Rescale image bounds, adjust compression quality, and swap between PNG, JPEG, and WebP formats. Processed completely in-browser without sending photos online."
        accept="image/*"
        multiple={false}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-foreground/75" htmlFor="img-width">
                Width (px)
              </label>
              <input
                id="img-width"
                type="number"
                value={imageWidth}
                onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                className="bg-card border border-card-border rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-foreground font-semibold"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-foreground/75" htmlFor="img-height">
                Height (px)
              </label>
              <input
                id="img-height"
                type="number"
                value={imageHeight}
                onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                className="bg-card border border-card-border rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-foreground font-semibold"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="aspect-ratio-lock"
                checked={keepAspectRatio}
                onChange={(e) => setKeepAspectRatio(e.target.checked)}
                className="rounded accent-accent focus:outline-none h-4 w-4 border-card-border text-accent"
              />
              <label htmlFor="aspect-ratio-lock" className="text-xs font-semibold text-foreground/80 cursor-pointer select-none">
                Lock Aspect Ratio
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-bold text-foreground/75" htmlFor="img-format">
                Output Format
              </label>
              <select
                id="img-format"
                value={imageFormat}
                onChange={(e) => setImageFormat(e.target.value)}
                className="bg-card border border-card-border rounded px-3 py-2 text-xs w-full focus:outline-none focus:border-accent text-foreground font-semibold"
              >
                <option value="jpeg">JPG (JPEG)</option>
                <option value="png">PNG (Lossless)</option>
                <option value="webp">WebP (Next-Gen)</option>
              </select>
            </div>

            {imageFormat !== 'png' && (
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-foreground/75" htmlFor="img-quality">
                  Compression Quality ({imageQuality}%)
                </label>
                <input
                  id="img-quality"
                  type="range"
                  min="10"
                  max="100"
                  value={imageQuality}
                  onChange={(e) => setImageQuality(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-background-subtle rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </main>
  );
}
