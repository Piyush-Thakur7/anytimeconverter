import type { Metadata } from 'next';
import ImagesToPptClient from './ImagesToPptClient';

export const metadata: Metadata = {
  title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
  description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/images-to-ppt",
  },
  openGraph: {
    title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
    description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    type: "website",
    url: "https://anytimeconverter.resence.in/images-to-ppt",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG/PNG to PPT Converter — Free, No Signup | AnytimeConverter",
    description: "Turn your photos into a PowerPoint presentation instantly in your browser. No upload, no signup, no watermark. 100% private and free.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - Images to PPTX",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "100% Offline browser-local conversion",
    "Convert images to slides without upload",
    "Supports custom orientation (16:9 or 4:3)",
    "Supports fit or fill cover scaling modes"
  ]
};

export default function ImagesToPptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ImagesToPptClient />
    </>
  );
}
