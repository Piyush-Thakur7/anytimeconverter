import type { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

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
