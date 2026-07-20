# Comfort-UI v2 + digestibility — implementation plan & session handoff (2026-07-20)

**READ THIS FIRST if you are a new session picking up.** This is the authoritative resume
point for the work started in the "seventh session" (see PROGRESS.md) and continued here.
Everything below is scoped to `react-site/` (the vanilla `site/` is frozen). Follow
`react-site/CLAUDE.md` for all conventions. The user needs this **usable on a phone by
tomorrow (2026-07-21)** for classroom reading — so **mobile responsiveness + the two
critical bugs are P0** and must land before any new feature.

Management model the user asked for: **Fable ideates, Sonnet 5 subagents execute, the main
session manages.** Fan out Sonnet agents on DISJOINT files only; the orchestrator owns shared
files (store.js, style.css, route/nav) and does all builds/verification (agents must NOT run
`npm run build` — they collide).

---

## 0. Status snapshot (what is done vs pending)

Shipped earlier today (seventh session, committed? NO — still uncommitted working tree):
floating-pill Key points (bottom-left), edge-tab "On this page" (right edge mid-height),
draggable global page-width handle, exact-position resume, section bookmarks + `/bookmarks`,
highlight toggle-off fix. See PROGRESS.md "Shipped 2026-07-20".

Pending in THIS plan (ordered by priority):
- [x] **P0 BUG 1** — resize handle never releases. FIXED (Chapter.jsx `onResizeDown`: capture DOM
      node/pointerId into locals, listen on `window`, handle pointercancel). Needs phone/browser
      confirm (drag then scroll normally; double-click resets).
- [x] **P0 BUG 2 (partial)** — `.edge-tab` had no base `display:none` → leaked below 1000px; FIXED
      (base rule added). Overflow hardening added (`overflow-wrap:break-word` + `min-width:0` on
      prose/cards/hy/misc; `.katex-display` scrolls; prose `code` wraps). Verified: no
      document-level overflow at 500px (`scrollWidth==clientWidth==500`), 0 render markers.
      NOTE: headless Chrome (macOS) clamps the viewport to a 500px minimum, so **true ≤390px
      reflow could NOT be verified headless** — the user must confirm on a real phone. The app's
      responsive CSS is otherwise solid (`.grid2/.grid3`≤760px→1col, `.misc-row`≤700px→1col,
      formulas/tables/widgets already have overflow scroll / max-width caps).
- [ ] **P0** — real-phone responsive confirmation + any residual fixes (bookmark toggle now
      `@media(hover:none)` visible; re-check nav, quiz, mock, accordions, both themes).
- [x] **P1** — local per-list resizers. DONE for the breakdown "At a glance" cards: new
      `lib/useEdgeResize.js` (shared bug-free drag hook), `components/chapter/Resizable.jsx`
      wrapper, store `layout.blockWidths` + `setBlockWidth`, `.breakdown-grid` flex-wrap so a
      widened card reflows the others. Desktop-only handle (<1100px hidden), double-click resets.
      Extend to other `.grid2` blocks (Connections/Hooks/Sources) later if wanted. Drag is
      interactive-only — needs browser confirm.
- [ ] **P1 FEATURE** — Flashcards card-engine (`lib/cards.js` + `<Flashcard>` + `/deck/:rn` +
      `/review` upgrade) — §5, Fable-designed, build-ready.
- [ ] **P1 CONTENT** — em-dash purge (8,280 across 101 files) + why-depth + tone pass — §6b.
- [ ] **P2 FEATURE** — digestibility mechanics M2–M7 (Trap check, Story mode, streak, etc.) — §6.
- [ ] Commit the P0 fixes once confirmed on a real phone.

Background agent in flight when this doc was written: **Fable ideation** (flashcards +
digestibility memo), agentId `a713ff8c85d299f36`. If its memo is not pasted into §5 below yet,
either wait for it, re-dispatch an equivalent Fable agent, or proceed with the interim
flashcards design in §4 (which is already concrete enough to build).

---

## 1. P0 BUG 1 — resize handle never releases (CONFIRMED root cause)

**Symptom (user):** "clicked it once, now I can't scroll — cursor continuously resizes the
window." The drag never ends; every pointer move keeps resizing.

