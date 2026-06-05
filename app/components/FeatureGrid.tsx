"use client";

import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

interface Feature {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const featuresData: Feature[] = [
  {
    id: 1,
    title: "AdlER Ledger",
    subtitle: "Enterprise ERP",
    description: "Orchestrates multi-entity ledgers, procurement channels, and assets across GCC borders.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "WPS Payroll",
    subtitle: "Human Capital",
    description: "Prepares bank SIF files and audits complex salaries under strict Gulf labor rules.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "SiteWatch IoT",
    subtitle: "Telemetry & Safety",
    description: "Monitors refinery anomalies, equipment heat indices, and remote sensor streams.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Profac FM",
    subtitle: "Facility Management",
    description: "Organizes preventative work schedules, asset maps, and GCC landlord lease compliance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Alternating reveal variants for a staggered storytelling feel
const variants: Array<"fade-up" | "slide-left" | "slide-right" | "scale-up"> = [
  "slide-left",
  "fade-up",
  "fade-up",
  "slide-right",
];

export default function FeatureGrid() {
  return (
    <section className="relative w-full bg-bg-base py-24 overflow-hidden">
      <ParallaxLayer speed={0.1} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(0,163,181,0.05)_0%,transparent_70%)]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Title Header */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              ENTERPRISE UTILITIES
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              The tools your enterprise teams trust.
            </h2>
          </Reveal>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, idx) => (
            <Reveal key={feature.id} delay={idx * 100} duration={700} variant={variants[idx]}>
              <div className="group relative flex flex-col p-6 bg-bg-surface border border-divider h-full hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,194,212,0.06)]">
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center border border-divider bg-bg-raised mb-5 group-hover:bg-bg-base group-hover:border-cyan/40 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan mb-1">
                    {feature.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3 group-hover:text-cyan transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
