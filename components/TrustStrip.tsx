import React from 'react';
import { UploadCloud, UserPlus, WifiOff } from 'lucide-react';

export default function TrustStrip() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4 px-6 bg-card border border-card-border rounded-xl max-w-2xl mx-auto shadow-sm">
      <div className="flex items-center space-x-2 text-foreground/80 font-bold text-xs uppercase tracking-wider">
        <UploadCloud className="w-4 h-4 text-accent shrink-0" />
        <span>No Upload</span>
      </div>
      <div className="hidden md:block text-card-border">|</div>
      <div className="flex items-center space-x-2 text-foreground/80 font-bold text-xs uppercase tracking-wider">
        <UserPlus className="w-4 h-4 text-accent shrink-0" />
        <span>No Signup</span>
      </div>
      <div className="hidden md:block text-card-border">|</div>
      <div className="flex items-center space-x-2 text-foreground/80 font-bold text-xs uppercase tracking-wider">
        <WifiOff className="w-4 h-4 text-accent shrink-0" />
        <span>Works Offline</span>
      </div>
      <div className="w-full md:w-auto text-center md:text-left text-[11px] text-foreground/60 font-semibold border-t md:border-t-0 pt-2 md:pt-0 md:pl-2 border-card-border">
        Processing runs 100% locally in your browser memory via WebAssembly.
      </div>
    </div>
  );
}
