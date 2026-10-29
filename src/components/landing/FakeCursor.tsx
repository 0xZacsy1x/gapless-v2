import React from "react";

interface FakeCursorProps {
  x: number;
  y: number;
  isClicking?: boolean;
  visible?: boolean;
}

export default function FakeCursor({
  x,
  y,
  isClicking = false,
  visible = true,
}: FakeCursorProps) {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${isClicking ? 0.88 : 1})`,
        transformOrigin: "3px 2px",
        opacity: visible ? 1 : 0,
        transition: `transform 780ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), scale 180ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* SVG Brand Cursor with clean neutral drop shadow */}
        <svg
          width="28"
          height="34"
          viewBox="0 0 24 28"
          fill="none"
          className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-transform duration-200"
        >
          <path
            d="M2.5 1.5L21.5 13.5L12 16L8 25.5L2.5 1.5Z"
            fill="#1d4ed8"
            stroke="white"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Expanding Click Ripple Effect */}
        {isClicking && (
          <span
            className="absolute w-12 h-12 rounded-full bg-brand-primary/25 border-2 border-brand-primary animate-ping pointer-events-none"
            style={{
              left: "-19px",
              top: "-20px",
              animationDuration: "450ms",
            }}
          />
        )}
      </div>
    </div>
  );
}
