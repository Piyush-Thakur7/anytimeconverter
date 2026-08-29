'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function PortfolioFooter() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-semibold text-zinc-200">
            {personal.name}
          </div>
          <div className="text-zinc-500 text-[11px]">
            {personal.ambassadorBadge} • BCA (AI/ML) @ GL Bajaj
          </div>
        </div>

        {/* Center / Socials */}
        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-100 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-100 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-zinc-100 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right / Back to Top */}
        <div className="flex items-center gap-3 text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Piyush Singh</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="hover:text-zinc-200 flex items-center gap-1 transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
