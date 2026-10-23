"use client";

// Cycles through a few words in place (task 55), e.g. the About heading's role.
// All words sit stacked in one grid cell, so the slot is always as wide as the longest word and swapping words
// never reflows the page. Put it at the end of a line so the reserved space doesn't show as a gap.
// It pauses on hover, while off-screen and in a background tab, and doesn't rotate at all in calm mode
// (the Motion toggle is the pause control for keyboard and touch users).
// Screen readers only ever hear the first word, so the sentence stays stable for them.

import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/lib/motion/preferences";
import { HandUnderline } from "@/components/ui/HandUnderline";

export function RotatingText({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const calm = useCalm();
  const [index, setIndex] = useState(0);
  const box = useRef<HTMLSpanElement>(null);
  const paused = useRef(false);
  const visible = useRef(true);
  const current = calm ? 0 : index;

  useEffect(() => {
    if (calm) return;
    const el = box.current;
    const observer = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting));
    if (el) observer.observe(el);
    const timer = window.setInterval(() => {
      if (paused.current || !visible.current || document.hidden) return;
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [calm, interval, words.length]);

  return (
    <span
      ref={box}
      className={`rotating ${className}`}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <span className="sr-only">{words[0]}</span>
      {words.map((word, i) => (
        <span key={word} className="rotating-word" data-current={i === current ? "" : undefined} aria-hidden="true">
          {word}
          {i === current && <HandUnderline className="absolute -bottom-[0.14em] left-[-2%] h-[0.3em] w-[104%]" />}
        </span>
      ))}
    </span>
  );
}
