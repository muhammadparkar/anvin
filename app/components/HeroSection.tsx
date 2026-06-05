"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplineScene } from "./SplineScene";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.25 + 0.15,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = "#00A3B5";
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}



export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation (runs once immediately on page load, not scrubbed)
      const entranceTl = gsap.timeline();
      entranceTl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        [sublineRef.current, ctasRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        splineContainerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-bg-base pt-20 pb-6 sm:pt-32 sm:pb-16"
    >
      <ParticleField />

      {/* Premium Cyber Grid & Interactive Tech Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-40">
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,95,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,95,180,0.03)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Soft floating blurred mesh glows */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(26,95,180,0.05)_0%,transparent_70%)] animate-float" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,163,181,0.06)_0%,transparent_70%)] animate-float" style={{ animationDelay: "-2s", animationDuration: "6s" }} />

        {/* Flowing horizontal data beams */}
        <div className="absolute top-[35%] left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/15 to-transparent overflow-hidden">
          <div className="w-1/3 h-full bg-linear-to-r from-transparent via-cyan/40 to-transparent animate-beam-flow" />
        </div>
        <div className="absolute top-[70%] left-0 right-0 h-px bg-linear-to-r from-transparent via-cobalt/10 to-transparent overflow-hidden">
          <div className="w-1/4 h-full bg-linear-to-r from-transparent via-cobalt/35 to-transparent animate-beam-flow" style={{ animationDuration: "8s", animationDelay: "-3s" }} />
        </div>

        {/* Concentric telemetry circles (radar style) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] opacity-[0.25]">
          <svg viewBox="0 0 100 100" className="h-full w-full animate-rotate-arc text-cobalt/20">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="4 8" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="12 24" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] opacity-[0.2]">
          <svg viewBox="0 0 100 100" className="h-full w-full animate-rotate-arc-reverse text-cyan/20">
            <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="20 4" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="8 6" />
          </svg>
        </div>

        {/* Coordinate crosses */}
        <div className="absolute top-[18%] left-[22%] text-cobalt/15 select-none font-mono text-[10px] tracking-widest animate-pulse" style={{ animationDuration: "4s" }}>+</div>
        <div className="absolute top-[28%] right-[28%] text-cyan/20 select-none font-mono text-[10px] tracking-widest animate-pulse" style={{ animationDuration: "5s" }}>+</div>
        <div className="absolute bottom-[22%] left-[15%] text-cyan/20 select-none font-mono text-[10px] tracking-widest animate-pulse" style={{ animationDuration: "3s" }}>+</div>
        <div className="absolute bottom-[35%] right-[22%] text-cobalt/15 select-none font-mono text-[10px] tracking-widest animate-pulse" style={{ animationDuration: "6s" }}>+</div>

        {/* Telemetry metadata labels */}
        <div className="absolute top-[15%] left-[8%] flex flex-col font-mono text-[8px] tracking-wider text-cobalt/25 gap-1 select-none">
          <span>LOC: HAMAD_PORT_4092</span>
          <span>SYS_LATENCY: 1.8ms</span>
        </div>
        <div className="absolute bottom-[25%] right-[5%] flex flex-col font-mono text-[8px] tracking-wider text-cyan/35 gap-1 select-none text-right">
          <span>TX_SYNC: 100% SECURE</span>
          <span>VALVE_FLOW: +12.4 L/s</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 flex-1 flex flex-col justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center h-full">
            
            {/* Draw Line Indicator */}
            <div className="mb-3 sm:mb-6 flex flex-col gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan">
                ADLER ENTERPRISE SUITE
              </span>
              <div className="h-[2px] bg-cyan w-[120px] origin-left scale-x-0 animate-clip-wipe" />
            </div>

            {/* Headline */}
            <h1
              ref={headingRef}
              className="font-display text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-text-primary"
            >
              All in on <span className="text-cobalt">AdlER.</span>
            </h1>

            {/* Sub-line */}
            <p
              ref={sublineRef}
              className="mt-3 sm:mt-6 max-w-lg font-body text-sm sm:text-base md:text-lg font-light leading-relaxed text-text-secondary"
            >
              The unified operating system for scale, payroll compliance, and IoT diagnostics. Built in Qatar, trusted across GCC conglomerates.
            </p>

            {/* CTAs with Email Capture Input */}
            <div ref={ctasRef} className="mt-4 sm:mt-8 lg:mt-10 w-full max-w-lg z-20">
              {submitted ? (
                <div className="flex items-center gap-3 p-4 bg-cyan/10 border border-cyan/30 text-text-primary rounded-none animate-fade-in">
                  <svg className="h-5 w-5 text-cyan shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wider uppercase">Engineering notified! We&apos;ll reach out shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="ENTER YOUR EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-full px-5 py-4 text-xs font-semibold tracking-wider uppercase bg-bg-surface border border-cobalt/40 text-text-primary placeholder-text-dim/60 focus:outline-none focus:border-cyan transition-colors"
                      data-interactive
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-sweep border border-cobalt bg-cobalt px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:border-cyan hover:shadow-[0_0_15px_rgba(0,194,212,0.3)] transition-all duration-300 shrink-0 cursor-pointer"
                    data-interactive
                  >
                    Submit
                  </button>
                  <Link
                    href="#contact"
                    className="flex items-center justify-center border border-cobalt/40 text-text-secondary hover:border-cyan/60 hover:text-text-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center"
                    data-interactive
                  >
                    Request Demo
                  </Link>
                </form>
              )}
            </div>

          </div>

          {/* Right: Spline 3D Scene */}
          <div
            ref={splineContainerRef}
            className="lg:col-span-6 relative flex h-[320px] xs:h-[400px] lg:h-[550px] w-full items-center justify-center"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-120 lg:scale-135 origin-center"
            />
          </div>

        </div>
      </div>

    </section>
  );
}
