"use client";

interface DitherSeparatorProps {
  color?: string; // Hex color code (e.g. "#1A3050" or "#0D1B2E")
  direction?: "down" | "up";
  height?: number; // Height in pixels
  className?: string;
}

export default function DitherSeparator({
  color = "#1A3050",
  direction = "down",
  height = 48,
  className = "",
}: DitherSeparatorProps) {
  // We construct the inline SVG and URL-encode it for the CSS background-image
  // We replace '#' with '%23' for correct URL encoding of colors in inline SVGs
  const encodedColor = color.replace("#", "%23");

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="64" viewBox="0 0 16 64">
      <rect x="0" y="0" width="16" height="2" fill="${encodedColor}" />
      <circle cx="8" cy="4" r="4.0" fill="${encodedColor}" />
      <circle cx="0" cy="12" r="3.2" fill="${encodedColor}" />
      <circle cx="16" cy="12" r="3.2" fill="${encodedColor}" />
      <circle cx="8" cy="20" r="2.6" fill="${encodedColor}" />
      <circle cx="0" cy="28" r="2.0" fill="${encodedColor}" />
      <circle cx="16" cy="28" r="2.0" fill="${encodedColor}" />
      <circle cx="8" cy="36" r="1.5" fill="${encodedColor}" />
      <circle cx="0" cy="44" r="1.1" fill="${encodedColor}" />
      <circle cx="16" cy="44" r="1.1" fill="${encodedColor}" />
      <circle cx="8" cy="52" r="0.7" fill="${encodedColor}" />
      <circle cx="0" cy="60" r="0.4" fill="${encodedColor}" />
      <circle cx="16" cy="60" r="0.4" fill="${encodedColor}" />
    </svg>
  `
    .replace(/\s+/g, " ")
    .trim();

  const backgroundUrl = `url("data:image/svg+xml,${svgString}")`;

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none ${
        direction === "up" ? "rotate-180" : ""
      } ${className}`}
      style={{
        height: `${height}px`,
        backgroundImage: backgroundUrl,
        backgroundRepeat: "repeat-x",
        backgroundSize: `auto ${height}px`,
      }}
    />
  );
}
