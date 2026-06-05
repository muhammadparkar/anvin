"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

export default function CtaBanner() {
  return (
    <section className="relative w-full bg-bg-surface py-24 overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-rotate-arc text-cyan opacity-[0.03]"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="100 80" />
        </svg>
      </div>

      {/* Parallax glows */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-cobalt/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] bg-cyan/6 rounded-full blur-[100px]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-12 text-center z-10">
        <Reveal variant="scale-up" duration={900}>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            The fastest path to GCC enterprise scaling.
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-sm md:text-base font-light leading-relaxed text-text-secondary">
            Consolidate your ledgers, automate local WPS banking transfers, and monitor physical operations in real-time. Schedule an engineering deep dive today.
          </p>
        </Reveal>

        <Reveal delay={200} variant="fade-up">
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#contact"
              className="group relative btn-sweep border border-cobalt bg-cobalt px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:border-cyan hover:shadow-[0_0_20px_rgba(0,194,212,0.3)] transition-all duration-300"
              data-interactive
            >
              Request Engineering Call
            </Link>
            <Link
              href="#contact"
              className="group border border-divider bg-bg-raised hover:border-cyan/60 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-300"
              data-interactive
            >
              Schedule WPS Demo
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
