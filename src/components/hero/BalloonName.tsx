// The balloon "AYINDE" (tasks 62–63, 74). A real <h1> whose visible letters are inline SVG, so the name is in the
// server HTML, needs no web font and never shifts the layout. Each letter is its own element: the material is
// painted once and every movement after that is a cheap transform (see hero-motion.ts).
//
// Element layers, outermost first, each moved by exactly one thing:
//   .hero-jelly (scroll wobble) › .hero-door (scroll doors) › .balloon (physics) › .balloon-in (entrance) › svg

import { Blaze } from "@/components/ui/Doodles";
import { site } from "@/content/site";
import { balloon, PUFF, type BalloonLetter } from "./wordmark";

/** Inflated latex, built only from blurs and offsets in the letter's own units so it looks the same at any size. */
function BalloonMaterial() {
  const region = { filterUnits: "userSpaceOnUse", x: -300, y: -1080, width: 1400, height: 1560 } as const;
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="balloon-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9068ff" />
          <stop offset="1" stopColor="#7448ef" />
        </linearGradient>
        <filter id="balloon" {...region} colorInterpolationFilters="sRGB">
          {/* Volume: a blurred copy is ~1 in the middle of a stroke and ~0.5 at its edge; edges get darker. */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="46" result="field" />
          <feComposite in="SourceAlpha" in2="field" operator="out" result="rimRaw" />
          {/* Broad light from the upper left: the volume compared with itself, shifted toward the light. */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="70" result="broad" />
          <feOffset in="broad" dx="34" dy="42" result="broadShift" />
          <feComposite in="broad" in2="broadShift" operator="arithmetic" k2="1" k3="-1" result="litRaw" />
          <feComposite in="broadShift" in2="broad" operator="arithmetic" k2="1" k3="-1" result="shadeRaw" />
          {/* Gloss: the core of each stroke nudged toward the light; the sliver it uncovers is the shine. */}
          <feMorphology in="SourceAlpha" operator="erode" radius="58" result="core" />
          <feGaussianBlur in="core" stdDeviation="22" result="coreSoft" />
          <feOffset in="coreSoft" dx="-20" dy="-26" result="coreUp" />
          <feOffset in="coreSoft" dx="14" dy="18" result="coreDown" />
          <feComposite in="coreUp" in2="coreDown" operator="out" result="glossRaw" />

          <feFlood floodColor="#3b1fa3" />
          <feComposite in2="rimRaw" operator="in" />
          <feComponentTransfer result="rim">
            <feFuncA type="linear" slope="1.05" />
          </feComponentTransfer>
          <feFlood floodColor="#2a1278" />
          <feComposite in2="shadeRaw" operator="in" />
          <feComponentTransfer result="shade">
            <feFuncA type="linear" slope="2.2" />
          </feComponentTransfer>
          <feFlood floodColor="#d9ccff" />
          <feComposite in2="litRaw" operator="in" />
          <feComponentTransfer result="lit">
            <feFuncA type="linear" slope="1.5" />
          </feComponentTransfer>
          <feFlood floodColor="#ffffff" />
          <feComposite in2="glossRaw" operator="in" />
          <feComponentTransfer result="gloss">
            <feFuncA type="linear" slope="0.95" intercept="-0.08" />
          </feComponentTransfer>
          <feMerge result="body">
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="lit" />
            <feMergeNode in="rim" />
            <feMergeNode in="shade" />
            <feMergeNode in="gloss" />
          </feMerge>
          <feComposite in="body" in2="SourceAlpha" operator="in" result="clipped" />
          {/* Soft shadow on the paper below. */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="28" />
          <feOffset dx="10" dy="44" />
          <feComponentTransfer result="drop">
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feFlood floodColor="#2a2430" />
          <feComposite in2="drop" operator="in" result="dropTinted" />
          <feMerge>
            <feMergeNode in="dropTinted" />
            <feMergeNode in="clipped" />
          </feMerge>
        </filter>
        <filter id="balloon-glint" {...region}>
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
    </svg>
  );
}

function Letter({ letter }: { letter: BalloonLetter }) {
  return (
    <span
      className="balloon"
      data-letter={letter.index}
      data-pitch={letter.pitch}
      style={{ left: letter.left, width: letter.width, ["--i" as string]: letter.index }}
    >
      <span className="balloon-in">
        <svg viewBox={letter.viewBox} preserveAspectRatio="none" focusable="false">
          <path
            className="balloon-shape"
            d={letter.d}
            fill="url(#balloon-fill)"
            stroke="url(#balloon-fill)"
            strokeWidth={PUFF}
            strokeLinejoin="round"
            filter="url(#balloon)"
          />
          <path d={letter.glint} stroke="#fff" strokeWidth="30" strokeLinecap="round" opacity="0.8" filter="url(#balloon-glint)" />
        </svg>
        {letter.char === "I" && (
          // The TechBlaze flame sits on the I like a candle and bobs along with it.
          <span className="balloon-flame hero-doodle" data-doodle="">
            <Blaze className="w-full" />
          </span>
        )}
      </span>
    </span>
  );
}

export function BalloonName() {
  return (
    <h1 className="hero-name" style={{ aspectRatio: balloon.aspectRatio }}>
      <BalloonMaterial />
      <span className="sr-only">
        {site.name}, {site.role.toLowerCase()} in Lagos
      </span>
      <span className="hero-jelly" aria-hidden="true">
        {balloon.doors.map((door, i) => (
          <span key={i} className="hero-door" data-door={i === 0 ? "left" : "right"} style={{ left: door.left, width: door.width }}>
            {door.letters.map((letter) => (
              <Letter key={letter.index} letter={letter} />
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
