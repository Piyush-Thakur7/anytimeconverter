import type { Metadata } from 'next';
import PdfToTextClient from './PdfToTextClient';

export const metadata: Metadata = {
  title: "Extract Text From PDF Free Online | PDF to Text",
  description: "Extract raw text from PDF files 100% locally in your browser. Copy text contents directly or download as a TXT file safely.",
  keywords: [
    "extract text from pdf free",
    "pdf to txt converter online",
    "pdf text extractor offline",
    "read text from pdf free",
    "local pdf to text converter"
  ],
  openGraph: {
    title: "Extract Text From PDF Free Online | AnytimeConverter",
    description: "Extract text from PDFs locally in your browser. Files never leave your device. 100% free.",
    type: "website",
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - PDF to Text",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "100% Offline browser-local text extraction",
    "Copy text directly or download as text files",
    "Zero network uploads to protect text content",
    "Works on scanned selectable PDFs"
  ]
};

export default function PdfToTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PdfToTextClient />
    </>
  );
}
