'use client';

import React, { useState } from 'react';
import PortfolioNavbar from '@/components/portfolio/PortfolioNavbar';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import EducationSection from '@/components/portfolio/EducationSection';
import ContactSection from '@/components/portfolio/ContactSection';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import ResumeModal from '@/components/portfolio/ResumeModal';

export default function PortfolioPage() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-100">
      {/* Navigation */}
      <PortfolioNavbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content */}
      <main>
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <PortfolioFooter />

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
