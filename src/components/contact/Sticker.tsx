"use client";

// The closing sticker (task 91). It tilts on hover (CSS), and a fast mouse swipe that passes close by knocks it
// aside; it then wobbles back on a loose spring. Mouse only; nothing moves in calm mode.

import { useEffect, useRef } from "react";
import { isCalm } from "@/lib/motion/preferences";
import { animate, atRestWithin, snap, spring, step } from "@/lib/motion/springs";

const REACH = 150; // px from the sticker's edge
const FAST = 1.2; // px per ms

function installShove(el: HTMLElement) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};

  const x = spring(0, 110, 7);
  const y = spring(0, 110, 7);
  const turn = spring(0, 130, 7);
  let last: { x: number; y: number; t: number } | null = null;

  const frame = (dt: number) => {
    step(x, dt);
    step(y, dt);
    step(turn, dt);
    const moving = !atRestWithin(0.05, x, y, turn);
    if (!moving) snap(x, y, turn);
    el.style.transform = moving ? `translate(${x.x.toFixed(1)}px, ${y.x.toFixed(1)}px) rotate(${turn.x.toFixed(2)}deg)` : "";
    return moving;
  };

  const onMove = (event: PointerEvent) => {
    const here = { x: event.clientX, y: event.clientY, t: event.timeStamp };
    const previous = last;
    last = here;
    if (!previous || event.pointerType !== "mouse" || isCalm()) return;
    const dt = here.t - previous.t;
    const dx = here.x - previous.x;
    const dy = here.y - previous.y;
    const distance = Math.hypot(dx, dy);
    if (dt <= 0 || dt > 100 || distance / dt < FAST) return;

    const box = el.getBoundingClientRect();
    const gap = Math.hypot(Math.max(box.left - here.x, 0, here.x - box.right), Math.max(box.top - here.y, 0, here.y - box.bottom));
    if (gap > REACH) return;

    const push = Math.min(distance / dt, 4) * (1 - gap / REACH);
    x.v += (dx / distance) * push * 150;
    y.v += (dy / distance) * push * 150;
    // a swipe above the middle spins it one way, below the other
    turn.v += Math.sign(dx || 1) * (here.y < box.top + box.height / 2 ? 1 : -1) * push * 40;
    animate(frame);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    el.style.transform = "";
  };
}

export function Sticker({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => (ref.current ? installShove(ref.current) : undefined), []);

  return (
    <span className="sticker-tilt">
      <span ref={ref} className="sticker">
        {text}
      </span>
    </span>
  );
}
