"use client";

import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = { idle: "Copy", copied: "Copied", failed: "Copy failed" };
const announcements: Record<CopyState, string> = {
  idle: "",
  copied: "Email address copied to clipboard",
  failed: "Couldn’t copy automatically. Select the email address to copy it.",
};

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className={`meta shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] tracking-[0.12em] transition-colors ${
          state === "copied"
            ? "border-live/40 text-live"
            : "border-hairline-strong text-dim hover:border-white/30 hover:text-ink"
        }`}
      >
        {labels[state]}
      </button>
      <span role="status" className="sr-only">
        {announcements[state]}
      </span>
    </>
  );
}