**Root cause (confirmed by reading the code):** In `src/pages/Chapter.jsx`, `onResizeDown`
(currently ~lines 58–81) attaches `pointermove`/`pointerup` listeners and, inside the
`onMove`/`onUp` closures, references **`e.currentTarget`**. React nulls `currentTarget` on the
synthetic event after the handler returns, so when `onUp` later fires,
`e.currentTarget.releasePointerCapture(...)` / `.removeEventListener(...)` throw a TypeError
**before** the move listener is removed → the `pointermove` listener stays attached forever →
continuous resizing. `setPointerCapture` earlier also routes all pointer events to the handle,
so it never lets go.

**Fix (surgical):** Capture the DOM node and pointerId into locals at the top of
`onResizeDown` and use those everywhere; attach the move/up listeners to `window` (robust to
the pointer leaving the 14px handle); also handle `pointercancel`. Reset shape:

```js
function onResizeDown(e) {
  e.preventDefault();
  const el = e.currentTarget;          // capture BEFORE React recycles the event
  const pointerId = e.pointerId;
  const startX = e.clientX;
  const startW = rootRef.current.getBoundingClientRect().width;
  let lastW = startW;
  try { el.setPointerCapture(pointerId); } catch {}
  el.classList.add("dragging");

  function onMove(ev) {
    let w = startW + 2 * (ev.clientX - startX);
    w = Math.max(720, Math.min(window.innerWidth - 32, w));
    lastW = w;
    setDragWidth(w);
  }
  function end() {
    el.classList.remove("dragging");
    try { el.releasePointerCapture(pointerId); } catch {}
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
    setPageWidth(lastW);
    setDragWidth(null);
  }
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
}
```

**Verify:** in `npm run dev`, drag the handle, release — scrolling must be normal afterward;
double-click resets to default width. (Cannot be verified headless — pointer drag.)

---

## 2. P0 BUG 2 — mobile horizontal overflow (content clipped off the right)

**Symptom (confirmed via headless screenshot at 390px):** on a phone-width viewport the whole
column is wider than the screen — lead text, headings, nav ("Mind Map"), and section rules are
all clipped at the right edge. Desktop (1440px) is fine. Evidence screenshots were saved to the
scratchpad during diagnosis (`r63-mobile.png` clipped, `r63-desktop.png` clean).

**Root cause — NOT yet pinned (do this FIRST, do not guess).** The `.page` rule is
`max-width: var(--maxw); margin: 0 auto; padding: 2rem 1.4rem 6rem;` with `* { box-sizing:
border-box }` and `body { margin: 0 }`, so `.page` alone should shrink to the viewport. Something
is forcing `document.documentElement.scrollWidth > window.innerWidth`. **First task: measure and
locate the culprit**, e.g. run a DevTools-protocol/puppeteer snippet (or add a temporary inline
script) that prints `scrollWidth`, `innerWidth`, and the widest offending elements:
```js
const vw = document.documentElement.clientWidth;
[...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > vw + 1)
  .map(el => `${el.tagName}.${el.className}  right=${Math.round(el.getBoundingClientRect().right)}`)
```
Puppeteer is NOT confirmed installed — check `react-site/node_modules/.bin/`; if absent, add a
throwaway `<script>` in a temp built page, or use the CDP over `--remote-debugging-port`.

**Leading hypotheses (verify, then fix the real one — likely several compound):**
1. **`.edge-tab` has no base `display:none`.** It is defined ONLY inside
   `@media (min-width:1000px)` in `style.css`. Below 1000px the collapsed `<button
   className="edge-tab right">` (rendered by `ChapterTOC` when closed) has NO display rule → it
   shows as a stray static button on mobile. Add `.edge-tab { display: none; }` OUTSIDE the media
   query (mirror how `.corner-pill`/`.rail-panel` each have a base `display:none`). Confirm this
   isn't also contributing width.
2. **Long `nowrap` inline content.** `code, .formula { white-space: nowrap }` and
   `.formula-block .f-math { white-space: nowrap; overflow-x: auto }` — a long inline `code`
   span or an un-wrapped formula can push the paragraph wider than the viewport. Fixes: give
   prose containers `overflow-wrap: anywhere` / `min-width: 0`; ensure every wide block
   (`.f-math`, `.f-tex`, tables via `.tablewrap`, widgets) is inside an `overflow-x:auto`
   scroller with `max-width:100%`.
3. **`.grid2` two-column blocks** may not collapse to one column on mobile → each column keeps a
   min-content width and overflows. Add a mobile breakpoint: `@media (max-width: 640px){ .grid2{
   grid-template-columns: 1fr; } }` (confirm `.grid2` is a grid; adjust selector to reality).
