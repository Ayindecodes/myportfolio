"use client";

// The music dock: a small vinyl switch fixed to the bottom-left of the home page, so music can be turned on from
// any screen size. While music plays it credits the current track (CC BY asks for title, artist and licence).

import { RecordIcon } from "@/components/motion/PreferenceToggles";
import { musicLicense } from "@/content/music";
import { turnMusicOff, turnMusicOn, useMusic } from "@/lib/motion/music";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function MusicDock() {
  const { on, current } = useMusic();

  return (
    <aside className="music-dock" aria-label="Music" data-music={on ? "on" : undefined}>
      {on && current && (
        <p className="music-credit">
          <span className="type-meta">Now playing · {current.style}</span>
          <span>
            <a href={current.source} {...external}>
              {current.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            by {current.artist} ·{" "}
            <a href={musicLicense.url} {...external}>
              {musicLicense.name}
              <span className="sr-only"> licence (opens in a new tab)</span>
            </a>
          </span>
        </p>
      )}
      <button
        type="button"
        className="music-button"
        aria-pressed={on}
        title={`Music is ${on ? "on" : "off"}`}
        onClick={() => (on ? turnMusicOff() : turnMusicOn())}
        data-squish="0.6"
        data-gloss=""
      >
        <RecordIcon size={30} />
        Music
        <span className="music-state" aria-hidden="true">
          {on ? "On" : "Off"}
        </span>
      </button>
    </aside>
  );
}
