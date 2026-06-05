"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const isDesktop = mediaQuery.matches;
    setTimeout(() => {
      setIsMobile(!isDesktop);
    }, 0);

    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) {
        setIsVisible(true);
        document.documentElement.classList.add("custom-cursor-active");
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or its ancestors are interactive
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[data-interactive]");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const onMouseLeaveDoc = () => {
      setIsVisible(false);
    };
    const onMouseEnterDoc = () => {
      setIsVisible(true);
    };

    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color,border-width] duration-200 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isHovered ? "36px" : "10px",
        height: isHovered ? "36px" : "10px",
        backgroundColor: isHovered ? "transparent" : "#1A6FD8",
        border: isHovered ? "2px solid #00C2D4" : "0px solid transparent",
        boxShadow: isHovered ? "0 0 10px rgba(0, 194, 212, 0.4)" : "none",
      }}
    />
  );
}
