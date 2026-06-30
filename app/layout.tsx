import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StyleName — Fancy Names & Fonts for Free Fire, BGMI & More",
  description: "Convert plain text into stylish Unicode text and copy invisible characters for gaming nicknames. Generate cool fonts for Free Fire, BGMI, and PUBG.",
  keywords: ["fancy text generator", "invisible character", "free fire nickname", "bgmi stylish name", "unicode fonts"],
  metadataBase: new URL("https://stylename.resence.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="flex-grow flex flex-col justify-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
