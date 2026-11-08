// Server-safe (no React import): used by the root layout.

/**
 * Inline script for <head>, run before first paint:
 * - removes HTML comments and blank text a host injected into <head> (Netlify adds a line break and a comment
 *   after the charset tag). React can't hydrate around them, rebuilds the whole page and loses the markers
 *   below, so the Work tabs vanish. React's own markers ($ / & ! ?) are kept; React never renders text there.
 * - marks JS as available (html.js) and applies calm mode, so nothing flashes.
 */
export const motionBootScript = `(function(){var d=document.documentElement,h=document.head,n=h&&h.firstChild,x;while(n){x=n.nextSibling;if((n.nodeType===8&&!/^\\s*[$/&!?]/.test(n.data))||(n.nodeType===3&&!n.data.trim()))h.removeChild(n);n=x}var c=matchMedia("(prefers-reduced-motion: reduce)").matches;d.classList.add("js");try{c=c||localStorage.getItem("motion")==="calm"}catch(e){}if(c)d.setAttribute("data-calm","")})()`;
