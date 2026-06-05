"use client";

import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

interface Pillar {
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    title: "Audit Logging",
    description: "Unalterable system log archives tracking every invoice change, WPS transfer, and biometric login, ensuring compliance with Qatar audits.",
  },
  {
    title: "WPS Encryption",
    description: "Multi-layered encryption safeguarding Wage Protection System bank files (SIF registries) from transfer to bank API endpoints.",
  },
  {
    title: "Database Isolation",
    description: "Complete tenant data isolation with dedicated virtual server database nodes, preventing cross-tenant leakage or data access.",
  },
];

export default function SecuritySection() {
  return (
    <section className="relative w-full bg-bg-surface py-24 overflow-hidden">
      {/* Parallax background glow */}
      <ParallaxLayer speed={0.18} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] bg-cobalt/8 rounded-full blur-[80px]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Title Header */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              ENTERPRISE SECURITY
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Enterprise grade security and localization.
            </h2>
          </Reveal>
        </div>

        {/* Central Graphic */}
        <div className="flex justify-center mb-16 select-none">
          <Reveal duration={900} variant="scale-up">
            <div className="relative h-60 w-60 flex items-center justify-center">
              {/* Spinning circular shield SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-cyan animate-rotate-arc opacity-60">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="30 20 10 10" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="150 40" />
              </svg>
              {/* Inner secure shield icon */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A6FD8" strokeWidth="1.5" className="relative z-10">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="12" r="3" fill="#00C2D4" className="opacity-80 animate-ping" />
              </svg>
            </div>
          </Reveal>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const variant = idx === 0 ? "slide-left" : idx === 2 ? "slide-right" : "fade-up";
            return (
              <Reveal key={idx} delay={idx * 120} duration={700} variant={variant as "slide-left" | "slide-right" | "fade-up"}>
                <div className="group relative flex flex-col p-6 border-l-2 border-divider/60 pl-6 hover:border-cyan transition-colors duration-500">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="relative z-10 font-display text-base font-bold text-text-primary mb-3 group-hover:text-cyan transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="relative z-10 font-body text-sm font-light leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
