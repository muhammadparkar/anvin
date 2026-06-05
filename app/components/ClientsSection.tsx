"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const row1Clients = [
  "QNB Group",
  "Qatar Airways",
  "Ooredoo",
  "Msheireb",
  "Doha Bank",
  "Gulf Bridge",
  "Qatar Airways Cargo",
  "Katara Hospitality",
];

const row2Clients = [
  "GWC Logistics",
  "Al Meera WLL",
  "Al Jaber Group",
  "Qatar Petroleum",
  "Qatar Foundation",
  "Nakilat",
  "Hamad Port",
  "Qatari Diar",
];

function ClientLogo({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mx-3 flex h-20 items-center justify-center border border-divider bg-bg-surface px-8 font-display text-xs md:text-sm font-semibold tracking-wider text-text-secondary select-none transition-all duration-300 hover:border-cyan hover:text-cyan"
      style={{
        filter: isHovered ? "none" : "grayscale(1) brightness(2) opacity(0.5)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-interactive
    >
      {name.toUpperCase()}
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section id="clients" className="relative w-full bg-bg-base py-24 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
        {/* Pull Quote */}
        <Reveal>
          <div className="relative mb-20 max-w-3xl">
            {/* Large cyan opening quotation mark */}
            <span className="absolute -top-12 -left-6 font-display text-[100px] font-bold leading-none text-cyan opacity-25 select-none">
              &ldquo;
            </span>
            <p className="relative z-10 font-display text-2xl md:text-4xl font-bold italic leading-snug text-text-primary">
              Anvin&apos;s AdlER platform has transformed our regional supply chain and HR operations. Their precision and understanding of Gulf corporate regulations are unmatched.
            </p>
            <div className="mt-6 flex flex-col pl-2">
              <span className="text-sm font-bold uppercase tracking-wider text-cyan">
                Director of Operations
              </span>
              <span className="text-xs font-light text-text-secondary">
                Leading GCC Logistics Enterprise
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Dual Marquees */}
      <Reveal delay={150}>
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1: Sliding Left */}
          <div className="relative flex w-full overflow-hidden py-2 mask-gradient-x">
            <div className="animate-marquee-left flex">
              {row1Clients.map((client, index) => (
                <ClientLogo key={`row1-1-${index}`} name={client} />
              ))}
              {row1Clients.map((client, index) => (
                <ClientLogo key={`row1-2-${index}`} name={client} />
              ))}
            </div>
          </div>

          {/* Row 2: Sliding Right */}
          <div className="relative flex w-full overflow-hidden py-2 mask-gradient-x">
            <div className="animate-marquee-right flex">
              {row2Clients.map((client, index) => (
                <ClientLogo key={`row2-1-${index}`} name={client} />
              ))}
              {row2Clients.map((client, index) => (
                <ClientLogo key={`row2-2-${index}`} name={client} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
