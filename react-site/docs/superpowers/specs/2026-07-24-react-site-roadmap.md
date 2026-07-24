# React-site master roadmap, sequencing every scoped idea

Written 2026-07-24 (fourteenth session), brainstormed with the owner. This document does
**not** re-specify features that already have their own specs; it **sequences** all
outstanding react-site work into an executable order with an explicit dependency spine, and
it fully specs the four ideas raised in this session that had no prior spec (case-study
system, source-diagram fidelity, cohesive planner, dynamic Block Review).

Companion specs this file sequences but does not replace:
- `docs/superpowers/specs/2026-07-21-learning-coherence-design.md` (CLAUDE.md §9)
- CLAUDE.md §6 (core-concept cross-reference system), §7.1 (revision pages), §8 (content pass)

## Scope

**In scope:** everything in `react-site/`. **Out of scope** (owner-deferred, noted only, no
phase allocated): §7.3 paid-access device licensing (needs a backend/auth/payments layer that
does not exist) and the phone-first M1-M7 card-deck slate
(`2026-07-20-comfort-ui-v2-plan.md`). Revisit both only when the owner re-raises them.

## Decisions locked in this brainstorm (do not re-litigate without asking)

1. **The content-quality pass is the FINAL phase, not the first.** Content is the sole
   retention driver ("if we don't have good content no one's gonna care about our software"),
   so it is done *once, comprehensively, at the very end*, after every feature/infra/block
   exists and after everything that "could be improved" has been flagged. This way the final
   pass polishes the whole corpus consistently in one sweep: the original 101 readings **and**
   all net-new prose (case-study narrative, session summaries, securitization pages). This
   reverses an earlier framing where content ran first as the primary track, the owner
   re-sequenced it to last on 2026-07-24.
   - **Net-new prose is written *functionally* when its feature is built** (enough to work and
     be correct), then flagged; the end-stage pass applies the human-tone / example /
     real-life-relevance polish to everything at once. Nothing is polished in isolation.
   - **The end-stage pass gains new content dimensions** beyond §8.1-8.4: human tutor tone,
     accurate worked examples, and **real-life relevance / real case-study connections where
     applicable** (ties into workstream E).
2. **Hard execution cap: never more than 5 concurrent Sonnet agents**, in every phase, to
   control token burn. This overrides the default fleet concurrency.
3. **Flag-as-you-go discipline.** During every phase before the final one, agents and the
   orchestrator append anything that "feels like it could be improved" to a running content-flags
   worklist (`docs/superpowers/content-flags.md`), so the final pass has a concrete backlog on
   top of the systematic sweeps.
4. **Case study uses multiple real banks, deep external research**, surfaced as a dedicated
   `/case-study` route **plus** inline hooks in readings, with an **interactive**
   financial-statement deep-dive that reuses the §9-D visual builders. All content that lives
   outside the Schweser source is clearly labeled **beyond-exam / real-world**, per the §6
   extra-depth exception, the single sanctioned departure from the "never invent" rule.
5. **Source-diagram fidelity is its own workstream**, the app must render the diagrams the
   source draws (bow-tie, concentric circles, specific tables) instead of flattening them.
6. **The planner's unit of work becomes a cohesive *block*, not a day**, and every completed
   block triggers a **dynamic Block Review** composed at runtime from per-reading atoms
   (no backend, no runtime LLM). Its revision segment is **active recall that graduates into
   the existing SRS queue.**

---

## Workstream inventory

Existing (scoped in prior docs):
- **§8 content-quality pass**, 8.1 em-dash purge, 8.2 tone, 8.3 why-depth, 8.4 formula
  correctness, 8.5 flagship securitization build.
- **§7.5 follow-up**, rewrite 21 readings whose `pdf.query` is authored prose, not source text.
- **§9-A** planner spine, **§9-B** narrative orientation, **§9-C** list exposition,
  **§9-D** visual builders.
- **§7.1 v2** real revision pages (reuse `/concept/:slug` with a `layer` field).
- **§6 Phase 3** inline core-concept hover linking (the expensive fan-out).

New (specced below):
- **E, Case-study system** (multiple real banks, `/case-study` + inline hooks + interactive
  financial-statement deep-dive).
- **F, Source-diagram fidelity** (bow-tie / concentric / table widgets; expands §9-D).
- **G, Cohesive planner + dynamic Block Review** (absorbs §9-A and the "session summaries"
  idea, piece **c**).

---

## New workstream E, Case-study system

