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

      {/* Reusable Workspace Block */}
      <div className="bg-card border border-card-border rounded-xl p-6 sm:p-8 shadow-sm">
        
        {/* Upload Zone */}
        {!hasFiles ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-lg p-10 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-4 ${
              isDragActive 
                ? 'border-accent bg-accent-bg/30' 
                : 'border-card-border hover:border-accent bg-background-subtle/50 hover:bg-background-subtle'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
              className="hidden"
            />
            
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
                      {img.width && img.height && (
                        <span className="text-foreground/50 shrink-0 font-medium">{img.width}x{img.height} px</span>
                      )}
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
                      <span className="text-foreground/50 font-medium shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex justify-end pt-2">
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
                <div className="flex items-center justify-between text-xs text-foreground/70">
                  <span className="font-semibold">Processing files locally...</span>
                  <span className="font-bold text-accent">{progress}%</span>
                </div>
                <div className="w-full bg-background-subtle border border-card-border rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Success / Download block */}
            {success && (
              <div className="p-4 bg-accent-bg text-accent text-xs rounded border border-accent/25 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center space-x-2 text-left">
                  <svg className="w-5 h-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-foreground">File Ready for Download!</p>
                    <p className="text-[10px] text-foreground/75 mt-0.5">Filename: <span className="font-semibold text-accent">{downloadName}</span></p>
                  </div>
                </div>
                
                <button
                  onClick={onDownload}
                  className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-bold px-5 py-2.5 rounded text-xs transition-colors shadow-sm flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download File</span>
                </button>
              </div>
            )}

            {/* Action buttons */}
            {!isProcessing && !success && (
              <button
                onClick={onConvert}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
              >
                Convert Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
