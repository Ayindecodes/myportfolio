// Hero physics (tasks 65–71). One frame loop on the shared spring engine moves the letters, the props and the
// scroll wobble; GSAP scrubs the doors. The loop sleeps while the hero is off screen, and in calm mode nothing
// moves at all (the padlock still opens and closes, just without the motion).
//
// Distances are in "units": 1 unit = 1px when the name is 200px tall, so phones get the same feel, smaller.

import { buzz, playSound } from "@/lib/motion/feedback";
import { loadGsap } from "@/lib/motion/gsap";
import { isCalm, onCalmChange } from "@/lib/motion/preferences";
import { aim, animate, atRestWithin, snap, spring, step, type Spring } from "@/lib/motion/springs";

type Letter = {
  el: HTMLElement;
  pitch: number;
  phase: number;
  /** 0 = resting, 1 = squashed, up to 1.55 while held */
  press: Spring;
  /** hover lift, 0–1 */
  lift: Spring;
  /** sideways shove from a pressed neighbour, units */
  push: Spring;
  /** height after being let go, units (negative is up) */
  fly: Spring;
  /** degrees toward the cursor */
  lean: Spring;
  /** where it was pressed: 0 = left edge, 1 = right edge */
  originX: number;
};

type Prop = { el: HTMLElement; kind: "lock" | "card"; phase: number; fly: Spring; spin: Spring; lean: Spring };

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
const fixed = (n: number) => n.toFixed(3);

// Idle breathing fades in once the entrance (CSS, from first paint) has settled.
const IDLE_FROM_MS = 1400;
const IDLE_RAMP_MS = 1200;

