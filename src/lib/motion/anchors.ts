// In-page links (#work, #contact …). Instead of CSS smooth scrolling, which also animates the browser's own
// jump to a #hash on page load (and then fights the deep-link correction), clicks are handled here:
// smooth scroll (instant in calm mode), the URL updates, and focus moves to the section for keyboard and
// screen-reader users.

import { isCalm } from "./preferences";

export function installAnchorScroll() {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    const id = link ? decodeURIComponent(link.getAttribute("href")!.slice(1)) : "";
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ block: "start", behavior: isCalm() ? "auto" : "smooth" });
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
