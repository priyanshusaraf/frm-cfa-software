/* Study-consistency metrics (learning-coherence addendum §4). Pure: derives a
   per-day activity map + streak/pace stats from the existing store timestamps
   (quiz.when, notes.ts, highlights.ts, mocks.ts, bookmarks.ts, lastVisited.ts)
   plus the optional forward-looking `activity` day-counter. No store writes here;
   callers pass `now` for testability. */

const DAY = 86400e3;

export function dayKey(ts) {
  const d = new Date(ts);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

/* Map of local-day -> activity count, unioning the explicit `activity` counter
   with counts derived from every timestamped record already in the blob. */
export function activityByDay(state) {
  const counts = {};
  const bump = (ts) => { if (!ts) return; const k = dayKey(ts); counts[k] = (counts[k] || 0) + 1; };

  const act = state.activity || {};
  for (const k in act) counts[k] = (counts[k] || 0) + (act[k] || 0);

  const q = state.quiz || {};
  for (const rn in q) if (q[rn]) bump(q[rn].when);
  (state.notes || []).forEach((n) => n && bump(n.ts));
  const hl = state.highlights || {};
  for (const rn in hl) (hl[rn] || []).forEach((h) => h && bump(h.ts));
  (state.mocks || []).forEach((m) => m && bump(m.ts));
  const bm = state.bookmarks || {};
  for (const rn in bm) (bm[rn] || []).forEach((b) => b && bump(b.ts));
  if (state.lastVisited) bump(state.lastVisited.ts);

  return counts;
}

/* current streak (consecutive active days ending today or yesterday), longest
   streak, and active-day count. DST-safe: day gaps compared by rounded DAY. */
export function streakInfo(counts, now = Date.now()) {
  const active = new Set(Object.keys(counts));
  const midnight = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };

  let cur = 0;
  let anchor = midnight(now);
  if (!active.has(dayKey(anchor))) anchor -= DAY; // today idle but yesterday active still counts
  while (active.has(dayKey(anchor))) { cur++; anchor -= DAY; }

  const dayNums = [...active].map((k) => midnight(new Date(k + "T00:00:00").getTime())).sort((a, b) => a - b);
  let longest = 0, run = 0, prev = null;
  for (const dn of dayNums) {
    if (prev !== null && Math.round((dn - prev) / DAY) === 1) run++;
    else run = 1;
    if (run > longest) longest = run;
    prev = dn;
  }

  return { current: cur, longest, activeDays: active.size };
}

/* A weeks x 7 grid (most recent `weeks` weeks, Sun-first columns) of
   { key, count, inFuture } for a GitHub-style heatmap. */
export function heatmapGrid(counts, now = Date.now(), weeks = 26) {
  const midnight = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const today = midnight(now);
  const dow = new Date(today).getDay(); // 0=Sun
  const gridEnd = today + (6 - dow) * DAY; // end of the current week (Sat)
  const start = gridEnd - (weeks * 7 - 1) * DAY;

  const cols = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const ts = start + (w * 7 + d) * DAY;
      const k = dayKey(ts);
      col.push({ key: k, count: counts[k] || 0, inFuture: ts > today });
    }
    cols.push(col);
  }
  return cols;
}
