"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

        ctx.fillStyle = "#00C2D4";
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

function MagneticButton({
  children,
  className = "",
  href = "#",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(y, x);
    const distance = Math.min(Math.sqrt(x * x + y * y), 8);
    const mx = Math.cos(angle) * distance;
    const my = Math.sin(angle) * distance;

    button.style.transform = `translate3d(${mx.toFixed(1)}px, ${my.toFixed(1)}px, 0px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transform = "translate3d(0px, 0px, 0px)";
  };

  const baseStyle =
    "relative flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300";

  const styles =
    variant === "primary"
      ? `${baseStyle} bg-cobalt border border-cobalt text-text-primary hover:border-cyan btn-sweep hover:shadow-[0_0_15px_rgba(0,194,212,0.3)]`
      : `${baseStyle} border border-cobalt/40 text-text-secondary hover:border-cyan/60 hover:text-text-primary`;

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`${styles} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-interactive
    >
      {children}
    </Link>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  // SVG Elements
  const pathRef = useRef<SVGPathElement>(null);

  // Floating Cards
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      );

      const mm = gsap.matchMedia();

      // Desktop layout: Pinned scroll-synchronized timeline
      mm.add("(min-width: 1024px)", () => {
        // Measure path length
        const path = pathRef.current;
        if (!path) return;
        const length = path.getTotalLength();
        
        // Setup initial properties
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 0,
          scale: 0.9,
          y: 40,
        });

        // Scroll timeline for path drawing and card slides
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        scrollTl
          // Draw the SVG customer journey line
          .to(path, { strokeDashoffset: 0, duration: 1.8, ease: "none" })
          // Card 1 slide in (from left of right column)
          .to(card1Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=1.4")
          // Card 2 slide in (from right of right column)
          .to(card2Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.9")
          // Checkout Card 3 fade & scale-in
          .to(card3Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.4");
      });

      // Mobile/Tablet: Simpler entrance load animations (no pinning)
      mm.add("(max-width: 1023px)", () => {
        // Setup initial properties
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 0,
          scale: 0.95,
          y: 30,
        });

        gsap.to([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.5,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-bg-base pt-32 pb-16"
    >
      <ParticleField />

      {/* Hero Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 flex-1 flex flex-col justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center h-full">
            
            {/* Draw Line Indicator */}
            <div className="mb-6 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan">
                ADLER ENTERPRISE SUITE
              </span>
              <div className="h-[2px] bg-cyan w-[120px] origin-left scale-x-0 animate-clip-wipe" />
            </div>

            {/* Headline */}
            <h1
              ref={headingRef}
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-text-primary"
            >
              All in on <span className="text-cobalt">AdlER.</span>
            </h1>

            {/* Sub-line */}
            <p
              ref={sublineRef}
              className="mt-6 max-w-lg font-body text-base md:text-lg font-light leading-relaxed text-text-secondary"
            >
              The unified operating system for scale, payroll compliance, and IoT diagnostics. Built in Qatar, trusted across GCC conglomerates.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="mt-10 flex flex-col sm:flex-row gap-4">
              <MagneticButton href="#suite" variant="primary">
                Explore modules
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Request Demo
              </MagneticButton>
            </div>

          </div>

          {/* Right: Scroll-timeline Driven SVG and Cards */}
          <div className="lg:col-span-6 relative flex h-[500px] w-full items-center justify-center">
            
            {/* Customer Journey Line (drawn progressively) */}
            <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-visible">
              <path
                ref={pathRef}
                d="M 50,80 C 180,50 120,220 280,220 C 450,220 380,380 440,420"
                fill="none"
                stroke="url(#hero-cyan-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="hero-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A6FD8" />
                  <stop offset="100%" stopColor="#00C2D4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Card 1: WPS Notification (Slides from left, z-index 20) */}
            <div
              ref={card1Ref}
              className="absolute top-[12%] left-[2%] w-[260px] p-4 bg-bg-raised/90 backdrop-blur-md border border-divider/60 shadow-[0_10px_30px_rgba(7,17,30,0.5)] z-20"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan">WPS Compliance</span>
              </div>
              <h4 className="mt-2 font-display text-sm font-bold text-text-primary">Wage Protection Cleared</h4>
              <p className="mt-1 font-body text-xs font-light text-text-secondary">
                Registry compiled. Handshake secured with QNB Gateway.
              </p>
            </div>

            {/* Card 2: IoT Node Alert (Slides from right, z-index 10) */}
            <div
              ref={card2Ref}
              className="absolute top-[42%] right-[2%] w-[260px] p-4 bg-bg-raised/90 backdrop-blur-md border border-divider/60 shadow-[0_10px_30px_rgba(7,17,30,0.5)] z-10"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">IoT Core Diagnostics</span>
              </div>
              <h4 className="mt-2 font-display text-sm font-bold text-text-primary">Doha Port Node Active</h4>
              <p className="mt-1 font-body text-xs font-light text-text-secondary">
                Diagnostics healthy. Vibration threshold at 99.4% stability.
              </p>
            </div>

            {/* Card 3: Checkout/Summary (Fades and scales in, z-index 30) */}
            <div
              ref={card3Ref}
              className="absolute bottom-[8%] left-[15%] w-[280px] p-5 bg-bg-surface border-2 border-cyan/40 shadow-[0_15px_40px_rgba(0,194,212,0.15)] z-30"
            >
              <div className="flex items-center justify-between pb-3 border-b border-divider/60 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="font-display text-xs font-bold tracking-widest text-cyan uppercase">AdlER OPERATIONAL</span>
                </div>
                <span className="font-mono text-xs text-text-dim">ID: #4092</span>
              </div>
              <div className="flex flex-col gap-2.5 font-mono text-xs text-text-secondary">
                <div className="flex justify-between">
                  <span>BIOMETRICS LINKED</span>
                  <span className="text-text-primary">100.00%</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE PAYROLL</span>
                  <span className="text-text-primary">QAR 4.25M</span>
                </div>
                <div className="flex justify-between">
                  <span>TELEMETRY PLUGINS</span>
                  <span className="text-cyan font-bold">STABLE</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Client Logos Row (Section Footer) */}
      <div className="w-full mt-12 border-t border-divider/40 pt-8 z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-12 opacity-40">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan select-none">
              TRUSTED BY:
            </span>
            <span className="font-display font-bold text-base tracking-widest">QNB GROUP</span>
            <span className="font-display font-bold text-base tracking-widest">QATAR AIRWAYS</span>
            <span className="font-display font-bold text-base tracking-widest">OOREDOO</span>
            <span className="font-display font-bold text-base tracking-widest">MSHEIREB</span>
            <span className="font-display font-bold text-base tracking-widest">DOHA BANK</span>
          </div>
        </div>
      </div>

    </section>
  );
}
