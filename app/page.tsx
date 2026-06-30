'use client';

import Generator from '@/components/Generator';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center space-x-2 rounded-full border border-violet-200 bg-violet-50/50 px-3.5 py-1 text-xs font-semibold text-violet-750 dark:border-violet-950/40 dark:bg-violet-950/20 dark:text-violet-400">
          <span>✨ 100% Client-Side & Offline Ready</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Create{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400">
            Stylish Nicknames
          </span>{' '}
          & Fonts
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-500 dark:text-slate-400 sm:text-lg">
          Generate fancy Unicode text, add invisible spacing, and design unique names for Free Fire, BGMI, PUBG Mobile, and social profiles.
        </p>
      </section>

      {/* Game-Specific Quick Access Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
        {/* Free Fire Card */}
        <Link 
          href="/free-fire-name-generator"
          className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-orange-500/50 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900"
        >
          <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full transition-all group-hover:scale-110" />
          <div className="flex flex-col h-full justify-between space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                <span>🔥 Free Fire Max</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-800 dark:text-slate-100">
                Free Fire Name Generator
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Optimize your IGN for Free Fire. Live 12-character limit checker, custom presets, and in-game paste instructions.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
              Open FF Generator &rarr;
            </div>
          </div>
        </Link>

        {/* BGMI Card */}
        <Link 
          href="/bgmi-name-generator"
          className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-amber-500/50 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900"
        >
          <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full transition-all group-hover:scale-110" />
          <div className="flex flex-col h-full justify-between space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                <span>🎯 Battlegrounds Mobile</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-800 dark:text-slate-100">
                BGMI Name Generator
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Design stylish names for BGMI. Supports specialized symbols and tracks character lengths up to the 14-char limit.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
              Open BGMI Generator &rarr;
            </div>
          </div>
        </Link>
      </section>

      {/* Main General Generator */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-150">
            ⚡ Quick Font Style Generator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Type your text below to instantly convert it into 40+ stylish Unicode text formats.
          </p>
        </div>
        
        <Generator />
      </section>
    </div>
  );
}
