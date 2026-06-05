"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0 = no parallax, positive = moves slower (background), negative = faster (foreground)
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate how far through the viewport the element is
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowH / 2;
      const delta = (elementCenter - viewportCenter) * speed;
      
      setOffset(delta);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
