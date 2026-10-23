// Layout for the balloon wordmark (tasks 62–63). Glyph shapes come from wordmark.generated.ts; this file decides
// how much each letter is inflated, how far apart they sit, where the two door halves split, and the
// hand-placed glints and pop pitches for each letter. Everything is in font units (1000 per em).

import { wordmark } from "./wordmark.generated";

/** Extra outline that rounds and fattens each letter, like air pushing the seams out. */
export const PUFF = 22;
/** Space added between letters so neighbouring balloons just miss each other. */
const TRACK = 24;
/** "AYI | NDE": the first three letters swing left, the rest swing right. */
const SPLIT = 3;

// Glints: one short highlight per letter where its first stroke catches the key light (upper left).
const glints: Record<string, string> = {
  A: "M252 -548L284 -620",
  Y: "M58 -630L108 -586",
  I: "M86 -626L86 -548",
  N: "M86 -626L86 -548",
  D: "M86 -626L86 -548",
  E: "M96 -626L96 -548",
};

// Each letter pops on its own note, so pressing them in turn plays a little tune.
const pitches = [1, 1.12, 1.26, 0.9, 1.06, 1.19];

const top = Math.min(...wordmark.letters.map((l) => l.box[1])) - PUFF / 2;
const bottom = Math.max(...wordmark.letters.map((l) => l.box[3])) + PUFF / 2;

const boxes = wordmark.letters.map((letter, i) => {
  const left = letter.x + i * TRACK + letter.box[0] - PUFF / 2;
  return { left, right: left + letter.box[2] - letter.box[0] + PUFF };
});

const start = boxes[0].left;
const width = boxes[boxes.length - 1].right - start;
const height = bottom - top;
const pct = (n: number) => `${(n * 100).toFixed(4)}%`;

function door(from: number, to: number) {
  const left = boxes[from].left;
  const span = boxes[to - 1].right - left;
  return {
    left: pct((left - start) / width),
    width: pct(span / width),
    letters: wordmark.letters.slice(from, to).map((letter, j) => {
      const i = from + j;
      const box = boxes[i];
      return {
        index: i,
        char: letter.char,
        d: letter.d,
        glint: glints[letter.char],
        pitch: pitches[i],
        left: pct((box.left - left) / span),
        width: pct((box.right - box.left) / span),
        viewBox: `${letter.box[0] - PUFF / 2} ${top} ${box.right - box.left} ${height}`,
      };
    }),
  };
}

export const balloon = {
  aspectRatio: `${width.toFixed(1)} / ${height.toFixed(1)}`,
  doors: [door(0, SPLIT), door(SPLIT, wordmark.letters.length)] as const,
};

export type BalloonLetter = (typeof balloon.doors)[number]["letters"][number];
