// The letters' entrance (task 64) as CSS keyframes sampled from the same spring physics the site uses.
// Running it in CSS means it starts with the first paint and stays smooth while the page's JavaScript is
// still loading; the live physics (breathing, presses) take over on a separate wrapper once it has.
// Server-only: computed once when the page is built.

import { aim, spring, step } from "@/lib/motion/springs";

const SAMPLE_MS = 40;
const FADE_MS = 260;

const num = (n: number) => Number(n.toFixed(4));

/** Each letter grows from a small, squashed blob and drops into place, wobbling past full size. */
export function balloonEntrance() {
  const scaleX = spring(0.2, 170, 10);
  const scaleY = spring(0.2, 240, 11.5);
  const drop = spring(-20, 190, 15); // % of the letter's own height
  aim(scaleX, 1);
  aim(scaleY, 1);
  aim(drop, 0);

  const samples: { t: number; css: string }[] = [];
  const dt = 1 / 240;
  let elapsed = 0;
  for (let t = 0; t <= 2000; t += SAMPLE_MS) {
    while (elapsed < t / 1000) {
      step(scaleX, dt);
      step(scaleY, dt);
      step(drop, dt);
      elapsed += dt;
    }
    const settled = Math.abs(scaleX.x - 1) < 0.002 && Math.abs(scaleY.x - 1) < 0.002 && Math.abs(drop.x) < 0.1;
    if (t > FADE_MS && settled) {
      // The resting state, written exactly so rounding never leaves a letter a hair off.
      samples.push({ t, css: "opacity:1;translate:0 0;scale:1 1" });
      break;
    }
    samples.push({
      t,
      css: `opacity:${num(Math.min(t / FADE_MS, 1))};translate:0 ${num(drop.x)}%;scale:${num(scaleX.x)} ${num(scaleY.x)}`,
    });
  }

  const duration = samples[samples.length - 1].t;
  const frames = samples.map(({ t, css }) => `${num((t / duration) * 100)}%{${css}}`).join("");
  return { duration, css: `@keyframes balloon-in{${frames}}` };
}
