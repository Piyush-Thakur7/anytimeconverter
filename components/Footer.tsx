'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-10 transition-all dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Column */}
          <div className="flex flex-col space-y-3">
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
              StyleName
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Generate stylish nickname fonts, Unicode decorative symbols, and invisible spaces for games like Free Fire, BGMI, PUBG, and COD Mobile. 100% free and mobile-optimized.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Quick Navigation
            </span>
            <nav className="flex flex-col space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                Home Generator
              </Link>
              <Link href="/free-fire-name-generator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                Free Fire Nicknames
              </Link>
              <Link href="/bgmi-name-generator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                BGMI Nickname Generator
              </Link>
              <Link href="/invisible-text" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                Invisible Spaces & Characters
              </Link>
            </nav>
          </div>

          {/* Privacy Note Column */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              🔒 Privacy First
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We value your privacy. <span className="font-semibold text-slate-700 dark:text-slate-300">We never store or transmit anything you type.</span> All conversions and text manipulations are performed entirely inside your browser (client-side), meaning your inputs are completely private and work offline once loaded.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} StyleName. All rights reserved. Hosted at <a href="https://stylename.resence.in" className="hover:underline text-violet-500">stylename.resence.in</a>.</p>
        </div>
      </div>
    </footer>
  );
}
