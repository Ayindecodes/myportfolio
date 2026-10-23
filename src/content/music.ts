// Background music: one track per section, Afro and global in turn. Every track is CC BY 4.0 from Free Music
// Archive; the player credits the one that's playing. Files are built by design/music/build-music.mjs (shortened
// to at most 2½ minutes, loudness-matched and re-encoded).

export type Track = {
  id: string;
  /** id of the section this track plays under */
  section: string;
  title: string;
  artist: string;
  style: string;
  src: string;
  /** the track's page on Free Music Archive */
  source: string;
};

export const musicLicense = { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" };

const fma = (path: string) => `https://freemusicarchive.org/music/${path}/`;

export const tracks: Track[] = [
  {
    id: "afrobeast",
    section: "top",
    title: "Afrobeast",
    artist: "Joseph Sacco",
    style: "Afrobeats",
    src: "/music/afrobeast.mp3",
    source: fma("joseph-sacco/afrobeast-instrumentals/afrobeast"),
  },
  {
    id: "hot-amapiano-beats",
    section: "work",
    title: "Hot Amapiano Beats",
    artist: "Alex Morgan",
    style: "Amapiano",
    src: "/music/hot-amapiano-beats.mp3",
    source: fma("alex-morgan/pop-afro-party-instrumentals/hot-amapiano-beats"),
  },
  {
    id: "coffee-jelly",
    section: "about",
    title: "Coffee Jelly",
    artist: "Purrple Cat",
    style: "Lo-fi",
    src: "/music/coffee-jelly.mp3",
    source: fma("purrple-cat/a-good-book/coffee-jelly"),
  },
  {
    id: "afro-house",
    section: "journey",
    title: "Afro House",
    artist: "Alex Morgan",
    style: "Afro house",
    src: "/music/afro-house.mp3",
    source: fma("alex-morgan/pop-afro-party-instrumentals/afro-house"),
  },
  {
    id: "funky-vibe",
    section: "contact",
    title: "Funky vibe",
    artist: "Heavenless",
    style: "Disco funk",
    src: "/music/funky-vibe.mp3",
    source: fma("heavenless/disco-vibe/funky-vibe"),
  },
];
