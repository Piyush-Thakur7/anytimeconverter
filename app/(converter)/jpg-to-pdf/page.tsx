import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import JpgToPdfWrapper from './JpgToPdfWrapper';

export const metadata: Metadata = {
  title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
  description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/jpg-to-pdf",
  },
  openGraph: {
    title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    type: "website",
    url: "https://anytimeconverter.resence.in/jpg-to-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload Images", text: "Drag and drop your JPG, PNG, or WebP files onto the converter workspace, or click browse to choose them." },
  { name: "Set Margins", text: "Optionally specify page margins (in mm) to leave clean spaces around your image pages." },
  { name: "Reorder Pages", text: "Hover over the page previews and click the left/right arrows to arrange the document sequence." },
  { name: "Generate and Download", text: "Click the 'Convert to PDF' button. The conversion will run locally, and you can download your PDF." }
];

const faq = [
  {
    question: "Does this tool upload my images to any server?",
    answer: "No. AnytimeConverter operates 100% locally in your web browser via WebAssembly. Your files are processed entirely in memory and never leave your device."
  },
  {
    question: "Is there a limit on file size?",
    answer: "While we place no artificial file size limits, your browser's system memory (RAM) serves as the physical limit. Extremely large image batches may constrain browser memory and cause page crashes."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "Does it support PNG and WebP files?",
    answer: "Yes. Our engine processes PNG and WebP formats exactly the same as JPG files and compiles them into a single PDF document."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - JPG to PDF",
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
      "No image upload required (fully client-side)",
      "Convert JPG, PNG, and WebP to PDF"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert JPG to PDF Privately",
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

export default function JpgToPdfPage() {
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
            Convert JPG to PDF online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Combine and convert your images (JPG, PNG, WebP) into a high-quality PDF document instantly. All conversions run locally inside your browser for total privacy.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <JpgToPdfWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Convert JPG to PDF Privately
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
        <RelatedTools currentTool="jpg-to-pdf" />
      </div>
    </main>
  );
}
