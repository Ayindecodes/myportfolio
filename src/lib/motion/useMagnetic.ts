"use client";

// Magnetic pull (task 50): the element drifts toward the cursor while hovered and springs back with a wobble.
// Runs on the shared spring loop; mouse only, off in calm mode.

import { useEffect, useRef } from "react";
import { isCalm } from "./preferences";
import { aim, animate, atRestWithin, snap, spring, step } from "./springs";

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const x = spring(0, 220, 18);
    const y = spring(0, 220, 18);
    const frame = (dt: number) => {
      step(x, dt);
      step(y, dt);
      const moving = !atRestWithin(0.05, x, y); // pixels: settle within a twentieth of one
      if (!moving) snap(x, y);
      el.style.translate = x.x || y.x ? `${x.x.toFixed(2)}px ${y.x.toFixed(2)}px` : "";
      return moving;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || isCalm()) return;
      const box = el.getBoundingClientRect();
      aim(x, (event.clientX - (box.left + box.width / 2)) * strength, 220, 18);
      aim(y, (event.clientY - (box.top + box.height / 2)) * strength, 220, 18);
      animate(frame);
    };
    const onLeave = () => {
      aim(x, 0, 170, 9); // looser on the way back, so it wobbles into place
      aim(y, 0, 170, 9);
      animate(frame);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.translate = "";
    };
  }, [strength]);

  return ref;
}
