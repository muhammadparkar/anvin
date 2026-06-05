"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import ParallaxLayer from "./ParallaxLayer";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
}

const productsData: Product[] = [
  {
    id: 1,
    name: "AdlER Business Suite",
    category: "Enterprise ERP",
    description: "Core enterprise resource planner orchestrating finance, supply chain, asset management, and procurement for GCC conglomerates.",
    features: ["GCC Tax Compliant", "Multi-Entity Ledger", "Procurement Automation"],
  },
  {
    id: 2,
    name: "AdlER HCM",
    category: "Human Capital",
    description: "End-to-end human capital management tailored for regional labor compliance, complex payroll, and visa tracking.",
    features: ["WPS Integration", "GCC Labor Law Rules", "Visa & Passport Alerts"],
  },
  {
    id: 3,
    name: "AdlER HR ESS",
    category: "Self Service",
    description: "Mobile-first employee self-service platform designed to streamline leave requests, expense reports, and salary certificates.",
    features: ["Intelligent Routing", "Arabic Localization", "Digital Signing"],
  },
  {
    id: 4,
    name: "AdlER Mobile",
    category: "Mobility",
    description: "Real-time executive control board consolidating decision analytics and instant approvals for on-the-move operations.",
    features: ["Push Approvals", "Biometric Lock", "Executive KPI Graphs"],
  },
  {
    id: 5,
    name: "AdlER SiteWatch",
    category: "IoT & Security",
    description: "Telemetry and sensor-driven platform for active industrial site tracking, equipment health telemetry, and safety metrics.",
    features: ["Real-time Telemetry", "Anomaly Alerts", "Sensor Integration"],
  },
  {
    id: 6,
    name: "AdlER Profac",
    category: "Facility Management",
    description: "Comprehensive facility operations control suite for preventive maintenance, resource scheduling, and lease management.",
    features: ["SLA Monitoring", "Asset Lifecycle Maps", "Work Order Dispatch"],
  },
  {
    id: 7,
    name: "ATSYS",
    category: "Transit & Logistics",
    description: "Advanced transit coordination system providing fleet route optimization, dispatch control, and cargo tracking.",
    features: ["Route Analytics", "Fleet Telemetry", "Delivery Manifests"],
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -4, y: x * 4 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex h-[420px] w-full flex-col justify-between border border-divider bg-bg-surface p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,194,212,0.08),inset_0_0_0_1px_rgba(0,194,212,0.3)] select-none"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-interactive
    >
      {/* Left rail border drawing down on entry */}
      <div
        className={`absolute top-0 left-0 w-[2px] bg-cobalt transition-all duration-700 ease-out ${
          hasEntered ? "h-full" : "h-0"
        }`}
      />

      {/* SVG quarter-arc in top-right corner */}
      <div className="absolute top-0 right-0 h-12 w-12 overflow-hidden pointer-events-none select-none">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="absolute top-0 right-0 text-cobalt opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        >
          <path
            d="M 48 0 A 48 48 0 0 0 0 48"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.02] via-transparent to-cobalt/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content Top */}
      <div className="relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan">
          {product.category}
        </span>
        <h3 className="mt-2 font-display text-2xl font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">
          {product.name}
        </h3>
        <p className="mt-4 font-body text-sm font-light leading-relaxed text-text-secondary">
          {product.description}
        </p>
      </div>

      {/* Feature list */}
      <div className="relative z-10 mt-6 flex flex-col gap-2 border-t border-divider/40 pt-4">
        {product.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-text-dim">
            <span className="h-1 w-1 bg-cyan group-hover:shadow-[0_0_6px_#00C2D4] transition-shadow duration-300" />
            {f}
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="relative z-10 mt-6 flex items-center justify-between">
        <Link
          href="#contact"
          className="group/link flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan transition-colors"
        >
          Learn more
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cobalt to-cyan group-hover:w-full transition-all duration-700" />
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="relative w-full bg-bg-base py-24 overflow-hidden">
      {/* Background Arc */}
      <div className="absolute top-1/2 left-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-rotate-arc-reverse text-cobalt opacity-[0.03]"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="240 50"
          />
        </svg>
      </div>

      <ParallaxLayer speed={0.12} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-0 w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(26,95,180,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(0,163,181,0.05)_0%,transparent_70%)]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        {/* Header Title */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal variant="slide-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
                PRODUCT ARCHITECTURE
              </span>
            </div>
          </Reveal>
          <Reveal delay={100} variant="slide-right">
            <p className="max-w-md text-sm font-light text-text-secondary">
              A precise family of modular enterprise applications engineered for high-transaction environments across GCC sectors.
            </p>
          </Reveal>
        </div>

        {/* Scroll-driven text reveal for headline */}
        <TextReveal
          text="The AdlER Suite"
          highlightWords={["AdlER"]}
          className="mb-16"
        />

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product, idx) => {
            const variant = idx % 3 === 0 ? "slide-left" : idx % 3 === 1 ? "scale-up" : "slide-right";
            return (
              <Reveal key={product.id} delay={idx * 80} duration={700} variant={variant as "slide-left" | "scale-up" | "slide-right"}>
                <ProductCard product={product} index={idx} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
