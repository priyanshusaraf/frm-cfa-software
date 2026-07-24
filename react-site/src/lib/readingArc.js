/* Auto narrative-orientation breadcrumb (learning-coherence 9-B). Derives, from
   META alone (no authoring), where a reading sits: its position in its Schweser
   session, what it builds on (its deps), and what it sets up (readings that list
   it as a dep). Pure so both ReadingArc.jsx and the Block Review composed
   through-line fallback can reuse it over any reading without loading content. */
import { META, bookOf, readingMeta } from "./meta.js";

export function readingArc(rn) {
  const book = bookOf(rn);
  if (!book) return null;
  const meta = readingMeta(rn);

  const session = (book.sessions || []).find((s) => rn >= s.from && rn <= s.to) || null;
  let sessionName = null, position = 0, sessionCount = 0;
  if (session) {
    const nums = book.readings
      .filter((r) => r.n >= session.from && r.n <= session.to)
      .map((r) => r.n)
      .sort((a, b) => a - b);
    sessionName = session.name;
    sessionCount = nums.length;
    position = nums.indexOf(rn) + 1;
  }

  const buildsOn = ((meta && meta.deps) || [])
    .map((n) => {
      const m = readingMeta(n);
      return m ? { n, t: m.t } : null;
    })
    .filter(Boolean);

  const setsUp = [];
  META.books.forEach((b) =>
    b.readings.forEach((r) => {
      if ((r.deps || []).includes(rn)) setsUp.push({ n: r.n, t: r.t });
    })
  );
  setsUp.sort((a, b) => a.n - b.n);

  return {
    book: { n: book.n, short: book.short, title: book.title, color: book.color },
    sessionName,
    position,
    sessionCount,
    buildsOn,
    setsUp,
  };
}
