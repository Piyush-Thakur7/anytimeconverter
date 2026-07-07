import type { Metadata } from 'next';
import PdfToJpgClient from './PdfToJpgClient';

export const metadata: Metadata = {
  title: "Convert PDF to JPG Free Online | Extract PDF Pages",
  description: "Extract pages of a PDF document and convert them into high-quality JPEG images 100% locally. Free, private, no file uploads, no watermarks.",
  keywords: [
    "pdf to jpg converter free",
    "extract pages of pdf to images online",
    "convert pdf to jpeg offline",
    "local pdf to image extraction",
    "pdf page extractor online"
  ],
  openGraph: {
    title: "Convert PDF to JPG Free Online | AnytimeConverter",
    description: "Extract PDF pages to JPEG images locally. Files never leave your device. 100% free.",
    type: "website",
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - PDF to JPG",
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
    "Render PDF pages to JPG locally",
    "Supports multiple page downloads in a single ZIP"
  ]
};

export default function PdfToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PdfToJpgClient />
    </>
  );
}
