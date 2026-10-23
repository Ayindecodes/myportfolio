// The doodle set (task 44): flat ink marks drawn over the vinyl objects.
// One stroke weight family (2.4–3.4 units, round caps), purple accent or ink only.
// Stroked paths have pathLength 100, so they can be drawn on with a single dash setting (see .hero-doodle).

type DoodleProps = { className?: string; color?: string };

const stroke = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Four-point sparkle with concave sides. */
export function Sparkle({ className, color = "var(--accent)" }: DoodleProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path pathLength={100} d="M20 2 Q22.4 17.6 38 20 Q22.4 22.4 20 38 Q17.6 22.4 2 20 Q17.6 17.6 20 2 Z" {...stroke} stroke={color} strokeWidth="2.6" />
    </svg>
  );
}

/** Small filled star used as a bullet in chips and lists. */
export function StarBullet({ className, color = "var(--accent)" }: DoodleProps) {
  return (
    <svg className={className} width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 0 Q5.9 4.1 10 5 Q5.9 5.9 5 10 Q4.1 5.9 0 5 Q4.1 4.1 5 0 Z" fill={color} />
    </svg>
  );
}

/** A pair of motion arcs, for "this thing just moved". */
export function Arcs({ className, color = "var(--ink)" }: DoodleProps) {
  return (
    <svg className={className} viewBox="0 0 64 30" aria-hidden="true">
      <path pathLength={100} d="M5 25 Q30 4 59 17" {...stroke} stroke={color} strokeWidth="2.6" />
      <path pathLength={100} d="M15 28 Q33 15 52 22" {...stroke} stroke={color} strokeWidth="2.6" />
    </svg>
  );
}

/** Curved hand-drawn arrow pointing down-right; flip with CSS for other directions. */
export function Arrow({ className, color = "var(--accent)" }: DoodleProps) {
  return (
    <svg className={className} viewBox="0 0 40 32" aria-hidden="true">
      <path pathLength={100} d="M4 5 C9 19 20 26 34 25" {...stroke} stroke={color} strokeWidth="2.6" />
      <path pathLength={100} d="M26 18 L34 25 L26 30" {...stroke} stroke={color} strokeWidth="2.6" />
    </svg>
  );
}

/** A little flame: a nod to the TechBlaze alias. Sits above the name the way a crown would. */
export function Blaze({ className, color = "var(--accent)" }: DoodleProps) {
  return (
    <svg className={className} viewBox="0 0 40 44" aria-hidden="true">
      <path
        pathLength={100}
        d="M20 41 C10.5 41 6 33.5 8 26.5 C9.6 21 14.5 18.5 14.8 11.5 C20.8 15 24.2 21 23.4 26.4 C26.3 24.6 27.6 21.4 27.4 17.8 C32.6 22.6 34 30 31 35 C28.9 38.6 24.9 41 20 41 Z"
        {...stroke}
        stroke={color}
        strokeWidth="2.8"
      />
      <path pathLength={100} d="M20 35.5 C16.8 35.5 15.2 33 16 30.6 C16.6 28.8 18.4 27.6 18.8 25.4 C21.6 27.4 23 30 22.4 32.4" {...stroke} stroke={color} strokeWidth="2.4" />
    </svg>
  );
}
