'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  Building, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

export default function EducationSection() {
  const { education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-20 border-b border-zinc-800/80 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
          ACADEMICS & CREDENTIALS
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Education & Industry Certifications
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Formal university degree in AI/ML coupled with verified Google Career and Government of India credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Education Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-zinc-300" />
            <h4 className="text-lg font-bold text-white">Education</h4>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/90 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                    {edu.period}
                  </span>
                  {edu.score && (
                    <span className="text-xs font-mono text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700">
                      Score: {edu.score}
                    </span>
                  )}
                  {edu.status && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {edu.status}
                    </span>
                  )}
                </div>

                <div>
                  <h5 className="text-base font-bold text-white">
                    {edu.degree}
                  </h5>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">
                    {edu.specialization}
                  </div>
                </div>

                <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>{edu.institution}</span>
                </div>

                {edu.affiliation && (
                  <p className="text-xs text-zinc-500 italic">
                    {edu.affiliation}
                  </p>
                )}

                {/* Coursework */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase mb-1.5">
                    Coursework & Topics:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((cw, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
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
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-zinc-300" />
            <h4 className="text-lg font-bold text-white">Verified Certifications</h4>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/90 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {cert.date}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white">
                  {cert.title}
                </h5>

                <p className="text-xs text-zinc-400">
                  {cert.issuer}
                </p>

                <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap gap-1">
                  {cert.skillsCovered.map((sc, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
