/* All user state lives in one localStorage blob (versioned, export/import-able).
   Shape:
   {
     v: 1,
     done:   { [rn]: true },                          // reading marked complete
     quiz:   { [rn]: { best, last, when } },          // percent scores
     notes:  [ { id, rn, section, quote, text, ts, kind } ], // kind: "note" (default) | "error"
     srs:    { [cardId]: { ease, ivl, due, reps } },  // SM-2-lite, cardId is id-agnostic:
                                                      // "rn:i" recall, "rn:hy:i" highYield, "rn:list:id" lists (Review.jsx)
     planner:{ examDate, startDate },                 // "YYYY-MM-DD" or absent (startDate defaults to today)
     highlights: { [rn]: [ { id, color, text, prefix, suffix, section, ts } ] },
                                                      // color: 'y'|'g'|'b'|'r'; text/prefix/suffix are
                                                      // whitespace-normalized anchors (see lib/highlights.js)
     hlLabels:   { y, g, b, r },                      // user-editable color legend
     lastVisited:{ rn, ts, y, section },              // most recently opened chapter (+ scroll y, section label left off in)
     bookmarks:  { [rn]: [ { id, txt, ts } ] },       // section bookmarks; id = slugify(section title)
     layout: { pageWidth, keyPointsOpen, tocOpen, blockWidths, fontScale, split, pdfZoom },
              // + pdfZoom: page zoom for the full-page /pdf/:bn reader (0.5-3, absent = 1)
              // reading-column width (px) + rail open states + per-block widths { [`${rn}:key`]: px }
              // + fontScale: app-wide text size multiplier (Settings page), applied as --font-scale
              // + split: { panes:{source,condensed}, side:'left'|'right', widths:{source,condensed}px,
              //            zoom:{source,condensed} } — free-form split-view source panes (Chapter.jsx §7.4)
     mocks:  [ { ts, total, correct, perBook, minutes } ], // mock-exam history (newest first)
     nav:    { activeReading },                       // global "Return to Reading" target: reading number
                                                      // or null; set on chapter mount (if not done), cleared
                                                      // when that reading is marked done or explicitly cleared
     prefs:  { hydrationReminder, reminderMinutes, pomodoro },
                                                      // hydrationReminder: bool, default true (on unless
                                                      // explicitly false) — foreground-time study-nudge toast
                                                      // reminderMinutes: int 5..240, absent = 45 (nudge interval)
                                                      // pomodoro: { focus, brk, longBrk, cycles, completed }
                                                      // — durations in minutes + lifetime completed focus blocks.
                                                      // The RUNNING timer is NOT here: it is session-only state in
                                                      // lib/pomodoro.js, because a persisted endsAt reloads into a
                                                      // timer that expired hours ago.
     blockReview: { [blockId]: { seenTs } },           // OPTIONAL: set when a Block Review page has been
                                                      // opened/completed for that block; seenTs is a caller-
                                                      // supplied timestamp (Date.now()) so the mutator stays
                                                      // pure/testable. Graduation into the SRS queue reuses
                                                      // the existing gradeCard, no second SRS engine.
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
  const nav = s.nav || {};
  const nextNav = done[rn] && nav.activeReading === rn ? { ...nav, activeReading: null } : nav;
  save({ ...s, done, nav: nextNav });
}

/* ---- global "Return to Reading" target ---- */
export function setActiveReading(rn) {
  const s = load();
  save({ ...s, nav: { ...(s.nav || {}), activeReading: rn } });
}
export function clearActiveReading() {
  const s = load();
  save({ ...s, nav: { ...(s.nav || {}), activeReading: null } });
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

/* ---- last visited chapter (+ resume position) ----
   Called on chapter open (no extra) and throttled on scroll (extra = {y, section}).
   Writes only when something material changed, to avoid churning localStorage on scroll. */
export function touchVisited(rn, extra) {
  const s = load();
  const prev = s.lastVisited || {};
  const y = extra && typeof extra.y === "number" ? Math.max(0, Math.round(extra.y)) : prev.rn === rn ? prev.y : 0;
  const section = extra && "section" in extra ? extra.section || "" : prev.rn === rn ? prev.section : "";
  if (prev.rn === rn && prev.y === y && prev.section === section && !extra) return;
  if (prev.rn === rn && prev.y === y && (prev.section || "") === (section || "")) return;
  save({ ...s, lastVisited: { rn, ts: Date.now(), y: y || 0, section: section || "" } });
}

/* ---- study-consistency activity counter (optional key: activity {yyyy-mm-dd:n}) ----
   Bumped once per chapter open (not on scroll) so the /consistency heatmap has a
   forward-looking signal on top of the derived timestamps. Old blobs lack it. */
export function touchActivity() {
  const s = load();
  const d = new Date();
  const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const act = s.activity || {};
  save({ ...s, activity: { ...act, [k]: (act[k] || 0) + 1 } });
}

/* ---- section bookmarks ---- */
export function toggleBookmark(rn, { id, txt }) {
  if (!rn || !id) return;
  const s = load();
  const cur = (s.bookmarks && s.bookmarks[rn]) || [];
  const exists = cur.some((b) => b.id === id);
  const next = exists ? cur.filter((b) => b.id !== id) : [...cur, { id, txt: txt || id, ts: Date.now() }];
  const bookmarks = { ...(s.bookmarks || {}) };
  if (next.length) bookmarks[rn] = next; else delete bookmarks[rn];
  save({ ...s, bookmarks });
}
export function isBookmarked(state, rn, id) {
  const list = (state && state.bookmarks && state.bookmarks[rn]) || [];
  return list.some((b) => b.id === id);
}
export function allBookmarks(state) {
  const map = (state || load()).bookmarks || {};
  const out = [];
  for (const rn of Object.keys(map)) {
    for (const b of map[rn] || []) out.push({ rn: Number(rn), id: b.id, txt: b.txt, ts: b.ts || 0 });
  }
  return out.sort((a, b) => (b.ts || 0) - (a.ts || 0));
}

/* ---- layout preferences (reading width + rail open states) ---- */
export function setPageWidth(px) {
  const s = load();
  const pageWidth = typeof px === "number" && px > 0 ? Math.round(px) : undefined;
  save({ ...s, layout: { ...(s.layout || {}), pageWidth } });
}
export function setKeyPointsOpen(open) {
  const s = load();
  save({ ...s, layout: { ...(s.layout || {}), keyPointsOpen: !!open } });
}
export function setTocOpen(open) {
  const s = load();
  save({ ...s, layout: { ...(s.layout || {}), tocOpen: !!open } });
}
/* per-block (per-list) width override; px>0 sets, anything else clears (reset to default) */
export function setBlockWidth(key, px) {
  if (!key) return;
  const s = load();
  const bw = { ...((s.layout && s.layout.blockWidths) || {}) };
  if (typeof px === "number" && px > 0) bw[key] = Math.round(px); else delete bw[key];
  save({ ...s, layout: { ...(s.layout || {}), blockWidths: bw } });
}
/* app-wide text size multiplier, applied as --font-scale on <html> (Settings page) */
export function setFontScale(scale) {
  const s = load();
  const fontScale = typeof scale === "number" && scale > 0 ? scale : undefined;
  save({ ...s, layout: { ...(s.layout || {}), fontScale } });
}

/* ---- split-view source material alongside a reading (Chapter.jsx §7.4) ----
   Free-form columns: the reading is the flex-fill column and each open PDF pane
   carries its own px width; every drag is absorbed by the reading column.
   panes:  { source, condensed } — which side-by-side PDF panes are open.
   side:   'left' | 'right' — which side of the reading the pane group docks (default right).
   widths: { source, condensed } px — per-pane width (reading takes the rest).
   zoom:   { source, condensed } — per-pane page-zoom multiplier (1 = fit-to-pane).
   q:      { rn, text } | undefined — ad-hoc source anchor from a "Read in source"
           selection; scoped to the reading it came from so a stale selection from
           another reading can never anchor the pane. */
export function setSplitPane(kind, open) {
  const s = load();
  const cur = (s.layout && s.layout.split) || {};
  const panes = { ...(cur.panes || {}) };
  if (open) panes[kind] = true; else delete panes[kind];
  save({ ...s, layout: { ...(s.layout || {}), split: { ...cur, panes } } });
}
export function setSplitSide(side) {
  const s = load();
  const cur = (s.layout && s.layout.split) || {};
  const v = side === "left" ? "left" : "right";
  save({ ...s, layout: { ...(s.layout || {}), split: { ...cur, side: v } } });
}
/* Matches the −/+ steps in PdfCore's toolbar; enforced here too so a hand-edited
   or imported blob can't restore an unusable zoom. */
export const MIN_PDF_ZOOM = 0.5;
export const MAX_PDF_ZOOM = 3;
function clampZoom(z) {
  return Math.min(MAX_PDF_ZOOM, Math.max(MIN_PDF_ZOOM, z));
}

export function setSplitPaneWidth(kind, px) {
  if (kind !== "source" && kind !== "condensed") return;
  const s = load();
  const cur = (s.layout && s.layout.split) || {};
  const widths = { ...(cur.widths || {}) };
  if (typeof px === "number" && px > 0) widths[kind] = Math.round(px); else delete widths[kind];
  save({ ...s, layout: { ...(s.layout || {}), split: { ...cur, widths } } });
}
/* `zoom` is the per-pane MAP; the numeric argument goes inside it. Writing the
   argument straight onto split.zoom (as this once did) leaves zoom[kind]
   undefined forever, so every pane silently snaps back to 1. */
export function setSplitZoom(kind, zoom) {
  if (kind !== "source" && kind !== "condensed") return;
  const s = load();
  const cur = (s.layout && s.layout.split) || {};
  const z = { ...(cur.zoom || {}) };
  if (typeof zoom === "number" && zoom > 0) z[kind] = clampZoom(zoom); else delete z[kind];
  save({ ...s, layout: { ...(s.layout || {}), split: { ...cur, zoom: z } } });
}

/* Page zoom for the full-page /pdf/:bn reader. Its own key rather than a third
   entry in split.zoom: that map is keyed by pane kind and the route has no pane. */
export function setPdfZoom(zoom) {
  const s = load();
  const layout = { ...(s.layout || {}) };
  if (typeof zoom === "number" && zoom > 0) layout.pdfZoom = clampZoom(zoom); else delete layout.pdfZoom;
  save({ ...s, layout });
}

/* Ad-hoc source anchor from a "Read in source" text selection (Highlighter.jsx).
   setSplitQuery(null) clears it — Chapter.jsx does that when the source pane
   closes and when the reading changes. */
const MAX_SPLIT_QUERY_LEN = 120;
export function setSplitQuery(rn, text) {
  const s = load();
  const cur = (s.layout && s.layout.split) || {};
  const t = typeof text === "string" ? text.replace(/\s+/g, " ").trim().slice(0, MAX_SPLIT_QUERY_LEN) : "";
  const q = rn && t ? { rn, text: t } : undefined;
  if (!q && !cur.q) return; // nothing to clear: don't churn localStorage or notify
  save({ ...s, layout: { ...(s.layout || {}), split: { ...cur, q } } });
}

/* ---- misc preferences ---- */
export function setHydrationReminder(on) {
  const s = load();
  save({ ...s, prefs: { ...(s.prefs || {}), hydrationReminder: !!on } });
}

/* Nudge cadence. Clamped HERE, not only in the Settings UI: an imported or
   hand-edited blob must not be able to restore an interval that never fires
   (the lesson from the split-zoom regression). */
export const REMINDER_MIN = 5;
export const REMINDER_MAX = 240;
export const REMINDER_DEFAULT = 45;
export function setReminderMinutes(mins) {
  const s = load();
  const prefs = { ...(s.prefs || {}) };
  const n = Math.round(Number(mins));
  if (Number.isFinite(n) && n > 0) {
    prefs.reminderMinutes = Math.min(REMINDER_MAX, Math.max(REMINDER_MIN, n));
  } else {
    delete prefs.reminderMinutes; // falls back to REMINDER_DEFAULT on read
  }
  save({ ...s, prefs });
}

/* Pomodoro durations + lifetime count. Only settings live here; the running
   timer is session-only (lib/pomodoro.js). */
export const POMODORO_DEFAULTS = { focus: 25, brk: 5, longBrk: 15, cycles: 4 };
const POMODORO_LIMITS = { focus: [5, 90], brk: [1, 30], longBrk: [5, 60], cycles: [2, 8] };
export function setPomodoroPrefs(patch) {
  const s = load();
  const cur = (s.prefs && s.prefs.pomodoro) || {};
  const next = { ...cur };
  Object.keys(patch || {}).forEach((k) => {
    const lim = POMODORO_LIMITS[k];
    if (!lim) return; // unknown key: ignore rather than persist junk
    const n = Math.round(Number(patch[k]));
    if (Number.isFinite(n)) next[k] = Math.min(lim[1], Math.max(lim[0], n));
  });
  save({ ...s, prefs: { ...(s.prefs || {}), pomodoro: next } });
}

export function incPomodoroCompleted() {
  const s = load();
  const cur = (s.prefs && s.prefs.pomodoro) || {};
  save({ ...s, prefs: { ...(s.prefs || {}), pomodoro: { ...cur, completed: (cur.completed || 0) + 1 } } });
}

/* ---- block review (Block Review pilot) ----
   ts is passed IN by the caller (Date.now()) so this mutator stays pure/testable. */
export function markBlockReviewSeen(blockId, ts) {
  const s = load();
  save({ ...s, blockReview: { ...(s.blockReview || {}), [blockId]: { seenTs: ts } } });
}

/* ---- study planner ---- */
export function setExamDate(dateStr) {
  const s = load();
  save({ ...s, planner: { ...(s.planner || {}), examDate: dateStr || undefined } });
}

/* Optional plan-window start (default: today, applied in the Planner). Clearing
   it removes the key so old blobs and a blank input both fall back to today. */
export function setStartDate(dateStr) {
  const s = load();
  save({ ...s, planner: { ...(s.planner || {}), startDate: dateStr || undefined } });
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
