'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-2 rounded-full border border-card-border bg-background-subtle/50 text-xs font-semibold text-foreground/80 max-w-2xl mx-auto">
      <div className="flex items-center gap-1.5 shrink-0">
        {isOnline ? (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        ) : (
          <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        )}
        <span>{isOnline ? 'Network Connected' : 'Offline Mode Active'}</span>
      </div>
      <span className="hidden sm:inline text-foreground/30">•</span>
      <p className="text-center">
        <span className="font-bold">Try it:</span> Turn off your Wi-Fi or unplug your internet right now — this tool will still work.{' '}
        <a href="#privacy-explainer" className="text-accent underline hover:text-accent-hover font-bold">
          How it works
        </a>
      </p>
    </div>
  );
}
