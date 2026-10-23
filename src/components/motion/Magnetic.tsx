"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/motion/useMagnetic";

/** Wrap a button or link so it drifts toward the cursor and wobbles back when the cursor leaves. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span ref={ref} className="inline-flex">
      {children}
    </span>
  );
}
