// Background beats: chill instrumentals with a "slowed + reverb" treatment, hosted on the site so everyone hears
// them in full. While music is on, a random beat plays each time scrolling settles in a new section (chill and Afro
// in turn), and the next one starts when a beat ends. Every track is CC BY 4.0 from Free Music Archive; the player
// credits the one that's playing. Files are built by design/music/build-music.mjs.

export type Track = {
  id: string;
  title: string;
  artist: string;
  style: string;
  group: "Chill" | "Afro";
  src: string;
  /** the track's page on Free Music Archive */
  source: string;
};

export const musicLicense = { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" };

const fma = (path: string) => `https://freemusicarchive.org/music/${path}/`;

export const tracks: Track[] = [
  {
    id: "coffee-jelly",
    title: "Coffee Jelly",
    artist: "Purrple Cat",
    style: "Lo-fi",
    group: "Chill",
    src: "/music/coffee-jelly.mp3",
    source: fma("purrple-cat/a-good-book/coffee-jelly"),
  },
  {
    id: "bookworm",
    title: "Bookworm",
    artist: "Purrple Cat",
    style: "Lo-fi",
    group: "Chill",
    src: "/music/bookworm.mp3",
    source: fma("purrple-cat/a-good-book/bookworm"),
  },
  {
    id: "lo-fi-relax-1",
    title: "lo-fi relax",
    artist: "Melatronic",
    style: "Lo-fi hip hop",
    group: "Chill",
    src: "/music/lo-fi-relax-1.mp3",
    source: fma("melatronic-1/stylish-hip-hop/lo-fi-relax-1"),
  },
  {
    id: "busted-tape",
    title: "Busted Tape",
    artist: "1000 Handz",
    style: "Chill study",
    group: "Chill",
    src: "/music/busted-tape.mp3",
    source: fma("1000-handz/cc-by-free-to-use-chillstudylounge-instrumentals/busted-tape"),
  },
  {
    id: "feel-it-heal-it",
    title: "Feel It Heal It",
    artist: "Ketsa",
    style: "Soul",
    group: "Chill",
    src: "/music/feel-it-heal-it.mp3",
    source: fma("Ketsa/vintage-modernity/feel-it-heal-it"),
  },
  {
    id: "afrobeast",
    title: "Afrobeast",
    artist: "Joseph Sacco",
    style: "Afrobeats",
    group: "Afro",
    src: "/music/afrobeast.mp3",
    source: fma("joseph-sacco/afrobeast-instrumentals/afrobeast"),
  },
  {
    id: "sun-hat",
    title: "Sun Hat",
    artist: "Joseph Sacco",
    style: "Afrobeats",
    group: "Afro",
    src: "/music/sun-hat.mp3",
    source: fma("joseph-sacco/afrobeast-instrumentals/sun-hat"),
  },
  {
    id: "amapiano-beats-with-log-drum-groove",
    title: "Amapiano Beats With Log Drum Groove",
    artist: "Alex Morgan",
    style: "Amapiano",
    group: "Afro",
    src: "/music/amapiano-beats-with-log-drum-groove.mp3",
    source: fma("alex-morgan/emotional-piano-vol-1/amapiano-beats-with-log-drum-groove"),
  },
];
