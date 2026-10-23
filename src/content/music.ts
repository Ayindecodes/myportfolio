// Background music: real hits through Spotify's official player, which holds the licences. One song per section,
// Nigerian and international in turn, clean versions only. Every URI was read from Spotify's own pages, with the
// title, artists and explicit flag checked.

export type Song = {
  /** id of the section this song plays under */
  section: string;
  title: string;
  artist: string;
  origin: "Nigerian" | "International";
  uri: `spotify:track:${string}`;
};

export const songs: Song[] = [
  { section: "top", title: "Calm Down", artist: "Rema & Selena Gomez", origin: "Nigerian", uri: "spotify:track:1s7oOCT8vauUh01PbJD6ps" },
  { section: "work", title: "Blinding Lights", artist: "The Weeknd", origin: "International", uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b" },
  { section: "about", title: "Essence", artist: "Wizkid feat. Tems", origin: "Nigerian", uri: "spotify:track:5FG7Tl93LdH117jEKYl3Cm" },
  { section: "journey", title: "One Dance", artist: "Drake feat. Wizkid & Kyla", origin: "International", uri: "spotify:track:1zi7xx7UVEFkmKfv06H8x0" },
  { section: "contact", title: "Last Last", artist: "Burna Boy", origin: "Nigerian", uri: "spotify:track:57DarSfRMIVRCeDBGW0l5S" },
];
