"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[]; // Words to highlight in cyan
  tag?: "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  highlightWords = [],
  tag: Tag = "h2",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start revealing when element enters bottom 80% of viewport
      // Complete when element reaches 30% from top
      const start = windowH * 0.85;
      const end = windowH * 0.3;

      if (rect.top > start) {
        setProgress(0);
      } else if (rect.top < end) {
        setProgress(1);
      } else {
        const p = (start - rect.top) / (start - end);
        setProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleCount = Math.ceil(progress * words.length);

  return (
    <div ref={containerRef} className={className}>
      <Tag className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
        {words.map((word, i) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[.,!?]/g, "")
          );
          const isVisible = i < visibleCount;

          return (
            <span
              key={i}
              className={`inline-block mr-[0.3em] transition-all duration-500 ease-out ${
                isVisible
                  ? isHighlighted
                    ? "opacity-100 translate-y-0 text-cyan"
                    : "opacity-100 translate-y-0 text-text-primary"
                  : "opacity-[0.12] translate-y-[4px] text-text-dim"
              }`}
              style={{
                willChange: "opacity, transform",
              }}
            >
              {word}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
