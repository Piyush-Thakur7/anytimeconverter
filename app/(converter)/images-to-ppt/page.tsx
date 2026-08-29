import type { Metadata } from 'next';
import Link from 'next/link';
import TrustStrip from '@/components/TrustStrip';
import OfflineIndicator from '@/components/OfflineIndicator';
import PrivacyExplainer from '@/components/PrivacyExplainer';
import ToolFAQ from '@/components/ToolFAQ';
import RelatedTools from '@/components/RelatedTools';
import ImagesToPptWrapper from './ImagesToPptWrapper';

export const metadata: Metadata = {
  title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
  description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/images-to-ppt",
  },
  openGraph: {
    title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
    description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    type: "website",
    url: "https://anytimeconverter.resence.in/images-to-ppt",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
    description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const steps = [
  { name: "Upload Images", text: "Drag and drop one or more images into the slide editor workspace, or click browse." },
  { name: "Set Scaling & Layout", text: "Select slide orientation (16:9 widescreen or 4:3 standard) and scale mode (fit page or fill cover)." },
  { name: "Reorder Slides", text: "Arrange slide sequence by clicking left/right arrows on previews." },
  { name: "Download Presentation", text: "Download slide show directly as a PowerPoint presentation (.pptx) file." }
];

const faq = [
  {
    question: "Does this tool send my photos to external servers?",
    answer: "No. PowerPoint documents are generated entirely inside your browser using client-side libraries. Your images never leave your local workspace."
  },
  {
    question: "What is the limit of slide pages?",
    answer: "There is no hard page limit. However, converting large batches of high-resolution images can easily exceed browser memory and crash the tab. We recommend reducing image sizes first if you experience performance issues."
  },
  {
    question: "Can I use this tool offline?",
    answer: "Yes. Once the page is loaded, you can turn off your Wi-Fi or unplug your internet. The conversion logic will function fully offline."
  },
  {
    question: "Does the output PowerPoint presentation include watermarks?",
    answer: "No. The compiled PPTX slide deck is clean, standard, editable, and free of any advertisements or company logos."
  }
];

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnytimeConverter - Images to PPTX",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "100% Offline browser-local conversion",
      "Convert images to slides without upload",
      "Supports custom orientation (16:9 or 4:3)",
      "Supports fit or fill cover scaling modes"
    ],
    "browserRequirements": "Requires HTML5 and WebAssembly supporting browser."
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Images to PowerPoint Privately",
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

export default function ImagesToPptPage() {
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
            Convert images to PowerPoint online — free and private
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed font-medium">
            Turn your photos (JPG, PNG, WebP) into a PowerPoint presentation (.pptx) instantly in your browser. No upload, no signup, no watermark.
          </p>
          
          <div className="pt-2 space-y-3">
            <TrustStrip />
            <OfflineIndicator />
          </div>
        </div>

        {/* Dynamic Island */}
        <ImagesToPptWrapper />

        {/* Steps List */}
        <section id="how-it-works" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to Convert Images to PowerPoint Privately
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
        <RelatedTools currentTool="images-to-ppt" />
      </div>
    </main>
  );
}
