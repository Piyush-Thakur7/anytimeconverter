'use client';

import { useEffect } from 'react';

interface GalleryImage {
  src: string;
  category: string;
  alt: string;
  title: string;
  description: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNavigate }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-6 z-50 text-white/60 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all cursor-pointer hidden sm:block"
        aria-label="Previous image"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-6 z-50 text-white/60 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all cursor-pointer hidden sm:block"
        aria-label="Next image"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Image Container */}
      <div 
        className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image wrapper */}
        <div className="relative flex items-center justify-center w-full max-h-[70vh] overflow-hidden select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300 transform scale-100"
          />
        </div>

        {/* Caption Overlay */}
        <div className="w-full text-center mt-4 space-y-1 max-w-2xl px-4 text-white">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/30 mb-1">
            {currentImage.category}
          </div>
          <h4 className="font-serif text-lg sm:text-xl text-[#e2d1b8] font-semibold">
            {currentImage.title}
          </h4>
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            {currentImage.description}
          </p>
          <div className="text-[10px] text-white/45 pt-1.5 font-semibold">
            {currentIndex + 1} of {images.length}
          </div>
        </div>
      </div>

      {/* Mobile Swipe / Tap Area Helpers */}
      <div className="absolute inset-y-1/2 left-0 right-0 flex justify-between px-2 sm:hidden z-40 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white/80 active:bg-black/60 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white/80 active:bg-black/60 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
