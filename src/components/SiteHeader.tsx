"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";

const sectionIds = navLinks.map((link) => link.href.slice(1));

/** Returns the id of the nav section currently under the top third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[18px] z-50 flex justify-center px-[var(--gutter)]">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="pointer-events-auto relative flex w-full items-center justify-between gap-1 rounded-full border border-hairline bg-surface/85 p-1.5 shadow-[0_12px_32px_-18px_rgb(0_0_0/0.9)] backdrop-blur-md md:w-auto md:justify-start"
      >
        <a
          href="#top"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-display text-[13px] leading-none font-extrabold tracking-tight text-bg transition-transform duration-300 hover:-rotate-12"
        >
          <span aria-hidden="true">{site.initials.toLowerCase()}</span>
          <span className="sr-only">{site.name}, back to top</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`block rounded-full px-[13px] py-[11px] text-[14.5px] leading-none font-medium transition-colors hover:bg-surface-2 hover:text-ink ${
                    isActive ? "bg-surface-2 text-ink" : "text-dim"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={site.resume.href}
          target="_blank"
          rel="noopener"
          className="hidden rounded-full bg-accent px-[15px] py-[11px] text-[14.5px] leading-none font-semibold text-white transition-colors hover:bg-accent-hover md:block"
        >
          Résumé
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-9 place-items-center rounded-full bg-ink text-bg md:hidden"
        >
          <span aria-hidden="true" className="relative block h-2.5 w-3.5">
            <span
              className={`absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[4.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[4.25px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="absolute inset-x-0 top-[calc(100%+8px)] rounded-[1.4rem] border border-hairline bg-surface p-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.9)] md:hidden"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.href.slice(1) ? "location" : undefined}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium text-ink transition-colors hover:bg-surface-2 aria-[current]:bg-surface-2"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-dim">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.resume.href}
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary mt-2 w-full"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
