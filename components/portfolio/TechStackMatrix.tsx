'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  Sparkles, 
  Cpu, 
  Layout, 
  Database, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export default function TechStackMatrix() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const categories = PORTFOLIO_DATA.skills;

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
    Layout: <Layout className="w-5 h-5 text-cyan-400" />,
    Database: <Database className="w-5 h-5 text-indigo-400" />,
    Terminal: <Terminal className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Boxes className="w-3.5 h-3.5 text-emerald-400" />
          <span>CORE COMPETENCIES & TOOLING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Tech Stack & <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">AI Matrix</span>
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Engineered across modern AI pipelines, reactive web architectures, secure database backends, and cloud deployment pipelines.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        {categories.map((cat, idx) => {
          const isActive = activeCategoryIndex === idx;
          return (
            <button
              key={cat.title}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`text-left p-5 rounded-3xl border transition-all duration-300 flex items-start gap-3.5 backdrop-blur-2xl ${
                isActive
                  ? 'bg-slate-900/95 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-white scale-[1.02]'
                  : 'bg-slate-950/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                {iconMap[cat.icon] || <Code2 className="w-5 h-5 text-emerald-400" />}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold truncate text-slate-200">
                  {cat.title}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {cat.skills.length} proficiencies
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Skill Cards Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-2xl shadow-2xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              {iconMap[categories[activeCategoryIndex].icon]}
              <span>{categories[activeCategoryIndex].title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {categories[activeCategoryIndex].description}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono self-start sm:self-auto shadow-sm">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Production Tested</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories[activeCategoryIndex].skills.map((skill, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {skill.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
                  {skill.tag}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2">
                <span>Proficiency Level</span>
                <span className="text-emerald-400 font-bold">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
