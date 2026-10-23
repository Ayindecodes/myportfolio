// Background beats (opt-in player): downloads each track from Free Music Archive, then gives it the "slowed + reverb"
// treatment (90% speed, which also lowers the pitch a little, plus a soft room echo), keeps at most 2¼ minutes,
// matches loudness (-16 LUFS, so switching never jumps in volume), adds fades and encodes a 96 kbps MP3 into
// public/music/. Every track is CC BY 4.0; credits are in src/content/music.ts and shown in the player.
//
//   FFMPEG=/path/to/ffmpeg node design/music/build-music.mjs
//
// Needs ffmpeg with libmp3lame (e.g. the binary from the ffmpeg-static package). Sources are cached in
// design/.cache/music/.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const ffmpeg = process.env.FFMPEG ?? "ffmpeg";
const cache = join(root, "design/.cache/music");
const out = join(root, "public/music");

// Each entry is a Free Music Archive track handle (its page URL ends with it); it's also the output file name.
const tracks = [
  "coffee-jelly",
  "bookworm",
  "lo-fi-relax-1",
  "busted-tape",
  "feel-it-heal-it",
  "afrobeast",
  "sun-hat",
  "amapiano-beats-with-log-drum-groove",
];

const SPEED = 0.9;
const MAX_SECONDS = 135;
const FADE_OUT = 4;

mkdirSync(cache, { recursive: true });
mkdirSync(out, { recursive: true });

for (const id of tracks) {
  const source = join(cache, `${id}.mp3`);
  if (!existsSync(source)) {
    const response = await fetch(`https://freemusicarchive.org/track/${id}/stream/`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok || !response.headers.get("content-type")?.includes("audio")) throw new Error(`${id}: download failed`);
    writeFileSync(source, Buffer.from(await response.arrayBuffer()));
  }

  const durationText = /Duration: (\d+):(\d+):([\d.]+)/.exec(runQuiet(["-hide_banner", "-i", source]));
  const duration = durationText ? Number(durationText[1]) * 3600 + Number(durationText[2]) * 60 + Number(durationText[3]) : MAX_SECONDS;
  const length = Math.min(duration / SPEED, MAX_SECONDS);

  const filters = [
    "aresample=44100",
    `asetrate=${Math.round(44100 * SPEED)}`, // play slower at a lower pitch…
    "aresample=44100", // …then back to a standard sample rate
    "aecho=0.8:0.72:70|140:0.22|0.12", // a soft room
    "afade=t=in:d=0.6",
    `afade=t=out:st=${(length - FADE_OUT).toFixed(2)}:d=${FADE_OUT}`,
    "loudnorm=I=-16:TP=-1.5:LRA=11",
  ];

  const target = join(out, `${id}.mp3`);
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", source,
    "-af", filters.join(","),
    "-t", length.toFixed(2),
    "-ar", "44100", "-ac", "2", "-codec:a", "libmp3lame", "-b:a", "96k",
    "-map_metadata", "-1",
    target,
  ]);
  console.log(`${id}: ${length.toFixed(0)}s → ${(statSync(target).size / 1024).toFixed(0)} KB`);
}

/** ffmpeg prints stream info to stderr and exits non-zero without an output file; capture it either way. */
function runQuiet(args) {
  try {
    return execFileSync(ffmpeg, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    return String(error.stderr ?? "");
  }
}
