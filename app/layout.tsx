import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlexConvert | Universal Offline File Converter",
  description: "Convert and process files 100% locally in your browser. Convert JPG to PDF, PDF to JPG, Merge/Split PDFs, resize images, and convert Word/Text formats with absolute privacy.",
  keywords: [
    "file converter",
    "pdf to jpg",
    "jpg to pdf",
    "merge pdf",
    "split pdf",
    "image resizer",
    "word to pdf",
    "local converter",
    "private converter"
  ],
  openGraph: {
    title: "FlexConvert | Universal Client-Side File Converter",
    description: "Privacy-first local file conversion suite. No uploads, no limits, instant conversions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
