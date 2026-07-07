import type { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';

export const metadata: Metadata = {
  title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
  description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/image-converter",
  },
  openGraph: {
    title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
    description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
    type: "website",
    url: "https://anytimeconverter.resence.in/image-converter",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Rescaler & Converter — Free, No Signup | AnytimeConverter",
    description: "Resize image dimensions, lock aspect ratio, adjust quality, and convert between PNG, JPG, and WebP format locally and privately.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
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
