import type { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
  title: "Split PDF Pages Free | Extract Pages From PDF Online",
  description: "Extract specific pages or page ranges from a PDF document 100% locally. Free, private, no file size limitations, no signups.",
  keywords: [
    "split pdf pages free",
    "extract pages from pdf online",
    "split pdf offline browser",
    "extract pdf sheets free",
    "unlimited pdf splitter"
  ],
  openGraph: {
    title: "Split PDF Pages Free | AnytimeConverter",
    description: "Extract specific pages from PDFs locally in your browser. Files never leave your device. 100% free.",
    type: "website",
  }
};

const schemaData = {
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
    "100% Offline browser-local page extraction",
    "Split PDFs by ranges (e.g. 1-3, 5)",
    "No file size or page limitations",
    "No document uploads required"
  ]
};

export default function SplitPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SplitPdfClient />
    </>
  );
}
