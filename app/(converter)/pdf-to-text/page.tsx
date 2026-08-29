import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import PdfToTextWrapper from './PdfToTextWrapper';

export const metadata: Metadata = {
  title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
  description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/pdf-to-text",
  },
  openGraph: {
    title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
    description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
    type: "website",
    url: "https://anytimeconverter.resence.in/pdf-to-text",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
    description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload PDF", text: "Choose or drop your PDF document onto the workspace." },
  { name: "Select Extraction Mode", text: "Select Native Text Layer or Optical Character Recognition (OCR) for scanned documents." },
  { name: "Extract Text", text: "Click the 'Extract Text' button to let the engine read and compile raw text locally." },
  { name: "Save Output", text: "Copy the extracted text directly or download it as a plain text (.txt) file." }
];

const faq = [
  {
    question: "How does OCR work locally on scanned PDFs?",
    answer: "We bundle Tesseract.js WebAssembly workers locally. When a scanned PDF is uploaded, the OCR model executes page-by-page inside your browser, reading letters from pixels."
  },
  {
    question: "Is my document secure with local OCR?",
    answer: "Yes. The language model assets and OCR worker script load from our domain, meaning your document contents never traverse external APIs or services."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "What are the limitations of local text extraction?",
    answer: "Extracting text from massive documents takes considerable processing power. System RAM and browser memory buffers represent the physical limits."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - PDF to Text",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local text extraction",
      "Copy text directly or download as text files",
      "Zero network uploads to protect text content",
      "Works on scanned selectable PDFs"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Extract Text from PDF Privately",
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

export default function PdfToTextPage() {
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
            Extract text from PDF online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <PdfToTextWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Extract Text from PDF Privately
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
        <RelatedTools currentTool="pdf-to-text" />
      </div>
    </main>
  );
}
