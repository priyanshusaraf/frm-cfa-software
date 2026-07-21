# Learning-coherence design: narrative, planner, lists, and visual builders (2026-07-21)

**Status: SCOPED, not built.** This is the design the eleventh session brainstormed with the
product owner. It captures the next major build after the section 8 content-quality pass.
Follow `react-site/CLAUDE.md` (especially section 1, section 1a problem-first doctrine, and
section 8) for all conventions. Nothing here is implemented yet.

## The problem (one thesis, four symptoms)

The owner's feedback, grounded in specific readings: the student cannot feel the story. This
shows up in four places, all the same failure of coherence.

1. **No sense of the arc.** A reader moves from a reading where they are hedging risk into one
   where they are suddenly discounting derivatives, with no signal of where they are in the
   overall story or what basis/perspective the new reading operates from. Confirmed concretely
   in R29 ("Credit Risk in Derivatives"), which the audit found is a self-described "bridge
   reading" cramming six unrelated things (hazard-rate recap, ISDA mechanics, CVA/DVA, netting,
   reduced-form vs structural correlation, one-factor Gaussian copula) with three unrelated
   formulas in one box. Its own `why` field admits it "rushes through" ideas that R37 develops
   properly, 8 readings later. R26 (portfolio credit risk / Vasicek WCDR) and R28 (tranche
   correlation) were flagged with the same incoherence. This is a pattern in the 3-star-plus
   dense readings, not one bad file.
2. **Formulas with no purpose.** Across several readings a formula is dropped on the reader
   without telling them what to DO with it or where it gets reused later. The reader is handed
   a tool with no job.
3. **Curriculum order scatters what belongs together.** The motivating example: a CVA reading
   that only pays off in CVA readings many chapters later should not be studied in isolation
   now, when the payoff context does not exist yet. The raw material to cluster intelligently
   already exists in `meta-data.js` (per-reading `deps`, named `sessions`, 6 cross-cutting
   `threads`, an 86-edge concept `graph`, cross-book `prereqs`/`feeds`) but the planner ignores
   all of it and distributes readings in raw `r.n` order.
4. **Attention lost to dead-end lists and text-only visuals.** The "lists that matter"
   (`breakdown[]`) compress intel into bullets with no exposition: the reader scans a list,
   waits for the explanation, and finds the list simply ends. Separately, inherently visual
   content (correlation tables/matrices; economic balance sheets, as in R63) is rendered as
   prose blobs that fail to teach. This will get worse as CFA accounting/FSA material (which is
   balance-sheet and table heavy) is added.

The compressed-PDF companions exist for exactly this reason: to see the story and make study
sessions feel rewarding. The product must deliver that itself.

## Decisions locked with the owner (do not re-litigate without asking)

- **Sequencing model: HYBRID.** Auto-derive a base order (topological sort of `deps` within
  each `sessions` group), then apply a small hand-authored override table for the known
  problem spots. Not pure-automatic (would not fix semantic grab-bag/preview cases), not
  fully hand-curated (too much authoring).
- **Narrative: BOTH layers.** An auto breadcrumb on every reading (from metadata) PLUS an
  authored arc opening on the 3-star-plus dense readings.
- **List exposition schema is backward-compatible.** A `breakdown` point may stay a plain
  string or become `{ point, explain }`; the exposition is always visible, never hidden behind
  a click (hiding it repeats the very problem being fixed).
- **Visual builders are infrastructure, not one-offs.** This reverses the deferral of Fable's
  section 6c "progressive balance-sheet visual" (previously parked in CLAUDE.md section 8.6):
  it is now in scope and generalized, because CFA accounting/FSA material will need it in
  force.
- **Honest framing.** The planner is presented as exam-weighted coverage prioritized to finish
  with revision time to spare. It is NOT dressed up as a statistical "probability of passing"
  model; inventing that precision is banned the same way inventing content is.

---

## Workstream A: the planner as the study spine

