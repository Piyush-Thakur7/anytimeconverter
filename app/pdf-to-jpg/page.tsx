import type { Metadata } from 'next';
import PdfToJpgClient from './PdfToJpgClient';

export const metadata: Metadata = {
  title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
  description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
    description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
    type: "website",
    url: "https://anytimeconverter.resence.in/pdf-to-jpg",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to JPG Converter — Free, No Signup | AnytimeConverter",
    description: "Extract pages of your PDF document and convert them into high-quality JPEG images locally. Free, private, no file uploads, no watermarks.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
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
