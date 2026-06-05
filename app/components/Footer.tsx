"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-bg-base py-16 border-t border-divider overflow-hidden">
      {/* Decorative bottom-right cyan arc */}
      <div className="absolute bottom-0 right-0 h-48 w-48 overflow-hidden pointer-events-none select-none opacity-15">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute bottom-0 right-0 text-cyan"
        >
          <path
            d="M 200 0 A 200 200 0 0 0 0 200"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col items-start gap-4 col-span-2 md:col-span-1">
            <Link
              href="#"
              className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-text-primary"
              data-interactive
            >
              ANVIN
            </Link>
            <p className="max-w-xs text-xs font-light leading-relaxed text-text-secondary">
              Deloitte Fast 50 recognized enterprise software provider delivering the AdlER Suite across the GCC region for 10+ years.
            </p>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan">
              AdlER Suite
            </span>
            <Link href="#products" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              AdlER ERP Ledger
            </Link>
            <Link href="#products" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              AdlER HCM WPS
            </Link>
            <Link href="#products" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              AdlER SiteWatch
            </Link>
            <Link href="#products" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              ATSYS Logistics
            </Link>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan">
              Company
            </span>
            <Link href="#stats" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              Performance Metrics
            </Link>
            <Link href="#industries" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              Sectors Served
            </Link>
            <Link href="#services" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              Enterprise Services
            </Link>
            <Link href="#" className="text-xs text-text-secondary hover:text-text-primary" data-interactive>
              Careers
            </Link>
          </div>

          {/* Column 4: Offices */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan">
              GCC Offices
            </span>
            <span className="text-xs text-text-secondary">
              Doha, State of Qatar (HQ)
            </span>
            <span className="text-xs text-text-secondary">
              Dubai, United Arab Emirates
            </span>
            <span className="text-xs text-text-dim mt-2">
              support@anvininfosystems.com
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-[1px] w-full bg-divider/60" />

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs font-light text-text-dim">
          <span>
            &copy; {new Date().getFullYear()} Anvin Infosystems WLL. All rights reserved.
          </span>
          <span className="font-body italic text-text-secondary">
            &ldquo;Built for growth. Proven in the Gulf.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
