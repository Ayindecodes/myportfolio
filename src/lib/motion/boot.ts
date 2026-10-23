// Server-safe (no React import): used by the root layout.

/** Inline script for <head>: marks JS as available and applies calm before first paint, so nothing flashes. */
export const motionBootScript = `(function(){var d=document.documentElement,c=matchMedia("(prefers-reduced-motion: reduce)").matches;d.classList.add("js");try{c=c||localStorage.getItem("motion")==="calm"}catch(e){}if(c)d.setAttribute("data-calm","")})()`;
