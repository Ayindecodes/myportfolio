"use client";

import { useEffect, useState } from "react";

/**
 * Which section is under the top third of the screen (null at the very top), and whether the page
 * has scrolled past `shrinkAt` px. Uses viewport positions, so it doesn't care how tall sections are.
 */
export function useScrollSpy(ids: readonly string[], shrinkAt = 60) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > shrinkAt);
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, shrinkAt]);

  return { active, scrolled };
}
