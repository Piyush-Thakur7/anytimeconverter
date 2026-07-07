import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | AnytimeConverter",
  description: "Read AnytimeConverter's privacy policy. Learn how all file processing is done locally in your browser so files never leave your device.",
  alternates: {
    canonical: "https://anytimeconverter.resence.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | AnytimeConverter",
    description: "Read AnytimeConverter's privacy policy. Learn how all file processing is done locally in your browser so files never leave your device.",
    type: "website",
    url: "https://anytimeconverter.resence.in/privacy",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | AnytimeConverter",
    description: "Read AnytimeConverter's privacy policy. Learn how all file processing is done locally in your browser so files never leave your device.",
    images: ["https://anytimeconverter.resence.in/assets/og-image.jpg"],
  }
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-32 animate-fade-in text-left">
      <div className="space-y-4 mb-10 border-b border-card-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-foreground/50 font-semibold uppercase tracking-wider">
          Last updated: July 7, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-foreground/80 font-medium">
        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">1. 100% Client-Side Processing Guarantee</h2>
          <p>
            At AnytimeConverter, your privacy is our primary concern. Unlike traditional online converters that upload your documents to external servers, <strong>all file conversion, merging, splitting, and compression happens entirely in your browser using local WebAssembly (WASM) and JavaScript libraries.</strong>
          </p>
          <p>
            Your files (PDFs, Word documents, images, text, and presentation files) are never uploaded, transmitted, or stored on any server. The processing occurs inside your device's memory sandbox and vanishes immediately when you close the tab.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">2. Data Collection Practices</h2>
          <p>
            Because we do not require accounts, signups, or file uploads, we collect no personally identifiable information (PII). We do not collect or view your document contents, file names, or file sizes.
          </p>
          <p>
            We may use minimal, privacy-respecting website analytics tools (such as Plausible Analytics) to monitor anonymous website traffic parameters (like total page views and general referral paths). This helps us understand utility usage patterns and does not track you across the web.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">3. Local Storage (localStorage)</h2>
          <p>
            Our &quot;Recent Local Conversions&quot; history panel uses your browser's native <code>localStorage</code> to keep a list of files you converted. This log stays exclusively on your device, is never transmitted to us or any third party, and can be cleared at any time by clicking the &quot;Clear history&quot; button on the homepage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">4. Cookies and Advertising</h2>
          <p>
            We do not use tracking cookies or marketing beacons. If we run third-party advertising in the future to keep this service free, we will ensure ad partners are restricted to non-personalized contextual listings that do not read your document conversion habits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">5. Contact Information</h2>
          <p>
            If you have questions regarding this policy or the browser-local security mechanisms of our file tools, please contact us via email at:
            <span className="text-accent hover:underline ml-1 cursor-pointer font-bold">support@resence.in</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
