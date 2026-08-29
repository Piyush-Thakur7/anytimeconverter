'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  Award, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Building2,
  Compass,
  Rocket
} from 'lucide-react';

export default function MilestonesTimeline() {
  const milestones = PORTFOLIO_DATA.milestones;

  const colorVariants: Record<string, { bg: string; text: string; border: string; glow: string; dot: string }> = {
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      dot: 'border-emerald-400',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-300',
      border: 'border-cyan-500/30',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
      dot: 'border-cyan-400',
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      dot: 'border-purple-400',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-300',
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      dot: 'border-amber-400',
    },
  };

  return (
    <section id="milestones" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Rocket className="w-3.5 h-3.5 text-purple-400" />
          <span>EXPERIENCE & INITIATIVES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Programs, Hackathons & <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Milestones</span>
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Active track record across international Google developer cohorts, competitive hackathon presentations, and agentic workflows.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-8 space-y-12">
        {milestones.map((item, idx) => {
          const colors = colorVariants[item.badgeColor] || colorVariants.emerald;

          return (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Glowing Dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 ${colors.dot} ring-4 ring-slate-900 group-hover:scale-125 transition-all duration-300`} />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 backdrop-blur-2xl transition-all duration-300 shadow-xl group-hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]">
                {/* Top Meta Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{item.year} ({item.period})</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${colors.bg} ${colors.text} ${colors.border} ${colors.glow}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.organization}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-5">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
