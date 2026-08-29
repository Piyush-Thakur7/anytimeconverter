import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import WordToPdfWrapper from './WordToPdfWrapper';

export const metadata: Metadata = {
  title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
  description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/word-to-pdf",
  },
  openGraph: {
    title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
    type: "website",
    url: "https://anytimeconverter.resence.in/word-to-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload Word Document", text: "Select or drop your Microsoft Word (.docx) or plain text (.txt) file onto the workspace." },
  { name: "Convert Locally", text: "Click the 'Convert to PDF' button. The conversion starts immediately inside browser memory." },
  { name: "Download PDF", text: "Save the newly rendered PDF file directly to your device." }
];

const faq = [
  {
    question: "Does my Word document get uploaded to any servers?",
    answer: "No. Word to PDF conversion uses standard browser compilation libraries that parse .docx XML tags and generate PDFs entirely client-side."
  },
  {
    question: "Does it preserve complex document formatting?",
    answer: "We render basic text styling, lists, headings, and alignments. Highly complex Word structures, macros, or nested tables may have small differences due to client-side font and format constraints."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "Can I convert large text or Docx files?",
    answer: "Yes, although large documents require more memory. System RAM and browser memory buffers represent the physical limits."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - Word to PDF",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local conversion",
      "Convert DOCX and TXT files to PDF",
      "Zero data leakage - files never uploaded",
      "Free and unlimited"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Word to PDF Privately",
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.name,
      "text": step.text
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
];

export default function WordToPdfPage() {
  return (
    <main className="pt-24 pb-12 animate-fade-in px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link & Header */}
        <div className="text-center space-y-4">
          <div className="text-left mb-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>All Tools</span>
            </Link>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Word to PDF converter — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <WordToPdfWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Convert Word to PDF Privately
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-foreground">{step.name}</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Explainer */}
        <PrivacyExplainer />

        {/* Tool-specific FAQ */}
        <ToolFAQ faq={faq} />

        {/* Sibling Link Cards */}
        <RelatedTools currentTool="word-to-pdf" />
      </div>
    </main>
  );
}
