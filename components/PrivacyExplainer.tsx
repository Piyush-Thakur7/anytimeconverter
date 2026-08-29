import React from 'react';
import { ShieldCheck, HardDrive, Lock } from 'lucide-react';

export default function PrivacyExplainer() {
  return (
    <section id="privacy-explainer" className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-6 text-left">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
        How Your Files Stay 100% Private
      </h2>
      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed font-medium">
        Unlike traditional online converters that upload your confidential files to remote servers, AnytimeConverter runs completely inside your web browser. Here is the technical model of how it protects your data:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="space-y-2">
          <div className="p-2 bg-accent-bg text-accent rounded-lg w-fit">
            <ShieldCheck className="w-5 h-5 shrink-0" />
          </div>
          <h3 className="font-bold text-sm text-foreground">WebAssembly Execution</h3>
          <p className="text-xs text-foreground/60 leading-relaxed font-medium">
            We compile parsing and conversion libraries into local WebAssembly (WASM) binaries. They execute directly in your browser's secure sandbox.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-2 bg-accent-bg text-accent rounded-lg w-fit">
            <HardDrive className="w-5 h-5 shrink-0" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Zero Server Uploads</h3>
          <p className="text-xs text-foreground/60 leading-relaxed font-medium">
            Your document data never traverses the internet to our systems or third parties. All bytes stay in your local device's memory.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-2 bg-accent-bg text-accent rounded-lg w-fit">
            <Lock className="w-5 h-5 shrink-0" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Completely Offline</h3>
          <p className="text-xs text-foreground/60 leading-relaxed font-medium">
            Once loaded, you can sever your internet connection entirely. The tool is fully functional without any network packets being transmitted.
          </p>
        </div>
      </div>
    </section>
  );
}
