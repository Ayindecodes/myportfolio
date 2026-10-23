// Background beats (opt-in). Off until the visitor turns them on, and nothing downloads before then. Once on, beats
// are random: each time scrolling settles in a new section, the current beat crossfades into a new one (chill and
// Afro in turn, no repeats until a group has played through), and near the end of a beat the next one fades in.
// Each beat plays through its own Web Audio gain, because iOS ignores the volume of media elements. Music pauses
// while the tab is hidden.

import { useSyncExternalStore } from "react";
import { tracks, type Track } from "@/content/music";
import { getAudioContext } from "./feedback";

const LEVEL = 0.4; // beats sit under the interface pops
const CROSSFADE = 2; // seconds
const SETTLE_MS = 900; // a section has to stay in view this long before the beat changes
const LINE = 0.4; // a section counts as "in view" once its top passes 40% of the screen
const SECTIONS = ["top", "work", "about", "journey", "contact"];

type State = { on: boolean; current: Track | null; playing: boolean };
let state: State = { on: false, current: null, playing: false };
const listeners = new Set<() => void>();
const offState: State = { on: false, current: null, playing: false };

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Music state for React: on or off, and the beat that's playing. */
export function useMusic() {
  return useSyncExternalStore(subscribe, () => state, () => offState);
}

// ---- random order -----------------------------------------------------------------------------------------

const bags = new Map<Track["group"], Track[]>();
function draw(group: Track["group"]) {
  let bag = bags.get(group);
  if (!bag?.length) {
    bag = tracks.filter((track) => track.group === group);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (bag.length > 1 && bag[bag.length - 1].id === state.current?.id) bag.unshift(bag.pop()!);
    bags.set(group, bag);
  }
  return bag.pop()!;
}

/** Chill and Afro in turn; the first pick is either. */
function nextTrack() {
  const group: Track["group"] = state.current ? (state.current.group === "Chill" ? "Afro" : "Chill") : Math.random() < 0.5 ? "Chill" : "Afro";
  return draw(group);
}

// ---- playback ---------------------------------------------------------------------------------------------

type Voice = { element: HTMLAudioElement; gain: GainNode; stopTimer: number };
const voices = new Map<string, Voice>();

function voiceFor(track: Track, context: AudioContext) {
  let voice = voices.get(track.id);
  if (!voice) {
    const element = new Audio(track.src);
    element.preload = "auto";
    const gain = context.createGain();
    gain.gain.value = 0;
    context.createMediaElementSource(element).connect(gain).connect(context.destination);
    const created: Voice = { element, gain, stopTimer: 0 };
    // Near the end of the beat that's playing, fade into the next one so the music never stops.
    element.addEventListener("timeupdate", () => {
      const left = element.duration - element.currentTime;
      if (state.on && state.current?.id === track.id && left < CROSSFADE + 0.25) play(nextTrack());
    });
    voice = created;
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
  set({ current: track });
  for (const [id, voice] of voices) if (id !== track.id) fadeOutAndPause(voice, CROSSFADE);
  const voice = voiceFor(track, context);
  window.clearTimeout(voice.stopTimer);
  // a beat drawn again starts over if it was close to its end
  if (voice.element.duration && voice.element.duration - voice.element.currentTime < 20) voice.element.currentTime = 0;
  voice.element
    .play()
    .then(() => set({ playing: true }))
    .catch(() => turnMusicOff()); // e.g. the browser refused to start audio
  fade(voice, LEVEL, CROSSFADE);
}

// ---- following the scroll ---------------------------------------------------------------------------------

function sectionInView() {
  const line = window.innerHeight * LINE;
  let found = SECTIONS[0];
  for (const id of SECTIONS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= line) found = id;
  }
  return found;
}

let section = "";
let settleTimer = 0;
const onScroll = () => {
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(() => {
    const now = sectionInView();
    if (!state.on || now === section) return;
    section = now;
    play(nextTrack());
  }, SETTLE_MS);
};

const onVisibility = () => {
  const voice = state.current && voices.get(state.current.id);
  if (!voice) return;
  if (document.hidden) voice.element.pause();
  else void voice.element.play().catch(() => {});
};

/** Turn the beats on. Call from a click or key press: browsers only start audio after one. */
export function turnMusicOn() {
  if (state.on || !getAudioContext()) return;
  set({ on: true, current: null });
  section = sectionInView();
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  play(nextTrack());
}

export function turnMusicOff() {
  if (!state.on) return;
  window.clearTimeout(settleTimer);
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("visibilitychange", onVisibility);
  for (const voice of voices.values()) fadeOutAndPause(voice, 0.5);
  set({ on: false, playing: false });
}
