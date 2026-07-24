# studyPath.js Planner Slice (Phase 0 pilot) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `src/lib/studyPath.js`, the pure planner-logic core that turns the curriculum into a dependency-ordered sequence, groups it into cohesive study blocks, and schedules those blocks across the exam window, so the planner stops distributing readings in raw `r.n` order.

**Architecture:** One new pure-logic module (`src/lib/studyPath.js`) plus one small authored override table (`src/data/studyPath.js`). The module reads only the static `META` map (no store, no React, no `Date.now()` inside the pure functions, callers pass dates in), so every function is deterministic and unit-testable. Verification is the built-in Node test runner (`node --test`), not a new dependency. A tiny preview script and a one-line Planner swap make the result visible for the Phase 0 bar-approval.

**Tech Stack:** Node 18.20 built-in `node:test` + `node:assert/strict` (zero new deps), ES modules (`package.json` is `"type": "module"`), Vite + React 18 (consumer side only).

## Global Constraints

- **No new npm dependencies.** Tests use the built-in `node --test` runner. (CLAUDE.md react-site §2: a dependency needs a reason a one-file utility cannot satisfy.)
- **`src/lib/meta-data.js` is the single source of structure.** Never hardcode a reading count, book color, session range, or path; derive from `META` / meta helpers. (react-site §2.)
- **Pure functions only in `studyPath.js`:** no store reads, no React, no `Date.now()` inside a pure function. Callers pass `startDate` / `examDate` as `"YYYY-MM-DD"` strings so tests are deterministic.
- **Store rules (only where the plan touches the store):** optional keys, spread-previous mutations, stable-identity selectors (no object-building selectors, they cause React #185). (react-site §2.)
- **No em-dashes or en-dashes (`—`, `–`) in any string that reaches the UI** (block names, reason copy). Hyphens in identifiers are fine. (react-site §1.)
- **At most 5 concurrent agents** if this plan is fanned out (it is small enough for one worker). (roadmap execution model.)
- **Verification per react-site §4:** `npm run build` stays green with zero new warnings; dist render-checks run over `http://localhost:4177`, never `file://`.

**Reference data shapes (verbatim from `src/lib/meta-data.js`):**
- A reading: `{ n: 1, t: "Estimating Market Risk Measures", hy: 5, deps: [], tag: "..." }`. `deps` is an array of reading numbers that should precede it. `hy` (1..5) is the priority-star effort weight; default to 3 when absent.
- A book: `{ n, short, title, color, colorSoft, dir, ..., sessions: [{ name, from, to }], readings: [ ...reading ] }`. `sessions[].from`/`to` are inclusive reading-number bounds.
- Book 1 sessions (used by tests): `Risk Measurement` 1-6, `Correlation Risk` 7-9, `Term Structures & Volatility` 10-16.
- Meta helpers (`src/lib/meta.js`): `bookOf(rn)`, `readingMeta(rn)`, `rpath(rn)`. `META.books` is the ordered book array.

---

## File Structure

- **Create `src/lib/studyPath.js`**, the pure planner core. Exports `orderedReadings()`, `buildBlocks()`, `scheduleBlocks(opts)`. One responsibility: turn `META` + an override table + a date window into an ordered, clustered, scheduled plan.
- **Create `src/data/studyPath.js`**, the authored override table (`export const overrides = [...]`). The single place a human tunes ordering/clustering. Data only, no logic.
- **Create `src/lib/studyPath.test.js`**, `node --test` unit tests for all three exports.
- **Create `scripts/preview-blocks.mjs`**, prints Book 1 blocks + a sample schedule to stdout, the artifact the owner eyeballs to approve the planner bar.
- **Modify `src/pages/Planner.jsx`**, swap `allReadingsOrdered()` for `orderedReadings()` so the visible plan follows dependency order (minimal, additive; the full block UI is Phase 1).

---

### Task 1: `orderedReadings()`, dependency sort within sessions

**Files:**
- Create: `src/lib/studyPath.js`
- Test: `src/lib/studyPath.test.js`

**Interfaces:**
- Consumes: `META` from `./meta.js`.
- Produces: `orderedReadings()` returns an array of reading objects in study order. Each item is the reading object augmented with its book: `{ n, t, hy, deps, tag, book }` where `book` is the `META.books` entry. Order = book order, then session order within a book, then a stable topological sort by intra-session `deps` (a dependency in the same session precedes its dependent; ascending `n` is the tiebreak). Cross-session and cross-book deps are assumed satisfied by book/session front-to-back order and do not reorder.

- [ ] **Step 1: Write the failing test**

```js
// src/lib/studyPath.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { orderedReadings } from "./studyPath.js";

test("orderedReadings returns every reading exactly once", () => {
  const out = orderedReadings();
  const nums = out.map((r) => r.n);
  assert.equal(new Set(nums).size, nums.length, "no duplicates");
  assert.ok(nums.includes(1) && nums.includes(16), "book 1 covered");
});

test("orderedReadings keeps each session contiguous and book-ordered", () => {
  const out = orderedReadings().filter((r) => r.book.n === 1).map((r) => r.n);
  // Book 1 sessions: 1-6, 7-9, 10-16. Each block stays together, in that order.
  assert.deepEqual(out, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

test("orderedReadings honors intra-session deps over ascending n", () => {
  // Synthetic session where n-order violates deps: 9 depends on 8, but list them 9 then 8.
  const readings = [
    { n: 9, t: "B", hy: 3, deps: [8] },
    { n: 8, t: "A", hy: 3, deps: [] },
  ];
  const book = { n: 99, sessions: [{ name: "S", from: 8, to: 9 }], readings };
  const out = orderedReadings({ books: [book] }).map((r) => r.n);
  assert.deepEqual(out, [8, 9]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/studyPath.test.js`
Expected: FAIL, `Cannot find module './studyPath.js'` (or `orderedReadings is not a function`).

- [ ] **Step 3: Write minimal implementation**

```js
// src/lib/studyPath.js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/studyPath.test.js`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/studyPath.js src/lib/studyPath.test.js
git commit -m "feat(studyPath): orderedReadings with intra-session dep sort"
```

---

### Task 2: The override table and its application

**Files:**
- Create: `src/data/studyPath.js`
- Modify: `src/lib/studyPath.js` (extend `orderedReadings` to apply overrides)
- Test: `src/lib/studyPath.test.js` (add cases)

**Interfaces:**
- Consumes: `orderedReadings()` from Task 1.
- Produces: `overrides` array from `src/data/studyPath.js`. Two entry shapes:
  - `{ move: <rn>, near: <rn>, why: "<reason>" }`, relocate reading `move` to sit immediately after `near` in the ordered list.
  - `{ cluster: [<rn>, ...], name: "<label>", why: "<reason>" }`, mark these readings as a named curated cluster (consumed by `buildBlocks` in Task 3; ordering is left untouched by `orderedReadings`).
  `orderedReadings()` applies every `move` entry after building the base order. Unknown/duplicate targets are skipped defensively (never throw).

- [ ] **Step 1: Write the failing test**

```js
// add to src/lib/studyPath.test.js
import { overrides } from "../data/studyPath.js";

test("override table is small and well-formed", () => {
  assert.ok(Array.isArray(overrides));
  overrides.forEach((o) => {
    assert.ok(o.why && typeof o.why === "string", "every override has a reason");
    assert.ok(!/[—–]/.test(o.why), "no em/en dashes in reason copy");
    const isMove = "move" in o && "near" in o;
    const isCluster = Array.isArray(o.cluster) && o.name;
    assert.ok(isMove || isCluster, "entry is a move or a cluster");
  });
});

test("orderedReadings applies a move override", () => {
  const readings = [
    { n: 1, t: "a", hy: 3, deps: [] },
    { n: 2, t: "b", hy: 3, deps: [] },
    { n: 3, t: "c", hy: 3, deps: [] },
  ];
  const book = { n: 99, sessions: [{ name: "S", from: 1, to: 3 }], readings };
  const moves = [{ move: 3, near: 1, why: "study 3 right after 1" }];
  const out = orderedReadings({ books: [book] }, moves).map((r) => r.n);
  assert.deepEqual(out, [1, 3, 2]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/studyPath.test.js`
Expected: FAIL, `Cannot find module '../data/studyPath.js'`.

- [ ] **Step 3: Write minimal implementation**

Create the data file:

```js
// src/data/studyPath.js
/* Curated ordering/clustering overrides. The single place a human tunes the study
   path. Keep it SMALL: only clusters that are genuinely confusing in curriculum
   order. Anything not listed keeps its automatic position. No em/en dashes in copy. */
export const overrides = [
  {
    cluster: [27, 28, 29],
    name: "Portfolio credit and copulas",
    why: "R27 single-factor, R28 tranche correlation, and R29 default intensity are one story; study them as a block.",
  },
  {
    move: 29,
    near: 37,
    why: "R29's spread/hazard material is a running start for the CVA family around R37; keep them adjacent.",
  },
];
```

Extend `orderedReadings` in `src/lib/studyPath.js` to take and apply moves:

```js
// src/lib/studyPath.js  (add the import at top)
import { overrides as defaultOverrides } from "../data/studyPath.js";

// replace the orderedReadings signature/body with:
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/studyPath.test.js`
Expected: PASS, 5 tests. (The Book 1 contiguity test from Task 1 still passes because no override touches Book 1.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/studyPath.js src/data/studyPath.js src/lib/studyPath.test.js
git commit -m "feat(studyPath): authored override table + move application"
```

---

### Task 3: `buildBlocks()`, cohesive study blocks

**Files:**
- Modify: `src/lib/studyPath.js`
- Test: `src/lib/studyPath.test.js` (add cases)

**Interfaces:**
- Consumes: `orderedReadings()` (Task 1/2), `overrides` (Task 2).
- Produces: `buildBlocks(meta?, moves?)` returns an ordered array of blocks. A block is:
  `{ id: string, kind: "schweser-session" | "curated-cluster", name: string, bookN: number, readings: number[] }`.
  Base rule: one block per book session, `readings` in study order, `name` = the session name, `kind: "schweser-session"`. Then, for each `{ cluster, name }` override, the listed readings are lifted out of their session blocks into one `curated-cluster` block named after the override, inserted at the position of its earliest member; session blocks left empty by the lift are dropped. `id` is `"b" + bookN + "-" + firstReadingNumber`.

- [ ] **Step 1: Write the failing test**

```js
// add to src/lib/studyPath.test.js
import { buildBlocks } from "./studyPath.js";

test("buildBlocks makes one block per Book 1 session", () => {
  const b1 = buildBlocks().filter((b) => b.bookN === 1);
  assert.deepEqual(
    b1.map((b) => b.readings),
    [[1, 2, 3, 4, 5, 6], [7, 8, 9], [10, 11, 12, 13, 14, 15, 16]]
  );
  assert.ok(b1.every((b) => b.kind === "schweser-session"));
  assert.ok(b1.every((b) => !/[—–]/.test(b.name)), "no dashes in block names");
});

test("buildBlocks lifts a curated cluster out of its sessions", () => {
  const cluster = buildBlocks().find((b) => b.kind === "curated-cluster");
  assert.ok(cluster, "a curated cluster block exists");
  assert.deepEqual(cluster.readings, [27, 28, 29]);
  // Those readings no longer appear in any schweser-session block.
  const sessionNums = buildBlocks()
    .filter((b) => b.kind === "schweser-session")
    .flatMap((b) => b.readings);
  assert.ok(![27, 28, 29].some((n) => sessionNums.includes(n)));
});

test("buildBlocks covers every reading exactly once", () => {
  const all = buildBlocks().flatMap((b) => b.readings);
  assert.equal(new Set(all).size, all.length);
  assert.equal(all.length, orderedReadings().length);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/studyPath.test.js`
Expected: FAIL, `buildBlocks is not a function`.

- [ ] **Step 3: Write minimal implementation**

```js
// src/lib/studyPath.js  (append)
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
      const bookN = (ordered.find((r) => r.n === nums[0]) || {}).book.n;
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/studyPath.test.js`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/studyPath.js src/lib/studyPath.test.js
git commit -m "feat(studyPath): buildBlocks with curated-cluster lifting"
```

---

### Task 4: `scheduleBlocks()`, pack blocks into the exam window

**Files:**
- Modify: `src/lib/studyPath.js`
- Test: `src/lib/studyPath.test.js` (add cases)

**Interfaces:**
- Consumes: `buildBlocks()` (Task 3).
- Produces: `scheduleBlocks({ startDate, examDate, done, meta?, moves? })` where `startDate`/`examDate` are `"YYYY-MM-DD"` strings and `done` is a `{ [rn]: true }` map (default `{}`). Returns:
  `{ daysToExam: number, reviewDays: number, studyDays: number, scheduled: [{ block, startDay, endDay }] }`.
  `block` is a buildBlocks block whose readings are NOT all done; fully-done blocks are dropped. `startDay`/`endDay` are 0-based day offsets from `startDate` (inclusive), assigned by walking blocks in order and giving each a span proportional to its total star weight (`sum(hy||3)`) across `studyDays`, minimum one day, never overflowing into the reserved review tail. `reviewDays = clamp(floor(daysToExam * 0.15), 1, 10)`; `studyDays = max(1, daysToExam - reviewDays)`. Deterministic: no `Date.now()`; day math from the two strings only.

- [ ] **Step 1: Write the failing test**

```js
// add to src/lib/studyPath.test.js
import { scheduleBlocks } from "./studyPath.js";

test("scheduleBlocks reserves a review tail and schedules blocks in order", () => {
  const s = scheduleBlocks({ startDate: "2026-01-01", examDate: "2026-04-11" }); // 100 days
  assert.equal(s.daysToExam, 100);
  assert.equal(s.reviewDays, 10); // floor(100*0.15)=15 -> clamped to 10
  assert.equal(s.studyDays, 90);
  assert.ok(s.scheduled.length > 0);
  // day offsets are ordered, within [0, studyDays), and non-overlapping.
  let prevEnd = -1;
  for (const it of s.scheduled) {
    assert.ok(it.startDay > prevEnd, "blocks do not overlap and advance");
    assert.ok(it.endDay >= it.startDay);
    assert.ok(it.endDay < s.studyDays, "never runs into the review tail");
    prevEnd = it.endDay;
  }
});

test("scheduleBlocks drops fully-done blocks", () => {
  const done = {};
  for (let n = 1; n <= 6; n++) done[n] = true; // finish Book 1 session 1
  const s = scheduleBlocks({ startDate: "2026-01-01", examDate: "2026-04-11", done });
  assert.ok(!s.scheduled.some((it) => it.block.readings.every((n) => done[n])));
});

test("scheduleBlocks handles a past/zero window without throwing", () => {
  const s = scheduleBlocks({ startDate: "2026-04-11", examDate: "2026-01-01" });
  assert.ok(s.daysToExam <= 0);
  assert.deepEqual(s.scheduled, []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/studyPath.test.js`
Expected: FAIL, `scheduleBlocks is not a function`.

- [ ] **Step 3: Write minimal implementation**

```js
// src/lib/studyPath.js  (append)
const DAY = 86400e3;
function dayNum(s) {
  const d = new Date(s + "T00:00:00");
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function blockWeight(block, done) {
  return block.readings.reduce(
    (sum, n) => sum + (done[n] ? 0 : (readingMetaWeight(n) || 3)),
    0
  );
}
// star weight for a reading number, from META (no store).
function readingMetaWeight(n) {
  for (const b of META.books) {
    const r = b.readings.find((x) => x.n === n);
    if (r) return r.hy || 3;
  }
  return 3;
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
```

Add `readingMeta` is not needed; `readingMetaWeight` reads `META` directly. Ensure `META` is already imported at the top of the file (it is, from Task 1).

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/studyPath.test.js`
Expected: PASS, 11 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/studyPath.js src/lib/studyPath.test.js
git commit -m "feat(studyPath): scheduleBlocks packs blocks into the exam window"
```

---

### Task 5: Make it visible, preview script + Planner ordering swap

**Files:**
- Create: `scripts/preview-blocks.mjs`
- Modify: `src/pages/Planner.jsx:10-14` (replace `allReadingsOrdered` usage)

**Interfaces:**
- Consumes: `orderedReadings`, `buildBlocks`, `scheduleBlocks` (Tasks 1-4).
- Produces: a runnable stdout preview for owner bar-approval, and a Planner whose day distribution follows dependency/session order instead of raw `r.n`.

- [ ] **Step 1: Write the preview script**

```js
// scripts/preview-blocks.mjs
// Owner bar-approval artifact: prints Book 1 blocks + a sample 100-day schedule.
import { buildBlocks, scheduleBlocks } from "../src/lib/studyPath.js";

const b1 = buildBlocks().filter((b) => b.bookN === 1);
console.log("BOOK 1 BLOCKS");
for (const b of b1) console.log(`  [${b.kind}] ${b.name}: ${b.readings.join(", ")}`);

console.log("\nSAMPLE SCHEDULE (2026-01-01 .. 2026-04-11)");
const s = scheduleBlocks({ startDate: "2026-01-01", examDate: "2026-04-11" });
console.log(`  daysToExam=${s.daysToExam} studyDays=${s.studyDays} reviewDays=${s.reviewDays}`);
for (const it of s.scheduled.slice(0, 6))
  console.log(`  days ${it.startDay}-${it.endDay}: ${it.block.name} (${it.block.readings.length} readings)`);
```

- [ ] **Step 2: Run the preview and eyeball it**

Run: `node scripts/preview-blocks.mjs`
Expected: three Book 1 session blocks printed with readings `1-6`, `7-9`, `10-16`; then a schedule with `daysToExam=100 studyDays=90 reviewDays=10` and blocks assigned non-overlapping day ranges. (This is the artifact the owner approves for the planner bar.)

- [ ] **Step 3: Swap Planner to dependency order**

In `src/pages/Planner.jsx`, replace the local `allReadingsOrdered` (lines 10-15) usage in `buildPlan` with `orderedReadings()` from the new module. Add the import and change the one call site:

```jsx
// src/pages/Planner.jsx, add to imports (top of file)
import { orderedReadings } from "../lib/studyPath.js";

// in buildPlan (was: const remaining = allReadingsOrdered().filter((r) => !done[r.n]);)
const remaining = orderedReadings().filter((r) => !done[r.n]);
```

Delete the now-unused `allReadingsOrdered` function (lines 10-15) so there is no dead code. `orderedReadings()` returns objects with the same `{ ...r, book }` shape the rest of `buildPlan` and the render already rely on (`r.n`, `r.hy`, `r.book.color`, `r.t`), so no other change is needed.

- [ ] **Step 4: Verify the build and render**

Run:
```bash
npm run build
cd dist && python3 -m http.server 4177 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=9000 --dump-dom "http://localhost:4177/index.html#/planner" \
  | grep -c 'widget failed\|undefined<\|>null<\|tex-error'
```
Expected: `npm run build` green with no new warnings; the grep prints `0`. (Set an exam date in the planner UI manually to see the reordered distribution; the plan is empty until a date is set, which is existing behavior.)

- [ ] **Step 5: Run the full test suite once more, then commit**

Run: `node --test src/lib/studyPath.test.js`
Expected: PASS, 11 tests.

```bash
git add scripts/preview-blocks.mjs src/pages/Planner.jsx
git commit -m "feat(planner): order the plan by studyPath deps + block preview script"
```

---

## Self-Review

**Spec coverage (against roadmap Phase 0 planner slice + §9-A):**
- "cluster layer" -> Task 3 `buildBlocks`. "schedule layer" -> Task 4 `scheduleBlocks`. "piloted on Book 1" -> Task 3/5 Book 1 assertions + `preview-blocks.mjs`. §9-A "`orderedReadings()` topo sort within sessions" -> Task 1. §9-A "authored override table `src/data/studyPath.js`" -> Task 2. §9-A "Planner uses orderedReadings" -> Task 5. Deferred to Phase 1 (out of this plan by design): `planner.startDate` store key, the two-date UI, the block-based Planner UI, and the "Next in your plan" Chapter CTA. `scheduleBlocks` already accepts `startDate` so the Phase 1 UI is a wiring job, not a logic change.
- Not in this plan (correctly, they are later phases): the Block Review (Phase 0 subsystem #3, its own plan), the bow-tie/stepper widgets (subsystem #2, its own plan).

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every test step shows real assertions. None found.

**Type consistency:** `orderedReadings(meta?, moves?)` returns `{...r, book}` used identically in `buildBlocks` and Task 5's Planner swap. `buildBlocks` block shape `{ id, kind, name, bookN, readings }` is consumed unchanged by `scheduleBlocks` (which wraps it as `{ block, startDay, endDay }`) and by `preview-blocks.mjs`. `done` is a `{ [rn]: true }` map in both `scheduleBlocks` and the Planner. `hy || 3` default weight is consistent across `blockWeight`/`readingMetaWeight` and the existing Planner. No naming drift found.
