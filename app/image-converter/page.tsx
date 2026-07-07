import type { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';

export const metadata: Metadata = {
  title: "Resize & Convert Images Online Free | Image Rescaler",
  description: "Resize, compress, and convert images (PNG, JPG, WebP) 100% locally in your browser. Free, private, no registration, no watermarks.",
  keywords: [
    "resize image online free",
    "convert png to webp",
    "image size rescaler",
    "jpeg compressor offline",
    "png to jpg converter free"
  ],
  openGraph: {
    title: "Resize & Convert Images Online Free | AnytimeConverter",
    description: "Resize and compress images locally in your browser. Files never leave your device. 100% free.",
    type: "website",
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - Image Rescaler",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "100% Offline browser-local image processing",
    "Resize width and height in pixels",
    "Lock aspect ratios during resizing",
    "Compress quality and convert file format"
  ]
};

export default function ImageConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ImageConverterClient />
    </>
  );
}
