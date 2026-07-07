import type { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

export const metadata: Metadata = {
  title: "Merge PDF Files Free | Combine PDFs Online",
  description: "Combine multiple PDF documents into a single PDF file 100% locally. Instant, no page limits, no file uploads, complete privacy.",
  keywords: [
    "merge pdf free online",
    "combine pdf files no upload",
    "merge pdf offline browser",
    "join pdf documents free",
    "unlimited pdf merger"
  ],
  openGraph: {
    title: "Merge PDF Files Free | AnytimeConverter",
    description: "Combine multiple PDFs locally in your browser. Files never leave your device. 100% free.",
    type: "website",
  }
};

const schemaData = {
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
  ]
};

export default function MergePdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <MergePdfClient />
    </>
  );
}
