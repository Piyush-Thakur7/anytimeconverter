'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  Building2, 
  Calendar, 
  ChevronRight, 
  Award,
  Sparkles
} from 'lucide-react';

export default function ExperienceSection() {
  const { milestones } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 border-b border-zinc-800/80 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
          PROGRAMS & INITIATIVES
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Leadership, Cohorts & Milestones
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Active participation across developer communities, competitive hackathon presentations, and specialized AI programs.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-zinc-900/30 border border-zinc-800/90 hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {item.title}
                </h4>
                <div className="text-xs sm:text-sm text-zinc-400 font-mono mt-0.5">
                  {item.organization}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {item.year}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Bullets */}
            <ul className="space-y-1.5 mb-4">
              {item.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Skills */}
            <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
