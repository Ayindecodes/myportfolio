"use client";

// The centre pill (tasks 56–57). One dark "ink" pill slides to the active link on two springs, one per edge:
// the edge in the direction of travel is stiffer, so it leads and the other follows, like a caterpillar.

import { useLayoutEffect, useRef } from "react";
import { navLinks } from "@/content/site";
import { isCalm } from "@/lib/motion/preferences";
import { aim, animate, atRestWithin, snap, spring, step } from "@/lib/motion/springs";

export function NavPill({ active }: { active: string | null }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const edges = useRef({ left: spring(0), right: spring(0), shown: false });

  useLayoutEffect(() => {
    const wrapEl = wrap.current;
    const inkEl = ink.current;
    if (!wrapEl || !inkEl) return;
    const { left, right } = edges.current;

    const draw = () => {
      inkEl.style.translate = `${left.x.toFixed(2)}px 0`;
      inkEl.style.width = `${Math.max(right.x - left.x, 0).toFixed(2)}px`;
    };
    const frame = (dt: number) => {
      step(left, dt);
      step(right, dt);
      const moving = !atRestWithin(0.05, left, right);
      if (!moving) snap(left, right);
      draw();
      return moving;
    };

    const place = (instant: boolean) => {
      const link = active ? wrapEl.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
      if (!link) {
        inkEl.style.opacity = "0";
        edges.current.shown = false;
        return;
      }
      const toLeft = link.offsetLeft;
      const toRight = link.offsetLeft + link.offsetWidth;
      const goingRight = toLeft > left.x;
      // leading edge: snappy; trailing edge: softer
      aim(left, toLeft, goingRight ? 260 : 520, goingRight ? 26 : 30);
      aim(right, toRight, goingRight ? 520 : 260, goingRight ? 30 : 26);
      if (instant || !edges.current.shown || isCalm()) {
        snap(left, right);
        draw();
      } else {
        animate(frame);
      }
      edges.current.shown = true;
      inkEl.style.opacity = "1";
    };

    place(false);
    // Re-measure when fonts load or the nav changes size (it shrinks on scroll). The observer also fires once
    // as soon as it starts, which would snap away the slide we just started, so skip that first call.
    let initial = true;
    const observer = new ResizeObserver(() => {
      if (initial) {
        initial = false;
        return;
      }
      place(true);
    });
    observer.observe(wrapEl);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={wrap} className="nav-pill">
      <span ref={ink} className="nav-ink" aria-hidden="true" />
      <ul className="relative flex items-center gap-0.5">
        {navLinks.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                data-id={id}
                data-squish="0.35"
                aria-current={isActive ? "location" : undefined}
                className={`nav-link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
