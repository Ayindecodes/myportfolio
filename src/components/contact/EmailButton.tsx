"use client";

// The email button (task 89): one click copies the address and says so (also to screen readers). It's a real
// mailto link underneath, so without JavaScript, with a modifier key held, or if copying isn't allowed, it opens
// the visitor's mail app instead. It drifts toward the cursor like the nav's "Let's talk".

import { useEffect, useState, type MouseEvent } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

export function EmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !navigator.clipboard) return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <Magnetic strength={0.3}>
      <a href={`mailto:${email}`} onClick={onClick} className="email-blob" data-copied={copied ? "" : undefined} data-squish="0.5" data-gloss="">
        <span className="email-address">{email}</span>
        <span className="sr-only">, copy to clipboard</span>
        <span className="email-chip" aria-hidden="true">
          {copied ? (
            <>
              <svg viewBox="0 0 16 16" className="email-tick">
                <path pathLength={100} d="M3 8.6 6.4 12 13 4.6" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 16 16">
                <rect x="5" y="5" width="8.5" height="8.5" rx="2" />
                <path d="M10.5 5V3.8A1.8 1.8 0 0 0 8.7 2H3.8A1.8 1.8 0 0 0 2 3.8v4.9a1.8 1.8 0 0 0 1.8 1.8H5" />
              </svg>
              Copy
            </>
          )}
        </span>
      </a>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </Magnetic>
  );
}
