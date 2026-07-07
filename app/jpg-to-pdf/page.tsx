import type { Metadata } from 'next';
import JpgToPdfClient from './JpgToPdfClient';

export const metadata: Metadata = {
  title: "Convert JPG to PDF No Signup | Free Image to PDF Online",
  description: "Combine and convert images (JPG, PNG, WebP) into a single PDF document 100% locally in your browser. No file size limits, no uploads, total privacy.",
  keywords: [
    "jpg to pdf converter free",
    "convert jpg to pdf no signup",
    "combine images to pdf online",
    "local image to pdf",
    "png to pdf online free"
  ],
  openGraph: {
    title: "Convert JPG to PDF No Signup | AnytimeConverter",
    description: "Combine and convert images locally. Files never leave your device. Instant and 100% free.",
    type: "website",
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
