import type { CSSProperties } from "react";

/**
 * A heading's words rise into place one after another when it scrolls into view (task 51).
 * Screen readers get the sentence once, intact; the animated copy is hidden from them.
 * Use "\n" in `text` for a deliberate line break on wide screens.
 */
export function RevealWords({ text, step = 45 }: { text: string; step?: number }) {
  const lines = text.split("\n");
  // index of each line's first word, so the stagger runs on across line breaks
  const offsets = lines.map((_, i) => lines.slice(0, i).reduce((count, line) => count + line.split(" ").length, 0));

  return (
    <span data-reveal="words" className="reveal-words" suppressHydrationWarning>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="reveal-line">
            {line.split(" ").map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="rw"
                style={{ "--wd": `${(offsets[lineIndex] + wordIndex) * step}ms` } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
