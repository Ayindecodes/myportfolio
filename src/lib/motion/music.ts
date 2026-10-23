// Background music through Spotify's official player (its iFrame API). Off until the visitor taps Music: only then
// does Spotify's script load and its player appear in the music dock (it must stay visible while it plays). The
// song follows the section in view, switching once scrolling settles. Visitors logged in to Spotify in their
// browser hear full songs; everyone else gets Spotify's 30-second previews.

import { useSyncExternalStore } from "react";
import { songs, type Song } from "@/content/music";

type Controller = {
  loadUri(uri: string, preferVideo?: boolean, startAt?: number): void;
  play(): void;
  pause(): void;
  addListener(event: "ready" | "playback_update" | "error", callback: (event: { data?: { isPaused?: boolean } }) => void): void;
};
type IframeApi = {
  createController(element: HTMLElement, options: { uri: string; width: string; height: number }, callback: (controller: Controller) => void): void;
};
type SpotifyWindow = Window & { onSpotifyIframeApiReady?: (api: IframeApi) => void };

const SETTLE_MS = 900; // a section has to stay in view this long before the song changes
const LINE = 0.4; // a section counts as "in view" once its top passes 40% of the screen

type State = { on: boolean; current: Song | null; playing: boolean; failed: boolean };
let state: State = { on: false, current: null, playing: false, failed: false };
const listeners = new Set<() => void>();
const offState: State = { on: false, current: null, playing: false, failed: false };

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Music state for React: on or off, the song for the section in view, and whether Spotify reports it playing. */
export function useMusic() {
  return useSyncExternalStore(subscribe, () => state, () => offState);
}

let apiPromise: Promise<IframeApi> | null = null;
function loadSpotify() {
  apiPromise ??= new Promise<IframeApi>((resolve, reject) => {
    (window as SpotifyWindow).onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Spotify could not be reached"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

let host: HTMLElement | null = null;
let controller: Controller | null = null;

/** The dock registers the element the Spotify player goes in. */
export function setPlayerHost(element: HTMLElement | null) {
  host = element;
}

/** The song whose section is in view: the last one whose top has passed the line. */
function songInView() {
  const line = window.innerHeight * LINE;
  let found = songs[0];
  for (const song of songs) {
    const section = document.getElementById(song.section);
    if (section && section.getBoundingClientRect().top <= line) found = song;
  }
  return found;
}

/** Spotify's iframe has no title; give it one that names the song, for screen readers. */
function titleFrame(song: Song) {
  host?.querySelector("iframe")?.setAttribute("title", `Spotify player: ${song.title} by ${song.artist}`);
}

function play(song: Song) {
  set({ current: song });
  titleFrame(song);
  if (!controller) return;
  controller.loadUri(song.uri); // commands queue inside the controller until the new song has loaded
  controller.play();
}

let settleTimer = 0;
const onScroll = () => {
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(() => {
    const song = songInView();
    if (state.on && song.uri !== state.current?.uri) play(song);
  }, SETTLE_MS);
};

/** Turn the music on. Call from a click or key press: browsers only let audio start after one. */
export async function turnMusicOn() {
  if (state.on) return;
  const song = songInView();
  set({ on: true, current: song, failed: false });
  window.addEventListener("scroll", onScroll, { passive: true });
  if (controller) return play(song);

  try {
    const api = await loadSpotify();
    if (!state.on || !host || controller) return;
    const target = document.createElement("div");
    host.appendChild(target);
    api.createController(target, { uri: song.uri, width: "100%", height: 80 }, (created) => {
      controller = created;
      titleFrame(state.current ?? song);
      created.addListener("ready", () => {
        if (state.on) created.play();
      });
      created.addListener("playback_update", (event) => set({ playing: event.data?.isPaused === false }));
    });
  } catch {
    set({ failed: true });
  }
}

export function turnMusicOff() {
  if (!state.on) return;
  window.clearTimeout(settleTimer);
  window.removeEventListener("scroll", onScroll);
  controller?.pause();
  set({ on: false, playing: false });
}
