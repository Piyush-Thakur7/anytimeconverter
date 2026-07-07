'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pdfTools = [
    { name: 'JPG to PDF Converter', href: '/jpg-to-pdf' },
    { name: 'PDF to JPG Converter', href: '/pdf-to-jpg' },
    { name: 'Merge PDF Files', href: '/merge-pdf' },
    { name: 'Split PDF Pages', href: '/split-pdf' },
    { name: 'Word to PDF Converter', href: '/word-to-pdf' },
    { name: 'Extract Text from PDF', href: '/pdf-to-text' },
  ];

  const imageTools = [
    { name: 'Images to PPTX Converter', href: '/images-to-ppt' },
    { name: 'Image Rescaler', href: '/image-converter' },
    { name: 'Convert PNG to WebP', href: '/image-converter' },
    { name: 'Convert JPG to PNG', href: '/image-converter' },
  ];

  return (
    <footer className="bg-background-subtle border-t border-card-border py-12 text-foreground/75 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Logo & Privacy Pitch */}
          <div className="md:col-span-2 flex flex-col space-y-4 items-start">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" isFooter={true} />
              <span className="text-lg font-bold text-foreground">
                AnytimeConverter
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md text-foreground/70">
              AnytimeConverter is a privacy-first, universal offline file converter. 
              All calculations, parsing, and rendering are executed 100% locally in your browser. 
              Your files never leave your computer, ensuring absolute privacy, no signup friction, and unlimited free use.
            </p>
          </div>

          {/* PDF Tools SEO column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">PDF Utilities</h3>
            <ul className="space-y-1.5 text-xs">
              {pdfTools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="hover:text-accent transition-colors font-medium">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Tools SEO column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Image Utilities</h3>
            <ul className="space-y-1.5 text-xs">
              {imageTools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="hover:text-accent transition-colors font-medium">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-card-border flex flex-col md:flex-row items-center justify-between text-xs text-foreground/50">
          <p>&copy; {currentYear} AnytimeConverter. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
            <span className="text-card-border">|</span>
            <span className="text-foreground/40">Secure WebAssembly Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
