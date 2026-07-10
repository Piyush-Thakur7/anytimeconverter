import type { Metadata } from 'next';
import CompressFileClient from './CompressFileClient';

export const metadata: Metadata = {
  title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
  description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/compress-file",
  },
  openGraph: {
    title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
    description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
    type: "website",
    url: "https://anytimeconverter.resence.in/compress-file",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Files Online — Free, 100% Private | AnytimeConverter",
    description: "Reduce file sizes by compressing any document, image, or media files into a secure, compact ZIP archive. 100% client-side compression in your browser.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

export default function CompressFilePage() {
  return (
    <>
      <CompressFileClient />
    </>
  );
}
