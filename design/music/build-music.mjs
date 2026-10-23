// Background music (opt-in player): downloads each track from Free Music Archive, then trims it to at most 2½
// minutes, matches loudness (-16 LUFS, so switching sections never jumps in volume), adds short fades so the loop
// is smooth, and encodes a 96 kbps MP3 into public/music/. Every track is CC BY 4.0; credits are in
// src/content/music.ts and shown in the player.
//
//   FFMPEG=/path/to/ffmpeg node design/music/build-music.mjs
//
// Needs ffmpeg with libmp3lame (e.g. `npx ffmpeg-static` gives a path). Sources are cached in design/.cache/music/.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const ffmpeg = process.env.FFMPEG ?? "ffmpeg";
const cache = join(root, "design/.cache/music");
const out = join(root, "public/music");

// id = output file name; handle = the track's Free Music Archive handle (its page URL ends with it)
const tracks = [
  { id: "afrobeast", handle: "afrobeast" },
  { id: "hot-amapiano-beats", handle: "hot-amapiano-beats" },
  { id: "coffee-jelly", handle: "coffee-jelly" },
  { id: "afro-house", handle: "afro-house" },
  { id: "funky-vibe", handle: "funky-vibe" },
];

const MAX_SECONDS = 150;
const FADE_OUT = 4;

mkdirSync(cache, { recursive: true });
mkdirSync(out, { recursive: true });

for (const track of tracks) {
  const source = join(cache, `${track.id}.mp3`);
  if (!existsSync(source)) {
    const response = await fetch(`https://freemusicarchive.org/track/${track.handle}/stream/`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok || !response.headers.get("content-type")?.includes("audio")) throw new Error(`${track.id}: download failed`);
    writeFileSync(source, Buffer.from(await response.arrayBuffer()));
  }

  const durationText = /Duration: (\d+):(\d+):([\d.]+)/.exec(runQuiet(["-hide_banner", "-i", source]));
  const duration = durationText ? Number(durationText[1]) * 3600 + Number(durationText[2]) * 60 + Number(durationText[3]) : MAX_SECONDS;
  const length = Math.min(duration, MAX_SECONDS);

  const target = join(out, `${track.id}.mp3`);
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", source,
    "-t", String(length),
    "-af", `afade=t=in:d=0.4,afade=t=out:st=${(length - FADE_OUT).toFixed(2)}:d=${FADE_OUT},loudnorm=I=-16:TP=-1.5:LRA=11`,
    "-ar", "44100", "-ac", "2", "-codec:a", "libmp3lame", "-b:a", "96k",
    "-map_metadata", "-1",
    target,
  ]);
  console.log(`${track.id}: ${length.toFixed(0)}s → ${(statSync(target).size / 1024).toFixed(0)} KB`);
}

/** ffmpeg prints stream info to stderr and exits non-zero without an output file; capture it either way. */
function runQuiet(args) {
  try {
    return execFileSync(ffmpeg, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    return String(error.stderr ?? "");
  }
}
