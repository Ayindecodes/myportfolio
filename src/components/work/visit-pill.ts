// The "Open ↗" pill (task 79): over a project image it takes the cursor's place and trails it on a spring.
// Mouse only, and off in calm mode. One pill serves every image in the section.

import { isCalm } from "@/lib/motion/preferences";
import { aim, animate, atRestWithin, snap, spring, step } from "@/lib/motion/springs";

export function installVisitPill(root: HTMLElement, pill: HTMLElement) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};

  const x = spring(0, 420, 30);
  const y = spring(0, 420, 30);
  const size = spring(0, 320, 20);
  let current: HTMLElement | null = null;

  const frame = (dt: number) => {
    step(x, dt);
    step(y, dt);
    step(size, dt);
    const moving = !atRestWithin(0.05, x, y) || !atRestWithin(0.002, size);
    if (!moving) snap(x, y, size);
    const scale = Math.max(size.x, 0);
    pill.style.transform = `translate(${x.x.toFixed(1)}px, ${y.x.toFixed(1)}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    pill.style.opacity = scale > 0.02 ? "1" : "0";
    return moving;
  };

  const mediaFrom = (event: Event) =>
    event.target instanceof Element ? event.target.closest<HTMLElement>("[data-visit]") : null;

  function hide() {
    if (!current) return;
    delete current.dataset.pill;
    current = null;
    aim(size, 0);
    animate(frame);
  }

  const onOver = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isCalm()) return;
    const media = mediaFrom(event);
    if (!media || media === current) return;
    if (!current) {
      // appear right at the cursor rather than flying in from the last spot
      x.x = x.target = event.clientX;
      y.x = y.target = event.clientY;
    }
    current = media;
    media.dataset.pill = ""; // hides the real cursor while the pill stands in for it
    pill.textContent = media.dataset.visit ?? "";
    aim(size, 1);
    animate(frame);
  };

  const onMove = (event: PointerEvent) => {
    if (!current) return;
    aim(x, event.clientX);
    aim(y, event.clientY);
    animate(frame);
  };

  const onOut = (event: PointerEvent) => {
    const media = mediaFrom(event);
    if (media && media === current && !media.contains(event.relatedTarget as Node | null)) hide();
  };

  root.addEventListener("pointerover", onOver);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerout", onOut);
  window.addEventListener("blur", hide);
  return () => {
    root.removeEventListener("pointerover", onOver);
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerout", onOut);
    window.removeEventListener("blur", hide);
    hide();
  };
}
