// Tiny spring physics (task 47). Everything pressable moves on these instead of easing curves,
// so squish, magnetism and the toggle thumb all share one feel.

export type Spring = {
  /** current value */
  x: number;
  /** velocity, units per second */
  v: number;
  target: number;
  /** stiffness: higher snaps faster */
  k: number;
  /** damping: lower wobbles more */
  c: number;
};

export function spring(value = 0, stiffness = 320, damping = 22): Spring {
  return { x: value, v: 0, target: value, k: stiffness, c: damping };
}

/** Point a spring at a new target, optionally changing how it gets there. */
export function aim(s: Spring, target: number, stiffness = s.k, damping = s.c) {
  s.target = target;
  s.k = stiffness;
  s.c = damping;
}

/** Advance one frame. Two semi-implicit Euler substeps keep stiff springs stable at 30–144 fps. */
export function step(s: Spring, dt: number) {
  const h = dt / 2;
  for (let i = 0; i < 2; i++) {
    s.v += (-s.k * (s.x - s.target) - s.c * s.v) * h;
    s.x += s.v * h;
  }
}

export function atRest(...springs: Spring[]) {
  return atRestWithin(1e-3, ...springs);
}

/** Rest check with a custom tolerance, e.g. 0.05 for springs measured in pixels. */
export function atRestWithin(tolerance: number, ...springs: Spring[]) {
  return springs.every((s) => Math.abs(s.x - s.target) < tolerance && Math.abs(s.v) < tolerance * 10);
}

/** Jump straight to the target (used for reduced motion and when an element leaves the screen). */
export function snap(...springs: Spring[]) {
  for (const s of springs) {
    s.x = s.target;
    s.v = 0;
  }
}

// One shared requestAnimationFrame loop for every running animation. It stops itself when nothing is moving.
type Frame = (dt: number) => boolean; // return false when finished
const frames = new Set<Frame>();
let rafId = 0;
let lastTime = 0;

function loop(now: number) {
  const dt = Math.min((now - lastTime) / 1000, 1 / 30); // a slow or backgrounded frame never explodes a spring
  lastTime = now;
  for (const frame of frames) {
    if (!frame(dt)) frames.delete(frame);
  }
  rafId = frames.size ? requestAnimationFrame(loop) : 0;
}

/** Run `frame` every animation frame until it returns false. Adding the same function twice is a no-op. */
export function animate(frame: Frame) {
  frames.add(frame);
  if (!rafId) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
}
