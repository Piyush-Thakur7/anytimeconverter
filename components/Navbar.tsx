'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

interface NavbarProps {
  onSelectTool?: (toolId: string | null) => void;
}

export default function Navbar({ onSelectTool }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (toolId: string | null) => {
    if (onSelectTool) {
      onSelectTool(toolId);
    }
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('set-active-tool', { detail: toolId });
      window.dispatchEvent(event);
    }
    setIsMobileMenuOpen(false);
    
    // Smooth scroll back to workspace area
    const targetElement = document.querySelector('#workspace-area') || document.querySelector('#home');
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-neutral-900' 
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Text & Image */}
        <button 
          onClick={() => handleNavClick(null)}
          className="flex items-center space-x-2 bg-transparent border-none cursor-pointer text-left focus:outline-none"
        >
          <Logo className="h-8 sm:h-10 w-auto" />
          <span className="font-bebas text-lg sm:text-2xl tracking-wider text-white font-bold hover:text-accent transition-colors">
            FLEXCONVERT
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick(null)}
            className="text-xs font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all duration-300 relative group"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('jpg-to-pdf')}
            className="text-xs font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all duration-300 relative group"
          >
            JPG to PDF
          </button>
          <button
            onClick={() => handleNavClick('pdf-to-jpg')}
            className="text-xs font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all duration-300 relative group"
          >
            PDF to JPG
          </button>
          <button
            onClick={() => handleNavClick('merge-pdf')}
            className="text-xs font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all duration-300 relative group"
          >
            Merge PDF
          </button>
          <button
            onClick={() => handleNavClick('image-rescaler')}
            className="text-xs font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all duration-300 relative group"
          >
            Image Rescale
          </button>
        </nav>

        {/* Action Button: Privacy Guarantee Badge */}
        <div className="hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Client-Side Privacy
          </span>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-accent transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-neutral-900 py-4 px-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick(null)}
              className="text-left text-sm font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all py-2"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('jpg-to-pdf')}
              className="text-left text-sm font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all py-2"
            >
              JPG to PDF
            </button>
            <button
              onClick={() => handleNavClick('pdf-to-jpg')}
              className="text-left text-sm font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all py-2"
            >
              PDF to JPG
            </button>
            <button
              onClick={() => handleNavClick('merge-pdf')}
              className="text-left text-sm font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all py-2"
            >
              Merge PDF
            </button>
            <button
              onClick={() => handleNavClick('image-rescaler')}
              className="text-left text-sm font-semibold tracking-wide text-neutral-300 hover:text-accent uppercase transition-all py-2"
            >
              Image Rescale
            </button>
          </nav>
          <div className="pt-4 border-t border-neutral-900 flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              100% Client-Side Privacy
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
