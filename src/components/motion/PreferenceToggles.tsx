"use client";

// Visible sound and motion switches (tasks 52 and 54). The motion switch also gives every visitor a way to pause
// moving content such as the rotating role and the tool marquee, not only people with the OS setting on.
// Each is a toggle button with a fixed name ("Sound", "Motion"); aria-pressed and the icon carry the state.
// `compact` shows the icon only (nav bar); the full version adds the word (menu, styleguide).

import { setCalm, setSoundOn, useCalm, useSoundOn, useSystemReducesMotion } from "@/lib/motion/preferences";

const base = "inline-flex items-center justify-center gap-2 rounded-full vinyl-cream text-body disabled:cursor-not-allowed disabled:opacity-60";
const full = `${base} min-h-10 px-4 font-mono text-[11px] tracking-[0.1em] uppercase`;
const compactClass = `${base} size-10`;

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
      {on ? <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
    </svg>
  );
}

function MotionIcon({ calm }: { calm: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {calm ? <path d="M9 6v12M15 6v12" /> : <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />}
    </svg>
  );
}

export function SoundToggle({ compact = false }: { compact?: boolean }) {
  const on = useSoundOn();
  return (
    <button
      type="button"
      className={compact ? compactClass : full}
      aria-pressed={on}
      aria-label={compact ? "Sound" : undefined}
      title={`Sound is ${on ? "on" : "off"}`}
      onClick={() => setSoundOn(!on)}
      data-squish="0.6"
    >
      <SpeakerIcon on={on} />
      {!compact && "Sound"}
    </button>
  );
}

export function MotionToggle({ compact = false }: { compact?: boolean }) {
  const calm = useCalm();
  const forced = useSystemReducesMotion();
  return (
    <button
      type="button"
      className={compact ? compactClass : full}
      aria-pressed={!calm}
      aria-label={compact ? "Motion" : undefined}
      disabled={forced}
      title={forced ? "Your device asks for reduced motion" : `Motion is ${calm ? "off" : "on"}`}
      onClick={() => setCalm(!calm)}
      data-squish="0.6"
    >
      <MotionIcon calm={calm} />
      {!compact && "Motion"}
    </button>
  );
}
