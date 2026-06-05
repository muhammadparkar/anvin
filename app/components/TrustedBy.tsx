"use client";

import Reveal from "./Reveal";

const trustedClients = [
  { name: "QNB GROUP", desc: "Banking & Finance" },
  { name: "QATAR AIRWAYS", desc: "Aviation & Logistics" },
  { name: "OOREDOO", desc: "Telecommunications" },
  { name: "MSHEIREB", desc: "Real Estate & Dev" },
  { name: "DOHA BANK", desc: "Corporate Banking" },
];

export default function TrustedBy() {
  return (
    <section className="relative w-full bg-bg-base py-10 border-b border-divider/30 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        <Reveal variant="fade-up" duration={700}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
            {/* Header Title */}
            <div className="shrink-0 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan select-none">
                TRUSTED BY LEADING GCC ENTERPRISES
              </span>
            </div>

            {/* Grid of Logos */}
            <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-5 gap-4 items-center justify-items-center">
              {trustedClients.map((client) => (
                <div
                  key={client.name}
                  className="group relative flex flex-col items-center justify-center p-3 w-full border border-divider/40 bg-bg-surface/50 hover:bg-bg-surface hover:border-cyan/40 transition-all duration-300 select-none cursor-pointer"
                  data-interactive
                >
                  <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-text-secondary group-hover:text-cyan transition-colors">
                    {client.name}
                  </span>
                  <span className="mt-0.5 text-[8px] font-mono tracking-wider text-text-dim/60 group-hover:text-text-dim transition-colors uppercase">
                    {client.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
