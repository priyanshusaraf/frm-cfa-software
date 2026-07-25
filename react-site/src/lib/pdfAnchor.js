/* Keeps the page you are reading pinned when a PDF's pages change size (zoom
   step, pane drag, window resize, fullscreen toggle). PdfCore lays pages out
   arithmetically, all pages share one height, so page n starts at
   `contTop + (n-1) * unit` where unit = pageHeight + gap. That makes the anchor
   two numbers rather than the DOM-fingerprint machinery `scrollAnchor.js` needs
   for reflowing prose: the page you are on, and how far into it you are.

   Pure and DOM-free so it can be unit-tested; PdfCore owns the measurement.
   Nothing here throws: these run during load, when numPages is 0 and the page
   height is still a placeholder. */

function usable(...nums) {
  return nums.every((n) => typeof n === "number" && Number.isFinite(n));
}

/* Scroll position -> {page (1-based), frac (0..1) into that page}. */
export function anchorFrom(scrollTop, contTop, unit, numPages) {
  if (!usable(scrollTop, contTop, unit) || unit <= 0 || !(numPages > 0)) return { page: 1, frac: 0 };
  const rel = scrollTop - contTop;
  if (rel <= 0) return { page: 1, frac: 0 };
  const idx = Math.min(numPages - 1, Math.floor(rel / unit));
  let frac = (rel - idx * unit) / unit;
  if (!Number.isFinite(frac) || frac < 0) frac = 0;
  // scrolled past the end of the last page: stay on it, just short of the boundary
  if (frac >= 1) frac = 0.999999;
  return { page: idx + 1, frac };
}

/* {page, frac} -> the scroll position that reproduces it at `unit`. Passing the
   NEW unit is what makes a zoom step land on the same page instead of drifting. */
export function offsetFor(anchor, contTop, unit, numPages) {
  if (!anchor || !usable(contTop, unit) || unit <= 0 || !(numPages > 0)) return 0;
  let page = Math.round(anchor.page);
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (page > numPages) page = numPages;
  let frac = anchor.frac;
  if (!Number.isFinite(frac) || frac < 0) frac = 0;
  if (frac > 1) frac = 1;
  return Math.max(0, Math.round(contTop + (page - 1 + frac) * unit));
}

/* The load-time no-op: `unit` changes once when the real page height replaces the
   placeholder, and restoring page 1 at offset 0 would fight the anchor-ladder's
   initial jump for no benefit. */
export function isAtStart(anchor) {
  return !anchor || (anchor.page <= 1 && !(anchor.frac > 0));
}
