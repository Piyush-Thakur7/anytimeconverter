import type { Metadata } from 'next';
import PdfToTextClient from './PdfToTextClient';

export const metadata: Metadata = {
  title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
  description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/pdf-to-text",
  },
  openGraph: {
    title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
    description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
    type: "website",
    url: "https://anytimeconverter.resence.in/pdf-to-text",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract Text from PDF — Free, No Signup | AnytimeConverter",
    description: "Extract raw text content from any PDF file 100% locally in your browser. Copy text directly or download as a TXT file safely.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
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
