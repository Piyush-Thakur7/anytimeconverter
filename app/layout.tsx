import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
  title: "Anytime Fitness Sikandrabad | Best Gym in Sikandrabad, Bulandshahr",
  description: "Your Transformation Starts Here. Anytime Fitness Sikandrabad is a high-end, 24/7 access gym equipped with premium strength training and cardio machinery, certified personal trainers, group classes, and customized transformation programs.",
  keywords: [
    "Anytime Fitness Sikandrabad", 
    "Best gym in Sikandrabad", 
    "Gyms in Sikandrabad", 
    "Bulandshahr fitness center", 
    "24/7 gym Sikandrabad",
    "Personal training Sikandrabad",
    "Zumba classes Sikandrabad",
    "Weight loss program Sikandrabad"
  ],
  openGraph: {
    title: "Anytime Fitness Sikandrabad | Best Gym in Sikandrabad",
    description: "Your Transformation Starts Here. Train hard, stay strong with 24/7 access, elite equipment, and expert trainers.",
    type: "website",
    locale: "en_IN",
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
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
