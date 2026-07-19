/* All user state lives in one localStorage blob (versioned, export/import-able).
   Shape:
   {
     v: 1,
     done:   { [rn]: true },                          // reading marked complete
     quiz:   { [rn]: { best, last, when } },          // percent scores
     notes:  [ { id, rn, section, quote, text, ts, kind } ], // kind: "note" (default) | "error"
     srs:    { [cardId]: { ease, ivl, due, reps } },  // SM-2-lite per recall card
     planner:{ examDate },                            // "YYYY-MM-DD" or absent
     highlights: { [rn]: [ { id, color, text, prefix, suffix, section, ts } ] },
                                                      // color: 'y'|'g'|'b'|'r'; text/prefix/suffix are
                                                      // whitespace-normalized anchors (see lib/highlights.js)
     hlLabels:   { y, g, b, r },                      // user-editable color legend
     lastVisited:{ rn, ts },                          // most recently opened chapter
     mocks:  [ { ts, total, correct, perBook, minutes } ], // mock-exam history (newest first)
   }
   Older blobs may lack any of the newer keys — readers must treat them all as optional. */
import { useSyncExternalStore } from "react";

const KEY = "frm2.user.v1";
const listeners = new Set();
let cache = null;

function load() {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY)) || null; } catch { cache = null; }
  if (!cache || cache.v !== 1) cache = { v: 1, done: {}, quiz: {}, notes: [], srs: {} };
  return cache;
}

function save(next) {
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* quota */ }
  listeners.forEach((l) => l());
}

export function getState() { return load(); }
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function useStore(selector) {
  return useSyncExternalStore(subscribe, () => selector(load()));
}

/* ---- mutations ---- */
export function toggleDone(rn) {
  const s = load();
  const done = { ...s.done };
  if (done[rn]) delete done[rn]; else done[rn] = true;
  save({ ...s, done });
}

export function recordQuiz(rn, pct) {
  const s = load();
  const prev = s.quiz[rn] || { best: 0 };
  save({ ...s, quiz: { ...s.quiz, [rn]: { best: Math.max(prev.best, pct), last: pct, when: Date.now() } } });
}

export function addNote({ rn, section, quote, text, kind }) {
  const s = load();
  const note = { id: Math.random().toString(36).slice(2, 10), rn, section: section || "", quote: quote || "", text, ts: Date.now(), kind: kind === "error" ? "error" : "note" };
  save({ ...s, notes: [note, ...s.notes] });
  return note;
}
export function updateNote(id, text) {
  const s = load();
  save({ ...s, notes: s.notes.map((n) => (n.id === id ? { ...n, text } : n)) });
}
export function deleteNote(id) {
  const s = load();
  save({ ...s, notes: s.notes.filter((n) => n.id !== id) });
}

/* ---- SM-2-lite spaced repetition over recall cards ----
   grade: 0 = again, 1 = hard, 2 = good, 3 = easy */
const DAY = 86400e3;
export function gradeCard(cardId, grade) {
  const s = load();
  const c = s.srs[cardId] || { ease: 2.3, ivl: 0, reps: 0 };
  let { ease, ivl, reps } = c;
  if (grade === 0) { reps = 0; ivl = 0; ease = Math.max(1.3, ease - 0.2); }
  else {
    ease = Math.max(1.3, ease + (grade === 1 ? -0.15 : grade === 3 ? 0.1 : 0));
    ivl = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(ivl * ease * (grade === 1 ? 0.8 : 1));
    reps += 1;
  }
  const due = Date.now() + (grade === 0 ? 10 * 60e3 : ivl * DAY);
  save({ ...s, srs: { ...s.srs, [cardId]: { ease, ivl, reps, due } } });
}
export function dueCards(allIds, now = Date.now()) {
  const s = load();
  return allIds.filter((id) => {
    const c = s.srs[id];
    return !c || c.due <= now;
  });
}

/* ---- highlights ---- */
export const HL_COLORS = ["y", "g", "b", "r"];
const DEFAULT_HL_LABELS = { y: "Key idea", g: "Got it", b: "Look up later", r: "Weak spot" };

export function addHighlight(rn, { color, text, prefix, suffix, section }) {
  const s = load();
  const h = {
    id: Math.random().toString(36).slice(2, 10),
    color: HL_COLORS.includes(color) ? color : "y",
    text: (text || "").slice(0, 600),
    prefix: prefix || "",
    suffix: suffix || "",
    section: section || "",
    ts: Date.now(),
  };
  const cur = (s.highlights && s.highlights[rn]) || [];
  save({ ...s, highlights: { ...(s.highlights || {}), [rn]: [...cur, h] } });
  return h;
}
export function removeHighlight(rn, id) {
  const s = load();
  const cur = (s.highlights && s.highlights[rn]) || [];
  save({ ...s, highlights: { ...(s.highlights || {}), [rn]: cur.filter((h) => h.id !== id) } });
}
export function setHighlightColor(rn, id, color) {
  if (!HL_COLORS.includes(color)) return;
  const s = load();
  const cur = (s.highlights && s.highlights[rn]) || [];
  save({ ...s, highlights: { ...(s.highlights || {}), [rn]: cur.map((h) => (h.id === id ? { ...h, color } : h)) } });
}
export function hlLabels(state) {
  return { ...DEFAULT_HL_LABELS, ...((state || load()).hlLabels || {}) };
}
export function setHlLabel(color, label) {
  if (!HL_COLORS.includes(color)) return;
  const s = load();
  save({ ...s, hlLabels: { ...(s.hlLabels || {}), [color]: label } });
}

/* ---- last visited chapter ---- */
export function touchVisited(rn) {
  const s = load();
  if (s.lastVisited && s.lastVisited.rn === rn) return;
  save({ ...s, lastVisited: { rn, ts: Date.now() } });
}

/* ---- study planner ---- */
export function setExamDate(dateStr) {
  const s = load();
  save({ ...s, planner: { ...(s.planner || {}), examDate: dateStr || undefined } });
}

/* ---- mock exams ---- */
export function addMockResult({ total, correct, perBook, minutes }) {
  const s = load();
  const entry = { ts: Date.now(), total, correct, perBook: perBook || {}, minutes: minutes || null };
  const mocks = [entry, ...(s.mocks || [])].slice(0, 50);
  save({ ...s, mocks });
  return entry;
}

/* ---- export / import ---- */
export function exportState() { return JSON.stringify(load(), null, 2); }
export function importState(json) {
  const obj = JSON.parse(json);
  if (!obj || obj.v !== 1) throw new Error("Unrecognized backup format");
  save(obj);
}
