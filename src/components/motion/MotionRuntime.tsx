"use client";

// Installs the site-wide interaction systems once, from the root layout. Renders nothing.

import { useEffect } from "react";
import { installAnchorScroll } from "@/lib/motion/anchors";
import { primeAudio } from "@/lib/motion/feedback";
import { installGloss } from "@/lib/motion/gloss";
import { onCalmChange, isCalm, watchSystemMotion } from "@/lib/motion/preferences";
import { installReveal, revealAll } from "@/lib/motion/reveal";
import { installSquish, resetSquish } from "@/lib/motion/squish";

export function MotionRuntime() {
  useEffect(() => {
    const cleanups = [installSquish(), installGloss(), installReveal(), installAnchorScroll(), watchSystemMotion()];

    const stopCalm = onCalmChange(() => {
      if (!isCalm()) return;
      resetSquish();
      revealAll();
    });

    // Browsers only allow audio after a gesture: load the sounds on the first one.
    const prime = () => primeAudio();
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      stopCalm();
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);

  return null;
}
