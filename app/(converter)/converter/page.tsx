'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConversionHistoryItem } from '@/lib/history';

export default function AnytimeConverterHub() {
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  // Function to read history from localStorage
  const loadHistory = () => {
    const savedHistory = localStorage.getItem('atc_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  };

  useEffect(() => {
    loadHistory();

    // Listen to custom local history update events
    window.addEventListener('atc_history_update', loadHistory);
    return () => window.removeEventListener('atc_history_update', loadHistory);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('atc_history');
  };

  const pdfTools = [
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      description: 'Combine multiple images (JPG, PNG, WebP) into a single PDF document.',
      href: '/jpg-to-pdf',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'pdf-to-jpg',
      name: 'PDF to JPG',
      description: 'Extract pages of a PDF document and convert them into high-quality JPEG images.',
      href: '/pdf-to-jpg',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'merge-pdf',
      name: 'Merge PDF',
      description: 'Combine two or more separate PDF documents into a single PDF file.',
      href: '/merge-pdf',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      id: 'split-pdf',
      name: 'Split PDF',
      description: 'Extract specific pages or page ranges from a PDF document into a new PDF.',
      href: '/split-pdf',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
        </svg>
      )
    },
    {
      id: 'word-to-pdf',
      name: 'Word to PDF',
      description: 'Convert Microsoft Word (.docx) or Text (.txt) files into clean PDF format.',
      href: '/word-to-pdf',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'pdf-to-text',
      name: 'PDF to Text',
      description: 'Extract raw text from PDF files directly and download as a plain text (.txt) file.',
      href: '/pdf-to-text',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM12 18H7v-2h5v2zm0-4H7v-2h5v2z" />
        </svg>
      )
    }
  ];

  const imageTools = [
    {
      id: 'images-to-ppt',
      name: 'Images to PPTX',
      description: 'Convert JPG, PNG, and WebP images into a PowerPoint slide presentation locally.',
      href: '/images-to-ppt',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'image-converter',
      name: 'Image Rescaler',
      description: 'Resize image dimensions, compress file payload size, and convert formats (PNG, JPG, WebP).',
      href: '/image-converter',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      )
    },
    {
      id: 'compress-file',
      name: 'File Compressor',
      description: 'Reduce the file size of any document, image, or media files by compressing them into a secure ZIP archive.',
      href: '/compress-file',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      
      {/* Hero Banner Section */}
      <section id="home" className="relative pt-32 pb-16 overflow-hidden border-b border-card-border bg-background-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-bg text-accent border border-accent/15">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            100% Client-Side Privacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-none">
            Convert your files. Instantly. Privately.
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-foreground/70 leading-relaxed font-medium">
            Convert, merge, split, and compress your files directly in your browser. 
            No signups. No file uploads. No file size limits. No watermarks.
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* PDF Tools Category */}
        <section id="pdf-tools" className="space-y-6">
          <div className="border-b border-card-border pb-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              PDF Utilities
            </h2>
            <p className="text-xs text-foreground/50 mt-0.5 font-medium">Offline utilities to merge, split, convert, and extract text from PDF files.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfTools.map(tool => (
              <Link
                key={tool.id}
                href={tool.href}
                className="bg-card border border-card-border hover:border-accent rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all group cursor-pointer text-left"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-background-subtle border border-card-border rounded-lg w-fit group-hover:bg-accent-bg group-hover:border-accent/15 transition-all text-accent">
                    {tool.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between text-xs text-accent font-semibold group-hover:underline">
                  <span>Open Tool</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Image & File Tools Category */}
        <section id="image-tools" className="space-y-6">
          <div className="border-b border-card-border pb-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Image & File Utilities
            </h2>
            <p className="text-xs text-foreground/50 mt-0.5 font-medium">Optimize, rescale, and compress images and files completely inside your browser cache.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTools.map(tool => (
              <Link
                key={tool.id}
                href={tool.href}
                className="bg-card border border-card-border hover:border-accent rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all group cursor-pointer text-left"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-background-subtle border border-card-border rounded-lg w-fit group-hover:bg-accent-bg group-hover:border-accent/15 transition-all text-accent">
                    {tool.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between text-xs text-accent font-semibold group-hover:underline">
                  <span>Open Tool</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Privacy Pitch section */}
        <section id="privacy" className="p-6 sm:p-8 rounded-xl bg-background-subtle border border-card-border flex flex-col md:flex-row items-center md:justify-between gap-6 shadow-sm text-left">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-bg text-accent text-[11px] font-bold border border-accent/20">
              Security Guaranteed
            </span>
            <h3 className="text-lg font-bold">Files Never Leave Your Device</h3>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-medium">
              We compile parsing libraries into browser-local WebAssembly (WASM) structures. 
              Your documents and image files are read, parsed, and converted natively inside your browser sandbox. 
              No network requests are fired during conversion, ensuring complete data security.
            </p>
          </div>
          <div className="shrink-0">
            <span className="p-4 rounded-xl bg-card border border-card-border text-accent flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
          </div>
        </section>

        {/* History panel */}
        {history.length > 0 && (
          <section className="p-6 rounded-xl bg-card border border-card-border space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-card-border pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Recent Local Conversions</h3>
              <button 
                onClick={clearHistory}
                className="text-[10px] uppercase font-bold tracking-wider text-foreground/45 hover:text-accent cursor-pointer"
              >
                Clear history
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-background-subtle border border-card-border text-xs">
                  <div className="space-y-1 text-left min-w-0 pr-2">
                    <p className="font-semibold text-foreground truncate">{item.fileName}</p>
                    <p className="text-[10px] text-foreground/50">{item.toolName} • {item.timestamp}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent-bg text-accent text-[10px] font-bold border border-accent/20 shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ready
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
