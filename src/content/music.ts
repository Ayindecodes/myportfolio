// Background music: real hits through Spotify's official player, which holds the licences. While music is on, a
// random song plays each time scrolling settles in a new section (Nigerian and international in turn), and another
// starts when one ends. Clean versions only: every URI, title, artist and explicit flag was read from Spotify.

export type Song = {
  title: string;
  artist: string;
  origin: "Nigerian" | "International";
  uri: `spotify:track:${string}`;
};

export const songs: Song[] = [
  { title: "Calm Down (with Selena Gomez)", artist: "Rema, Selena Gomez", origin: "Nigerian", uri: "spotify:track:1s7oOCT8vauUh01PbJD6ps" },
  { title: "Essence (feat. Tems)", artist: "Wizkid, Tems", origin: "Nigerian", uri: "spotify:track:5FG7Tl93LdH117jEKYl3Cm" },
  { title: "Last Last", artist: "Burna Boy", origin: "Nigerian", uri: "spotify:track:57DarSfRMIVRCeDBGW0l5S" },
  { title: "Rush", artist: "Ayra Starr", origin: "Nigerian", uri: "spotify:track:1xs8bOvm3IzEYmcLJVOc34" },
  { title: "Free Mind", artist: "Tems", origin: "Nigerian", uri: "spotify:track:2mzM4Y0Rnx2BDZqRnhQ5Q6" },
  { title: "On the Low", artist: "Burna Boy", origin: "Nigerian", uri: "spotify:track:1zIk8RJEKGvoH4FioFnGyJ" },
  { title: "Joro", artist: "Wizkid", origin: "Nigerian", uri: "spotify:track:3Yt1ovsh3v3VEzRuhI1TL5" },
  { title: "Jogodo", artist: "Wizkid, Asake", origin: "Nigerian", uri: "spotify:track:2njWzPDRRhsXOUhiA42e62" },
  { title: "KANTE (feat. Fave)", artist: "Davido, FAVE", origin: "Nigerian", uri: "spotify:track:7vKXc90NT5WBm3UTT4iTVG" },
  { title: "Gratitude", artist: "Asake", origin: "Nigerian", uri: "spotify:track:7hiRlw64LXcHpGAVJ6eUzv" },
  { title: "Gbona", artist: "Burna Boy", origin: "Nigerian", uri: "spotify:track:1PlYxNrefqOBvk52umixt9" },
  { title: "Commas", artist: "Ayra Starr", origin: "Nigerian", uri: "spotify:track:4GXW3Ne1jzdORKHvHjK31V" },
  { title: "love nwantiti (ah ah ah) [feat. Joeboy & Kuami Eugene] [Remix]", artist: "CKay, Joeboy, Kuami Eugene", origin: "Nigerian", uri: "spotify:track:140dx97IbJbQhIMd7AaHeb" },
  { title: "Vibration", artist: "Fireboy DML", origin: "Nigerian", uri: "spotify:track:7u0z6FcJDqkZwdpqAqUzmO" },
  { title: "Sere", artist: "SPINALL, Fireboy DML", origin: "Nigerian", uri: "spotify:track:35056uy2b4M1qJ3Z1ed3sf" },
  { title: "Me & U", artist: "Tems", origin: "Nigerian", uri: "spotify:track:31kxPC3ZB9AYwCLyHaqEVX" },
  { title: "Blinding Lights", artist: "The Weeknd", origin: "International", uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b" },
  { title: "One Dance", artist: "Drake, Wizkid, Kyla", origin: "International", uri: "spotify:track:1zi7xx7UVEFkmKfv06H8x0" },
  { title: "Levitating", artist: "Dua Lipa", origin: "International", uri: "spotify:track:39LLxExYz6ewLAcYrzQQyP" },
  { title: "Don't Start Now", artist: "Dua Lipa", origin: "International", uri: "spotify:track:3PfIrDoz19wz7qK7tYeu62" },
  { title: "Uptown Funk (feat. Bruno Mars)", artist: "Mark Ronson, Bruno Mars", origin: "International", uri: "spotify:track:32OlwWuMpZ6b0aN2RZOeMS" },
  { title: "That's What I Like", artist: "Bruno Mars", origin: "International", uri: "spotify:track:0KKkJNfGyhkQ5aFogxQAPU" },
  { title: "Die For You", artist: "The Weeknd", origin: "International", uri: "spotify:track:2LBqCSwhJGcFQeTHMVGwy3" },
  { title: "Water", artist: "Tyla", origin: "International", uri: "spotify:track:5aIVCx5tnk0ntmdiinnYvw" },
  { title: "Hold On, We're Going Home", artist: "Drake, Majid Jordan", origin: "International", uri: "spotify:track:6jdOi5U5LBzQrc4c1VT983" },
  { title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", origin: "International", uri: "spotify:track:7so0lgd0zP2Sbgs2d7a1SZ" },
  { title: "One Kiss (with Dua Lipa)", artist: "Calvin Harris, Dua Lipa", origin: "International", uri: "spotify:track:76dIZzTdrNO15mGBrU3MHi" },
];
