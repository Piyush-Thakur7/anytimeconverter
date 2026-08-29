import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import SplitPdfWrapper from './SplitPdfWrapper';

export const metadata: Metadata = {
  title: "Split PDF Pages Online — Free & Private | AnytimeConverter",
  description: "Extract specific pages or page ranges from a PDF document into a new PDF locally in your browser. Complete privacy, no file uploads.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/split-pdf",
  },
  openGraph: {
    title: "Split PDF Pages Online — Free & Private | AnytimeConverter",
    description: "Extract specific pages or page ranges from a PDF document into a new PDF locally in your browser. Complete privacy, no file uploads.",
    type: "website",
    url: "https://anytimeconverter.resence.in/split-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Pages Online — Free & Private | AnytimeConverter",
    description: "Extract specific pages or page ranges from a PDF document into a new PDF locally in your browser. Complete privacy, no file uploads.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload PDF File", text: "Drag and drop your PDF document onto the workspace, or click browse to choose it." },
  { name: "Input Target Pages", text: "Specify target page numbers or ranges (e.g., 1-3, 5) to extract." },
  { name: "Split Document", text: "Click the 'Split PDF' button to compile extracted sections in browser memory." },
  { name: "Download PDF", text: "Download the newly sliced PDF document instantly." }
];

const faq = [
  {
    question: "How does the Split PDF tool secure my documents?",
    answer: "All files are parsed and extracted locally using WebAssembly. No data is sent to external servers, providing 100% security."
  },
  {
    question: "Are there any page range limits?",
    answer: "You can specify single pages, page lists (e.g., 1, 3, 5), or ranges (e.g., 2-5). The format must be comma-separated."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "Can this tool handle large documents offline?",
    answer: "Yes. Because processing runs in-browser, memory limits (RAM) on your computer act as the physical bottleneck. Slicing files with thousands of pages may trigger browser out-of-memory errors."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - Split PDF",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local split",
      "Extract pages, lists, or custom ranges",
      "No file size or page limitations",
      "No document uploads required"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Split PDF Pages Privately",
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

export default function SplitPdfPage() {
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
            Split PDF pages online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Extract specific pages or page ranges from a PDF document into a new PDF locally in your browser. Complete privacy, no file uploads.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <SplitPdfWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Split PDF Pages Privately
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
        <RelatedTools currentTool="split-pdf" />
      </div>
    </main>
  );
}
