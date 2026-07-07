import type { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
  title: "Split PDF Pages — Free, No Signup | AnytimeConverter",
  description: "Extract specific pages or custom page ranges from your PDF document 100% locally. Free, private, no size limits, no signups.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/split-pdf",
  },
  openGraph: {
    title: "Split PDF Pages — Free, No Signup | AnytimeConverter",
    description: "Extract specific pages or custom page ranges from your PDF document 100% locally. Free, private, no size limits, no signups.",
    type: "website",
    url: "https://anytimeconverter.resence.in/split-pdf",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Pages — Free, No Signup | AnytimeConverter",
    description: "Extract specific pages or custom page ranges from your PDF document 100% locally. Free, private, no size limits, no signups.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AnytimeConverter - Split PDF",
  "operatingSystem": "All",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "100% Offline browser-local page extraction",
    "Split PDFs by ranges (e.g. 1-3, 5)",
    "No file size or page limitations",
    "No document uploads required"
  ]
};

export default function SplitPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SplitPdfClient />
    </>
  );
}
