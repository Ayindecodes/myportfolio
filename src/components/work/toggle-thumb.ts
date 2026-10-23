// The Work toggle's thumb (task 76): a spring body that stretches as it travels and squashes against the end
// wall when it overshoots, like a blob of vinyl. Positions are slot indexes; drawing works in pixels so the
// squash is anchored exactly at the wall.

import { isCalm } from "@/lib/motion/preferences";
import { aim, animate, atRestWithin, snap, spring, step } from "@/lib/motion/springs";

export function createThumb(el: HTMLElement, slots: number, index: number) {
  const position = spring(index, 300, 19);
  let width = el.offsetWidth;
  let disposed = false;

  function draw() {
    const stretch = Math.min(Math.abs(position.v) * 0.05, 0.24);
    const centre = (position.x + 0.5) * width;
    const half = (width * (1 + stretch)) / 2;
    // Past either end the thumb can't move further, so it squashes instead.
    const left = Math.max(centre - half, 0);
    const right = Math.min(centre + half, slots * width);
    const scaleX = (right - left) / width;
    const scaleY = 1 - stretch * 0.3 + Math.max(1 - scaleX, 0) * 0.6;
    el.style.transform =
      position.x === Math.round(position.x) && position.v === 0
        ? `translateX(${position.x * width}px)`
        : `translateX(${left.toFixed(2)}px) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
  }

  const frame = (dt: number) => {
    if (disposed) return false;
    step(position, dt);
    const moving = !atRestWithin(0.002, position);
    if (!moving) snap(position);
    draw();
    return moving;
  };

  const sizes = new ResizeObserver(() => {
    width = el.offsetWidth;
    draw();
  });
  sizes.observe(el);
  draw();

  return {
    moveTo(next: number, instant = false) {
      aim(position, next);
      if (instant || isCalm()) {
        snap(position);
        draw();
      } else {
        animate(frame);
      }
    },
    dispose() {
      disposed = true;
      sizes.disconnect();
    },
  };
}
