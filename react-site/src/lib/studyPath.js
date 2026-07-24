/* Pure planner core over META. No store, no React, no Date.now() in pure fns:
   callers pass date strings so scheduling stays deterministic and testable. */
import { META, bookOf } from "./meta.js";
import { overrides as defaultOverrides } from "../data/studyPath.js";

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

export function orderedReadings(meta = META, moves = defaultOverrides) {
  const out = [];
  meta.books.forEach((book) => {
    const sessions = book.sessions || [{ from: -Infinity, to: Infinity }];
    sessions.forEach((s) => {
      const group = book.readings.filter((r) => r.n >= s.from && r.n <= s.to);
      sortSession(group).forEach((r) => out.push({ ...r, book }));
    });
  });
  // Apply "move X near Y": pull X out and reinsert immediately after Y. Defensive:
  // skip entries whose reading or target is not present.
  (moves || [])
    .filter((o) => "move" in o && "near" in o)
    .forEach((o) => {
      const fromIdx = out.findIndex((r) => r.n === o.move);
      if (fromIdx === -1) return;
      const [item] = out.splice(fromIdx, 1);
      const nearIdx = out.findIndex((r) => r.n === o.near);
      if (nearIdx === -1) out.splice(fromIdx, 0, item); // target gone: put it back
      else out.splice(nearIdx + 1, 0, item);
    });
  return out;
}

export function buildBlocks(meta = META, moves = defaultOverrides) {
  const ordered = orderedReadings(meta, moves);
  const pos = new Map(ordered.map((r, i) => [r.n, i])); // study-order index

  // Base: one block per session, readings in study order.
  const blocks = [];
  meta.books.forEach((book) => {
    (book.sessions || []).forEach((s) => {
      const nums = ordered
        .filter((r) => r.book.n === book.n && r.n >= s.from && r.n <= s.to)
        .map((r) => r.n);
      if (nums.length)
        blocks.push({
          id: "b" + book.n + "-" + nums[0],
          kind: "schweser-session",
          name: s.name,
          bookN: book.n,
          readings: nums,
        });
    });
  });

  // Lift curated clusters out of session blocks.
  (moves || [])
    .filter((o) => Array.isArray(o.cluster) && o.name)
    .forEach((o) => {
      const set = new Set(o.cluster);
      blocks.forEach((b) => (b.readings = b.readings.filter((n) => !set.has(n))));
      const nums = [...o.cluster].sort((a, c) => pos.get(a) - pos.get(c));
      // Safe guard: never throw even if nums[0] isn't in `ordered` (e.g. a stale
      // override referencing a reading not present in a custom `meta`). Prefer the
      // book found on the ordered entry (identical to the real-data case); fall
      // back to bookOf() against meta.js's own META, which cannot throw.
      const found = ordered.find((r) => r.n === nums[0]);
      const bookN = found ? found.book.n : (bookOf(nums[0]) || {}).n;
      blocks.push({
        id: "c" + nums[0],
        kind: "curated-cluster",
        name: o.name,
        bookN,
        readings: nums,
        _sort: pos.get(nums[0]),
      });
    });

  // Drop emptied session blocks, then order blocks by their first reading's study index.
  const nonEmpty = blocks.filter((b) => b.readings.length);
  nonEmpty.forEach((b) => {
    if (b._sort === undefined) b._sort = pos.get(b.readings[0]);
  });
  nonEmpty.sort((a, b) => a._sort - b._sort);
  nonEmpty.forEach((b) => delete b._sort);
  return nonEmpty;
}

const DAY = 86400e3;
function dayNum(s) {
  const d = new Date(s + "T00:00:00");
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
// star weight for a reading number, from META (no store).
function readingMetaWeight(n) {
  for (const b of META.books) {
    const r = b.readings.find((x) => x.n === n);
    if (r) return r.hy || 3;
  }
  return 3;
}
function blockWeight(block, done) {
  return block.readings.reduce(
    (sum, n) => sum + (done[n] ? 0 : readingMetaWeight(n) || 3),
    0
  );
}

export function scheduleBlocks({ startDate, examDate, done = {}, meta = META, moves = defaultOverrides }) {
  const start = dayNum(startDate);
  const exam = dayNum(examDate);
  const daysToExam = Math.round((exam - start) / DAY);
  if (isNaN(daysToExam) || daysToExam <= 0)
    return { daysToExam: isNaN(daysToExam) ? 0 : daysToExam, reviewDays: 0, studyDays: 0, scheduled: [] };

  const reviewDays = Math.min(10, Math.max(1, Math.floor(daysToExam * 0.15)));
  const studyDays = Math.max(1, daysToExam - reviewDays);

  const blocks = buildBlocks(meta, moves).filter(
    (b) => !b.readings.every((n) => done[n])
  );
  const totalW = blocks.reduce((s, b) => s + blockWeight(b, done), 0) || 1;

  const scheduled = [];
  let cursor = 0;
  blocks.forEach((block, i) => {
    const w = blockWeight(block, done);
    let span = Math.max(1, Math.round((w / totalW) * studyDays));
    // never overflow the study window; leave at least one day per remaining block.
    const remainingBlocks = blocks.length - i - 1;
    const maxSpan = studyDays - cursor - remainingBlocks;
    span = Math.max(1, Math.min(span, maxSpan));
    const startDay = cursor;
    const endDay = Math.min(studyDays - 1, cursor + span - 1);
    scheduled.push({ block, startDay, endDay });
    cursor = endDay + 1;
  });

  return { daysToExam, reviewDays, studyDays, scheduled };
}
