"use client";

// The music dock: a small vinyl switch fixed to the bottom-left of the home page, so music can be turned on from any
// screen size. When it's on, Spotify's player sits above the switch (it shows the song, artist and cover itself).

import { useEffect, useRef } from "react";
import { RecordIcon } from "@/components/motion/PreferenceToggles";
import { setPlayerHost, turnMusicOff, turnMusicOn, useMusic } from "@/lib/motion/music";

export function MusicDock() {
  const { on, playing, failed } = useMusic();
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlayerHost(host.current);
    return () => setPlayerHost(null);
  }, []);

  return (
    <aside className="music-dock" aria-label="Music" data-music={on ? "on" : undefined} data-playing={playing ? "" : undefined}>
      <div className="music-player" hidden={!on}>
        {/* Spotify's player is inserted here the first time music is turned on */}
        <div ref={host} className="music-embed" />
        <p className="music-note">
          {failed
            ? "Spotify couldn’t be reached. Try again in a moment."
            : "Nigerian and international hits, a new one for each section. Log in to Spotify for full songs; otherwise you’ll hear 30-second previews."}
        </p>
      </div>
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
