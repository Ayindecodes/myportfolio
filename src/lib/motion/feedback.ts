// Sound and haptics (tasks 52–53). Sounds are short pops made by design/generate-sounds.py.
// Audio can only start after a user gesture, so buffers load on the first tap or key press.

import { isSoundOn } from "./preferences";

const files = {
  pop: "/sounds/pop.wav",
  popLow: "/sounds/pop-low.wav",
  unlock: "/sounds/unlock.wav",
} as const;

export type SoundName = keyof typeof files;

let context: AudioContext | null = null;
const buffers = new Map<SoundName, AudioBuffer>();

/** Creates the audio context and fetches the sounds. Safe to call repeatedly; only the first call works. */
export function primeAudio() {
  if (context || typeof AudioContext === "undefined") return;
  context = new AudioContext();
  for (const [name, url] of Object.entries(files) as [SoundName, string][]) {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((data) => context!.decodeAudioData(data))
      .then((buffer) => buffers.set(name, buffer))
      .catch(() => {}); // a missing sound should never break an interaction
  }
}

/** The shared audio context (created on first use; call from a user gesture so browsers let it start). */
export function getAudioContext() {
  primeAudio();
  if (context?.state === "suspended") void context.resume();
  return context;
}

/** Plays a sound with a little random detune so repeated taps don't sound identical. */
export function playSound(name: SoundName, { pitch = 1, volume = 0.45 } = {}) {
  if (!isSoundOn() || !context) return;
  const buffer = buffers.get(name);
  if (!buffer) return;
  if (context.state === "suspended") void context.resume();
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  source.playbackRate.value = pitch * (0.97 + Math.random() * 0.06);
  gain.gain.value = volume;
  source.connect(gain).connect(context.destination);
  source.start();
}

/** A short tick on devices that support vibration (Android browsers; iOS ignores it). */
export function buzz(ms = 8) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
}