4. **Widgets / SVG `visual` blocks** with intrinsic widths — cap with `.widget svg,{ max-width:
   100%; height:auto }` as needed.

**Belt-and-suspenders:** add `html, body { overflow-x: hidden; max-width: 100%; }` ONLY after the
real culprit is fixed (never as the sole fix — it hides overflow without curing it, and can
break `position: sticky`/scroll-into-view). Prefer fixing the offending element.

**Verify:** re-screenshot at 390px and 360px; the measurement snippet must report zero elements
past the viewport; nav, lead, headings, cards, formulas all fit; formulas/tables scroll inside
their own box, not the page.

---

## 3. P0 — full mobile responsive audit (needed for "phone tomorrow")

Go through the app at 360/390/414px widths (emulated + ideally a real phone). Checklist:
- [ ] Fix §2 overflow first (blocks everything).
- [ ] `.edge-tab`, `.corner-pill.left`, `.rail-panel`, `.page-resize` — all correctly HIDDEN
      below their breakpoints (1000px rails, 1100px resize). The pills/edge-tab are desktop
      affordances; on mobile the TOC/Key-points should be reachable another way OR simply hidden
      (acceptable for v1 — reading + scrolling is the mobile priority). Decide & document.
- [ ] Notes FAB (`QuickNotes.jsx`, `fixed bottom-5 right-5`) reachable and not overlapping.
- [ ] `.topnav` (`overflow-x:auto`) scrolls horizontally without forcing body width; consider a
      condensed mobile nav if it feels cramped (P1, not P0).
- [ ] Tap targets ≥ ~40px; section bookmark ☆ toggle is reachable by tap (currently reveals on
      hover — on touch there's no hover, so make it always-visible on mobile via
      `@media (hover: none) { .bookmark-toggle { opacity: 1 } }`).
- [ ] Quiz/mock option buttons, accordions, recall cards usable at narrow width.
- [ ] `/bookmarks`, `/highlights`, `/notes`, `/review`, home, book pages all fit.
- [ ] Test both light & dark themes.

Render/verify commands (mobile screenshots):
```bash
cd react-site && npm run build && cd dist && python3 -m http.server 4188 &
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --window-size=390,1600 \
  --screenshot=/tmp/m.png "http://localhost:4188/index.html#/chapter/63"   # then Read /tmp/m.png
```

---

## 4. P1 — local per-list resizers (keep the global page resizer too)

**User ask:** the global page resizer is fine to keep, but ALSO allow resizing individual
lists/cards (e.g. the "Six sources of funding liquidity" breakdown card) so the user can widen a
specific block to read it comfortably.

**Design (proposed — confirm with user if unsure, but this is safe to build):**
- Introduce a small reusable wrapper, e.g. `src/components/chapter/Resizable.jsx`, that wraps a
  block and renders a drag handle on its right edge (same `.page-resize`-style affordance,
  scoped). Width persisted per BLOCK KEY in the store so it survives reloads.
- Store: extend `layout` with `blockWidths: { [key]: px }`, plus `setBlockWidth(key, px)` /
  reset. Key = `${rn}:${blockId}` (stable per reading + section, e.g. the breakdown card index
  or the section slug). All optional-key rules from CLAUDE.md apply.
- Apply to the enumerable-list blocks first: the `breakdown` cards and the `grid2` blocks in
  `Chapter.jsx` (`At a glance`, `Connections`, `Memory hooks`, `Go deeper`). Each resizable block
  gets `maxWidth` from its stored width; double-click handle resets.
- Reuse the SAME robust pointer-drag pattern from §1 (the fixed version) — do NOT reintroduce the
  `e.currentTarget` bug. Consider extracting the drag logic into a tiny hook
  `useEdgeResize({ onCommit })` shared by the page resizer and block resizer.
- Mobile: local resizers hidden below 1100px like the global one (widening is a desktop need;
  mobile is single-column).

**Files:** new `Resizable.jsx` (or `useEdgeResize.js` hook) + `Chapter.jsx` (wrap blocks) +
`store.js` (blockWidths) + `style.css` (scoped handle class). store.js/style.css are
orchestrator-owned; the component/Chapter wiring can be one Sonnet agent.

---

## 5. P1 FEATURE — Flashcards review mode

