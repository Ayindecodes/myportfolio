"use client";

// Work's two-way toggle (tasks 76, 80) built as real tabs: arrow keys, Home and End move between them, and only
// the selected tab is in the Tab order. Switching fades the old list out and the new one in (instant in calm mode).
// Links to a project (#work-quicksurf, e.g. from the hero cards or a shared URL) open the tab that holds it first.
// Without JavaScript the toggle is hidden and both lists show, one after the other.

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { isCalm } from "@/lib/motion/preferences";
import { createThumb } from "./toggle-thumb";
import { installVisitPill } from "./visit-pill";

export type WorkPanel = { id: string; label: string; slugs: string[]; content: ReactNode };

const FADE_OUT_MS = 130;

export function WorkTabs({ panels }: { panels: WorkPanel[] }) {
  const [selected, setSelected] = useState(panels[0].id);
  const [shown, setShown] = useState(panels[0].id);
  const [leaving, setLeaving] = useState(false);
  // Instant switches (a project link, the first render) skip the fade-in, so a scroll measured right away is exact.
  const [quiet, setQuiet] = useState(true);
  const shownRef = useRef(shown);
  const fadeTimer = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const thumbEl = useRef<HTMLSpanElement>(null);
  const thumb = useRef<ReturnType<typeof createThumb> | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const show = useCallback((id: string, animated: boolean) => {
    shownRef.current = id;
    setQuiet(!animated);
    setLeaving(false);
    setShown(id);
  }, []);

  const select = useCallback(
    (id: string, fade: boolean) => {
      setSelected(id);
      thumb.current?.moveTo(
        panels.findIndex((panel) => panel.id === id),
        !fade,
      );
      window.clearTimeout(fadeTimer.current);
      if (id === shownRef.current) return show(id, false);
      if (!fade || isCalm()) return show(id, false);
      setLeaving(true);
      fadeTimer.current = window.setTimeout(() => show(id, true), FADE_OUT_MS);
    },
    [panels, show],
  );

  useEffect(() => {
    if (!thumbEl.current) return;
    thumb.current = createThumb(thumbEl.current, panels.length, 0);
    return () => thumb.current?.dispose();
  }, [panels.length]);

  useEffect(() => (root.current && pill.current ? installVisitPill(root.current, pill.current) : undefined), []);

  // A link or URL pointing at a project opens its tab before the page scrolls there.
  useEffect(() => {
    const tabFor = (hash: string) => {
      const slug = hash.startsWith("#work-") ? decodeURIComponent(hash.slice(6)) : "";
      return panels.find((panel) => panel.slugs.includes(slug))?.id;
    };
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#work-"]') : null;
      const id = link ? tabFor(link.getAttribute("href")!) : undefined;
      if (id) flushSync(() => select(id, false)); // capture phase: runs before the in-page scroll handler
    };
    // A shared link to a project: open its tab (SiteNav's deep-link handler scrolls there once it's visible).
    const firstFrame = requestAnimationFrame(() => {
      const id = tabFor(window.location.hash);
      if (id) select(id, false);
    });
    // Back/forward to a project: the browser's own jump hit a hidden element, so open the tab and scroll again.
    const onHash = () => {
      const tab = tabFor(window.location.hash);
      if (!tab) return;
      flushSync(() => select(tab, false));
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" });
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(firstFrame);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
      window.clearTimeout(fadeTimer.current);
    };
  }, [panels, select]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = panels.findIndex((panel) => panel.id === selected);
    const last = panels.length - 1;
    const next =
      event.key === "ArrowRight" ? (current === last ? 0 : current + 1)
      : event.key === "ArrowLeft" ? (current === 0 ? last : current - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    select(panels[next].id, true);
    tabs.current[next]?.focus();
  }

  return (
    <div ref={root} className="work-tabs">
      <div className="work-toggle" role="tablist" aria-label="Kind of project" onKeyDown={onKeyDown}>
        <span ref={thumbEl} className="work-thumb" aria-hidden="true" />
        {panels.map((panel, index) => {
          const isSelected = panel.id === selected;
          return (
            <button
              key={panel.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`work-tab-${panel.id}`}
              aria-selected={isSelected}
              aria-controls={`work-panel-${panel.id}`}
              tabIndex={isSelected ? 0 : -1}
              className="work-tab"
              aria-label={`${panel.label} ${panel.slugs.length} projects`} // contains the visible "Products 4", for voice control
              onClick={() => select(panel.id, true)}
            >
              {panel.label}{" "}
              <span className="work-count" aria-hidden="true">
                {panel.slugs.length}
              </span>
            </button>
          );
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`work-panel-${panel.id}`}
          aria-labelledby={`work-tab-${panel.id}`}
          className="work-panel"
          data-active={panel.id === shown ? "" : undefined}
          data-leaving={panel.id === shown && leaving ? "" : undefined}
          data-quiet={quiet ? "" : undefined}
        >
          <p className="work-panel-title type-label">{panel.label}</p>
          {panel.content}
        </div>
      ))}

      <span ref={pill} className="visit-pill" aria-hidden="true" />
    </div>
  );
}