**Goal.** A continuous, real-world bank case study threaded across the whole curriculum:
what each bank did, how it was regulated, how it manages funds, and a financial-statement
deep-dive showing where reserves sit, how the calcs were done, and which documents kept them
compliant.

**Bank mapping** (multiple banks, anchor each risk domain on the bank the curriculum already
made famous for it; owner may veto any pick in review):

| Book | Domain | Anchor bank(s) | Why |
|------|--------|----------------|-----|
| 1 | Market risk | JPMorgan / the London Whale (CIO) | VaR, model risk, rich 10-K / Pillar 3 |
| 2 | Credit risk | Credit Suisse / Archegos | Counterparty credit, concentration, reserves |
| 3 | Operational & resilience | Barings or Société Générale + Knight Capital | Rogue trading, control failure, home of the **bow-tie** diagrams |
| 4 | Liquidity & treasury | SVB (2023) | Textbook liquidity + IRRBB failure; LCR/NSFR, HTM reserves |
| 5 | Current issues | SVB + Credit Suisse (2023) | Recent, well-documented collapses |

**Surfaces:**
1. **`/case-study` route**, lazy route (per the code-splitting rule), Study-menu +
   command-palette entries. A continuous narrative in chapters mirroring the 5 books, each
   anchored on its mapped bank(s).
2. **Financial-statement deep-dive** (a sub-section of the route), real statement/filing
   excerpts (balance sheet, Pillar 3 RWA tables, LCR/NSFR, CECL/HTM reserves) rendered as
   annotated tables **plus** interactive builders reusing the workstream-F widgets, so the
   student traces where a reserve sits and steps through how a calc (RWA, LCR, EL/CECL) was
   actually performed. Explicitly names which compliance document (Pillar 3, 10-K, resolution
   plan) satisfies which requirement.
3. **Inline hooks**, "How [Bank] handled this" callout cards inside relevant readings that
   link into `/case-study`. Written functionally in Phase 2 (Sonnet) and flagged for the Phase 5
   polish; **depends on the route existing first**.

**Content-rule handling.** Every field sourced from a real filing or real-world event that is
not in the Schweser text MUST carry the beyond-exam / real-world label, exactly as §6's
extra-depth layer does. Exam-relevant mechanics still come from Schweser; the bank's real
numbers are the illustration layer on top.

**Data shape.** New `src/data/caseStudy/` module: per-book narrative + a
`statements` structure (line items, the calc each line demonstrates, the source document, the
beyond-exam flag). Inline hooks reference `{ rn, bank, oneLiner, anchor }` and are matched to
readings the same way `lib/related.js` matches keywords.

## New workstream F, Source-diagram fidelity

**Goal.** Render the visuals the source material draws but the app currently flattens to prose.

**Method.**
1. **Audit** the Schweser source (both flavors) for described-but-unrendered visuals. Known
   classes so far: **bow-tie diagrams** (op-risk cause → event → consequence, Book 3),
   **concentric-circle diagrams** (risk taxonomy / three-lines-of-defense / capital tiers),
   and specific **tables** currently collapsed into paragraphs. The audit produces the full
   list before building.
2. **Build** each as a reusable, theme-aware widget in the §9-D style: registered by name in
   `src/widgets/*`, colors only via CSS variables, params from `data-*` JSON attributes with
   defaults, draw-once + redraw-on-input. A reading uses one by setting its `visual` field.
3. The financial-statement deep-dive (E) consumes the **same** primitives (the annotated-table
   and heatmap widgets especially), so F is a hard prerequisite for E's deep-dive.

This is the natural expansion of §9-D from two builders (balance-sheet stepper +
matrix/correlation table) into a proper diagram-fidelity library.

## New workstream G, Cohesive planner + dynamic Block Review

This absorbs §9-A and the "study-session summaries" idea (piece **c**) into one system, because
they are the same system viewed from two ends: the planner defines what a block is, and the
Block Review is what happens when a block is finished.

### Why the current planner is weak

`/planner` today spreads not-done readings across days weighted by stars. Its unit of work is
*a day*, and a day's readings have no reason to cohere. §9-A adds deps-aware *ordering*, but
ordering is not grouping. The missing thing is a **block**: a set of readings that form one
idea to learn and consolidate together.

### Three layers

1. **Cluster layer** (`src/lib/studyPath.js`, extends §9-A). Group the 101 readings into
   cohesive blocks. Base unit = Schweser's `sessions` grouping (already in meta), refined by
   `deps`, `connections`, and the cross-book `threads` (already in meta), plus the §9-A
   authored override table for the tangled clusters (CVA family, IRB R21↔R59, copula chain).
   A block is tagged as either `schweser-session` or `curated-cluster`. Output: an ordered set
   of blocks, each a set of reading numbers.
