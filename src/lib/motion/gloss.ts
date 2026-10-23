// Cursor-following gloss (task 49): elements with data-gloss show a soft highlight where the mouse is.
// Mouse only; the highlight itself is CSS ([data-gloss]::after) and fades in on hover.

import { isCalm } from "./preferences";

export function installGloss() {
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isCalm() || !(event.target instanceof Element)) return;
    const el = event.target.closest<HTMLElement>("[data-gloss]");
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${(((event.clientX - box.left) / box.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(((event.clientY - box.top) / box.height) * 100).toFixed(1)}%`);
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  return () => document.removeEventListener("pointermove", onMove);
}
