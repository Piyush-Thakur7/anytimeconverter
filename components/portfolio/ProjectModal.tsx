'use client';

import React, { useEffect } from 'react';
import { Project } from '@/data/portfolioData';
import { 
  X, 
  ExternalLink, 
  Github, 
  Award, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Cpu,
  Globe
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-slate-100 animate-fade-up custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {project.category.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
              {project.status}
            </span>
            {project.participation && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>{project.participation}</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-cyan-400 font-medium font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Key Project Stats */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {project.stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-slate-400 font-mono mb-0.5">{s.label}</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Long Description */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Architectural Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Engineering Highlights */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Key Engineering Highlights
          </h3>
          <ul className="space-y-2.5">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-800/80 text-slate-200 border border-slate-700/80 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
