// Background music through Spotify's official player (its iFrame API). Off until the visitor taps Music: only then
// does Spotify's script load and its player appear in the music dock (it must stay visible while it plays).
// Songs are random: each time scrolling settles in a new section a new one plays, Nigerian and international in
// turn, with no repeats until every song in that group has played; when a song ends, the next one starts.
// Visitors logged in to Spotify in their browser hear full songs; everyone else gets Spotify's 30-second previews.

import { useSyncExternalStore } from "react";
import { songs, type Song } from "@/content/music";

type PlaybackUpdate = { data?: { isPaused?: boolean; position?: number; duration?: number; playingURI?: string } };
type Controller = {
  loadUri(uri: string, preferVideo?: boolean, startAt?: number): void;
  play(): void;
  pause(): void;
  addListener(event: "ready" | "playback_update" | "error", callback: (event: PlaybackUpdate) => void): void;
};
type IframeApi = {
  createController(element: HTMLElement, options: { uri: string; width: string; height: number }, callback: (controller: Controller) => void): void;
};
type SpotifyWindow = Window & { onSpotifyIframeApiReady?: (api: IframeApi) => void };

const SECTIONS = ["top", "work", "about", "journey", "contact"];
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

/** Music state for React: on or off, the song playing, and whether Spotify reports it playing. */
export function useMusic() {
  return useSyncExternalStore(subscribe, () => state, () => offState);
}

// ---- random order -----------------------------------------------------------------------------------------

/** A shuffled bag per group: every song plays once before any repeats, and never twice in a row. */
const bags = new Map<Song["origin"], Song[]>();
function draw(origin: Song["origin"]) {
  let bag = bags.get(origin);
  if (!bag?.length) {
    bag = songs.filter((song) => song.origin === origin);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (bag.length > 1 && bag[bag.length - 1].uri === state.current?.uri) bag.unshift(bag.pop()!);
    bags.set(origin, bag);
  }
  return bag.pop()!;
}

/** Alternate Nigerian and international; the very first pick is either. */
function nextSong() {
  const origin: Song["origin"] =
    state.current ? (state.current.origin === "Nigerian" ? "International" : "Nigerian") : Math.random() < 0.5 ? "Nigerian" : "International";
  return draw(origin);
}

// ---- Spotify ----------------------------------------------------------------------------------------------

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

/** Spotify's iframe has no title; give it one that names the song, for screen readers. */
function titleFrame(song: Song) {
  host?.querySelector("iframe")?.setAttribute("title", `Spotify player: ${song.title} by ${song.artist}`);
}

let advanced = false; // the current song has already handed over to the next one

function play(song: Song) {
  set({ current: song });
  titleFrame(song);
  advanced = false;
  if (!controller) return;
  controller.loadUri(song.uri); // commands queue inside the controller until the new song has loaded
  controller.play();
}

/**
 * When a song (or its 30-second preview) runs out, carry on with the next one. Spotify signals the end by the
 * position reaching the duration (it doesn't report a pause), then goes quiet. A pause mid-song stays a pause.
 */
function onPlayback(event: PlaybackUpdate) {
  const { isPaused, position = 0, duration = 0, playingURI } = event.data ?? {};
  if (playingURI && playingURI !== state.current?.uri) return; // a late update from the previous song
  const ended = duration > 0 && position >= duration - 250;
  set({ playing: isPaused === false && !ended });
  if (ended && state.on && !advanced) {
    advanced = true;
    play(nextSong());
  }
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
    play(nextSong());
  }, SETTLE_MS);
};

/** Turn the music on. Call from a click or key press: browsers only let audio start after one. */
export async function turnMusicOn() {
  if (state.on) return;
  section = sectionInView();
  const song = nextSong();
  set({ on: true, failed: false });
  window.addEventListener("scroll", onScroll, { passive: true });
  if (controller) return play(song);

  set({ current: song });
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
      created.addListener("playback_update", onPlayback);
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
