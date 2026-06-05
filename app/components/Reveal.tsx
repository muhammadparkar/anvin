"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "blur-in"
  | "rotate-in"
  | "clip-up";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  variant?: RevealVariant;
  threshold?: number;
  once?: boolean;
}

const variantStyles: Record<RevealVariant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-[32px]",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-[32px]",
    visible: "opacity-100 translate-y-0",
  },
  "slide-left": {
    hidden: "opacity-0 translate-x-[-48px]",
    visible: "opacity-100 translate-x-0",
  },
  "slide-right": {
    hidden: "opacity-0 translate-x-[48px]",
    visible: "opacity-100 translate-x-0",
  },
  "scale-up": {
    hidden: "opacity-0 scale-[0.88]",
    visible: "opacity-100 scale-100",
  },
  "blur-in": {
    hidden: "opacity-0 blur-[8px] translate-y-[16px]",
    visible: "opacity-100 blur-0 translate-y-0",
  },
  "rotate-in": {
    hidden: "opacity-0 rotate-[3deg] translate-y-[24px]",
    visible: "opacity-100 rotate-0 translate-y-0",
  },
  "clip-up": {
    hidden: "opacity-0 translate-y-[48px] scale-[0.96]",
    visible: "opacity-100 translate-y-0 scale-100",
  },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
  variant = "fade-up",
  threshold = 0.05,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const style = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out transform ${
        isVisible ? style.visible : style.hidden
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
