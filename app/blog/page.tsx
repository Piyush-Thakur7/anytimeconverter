import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AnytimeConverter Blog | Document Processing & Security Tips",
  description: "Read articles about secure file conversion, PDF management, WebAssembly local processing, and data privacy tips.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/blog",
  },
  openGraph: {
    title: "AnytimeConverter Blog | Document Processing & Security Tips",
    description: "Read articles about secure file conversion, PDF management, WebAssembly local processing, and data privacy tips.",
    type: "website",
    url: "https://anytimeconverter.resence.in/blog",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnytimeConverter Blog | Document Processing & Security Tips",
    description: "Read articles about secure file conversion, PDF management, WebAssembly local processing, and data privacy tips.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

export default function BlogPage() {
  const posts = [
    {
      title: "Why Client-Side Conversion is the Future of Data Privacy",
      excerpt: "Traditional document converters require you to upload files to their servers. Learn how WebAssembly allows AnytimeConverter to run entirely in your browser, keeping your sensitive documents 100% secure.",
      date: "July 7, 2026",
      readTime: "4 min read"
    },
    {
      title: "How to Merge and Split PDF Files Without Uploading Them Online",
      excerpt: "Sharing contracts, tax forms, or resumes with online servers can expose your details. Here is a step-by-step guide to merging and splitting PDFs offline on your device.",
      date: "June 28, 2026",
      readTime: "3 min read"
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-32 animate-fade-in text-left">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          AnytimeConverter Blog
        </h1>
        <p className="text-sm sm:text-base text-foreground/70 max-w-xl leading-relaxed">
          Insights, tutorials, and security guides on managing your PDF documents and media files securely.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post, idx) => (
          <article key={idx} className="p-6 rounded-xl bg-card border border-card-border shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-xs text-foreground/50 font-semibold">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-medium">
              {post.excerpt}
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-accent hover:text-accent-hover transition-colors cursor-pointer">
                Read Article &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
