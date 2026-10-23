"use client";

import { useRef } from "react";
import { Blaze } from "@/components/ui/Doodles";
import { loadGsap } from "@/lib/motion/gsap";
import { isCalm } from "@/lib/motion/preferences";

/** Proves the lazy GSAP loader: clicking redraws the flame's strokes. */
export function GsapDemo() {
  const wrap = useRef<HTMLButtonElement>(null);

  async function redraw() {
    if (isCalm() || !wrap.current) return;
    const { gsap } = await loadGsap();
    const paths = wrap.current.querySelectorAll("path");
    paths.forEach((path) => path.setAttribute("pathLength", "100"));
    gsap.fromTo(
      paths,
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.12 },
    );
  }

  return (
    <button ref={wrap} type="button" onClick={redraw} className="flex flex-col items-center gap-3" data-squish="">
      <Blaze className="w-14" />
      <span className="font-mono text-xs text-dim">Click to redraw (GSAP)</span>
    </button>
  );
}
