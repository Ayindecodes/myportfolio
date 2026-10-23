// Site-wide squish (task 48): every element with data-squish behaves like soft vinyl.
// Hover grows it slightly, pressing squashes it toward the press point, holding keeps inflating,
// and letting go wobbles it back. data-squish="0.5" scales the effect; data-squish-sound="pop" adds a sound.

import { buzz, playSound, type SoundName } from "./feedback";
import { isCalm } from "./preferences";
import { animate, atRest, aim, snap, spring, step, type Spring } from "./springs";

type State = {
  el: HTMLElement;
  hover: Spring;
  press: Spring;
  /** 0 = pressed at the left edge, 1 = right edge */
  originX: number;
  amount: number;
  holdTimer: number;
  frame: (dt: number) => boolean;
};

const states = new WeakMap<HTMLElement, State>();

function stateFor(el: HTMLElement): State {
  let state = states.get(el);
  if (!state) {
    const s: State = {
      el,
      hover: spring(0, 300, 20),
      press: spring(0, 800, 34),
      originX: 0.5,
      amount: Number.parseFloat(el.dataset.squish ?? "") || 1,
      holdTimer: 0,
      frame: () => false,
    };
    s.frame = (dt) => {
      step(s.hover, dt);
      step(s.press, dt);
      const moving = !atRest(s.hover, s.press);
      if (!moving) snap(s.hover, s.press);
      const p = s.press.x * s.amount;
      const h = s.hover.x;
      if (!moving && h === 0 && p === 0) {
        s.el.style.transform = "";
        return false;
      }
      const sx = 1 + 0.02 * h + 0.06 * p;
      const sy = 1 + 0.02 * h - 0.09 * p;
      const tilt = (s.originX - 0.5) * 6 * p;
      s.el.style.transform = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)}) rotate(${tilt.toFixed(3)}deg)`;
      return moving;
    };
    states.set(el, s);
    state = s;
  }
  return state;
}

const target = (event: Event) =>
  event.target instanceof Element ? event.target.closest<HTMLElement>("[data-squish]") : null;

let pressed: State | null = null;

function release() {
  if (!pressed) return;
  const s = pressed;
  pressed = null;
  window.clearTimeout(s.holdTimer);
  if (s.press.x > 1.08) buzz();
  const sound = s.el.dataset.squishSound as SoundName | undefined;
  if (sound) playSound(sound, { pitch: 1 + Math.random() * 0.1, volume: 0.3 + 0.2 * Math.min(s.press.x, 1.5) });
  aim(s.press, 0, 480, 12); // underdamped: the wobble back is the point
  animate(s.frame);
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || isCalm()) return;
  const el = target(event);
  if (!el) return;
  release();
  const s = stateFor(el);
  const box = el.getBoundingClientRect();
  s.originX = Math.min(Math.max((event.clientX - box.left) / (box.width || 1), 0), 1);
  aim(s.press, 1, 800, 34);
  // keep holding and it keeps inflating, slowly
  s.holdTimer = window.setTimeout(() => aim(s.press, 1.5, 70, 14), 180);
  pressed = s;
  animate(s.frame);
}

function onHover(event: PointerEvent, entering: boolean) {
  if (event.pointerType !== "mouse" || isCalm()) return;
  const el = target(event);
  if (!el || el.contains(event.relatedTarget as Node | null)) return;
  const s = stateFor(el);
  aim(s.hover, entering ? 1 : 0, 300, 20);
  animate(s.frame);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.repeat || (event.key !== "Enter" && event.key !== " ") || isCalm()) return;
  const el = target(event);
  if (!el) return;
  const s = stateFor(el);
  s.originX = 0.5;
  s.press.v += 14; // a kick, so keyboard presses wobble too
  aim(s.press, 0, 480, 12);
  animate(s.frame);
}

/** Clears every transform immediately, e.g. when calm mode switches on. */
export function resetSquish() {
  document.querySelectorAll<HTMLElement>("[data-squish]").forEach((el) => {
    const s = states.get(el);
    if (s) snap(s.hover, s.press);
    el.style.transform = "";
  });
}

export function installSquish() {
  const down = (e: PointerEvent) => onPointerDown(e);
  const over = (e: PointerEvent) => onHover(e, true);
  const out = (e: PointerEvent) => onHover(e, false);
  document.addEventListener("pointerdown", down);
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
  document.addEventListener("pointerover", over);
  document.addEventListener("pointerout", out);
  document.addEventListener("keydown", onKeyDown);
  return () => {
    document.removeEventListener("pointerdown", down);
    document.removeEventListener("pointerup", release);
    document.removeEventListener("pointercancel", release);
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerout", out);
    document.removeEventListener("keydown", onKeyDown);
  };
}
