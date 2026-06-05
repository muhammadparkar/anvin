"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface Industry {
  name: string;
  description: string;
}

const industriesList: Industry[] = [
  { name: "Real Estate & Development", description: "Integrated property portfolio planning, land allocation, and leasing solutions." },
  { name: "Contracting & Construction", description: "Project costing, sub-contracting, and material tracking for major Gulf developments." },
  { name: "Oil, Gas & Energy", description: "Telemetry audits, workforce management, and supply chain tracking for refinery environments." },
  { name: "Retail & Distribution", description: "Unified multi-channel stock management and automated procurement orchestration." },
  { name: "Logistics & Shipping", description: "Route optimization, port manifest coordination, and customs compliance rules." },
  { name: "Hospitality & Tourism", description: "Property management, leisure booking audits, and staff rotation planners." },
  { name: "Healthcare Services", description: "Medical inventory management, regulatory compliance audits, and staff resource maps." },
  { name: "Financial Institutions", description: "Compliance reporting, multi-entity treasury tracking, and GCC WPS systems." },
  { name: "Public Administration", description: "Municipal resource scheduling, budget allocations, and citizen service workflows." },
  { name: "Manufacturing", description: "Shop floor telemetry, asset maintenance logs, and raw material requirement planning." },
  { name: "Education & Academy", description: "Campus resource scheduling, vendor management, and employee lifecycle tools." },
  { name: "Facility Management", description: "Preventive maintenance pipelines, service level agreement trackers, and dispatch logs." },
  { name: "Aviation & Aerospace", description: "Aircraft maintenance logging, scheduling coordination, and crew rotation assets." },
  { name: "Telecommunications", description: "Infrastructure billing tracking, vendor contract management, and workforce assets." },
  { name: "Energy & Utilities", description: "Grid telemetry analytics, asset scheduling, and regulatory reporting." },
  { name: "Maritime Services", description: "Vessel tracking logs, crew manifest orchestration, and shipyard logistics." },
  { name: "Professional Services", description: "Project milestone billing, timesheet auditing, and resource capacity mapping." },
  { name: "Automotive & Transit", description: "Dealership fleet management, parts inventory logging, and service ordering." },
  { name: "FMCG Distribution", description: "Expiry date monitoring, temperature-controlled transit tracking, and warehouse routing." },
  { name: "Chemical Processing", description: "Safety compliance logs, batch manufacturing execution, and raw materials traceability." },
];

function IndustryItem({ industry }: { industry: Industry }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative border-l-2 border-divider/40 pl-6 py-3 transition-all duration-300 hover:border-cyan"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-interactive
    >
      <div className="flex items-center gap-2">
        {/* Cobalt dot prefix */}
        <span className="text-cobalt text-2xl font-bold select-none">•</span>
        <h3 className="font-display text-lg font-medium text-text-primary transition-colors group-hover:text-text-primary">
          {industry.name}
        </h3>
      </div>

      {/* Slide-down description */}
      <div
        className="transition-all duration-300 ease-out overflow-hidden"
        style={{
          maxHeight: isHovered ? "80px" : "0px",
          opacity: isHovered ? 1 : 0,
          marginTop: isHovered ? "8px" : "0px",
        }}
      >
        <p className="font-body text-xs font-light leading-relaxed text-text-secondary max-w-sm">
          {industry.description}
        </p>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative w-full bg-bg-base py-24 border-b border-divider">
      {/* Background compass rose decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <svg
          width="480"
          height="480"
          viewBox="0 0 100 100"
          className="text-cobalt opacity-[0.03] animate-rotate-arc"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
        {/* Title Header */}
        <div className="mb-16 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              GCC SECTORAL COVERAGE
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Engineered for 10+ Industries
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-4 max-w-xl text-sm font-light text-text-secondary">
              Flexible enterprise architecture proven across highly specialized regulatory and operational frameworks in the GCC.
            </p>
          </Reveal>
        </div>

        {/* 2-3 Column layout */}
        <Reveal delay={150}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industriesList.map((industry, index) => (
              <IndustryItem key={index} industry={industry} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