export function installHero(root: HTMLElement) {
  const section = root.closest("section") ?? root;
  const name = root.querySelector<HTMLElement>(".hero-name")!;
  const jellyEl = root.querySelector<HTMLElement>(".hero-jelly")!;
  const shackle = root.querySelector<HTMLElement>("[data-shackle]");

  const letters: Letter[] = [...root.querySelectorAll<HTMLElement>("[data-letter]")].map((el, i) => ({
    el,
    pitch: Number(el.dataset.pitch) || 1,
    phase: i * 1.7,
    press: spring(0, 700, 32),
    lift: spring(0, 300, 18),
    push: spring(0, 380, 20),
    fly: spring(0, 170, 9),
    lean: spring(0, 120, 14),
    originX: 0.5,
  }));

  const props: Prop[] = [...root.querySelectorAll<HTMLElement>("[data-prop]")].map((el, i) => ({
    el,
    kind: el.dataset.prop === "lock" ? "lock" : "card",
    phase: 0.9 + i * 2.3,
    fly: spring(0, 180, 9),
    spin: spring(0, 140, 7),
    lean: spring(0, 90, 12),
  }));

  const jelly = spring(0, 170, 11);
  const lockOpen = spring(0, 260, 12);
  const lockSwing = spring(0, 150, 9);
  let isLockOpen = false;

  const springs = [
    ...letters.flatMap((l) => [l.press, l.lift, l.push, l.fly, l.lean]),
    ...props.flatMap((p) => [p.fly, p.spin, p.lean]),
    jelly,
    lockOpen,
    lockSwing,
  ];

  let unit = 1;
  let visible = true;
  let disposed = false;
  let time = 0;
  let pointer: { x: number; y: number } | null = null;
  let leanDirty = false;

  // ---- drawing ------------------------------------------------------------------------------------------

  function writeShackle() {
    if (!shackle) return;
    shackle.style.transform =
      lockOpen.x || lockSwing.x ? `translate(0, ${fixed(-11 * lockOpen.x)}%) rotate(${fixed(-30 * lockSwing.x)}deg)` : "";
  }

  function updateLean() {
    leanDirty = false;
    const targets = [...letters.map((l) => ({ el: l.el, s: l.lean, max: 3 })), ...props.map((p) => ({ el: p.el, s: p.lean, max: 4 }))];
    for (const { el, s, max } of targets) {
      if (!pointer) {
        aim(s, 0);
        continue;
      }
      const box = el.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const distance = Math.hypot(dx, pointer.y - (box.top + box.height / 2));
      aim(s, clamp(dx / 260, -1, 1) * max * Math.max(0, 1 - distance / 640));
    }
  }

  const frame = (dt: number) => {
    if (disposed || isCalm()) return false;
    time += dt;
    if (leanDirty) updateLean();
    jelly.target *= Math.exp(-dt * 9); // a scroll kick fades, so the wobble always settles back
    for (const s of springs) step(s, dt);

    const idle = clamp((performance.now() - IDLE_FROM_MS) / IDLE_RAMP_MS, 0, 1);

    for (const l of letters) {
      const p = l.press.x;
      const breath = 1 + Math.sin(time * 1.7 + l.phase * 0.7) * 0.006 * idle;
      const sx = (1 + 0.13 * p) * breath;
      const sy = (1 - 0.17 * p) * breath;
      const rotate = Math.sin(time * 0.9 + l.phase * 1.3) * 0.7 * idle + l.lean.x + (l.originX - 0.5) * 18 * p;
      const x = l.push.x * unit;
      const y = (Math.sin(time * 1.3 + l.phase) * 2.2 * idle + l.fly.x - 6 * l.lift.x) * unit;
      l.el.style.transform = `translate(${fixed(x)}px, ${fixed(y)}px) rotate(${fixed(rotate)}deg) scale(${fixed(sx)}, ${fixed(sy)})`;
    }

    for (const p of props) {
      const y = (Math.sin(time * 1.1 + p.phase) * 3 * idle + p.fly.x) * unit;
      const rotate = Math.sin(time * 0.8 + p.phase) * 1.6 * idle + p.lean.x + p.spin.x;
      p.el.style.transform = `translate(0, ${fixed(y)}px) rotate(${fixed(rotate)}deg)`;
    }

    const j = jelly.x;
    jellyEl.style.transform = j ? `translate(0, ${fixed(j * 7 * unit)}px) scale(${fixed(1 - 0.03 * j)}, ${fixed(1 + 0.05 * j)})` : "";
    writeShackle();

    const moving = !atRestWithin(0.01, ...springs);
    if (!moving) snap(...springs);
    return visible || moving;
  };

  const wake = () => {
    if (!disposed && !isCalm()) animate(frame);
  };

  function clearMotion() {
    snap(...springs);
    for (const el of [...letters.map((l) => l.el), ...props.map((p) => p.el), jellyEl]) el.style.transform = "";
    writeShackle(); // the padlock keeps its open or closed state, just without moving
  }

  // ---- letters: press, hold, release ----------------------------------------------------------------------

  let pressed: Letter | null = null;
  let pressedAt = 0;
  let holdTimer = 0;

  const letterFrom = (event: Event) => {
    const el = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-letter]") : null;
    return el ? (letters.find((l) => l.el === el) ?? null) : null;
  };

  function neighbours(letter: Letter) {
    const i = letters.indexOf(letter);
    return [letters[i - 1], letters[i + 1]] as const;
  }

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0 || isCalm()) return;
    const letter = letterFrom(event);
    if (!letter) return;
    release(false);
    const box = letter.el.getBoundingClientRect();
    letter.originX = clamp((event.clientX - box.left) / (box.width || 1), 0, 1);
    aim(letter.press, 1, 700, 32);
    holdTimer = window.setTimeout(() => aim(letter.press, 1.55, 45, 12), 160); // holding keeps inflating, slowly
    const [left, right] = neighbours(letter);
    if (left) aim(left.push, -11, 380, 20);
    if (right) aim(right.push, 11, 380, 20);
    letter.el.setPointerCapture?.(event.pointerId);
    pressed = letter;
    pressedAt = performance.now();
    wake();
  }

  /** Let go: with a pop it flies up and wobbles back down; without (a cancelled touch), it just relaxes. */
  function release(pop: boolean) {
    if (!pressed) return;
    const letter = pressed;
    pressed = null;
    window.clearTimeout(holdTimer);
    const held = performance.now() - pressedAt;
    const strength = clamp(letter.press.x / 1.55, 0.3, 1);
    aim(letter.press, 0, 520, 12);
    for (const n of neighbours(letter)) if (n) aim(n.push, 0, 260, 12);
    if (pop) {
      letter.fly.v -= 260 + 260 * Math.min(held / 700, 1);
      playSound("pop", { pitch: letter.pitch, volume: 0.25 + 0.3 * strength });
      if (held > 350) buzz(8);
    }
    wake();
  }

  function onHover(event: PointerEvent, entering: boolean) {
    if (event.pointerType !== "mouse" || isCalm()) return;
    const letter = letterFrom(event);
    if (!letter || letter.el.contains(event.relatedTarget as Node | null)) return;
    aim(letter.lift, entering ? 1 : 0);
    wake();
  }

  // ---- props: bounce, and the padlock ---------------------------------------------------------------------

  function burstSparks(lock: HTMLElement) {
    const directions = [
      [-230, -170],
      [10, -290],
      [240, -190],
    ];
    lock.querySelectorAll<HTMLElement>("[data-spark]").forEach((spark, i) => {
      const [dx, dy] = directions[i % directions.length];
      spark.animate(
        [
          { opacity: 0, transform: "translate(0, 0) scale(0)" },
          { opacity: 1, transform: `translate(${dx * 0.6}%, ${dy * 0.6}%) scale(1) rotate(60deg)`, offset: 0.45 },
          { opacity: 0, transform: `translate(${dx}%, ${dy}%) scale(0.5) rotate(140deg)` },
        ],
        { duration: 760, delay: i * 45, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    });
  }

  function toggleLock(lock: HTMLElement) {
    isLockOpen = !isLockOpen;
    if (isLockOpen) {
      aim(lockOpen, 1, 260, 12);
      aim(lockSwing, 1, 150, 9);
      playSound("unlock", { volume: 0.5 });
      buzz(8);
      if (!isCalm()) burstSparks(lock);
    } else {
      aim(lockOpen, 0, 420, 18);
      aim(lockSwing, 0, 380, 16);
      playSound("popLow", { pitch: 1.25, volume: 0.35 });
    }
    if (isCalm()) {
      snap(lockOpen, lockSwing);
      writeShackle();
    }
  }

  function onClick(event: MouseEvent) {
    const el = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-prop]") : null;
    const prop = el ? props.find((p) => p.el === el) : null;
    if (!prop) return;
    if (prop.kind === "lock") toggleLock(prop.el);
    else playSound("popLow", { pitch: 0.95 + Math.random() * 0.1, volume: 0.4 });
    if (isCalm()) return;
    prop.fly.v -= prop.kind === "lock" ? 300 : 420;
    prop.spin.v += (Math.random() < 0.5 ? -1 : 1) * (160 + Math.random() * 120);
    wake();
  }

  // ---- doodles redraw on hover ----------------------------------------------------------------------------

  function onDoodleHover(event: PointerEvent) {
    if (event.pointerType !== "mouse" || isCalm()) return;
    const doodle = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-doodle]") : null;
    if (!doodle || doodle.contains(event.relatedTarget as Node | null) || doodle.getAnimations().length) return;
    const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
    doodle.querySelectorAll("path").forEach((path) => {
      path.animate([{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: 700, easing: ease });
    });
    if (doodle.dataset.doodle === "spin") {
      doodle.animate([{ rotate: "0deg", scale: 1 }, { rotate: "180deg", scale: 1.25, offset: 0.6 }, { rotate: "180deg", scale: 1 }], {
        duration: 900,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      });
    }
  }

  // ---- scroll wobble, cursor lean, visibility -------------------------------------------------------------

  let lastScrollY = window.scrollY;
  let lastScrollAt = performance.now();
  function onScroll() {
    const now = performance.now();
    // px per ms; the gap is capped so the first jump after a pause (a mouse-wheel notch) still counts as fast
    const velocity = (window.scrollY - lastScrollY) / clamp(now - lastScrollAt, 8, 50);
    lastScrollY = window.scrollY;
    lastScrollAt = now;
    leanDirty = true;
    if (!visible || isCalm()) return;
    const kick = clamp(velocity / 3, -1, 1);
    if (Math.abs(kick) > Math.abs(jelly.target)) jelly.target = kick;
    wake();
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointer = { x: event.clientX, y: event.clientY };
    leanDirty = true;
    if (visible) wake();
  }

  function onPointerLeaveWindow(event: PointerEvent) {
    if (event.relatedTarget) return;
    pointer = null;
    leanDirty = true;
    wake();
  }

  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  });
  visibility.observe(section);

  const sizes = new ResizeObserver(() => {
    unit = Math.max(name.offsetHeight / 200, 0.4);
    leanDirty = true;
  });
  sizes.observe(name);

  // ---- doors: the two halves swing apart as you scroll past (GSAP ScrollTrigger) ---------------------------

  let doors: (() => void) | null = null;
  async function startDoors() {
    if (doors || isCalm()) return;
    const { gsap } = await loadGsap();
    if (disposed || doors || isCalm()) return;
    const [leftDoor, rightDoor] = root.querySelectorAll<HTMLElement>("[data-door]");
    const nameWrap = root.querySelector<HTMLElement>("[data-hero-name]");
    const line = root.querySelector<HTMLElement>("[data-hero-line]");
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
    });
    timeline
      .to(leftDoor, { xPercent: -12, rotation: -6, ease: "none" }, 0)
      .to(rightDoor, { xPercent: 12, rotation: 6, ease: "none" }, 0)
      .to(nameWrap, { y: () => window.innerHeight * 0.14, scale: 0.9, ease: "none" }, 0)
      .to(line, { y: () => window.innerHeight * 0.06, opacity: 0, ease: "power1.in" }, 0);
    doors = () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([leftDoor, rightDoor, nameWrap, line], { clearProps: "transform,opacity" });
    };
  }

  function stopDoors() {
    doors?.();
    doors = null;
  }

  // GSAP (~45 KB) is only fetched once the visitor shows they're about to scroll, keeping it out of the first load.
  // The scrub then catches up smoothly from wherever the page already is.
  const scrollIntents = ["scroll", "wheel", "touchstart", "keydown"] as const;
  function onScrollIntent() {
    scrollIntents.forEach((type) => window.removeEventListener(type, onScrollIntent));
    void startDoors();
  }

  // ---- wiring -----------------------------------------------------------------------------------------------

  const stopCalm = onCalmChange(() => {
    if (isCalm()) {
      clearMotion();
      stopDoors();
    } else {
      wake();
      void startDoors();
    }
  });

  const onUp = () => release(true);
  const onCancel = () => release(false);
  const onOver = (event: PointerEvent) => {
    onHover(event, true);
    onDoodleHover(event);
  };
  const onOut = (event: PointerEvent) => onHover(event, false);

  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointerover", onOver);
  root.addEventListener("pointerout", onOut);
  root.addEventListener("click", onClick);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onCancel);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  if (finePointer()) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
  }

  wake();
  if (window.scrollY > 0) void startDoors();
  else scrollIntents.forEach((type) => window.addEventListener(type, onScrollIntent, { passive: true }));

  return () => {
    disposed = true;
    window.clearTimeout(holdTimer);
    stopCalm();
    stopDoors();
    visibility.disconnect();
    sizes.disconnect();
    root.removeEventListener("pointerdown", onPointerDown);
    root.removeEventListener("pointerover", onOver);
    root.removeEventListener("pointerout", onOut);
    root.removeEventListener("click", onClick);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onPointerMove);
    scrollIntents.forEach((type) => window.removeEventListener(type, onScrollIntent));
    document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
    clearMotion();
  };
}
