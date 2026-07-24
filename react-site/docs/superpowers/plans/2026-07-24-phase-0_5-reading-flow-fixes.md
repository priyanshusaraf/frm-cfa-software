# Phase 0.5: Reading-flow fixes and navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Bugs (Tasks 1 and 2) are debugging tasks: REQUIRED SUB-SKILL superpowers:systematic-debugging, reproduce before fixing.

**Goal:** Fix the scroll-jank and redirect bugs that break the daily reading flow, add a global "Return to Reading" button and "Next reading clears previous" behavior, add a 45-minute hydration reminder, and purge em-dashes / formatting from `META` strings.

**Architecture:** Six independent deliverables over the existing React app. Store additions follow the versioned-blob pattern (optional keys, spread-prev, stable selectors). Pure store logic is unit-tested with `node --test`; scroll/redirect fixes are reproduced then verified by headless render-check plus a flagged manual pass (interactive scroll cannot be verified headless).

**Tech Stack:** Vite + React 18, react-router HashRouter, plain JSX, `src/lib/store.js` (`useSyncExternalStore`), Node 18.20 built-in `node:test` for pure logic. No new dependencies.

## Global Constraints

- **No new npm dependencies.** (CLAUDE.md react-site §2.)
- **Store rules:** every new key is optional, mutations spread the previous state, selectors return stable identities (raw slice + default OUTSIDE the selector; object-building selectors cause React #185). Document new keys in the shape comment atop `src/lib/store.js`. (react-site §2.)
- **`src/lib/meta-data.js` is the single source of structure;** derive, never hardcode. (react-site §2.)
- **No em-dashes or en-dashes (`—`, `–`)** in any user-facing string. Context-appropriate rewrites, never a blind regex. (react-site §1.)
- **Global keyboard handlers** start with `if (e.metaKey||e.ctrlKey||e.altKey) return;` then bail on INPUT/TEXTAREA/contentEditable. Do not collide with existing shortcuts (`n`, `⌘K`, `[`/`]`, `1-4`/`a-d`, `Space`+`1-4`, `f`). (react-site §2.)
- **Colors via CSS variables only,** no hex literals in components. (react-site §3.)
- **Verification per react-site §4:** `npm run build` green with zero new warnings; render-check over `http://localhost:4177` (never `file://`), 0 hits for `widget failed|undefined<|>null<|tex-error`. Interactive scroll behavior is FLAGGED for manual browser verification, never claimed from headless.
- **Subagent-driven, at most 5 concurrent, Opus review between tasks.** (GOAL.md.)

**Reference (verified in code):**
- `src/lib/scrollAnchor.js:58` `useScrollAnchor(rootRef)`; a `ResizeObserver` on the reading root (`:141-164`) fires the anchor restore (`window.scrollBy({top, behavior:"instant"})`, `:132`) on ANY `.page` height change.
- `src/pages/Chapter.jsx:64` calls `useScrollAnchor(rootRef)`; `:76-80` captures resume `y` only when `location.state.resume && lastVisited.rn === rn`; `:170-180` applies it (`window.scrollTo(0,0)` otherwise); `:222` `nextRn`; `:273` `toggleDone(rn)`; `:526-529` the bottom "Next" link.
- `src/lib/store.js:51` `toggleDone(rn)`, `:145` `touchVisited(rn, extra)`, `lastVisited: {rn,ts,y,section}`, blob `v:1`.
- `src/main.jsx:49` `Shell()` renders `{!fullscreen && <Nav/>}` then `<Routes>`; the global mount point for the return button and hydration timer.

---

### Task 1: Fix the scroll-jump on concept expand (bugs, items 7 and 8)

**REQUIRED SUB-SKILL:** superpowers:systematic-debugging. Reproduce headfully before changing code.

**Files:**
- Modify: `src/lib/scrollAnchor.js` (reflow-source gating)
- Test: manual headful repro (documented), plus `src/lib/scrollAnchor.test.js` if the fix extracts a pure predicate.

**Interfaces:**
- Consumes: `useScrollAnchor(rootRef)` unchanged signature.
- Produces: the anchor restore no longer fires for reflows caused by content growth below the anchored paragraph (accordion / concept-card / hierarchy expand). It still fires for window resize, font-scale change, reading-column drag, and split-pane open/close (the reflows it was built for).

- [ ] **Step 1: Reproduce and confirm the cause**

Run the app (`npm run dev`), open a long reading, scroll to the middle, expand a concept card, and observe the downward jump. Temporarily add `console.trace()` inside the `ResizeObserver` callback in `scrollAnchor.js` and confirm the accordion expand triggers the restore `scrollBy`. Confirm it reproduces both with the split pane open and closed (item 8). Expected: the `ResizeObserver` on the reading root fires on the expand and applies a non-zero `scrollBy`.

- [ ] **Step 2: Write the guard**

The fix: the anchored paragraph must be pinned only when it actually moved. When content expands BELOW the anchor, the anchor's viewport top is unchanged, so the correction should be zero (or suppressed). Two acceptable implementations, pick the one the repro supports:

(a) In the restore, if the anchored element's pre/post `getBoundingClientRect().top` delta is within a small epsilon (e.g. < 2px), do not call `scrollBy` at all. This makes below-anchor expands no-ops automatically.

```js
// scrollAnchor.js, inside restore(), before the scrollBy:
const after = anchorEl.getBoundingClientRect().top;
const delta = after - capturedTop;        // capturedTop from the pre-reflow measurement
if (Math.abs(delta) < 2) return;          // content grew below the anchor: nothing to correct
busyRef.current = Date.now();
window.scrollBy({ top: delta, behavior: "instant" });
```

(b) If (a) is insufficient (the anchor itself is inside the expanding card), additionally skip restores when the reflow's added height is entirely below the anchor's bottom edge.

- [ ] **Step 3: Verify the fix headfully and headless**

Headful: repeat Step 1's repro; expanding the first, a middle, and the last concept leaves the clicked header's screen position stable (its `getBoundingClientRect().top` moves < 2px). Repeat with split pane open. Then confirm the ORIGINAL anchor behavior still works: resize the window, change font scale (A+ in navbar), drag the reading-column handle, open/close a split pane, all keep the anchored paragraph pinned.

Headless build gate:
```bash
npm run build && cd dist && python3 -m http.server 4177 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=9000 --dump-dom "http://localhost:4177/index.html#/chapter/28" \
  | grep -c 'widget failed\|undefined<\|>null<\|tex-error'
```
Expected: build green; grep prints `0`. FLAG the scroll behavior itself for manual verification (headless fires no real scroll events).

- [ ] **Step 4: Remove the console.trace, commit**

```bash
git add src/lib/scrollAnchor.js
git commit -m "fix(scroll): do not re-anchor on below-anchor content expands"
```

---

### Task 2: Discovery links open readings at the top (bug, item 9)

**REQUIRED SUB-SKILL:** superpowers:systematic-debugging.

**Files:**
- Modify: `src/pages/Chapter.jsx` (mount scroll) and/or the fix Task 1 lands (if shared cause)
- Verify: headless DOM + manual

**Interfaces:**
- Produces: opening a reading from any discovery surface (homepage high-yield, book page, search, glossary, mind map) starts at `scrollY === 0`. Only the Continue-studying card (which passes `state.resume`) restores the saved position.

- [ ] **Step 1: Reproduce and locate**

From the homepage 5-star list, click a reading and confirm it lands mid-reading. Add temporary logging in `Chapter.jsx` around `:170-180` to print `location.state`, `resumeRef.current`, and the final `window.scrollY` after mount. Determine whether (a) a discovery `<Link>` leaks `state.resume`, or (b) the scroll-anchor restore from Task 1 is scrolling after the intended `scrollTo(0,0)`. Note: if Task 1's fix already resolves this, this task reduces to adding the regression check.

- [ ] **Step 2: Apply the fix for whichever cause the repro shows**

If a link leaks resume state: remove `state={{resume:true}}` from that call site (only the Continue-studying cards in `Home.jsx:91-93` and `Book.jsx` should carry it). If the mount scroll is being overridden by a late reflow: after `window.scrollTo(0,0)` on a non-resume entry, ensure the scroll-anchor does not immediately re-restore (Task 1's epsilon guard should cover it; if not, skip the first anchor capture until the initial mount scroll settles).

- [ ] **Step 3: Verify**

Headless DOM sanity for the route plus manual: from homepage 5-star, a book page, and search, the reading opens at the top; from a Continue-studying card, it still resumes. Confirm `window.scrollY === 0` on discovery entry in a manual check.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Chapter.jsx
git commit -m "fix(nav): discovery links open readings at the top, resume stays opt-in"
```

---

### Task 3: `nav.activeReading` store key + global "Return to Reading" button (item 10)

**Files:**
- Modify: `src/lib/store.js` (new key + mutations)
- Modify: `src/pages/Chapter.jsx` (set active on mount)
- Create: `src/components/ReturnToReading.jsx`
- Modify: `src/main.jsx` (mount it in `Shell`)
- Test: `src/lib/store.activeReading.test.js`

**Interfaces:**
- Produces: `setActiveReading(rn)`, `clearActiveReading()`, and `nav: { activeReading: number|null }` on the blob. `toggleDone(rn)` clears `activeReading` when it marks `rn` done. `<ReturnToReading />` renders a fixed top-left button "Return to Reading {n}" when `nav.activeReading` is set and the current route is not that chapter; clicking navigates to `rpath(n)` with `state.resume`.

- [ ] **Step 1: Write the failing test**

```js
// src/lib/store.activeReading.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { setActiveReading, clearActiveReading, toggleDone, getState } from "./store.js";

test("setActiveReading stores the reading number", () => {
  setActiveReading(28);
  assert.equal(getState().nav.activeReading, 28);
});

test("marking the active reading done clears it", () => {
  setActiveReading(28);
  if (getState().done[28]) toggleDone(28); // ensure starting not-done
  setActiveReading(28);
  toggleDone(28); // mark done
  assert.equal(getState().nav.activeReading, null);
  toggleDone(28); // cleanup (un-done)
});

test("clearActiveReading resets to null", () => {
  setActiveReading(5);
  clearActiveReading();
  assert.equal(getState().nav.activeReading, null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/store.activeReading.test.js`
Expected: FAIL, `setActiveReading is not a function`.

Note: `store.js` reads `localStorage`; under Node it must tolerate its absence. If `getState`/`load` throw without `localStorage`, add a guard `const LS = typeof localStorage !== "undefined" ? localStorage : memoryShim;` at the top of `store.js` (a tiny in-memory object with getItem/setItem), so the pure store logic is testable. Implement that shim as part of this step if not already present.

- [ ] **Step 3: Write minimal implementation**

```js
// src/lib/store.js  (add near the other mutations)
export function setActiveReading(rn) {
  const s = load();
  save({ ...s, nav: { ...(s.nav || {}), activeReading: rn } });
}
export function clearActiveReading() {
  const s = load();
  save({ ...s, nav: { ...(s.nav || {}), activeReading: null } });
}
```

In `toggleDone`, clear when marking the active reading done:

```js
// src/lib/store.js  toggleDone (:51) — after computing `done`:
const nav = s.nav || {};
const nextNav = done[rn] && nav.activeReading === rn ? { ...nav, activeReading: null } : nav;
save({ ...s, done, nav: nextNav });
```

Update the shape comment at the top of `store.js` to document `nav: { activeReading }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/store.activeReading.test.js`
Expected: PASS, 3 tests.

- [ ] **Step 5: Set active on chapter mount, build the button, mount it**

In `Chapter.jsx`, when the reading mounts and is not done, mark it active (near the existing `touchVisited(rn)` call):

```jsx
// Chapter.jsx — in the mount effect, after touchVisited(rn)
import { setActiveReading } from "../lib/store.js"; // add to the existing store import
// ...
if (!getState().done[rn]) setActiveReading(rn);
```

Create the button:

```jsx
// src/components/ReturnToReading.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../lib/store.js";
import { rpath, readingMeta } from "../lib/meta.js";

export default function ReturnToReading() {
  const rn = useStore((s) => (s.nav ? s.nav.activeReading : null)); // primitive: #185-safe
  const loc = useLocation();
  const nav = useNavigate();
  if (!rn) return null;
  if (loc.pathname === rpath(rn)) return null; // already there
  const meta = readingMeta(rn);
  if (!meta) return null;
  return (
    <button
      className="return-to-reading"
      onClick={() => nav(rpath(rn), { state: { resume: true } })}
      title={`Return to Reading ${rn}: ${meta.t}`}
    >
      ← Return to Reading {rn}
    </button>
  );
}
```

Add a small theme-aware style for `.return-to-reading` (fixed top-left, below the nav, CSS variables only) to `src/styles/style.css`:

```css
.return-to-reading {
  position: fixed; left: 12px; top: calc(var(--nav-h) + 10px); z-index: 40;
  font-size: 0.78rem; padding: 0.3rem 0.6rem; border-radius: var(--rounded-el, 8px);
  color: var(--text-dim); background: var(--bg-raised); border: 1px solid var(--border);
  cursor: pointer; transition: color .15s, border-color .15s, background .15s;
}
.return-to-reading:hover { color: var(--text); border-color: var(--border-strong); background: var(--bg-hover); }
```

Mount it in `Shell` (hidden in fullscreen, like the other chrome):

```jsx
// src/main.jsx — inside Shell, near the nav
import ReturnToReading from "./components/ReturnToReading.jsx";
// ...
{!fullscreen && <ReturnToReading />}
```

- [ ] **Step 6: Remove the superseded §6 per-page back button**

The global button replaces the §6 concept-page back button (confirmed 2026-07-24). In `src/pages/ConceptPage.jsx`, remove the `fromReading` block (`:55-58`, the `{fromReading && (<Link ...>← Back to Reading {fromReading}</Link>)}`) and the now-unused `const fromReading = ...` (`:18`). Leave any other use of `location.state` intact.

- [ ] **Step 7: Verify build + render, commit**

Run the build gate over `#/concept/...` and `#/chapter/28`; grep prints `0`. FLAG for manual check: open R28 (not done), navigate to a concept page then a second concept page, confirm the button reads "Return to Reading 28" throughout and returns there; mark R28 done and confirm it disappears; confirm the concept page no longer shows its own duplicate back link.

```bash
git add src/lib/store.js src/pages/Chapter.jsx src/pages/ConceptPage.jsx src/components/ReturnToReading.jsx src/main.jsx src/styles/style.css src/lib/store.activeReading.test.js
git commit -m "feat(nav): global Return-to-Reading button replaces per-page back link"
```

---

### Task 4: "Next reading" marks the previous done and advances active (item 11)

**Files:**
- Modify: `src/pages/Chapter.jsx:526-529` (the bottom "Next" link)
- Test: covered by Task 3's store test plus a manual check.

**Interfaces:**
- Consumes: `toggleDone`, `setActiveReading` (Task 3), `nextRn` (`Chapter.jsx:222`).
- Produces: clicking bottom "Next reading" marks the current reading done (if not already), navigates to `nextRn`, and sets `nextRn` active.

**Decision (confirmed 2026-07-24):** "cleared" means marked DONE via `toggleDone`, so progress/streaks/planner update consistently.

- [ ] **Step 1: Convert the Next link to an action**

Replace the plain `<Link className="next" to={rpath(nextRn)}>` with a handler that marks done then navigates:

```jsx
// Chapter.jsx — near nextRn; add useNavigate if not already imported
const goNext = () => {
  if (nextRn == null) return;
  if (!getState().done[rn]) toggleDone(rn);  // clear the finished reading
  setActiveReading(nextRn);
  navigate(rpath(nextRn));
};
// in JSX, replace the Link with:
{nextRn ? (
  <button className="next" onClick={goNext}>
    <div className="k">Next reading</div>
    <div className="t">R{nextRn} · {readingMeta(nextRn).t}</div>
  </button>
) : null}
```

Keep the `.next` styling identical (button reset to match the old link: no default border/background, inherit the existing `.next` CSS).

- [ ] **Step 2: Verify build + render, manual check, commit**

Build gate green, grep `0`. FLAG manual: on R28, click bottom "Next reading"; R28 becomes done, the app navigates to the next reading, and the return button now tracks the new reading.

```bash
git add src/pages/Chapter.jsx
git commit -m "feat(nav): Next reading marks the previous done and advances active"
```

---

### Task 5: 45-minute hydration reminder (item 12)

**Files:**
- Create: `src/components/HydrationReminder.jsx`
- Modify: `src/main.jsx` (mount in Shell)
- Modify: `src/lib/store.js` (add `prefs.hydrationReminder`, default true, + setter)
- Modify: `src/pages/Settings.jsx` (toggle)

**Interfaces:**
- Produces: `setHydrationReminder(bool)`; a dismissible, non-blocking toast every 45 minutes of foreground time when enabled. NOT a browser dialog.

- [ ] **Step 1: Store flag + setter**

```js
// src/lib/store.js
export function setHydrationReminder(on) {
  const s = load();
  save({ ...s, prefs: { ...(s.prefs || {}), hydrationReminder: !!on } });
}
```
Document `prefs: { hydrationReminder }` in the shape comment. Default read is `s.prefs?.hydrationReminder !== false` (ON unless explicitly off).

- [ ] **Step 2: The reminder component**

```jsx
// src/components/HydrationReminder.jsx
import { useEffect, useState, useRef } from "react";
import { useStore } from "../lib/store.js";

const INTERVAL = 45 * 60 * 1000; // 45 minutes of foreground time

export default function HydrationReminder() {
  const enabled = useStore((s) => (s.prefs ? s.prefs.hydrationReminder !== false : true));
  const [show, setShow] = useState(false);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;
    // accumulate only foreground time; pause while the tab is hidden
    const id = setInterval(() => {
      if (document.hidden) { lastTickRef.current = Date.now(); return; }
      const now = Date.now();
      elapsedRef.current += now - lastTickRef.current;
      lastTickRef.current = now;
      if (elapsedRef.current >= INTERVAL) { setShow(true); elapsedRef.current = 0; }
    }, 15000);
    return () => clearInterval(id);
  }, [enabled]);

  if (!enabled || !show) return null;
  return (
    <div className="hydration-toast" role="status">
      <span>Time for a water break. Stretch, hydrate, back in a minute.</span>
      <button onClick={() => setShow(false)} aria-label="Dismiss">✕</button>
    </div>
  );
}
```

Add theme-aware `.hydration-toast` styles (fixed bottom-center, CSS variables) to `src/styles/style.css`.

- [ ] **Step 3: Mount + Settings toggle**

Mount `<HydrationReminder />` in `Shell` (visible even in fullscreen is fine; it is unobtrusive). Add a labeled toggle to `Settings.jsx` wired to `setHydrationReminder` and the `prefs.hydrationReminder` value, following the existing font-scale control's markup.

- [ ] **Step 4: Verify with a shortened interval, then restore**

Temporarily set `INTERVAL = 5000` and confirm in the browser: the toast appears once, is dismissible, does not steal focus or block clicks, and does not re-appear while the tab is backgrounded. Restore `INTERVAL` to 45 minutes. Build gate green, grep `0`.

- [ ] **Step 5: Commit**

```bash
git add src/components/HydrationReminder.jsx src/main.jsx src/lib/store.js src/pages/Settings.jsx src/styles/style.css
git commit -m "feat: 45-minute hydration-break reminder with Settings toggle"
```

---

### Task 6: META em-dash / formatting sweep (item 6)

**Files:**
- Modify: `src/lib/meta-data.js`

**Interfaces:**
- Produces: no em/en-dashes and no stray formatting in `META` user-facing strings (`blurb`, `why`, `prereqs`, `feeds`, reading `tag`, session `name`, thread/graph labels).

- [ ] **Step 1: Find the offenders**

Run: `grep -n '—\|–' src/lib/meta-data.js`
Expected: several hits, including the Book 4 blurb ("balance sheet — deposits, repos, transfer pricing, ALM"). Note each line.

- [ ] **Step 2: Rewrite each in context**

For each hit, replace the dash with a context-appropriate rewrite (comma, colon, parentheses, or full stop), NOT a blind regex. Example: "...how treasury manages the balance sheet, deposits, repos, transfer pricing, ALM." reads best splitting into two clauses: "...how treasury manages the balance sheet: deposits, repos, transfer pricing, and ALM." Also scan for stray double spaces and inconsistent quote characters while the file is open, and fix.

- [ ] **Step 3: Verify the gate + build + render**

```bash
grep -Rn '—\|–' src/lib/meta-data.js || echo "clean"
npm run build && cd dist && python3 -m http.server 4177 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=9000 --dump-dom "http://localhost:4177/index.html#/book/4" \
  | grep -c 'widget failed\|undefined<\|>null<\|tex-error'
```
Expected: grep prints `clean`; build green; the render grep prints `0`; the Book 4 blurb reads with no dash.

- [ ] **Step 4: Commit**

```bash
git add src/lib/meta-data.js
git commit -m "fix(content): purge em-dashes and formatting nits from META strings"
```

---

## Self-Review

**Spec coverage (against expansion-and-fixes-design.md section 1):**
- 1.1 scroll stability (items 7, 8) -> Task 1. 1.2 discovery-to-top (item 9) -> Task 2. 1.3 return button (item 10) -> Task 3. 1.4 next-clears-previous (item 11) -> Task 4. 1.5 hydration (item 12) -> Task 5. 1.6 META formatting (item 6) -> Task 6. All six covered.

**Placeholder scan:** Tasks 3-6 contain complete code. Tasks 1-2 are debugging tasks with a reproduce-first step and a concrete proposed fix keyed to the confirmed `scrollAnchor.js` mechanism; the exact diff depends on what the runtime repro shows, which is the honest shape for a bug of runtime-confirmed cause (the systematic-debugging sub-skill is required). No TBD/TODO left.

**Type consistency:** `nav.activeReading` is a `number|null` set by `setActiveReading`, read as a primitive in the `#185`-safe selector, cleared by `toggleDone` and `clearActiveReading`, consumed by `ReturnToReading.jsx` and Task 4's `goNext`. `prefs.hydrationReminder` is a boolean read as `!== false` (default ON) in both the component and Settings. `nextRn`/`rn` are reading numbers throughout. No drift found.

**Open items surfaced to the owner (from the spec's Assumptions):** Task 4 assumes "cleared" = marked done (confirm); Task 3 assumes the global button replaces §6's per-page back button (confirm before removing §6's version, which is out of this plan's scope anyway). Both are called out in the tasks.
