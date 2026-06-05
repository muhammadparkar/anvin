"use client";

import ScrollCounter from "./ScrollCounter";
import Reveal from "./Reveal";
import ParallaxLayer from "./ParallaxLayer";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Enterprise Clients", detail: "Active across GCC" },
  { value: 14028, suffix: "", label: "Employees Managed", detail: "Monthly WPS payroll" },
  { value: 99, suffix: ".9%", label: "Uptime SLA", detail: "Regional guarantee" },
  { value: 4200, suffix: "", label: "IoT Sensors Active", detail: "Mesaieed & Dukhan" },
];

export default function StatsSection() {
  return (
    <section className="relative w-full bg-bg-base py-24 overflow-hidden">
      {/* Parallax background glow */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cobalt/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-cyan/8 rounded-full blur-[100px]" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              BY THE NUMBERS
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Scaled for the Gulf&apos;s most demanding operations.
            </h2>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-divider/40">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100} duration={800} variant="scale-up">
              <div className="group relative flex flex-col items-center justify-center bg-bg-base p-8 md:p-12 text-center transition-all duration-500 hover:bg-bg-surface">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Animated counter */}
                <div className="font-stats text-5xl md:text-7xl font-bold text-text-primary tracking-wide">
                  <ScrollCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2200 + idx * 300}
                  />
                </div>

                {/* Label */}
                <span className="mt-4 font-display text-sm font-bold uppercase tracking-widest text-cyan">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs font-light text-text-dim uppercase tracking-wider">
                  {stat.detail}
                </span>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan group-hover:w-1/2 transition-all duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