2. **Schedule layer** (`Planner.jsx`). Pack whole blocks into `[planner.startDate ..
   planner.examDate]`, star-weighted, **keeping each block contiguous** (never split a cluster
   across a long gap), final ~15% of the window reserved for revision (already exists). Add the
   `planner.startDate` optional store key (default today). Add a "Next in your plan →" CTA on
   `Chapter.jsx` in plan order, **additive**, it must NOT hijack the curriculum-order
   prev/next or the `[` / `]` shortcuts (§9-A rule).
3. **Review layer**, the Block Review, below.

### The dynamic Block Review

**Trigger.** When every reading in a block is marked done, the block is eligible; surface the
Block Review from the planner and from a CTA at the end of the last reading in the block.

**Composed at runtime from per-reading atoms, no backend, no runtime LLM. "Dynamic" means
composition, not generation.** Over exactly the set of readings the block contains:

- **Overview** = each reading's `summary` / `tagline` + top `highYield` items, in the block's
  own order, stitched with a **through-line**:
  - blocks matching a Schweser session or a curated cluster get an **authored** through-line.
    This is piece **c**, the study-session summary: a Schweser-sourced paragraph ("what happened
    in this block, the key points, how it connects to the overall narrative"), written once,
    which also doubles as the case-study (E) narrative spine;
  - arbitrary planner blocks matching no known cluster fall back to a **metadata-composed**
    through-line generated from `deps` / `connections` / `threads` (the same machinery as
    §9-B's `ReadingArc`). Terser, still real.
  - Same surface either way: authored where we can, composed where we can't, graceful
    degradation, never invented prose.
- **Quick revision segment (active recall)** = the block's `recall` cards + a few `quiz` MCQs
  + `misconceptions` trap-checks, drawn only from the block's readings, answered **actively**
  as a one-time scoped consolidation round through the existing SRS/Quiz engines; those cards
  then **graduate into the ongoing spaced-repetition queue** so retention compounds. This is
  the "stays in longer" mechanism.

**Why this honors the essence.** Every atom (`summary`, `highYield`, `recall`, `quiz`,
`misconceptions`) is already Schweser-sourced. The review invents nothing; it re-composes what
each reading already carries, over whatever set the planner assembled. It works identically for
a fixed Schweser session and an arbitrary planner block because both are just "a set of readings."

**Store shape.** New optional keys on the existing blob (spread-prev, treat-as-optional rules):
`planner.startDate`; a per-block completion/seen record so a Block Review is offered once and
re-openable; block-review cards graduate via the existing SRS mutators (no new engine).

### The authored through-lines (piece c) are net-new prose

The Schweser-sourced study-session summaries (one per Schweser session / curated cluster) are
the authored branch of the Block Review's overview and the spine of the case-study narrative:
three features, one piece of authored content. Per locked decision 1, they are written
*functionally* when the planner blocks are defined (Phase 2), gated by the validator, then
flagged for the final end-stage content pass, which applies the human-tone / real-life-relevance
polish along with the rest of the corpus.

---

## Phased sequencing

The spine reversal: **build everything first, flag improvements as you go, then do the content
polish once at the very end on Opus.** Feature and infra phases come first so that every surface
exists and every net-new prose field has been written functionally before the finishing pass
runs. Sonnet does the cheap functional work in the early phases (always at most 5 concurrent);
the final polish phase is Opus only.

### Phase 0: feature and infra pilot, bar-setting

Prove the interaction and visual bars on a tiny sample before building the rest. No content
polish here (that bar is set in Phase 5).
- One planner slice (cluster + schedule for one book), one bow-tie widget on an op-risk reading
  plus the balance-sheet stepper on r63 (to approve the visual-fidelity bar), and one end-to-end
  Block Review over a single finished block (to approve the review mechanism).
- Gate: owner approves the planner, visual-fidelity, and Block Review bars, then Phase 1 scales.

### Phase 1: infra build

Orchestrator-owned code, Sonnet only where per-file agents are used, at most 5 concurrent.
Ordered so downstream dependencies land first:
1. **F diagram-fidelity library** (extends §9-D). Audit the source for described-but-unrendered
   visuals, then build the widget primitives. E's financial-statement deep-dive and the Phase 5
   source-diagram content both depend on these, so they come first.
2. **G planner** (§9-A cluster + schedule layers, `planner.startDate`, additive "Next in plan"
   CTA).
3. **G Block Review** engine (runtime composition over per-reading atoms + SRS graduation).
4. **§9-B** auto `ReadingArc` breadcrumb (code side; feeds the composed through-line fallback).
5. **§7.1 v2** mechanism: add `layer: "revision" | "core"` to the existing `/concept/:slug`
   page (no new page type).

### Phase 2: feature builds with net-new functional prose

Sonnet functional authoring (at most 5 concurrent), correctness-first, flagged for the Phase 5
polish. Nothing here is expected to be tone-final.
1. **Flagship securitization build** (§8.5 / §1a / §6). Research Book 2/3/4 source coverage
   first, invent nothing. Build a Revision page (§7.1 v2, structured finance from first
   principles) and a Core-Concept page family (§6) with the CMO-vs-CDO/CLO distinction
   (cash-flow/prepayment tranching vs credit/default tranching under the shared word "tranche")
   as the explicit stage-6 comparison centerpiece. This is the real pilot of the §7.1 v2 `layer`
   mechanism.
2. **Case-study system (workstream E).** Research the banks' filings, build the `/case-study`
   route and narrative, then the financial-statement deep-dive (consumes F's widgets). External
   content labeled beyond-exam throughout.
3. **Session-summary through-lines (piece c).** Written functionally as the planner blocks are
   defined; feed both the Block Review overview and the case-study narrative spine.
4. **Case-study inline hook cards** across relevant readings (needs E's route to exist first).

### Phase 3: core-concept hover linking (§6 Phase 3)

The auto-detection fan-out: inline hover-snippet linking across every reading that reuses a core
concept. Own dedicated Sonnet run, at most 5 concurrent. Runs after the feature builds so the
revision and concept pages it links into already exist. Links anchor on stable concept names, so
the Phase 5 prose polish does not disturb them.

### Phase 4: flag consolidation

Not a build phase. The orchestrator consolidates `docs/superpowers/content-flags.md` (everything
Phases 0 to 3 flagged as improvable) into a per-reading worklist, and merges it with the
systematic sweep list so the final pass has one authoritative backlog.

### Phase 5 (FINAL): the content-quality and human-tone pass, Opus only

The main event, and the whole reason for the reordering. **Opus agents only, no Sonnet**, for
professional results; still at most 5 concurrent to bound cost. One pass over the ENTIRE corpus
(the original 101 readings plus all net-new prose from Phases 1 and 2: case-study narrative,
financial-statement walkthroughs, session summaries, securitization pages), one Opus agent per
file, plus the Phase 4 flag worklist.

Each file, in one pass:
- **8.1 em-dash / en-dash purge**, comprehensive: no `—` or `–` anywhere in any explanation or
  content field. Every dash gets a context-appropriate rewrite (comma, colon, parentheses, or a
  full stop), never a blind regex. Gate: `grep -Rn '—\|–' src/data/bookN/rNN.js` returns nothing.
- **8.2 human tutor tone**: sharp-tutor-thinking-out-loud voice (sections 1 and 1a), the R28
  exemplar as the bar.
- **8.3 why-depth**: every counterintuitive claim carries its causal mechanism in the same
  breath, sourced from Schweser, never invented.
- **8.4 formula and numerical correctness**: plain-language and derivation text checked against
  the actual equation (plug in numbers where feasible), no explanation that contradicts its own
  formula.
- **Accurate worked examples** with concrete numbers, and **real-life relevance / real
  case-study connections where applicable** (link into workstream E where a reading's concept
  shows up in a real bank's numbers).

Bar-setting sub-step first: run the Opus pass on R63 (why-depth), R26 (formula correctness), and
R28 (tone) so the owner approves the professional bar before the full corpus sweep. Then fan out.
Opus review is intrinsic (the author is Opus), so no separate reviewer wave is needed; the
orchestrator still builds, import-sweeps, and render-checks per wave.

## Dependency spine

```
Phase 0 (feature/infra pilot) gates the build
        │
Phase 1 (infra)
  F/§9-D widgets ....... needed by E deep-dive and Phase 5 source-diagram content
  G planner ............ needed by G Block Review
  §7.1 v2 layer ........ needed by Phase 2 flagship build
        │
Phase 2 (feature builds, functional Sonnet prose, all flagged)
  securitization ....... needs §7.1 v2 layer
  case-study E ......... needs F widgets; E route needed before its inline hooks
  session through-lines  written as planner blocks are defined
        │
Phase 3 (hover linking) . needs feature builds done; anchors on stable concept names
        │
Phase 4 (flag consolidation)
        │
Phase 5 (content polish, OPUS only, <=5 concurrent)
  polishes EVERYTHING: original 101 + all Phase 1/2 net-new prose + flag worklist
```

## Execution model (house rules)

- **At most 5 concurrent Sonnet agents in every early phase; the Phase 5 polish is Opus only,
  also at most 5 concurrent.** This overrides the default fleet concurrency and is the primary
  token-burn control.
- Fleet fan-out follows CLAUDE.md §5: one agent per file, file-scoped prompts pasting the exact
  API contract plus the Schweser source path, agents do NOT run builds and NEVER run
  `git stash/reset` or any repo-wide git state change. The orchestrator builds, import-sweeps,
  and render-checks after each wave.
- Any phase that touches content appends improvable spots to `docs/superpowers/content-flags.md`
  rather than fixing them in place (flag-as-you-go), so the Phase 5 pass owns all prose changes.
- Every content change gated by `node scripts/validate-reading.mjs bookN/rNN.js NN`, the zero-dash
  grep, and a post-wave import-sweep of every touched file (mid-edit-killed agents can leave
  unescaped quotes the validator never sees).
- Verification per CLAUDE.md §4: `npm run build` clean; headless render-check over
  `http://localhost:4177` (dist does not work over `file://`), 0 hits for
  `widget failed|undefined<|>null<|tex-error`. Interactive behavior (Block Review flow, planner
  drag, widget input) is flagged for manual browser verification, never claimed from headless.
- Update `PROGRESS.md` and CLAUDE.md's roadmap sections as phases land.

---

## Addendum (2026-07-24, part 2): new workstreams

Full detail: `2026-07-24-expansion-and-fixes-design.md`. North star and execution model:
`../../../GOAL.md`. These slot into the phase order as follows.

**New Phase 0.5, near-term reading-flow fixes (runs before Phase 1, bugs are "asap").** The
scroll-stability bugs (concept-expand jump, with and without split view), the homepage-star
opens-at-top fix, the global "Return to Reading N" button, "Next reading" clears the previous,
the 45-minute hydration reminder, and the META-blurb formatting/em-dash sweep. These degrade
daily use now, so they are fixed first. Own Sonnet plan, Opus review, at most 5 concurrent.

**Into Phase 1/2 (feature build).**
- **Core-concept expansion (section 3).** Expand the origin-state concept system: prior-level
  revision (`layer: "prior-level"` on `/concept/:slug`, a reading's `assumes: [...]` field for
  CFA L1 / FRM P1 concepts) plus the thorough Wikipedia-style hover previews. The hover-preview
  fan-out is the same work as §6 Phase 3 and keeps its late slot (after feature builds, anchored
  on stable concept names); the concept-page CONTENT it links into is expanded here first.
- **Consistency dashboard (section 4).** GitHub-style heatmap + pace/consistency metrics, derived
  from store timestamps (plus an optional `activity` day-counter key). Local and low-risk; may
  slot earlier if wanted, otherwise near launch.

**Into Phase 5 (Opus content polish).**
- **`content-guidelines.md` (section 5.1)** is built DURING this phase: the durable
  mistakes-and-fixes playbook that makes the next level (CFA L1, FRM P1, ...) smooth. Distinct
  from the transient `content-flags.md`.
- **End-of-reading coverage rule (section 5.2)** becomes an acceptance check: every `summary` and
  `eli5` must cover the reading end to end, with the last third as carefully as the first.

**Near launch, after polish, its own backend brainstorm-through-plan cycle.**
- **Accounts, free trials, device licensing (section 2).** This SUPERSEDES CLAUDE.md §7.3. The
  new rule set: no in-app payments (out-of-band collection), free trial, one account usable from
  at most 2 devices (one primary + one temporary), only one device active at a time, temporary
  access limited to a 2-hour window once per day, primary reassignment at most twice per plan,
  human sales escape hatch. Requires a backend, auth with a device-binding token, single-active
  lease enforcement, and per-user server-backed storage migrated from the current single-user
  `localStorage` blob. The old §7.3 device model (two concurrent primary devices, 4-hour window,
  2-day lockout, weekly reassignment) is OBSOLETE; do not build to it.

Execution model unchanged from `GOAL.md`: Sonnet 5 workers one issue at a time with Opus review
between tasks, at most 5 concurrent; the final content polish removes Sonnet and runs Opus 4.8
only, one reading at a time.
