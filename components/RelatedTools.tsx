import React from 'react';
import Link from 'next/link';

interface ToolInfo {
  id: string;
  name: string;
  href: string;
  description: string;
}

const allTools: Record<string, ToolInfo> = {
  'jpg-to-pdf': { id: 'jpg-to-pdf', name: 'JPG to PDF Converter', href: '/jpg-to-pdf', description: 'Convert images into high-quality PDFs.' },
  'pdf-to-jpg': { id: 'pdf-to-jpg', name: 'PDF to JPG Converter', href: '/pdf-to-jpg', description: 'Extract pages of a PDF into JPG images.' },
  'merge-pdf': { id: 'merge-pdf', name: 'Merge PDF Files', href: '/merge-pdf', description: 'Combine multiple PDFs into a single file.' },
  'split-pdf': { id: 'split-pdf', name: 'Split PDF Pages', href: '/split-pdf', description: 'Extract ranges or individual pages from PDFs.' },
  'word-to-pdf': { id: 'word-to-pdf', name: 'Word to PDF Converter', href: '/word-to-pdf', description: 'Convert Word or Text documents to PDF.' },
  'pdf-to-text': { id: 'pdf-to-text', name: 'PDF to Text Converter', href: '/pdf-to-text', description: 'Extract selectable text from PDF documents.' },
  'images-to-ppt': { id: 'images-to-ppt', name: 'Images to PPTX', href: '/images-to-ppt', description: 'Convert pictures into PowerPoint slides.' },
  'image-converter': { id: 'image-converter', name: 'Image Rescaler', href: '/image-converter', description: 'Resize, format, and compress images.' },
  'compress-file': { id: 'compress-file', name: 'File Compressor', href: '/compress-file', description: 'Shrink sizes of files using ZIP archives.' }
};

interface RelatedToolsProps {
  currentTool: string;
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  // Select 3 siblings dynamically
  const siblingIds = Object.keys(allTools)
    .filter(id => id !== currentTool)
    .slice(0, 3);
  
  return (
    <section className="space-y-6 text-left border-t border-card-border pt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
        Related Utilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {siblingIds.map(id => {
          const tool = allTools[id];
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="bg-card border border-card-border hover:border-accent rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs text-accent font-semibold group-hover:underline">
                <span>Open Tool</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
