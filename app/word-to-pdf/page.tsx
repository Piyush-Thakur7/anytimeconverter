import type { Metadata } from 'next';
import WordToPdfClient from './WordToPdfClient';

export const metadata: Metadata = {
  title: "Convert Word to PDF Free Online | DOCX to PDF",
  description: "Convert your Microsoft Word (.docx) or Text (.txt) files into clean, readable PDF documents 100% locally in your browser. Free, private, no file uploads.",
  keywords: [
    "convert docx to pdf free",
    "word to pdf converter offline",
    "docx to pdf browser converter",
    "convert text files to pdf free",
    "unlimited word to pdf tool"
  ],
  openGraph: {
    title: "Convert Word to PDF Free Online | AnytimeConverter",
    description: "Convert Word documents to PDFs locally in your browser. Files never leave your device. 100% free.",
    type: "website",
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
