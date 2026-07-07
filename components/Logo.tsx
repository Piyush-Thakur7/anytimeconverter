'use client';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

export default function Logo({ className = "h-8 w-auto", isFooter = false }: LogoProps) {
  return (
    <div className="relative flex items-center select-none text-accent">
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Document Border */}
        <path
          d="M28 12C28 9.79086 29.7909 8 32 8H62L76 22V88C76 90.2091 74.2091 92 72 92H32C29.7909 92 28 90.2091 28 88V12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Page Fold */}
        <path
          d="M62 8V22H76L62 8Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Sync/Conversion Arrow Circle in Center */}
        {/* Arrow 1 */}
        <path
          d="M40 50C40 43.5 44.5 39 52 39C55.5 39 58.5 40.5 60.5 43"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M57 43.5H61V39.5"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Arrow 2 */}
        <path
          d="M60 50C60 56.5 55.5 61 48 61C44.5 61 41.5 59.5 39.5 57"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M43 56.5H39V60.5"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
