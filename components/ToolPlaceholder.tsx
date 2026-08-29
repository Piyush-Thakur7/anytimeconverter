import React from 'react';

interface ToolPlaceholderProps {
  name: string;
}

export default function ToolPlaceholder({ name }: ToolPlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto p-1 text-left animate-pulse">
      <div className="bg-card border border-card-border rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center space-y-4 border-2 border-dashed h-72">
        <div className="p-3 rounded-full bg-accent-bg text-accent">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-sm sm:text-base font-bold text-foreground">
            Loading {name} Converter...
          </p>
          <p className="text-xs text-foreground/50">
            Setting up secure client-side WebAssembly environment
          </p>
        </div>
      </div>
    </div>
  );
}
