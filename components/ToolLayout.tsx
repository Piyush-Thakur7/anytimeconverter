'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

interface ToolLayoutProps {
  title: string;
  description: string;
  accept: string;
  multiple?: boolean;
  uploadedFiles: File[];
  uploadedImages?: { name: string; dataUrl: string; width?: number; height?: number }[];
  isProcessing: boolean;
  progress: number;
  success: boolean;
  errorMsg: string;
  downloadName: string;
  onFilesSelected: (files: File[]) => void;
  onClear: () => void;
  onConvert: () => void;
  onDownload: () => void;
  onRemoveFile?: (index: number) => void;
  children?: React.ReactNode; // Settings inputs slot
}

export default function ToolLayout({
  title,
  description,
  accept,
  multiple = false,
  uploadedFiles,
  uploadedImages = [],
  isProcessing,
  progress,
  success,
  errorMsg,
  downloadName,
  onFilesSelected,
  onClear,
  onConvert,
  onDownload,
  onRemoveFile,
  children
}: ToolLayoutProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const hasFiles = uploadedFiles.length > 0 || uploadedImages.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hidden file input always available */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-accent mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>All Tools</span>
      </Link>

      {/* Hero Header Block */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Flat Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-foreground/60">
          <span className="px-2.5 py-1 rounded bg-background-subtle border border-card-border">No Signups</span>
          <span className="px-2.5 py-1 rounded bg-background-subtle border border-card-border">No Watermarks</span>
          <span className="px-2.5 py-1 rounded bg-background-subtle border border-card-border">No Size Limits</span>
          <span className="px-2.5 py-1 rounded bg-background-subtle border border-card-border">100% Free</span>
        </div>
      </div>

      {/* Reusable Workspace Block with drag and drop overlay support even when loaded */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-card border rounded-xl p-6 sm:p-8 shadow-sm transition-colors ${
          isDragActive && multiple ? 'border-accent bg-accent-bg/10' : 'border-card-border'
        }`}
      >
        
        {/* Upload Zone */}
        {!hasFiles ? (
          <div
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-lg p-10 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-4 ${
              isDragActive 
                ? 'border-accent bg-accent-bg/30' 
                : 'border-card-border hover:border-accent bg-background-subtle/50 hover:bg-background-subtle'
            }`}
          >
            {/* Lock Security Indicator */}
            <div className="p-3 rounded-full bg-accent-bg text-accent">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-foreground">
                Drag & drop files here or <span className="text-accent underline hover:text-accent-hover">browse</span>
              </p>
              <p className="text-xs text-foreground/50">
                Supported formats: {accept.split(',').join(', ')}
              </p>
            </div>

            {/* Strict Trust Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-bg text-accent text-[11px] font-bold border border-accent/20">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Processed 100% in your browser — files never leave your device</span>
            </div>
          </div>
        ) : (
          /* File Loaded Panel */
          <div className="space-y-6">
            
            {/* Loaded Files Preview */}
            <div className="p-4 rounded-lg bg-background-subtle border border-card-border">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 block border-b border-card-border pb-1.5 mb-2">Uploaded Assets</span>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {uploadedImages.length > 0 ? (
                  uploadedImages.map((img, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-card border border-card-border text-xs text-foreground">
                      <div className="flex items-center space-x-2 truncate">
                        <img src={img.dataUrl} className="w-8 h-8 object-cover rounded border border-card-border" alt="preview" />
                        <span className="truncate font-semibold">{img.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        {img.width && img.height && (
                          <span className="text-foreground/50 shrink-0 font-medium">{img.width}x{img.height} px</span>
                        )}
                        {onRemoveFile && (
                          <button
                            onClick={() => onRemoveFile(i)}
                            className="text-red-500 hover:text-red-700 font-bold px-1.5 text-sm cursor-pointer"
                            title="Remove file"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-card border border-card-border text-xs text-foreground">
                      <div className="flex items-center space-x-2 truncate">
                        <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate font-semibold">{file.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0 font-medium">
                        <span className="text-foreground/50">{(file.size / 1024).toFixed(1)} KB</span>
                        {onRemoveFile && (
                          <button
                            onClick={() => onRemoveFile(i)}
                            className="text-red-500 hover:text-red-700 font-bold px-1.5 text-sm cursor-pointer"
                            title="Remove file"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-card-border/50">
                {multiple ? (
                  <button
                    onClick={triggerFileSelect}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-accent hover:underline cursor-pointer"
                  >
                    <span>+ Add Files</span>
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={onClear}
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/50 hover:text-accent cursor-pointer"
                >
                  Clear Files
                </button>
              </div>
            </div>

            {/* Parameters / Settings slot */}
            {children && (
              <div className="p-4 rounded-lg bg-background-subtle border border-card-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 block border-b border-card-border pb-1.5 mb-3">Conversion Options</span>
                {children}
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Progress / Converting display */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-foreground/80">
                  <span>Processing conversion offline...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-background-subtle h-2 rounded-full overflow-hidden border border-card-border">
                  <div
                    className="bg-accent h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Success display & Download */}
            {success && (
              <div className="p-4 rounded-lg bg-accent-bg border border-accent/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <span className="p-2 rounded-full bg-accent/15 text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Conversion Successful!</h3>
                    <p className="text-xs text-foreground/60 font-semibold truncate max-w-xs sm:max-w-sm">{downloadName}</p>
                  </div>
                </div>
                <button
                  onClick={onDownload}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-accent text-white font-bold text-xs hover:bg-accent-hover transition-colors shadow-sm cursor-pointer"
                >
                  Download File
                </button>
              </div>
            )}

            {/* Main Action trigger */}
            {!success && !isProcessing && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={onConvert}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-accent text-white font-bold text-sm hover:bg-accent-hover transition-colors shadow cursor-pointer"
                >
                  Convert Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
