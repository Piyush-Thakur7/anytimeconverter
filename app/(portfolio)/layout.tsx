import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Piyush Singh — Software Engineer & AI/ML Developer | Google Student Ambassador 2026',
  description: 'Personal portfolio of Piyush Singh: BCA AI/ML student at GL Bajaj, Google Student Ambassador 2026, Gen AI Academy APAC Cohort 3, and full-stack developer.',
  keywords: [
    'Piyush Singh',
    'Software Engineer',
    'AI/ML Developer',
    'Full-Stack Developer',
    'Google Student Ambassador',
    'GL Bajaj',
    'Next.js',
    'React',
    'Python',
    'ServeMATE',
    'AnytimeConverter'
  ],
  authors: [{ name: 'Piyush Singh' }],
  creator: 'Piyush Singh',
  openGraph: {
    title: 'Piyush Singh — Software Engineer & AI/ML Developer',
    description: 'Personal portfolio of Piyush Singh. BCA AI/ML student at GL Bajaj & Google Student Ambassador 2026.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Piyush Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piyush Singh — Software Engineer & AI/ML Developer',
    description: 'Personal portfolio of Piyush Singh: AI/ML & Full-Stack Developer.',
  },
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
