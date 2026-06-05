"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContentGenerationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  // Card Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Notification Bubble Refs
  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const bubble3Ref = useRef<HTMLDivElement>(null);
  const bubble4Ref = useRef<HTMLDivElement>(null);

  // Parallax Background glow ref
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Query: Pinned scroll-synced timeline
      mm.add("(min-width: 1024px)", () => {
        // Set initial styles
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 0,
          y: 100,
          scale: 0.95,
        });

        gsap.set([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current, bubble4Ref.current], {
          opacity: 0,
          scale: 0.8,
        });

        gsap.set(timelineLineRef.current, { scaleY: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // 1. Initial Scroll: Grow timeline to 33%, draw Card 1 and Bubbles 1 & 2, move background glow (0.3x)
        tl.to(timelineLineRef.current, { scaleY: 0.33, ease: "none", duration: 1 })
          .to(glowRef.current, { y: -50, ease: "none", duration: 1 }, "-=1")
          .to(card1Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.8")
          .to([bubble1Ref.current, bubble2Ref.current], {
            opacity: 1,
            scale: 1,
            y: -150,
            x: (i) => (i === 0 ? -40 : 40),
            duration: 0.8,
          }, "-=0.6");

        // 2. Middle Scroll: Card 1 fades out, grow timeline to 66%, Card 2 enters, Bubble 3 shoots up
        tl.to(card1Ref.current, { opacity: 0, y: -100, scale: 0.95, duration: 0.8 })
          .to([bubble1Ref.current, bubble2Ref.current], { opacity: 0, duration: 0.4 }, "-=0.8")
          .to(timelineLineRef.current, { scaleY: 0.66, ease: "none", duration: 1 })
          .to(glowRef.current, { y: -100, ease: "none", duration: 1 }, "-=1")
          .to(card2Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.8")
          .to(bubble3Ref.current, {
            opacity: 1,
            scale: 1,
            y: -220,
            x: -60,
            duration: 0.8,
          }, "-=0.6");

        // 3. Final Scroll: Card 2 fades out, grow timeline to 100%, Card 3 enters, Bubble 4 enters
        tl.to(card2Ref.current, { opacity: 0, y: -100, scale: 0.95, duration: 0.8 })
          .to(bubble3Ref.current, { opacity: 0, duration: 0.4 }, "-=0.8")
          .to(timelineLineRef.current, { scaleY: 1.0, ease: "none", duration: 1 })
          .to(glowRef.current, { y: -150, ease: "none", duration: 1 }, "-=1")
          .to(card3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.8")
          .to(bubble4Ref.current, {
            opacity: 1,
            scale: 1,
            y: -180,
            x: 80,
            duration: 0.8,
          }, "-=0.6");
      });

      // Mobile/Tablet Query: Static display of timeline features (no pinning)
      mm.add("(max-width: 1023px)", () => {
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          position: "relative",
        });
        gsap.set(timelineLineRef.current, { scaleY: 1 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg-surface"
    >
      {/* Background Reticle / Glow (0.3x Parallax Speed) */}
      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-cobalt/5 rounded-full blur-[120px] pointer-events-none select-none"
      />

      <div className="relative mx-auto flex h-full w-full max-w-7xl px-6 py-20 z-10">
        
        {/* Left Side: Section Intro */}
        <div className="flex flex-col justify-center h-full w-full lg:w-1/3 pr-8 z-20">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan">
            REAL-TIME OPERATIONS
          </span>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
            Live diagnostic orchestration.
          </h2>
          <p className="mt-6 font-body text-sm font-light leading-relaxed text-text-secondary">
            Watch telemetry packages stream across modules. Each node instantly logs payroll data, logs compliance signatures, and feeds operational hubs.
          </p>
        </div>

        {/* Center: Growing Vertical Timeline */}
        <div className="relative flex justify-center items-center h-full w-[80px] lg:w-[120px]">
          {/* Static background rail */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-divider/40" />
          {/* Active growing timeline */}
          <div
            ref={timelineLineRef}
            className="absolute top-0 w-[2px] bg-cyan origin-top"
            style={{ height: "100%" }}
          />
          {/* Glowing node point */}
          <div className="absolute top-12 h-4 w-4 rounded-full bg-bg-surface border-2 border-cyan shadow-[0_0_10px_rgba(0,194,212,0.8)] z-10" />
          <div className="absolute bottom-12 h-4 w-4 rounded-full bg-bg-surface border-2 border-cyan shadow-[0_0_10px_rgba(0,194,212,0.8)] z-10" />
        </div>

        {/* Right Side: Interactive Parallax Screen (Cards and Notifications) */}
        <div className="relative flex-1 h-full flex items-center justify-center">
          
          {/* Card 1: Facility Logistics */}
          <div
            ref={card1Ref}
            className="absolute max-w-[380px] w-full p-6 bg-bg-raised border border-divider hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,194,212,0.08)] transition-all duration-300 z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan">ADLER WMS CORE</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">DISPATCHED</span>
            </div>
            <h4 className="font-display text-lg font-bold text-text-primary">Facility Mobility Dispatch</h4>
            <p className="mt-2 font-body text-sm font-light text-text-secondary">
              Truck ID Q-8092 logged departure at Hamad Port. Loading manifest synchronized with Doha Hub coordinates.
            </p>
            <div className="mt-4 pt-3 border-t border-divider/40 flex items-center justify-between text-xs text-text-dim">
              <span>MANIFEST #4029</span>
              <span>14:23 AST</span>
            </div>
          </div>

          {/* Card 2: Payroll Processing */}
          <div
            ref={card2Ref}
            className="absolute max-w-[380px] w-full p-6 bg-bg-raised border border-divider hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,194,212,0.08)] transition-all duration-300 z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan">ADLER HCM</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cobalt/20 text-cyan border border-cyan/25">QCB SYNCED</span>
            </div>
            <h4 className="font-display text-lg font-bold text-text-primary">HCM Salary Disbursement</h4>
            <p className="mt-2 font-body text-sm font-light text-text-secondary">
              Payroll registry file completed validation. Batch signature verified for 4,200 active GCC contractor profiles.
            </p>
            <div className="mt-4 pt-3 border-t border-divider/40 flex items-center justify-between text-xs text-text-dim">
              <span>BATCH QNB-0089</span>
              <span>15:02 AST</span>
            </div>
          </div>

          {/* Card 3: IoT Diagnostics */}
          <div
            ref={card3Ref}
            className="absolute max-w-[380px] w-full p-6 bg-bg-raised border border-divider hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,194,212,0.08)] transition-all duration-300 z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan">ADLER IOT DIAGNOSTICS</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/25">ONLINE</span>
            </div>
            <h4 className="font-display text-lg font-bold text-text-primary">Telemetry Diagnostics Node</h4>
            <p className="mt-2 font-body text-sm font-light text-text-secondary">
              Sensors at Doha Logistics Hub reported telemetry signal: temperature, pressure, vibration status nominal.
            </p>
            <div className="mt-4 pt-3 border-t border-divider/40 flex items-center justify-between text-xs text-text-dim">
              <span>NODE DL-99</span>
              <span>15:40 AST</span>
            </div>
          </div>

          {/* ===== 1.4x SPEED FLOATING NOTIFICATION BUBBLES ===== */}
          {/* Bubble 1: (Left / Top-ish) */}
          <div
            ref={bubble1Ref}
            className="absolute left-10 top-1/4 px-4 py-2 bg-bg-raised border border-cyan/25 rounded-full shadow-[0_0_15px_rgba(0,194,212,0.05)] text-xs font-mono text-cyan flex items-center gap-2 z-20 pointer-events-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            WPS Salary Cleared
          </div>

          {/* Bubble 2: (Right / Bottom-ish) */}
          <div
            ref={bubble2Ref}
            className="absolute right-10 bottom-1/4 px-4 py-2 bg-bg-raised border border-cobalt/25 rounded-full shadow-[0_0_15px_rgba(26,111,216,0.05)] text-xs font-mono text-text-secondary flex items-center gap-2 z-20 pointer-events-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
            Device ping: 14ms
          </div>

          {/* Bubble 3: (Left / Bottom-ish) */}
          <div
            ref={bubble3Ref}
            className="absolute left-16 bottom-1/3 px-4 py-2 bg-bg-raised border border-cyan/25 rounded-full shadow-[0_0_15px_rgba(0,194,212,0.05)] text-xs font-mono text-cyan flex items-center gap-2 z-20 pointer-events-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            Ledger Reconciled
          </div>

          {/* Bubble 4: (Right / Top-ish) */}
          <div
            ref={bubble4Ref}
            className="absolute right-12 top-1/3 px-4 py-2 bg-bg-raised border border-cobalt/25 rounded-full shadow-[0_0_15px_rgba(26,111,216,0.05)] text-xs font-mono text-text-secondary flex items-center gap-2 z-20 pointer-events-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
            Gate 4 Verified
          </div>

        </div>

      </div>
    </section>
  );
}
