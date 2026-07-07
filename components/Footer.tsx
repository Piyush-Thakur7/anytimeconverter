'use client';

import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 py-12 text-neutral-400 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 flex flex-col space-y-4 items-start">
            <div className="flex items-center space-x-3">
              <Logo className="h-10 w-auto" isFooter={true} />
              <span className="font-bebas text-xl sm:text-2xl tracking-wider text-white font-bold">
                FLEXCONVERT
              </span>
            </div>
            <p className="text-neutral-400 font-medium max-w-md text-xs sm:text-sm leading-relaxed">
              FlexConvert is a high-performance, universal file converter suite.
              All operations are executed 100% locally in your browser. Your files are never uploaded to any server, guaranteeing complete privacy and offline-level speed.
            </p>
          </div>

          {/* Supported Converters List */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bebas text-base tracking-wider text-white uppercase font-bold">PDF Tools</h3>
            <ul className="space-y-1.5 text-xs">
              <li>Images to PDF</li>
              <li>PDF to Images (JPG)</li>
              <li>Merge PDF Documents</li>
              <li>Split PDF by Page Ranges</li>
              <li>Word/Text to PDF</li>
            </ul>
          </div>

          {/* Security & Info */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bebas text-base tracking-wider text-white uppercase font-bold">Privacy & Security</h3>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Zero Server Uploads
              </li>
              <li>WASM Local Execution</li>
              <li>No Accounts Required</li>
              <li>Unlimited Free Use</li>
              <li>Works Offline</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p>&copy; {currentYear} FlexConvert. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-default">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-default">Terms of Service</span>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600 font-medium">Powered by Next.js & WebAssembly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
