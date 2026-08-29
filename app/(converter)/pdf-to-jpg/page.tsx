import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import PdfToJpgWrapper from './PdfToJpgWrapper';

export const metadata: Metadata = {
  title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
  description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
    description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
    type: "website",
    url: "https://anytimeconverter.resence.in/pdf-to-jpg",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
    description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload PDF Document", text: "Drag and drop your PDF document onto the workspace, or click browse to choose it." },
  { name: "Select Output Quality", text: "Choose the target output quality percentage for the rendered images." },
  { name: "Extract & Render Pages", text: "Click the 'Convert to JPG' button. The converter will process pages directly in browser memory." },
  { name: "Download ZIP", text: "Download all extracted page images formatted as high-quality JPEGs in a single ZIP folder." }
];

const faq = [
  {
    question: "Is my PDF uploaded to any online server?",
    answer: "No. All extraction logic runs locally inside your browser via WebAssembly. Your files are processed entirely in memory and never leave your device."
  },
  {
    question: "Can this tool handle large PDF documents?",
    answer: "Yes, but keep in mind that browser memory (RAM) is the physical limit. Processing very large PDFs (hundreds of pages) may trigger browser-level out-of-memory constraints."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "What formats are the page images saved in?",
    answer: "The rendered output is packaged as high-quality standard JPEG (.jpg) images and saved inside a single compressed ZIP file."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - PDF to JPG",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local conversion",
      "No file size limits or wait queues",
      "Render PDF pages to JPG locally",
      "Supports multiple page downloads in a single ZIP"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert PDF to JPG Privately",
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

export default function PdfToJpgPage() {
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
            Convert PDF to JPG online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <PdfToJpgWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Convert PDF to JPG Privately
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
        <RelatedTools currentTool="pdf-to-jpg" />
      </div>
    </main>
  );
}
