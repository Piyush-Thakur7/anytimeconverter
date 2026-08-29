'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  Calendar,
  Building,
  School,
  FileCheck
} from 'lucide-react';

export default function EducationCerts() {
  const { education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="education" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>ACADEMICS & CERTIFICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Education & <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Credentials</span>
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Specialized computer application studies combined with Google Career and Govt. of India certified AI specializations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Education Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">Academic Journey</h3>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/40 backdrop-blur-2xl transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-semibold">
                    {edu.period}
                  </span>
                  {edu.score && (
                    <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                      Score: {edu.score}
                    </span>
                  )}
                  {edu.status && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      {edu.status}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold text-white mb-1">
                  {edu.degree}
                </h4>
                <div className="text-sm text-cyan-400 font-medium font-mono mb-2">
                  {edu.specialization}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{edu.institution}</span>
                </div>

                {edu.affiliation && (
                  <p className="text-xs text-slate-500 italic mb-4">
                    {edu.affiliation}
                  </p>
                )}

                {/* Coursework */}
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Core Coursework & Modules:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((cw, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                      >
                        {cw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">Verified Credentials</h3>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-2xl transition-all duration-300 shadow-xl group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Credential</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.date}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {cert.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {cert.issuer}
                </p>

                {/* Covered Modules */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Competencies & Tooling:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsCovered.map((sc, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                      >
                        {sc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Special Highlight Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 border border-emerald-500/30 backdrop-blur-2xl">
              <div className="flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    Continuous Research Track
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Active hands-on experimentation in autonomous multi-agent orchestration, local speech synthesis, and high-performance WebAssembly compilation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
