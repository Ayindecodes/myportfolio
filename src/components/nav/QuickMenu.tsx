"use client";

// Full-screen menu (tasks 59–60). A native modal <dialog>: the browser traps focus inside it, makes the page
// behind inert, closes it on Esc and puts focus back on the button that opened it.

import { useEffect, useRef } from "react";
import { navLinks, site } from "@/content/site";
import { MotionToggle, SoundToggle } from "@/components/motion/PreferenceToggles";

const elsewhere = [
  ...site.socials.map((social) => ({ label: social.label, href: social.href, external: true })),
  { label: "Email", href: `mailto:${site.email}`, external: false },
  { label: "Résumé", href: site.resume.href, external: true },
];

export function QuickMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: string | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  // Close right away (before a link's navigation runs); the dialog's close event then updates the parent.
  const closeNow = () => dialog.current?.close();

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      id="site-menu"
      className="quick-menu"
      aria-label="Site menu"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeNow(); // click on the empty sheet
      }}
    >
      <div className="quick-menu-inner page">
        <div className="flex items-center justify-between">
          <p className="type-meta">Menu</p>
          <button type="button" onClick={closeNow} className="btn btn-cream" data-squish="0.6">
            Close <kbd className="font-mono text-[10px] text-dim max-[920px]:hidden">Esc</kbd>
          </button>
        </div>

        <div className="mt-[clamp(32px,7vh,72px)] grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <nav aria-label="Sections">
            <p className="type-meta text-accent-ink">Go to</p>
            <ul className="mt-5">
              {navLinks.map((link, index) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeNow}
                      aria-current={isActive ? "location" : undefined}
                      className={`menu-big ${isActive ? "is-active" : ""}`}
                    >
                      <span className="type-meta w-8">{String(index + 1).padStart(2, "0")}</span>
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <p className="type-meta text-accent-ink">Elsewhere</p>
            <ul className="mt-5 space-y-1">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="menu-small"
                    onClick={closeNow}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                    {link.external && <span className="sr-only"> (opens in a new tab)</span>}
                    <span aria-hidden="true" className="nudge-ur text-dim">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              <SoundToggle />
              <MotionToggle />
            </div>
            <p className="menu-hint type-meta mt-8">
              Tip: press <kbd>⌘</kbd> <kbd>K</kbd> anywhere to open this menu.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
