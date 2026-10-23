import { HandUnderline } from "./HandUnderline";

// A bottle-cap seal: 24 points alternating between two radii, softened by a round-joined stroke.
const SEAL_PATH =
  Array.from({ length: 24 }, (_, i) => {
    const radius = i % 2 === 0 ? 22.5 : 19.6;
    const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
    return `${i === 0 ? "M" : "L"}${(24 + radius * Math.cos(angle)).toFixed(2)} ${(24 + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ") + " Z";

/** Numbered section label: "01 Selected work". Sits above each section's heading. */
export function SectionTag({ number, label, className = "" }: { number: number; label: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3.5 ${className}`}>
      <span className="seal" aria-hidden="true" data-squish="">
        <svg viewBox="0 0 48 48">
          <path d={SEAL_PATH} fill="var(--ink)" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
        <span>{String(number).padStart(2, "0")}</span>
      </span>
      <span className="type-label relative">
        <span className="sr-only">Section {number}: </span>
        {label}
        <HandUnderline className="absolute -bottom-2 left-0 h-2.5 w-full" />
      </span>
    </p>
  );
}
