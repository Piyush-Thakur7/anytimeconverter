'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  ArrowUpRight 
} from 'lucide-react';

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section id="contact" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
          GET IN TOUCH
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Let&apos;s Discuss Engineering & Opportunities
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Available for software engineering internships, AI/ML roles, hackathons, and collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information (5 Cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Email */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] text-zinc-500 font-mono">Email</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100 truncate font-mono">
                  {personal.email}
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(personal.email, 'email')}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
              title="Copy email"
            >
              {copiedField === 'email' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] text-zinc-500 font-mono">Phone</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100 truncate font-mono">
                  {personal.phone}
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(personal.phone, 'phone')}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
              title="Copy phone"
            >
              {copiedField === 'phone' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between transition-colors block"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Linkedin className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] text-zinc-500 font-mono">LinkedIn</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100 truncate font-mono">
                  in/{personal.linkedinHandle}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
          </a>

          {/* GitHub */}
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between transition-colors block"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Github className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] text-zinc-500 font-mono">GitHub</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100 truncate font-mono">
                  github/{personal.githubHandle}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
          </a>

          <div className="p-3.5 rounded-xl bg-zinc-900/20 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>Located in {personal.location} (Open to Remote & Relocation)</span>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h4 className="text-base font-bold text-white mb-4">
              Send Direct Message
            </h4>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <div className="text-sm font-bold text-emerald-400">Message Prepared!</div>
                <p className="text-xs text-zinc-300">
                  Your email client has been opened. You can also write directly to{' '}
                  <span className="font-mono text-white font-semibold">{personal.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-mono text-zinc-400 hover:text-white underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Technical Collaboration"
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about the role, project, or inquiry..."
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-zinc-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Opening Mail Client...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
