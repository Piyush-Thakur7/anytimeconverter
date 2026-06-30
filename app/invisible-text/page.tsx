import React from 'react';
import InvisibleCharTool from '@/components/InvisibleCharTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invisible Character Tool — Copy Blank Spaces for Free Fire & BGMI',
  description: 'Copy invisible Unicode spaces (U+3164, U+2800, zero-width space) to bypass game spacing filters. Interactive name spacer widget for Free Fire, BGMI, and social networks.',
  keywords: ['invisible character copy', 'blank space code', 'hangul filler u3164', 'invisible name copy paste', 'zero width space copy'],
};

export default function InvisibleTextPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      {/* Header and Explainer */}
      <section className="space-y-4 mb-10 text-center md:text-left">
        <div className="inline-flex items-center space-x-1.5 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-600 dark:bg-violet-950/30 dark:text-violet-400">
          <span>👻 Invisible Spacers</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl md:text-5xl">
          Invisible Unicode Character Copy Tool
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Need a blank space inside a game name that doesn&apos;t support spaces? Copy any of the special invisible characters below, or use our spacer builder widget to join two words with an invisible code.
        </p>
      </section>

      {/* Invisible Characters Tool Component */}
      <section className="mb-14">
        <InvisibleCharTool />
      </section>

      {/* Educational Article Section for SEO and Value */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-150">
          💡 What is Hangul Filler U+3164 and How Does It Work?
        </h2>
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
          <p>
            The most widely used character for gaming names is the <strong>Hangul Filler (U+3164)</strong>. It is a block in the Korean Unicode system that has no visual representation, yet is classified by computers as a letter rather than a blank whitespace character.
          </p>
          <p>
            When you type a name change card in games like Free Fire, the server filters out normal spaces (`0x0020` in hexadecimal representation) using simple code commands like `.trim()` or regular expressions. However, because U+3164 is categorized as a letter, the server accepts it as a normal character, allowing you to create names like:
          </p>
          <div className="text-center py-2 font-mono bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl max-w-sm mx-auto my-2 text-violet-600 dark:text-violet-400 font-bold">
            ⚔️ KINGㅤBOY ⚔️
          </div>
          <p>
            Without this character, the name would save as `⚔️KINGBOY⚔️` with no space whatsoever.
          </p>
        </div>
      </section>
    </div>
  );
}
