'use client';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

export default function Logo({ className = "h-10 w-auto", isFooter = false }: LogoProps) {
  return (
    <div className="relative flex items-center select-none">
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d2e" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Document Icon Background */}
        <path
          d="M25 15C25 12.2386 27.2386 10 30 10H60L75 25V85C75 87.7614 72.7614 90 70 90H30C27.2386 90 25 87.7614 25 85V15Z"
          fill="#121212"
          stroke="url(#logo-grad)"
          strokeWidth="3.5"
        />
        
        {/* Folded Page Corner */}
        <path
          d="M60 10V25H75L60 10Z"
          fill="url(#logo-grad)"
          stroke="url(#logo-grad)"
          strokeWidth="1"
        />

        {/* Circular Arrows inside the document (representing converter) */}
        <g filter="url(#glow)">
          {/* Top/Right Arrow */}
          <path
            d="M38 52C38 43.7157 44.7157 37 53 37C57.1421 37 60.8921 38.679 63.6066 41.3934"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M60 44L64 41L61 37"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom/Left Arrow */}
          <path
            d="M62 48C62 56.2843 55.2843 63 47 63C42.8579 63 39.1079 61.321 36.3934 58.6066"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M40 56L36 59L39 63"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
