// GSAP loader (task 46). GSAP is only needed for scroll-scrubbed timelines and path drawing, so it's
// imported on demand and stays out of the first page load. Call from client code only.

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let loading: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null;

export function loadGsap() {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([core, scroll]) => {
    core.gsap.registerPlugin(scroll.ScrollTrigger);
    return { gsap: core.gsap, ScrollTrigger: scroll.ScrollTrigger };
  });
  return loading;
}
