import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Grand Regent — Luxury Wedding & Banquet Venue",
  description: "Experience the epitome of luxury at The Grand Regent. A premium, five-star wedding and banquet venue for your dream celebrations. Capacity up to 800 guests, in-house catering, and expert planning.",
  keywords: ["wedding venue", "banquet hall", "luxury wedding", "wedding reception", "marriage hall", "party venue"],
};

export default function VenueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Override background and foreground variables dynamically using html element style
  const htmlStyles = {
    '--background': '#faf7f2',
    '--foreground': '#0f172a',
  } as React.CSSProperties;

  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
      style={htmlStyles}
    >
      <body 
        className="min-h-full bg-background text-foreground font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#6b1d2f]"
      >
        {children}
      </body>
    </html>
  );
}
