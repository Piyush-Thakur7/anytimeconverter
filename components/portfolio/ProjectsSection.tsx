'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Award,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-20 border-b border-zinc-800/80 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
          FEATURED PROJECTS
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Selected Engineering Work & Prototypes
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Production applications, hackathon prototypes, and open-source tools built with modern full-stack architectures.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-10">
        {projects.map((project) => (
          <article 
            key={project.id}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-6"
          >
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                    {project.status}
                  </span>
                  {project.participation && (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/60">
                      {project.participation}
                    </span>
                  )}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  {project.title}
                </h4>
                <p className="text-sm text-zinc-400 font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3 shrink-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>

            {/* Highlights */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Key Technical Contributions:
              </h5>
              <ul className="space-y-2">
                {project.highlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-zinc-500 mr-2">Technologies:</span>
              {project.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