**Goal:** phone-first active-recall over each reading's concepts, for short low-focus bursts.
Complement (do not duplicate) the existing `/review` SM-2 queue (`store.srs`, over `recall`
cards) and the per-reading `Active recall` section.

**Interim concrete design (build this if Fable's memo hasn't landed — see below):**
- New lazy page `src/pages/Flashcards.jsx` at `/flashcards` (+ `/flashcards/:rn` for a single
  reading). Add route in `main.jsx`, Study-menu entry in `Nav.jsx`, `PAGES` entry in
  `CommandPalette.jsx` (orchestrator-owned wiring, same pattern as `/bookmarks`).
- Card sources (all EXISTING fields, no new content authoring):
  `concepts[]` → front: `name` (+ optional `pitfall`/`counter` as a prompt); back: `def` +
  `intuition` + `memory`. Also fold in `recall[]` (q→a) and `misconceptions[]` (wrong→right as a
  "spot the trap" card). Keep card types tagged.
- Interaction: one card at a time; tap/click or swipe to flip; self-grade (Again/Good/Easy)
  which feeds the SAME SRS engine (`gradeCard`) so flashcards and `/review` share scheduling —
  give flashcard cards stable ids (e.g. `fc:${rn}:concept:${i}`). Big tap targets, minimal chrome.
- Scope selectors: this reading / this book / due-only / whole course. Streak + count tally.
- Phone ergonomics: full-width card, thumb-reachable grade buttons at the bottom, keyboard
  (Space=flip, 1/2/3=grade) on desktop.
- Deep link: `Flashcards.jsx` reachable from the Chapter page ("Review these as flashcards →").

**Fable's memo LANDED (2026-07-20) — decisive design, supersedes the interim sketch above:**
The insight: enrichment already authored flashcard-shaped content into all 101 readings
(`concepts.name/def/intuition/memory`, `misconceptions.wrong/right`, `connections.confused.
what/how`, `hooks`, `recall`), but only `recall` is reachable, via a desktop `/review`. So this
is a **packaging problem, not a content problem — zero new authoring for the top 3.**

