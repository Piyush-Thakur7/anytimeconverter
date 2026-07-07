import type { Metadata } from 'next';
import JpgToPdfClient from './JpgToPdfClient';

export const metadata: Metadata = {
  title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
  description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/jpg-to-pdf",
  },
  openGraph: {
    title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    type: "website",
    url: "https://anytimeconverter.resence.in/jpg-to-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter — Free, No Signup | AnytimeConverter",
    description: "Convert JPG images to PDF instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - JPG to PDF",
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
    "No image upload required (fully client-side)",
    "Convert JPG, PNG, and WebP to PDF"
  ]
};

export default function JpgToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <JpgToPdfClient />
    </>
  );
}
