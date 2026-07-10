import type { Metadata } from 'next';
import WordToPdfClient from './WordToPdfClient';

export const metadata: Metadata = {
  title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
  description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/word-to-pdf",
  },
  openGraph: {
    title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
    type: "website",
    url: "https://anytimeconverter.resence.in/word-to-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert Microsoft Word (.docx) or Text (.txt) files into clean, formatted PDFs locally in your browser. No signups, no document uploads.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - Word to PDF",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "100% Offline browser-local conversion",
    "Convert DOCX and TXT files to PDF",
    "Zero data leakage - files never uploaded",
    "Free and unlimited"
  ]
};

export default function WordToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <WordToPdfClient />
    </>
  );
}
