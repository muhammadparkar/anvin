"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

/* ─── Animated hex shield ─── */
function HexShield() {
  return (
    <svg viewBox="0 0 200 230" className="w-full h-full select-none" aria-hidden>
      <defs>
        <linearGradient id="sec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6FD8" />
          <stop offset="100%" stopColor="#00C2D4" />
        </linearGradient>
        <filter id="sec-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <style>{`
          @keyframes secRotate { to { transform: rotate(360deg); transform-origin: 100px 100px; } }
          @keyframes secPing { 0%,100%{ opacity:0.6; r:14 } 50%{ opacity:0; r:28 } }
          .sec-ring-1 { animation: secRotate 12s linear infinite; }
          .sec-ring-2 { animation: secRotate 18s linear infinite reverse; }
          .sec-ping { animation: secPing 2.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Outer rotating rings */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1A6FD8" strokeWidth="0.8" strokeDasharray="12 8" opacity="0.3" className="sec-ring-1" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#00C2D4" strokeWidth="0.6" strokeDasharray="6 12" opacity="0.2" className="sec-ring-2" />

      {/* Hexagon body */}
      <polygon
        points="100,14 172,56 172,140 100,182 28,140 28,56"
        fill="#0A1828"
        stroke="url(#sec-grad)"
        strokeWidth="2"
        filter="url(#sec-glow)"
      />
      {/* Hex inner glow */}
      <polygon
        points="100,24 162,62 162,134 100,172 38,134 38,62"
        fill="none"
        stroke="#00C2D4"
        strokeWidth="0.6"
        opacity="0.2"
      />

      {/* Lock icon (center) */}
      <g transform="translate(100,90)">
        <rect x="-18" y="-4" width="36" height="28" rx="5" fill="#0D1B2E" stroke="#00C2D4" strokeWidth="1.8" />
        <path d="M-10,-4 V-14 a10,10 0 0,1 20,0 V-4" fill="none" stroke="#00C2D4" strokeWidth="1.8" strokeLinecap="round" />
        <circle className="sec-ping" cx="0" cy="12" r="5" fill="#00C2D4" opacity="0.6" />
        <line x1="0" y1="14" x2="0" y2="20" stroke="#00C2D4" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Pulse dot on hex corner */}
      {[[100, 14], [172, 56], [172, 140], [100, 182], [28, 140], [28, 56]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#00C2D4" opacity={0.4 + (i % 2) * 0.4} />
      ))}

      {/* Label */}
      <text x="100" y="212" textAnchor="middle" fontSize="10" fill="#00C2D4" fontFamily="monospace" fontWeight="bold" letterSpacing="3">SECURED</text>
    </svg>
  );
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(end / 60);
        const t = setInterval(() => {
          start = Math.min(start + step, end);
          setVal(start);
          if (start >= end) clearInterval(t);
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75M9 9h3.75M3 6l9-3 9 3v9.75C21 19.92 17.36 23.25 12 23.25S3 19.92 3 15.75V6z" />
      </svg>
    ),
    title: "Audit Logging",
    description: "Unalterable log archives tracking every invoice change, WPS transfer, and biometric login — ensuring Qatar Ministry of Finance compliance.",
    tag: "ISO 27001",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16" r="1.5" fill="#00C2D4" />
      </svg>
    ),
    title: "WPS Encryption",
    description: "Multi-layered AES-256 encryption safeguarding Wage Protection System SIF registries from transfer to bank API endpoints.",
    tag: "AES-256",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10" r="2" fill="#00C2D4" opacity="0.4" />
      </svg>
    ),
    title: "Database Isolation",
    description: "Complete tenant isolation with dedicated virtual server nodes preventing cross-tenant leakage across all GCC entities.",
    tag: "Zero-Trust",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: "24/7 Telemetry Watch",
    description: "Continuous anomaly detection across all active GCC nodes. Alerts resolve in under 90 seconds via automated compensating controls.",
    tag: "< 90s MTTR",
  },
];

const metrics = [
  { value: 99, suffix: ".9%", label: "Uptime SLA" },
  { value: 256, suffix: "-bit", label: "Encryption" },
  { value: 0, suffix: " breaches", label: "Since Launch" },
  { value: 14, suffix: "s", label: "Avg Alert MTTR" },
];

export default function SecuritySection() {
  return (
    <section className="relative w-full bg-bg-base py-24 overflow-hidden">
      {/* Parallax background glows */}
      <ParallaxLayer speed={0.18} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[220px] h-[220px] bg-cobalt/10 rounded-full blur-[100px]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">

        {/* Title */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              ENTERPRISE SECURITY
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Military-grade protection.<br className="hidden md:block" />
              <span className="text-cyan">GCC-localized</span> by design.
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm font-light text-text-secondary leading-relaxed">
              Every module is architected around zero-trust principles, regional data sovereignty, and unbreakable audit trails — meeting Qatar, UAE, and Saudi compliance mandates.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Shield visualization ── */}
          <Reveal variant="scale-up" duration={900} className="lg:col-span-4">
            <div className="relative flex flex-col items-center justify-center bg-bg-surface border border-divider p-8 h-full min-h-[340px] hover:border-cyan/30 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-full max-w-[180px] h-[200px]">
                <HexShield />
              </div>
              <div className="mt-6 text-center">
                <span className="block text-xs font-bold uppercase tracking-widest text-cyan mb-1">Threat Status</span>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#34D399]/30 bg-[#10B981]/10 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="text-xs font-bold text-[#34D399] tracking-wider">ALL SYSTEMS SECURE</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Metrics strip ── */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4 content-start">
            {metrics.map((m, i) => (
              <Reveal key={i} delay={i * 80} variant="fade-up" duration={600}>
                <div className="group flex flex-col items-center justify-center bg-bg-surface border border-divider p-6 text-center hover:border-cyan/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,212,0.06)]">
                  <span className="font-display text-3xl font-extrabold text-text-primary">
                    <Counter end={m.value} suffix={m.suffix} />
                  </span>
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-cyan">{m.label}</span>
                </div>
              </Reveal>
            ))}

            {/* ── 4 pillar cards ── */}
            {pillars.map((p, i) => (
              <Reveal key={i} delay={100 + i * 80} variant={i % 2 === 0 ? "slide-left" : "slide-right"} duration={700}
                className="col-span-2">
                <div className="group relative flex items-start gap-4 p-6 bg-bg-surface border border-divider hover:border-cyan/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,212,0.06)]">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Icon */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-divider bg-bg-raised group-hover:border-cyan/50 transition-colors duration-300">
                    {p.icon}
                  </div>
                  {/* Text */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-display text-base font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">{p.title}</h3>
                      <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-cobalt/40 text-cobalt bg-cobalt/10 rounded-full">{p.tag}</span>
                    </div>
                    <p className="font-body text-sm font-light leading-relaxed text-text-secondary">{p.description}</p>
                  </div>
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
                </div>
              </Reveal>
            ))}
          </div>

        </div>

        {/* Compliance badges strip */}
        <Reveal variant="fade-up" delay={200} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-t border-divider/40">
            {["Qatar PDPA", "UAE PDPL", "ISO 27001", "SOC 2 Type II", "WPS Certified", "GCC Sovereign"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 px-4 py-2 border border-divider/60 bg-bg-surface text-xs font-bold uppercase tracking-wider text-text-secondary hover:border-cyan/40 hover:text-cyan transition-all duration-200 cursor-default">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {badge}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
