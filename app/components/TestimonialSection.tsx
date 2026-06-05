"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "AdlER ERP has consolidated our financial ledger checks across 12 distinct GCC entities. The localized Qatari VAT audit automation has streamlined our compliance completely.",
    author: "Fahad Al-Thani",
    role: "Chief Financial Officer",
    company: "Gulf Logistics Conglomerate",
  },
  {
    quote: "Wage Protection System audits used to take days of manual spreadsheet reconciliation. Under AdlER's automated WPS bank files engine, our payroll is compiled in seconds.",
    author: "Mariam Al-Kuwari",
    role: "Director of Human Capital",
    company: "Qatar Infrastructure WLL",
  },
  {
    quote: "SiteWatch IoT telemetry alerts have automated refinery safety compliance reports in Mesaieed. The system catches sensor anomalies and valve offsets before they hit thresholds.",
    author: "Eng. Salem Al-Marri",
    role: "VP of Operations",
    company: "GCC Industrial Refining",
  },
];

export default function TestimonialSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prevSlide = () => {
    setDirection("left");
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection("right");
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-bg-base py-24 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Title Header */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              EXECUTIVE TESTIMONIALS
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
              Proven under pressure. Trusted at scale.
            </h2>
          </Reveal>
        </div>

        {/* Testimonials Slider */}
        <Reveal delay={150} variant="scale-up">
          <div className="relative flex flex-col items-center">
            
            {/* Cards Frame */}
            <div className="relative w-full max-w-4xl min-h-[300px] flex items-center justify-center">
              
              {/* Testimonial card with slide animation */}
              <div
                key={activeIdx}
                className="w-full bg-bg-surface border border-divider p-8 md:p-12 relative transition-all duration-500"
                style={{
                  animation: `slideIn${direction === "right" ? "Right" : "Left"} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                }}
              >
                {/* Quotation Mark */}
                <span className="absolute -top-6 left-6 font-display text-[80px] font-bold leading-none text-cyan opacity-20 select-none">
                  &ldquo;
                </span>

                <p className="relative z-10 font-display text-lg md:text-2xl font-bold italic leading-relaxed text-text-primary">
                  {testimonials[activeIdx].quote}
                </p>

                <div className="mt-8 border-t border-divider/40 pt-6 flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-wider text-cyan">
                    {testimonials[activeIdx].author}
                  </span>
                  <span className="text-xs text-text-secondary mt-1">
                    {testimonials[activeIdx].role} · {testimonials[activeIdx].company}
                  </span>
                </div>
              </div>

            </div>

            {/* Slider Navigation Controls */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={prevSlide}
                className="group flex h-12 w-12 items-center justify-center border border-divider bg-bg-surface text-text-secondary hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,194,212,0.15)] transition-all duration-300"
                aria-label="Previous Slide"
                data-interactive
              >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIdx ? "right" : "left");
                      setActiveIdx(idx);
                    }}
                    className={`h-2 transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-6 bg-cyan shadow-[0_0_8px_#00C2D4]"
                        : "w-2 bg-divider hover:bg-cobalt"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    data-interactive
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="group flex h-12 w-12 items-center justify-center border border-divider bg-bg-surface text-text-secondary hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,194,212,0.15)] transition-all duration-300"
                aria-label="Next Slide"
                data-interactive
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </button>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
