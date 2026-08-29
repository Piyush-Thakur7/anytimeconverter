import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import ImageConverterWrapper from './ImageConverterWrapper';

export const metadata: Metadata = {
  title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
  description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/image-converter",
  },
  openGraph: {
    title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
    description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
    type: "website",
    url: "https://anytimeconverter.resence.in/image-converter",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
    description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload Photo", text: "Drag and drop your image file onto the workspace, or click browse." },
  { name: "Configure Settings", text: "Set target width/height, quality percentage, or input a custom size limit in KB." },
  { name: "Convert & Rescale", text: "Select your desired output format (PNG, JPG, or WebP) and start local processing." },
  { name: "Save Image", text: "Download the rescaled and compressed image file instantly." }
];

const faq = [
  {
    question: "How does target size compression work?",
    answer: "Our engine runs a smart client-side loop: it sweeps quality settings and, if needed, rescales dimensions until the output fits within your target KB limit."
  },
  {
    question: "Is my photo kept private?",
    answer: "Yes, all canvas rendering and format conversion calculations happen strictly inside your local device cache via HTML5 Canvas APIs."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "What is the maximum resolution?",
    answer: "Modern browsers support canvas sizes up to 16384x16384px. Files larger than this may be automatically scaled down or fail due to browser memory limits."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - Image Rescaler",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local image processing",
      "Resize width and height in pixels",
      "Lock aspect ratios during resizing",
      "Compress quality and convert file format"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Resize & Convert Images Privately",
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

export default function ImageConverterPage() {
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
            Resize & convert images online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Scale image dimensions, compress file sizes to target KB, and convert formats (PNG, JPG, WebP) locally. Free, private, and offline.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <ImageConverterWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Resize & Convert Images Privately
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
        <RelatedTools currentTool="image-converter" />
      </div>
    </main>
  );
}
