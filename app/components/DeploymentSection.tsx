"use client";

import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

interface DeploymentFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: DeploymentFeature[] = [
  {
    title: "GCC Data Sovereignty",
    description: "Keep all customer ledger audits and banking WPS information hosted strictly within regional borders (Qatar, Saudi Arabia, or UAE) satisfying public sector compliance directives.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Double-Key Data Encryption",
    description: "Secures sensitive workforce WPS transactions and procurement ledger files using double-key client-isolated keys. Zero visibility to third-party database nodes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function DeploymentSection() {
  return (
    <section className="relative w-full bg-bg-surface py-24 overflow-hidden">
      {/* Background Reticle */}
      <div className="absolute top-1/2 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full animate-rotate-arc text-cobalt opacity-[0.03]"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="160 80" />
        </svg>
      </div>

      {/* Parallax glow */}
      <ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 right-1/4 w-[280px] h-[280px] bg-cobalt/8 rounded-full blur-[100px]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Bullets */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Reveal variant="slide-left" duration={900}>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
                FLEXIBLE DEPLOYMENT
              </span>
              <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
                Local or Hosted. Double-key.
              </h2>
              <p className="mt-6 font-body text-sm font-light leading-relaxed text-text-secondary">
                Deploy AdlER in Qatar Cloud or orchestrate it directly on your private server infrastructure. Retain absolute sovereignty over your operational database.
              </p>
            </Reveal>

            {/* Bullets List */}
            <div className="mt-10 flex flex-col gap-8 w-full">
              {features.map((feat, idx) => (
                <Reveal key={idx} delay={200 + idx * 150} duration={700} variant="slide-left">
                  <div className="group flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-divider bg-bg-raised group-hover:border-cyan/50 transition-colors duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-text-primary group-hover:text-cyan transition-colors duration-300">
                        {feat.title}
                      </h3>
                      <p className="mt-2 font-body text-sm font-light leading-relaxed text-text-secondary">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: High-tech Isometric Server rack SVG */}
          <div className="lg:col-span-6 flex justify-center select-none">
            <Reveal duration={1000} delay={200} variant="scale-up" className="w-full max-w-[460px] aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full text-cobalt">
                {/* Server Isometric block */}
                <g transform="translate(130, 110)">
                  {/* Top Cover */}
                  <path d="M 70,0 L 140,35 L 70,70 L 0,35 Z" fill="#0D1B2E" stroke="#1A6FD8" strokeWidth="2" />
                  
                  {/* Front/Left slots */}
                  <path d="M 0,35 L 70,70 L 70,180 L 0,145 Z" fill="#07111E" stroke="#0F4A9C" strokeWidth="2" />
                  
                  {/* Front/Right slots */}
                  <path d="M 140,35 L 70,70 L 70,180 L 140,145 Z" fill="#112338" stroke="#0F4A9C" strokeWidth="2" />
                  
                  {/* Internal processor levels inside rack */}
                  <path d="M 0,60 L 70,95 L 140,60" fill="none" stroke="#1A3050" strokeWidth="1.5" />
                  <path d="M 0,90 L 70,125 L 140,90" fill="none" stroke="#1A3050" strokeWidth="1.5" />
                  <path d="M 0,120 L 70,155 L 140,120" fill="none" stroke="#1A3050" strokeWidth="1.5" />

                  {/* Pulsing indicator lights along front panels */}
                  <circle cx="20" cy="55" r="2" fill="#00C2D4" className="animate-pulse" />
                  <circle cx="35" cy="62" r="2" fill="#00C2D4" />
                  <circle cx="50" cy="70" r="2" fill="#00C2D4" className="animate-pulse" />

                  <circle cx="20" cy="85" r="2" fill="#1A6FD8" />
                  <circle cx="35" cy="92" r="2" fill="#00C2D4" className="animate-pulse" />
                  <circle cx="50" cy="100" r="2" fill="#00C2D4" />

                  <circle cx="20" cy="115" r="2" fill="#00C2D4" className="animate-pulse" />
                  <circle cx="35" cy="122" r="2" fill="#1A6FD8" />
                  <circle cx="50" cy="130" r="2" fill="#00C2D4" className="animate-pulse" />
                </g>

                {/* Animated circuit paths flowing to the ground */}
                <path d="M 130,220 L 70,250 L 70,280" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="10 40" strokeDashoffset="10" className="animate-[marqueeLeft_3s_linear_infinite] opacity-80" />
                <path d="M 270,220 L 330,250 L 330,280" stroke="#00C2D4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="10 40" strokeDashoffset="20" className="animate-[marqueeRight_3s_linear_infinite] opacity-80" />
              </svg>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
