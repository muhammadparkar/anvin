"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

interface DeploymentFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: DeploymentFeature[] = [
  {
    title: "GCC Data Sovereignty",
    description: "Keep all customer ledger audits and banking WPS information hosted strictly within regional borders (Qatar, Saudi Arabia, or UAE) satisfying public sector compliance directives.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Double-Key Data Encryption",
    description: "Secures sensitive workforce WPS transactions and procurement ledger files using double-key client-isolated keys. Zero visibility to third-party database nodes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

function DeploymentDiagram({ mode }: { mode: "local" | "cloud" }) {
  const isCloud = mode === "cloud";

  return (
    <svg viewBox="0 0 420 340" className="w-full h-full select-none" aria-hidden>
      <defs>
        <linearGradient id="dep-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6FD8" />
          <stop offset="100%" stopColor="#00C2D4" />
        </linearGradient>
        <filter id="dep-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Dashed flow path */}
        <style>{`
          @keyframes flowDash { to { stroke-dashoffset: -40; } }
          .flow-line { stroke-dasharray: 8 6; animation: flowDash 1.2s linear infinite; }
        `}</style>
      </defs>

      {/* ── ADLER CORE (center) ── */}
      <g transform="translate(210, 170)">
        <circle r="44" fill="none" stroke="#00C2D4" strokeWidth="1" opacity="0.2" className="animate-ping" style={{ animationDuration: "3s" }} />
        <circle r="36" fill="var(--color-bg-raised)" stroke="#00C2D4" strokeWidth="2" filter="url(#dep-glow)" />
        {/* Cube icon */}
        <g transform="scale(0.8) translate(-12,-12)">
          <path d="M12 3L22 8.5v7L12 21 2 15.5v-7z" fill="none" stroke="#00C2D4" strokeWidth="1.5" />
          <path d="M12 3v18M2 8.5l10 6 10-6" fill="none" stroke="#00C2D4" strokeWidth="1.5" opacity="0.6" />
        </g>
        <text y="50" textAnchor="middle" fontSize="9" fill="#00C2D4" fontFamily="monospace" fontWeight="bold" letterSpacing="2">ADLER CORE</text>
      </g>

      {/* ── LOCAL MODE ── */}
      {/* On-Prem Server (left) */}
      <g transform="translate(60, 120)" style={{ opacity: isCloud ? 0.25 : 1, transition: "opacity 0.6s" }}>
        <rect x="-28" y="-36" width="56" height="72" rx="4" fill="var(--color-bg-surface)" stroke={isCloud ? "var(--color-divider)" : "var(--color-cobalt)"} strokeWidth="1.5" />
        {[0, 18, 36].map((y, i) => (
          <g key={i}>
            <rect x="-20" y={y - 30} width="40" height="12" rx="2" fill="var(--color-bg-base)" stroke="var(--color-divider)" strokeWidth="1" />
            <circle cx="-10" cy={y - 24} r="2.5" fill={isCloud ? "var(--color-divider)" : "#00C2D4"} style={{ transition: "fill 0.5s" }} />
            <circle cx="0" cy={y - 24} r="2.5" fill={isCloud ? "var(--color-divider)" : "var(--color-cobalt)"} style={{ transition: "fill 0.5s" }} className={isCloud ? "" : "animate-pulse"} />
          </g>
        ))}
        <text y="50" textAnchor="middle" fontSize="10" fill={isCloud ? "var(--color-text-dim)" : "var(--color-text-secondary)"} fontFamily="sans-serif" style={{ transition: "fill 0.5s" }}>On-Premise</text>
        {!isCloud && (
          <g transform="translate(-28, -44)">
            <rect width="56" height="14" rx="3" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
            <text x="28" y="10" textAnchor="middle" fontSize="7.5" fill="#34D399" fontFamily="monospace" fontWeight="bold">ACTIVE</text>
          </g>
        )}
      </g>

      {/* Flow line: On-Prem → Core */}
      <line
        x1="92" y1="170" x2="172" y2="170"
        stroke="url(#dep-cyan-grad)" strokeWidth="2" strokeLinecap="round"
        className={isCloud ? "" : "flow-line"}
        style={{ opacity: isCloud ? 0.15 : 1, transition: "opacity 0.6s" }}
      />

      {/* ── CLOUD MODE ── */}
      {/* Cloud node (right) */}
      <g transform="translate(360, 120)" style={{ opacity: isCloud ? 1 : 0.25, transition: "opacity 0.6s" }}>
        {/* Cloud shape */}
        <path
          d="M30,14 a14,14 0 0,0 -26,-2 a10,10 0 0,0 2,20 l28,0 a12,12 0 0,0 -4,-18z"
          fill="var(--color-bg-surface)" stroke={isCloud ? "#00C2D4" : "var(--color-divider)"} strokeWidth="1.5" transform="translate(-40,-20)"
          style={{ transition: "stroke 0.5s" }}
        />
        {/* Signal waves */}
        {isCloud && [8, 14, 20].map((r, i) => (
          <circle key={i} cx="-10" cy="-8" r={r} fill="none" stroke="#00C2D4" strokeWidth="1" opacity="0.15 + i * 0.1" className="animate-ping" style={{ animationDuration: `${2 + i * 0.5}s` }} />
        ))}
        <text y="30" textAnchor="middle" fontSize="10" fill={isCloud ? "var(--color-text-secondary)" : "var(--color-text-dim)"} fontFamily="sans-serif" style={{ transition: "fill 0.5s" }}>Qatar Cloud</text>
        {isCloud && (
          <g transform="translate(-28, -48)">
            <rect width="56" height="14" rx="3" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
            <text x="28" y="10" textAnchor="middle" fontSize="7.5" fill="#34D399" fontFamily="monospace" fontWeight="bold">ACTIVE</text>
          </g>
        )}
      </g>

      {/* Flow line: Core → Cloud */}
      <line
        x1="248" y1="170" x2="326" y2="170"
        stroke="url(#dep-cyan-grad)" strokeWidth="2" strokeLinecap="round"
        className={isCloud ? "flow-line" : ""}
        style={{ opacity: isCloud ? 1 : 0.15, transition: "opacity 0.6s" }}
      />

      {/* ── COMMON: WPS + Compliance nodes below ── */}
      <g transform="translate(120, 280)">
        <circle r="20" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="1.5" />
        <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="#7A9BB5" strokeWidth="1.5" />
        <text y="32" textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)" fontFamily="sans-serif">WPS</text>
      </g>
      <line x1="120" y1="260" x2="175" y2="206" stroke="var(--color-divider)" strokeWidth="1.5" strokeDasharray="4 4" />

      <g transform="translate(300, 280)">
        <circle r="20" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="1.5" />
        <path d="M-7,-7 L7,7 M7,-7 L-7,7" stroke="#7A9BB5" strokeWidth="1.5" />
        <text y="32" textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)" fontFamily="sans-serif">Compliance</text>
      </g>
      <line x1="300" y1="260" x2="245" y2="206" stroke="var(--color-divider)" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Double-key lock icon (center top) */}
      <g transform="translate(210, 60)">
        <rect x="-24" y="-12" width="48" height="28" rx="4" fill="var(--color-bg-surface)" stroke="#00C2D4" strokeWidth="1.5" opacity="0.8" />
        <path d="M-8,-12 V-20 a8,8 0 0,1 16,0 V-12" fill="none" stroke="#00C2D4" strokeWidth="1.5" />
        <circle cx="0" cy="2" r="4" fill="#00C2D4" opacity="0.7" />
        <line x1="0" y1="6" x2="0" y2="10" stroke="#00C2D4" strokeWidth="1.5" />
        <text y="26" textAnchor="middle" fontSize="7" fill="#00C2D4" fontFamily="monospace" fontWeight="bold" letterSpacing="1">DOUBLE-KEY</text>
      </g>
      <line x1="210" y1="72" x2="210" y2="132" stroke="#00C2D4" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
    </svg>
  );
}

