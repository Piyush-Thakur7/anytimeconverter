import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import CompressFileWrapper from './CompressFileWrapper';

export const metadata: Metadata = {
  title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
  description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/compress-file",
  },
  openGraph: {
    title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
    description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
    type: "website",
    url: "https://anytimeconverter.resence.in/compress-file",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
    description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload Files", text: "Choose or drop files of any format (images, PDF, Word, videos) onto the workspace." },
  { name: "Configure ZIP Name & Quality", text: "Specify the target name of your output ZIP archive and choose a compression level." },
  { name: "Deflate & Pack", text: "Click 'Compress Files' to deflate and bundle items locally in browser memory." },
  { name: "Save ZIP", text: "Save the resulting compact ZIP file directly to your computer." }
];

const faq = [
  {
    question: "How does local ZIP compression work?",
    answer: "We use standard JSZip compression libraries executing local Deflate algorithms. No network requests are made, keeping your files completely secure."
  },
  {
    question: "What files are supported?",
    answer: "You can compress any format (PDF, Word, photos, audios, videos, etc.) into the ZIP container."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The compression logic will function fully offline."
  },
  {
    question: "Are there size limits?",
    answer: "While we set no artificial size limits, files are read into browser RAM. Squeezing multiple gigabytes may crash the page due to browser memory limits."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - File Compressor",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local compression",
      "Deflate files into secure ZIP archive",
      "No file upload or bandwidth limits",
      "Supports any document or media file format"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compress Files Privately",
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

export default function CompressFilePage() {
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
            Compress files online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <CompressFileWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Compress Files Privately
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
        <RelatedTools currentTool="compress-file" />
      </div>
    </main>
  );
}
