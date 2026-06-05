"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

const LOG_LINES = [
  { time: "15:52:01", text: "Syncing multi-currency balances with Doha Bank API...", type: "info" },
  { time: "15:52:02", text: "Parsing biometric gate logs — Hamad Port (4,200 entries)...", type: "info" },
  { time: "15:52:04", text: "Running VAT-201 compliance check against QCB rules...", type: "info" },
  { time: "15:52:06", text: "Ledger reconciled. Variance: 0.00%", type: "success" },
  { time: "15:52:07", text: "WPS SIF file compiled — 14,028 active employees.", type: "success" },
  { time: "15:52:08", text: "Warning: Zone 4 temp rising (82°C) — auto-adjusting...", type: "warning" },
  { time: "15:52:09", text: "Valve flow corrected. Telemetry stable.", type: "success" },
  { time: "15:52:10", text: "All modules synced. Uptime: 99.9%", type: "success" },
];

function LiveFeed() {
  const [visible, setVisible] = useState<typeof LOG_LINES>([]);
  const [idx, setIdx] = useState(0);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idx >= LOG_LINES.length) {
      // restart loop
      const t = setTimeout(() => { setVisible([]); setIdx(0); }, 2000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisible(prev => [...prev, LOG_LINES[idx]]);
      setIdx(i => i + 1);
    }, 900);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    // Directly set scrollTop on the container — avoids Lenis intercepting scrollIntoView
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [visible]);

  return (
    <div className="flex flex-col h-full font-mono text-xs leading-relaxed overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-divider/40 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-xs text-text-secondary uppercase tracking-wider">AdlER Live Feed</span>
        </div>
        <span className="text-xs text-text-dim">SECURE-504</span>
      </div>
      {/* Log lines */}
      <div ref={scrollBoxRef} className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1" style={{ scrollbarWidth: "none" }}>
        {visible.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-cyan shrink-0">[{line.time}]</span>
            <span className={line.type === "success" ? "text-[#34D399]" : line.type === "warning" ? "text-amber-400" : "text-text-secondary"}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
      {/* Metrics row */}
      <div className="border-t border-divider/40 pt-3 mt-3 grid grid-cols-3 gap-3 shrink-0">
        {[
          { label: "ENTITIES", value: "12/12" },
          { label: "WPS STAFF", value: "14,028" },
          { label: "UPTIME", value: "99.9%" },
        ].map(m => (
          <div key={m.label} className="flex flex-col items-center">
            <span className="text-text-dim text-[10px] uppercase tracking-wider">{m.label}</span>
            <span className="text-cyan font-bold text-sm mt-0.5">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    tag: "ADLER WMS CORE",
    badge: "DISPATCHED",
    badgeColor: "text-[#34D399] bg-[#10B981]/10 border-[#10B981]/25",
    title: "Facility Mobility Dispatch",
    body: "Truck ID Q-8092 logged departure at Hamad Port. Loading manifest synchronized with Doha Hub.",
    footer: "MANIFEST #4029",
    time: "14:23 AST",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    tag: "ADLER HCM",
    badge: "QCB SYNCED",
    badgeColor: "text-cyan bg-cobalt/20 border-cyan/25",
    title: "HCM Salary Disbursement",
    body: "Payroll registry validated. Batch signature verified for 4,200 active GCC contractor profiles.",
    footer: "BATCH QNB-0089",
    time: "15:02 AST",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    tag: "ADLER IOT",
    badge: "ONLINE",
    badgeColor: "text-[#60A5FA] bg-[#3B82F6]/10 border-[#3B82F6]/25",
    title: "Telemetry Diagnostics Node",
    body: "4,200 sensors at Doha Logistics Hub nominal. Temperature, pressure, vibration — all stable.",
    footer: "NODE DL-99",
    time: "15:40 AST",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function ContentGenerationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        gsap.fromTo(Array.from(cards), { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      // Terminal fade in
      gsap.fromTo(terminalRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: terminalRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-bg-surface py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-cobalt/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan">REAL-TIME OPERATIONS</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Live diagnostic orchestration.
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm font-light leading-relaxed text-text-secondary md:text-right">
            Watch telemetry stream across modules. Each node logs payroll, compliance signatures, and feeds operational hubs in real time.
          </p>
        </div>

        {/* Main grid: 3 cards left + terminal right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Feature cards */}
          <div ref={cardsRef} className="lg:col-span-3 flex flex-col gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card group flex items-start gap-5 p-6 bg-bg-raised border border-divider hover:border-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,212,0.07)] cursor-pointer opacity-0"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-divider bg-bg-surface group-hover:border-cyan/40 transition-colors duration-300">
                  {f.icon}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan">{f.tag}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold border rounded-full ${f.badgeColor}`}>{f.badge}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">{f.title}</h4>
                  <p className="mt-1.5 font-body text-sm font-light text-text-secondary leading-relaxed">{f.body}</p>
                  <div className="mt-3 pt-3 border-t border-divider/40 flex items-center justify-between text-xs text-text-dim">
                    <span>{f.footer}</span>
                    <span>{f.time}</span>
                  </div>
                </div>
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>

          {/* Right: Live terminal */}
          <div
            ref={terminalRef}
            className="lg:col-span-2 flex flex-col bg-[#040A12] border border-divider p-6 min-h-[460px] opacity-0"
          >
            <LiveFeed />
          </div>

        </div>
      </div>
    </section>
  );
}
