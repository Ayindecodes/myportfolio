// Background music (opt-in). Off until the visitor turns it on, and nothing downloads before then. Once on, the
// track follows the section in view: when scrolling settles in a new section, the old track fades out and the new
// one fades in (each picks up where it left off). Every track loops through its own Web Audio gain, because iOS
// ignores the volume of media elements. The music pauses while the tab is hidden.

import { useSyncExternalStore } from "react";
import { tracks, type Track } from "@/content/music";
import { getAudioContext } from "./feedback";

const LEVEL = 0.35; // music sits under the interface pops
const CROSSFADE = 1.6; // seconds
const SETTLE_MS = 900; // a section has to stay in view this long before the track changes
const LINE = 0.4; // a section counts as "in view" once its top passes 40% of the screen

type State = { on: boolean; current: Track | null };
let state: State = { on: false, current: null };
const listeners = new Set<() => void>();

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const off: State = { on: false, current: null };

/** Music state for React: whether it's on and which track is playing. */
export function useMusic() {
  return useSyncExternalStore(subscribe, () => state, () => off);
}

type Voice = { element: HTMLAudioElement; gain: GainNode; stopTimer: number };
const voices = new Map<string, Voice>();

function voiceFor(track: Track, context: AudioContext) {
  let voice = voices.get(track.id);
  if (!voice) {
    const element = new Audio(track.src);
    element.loop = true;
    element.preload = "auto";
    const gain = context.createGain();
    gain.gain.value = 0;
    context.createMediaElementSource(element).connect(gain).connect(context.destination);
    voice = { element, gain, stopTimer: 0 };
    voices.set(track.id, voice);
  }
  return voice;
}

function fade(voice: Voice, to: number, seconds: number) {
  const context = getAudioContext();
  if (!context) return;
  const now = context.currentTime;
  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
  voice.gain.gain.linearRampToValueAtTime(to, now + seconds);
}

function fadeOutAndPause(voice: Voice, seconds: number) {
  fade(voice, 0, seconds);
  window.clearTimeout(voice.stopTimer);
  voice.stopTimer = window.setTimeout(() => voice.element.pause(), seconds * 1000 + 60);
}

function play(track: Track) {
  const context = getAudioContext();
  if (!context || state.current?.id === track.id) return;
  for (const [id, voice] of voices) if (id !== track.id) fadeOutAndPause(voice, CROSSFADE);
  const voice = voiceFor(track, context);
  window.clearTimeout(voice.stopTimer);
  voice.element.play().catch(() => turnMusicOff()); // e.g. the browser refused to start audio
  fade(voice, LEVEL, CROSSFADE);
  set({ current: track });
}

/** The track whose section is in view: the last one whose top has passed the line. */
function trackInView() {
  const line = window.innerHeight * LINE;
  let found = tracks[0];
  for (const track of tracks) {
    const section = document.getElementById(track.section);
    if (section && section.getBoundingClientRect().top <= line) found = track;
  }
  return found;
}

let settleTimer = 0;
const onScroll = () => {
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(() => play(trackInView()), SETTLE_MS);
};

const onVisibility = () => {
  const voice = state.current && voices.get(state.current.id);
  if (!voice) return;
  if (document.hidden) voice.element.pause();
  else void voice.element.play().catch(() => {});
};

/** Turn the music on. Call from a click or key press: browsers only start audio after one. */
export function turnMusicOn() {
  if (state.on || !getAudioContext()) return;
  set({ on: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  play(trackInView());
}

export function turnMusicOff() {
  if (!state.on) return;
  window.clearTimeout(settleTimer);
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("visibilitychange", onVisibility);
  for (const voice of voices.values()) fadeOutAndPause(voice, 0.5);
  set({ on: false, current: null });
}
