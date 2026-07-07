import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnytimeConverter | Free 100% Local File Converter",
  description: "Convert and modify files locally in your browser. No file size limits, no signups, no uploads. Convert JPG to PDF, PDF to JPG, Merge PDFs, and resize images offline.",
  keywords: [
    "file converter",
    "pdf to jpg converter free",
    "jpg to pdf converter no signup",
    "merge pdf online",
    "image size rescaler",
    "convert docx to pdf",
    "offline file converter"
  ],
  openGraph: {
    title: "AnytimeConverter | Free Local File Converter",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#0f172a] dark:bg-[#0f172a] dark:text-[#f8fafc] transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
