import type { ReactNode } from "react";

/** A wavy hand-drawn stroke. It draws itself as it scrolls into view where the browser supports it (see .hand-ink). */
export function HandUnderline({ className = "", color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg className={`hand-ink ${className}`} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
      <path
        pathLength={100}
        d="M2 6.6 Q14 3.4 27 4.6 T53 5.2 T78 4.4 T98 3.8"
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wraps a phrase and draws the hand underline beneath it. */
export function Underlined({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      {children}
      <HandUnderline className="absolute -bottom-[0.18em] left-[-2%] h-[0.32em] w-[104%]" />
    </span>
  );
}