Today `Planner.jsx` already takes an exam date, spreads not-done readings weighted by `hy`
stars, and reserves the final ~15% as a revision block, re-balancing as readings are marked
done. It only lacks intelligent order and a start date, and nothing else in the app follows
the plan. Changes:

- **`src/lib/studyPath.js` (new)** exports `orderedReadings()`: builds the base sequence as a
  topological sort of each reading's `deps`, kept inside its `sessions` grouping and book
  order, so prerequisites always precede dependents and a session's readings stay contiguous.
  Then it applies the override table (below). Returns the same reading objects the planner
  already consumes, just reordered. Pure function, no store reads, unit-test friendly.
- **`src/data/studyPath.js` (new, authored)** is the small curated override table. Each entry
  relocates or clusters whole readings, with a reason string, for example:
  `{ move: 29, near: 37, why: "R29's CVA/DVA is a running start for R37; study them adjacent" }`.
  Kept deliberately small: only the clusters that are genuinely confusing in curriculum order
  (the CVA family, the IRB-capital reuse R21<->R59, the copula chain R27/R28/R29). Anything
  not listed keeps its auto position. This file is the single place a human tunes the path.
- **`planner.startDate` (new optional store key)**, defaults to today. The plan window becomes
  `[startDate .. examDate]`; the final ~15% revision block is unchanged. Both dates editable in
  the planner UI (two date inputs). All store rules from CLAUDE.md section 2 apply (optional
  key, spread-prev mutation, stable-identity selector).
- **`Planner.jsx` uses `orderedReadings()`** instead of `allReadingsOrdered()` (the raw `r.n`
  sort). The day-by-day distribution logic is otherwise unchanged.
- **"Next in your plan ->" CTA on `Chapter.jsx`**: when a plan is active, show the next
  reading in PLAN order (not `r.n` order) as a prominent call to action, so following the plan
  feels like a guided path and finishing a reading advances the story. The existing prev/next
  chapter nav and the `[`/`]` keyboard shortcuts stay curriculum-order (cross-referencing by
  number still needs raw order); the plan CTA is additive, not a replacement.
- **Framing copy**: the planner explains it front-loads and weights high-yield readings so the
  student covers what matters most with revision time in hand, and shows a pace and an
  on-track/behind status. No invented pass-probability number.

Open sub-question deferred to spec review: the override table clusters WHOLE readings. R29 is
one file mixing a CVA preview with unrelated material, so v1 clusters R29 near R37 and lets its
authored arc say "this is a running start for R37"; it does NOT physically split the file. True
sub-reading splitting is a larger content decision, flagged for a later pass.

---

## Workstream B: narrative orientation

- **`src/components/chapter/ReadingArc.jsx` (new)**: an auto breadcrumb rendered near the top
  of every chapter, derived entirely from existing metadata, no authoring. Shows the `sessions`
  name and position (`Credit Risk Estimation - 5 of 6`), what it builds on (from `deps` /
  `connections.from`, resolved to titles), and what it sets up (from `connections.to`). Pure
  orientation: "you are here, this assumes X, this feeds Y." Uses established chrome (`.kicker`,
  book color, `.chip`), theme-aware, defensive against missing metadata.
