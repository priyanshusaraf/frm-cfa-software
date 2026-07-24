/* Pure planner core over META. No store, no React, no Date.now() in pure fns:
   callers pass date strings so scheduling stays deterministic and testable. */
import { META } from "./meta.js";

/* Stable topological sort of one session's readings: a dep in the SAME session
   comes before its dependent; ascending n breaks ties. Cross-session/cross-book
   deps are satisfied by book/session order and are ignored here. */
function sortSession(readings) {
  const inSession = new Set(readings.map((r) => r.n));
  const byN = [...readings].sort((a, b) => a.n - b.n);
  const placed = [];
  const done = new Set();
  const visit = (r) => {
    if (done.has(r.n)) return;
    done.add(r.n);
    (r.deps || [])
      .filter((d) => inSession.has(d))
      .map((d) => byN.find((x) => x.n === d))
      .forEach((dep) => dep && visit(dep));
    placed.push(r);
  };
  byN.forEach(visit);
  return placed;
}

export function orderedReadings(meta = META) {
  const out = [];
  meta.books.forEach((book) => {
    const sessions = book.sessions || [{ from: -Infinity, to: Infinity }];
    sessions.forEach((s) => {
      const group = book.readings.filter((r) => r.n >= s.from && r.n <= s.to);
      sortSession(group).forEach((r) => out.push({ ...r, book }));
    });
  });
  return out;
}
