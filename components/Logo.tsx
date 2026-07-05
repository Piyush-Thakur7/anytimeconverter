'use client';

import { useState, useEffect } from 'react';
import { removeWhiteBackground } from '@/lib/removeWhiteBg';
import { cropAndSetFavicon } from '@/lib/faviconCrop';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

export default function Logo({ className = "h-14 w-auto", isFooter = false }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState<string>('/assets/logo.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Process logo background removal on mount
    removeWhiteBackground('/assets/logo.png', (transparentDataUrl) => {
      setLogoSrc(transparentDataUrl);
      setIsLoading(false);
    });

    // Process crop and set favicon (only once)
    if (!isFooter) {
      cropAndSetFavicon('/assets/logo.png');
    }
  }, [isFooter]);

  return (
    <div className={`relative flex items-center select-none ${isLoading ? 'animate-pulse' : ''}`}>
      {/* If loading, we show a loading fallback or render the raw image with blending/containment */}
      <img
        src={logoSrc}
        alt="Anytime Fitness Sikandrabad"
        className={`${className} object-contain transition-opacity duration-300`}
        style={{ opacity: isLoading ? 0.3 : 1 }}
      />
    </div>
  );
}
