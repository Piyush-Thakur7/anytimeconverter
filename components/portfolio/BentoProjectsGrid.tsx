'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import ProjectModal from './ProjectModal';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Cpu, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  FileCheck2,
  Activity,
  Mic,
  Zap,
  Lock,
  Coins
} from 'lucide-react';

export default function BentoProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & GenAI' },
    { id: 'fullstack', label: 'Full-Stack Web' },
    { id: 'utility', label: 'Web Utilities' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION & EXPERIMENTAL BUILDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Featured <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Bento Projects</span>
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Engineered with modern architecture — from gamified social impact platforms presented at MSME Hackathon 6.0 to zero-upload browser conversion engines.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-105'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isServemate = project.id === 'servemate';
          const isConverter = project.id === 'anytime-converter';
          const isFitness = project.id === 'fitness-platform';
          const isAiSuite = project.id === 'ai-assistant-suite';

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl bg-slate-950/85 border border-slate-800/90 hover:border-emerald-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.18)] cursor-pointer overflow-hidden backdrop-blur-2xl ${
                isServemate || isAiSuite ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Subtle dynamic glow corner */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div>
                {/* Header line & badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {project.category.toUpperCase()}
                    </span>

                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                      {project.status}
                    </span>

                    {project.participation && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        <Award className="w-3 h-3 text-purple-400" />
                        <span>{project.participation}</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="p-2 rounded-xl bg-slate-900/90 text-slate-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/15 border border-slate-800 group-hover:border-emerald-500/40 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-400 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Interactive Simulated UI Mockup Panels inside the Cards */}
                {isServemate && (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Coins className="w-4 h-4" />
                        Donor XP Level 4
                      </span>
                      <span className="text-[11px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        Razorpay Verified
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Transparency Audit Score</span>
                        <span className="text-emerald-400 font-bold">98.4%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full w-[98%]" />
                      </div>
                    </div>
                  </div>
                )}

                {isConverter && (
                  <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3 h-3" />
                        100% Offline Engine
                      </span>
                      <span>0.4s avg</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <span className="p-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 font-bold">PDF</span>
                      <span className="p-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-emerald-300 font-bold">DOCX</span>
                      <span className="p-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-indigo-300 font-bold">OCR</span>
                      <span className="p-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-bold">JPG</span>
                    </div>
                  </div>
                )}

                {isFitness && (
                  <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Activity className="w-3 h-3" />
                        Routine Tracking
                      </span>
                      <span className="text-emerald-400">7-Day Streak</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px]">
                      <span className="text-slate-400">Caloric Target</span>
                      <span className="text-emerald-300 font-bold">2,450 kcal</span>
                    </div>
                  </div>
                )}

                {isAiSuite && (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Mic className="w-3.5 h-3.5 animate-pulse" />
                        Vosk Offline Voice ASR
                      </span>
                      <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        Autonomous Loop
                      </span>
                    </div>
                    <div className="flex items-center gap-1 h-5 justify-center py-1">
                      {[40, 70, 90, 60, 100, 45, 80, 60, 95, 30, 85, 55, 75, 40].map((h, hI) => (
                        <span
                          key={hI}
                          className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full inline-block"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Footer Links */}
                <div 
                  className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-medium" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 font-mono"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    View Specs &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-dive Project Specs Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
