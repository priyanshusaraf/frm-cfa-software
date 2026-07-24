# Block Review pilot (Phase 0 subsystem #3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development (recommended)
> or superpowers:executing-plans. Steps use `- [ ]` checkboxes. Pure-logic tasks use
> superpowers:test-driven-development (`node --test`), write the failing test first.

**Goal:** Build ONE end-to-end **dynamic Block Review** over a single finished study block, to set
the Phase 0 review-mechanism bar (roadmap workstream G). "Dynamic" means composed at RUNTIME from
per-reading atoms that already exist in the reading data, NO backend and NO runtime LLM. The review
has two segments: an **overview** (a through-line + each reading's tagline/summary + top highYield)
and an **active-recall consolidation round** (the block's `recall` + a few `quiz` MCQs +
`misconceptions` trap-checks) that, on completion, **graduates its cards into the existing SRS
queue** so retention compounds.

**Architecture:** A pure composition module (`src/lib/blockReview.js`) over `buildBlocks()`
(already built, `src/lib/studyPath.js`) + the readings map; a tiny authored through-line table with a
metadata-composed fallback; one lazy `/block-review/:blockId` page reusing the existing Quiz/Review
UI and the existing `gradeCard`/`srs` engine for graduation; and eligibility/surfacing CTAs derived
from `done` + `buildBlocks()` (a block is eligible when every reading in it is done). Everything the
review shows is already Schweser-sourced; it re-composes, it never invents.

**Tech Stack:** Vite + React 18, plain JSX, react-router HashRouter, `src/lib/store.js`
(`useSyncExternalStore`), Node 18.20 `node:test` for pure logic. No new dependencies.

## Global Constraints
- No new npm dependencies. `src/lib/meta-data.js` is the single source of structure; derive.
- Pure functions in `blockReview.js`: no store, no React, no `Date.now()` inside them (callers pass
  data). Deterministic + unit-testable.
- Store rules: any new key OPTIONAL, mutations spread previous state, selectors return STABLE
  identities / primitives (object-building selectors cause React #185). Reuse the EXISTING `srs`
  map and `gradeCard`/`dueCards` for graduation, do NOT add a second SRS engine.
- Graduation uses the EXISTING card-id scheme so cards land in the same `srs` queue Review.jsx reads:
  recall `"rn:i"`, highYield `"rn:hy:i"`, lists `"rn:list:id"` (see Review.jsx). Quiz-derived and
  misconception trap-checks that have no existing id scheme graduate as recall-style ids only if they
  map to a real atom; otherwise they are in-session-only (do NOT invent colliding ids).
- No em/en-dashes in any new user-facing string (through-line copy, labels). CSS-variable colors only.
- Readings load lazily (`useAllReadings()` returns null while loading; render a loading state).
- Verification per CLAUDE.md §4: `npm run build` green; render-check over http://localhost:4177
  (grep `widget failed|undefined<|>null<|tex-error` = 0 AND assert real page CONTENT is present, a
  React render-throw yields a blank body that passes a marker-only grep). Interactive answering /
  grading flagged for manual, never claimed headless.
- Subagent-driven: one implementer per task, Opus review between, at most 5 concurrent. Subagents
  touch only their files, never build, never git stash/reset. Orchestrator builds/render-checks/commits.

**Reference (verified in code):**
- `src/lib/studyPath.js`: `buildBlocks(meta?, moves?)` -> `[{ id, kind:"schweser-session"|"curated-cluster", name, bookN, readings:[n...] }]`.
- `src/lib/store.js`: `gradeCard(cardId, grade)` (:99), `dueCards(allIds, now)` (:112), `srs:{[cardId]:{ease,ivl,due,reps}}`, `done:{[rn]:true}`.
- `src/pages/Review.jsx`: SRS card ids `"rn:i"` / `"rn:hy:i"` / `"rn:list:id"`; consumes `dueCards`/`gradeCard`.
- Reading data atoms (per `bookN/rNN.js`): `summary`, `tagline`, `highYield:[{stars,what,why}]`, `recall:[{q,a}]`, `quiz:[{q,options,answer,why}]`, `misconceptions:[{wrong,right}]`.
- `src/main.jsx`: lazy routes + `<Route path>`; new pages also get a Nav Study-menu entry + a CommandPalette `PAGES` entry.

---

### Task 1: `composeBlockReview()` pure composition
**Files:** Create `src/lib/blockReview.js`; Test `src/lib/blockReview.test.js`.
**Interfaces:**
- Consumes: a block `{ id, name, kind, bookN, readings:[n] }` and a `readings` map `{ [rn]: <readingData> }` (the caller supplies both; keeps the fn pure/testable).
- Produces: `composeBlockReview(block, readings, throughlines?)` ->
  `{ id, name, throughLine:{ text, source:"authored"|"composed" }, overview:[{ rn, title, tagline, summary, topHighYield:[{stars,what}] }], recallCards:[{ id:"rn:i", rn, q, a }], quizItems:[{ rn, q, options, answer, why }], trapChecks:[{ rn, wrong, right }] }`.
- Rules: overview items in block-reading order; `topHighYield` = that reading's highYield with stars>=4, cap 2; recallCards use the EXISTING `"rn:i"` id scheme; quizItems capped (e.g. <=1 per reading, <=6 total); trapChecks = each reading's misconceptions (cap 1 per reading). Missing atoms are skipped defensively (never throw on a reading lacking `recall`/`quiz`/etc.). Through-line: if `throughlines[block.id]` exists use it (`source:"authored"`), else compose a terse metadata line from the block name + reading count + first/last reading titles (`source:"composed"`), never invented facts.
- [ ] Step 1: failing test (compose over a 2-3 reading synthetic block asserting overview order, `"rn:i"` ids, caps, and defensive skip of a reading missing `recall`). Step 2: run RED. Step 3: implement. Step 4: run GREEN. Step 5: commit.

### Task 2: authored through-line table + store seen-record
**Files:** Create `src/data/blockThroughlines.js`; Modify `src/lib/store.js`; Test `src/lib/store` (extend).
**Interfaces:**
- `src/data/blockThroughlines.js`: `export const throughlines = { [blockId]: "<Schweser-sourced paragraph: what this block covers, key points, how it connects to the overall narrative>" }`. Seed 1-2 entries (the pilot block + one more), functional prose, NO em/en-dashes. Flag them in `content-flags.md` for the Phase 5 polish.
- `store.js`: new OPTIONAL key `blockReview: { [blockId]: { seenTs } }` + `markBlockReviewSeen(blockId)` (spread-prev). Document in the shape comment. A stable primitive/raw-slice selector for reading it.
- Graduation reuses `gradeCard` (no new mutator).
- [ ] Steps: TDD the `markBlockReviewSeen` mutator (set/read); implement; commit.

### Task 3: eligibility + surfacing CTAs
**Files:** Create `src/lib/blockEligibility.js` (pure) + test; Modify `src/pages/Planner.jsx` and `src/pages/Chapter.jsx` (CTAs).
**Interfaces:**
- `blockEligibility(blocks, done)` -> for each block `{ block, allDone:boolean, lastReading:number }`. Pure.
- Planner: for each fully-done block, a "Review this block ->" CTA linking `/block-review/{block.id}`.
- Chapter: at the END of the last reading of a block (compute via buildBlocks + this reading's block membership), an additive "Block complete: review it ->" CTA. MUST NOT hijack the curriculum prev/next or `[`/`]` (roadmap §9-A rule). Only shows when that reading is the block's last AND all block readings are done.
- [ ] Steps: TDD `blockEligibility`; wire the two CTAs; build + render-check; commit. FLAG interactive CTA behavior for manual.

### Task 4: `/block-review/:blockId` page (overview + active-recall + graduation)
**Files:** Create `src/pages/BlockReview.jsx`; Modify `src/main.jsx` (lazy route), `src/components/Nav.jsx` (Study menu, optional), `src/components/CommandPalette.jsx` (PAGES entry).
**Interfaces:**
- Route `/block-review/:blockId`. Resolve the block via `buildBlocks()` by id; if not found, honest empty state ("This block is not ready yet..."). Load readings via `useAllReadings()` (render a loading state while null).
- Render: (1) OVERVIEW = through-line (labeled "authored" vs auto-composed is not shown to the user, but composed ones are terser) + each reading's tagline/summary + top highYield, in block order; (2) ACTIVE-RECALL round = recallCards + quizItems + trapChecks answered ACTIVELY (reuse the existing Quiz.jsx answer UX for quizItems; a reveal-then-self-grade UX for recall/trap, same as Review.jsx's grading). On finishing the round, call `gradeCard(id, grade)` for each graded recall/highYield card so they GRADUATE into the ongoing `srs` queue, and `markBlockReviewSeen(blockId)`.
- Reuse existing components/patterns (Quiz.jsx, the Review.jsx grading buttons, `<Html>` for content fields, KaTeX via `<Html>`). CSS-variable colors, existing `.card`/`.section-label`/`.chip` classes.
- [ ] Steps: build the page; add route + palette entry; build + render-check (`/block-review/<a-real-block-id>` from `node -e` buildBlocks, assert overview CONTENT present, 0 markers); commit. FLAG the answer/grade/graduation flow for manual verification (cannot be exercised headless).

### Task 5: pick the pilot block + end-to-end wiring check
**Files:** none new (config/verification).
- Choose the pilot block: a small, cohesive, early block whose readings a test user can mark done, e.g. Book 1 "Correlation Risk" (7,8,9) or the curated "Portfolio credit and copulas" cluster (27,28,29). Author its through-line (Task 2). Confirm end-to-end: mark the block's readings done -> Planner + Chapter CTAs appear -> open the review -> overview composes -> active-recall round -> cards graduate into `srs` (verify a new due card appears in Review.jsx for one of the block's `"rn:i"` ids). FLAG the full flow for manual browser verification.
- [ ] Build + full render-check pass; update PROGRESS.md + the ledger.

---

## Self-Review
- Spec coverage (roadmap §G "dynamic Block Review"): runtime composition from atoms -> Task 1; authored-vs-composed through-line -> Tasks 1+2; active-recall that graduates into SRS -> Task 4 via existing `gradeCard`; trigger when a block is fully done + surfacing -> Task 3; one end-to-end pilot -> Task 5. Store shape (`blockReview` optional key, graduation via existing SRS) -> Task 2.
- Deferred to Phase 1 (full system, out of this pilot): the metadata-composed through-line using the full ReadingArc machinery (§9-B), block-review re-openability polish, and per-block completion analytics. This pilot proves the mechanism on one block.
- Invents nothing: every atom is already Schweser-sourced; through-lines are authored from Schweser (flagged for Phase 5 tone polish) or terse metadata composition.
- No em/en-dashes; CSS-variable colors; store keys optional + spread-prev + stable selectors; no new deps; reuses the existing SRS engine (no second engine).
