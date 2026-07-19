/* Structure helpers over the curriculum map (META is the single source of truth). */
import { META } from "./meta-data.js";

export { META };

export function bookOf(rn) {
  for (const b of META.books)
    if (b.readings.some((r) => r.n === rn)) return b;
  return null;
}

export function readingMeta(rn) {
  const b = bookOf(rn);
  return b ? b.readings.find((r) => r.n === rn) || null : null;
}

/* Route path for a reading (replaces chapter.html?r=N). */
export function rpath(rn) {
  return "/chapter/" + rn;
}

/* Route path for a book (replaces book.html?b=N). */
export function bpath(bn) {
  return "/book/" + bn;
}
