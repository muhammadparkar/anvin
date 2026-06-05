"use client";

import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import ParallaxLayer from "./ParallaxLayer";

export default function PlatformSection() {
  return (
    <section id="suite" className="relative w-full bg-bg-surface py-24 overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-rotate-arc-reverse text-cobalt opacity-[0.03]"
        >
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="120 90" />
        </svg>
      </div>

      <ParallaxLayer speed={0.12} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(26,95,180,0.08)_0%,transparent_70%)]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Title Header — scroll-driven text reveal */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              GCC COMPLIANCE PLATFORM
            </span>
          </Reveal>
          <TextReveal
            text="One platform for scale, compliance, and speed."
            highlightWords={["scale", "compliance", "speed"]}
            className="mt-2 max-w-3xl mx-auto"
          />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: WPS Engine */}
          <Reveal delay={100} duration={800} variant="slide-left">
            <div className="group flex flex-col justify-between p-8 bg-bg-raised border border-divider h-full hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,194,212,0.06)]">
              <div>
                <div className="flex h-10 w-10 items-center justify-center border border-divider bg-bg-surface mb-6 group-hover:border-cyan/50 transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">
                  Unified WPS Payroll Compliance
                </h3>
                <p className="mt-4 font-body text-sm font-light leading-relaxed text-text-secondary">
                  Ensure 100% adherence to Wage Protection System regulations in Qatar, UAE, and Saudi Arabia. Automatically formats secure bank transfer registries (QNB, Doha Bank, etc.) with real-time biometric tracking logs.
                </p>
              </div>
              <div className="mt-8 border-t border-divider/40 pt-4 flex items-center justify-between text-xs text-text-dim">
                <span>BANK CERTIFIED</span>
                <span className="text-cyan">ACTIVE ENGINES: 4</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: VAT Auditing */}
          <Reveal delay={200} duration={800} variant="slide-right">
            <div className="group flex flex-col justify-between p-8 bg-bg-raised border border-divider h-full hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,194,212,0.06)]">
              <div>
                <div className="flex h-10 w-10 items-center justify-center border border-divider bg-bg-surface mb-6 group-hover:border-cyan/50 transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">
                  Automated Qatari VAT Audits
                </h3>
                <p className="mt-4 font-body text-sm font-light leading-relaxed text-text-secondary">
                  Real-time ledger audit integration directly checks corporate entries against the latest Qatari Ministry of Finance tax rules. Automatically reconciles purchases, invoices, and generates compliant VAT-201 declarations.
                </p>
              </div>
              <div className="mt-8 border-t border-divider/40 pt-4 flex items-center justify-between text-xs text-text-dim">
                <span>VAT-201 READY</span>
                <span className="text-cyan">RECONCILIATION: 100.00%</span>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
