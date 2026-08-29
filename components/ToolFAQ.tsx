import React from 'react';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface ToolFAQProps {
  faq: FAQItem[];
}

export default function ToolFAQ({ faq }: ToolFAQProps) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faq.map((item, idx) => (
          <details
            key={idx}
            className="group bg-card border border-card-border rounded-xl p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <span className="font-bold text-sm sm:text-base text-foreground group-open:text-accent transition-colors">
                {item.question}
              </span>
              <span className="transition-transform group-open:rotate-180 text-foreground/50 ml-1 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="mt-3 text-xs sm:text-sm text-foreground/75 leading-relaxed font-medium border-t border-card-border/50 pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
