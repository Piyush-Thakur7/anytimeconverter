import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnytimeConverter — Free Online PDF & Image Converter, 100% Private",
  description: "Convert and modify files locally in your browser. No file size limits, no signups, no uploads. Convert JPG to PDF, PDF to JPG, Merge PDFs, and resize images offline.",
  metadataBase: new URL("https://anytimeconverter.resence.in"),
  keywords: [
    "file converter",
    "pdf to jpg converter free",
    "jpg to pdf converter no signup",
    "merge pdf online",
    "image size rescaler",
    "convert docx to pdf",
    "offline file converter"
  ],
  alternates: {
    canonical: "https://anytimeconverter.resence.in",
  },
  openGraph: {
    title: "AnytimeConverter — Free Online PDF & Image Converter, 100% Private",
    description: "Convert and modify files locally in your browser. No file size limits, no signups, no uploads. Convert JPG to PDF, PDF to JPG, Merge PDFs, and resize images offline.",
    type: "website",
    locale: "en_US",
    url: "https://anytimeconverter.resence.in",
    siteName: "AnytimeConverter",
    images: [
      {
        url: "https://anytimeconverter.resence.in/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AnytimeConverter - 100% Local Offline File Converter",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnytimeConverter — Free Online PDF & Image Converter, 100% Private",
    description: "Convert and modify files locally in your browser. No file size limits, no signups, no uploads. Convert JPG to PDF, PDF to JPG, Merge PDFs, and resize images offline.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
