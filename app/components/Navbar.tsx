"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Suite", href: "#suite" },
  { name: "Stats", href: "#stats" },
  { name: "Products", href: "#products" },
  { name: "Industries", href: "#industries" },
  { name: "Services", href: "#services" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section highlighting
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-divider bg-overlay py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center"
            data-interactive
          >
            <Image
              src="/Anvin-LOGO-PNG-1.webp"
              alt="Anvin"
              width={110}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Links Center */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                  data-interactive
                >
                  {/* Small cyan arc above link */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  >
                    <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
                      <path
                        d="M1 5C4.5 1.5 9.5 1.5 13 5"
                        stroke="#00C2D4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Right */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="#contact"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              data-interactive
            >
              Login
            </Link>
            <Link
              href="#contact"
              className="btn-sweep border border-cobalt bg-cobalt px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-cyan hover:shadow-[0_0_15px_rgba(0,194,212,0.3)]"
              data-interactive
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle Menu"
            data-interactive
          >
            <span className="h-0.5 w-6 bg-text-primary" />
            <span className="h-0.5 w-6 bg-text-primary" />
            <span className="h-0.5 w-4 bg-cyan self-end" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-50 flex flex-col bg-bg-base"
        style={{
          clipPath: mobileMenuOpen ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
          transition: "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/Anvin-LOGO-PNG-1.webp"
              alt="Anvin"
              width={110}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="relative h-8 w-8 p-2"
            aria-label="Close Menu"
            data-interactive
          >
            <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-text-primary" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-text-primary" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-semibold tracking-wider text-text-secondary uppercase transition-colors hover:text-cyan"
              data-interactive
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-text-secondary hover:text-text-primary"
              data-interactive
            >
              Login
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-sweep border border-cobalt bg-cobalt px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:border-cyan"
              data-interactive
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
