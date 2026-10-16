"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Paragraph whose words brighten as it scrolls through the viewport.
 * Renders fully visible on the server and for reduced-motion users.
 */
export function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        element.style.setProperty("--progress", "1");
        return;
      }
      const { top, height } = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.85;
      const end = viewport * 0.3;
      const progress = (start - top) / (height + start - end);
      element.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <p ref={ref} className={`reveal ${className}`} style={{ "--count": words.length } as CSSProperties}>
      {words.map((word, index) => (
        <span key={index} style={{ "--i": index } as CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
