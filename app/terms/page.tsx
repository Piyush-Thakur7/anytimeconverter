import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | AnytimeConverter",
  description: "Read AnytimeConverter's terms of service and usage conditions for free, local browser file processing.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/terms",
  },
  openGraph: {
    title: "Terms & Conditions | AnytimeConverter",
    description: "Read AnytimeConverter's terms of service and usage conditions for free, local browser file processing.",
    type: "website",
    url: "https://anytimeconverter.resence.in/terms",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | AnytimeConverter",
    description: "Read AnytimeConverter's terms of service and usage conditions for free, local browser file processing.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-32 animate-fade-in text-left">
      <div className="space-y-4 mb-10 border-b border-card-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-xs text-foreground/50 font-semibold uppercase tracking-wider">
          Last updated: July 7, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-foreground/80 font-medium">
        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AnytimeConverter (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;), you agree to abide by these Terms & Conditions. If you do not agree to these terms, please discontinue use of our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">2. Description of Service</h2>
          <p>
            AnytimeConverter provides client-side, browser-local utilities to convert, resize, split, and merge files. The service is 100% free, requires no signup, features no watermarks, and imposes no file size limitations. 
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">3. User Responsibility & File Ownership</h2>
          <p>
            You retain all rights, title, and ownership of files you load into AnytimeConverter. Because processing is local to your browser, we do not view, copy, or index your documents. You are solely responsible for ensuring you have the legal right, copyrights, and authorization to convert and handle the files you choose to process.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">4. Disclaimers & Limitation of Liability</h2>
          <p>
            The services and output files are provided <strong>&quot;as is&quot; and &quot;as available,&quot; without warranties of any kind</strong>, either express or implied, including but not limited to warranties of accuracy, performance, or suitability for a specific purpose.
          </p>
          <p>
            We do not guarantee that the conversion output will precisely reflect the layout, fonts, or styling of the original file. Under no circumstances shall AnytimeConverter be liable for any direct, indirect, incidental, or consequential damages (including data loss or document formatting degradation). We recommend keeping original backups of all files.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">5. Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any portion of the conversion utilities at any time without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">6. Governing Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the user's local jurisdiction, unless federal or international arbitration regulations dictate otherwise.
          </p>
        </section>
      </div>
    </main>
  );
}
