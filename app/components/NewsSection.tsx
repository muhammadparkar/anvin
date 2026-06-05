"use client";

import Link from "next/link";
import Reveal from "./Reveal";

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

const articlesData: Article[] = [
  {
    id: 1,
    category: "Logistics Optimization",
    title: "Orchestrating Mesaieed Port Operations via ATSYS",
    description: "How Qatar's largest shipping coordinator deployed fleet automation telemetry to reduce vessel port delays by 34%.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Financial Compliance",
    title: "Automated WPS Payroll Ledger Consolidation",
    description: "A case study on auditing labor law payroll structures across 14,000+ employees in Qatar and UAE banks.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "IoT Site Telemetry",
    title: "Industrial Telemetry Streams in Mesaieed Zone",
    description: "Installing real-time thermal sensor nodes and safety telemetry inside critical high-temperature refinery points.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
  },
];

const cardVariants: Array<"slide-left" | "fade-up" | "slide-right"> = [
  "slide-left",
  "fade-up",
  "slide-right",
];

function NewsCard({ article }: { article: Article }) {
  return (
    <div
      className="group relative flex flex-col bg-bg-surface border border-divider overflow-hidden transition-all duration-500 hover:border-cyan/60 hover:shadow-[0_0_40px_rgba(0,194,212,0.06)]"
      data-interactive
    >
      {/* Duotone Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-bg-base select-none">
        {/* Cobalt multiply overlay */}
        <div
          className="absolute inset-0 bg-cobalt mix-blend-multiply opacity-85 transition-opacity duration-500 group-hover:opacity-15 z-10"
        />
        {/* Grayscale styled image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-110 group-hover:filter-none"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 relative">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan">
            {article.category}
          </span>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-text-primary group-hover:text-cyan transition-colors duration-300">
            {article.title}
          </h3>
          <p className="mt-3 font-body text-sm font-light leading-relaxed text-text-secondary">
            {article.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-divider/40">
          <Link
            href="#contact"
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan"
          >
            Read case study
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
    </div>
  );
}

export default function NewsSection() {
  return (
    <section id="insights" className="relative w-full bg-bg-base py-24 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Header Title */}
        <div className="mb-16 text-center md:text-left">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              GCC SUCCESS STUDIES
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Proven Enterprise Success
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light text-text-secondary">
              Explore how Gulf conglomerates integrate the AdlER platform to automate their operations and satisfy regional regulatory frameworks.
            </p>
          </Reveal>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.map((article, idx) => (
            <Reveal key={article.id} delay={idx * 120} duration={700} variant={cardVariants[idx]}>
              <NewsCard article={article} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
