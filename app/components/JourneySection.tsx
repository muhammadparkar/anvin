"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemTitleRef = useRef<HTMLDivElement>(null);
  const solutionTitleRef = useRef<HTMLDivElement>(null);

  // SVG network nodes
  const node1Ref = useRef<SVGGElement>(null);
  const node2Ref = useRef<SVGGElement>(null);
  const node3Ref = useRef<SVGGElement>(null);
  const node4Ref = useRef<SVGGElement>(null);
  const nodeCenterRef = useRef<SVGGElement>(null);

  // SVG paths
  const brokenPath1Ref = useRef<SVGPathElement>(null);
  const brokenPath2Ref = useRef<SVGPathElement>(null);
  const connectedPath1Ref = useRef<SVGPathElement>(null);
  const connectedPath2Ref = useRef<SVGPathElement>(null);
  const connectedPath3Ref = useRef<SVGPathElement>(null);
  const connectedPath4Ref = useRef<SVGPathElement>(null);

  // Alert markers
  const x1Ref = useRef<SVGGElement>(null);
  const x2Ref = useRef<SVGGElement>(null);

  // Success checkmarks
  const check1Ref = useRef<SVGGElement>(null);
  const check2Ref = useRef<SVGGElement>(null);
  const check3Ref = useRef<SVGGElement>(null);
  const check4Ref = useRef<SVGGElement>(null);

  // Solution Side Panel
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Set initial values
      gsap.set(panelRef.current, { y: 150, opacity: 0 });
      gsap.set(nodeCenterRef.current, { scale: 0, opacity: 0 });
      gsap.set(solutionTitleRef.current, { opacity: 0, y: 30 });
      gsap.set(problemTitleRef.current, { opacity: 1, y: 0 });

      // Measure lengths of connection paths and set dash offsets to hide them initially
      const initPath = (path: SVGPathElement | null) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      };

      initPath(connectedPath1Ref.current);
      initPath(connectedPath2Ref.current);
      initPath(connectedPath3Ref.current);
      initPath(connectedPath4Ref.current);

      gsap.set([x1Ref.current, x2Ref.current], { scale: 0, opacity: 0 });
      gsap.set([check1Ref.current, check2Ref.current, check3Ref.current, check4Ref.current], { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Reveal broken network layout & flash red warnings
      tl.to([node1Ref.current, node2Ref.current, node3Ref.current, node4Ref.current], { opacity: 1, duration: 0.5 })
        .to([brokenPath1Ref.current, brokenPath2Ref.current], { opacity: 0.4, duration: 0.4 }, "-=0.3")
        .to([x1Ref.current, x2Ref.current], { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }, "-=0.2");

      // 2. Slide in Solution Side Card & reveal Anvin central hub
      tl.to(problemTitleRef.current, { opacity: 0, y: -40, duration: 0.6 }, "+=0.3")
        .to(panelRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.3")
        .to(nodeCenterRef.current, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)" }, "-=0.8")
        .to(solutionTitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");

      // 3. Clear errors & morph disconnected lines into clean unified lines routing through Anvin hub
      tl.to([x1Ref.current, x2Ref.current], { scale: 0, opacity: 0, duration: 0.4 })
        .to([brokenPath1Ref.current, brokenPath2Ref.current], { opacity: 0, duration: 0.3 }, "-=0.3")
        
        // Draw incoming paths to hub
        .to(connectedPath1Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: "none" })
        .to(connectedPath2Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "-=0.6")
        
        // Draw outgoing paths from hub
        .to(connectedPath3Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: "none" })
        .to(connectedPath4Ref.current, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "-=0.6");

      // 4. Reveal green checks and trigger central core glow pulse
      tl.to([check1Ref.current, check2Ref.current, check3Ref.current, check4Ref.current], {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(2)",
      })
      .to(nodeCenterRef.current, {
        filter: "drop-shadow(0 0 25px rgba(0, 194, 212, 0.6))",
        duration: 0.4,
      }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg-base pt-20 pb-6 sm:pt-28 sm:pb-16"
    >
      {/* Background cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,48,80,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,48,80,0.1)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-between px-6 lg:flex-row lg:px-12 z-10">
        
        {/* Left Side: Dynamic Headings & SVG Telemetry Graph */}
        <div className="relative flex flex-col flex-1 h-full w-full lg:max-w-2xl">
          
          {/* Headline Slot 1: Problem */}
          <div ref={problemTitleRef} className="absolute top-2 sm:top-4 left-0 w-full">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              THE FRAGMENTED JOURNEY
            </span>
            <h2 className="mt-1 sm:mt-2 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Fragmented silos lead to operational lag.
            </h2>
            <p className="mt-2 sm:mt-4 max-w-md font-body text-xs sm:text-sm font-light leading-relaxed text-text-secondary">
              Payroll reports, biometric entry points, logistics registries, and compliance gateways operate on isolated systems with manual syncing.
            </p>
          </div>

          {/* Headline Slot 2: Solution */}
          <div ref={solutionTitleRef} className="absolute top-2 sm:top-4 left-0 w-full opacity-0">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan">
              THE UNIFIED PATH
            </span>
            <h2 className="mt-1 sm:mt-2 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Unified under one operating core.
            </h2>
            <p className="mt-2 sm:mt-4 max-w-md font-body text-xs sm:text-sm font-light leading-relaxed text-text-secondary">
              Anvin merges legacy systems into a singular ledger. Live sync resolves compliance automatically, eliminating manual reconciliation steps.
            </p>
          </div>

          {/* Telemetry SVG Graph Container with pt- clearance for headings */}
          <div className="pt-[160px] xs:pt-[190px] lg:pt-[240px] flex-1 min-h-[220px] xs:min-h-[280px] lg:min-h-[360px] w-full flex items-center justify-center">
            <svg viewBox="50 80 700 440" className="h-full w-full select-none text-text-secondary overflow-visible">
              <defs>
                <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A6FD8" />
                  <stop offset="100%" stopColor="#00C2D4" />
                </linearGradient>
                <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ===== BROKEN PATHS (Problem Phase) ===== */}
              <path
                ref={brokenPath1Ref}
                d="M 150,150 Q 250,170 300,165 M 340,160 Q 500,140 650,150"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                className="opacity-0"
              />
              <path
                ref={brokenPath2Ref}
                d="M 150,450 Q 280,430 320,435 M 370,445 Q 520,470 650,450"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                className="opacity-0"
              />

              {/* ===== CONNECTED PATHS (Anvin Solution Phase) ===== */}
              <path
                ref={connectedPath1Ref}
                d="M 150,150 Q 250,180 400,300"
                fill="none"
                stroke="url(#cyan-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={connectedPath2Ref}
                d="M 150,450 Q 250,420 400,300"
                fill="none"
                stroke="url(#cyan-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={connectedPath3Ref}
                d="M 400,300 Q 550,220 650,150"
                fill="none"
                stroke="url(#cyan-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={connectedPath4Ref}
                d="M 400,300 Q 550,380 650,450"
                fill="none"
                stroke="url(#cyan-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* ===== ALERT ERROR SYMBOLS (Red Xs) ===== */}
              <g ref={x1Ref} transform="translate(320, 162)">
                <circle r="12" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                <path d="M -5,-5 L 5,5 M 5,-5 L -5,5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g ref={x2Ref} transform="translate(345, 440)">
                <circle r="12" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                <path d="M -5,-5 L 5,5 M 5,-5 L -5,5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* ===== LEGACY NODES ===== */}
              {/* Node 1: ERP Hub */}
              <g ref={node1Ref} transform="translate(150, 150)" className="opacity-0">
                <circle r="24" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="2" />
                <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="#7A9BB5" strokeWidth="1.5" />
                <text x="32" y="5" fontSize="13" className="font-display font-bold fill-text-primary select-none">ERP Core</text>
                {/* Node 1 success checkmark */}
                <g ref={check1Ref} transform="translate(-18, -18)">
                  <circle r="8" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                  <path d="M -3,0 L -1,2 L 3,-2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Node 2: Biometrics Logs */}
              <g ref={node2Ref} transform="translate(150, 450)" className="opacity-0">
                <circle r="24" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="2" />
                <path d="M -8,-6 L 8,-6 L 8,8 L -8,8 Z M -4,0 L 4,0 M -4,4 L 4,4" stroke="#7A9BB5" strokeWidth="1.5" fill="none" />
                <text x="32" y="5" fontSize="13" className="font-display font-bold fill-text-primary select-none">Biometrics Log</text>
                {/* Node 2 success checkmark */}
                <g ref={check2Ref} transform="translate(-18, 18)">
                  <circle r="8" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                  <path d="M -3,0 L -1,2 L 3,-2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Node 3: Qatar WPS */}
              <g ref={node3Ref} transform="translate(650, 150)" className="opacity-0">
                <circle r="24" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="2" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="#7A9BB5" strokeWidth="1.5" />
                <text x="-32" y="5" textAnchor="end" fontSize="13" className="font-display font-bold fill-text-primary select-none">WPS Portal</text>
                {/* Node 3 success checkmark */}
                <g ref={check3Ref} transform="translate(18, -18)">
                  <circle r="8" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                  <path d="M -3,0 L -1,2 L 3,-2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Node 4: Compliance Gateway */}
              <g ref={node4Ref} transform="translate(650, 450)" className="opacity-0">
                <circle r="24" fill="var(--color-bg-surface)" stroke="var(--color-divider)" strokeWidth="2" />
                <path d="M -8,-8 L 8,8 M 8,-8 L -8,8" stroke="#7A9BB5" strokeWidth="1.5" />
                <text x="-32" y="5" textAnchor="end" fontSize="13" className="font-display font-bold fill-text-primary select-none">Compliance Hub</text>
                {/* Node 4 success checkmark */}
                <g ref={check4Ref} transform="translate(18, 18)">
                  <circle r="8" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                  <path d="M -3,0 L -1,2 L 3,-2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* ===== ANVIN CENTRAL HUB NODE ===== */}
              <g ref={nodeCenterRef} transform="translate(400, 300)">
                {/* Outer pulsing ring */}
                <circle r="44" fill="none" stroke="#00C2D4" strokeWidth="1.5" className="animate-ping opacity-30" style={{ animationDuration: "3s" }} />
                {/* Center Core */}
                <circle r="36" fill="var(--color-bg-raised)" stroke="#00C2D4" strokeWidth="2.5" />
                {/* Embedded Logo Symbol (isometric cube shape) */}
                <g transform="scale(0.85) translate(-14, -14)">
                  <path d="M 14,3 L 26,10 L 14,17 L 2,10 Z" fill="#00C2D4" opacity="0.8" />
                  <path d="M 2,10 L 14,17 L 14,30 L 2,23 Z" fill="#1A6FD8" />
                  <path d="M 26,10 L 14,17 L 14,30 L 26,23 Z" fill="#0F4A9C" />
                </g>
                <text y="50" textAnchor="middle" fontSize="11" className="font-display font-bold tracking-widest fill-cyan select-none">ADLER CORE</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Side: Solution Panel Cards */}
        <div ref={panelRef} className="mt-4 lg:mt-0 w-full lg:w-[400px]">
          <div className="flex flex-col gap-3 xs:gap-5 p-4 xs:p-6 lg:p-8 bg-bg-raised border border-divider hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,194,212,0.1)]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-cyan/10 border border-cyan/30 text-cyan">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan block leading-none">SYSTEM OPERATIONAL</span>
                <h3 className="font-display text-base sm:text-xl font-bold text-text-primary mt-0.5 leading-tight">AdlER Unified Suite</h3>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm font-light leading-relaxed text-text-secondary">
              A real-time telemetry diagnostics layer monitors the active data threads, certifying all compliance bank transfers against Qatar Central Bank requirements.
            </p>

            <div className="border-t border-divider/60 pt-3 flex flex-col gap-2 text-[10px] sm:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-text-dim">CONNECTION RATIO</span>
                <span className="text-cyan font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">LATENCY SYNC</span>
                <span className="text-cyan font-bold">&lt; 1.8ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">ERRORS RESOLVED</span>
                <span className="text-cyan font-bold">4/4 ACTIVE</span>
              </div>
            </div>

            <div className="w-full bg-cyan/5 border border-cyan/20 p-2 sm:p-4 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-cyan animate-pulse">
                Telemetry Diagnostics Live
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