export default function DeploymentSection() {
  const [mode, setMode] = useState<"local" | "cloud">("local");

  return (
    <section className="relative w-full bg-bg-surface py-24 overflow-hidden">
      <ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 right-1/4 w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(26,95,180,0.08)_0%,transparent_70%)]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text & Bullets */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Reveal variant="slide-left" duration={900}>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
                FLEXIBLE DEPLOYMENT
              </span>
              <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
                Local or Hosted. Double-key.
              </h2>
              <p className="mt-6 font-body text-sm font-light leading-relaxed text-text-secondary">
                Deploy AdlER in Qatar Cloud or orchestrate it directly on your private server infrastructure. Retain absolute sovereignty over your operational database.
              </p>
            </Reveal>

            {/* Toggle */}
            <Reveal delay={200} variant="slide-left">
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setMode("local")}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                    mode === "local"
                      ? "border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_rgba(0,194,212,0.2)]"
                      : "border-divider text-text-secondary hover:border-cobalt"
                  }`}
                  data-interactive
                >
                  On-Premise
                </button>
                <button
                  onClick={() => setMode("cloud")}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                    mode === "cloud"
                      ? "border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_rgba(0,194,212,0.2)]"
                      : "border-divider text-text-secondary hover:border-cobalt"
                  }`}
                  data-interactive
                >
                  Qatar Cloud
                </button>
              </div>

              {/* Mode description pill */}
              <div className="mt-4 px-4 py-2 border border-divider bg-bg-raised text-xs font-mono text-text-secondary">
                {mode === "local"
                  ? "⬛  Private server — data never leaves your infrastructure"
                  : "☁️  Qatar Cloud — ISO 27001 certified GCC regional nodes"}
              </div>
            </Reveal>

            {/* Bullets List */}
            <div className="mt-10 flex flex-col gap-8 w-full">
              {features.map((feat, idx) => (
                <Reveal key={idx} delay={300 + idx * 150} duration={700} variant="slide-left">
                  <div className="group flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-divider bg-bg-raised group-hover:border-cyan/50 transition-colors duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">
                        {feat.title}
                      </h3>
                      <p className="mt-2 font-body text-sm font-light leading-relaxed text-text-secondary">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Deployment Diagram */}
          <div className="lg:col-span-6 flex justify-center select-none">
            <Reveal duration={1000} delay={200} variant="scale-up" className="w-full max-w-[480px] aspect-[420/340]">
              <div className="relative w-full h-full">
                <DeploymentDiagram mode={mode} />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