- **Do NOT build a second flashcards system next to `/review`.** One engine, two doors.
- **New `src/lib/cards.js` — `cardsForReading(data, rn)`** returns typed cards from existing
  fields, with PREFIXED ids so the existing `srs` blob needs **no migration**:
  - `recall` → id `"${rn}:${i}"` (UNCHANGED — preserves every user's SRS history), front `q` / back `a`.
  - `concept` → id `"c${rn}:${i}"`, front `name`(+kicker) / back `def` + dimmer `intuition` + `memory` as a mnemonic strip.
  - `trap` → id `"m${rn}:${i}"`, front `misconceptions[i].wrong` ("Sounds right — what's the flaw?") / back `.right`.
  - `versus` → id `"x${rn}:${i}"`, front `confused[i].what` / back `.how`.
  All fields optional → builder skips absent ones (defensive-rendering standard).
- **New `src/components/Flashcard.jsx`** used by BOTH `/review` and a new per-reading deck:
  tap=flip (CSS `rotateY` 180ms, `prefers-reduced-motion` instant fallback); after flip,
  horizontal swipe past ~60px commits a grade (right=Good, left=Again) with green/red edge glow;
  4 grade buttons remain in a `position:sticky;bottom:0` thumb row; keep Space+1–4 keyboard
  (input-guarded). Chrome via `.card`, book `.kicker`, type chip, `n/N` in font-mono; back via `<Html>`.
- **New lazy route `/deck/:rn`** — cram mode: ALL of a reading's cards (ignores due dates),
  ordered concept→versus→trap→recall; grades still write to `srs`, so **drilling a deck is how
  concept/trap/versus cards ENTER the global spaced queue.** Entry points: a "Drill this reading —
  N cards" chip in the Chapter header + an end-of-chapter CTA after Quiz.
- **`/review` upgrade + flood policy (important):** swap its inline markup for `<Flashcard>` and
  add the new card types, BUT `dueCards` treats untracked ids as due → adding ~1,500 new ids
  would flood day one. Partition (new helper `partitionCards` in `cards.js`, do NOT mutate
  `dueCards`): **due** (tracked, `due<=now`, includes untracked recall exactly as today) shown
  first; **new** (untracked concept/trap/versus) shown after, **capped 10/session**, prioritized
  by reading-done then `highYield` stars, with a "bring in more" bypass button.
- **Shared `useSwipe(ref,{onLeft,onRight,onTap})` hook** in `src/lib/` (pointer events only, no
  gesture lib) — reused by Flashcard, Trap check (§6), Story mode (§6). Reuse the fixed
  pointer-drag pattern from §1; NEVER reintroduce the `e.currentTarget` bug.
- Store: no new key required for flashcards (namespaced `srs` ids only); select raw `s.srs`,
  derive with `useMemo` (#185 rule).

---

## 6. P2 FEATURE — "digestible theory" mechanics (Fable-led)

The user's thesis: FRM Part II theory (operational risk, governance, model risk) is dry and hard
to retain in a crunch; make it memorable/fun on a phone WITHOUT deviating from curriculum or
inventing content. Fable's full mechanics slate (build order M1→M2→M3→M4→M5→M7→M6; all reuse
existing fields, all plain React+SVG+CSS, all phone-first):

| # | Mechanic | Reuses fields | Interaction | Effort |
|---|----------|---------------|-------------|--------|
| **M1** | **Card engine + per-reading decks** (`/deck/:rn`, §5) — the platform everything rides on | recall, concepts, misconceptions, confused | tap-flip, swipe-grade | M |
| **M2** | **Trap check game** (`/traps`) — binary Legit/Trap swipe over `misconceptions` (both polarities already authored → no content work); error-based learning trains the exact trap-spotting skill FRM tests; instant paired correction + log-miss to error log | misconceptions.wrong (Trap) + .right (Legit) | swipe L/R, Arrow keys | S–M |
| **M3** | **Story mode** (`/story/:rn`) — the "tired on a commute" answer: re-renders `tagline→eli5→intuition→thinkLike→hooks→summary` as full-screen ONE-idea-per-slide tap-through (split HTML at `</p>`, merge <120-char fragments); segmented progress bar; final slide → "Drill the deck"/"Read full chapter" | tagline, eli5, intuition, thinkLike, hooks, summary | tap-through slides, swipe | M |
| **M4** | **Streak + daily goal** — flame chip in Nav (≥2), goal ring on `/review`, 8-week heat strip on `/progress`; consistency is the real retention lever | none (meta) | glanceable | S |
| **M5** | **Mnemonic strip** — surface `concepts.memory` + `hooks` as a first-class styled strip (accent-soft bg, "HOOK" label) on card backs, concept cards, + "Hook of the day" on Home | concepts.memory, hooks | visual | S |
| **M7** | **Two-minute sprint** — one button, 120s countdown, cards-cleared count, biased to weak readings (`quiz.best<70`/SRS lapses); feeds streak | rides on M1 | timeboxed | S |
| **M6** | **Bucket sort drill** — classify one `breakdown` point into its list via tap-to-classify chips (NO drag); defer — truncation quality needs a content spot-check | breakdown.title/.points | tap-classify | M |

Store addition for M2/M4/M7: one optional key `activity: { [yyyymmdd]: { cards, traps, sprints } }`
+ `bumpActivity(kind)`, pruned ~370d; streak/goal DERIVED via useMemo (never in selector).
Fable's guardrails: NO parallel flashcards app (one `srs`, two doors); NO XP/levels/confetti
(streak+ring is the gamification ceiling); NO animation/gesture deps (pointer events + CSS only);
strip wrapping quotes from some `misconceptions.wrong` strings at display time (not authoring).

**Gate:** M1 (the engine + `/deck` + `/review` upgrade) is the P1 flashcards feature (§5) and can
proceed once P0 ships. M2/M3+ are NEW surfaces — confirm the shortlist with the user before
building each, but the designs above are build-ready. P0/P1 ship first regardless.

---

## 6b. P1 CONTENT — em-dash purge + tone/why-depth pass (user directive 2026-07-20)

The product owner gave binding content feedback (now also codified in `react-site/CLAUDE.md`
§1.7 + "Prose style — HARD RULES"):
1. **No em-dashes or en-dashes anywhere** in user-facing content. Current state: `—`/`–` appear
   **8,280 times across all 101 data files** (`grep -roE '—|–' src/data | wc -l`). A blind
   `sed` replace is FORBIDDEN — it produces broken grammar in thousands of spots. Each dash needs
   a context-appropriate rewrite (comma, colon, parentheses, or a full stop; often a full stop
   or colon reads best).
2. **Preempt "why?"** — the app must never make the student reach for another AI. The exemplar
   failure the user hit is in **r63**: the "deposits have become LESS stable over time" point
   asserts a counterintuitive fact without its mechanism. Counterintuitive claims must carry the
   causal chain, **sourced from Schweser, never invented**. Simpler where students struggle, but
   never oversimplified; give counterintuitive points MORE room.
3. **Tone humanization** may not have reached all 101 readings — verify/redo as part of the pass.

**Execution (Sonnet fleet, one agent per data file):** since each agent re-reads its file
anyway, do all three in ONE pass per file: (a) rewrite every `—`/`–` into natural punctuation,
(b) find counterintuitive assertions and add the sourced mechanism, (c) warm the tone. Each agent
gets the file + the relevant Schweser source path (root `Book N (1).md` / `FRM2_*_CompleteBookN.md`)
and MUST NOT invent facts. **Gate each file:** `node scripts/validate-reading.mjs bookN/rNN.js NN`
AND `grep -Rn '—\|–' src/data/bookN/rNN.js` returns nothing, then import-sweep. This is ~101
agents — batch in waves, orchestrator builds/validates after each wave (agents never build).
Start with r63 as the reference example so the user can approve the depth/tone bar before the
full fleet runs. Scope note: this is large; it is P1 (after the P0 phone fixes), and can run in
parallel waves across sessions — track completion per-file in PROGRESS.md.

## 7. Execution strategy & house rules (do not skip)

- **Fix order:** §1 → §2 → §3 (P0) → commit a working mobile build → §4 → §5 → §6.
- **Fan-out safety:** orchestrator owns `store.js`, `style.css`, `main.jsx`, `Nav.jsx`,
  `CommandPalette.jsx`. Sonnet agents get DISJOINT component/page files with the exact store +
  CSS-class contract pasted in. Agents must NOT run builds/linters/formatters or touch files
  outside their assignment.
- **Store rules (CLAUDE.md):** every new key optional; mutations spread previous state; selectors
  return STABLE identities (raw slice + `useMemo`, or a primitive) — object-building selectors
  cause React #185 infinite loops. New keys documented in the shape comment atop `store.js`.
- **Colors:** CSS variables only, both themes; no hex (except the documented mind-map/highlight
  exceptions).
- **Verification (nothing ships without it):** `npm run build` green with no new warnings;
  import-sweep touched files; headless render-check (`grep -c 'widget failed\|undefined<\|>null<\|
  tex-error\|Minified React error'` must be 0) at BOTH desktop AND 390px mobile; screenshot-Read
  key pages. Interactive bits (drag, flip, highlight toggle, bookmark tap) can't be verified
  headless — flag for the user to test on the phone.
- **Update PROGRESS.md** and this file's checkboxes before ending any session.

## 8. Key file/line references (as of this writing)

- `src/pages/Chapter.jsx` — resize handlers ~L58-86 (BUG 1); resume L47-56, L128-145; scroll-save
  L147+; `<main className="page" ...>` L~166 with `appliedWidth` maxWidth; 17× `<SectionLabel
  rn={rn}>`; `<ChapterTOC sections rn>`.
- `src/components/chapter/ChapterTOC.jsx` — edge-tab collapsed render (`.edge-tab right`),
  panel `.rail-panel right`.
- `src/components/chapter/KeyPoints.jsx` — `.corner-pill left` / `.rail-panel left`.
- `src/components/chapter/SectionLabel.jsx` — `.bookmark-toggle` (hover-reveal → make tap-visible
  on mobile).
- `src/components/QuickNotes.jsx` — notes FAB `fixed bottom-5 right-5 z-40`.
- `src/lib/store.js` — `layout{pageWidth,keyPointsOpen,tocOpen}`, `bookmarks`, `lastVisited{y,
  section}`, plus mutations. Add `layout.blockWidths` (§4) + flashcard SRS reuse (§5).
- `src/styles/style.css` — `.page` L155; rails/edge-tab/resize block ~L485-560; `.grid2`,
  `.formula-block`, `.card`, `.section-label`, `.bookmark-toggle` (search by name).
- `src/main.jsx`, `src/components/Nav.jsx` (`STUDY_ITEMS`), `src/components/CommandPalette.jsx`
  (`PAGES`) — route/nav registration pattern (copy the `/bookmarks` wiring).
