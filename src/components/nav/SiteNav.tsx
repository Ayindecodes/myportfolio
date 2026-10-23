"use client";

// Site nav (tasks 56–61): logo reel, centre pill with the sliding ink, sound/motion switches, "Let's talk",
// and the full-screen menu (≤920px, or ⌘K / Ctrl+K anywhere).

import { useEffect, useState, type ReactNode } from "react";
import { navLinks } from "@/content/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { MotionToggle, SoundToggle } from "@/components/motion/PreferenceToggles";
import { Button } from "@/components/ui/Button";
import { NavPill } from "./NavPill";
import { QuickMenu } from "./QuickMenu";
import { useScrollSpy } from "./useScrollSpy";

const sectionIds = navLinks.map((link) => link.href.slice(1));

// Links from the previous version of the site keep working.
const legacyHashes: Record<string, string> = { projects: "work", skills: "journey" };

/** Resolves once `el` is rendered, e.g. after the Work tabs open the tab holding it, or after `ms`. */
function whenVisible(el: HTMLElement, ms: number) {
  const start = performance.now();
  return new Promise<void>((resolve) => {
    const check = () => {
      const shown = el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null;
      if (shown || performance.now() - start > ms) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });
}

/** Land deep links (#work, #work-mediremind, or old ones like #projects) on the right spot once fonts have settled. */
function useDeepLink() {
  useEffect(() => {
    const requested = window.location.hash.slice(1);
    const id = legacyHashes[requested] ?? requested;
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    // If the visitor starts scrolling first, never yank them back.
    let interacted = false;
    const stop = () => (interacted = true);
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((type) => window.addEventListener(type, stop, { once: true, passive: true }));

    // fonts.ready can resolve before the page has even requested its fonts, so wait one frame first.
    const fontsSettled = new Promise<void>((resolve) => requestAnimationFrame(() => void document.fonts.ready.then(() => resolve())));
    const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
    void Promise.race([fontsSettled, timeout])
      .then(() => whenVisible(target, 2000))
      .then(() => {
        if (interacted) return;
        target.scrollIntoView({ block: "start", behavior: "auto" }); // "auto" = a jump (no CSS smooth scroll); "instant" fails in older Safari
        if (id !== requested) history.replaceState(null, "", `#${id}`);
      });

    return () => events.forEach((type) => window.removeEventListener(type, stop));
  }, []);
}

export function SiteNav({ logo }: { logo: ReactNode }) {
  const { active, scrolled } = useScrollSpy(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  useDeepLink();

  // ⌘K / Ctrl+K toggles the menu from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="page flex items-center justify-between gap-4">
        {logo}

        <nav aria-label="Primary" className="max-[920px]:hidden">
          <NavPill active={active} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 max-[920px]:hidden">
            <SoundToggle compact />
            <MotionToggle compact />
          </div>
          <span className="max-[920px]:hidden">
            <Magnetic strength={0.22}>
              <Button variant="dark" href="#contact">
                Let&rsquo;s talk
              </Button>
            </Magnetic>
          </span>
          <button
            type="button"
            className="menu-button min-[921px]:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
            data-squish="0.6"
            data-gloss=""
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M1 1.5h18M1 7h18M1 12.5h12" />
            </svg>
          </button>
        </div>
      </div>

      <QuickMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </header>
  );
}
