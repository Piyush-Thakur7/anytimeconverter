import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import MergePdfWrapper from './MergePdfWrapper';

export const metadata: Metadata = {
  title: "Merge PDF Files — Free, No Signup | AnytimeConverter",
  description: "Combine multiple PDF documents into a single PDF file locally in your browser. Instant, no page limits, no file uploads, complete privacy.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF Files — Free, No Signup | AnytimeConverter",
    description: "Combine multiple PDF documents into a single PDF file locally in your browser. Instant, no page limits, no file uploads, complete privacy.",
    type: "website",
    url: "https://anytimeconverter.resence.in/merge-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files — Free, No Signup | AnytimeConverter",
    description: "Combine multiple PDF documents into a single PDF file locally in your browser. Instant, no page limits, no file uploads, complete privacy.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Select PDF Documents", text: "Drag and drop two or more PDF files you want to combine, or click browse." },
  { name: "Arrange File Order", text: "Use the sequence adjustment arrows to arrange the order of your documents." },
  { name: "Merge Files", text: "Click the 'Merge PDF' button. The compiler will merge documents in local browser memory." },
  { name: "Download PDF", text: "Download the consolidated combined PDF document instantly." }
];

const faq = [
  {
    question: "How secure is the PDF merging process?",
    answer: "It is completely secure because all merging calculations execute inside your web browser. No server uploads are triggered, so your documents remain 100% private."
  },
  {
    question: "Is there a maximum limit of PDF files I can merge?",
    answer: "You can select as many PDFs as you want. However, because merging is executed in-browser, combining hundreds of megabytes of PDF files may be constrained by your device's system memory (RAM)."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "Does the merged file have any watermarks?",
    answer: "No. AnytimeConverter is completely free and never adds watermarks, advertisements, or page logos to your documents."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - Merge PDF",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local merging",
      "Combine multiple PDFs in custom order",
      "No file size or page limitations",
      "No document uploads required"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Merge PDF Files Privately",
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

export default function MergePdfPage() {
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
            Merge PDF files online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Combine multiple PDF documents into a single PDF file locally in your browser. Instant, no page limits, no file uploads, complete privacy.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <MergePdfWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Merge PDF Files Privately
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
        <RelatedTools currentTool="merge-pdf" />
      </div>
    </main>
  );
}
