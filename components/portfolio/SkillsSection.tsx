'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Cpu, Layout, Database, Terminal, Check } from 'lucide-react';

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-zinc-300" />,
    Layout: <Layout className="w-5 h-5 text-zinc-300" />,
    Database: <Database className="w-5 h-5 text-zinc-300" />,
    Terminal: <Terminal className="w-5 h-5 text-zinc-300" />,
  };

  return (
    <section id="skills" className="py-20 border-b border-zinc-800/80 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
          TECHNICAL SKILLS
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tools, Languages & Frameworks
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Core technical competencies applied across software engineering and AI systems development.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/90 space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200">
                {iconMap[category.icon] || <Cpu className="w-5 h-5 text-zinc-300" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {category.title}
                </h4>
                <p className="text-xs text-zinc-400">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {category.skills.map((skill, sIdx) => (
                <div 
                  key={sIdx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
