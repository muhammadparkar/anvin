"use client";

import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

interface Service {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
}

const servicesData: Service[] = [
  {
    name: "Cloud Services",
    tagline: "Scalable Regional Infrastructures",
    description: "Architecting high-availability hybrid cloud networks with automated latency controls and GCC localization compliance.",
    bullets: [
      "Hybrid & Multi-Cloud Provisioning",
      "GCC Data Sovereignty Compliance",
      "Disaster Recovery & Redundancy Automation",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42 0-.83.07-1.22.2A5 5 0 0 0 5 13c0 .34.03.68.08 1A4 4 0 0 0 2 17.5 3.5 3.5 0 0 0 5.5 21h12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v5M10 14l2-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Advisory Services",
    tagline: "Strategic Enterprise Roadmap",
    description: "Expert digital advisory helping GCC organizations map technology audits, GCC tax guidelines, and integration paths.",
    bullets: [
      "Digital Transformation Mapping",
      "Process Engineering & Audit Coordination",
      "ERP Consolidation Consulting",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Managed Services",
    tagline: "24/7 Operations Audits & Telemetry",
    description: "Proactive database administration, regional security telemetry monitoring, and performance audits to ensure zero downtime.",
    bullets: [
      "Continuous Infrastructure Auditing",
      "Zero-Downtime Patch Optimization",
      "24/7 GCC Incident Management",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="#1A6FD8" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Application Development",
    tagline: "Custom GCC Integrations & Mobility",
    description: "Custom software engineering developing scalable mobile extensions, enterprise connectors, and APIs.",
    bullets: [
      "Custom REST/GraphQL APIs",
      "Mobile iOS & Android Native SDKs",
      "Legacy ERP Connector Pipelines",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M10 20l4-16m2 2l4 6-4 6M8 6L4 12l4 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const cardVariants: Array<"slide-left" | "slide-right" | "fade-up" | "scale-up"> = [
  "slide-left",
  "slide-right",
  "slide-left",
  "slide-right",
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-bg-base py-24 overflow-hidden">
      {/* Background Arc */}
      <div className="absolute top-1/2 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-rotate-arc text-cobalt opacity-[0.02]"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="160 80" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Title Header — Scroll text reveal */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              ENTERPRISE SERVICES
            </span>
          </Reveal>
          <TextReveal
            text="Complete engineering, advisory, and cloud support."
            highlightWords={["engineering", "advisory", "cloud"]}
            className="mt-2 max-w-3xl mx-auto"
          />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <Reveal key={idx} delay={idx * 100} duration={700} variant={cardVariants[idx]}>
              <div className="group relative flex flex-col p-8 bg-bg-surface border border-divider h-full hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,194,212,0.06)]">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* SVG Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-divider bg-bg-raised group-hover:border-cyan/40 transition-colors duration-300">
                    {service.icon}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-cyan mb-1">
                    {service.tagline}
                  </span>

                  <h3 className="font-display text-2xl font-bold text-text-primary mb-4 group-hover:text-cyan transition-colors duration-300">
                    {service.name}
                  </h3>

                  <p className="font-body text-sm font-light leading-relaxed text-text-secondary mb-6">
                    {service.description}
                  </p>

                  {/* Bullets */}
                  <div className="mt-auto border-t border-divider/40 pt-4 flex flex-col gap-3">
                    {service.bullets.map((bullet, bIndex) => (
                      <div key={bIndex} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 bg-cobalt flex-shrink-0 group-hover:bg-cyan transition-colors duration-300" />
                        <span className="font-body text-sm text-text-secondary">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
