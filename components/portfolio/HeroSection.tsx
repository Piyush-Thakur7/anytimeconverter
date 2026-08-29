'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  ArrowDown, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ArrowUpRight,
  Sparkles,
  Award,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const { personal, stats } = PORTFOLIO_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="pt-32 pb-20 border-b border-zinc-800/80 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Status Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>{personal.ambassadorBadge}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
          <span>{personal.availability}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 text-xs">
          <MapPin className="w-3 h-3 text-zinc-500" />
          <span>{personal.location}</span>
        </div>
      </div>

      {/* Main Name & Title */}
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          {personal.name}
        </h1>
        <p className="text-xl sm:text-2xl text-zinc-300 font-medium">
          Software Engineer & Aspiring AI/ML Developer
        </p>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
          BCA student specializing in AI/ML at <strong className="text-zinc-200 font-semibold">GL Bajaj Institute of Technology & Management</strong>. 
          Selected as a <strong className="text-zinc-200 font-semibold">Google Student Ambassador (2026)</strong> and participating in the <strong className="text-zinc-200 font-semibold">Gen AI Academy (Google Cloud APAC Cohort 3)</strong>. 
          Experienced in building production full-stack web applications, autonomous agent workflows (Hermes, RAG pipelines), and 100% offline browser utilities. 
          Presented the ServeMATE prototype at the <strong className="text-zinc-200 font-semibold">MSME Idea Hackathon 6.0 (GLBCRI)</strong>.
        </p>
      </div>

      {/* Action Buttons & Socials */}
      <div className="flex flex-wrap items-center gap-3.5 mb-12">
        <button
          onClick={() => scrollToSection('projects')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm transition-colors shadow-sm"
        >
          <span>View Featured Projects</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenResume}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm border border-zinc-700/80 transition-colors"
        >
          <FileText className="w-4 h-4 text-zinc-400" />
          <span>View Curriculum Vitae</span>
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-sm border border-zinc-800 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Me</span>
        </button>
      </div>

      {/* Social Links Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-zinc-900">
        <a 
          href={personal.github} 
          target="_blank" 
          rel="noreferrer"
          className="p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between text-xs text-zinc-300 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-mono">github/{personal.githubHandle}</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
        </a>

        <a 
          href={personal.linkedin} 
          target="_blank" 
          rel="noreferrer"
          className="p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between text-xs text-zinc-300 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-blue-400" />
            <span className="font-mono">in/{personal.linkedinHandle}</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
        </a>

        <a 
          href={`mailto:${personal.email}`}
          className="p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between text-xs text-zinc-300 transition-colors group sm:col-span-2 md:col-span-2"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 shrink-0" />
            <span className="font-mono truncate">{personal.email}</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
        </a>
      </div>
    </section>
  );
}
