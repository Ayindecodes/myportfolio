// Motion and sound preferences (tasks 52, 54, 55).
// "Calm" = the system asks for reduced motion OR the visitor switched motion off. Every effect checks it.
// The system setting always wins: the toggle can add calm, never remove it.

import { useSyncExternalStore } from "react";

type Listener = () => void;

function createStore(read: () => boolean) {
  const listeners = new Set<Listener>();
  let value = false;
  let ready = false;
  return {
    get() {
      if (!ready && typeof window !== "undefined") {
        ready = true;
        value = read();
      }
      return value;
    },
    refresh() {
      value = read();
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

function storageGet(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode: the choice just won't persist
  }
}

const reducedQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");

export const systemReducesMotion = () => typeof window !== "undefined" && reducedQuery().matches;

const calmStore = createStore(() => systemReducesMotion() || storageGet("motion") === "calm");
const soundStore = createStore(() => storageGet("sound") !== "off");

export const isCalm = () => calmStore.get();
export const isSoundOn = () => soundStore.get();

export function setCalm(calm: boolean) {
  storageSet("motion", calm ? "calm" : "full");
  calmStore.refresh();
  document.documentElement.toggleAttribute("data-calm", isCalm());
}

export function setSoundOn(on: boolean) {
  storageSet("sound", on ? "on" : "off");
  soundStore.refresh();
}

export const onCalmChange = calmStore.subscribe;

/** Keeps the store and the <html data-calm> attribute in sync with the OS setting. Returns a cleanup. */
export function watchSystemMotion() {
  const query = reducedQuery();
  const update = () => {
    calmStore.refresh();
    document.documentElement.toggleAttribute("data-calm", isCalm());
  };
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

export function useCalm() {
  return useSyncExternalStore(calmStore.subscribe, calmStore.get, () => false);
}

export function useSoundOn() {
  return useSyncExternalStore(soundStore.subscribe, soundStore.get, () => true);
}

function subscribeSystemMotion(listener: Listener) {
  const query = reducedQuery();
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

/** True when the OS asks for reduced motion (false during server rendering). */
export function useSystemReducesMotion() {
  return useSyncExternalStore(subscribeSystemMotion, systemReducesMotion, () => false);
}
