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
    <div className="relative flex items-center select-none">
      <img
        src={logoSrc}
        alt="Anytime Fitness Sikandrabad"
        className={`${className} object-contain transition-opacity duration-300`}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