- **Authored arc doctrine (extends CLAUDE.md section 1a and section 8)** for 3-star-plus
  readings: each must OPEN by establishing, in prose, (1) the lens/perspective the reader is now
  in ("you have priced default in isolation; now picture one trade and two parties who can each
  walk away"), (2) what it assumes the reader already holds, and (3) what it sets up later. And
  the formula rule: **every formula must state what you do with it and where it gets reused**;
  no naked equations dropped without a job. Where a dense reading genuinely must cover multiple
  angles, it must signpost the lens change explicitly ("we now switch from pricing to
  correlation") rather than letting the perspective jump silently. R26, R28, R29 are the pilot
  rewrites; this becomes doctrine for every 3-star-plus reading and for all future material.

---

## Workstream C: lists that matter cannot be dead-ends

- **Schema (backward-compatible)**: a `breakdown[].points` entry may be a plain string (as
  today) OR `{ point, explain }`, where `explain` is a short exposition. The renderer shows
  `point` as the scannable headline and `explain` as a dimmer sub-line beneath it, always
  visible. No behavioral change for existing string points. Defensive rendering per house
  standard: absent `explain` renders nothing.
- **Content pass**: add `explain` wherever a list item currently assumes an explanation that is
  not there. Not every list needs it (a pure "name these six things" memorization list can stay
  tight); the fix targets items that read as cryptic dead-ends. This runs as part of, or
  immediately alongside, the section 8 content pass, one agent per file.

---

## Workstream D: visual builders (reusable infrastructure)

Two data-driven widgets, built to the existing widget conventions (registered in
`src/widgets/`, theme-aware CSS variables only, params from `data-*` JSON attributes, draws
once and redraws on input, phone-friendly stacking on narrow viewports). Scoped as
infrastructure because CFA accounting/FSA material will depend on them heavily.

- **Progressive balance-sheet builder** (revives and generalizes Fable's section 6c). Two
  columns, Assets on the left and Liabilities + Equity on the right, that build up one row at a
  time with a one-line caption per step and Next/Back controls (or scroll-synced stepping).
  Driven by a small per-reading ordered step list (each step adds or annotates rows); numbers
  are DERIVED from the reading's existing narrative, never invented (R63 already supplies its
  $100/$100, $150/$50, leverage 1.5-vs-2.0 figures). Applies to leverage, liquidity, capital,
  securitization, repo, and future accounting/FSA. R63 is the pilot.
- **Matrix / correlation-table widget**. Renders an actual grid from a data matrix, heatmap-
  shaded for correlation matrices (theme-aware color scale), with row/column labels, so "the
  correlation table" is something the student sees rather than reads about. Used wherever a
  reading currently describes a table or matrix in prose.

Both are referenced from a reading via its `visual` field (or an inline widget), exactly like
existing widgets. Content for their data structures is derived from existing narrative; invent
no numbers.

---

## What is explicitly NOT in this scope

- **Sub-reading content splitting** (physically breaking R29 into a CVA piece near R37 and a
  copula piece elsewhere). v1 clusters and annotates whole readings; splitting is a later
  content decision.
- **The phone-first card/deck/digestibility slate** (Fable M1-M7) remains deferred per the
  owner (CLAUDE.md section 8.6).
- **Backend/auth/payments** (CLAUDE.md section 7.3) remains deferred.

## Relationship to the section 8 content-quality pass

Section 8 (em-dash purge, tone, why-depth, formula correctness) and this design are
complementary and should run together, since both are per-reading content work touching the
same files:

- Workstream B's authored arcs and Workstream C's list exposition ARE content work and fold
  into the section 8 per-file fleet pass (one agent per file, Opus review for doctrine and math
  correctness).
- Workstream A (planner) and Workstream D (widgets) are code/infrastructure and can proceed in
  parallel with the content fleet, orchestrator-owned.
- Pilot set for the whole design: R26/R28/R29 (arcs + coherence rewrite + formulas-with-
  purpose), R63 (balance-sheet builder + list exposition), so the owner can approve the bar
  before the full fleet runs.

## Verification (per CLAUDE.md section 4)

- `npm run build` green, no new warnings.
- `node scripts/validate-reading.mjs bookN/rNN.js NN` on every touched reading, plus the
  em-dash grep gate.
- Import-sweep touched data files after any fleet run.
- Headless render-check (0 failure markers) of every touched chapter, the planner, and any page
  hosting the new widgets, at desktop and 390px.
- New pure libs (`studyPath.js`) get a small Node smoke check (topological order respects
  `deps`; overrides apply).
- Interactive behavior (planner date inputs, "next in plan" navigation, balance-sheet stepping,
  widget redraw) cannot be verified headless: flag for the owner to test in a browser.
