'use client';

import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personal, education, certifications, projects, milestones } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
PIYUSH SINGH
BCA Student | Aspiring AI/ML Engineer | AI & Software Development
${personal.location} | ${personal.email} | ${personal.phone}
LinkedIn: ${personal.linkedin} | GitHub: ${personal.github}

EDUCATION:
- Bachelor of Computer Applications (BCA) — AI/ML Specialization (3rd Sem)
  GL Bajaj Institute of Technology & Management, Greater Noida (Affiliated to CCSU, Meerut)
- Class XII (PCB — Biology): 78.8% | Class X: 80.2%

TECHNICAL SKILLS:
- Programming: C, Python (foundational, coursework and project use)
- Web Development: React, Next.js, HTML, CSS, JavaScript, TypeScript, Tailwind CSS
- Database: MongoDB, SQL (foundational)
- Tools & Platforms: Git, GitHub, Vercel, Render, Google Cloud Run
- AI / GenAI: Generative AI concepts, Prompt Engineering, AI-assisted development, RAG, AI agents (Hermes)

PROJECTS:
- ServeMATE (Resence) - Student Prototype / MVP (Presented at MSME Idea Hackathon 6.0, GLBCRI)
- AnytimeConverter (anytimeconverter.resence.in) - 100% Offline Client-Side Converter
- Fitness Platform (fitness.resence.in) - AI-Assisted Full-Stack Build

PROGRAMS & INITIATIVES:
- Google Student Ambassador 2026
- Gen AI Academy — APAC Edition, Cohort 3 (Google Cloud x Hack2Skill)
- AI-Assisted Development Exposure (Hermes, Agentic Workflows)

CERTIFICATIONS:
- Google AI Essentials Specialization (Coursera, 2026)
- Google Prompting Essentials Specialization (Coursera, 2026)
- Foundation Course on AI Readiness (IICT / Google / Ministry of I&B, 2026)
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden text-slate-100 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm sm:text-base text-white">Curriculum Vitae — Piyush Singh</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-xs font-mono text-emerald-300 border border-emerald-500/30 transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 font-sans space-y-8 custom-scrollbar">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
              {personal.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-emerald-400 mt-1">
              BCA Student | Aspiring AI/ML Engineer | AI & Software Development
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-400 font-mono mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" />
                {personal.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                {personal.phone}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-cyan-400 font-mono mt-1.5">
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                linkedin.com/in/{personal.linkedinHandle}
              </a>
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Github className="w-3 h-3" />
                github.com/{personal.githubHandle}
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 pb-1 mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between font-bold text-slate-200">
                  <span>Bachelor of Computer Applications (BCA) — AI/ML Specialization</span>
                  <span className="text-emerald-400 font-mono">3rd Semester</span>
                </div>
                <div className="text-slate-400">
                  GL Bajaj Institute of Technology & Management, Greater Noida (affiliated to Chaudhary Charan Singh University, Meerut)
                </div>
              </div>
              <div className="text-slate-400 text-xs font-mono">
                Class XII (PCB — Biology): <span className="text-slate-200 font-bold">78.8%</span> | Class X: <span className="text-slate-200 font-bold">80.2%</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 pb-1 mb-3">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div><strong className="text-slate-100">Programming:</strong> C, Python (foundational, coursework and project use)</div>
              <div><strong className="text-slate-100">Web Development:</strong> React, Next.js, HTML, CSS, JavaScript, TypeScript, Tailwind CSS</div>
              <div><strong className="text-slate-100">Database:</strong> MongoDB, SQL (foundational)</div>
              <div><strong className="text-slate-100">Tools & Platforms:</strong> Git, GitHub, Vercel, Render, Google Cloud Run</div>
              <div><strong className="text-slate-100">AI / GenAI:</strong> Generative AI concepts, Prompt Engineering, AI-assisted development, RAG, AI agents (Hermes)</div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 pb-1 mb-3">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((p, idx) => (
                <div key={idx} className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-white">{p.title}</span>
                    <span className="text-xs font-mono text-cyan-400">{p.subtitle}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{p.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                    {p.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Programs & Initiatives */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 pb-1 mb-3">
              PROGRAMS & INITIATIVES
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="font-bold text-slate-200 flex justify-between">
                  <span>Google Student Ambassador</span>
                  <span className="text-emerald-400 font-mono">2026</span>
                </div>
                <div className="text-slate-400 text-xs">
                  Selected as a Google Student Ambassador; engaging with Google developer community programs and campus initiatives.
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-200 flex justify-between">
                  <span>Gen AI Academy — APAC Edition, Cohort 3</span>
                  <span className="text-cyan-400 font-mono">Google Cloud x Hack2Skill, 2026</span>
                </div>
                <div className="text-slate-400 text-xs">
                  Participating in a hands-on program covering AI agent development, Retrieval-Augmented Generation (RAG), and deployment on Google Cloud Run.
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-200">
                  AI-Assisted Development Exposure
                </div>
                <div className="text-slate-400 text-xs">
                  Hands-on experimentation with AI development tools and agent-based workflows (including Hermes) to explore automation and AI-integrated build processes.
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 pb-1 mb-3">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-2">
                  <span><strong className="text-slate-100">{cert.title}</strong> — {cert.issuer}</span>
                  <span className="text-slate-500 font-mono shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
