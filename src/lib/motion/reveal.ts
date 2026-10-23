// Scroll reveal (task 51). Mark elements with data-reveal; they fade up the first time 12% of them is visible.
// data-reveal="words" staggers the words of a <RevealWords> heading instead of moving the block.
// Hidden states only apply under <html class="js"> without data-calm, so content is always visible without JS.

import { isCalm } from "./preferences";

const SELECTOR = "[data-reveal]:not([data-revealed])";

export function installReveal() {
  const show = (el: Element) => {
    el.setAttribute("data-revealed", "");
    observer.unobserve(el);
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
    { threshold: 0.12 },
  );

  const watch = (root: ParentNode) => {
    root.querySelectorAll(SELECTOR).forEach((el) => (isCalm() ? show(el) : observer.observe(el)));
  };

  // Content added later (a tab switch, a client component mounting) gets watched too.
  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches(SELECTOR)) watch(node.parentElement ?? document);
        else watch(node);
      });
    }
  });

  // Safety net: after scrolling stops, reveal anything already above the bottom of the screen
  // (fast jumps, anchor links and odd layouts can skip the observer's threshold).
  let idle = 0;
  const onScroll = () => {
    window.clearTimeout(idle);
    idle = window.setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    }, 150);
  };

  // Start a frame later so parts of the page that hydrate in a later chunk are claimed by React first.
  const start = requestAnimationFrame(() => {
    watch(document);
    mutations.observe(document.body, { childList: true, subtree: true });
  });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    cancelAnimationFrame(start);
    observer.disconnect();
    mutations.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(idle);
  };
}

/** Reveal everything at once (calm mode switched on). */
export function revealAll() {
  document.querySelectorAll(SELECTOR).forEach((el) => el.setAttribute("data-revealed", ""));
}
