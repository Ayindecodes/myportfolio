"use client";

// Attaches the hero physics to the server-rendered hero markup. Renders no content of its own.

import { useEffect, useRef, type ReactNode } from "react";
import { installHero } from "./hero-motion";

export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => (ref.current ? installHero(ref.current) : undefined), []);

  return (
    <div ref={ref} className="hero-stage">
      {children}
    </div>
  );
}
