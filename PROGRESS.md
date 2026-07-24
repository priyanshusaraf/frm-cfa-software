# FRM Part II — product upgrade progress tracker

Single source of truth for **where development stands**, so work can resume even if a
session dies or limits run out. Scope of all work: **`react-site/` only** — the vanilla
`site/` app is frozen. Full design: `docs/superpowers/specs/2026-07-18-react-marketable-design.md`.

> **⏭ ACTIVE RESUME POINT (2026-07-24, fifteenth session, ORCHESTRATED build):** executing the
> committed master roadmap (`docs/superpowers/specs/2026-07-24-react-site-roadmap.md`) via
> subagent-driven development (Sonnet implementers, Opus review between tasks, <=5 concurrent).
> Branch `roadmap-2026-07`. Ledger: `.superpowers/sdd/progress.md` (gitignored scratch).
> Content is flagged-not-fixed to `react-site/docs/superpowers/content-flags.md` for the final
> Phase 5 Opus polish.
>
> **PHASE 1 (infra build) COMPLETE** (commits `472e0e9..53d264a`, orchestrator-built directly,
> each build+test+render-verified). All five roadmap Phase 1 items landed:
> 1. **F diagram-fidelity library** (`src/widgets/fidelity.js`, imported in `all.js`): the four
>    remaining primitives from the F.1 audit, `nested-rings` / `annotated-table` / `waterfall-flow`
>    / `party-flow` (bow-tie + balance-stepper shipped in Phase 0). Each orphan-safe, CSS-var,
>    data-* JSON payload with sourced defaults. Wired one sourced reading each: R41 (three lines of
>    defense rings), R35 (CCP loss waterfall), R39 (securitization SPV party-flow), R26 (B-rated
>    marginal-vs-cumulative PD table, real Figure 25.1 numbers, no invented transition-matrix cells).
> 2. **G planner** (`Planner.jsx` rewrite): schedules whole cohesive BLOCKS via the Phase 0
>    `scheduleBlocks` into `[startDate..examDate]`; new optional `planner.startDate` store key +
>    `setStartDate`; a Start-date input; block cards with date spans, cluster chips, done strike-
>    through, inline Block-Review link. Additive "Next in your plan" CTA on `Chapter.jsx`
>    (`studyPath.nextInPlan`, pure, tested) shown only when it differs from curriculum-order Next,
>    so it never hijacks prev/next or `[`/`]`.
> 3. **G Block Review** composed-fallback completed: `blockReview.composeThroughLine` now appends a
>    block's external prerequisites (deps outside the block) via the ReadingArc/deps machinery when
>    no authored through-line exists. Engine was already general over any block.
> 4. **§9-B ReadingArc**: `src/lib/readingArc.js` (pure, META-only: session position + builds-on
>    deps + sets-up reverse-deps) + `src/components/chapter/ReadingArc.jsx`, mounted under the
>    chapter tagline. Reused by the Block Review fallback.
> 5. **§7.1 v2 layer mechanism**: `/concept/:slug` now renders `layer: "revision" | "core"`. New
>    `src/data/authoredConcepts.js` (curated registry, EMPTY until Phase 2 fills it), `findConcept`
>    /`listConcepts` in `coreConcepts.js` (authored shadows auto, injectable), layer-tinted
>    ConceptPage + ConceptsIndex chips. This is the mechanism the Phase 2 securitization flagship
>    (Revision + Core pages) plugs into.
>
> Tests 39/39 pass (studyPath +6, coreConcepts +5 new). Build green; render-checked R41/R35/R39/R26
> (widgets), /planner, /chapter/26 (ReadingArc), /concepts + /concept/information-ratio, and
> /block-review/c27, all 0 failure markers with distinctive content asserted present. Every new
> string em-dash-free. **MANUAL-VERIFY:** all four new widgets' legibility in both themes; set an
> exam date and confirm the block schedule + Next-in-plan CTA; ReadingArc links.
>
> **PHASE 2 (feature builds) IN PROGRESS** (commits `0255e93..310eeb0`, orchestrator-built, each
> build+render-verified, all content grounded in-source and flagged for Phase 5):
> 1. **Flagship securitization build DONE** (`0255e93`): the §7.1 v2 layer's first real content in
>    `src/data/authoredConcepts.js`, sourced verbatim from Book 2 R28 (~lines 4740-4800) + R39.
>    `layer:"revision"` `/concept/securitization` (covered bonds -> pass-through MBS -> CMO ->
>    CDO/CLO, problem-first §1a) and `layer:"core"` `/concept/cmo-vs-cdo-tranche` (the stage-6
>    centerpiece: CMO tranches WHEN you are paid / prepayment timing; CDO/CLO tranches WHETHER you
>    are paid / credit loss). Both listed in `/concepts` with layer chips.
> 2. **Session through-lines (piece c) STARTED** (`28c3e2b`): Book 1's three Schweser sessions
>    (`b1-1`, `b1-7`, `b1-10`) authored into `src/data/blockThroughlines.js`, grounded in the
>    readings' sourced tags; feed the Block Review authored-overview branch + case-study spine.
>    Books 2-5 sessions still use the metadata-composed fallback (bounded follow-on).
> 3. **Case-study system (workstream E) FOUNDATION + SVB pilot DONE** (`310eeb0`): new `/case-study`
>    lazy route (Study-menu + palette) + `src/data/caseStudy.js`. SVB (Book 4) fully authored:
>    problem-first Mar-2023 liquidity/IRRBB narrative tied to LCR/deposit-stability/HTM-AFS/IRRBB
>    mechanics, a financial-statement deep-dive via the F `annotated-table` widget (approximate
>    public figures, clearly labeled), and R63/R69/R79 "where this shows up" links. All real-world
>    fields carry the "Beyond exam scope" label (§6 exception). Other four banks carry mapping +
>    rationale, status `"planned"`.
>
> **OWNER REVIEW + SELF-IMPROVING CONTENT SYSTEM (2026-07-25).** The owner reviewed the
> counterparty cluster (R30-R35) and set a durable directive: maintain a **self-rectifying
> per-reading content-review ledger** so later, cheaper models approach every reading correctly on
> the first pass (the token-efficiency mechanism for scaling to all FRM+CFA levels, ~20+ books).
> - **New `react-site/docs/superpowers/content-guidelines.md`** (durable, roadmap §5.1): the style
>   playbook (8 owner-learned rules) + a per-reading Good/Weak/Guidance ledger, populated for
>   R30-R35. Future agents READ it before editing content and UPDATE it as they go. `CLAUDE.md`
>   (react-site) now has a "Where work is tracked" section pointing every future agent at
>   PROGRESS.md / the roadmap / the SDD ledger / content-guidelines.md / content-flags.md, with a
>   token-efficiency contract (do not re-derive what is recorded; write durable learnings down).
> - **Fixed immediately** (functional + factual): the **Quiz-repeat bug** (Chapter.jsx now mounts
>   `<Quiz key={rn}>`; the `useState` round initializer only ran on mount, so navigating readings
>   reused the prior reading's questions + answers), the R31 counterparty-direction inversion
>   ("moves in my favour and the counterparty owes me", not "against me"), R32 "exam candidate" x2,
>   and R33 "named in the source" AI-ism. Build green; edited readings import-clean; no new dashes.
> - **Flagged for Phase 5** in content-flags.md + content-guidelines.md: monolines/CDPCs "why",
>   R32 zero-sum framing + continuity phrasing + CVA-vs-credit-limits + Ondine refresher, R33
>   condense-repetition + naked-call-vs-spread margin example, richer go-deeper, and GLOBAL:
>   tricky-quiz-wording, AI-ism purge, explain-why, cross-reading example continuity.
>
> **REMAINING (all fleet-scale per the roadmap's own execution model, ≤5 concurrent):**
> - Phase 2 tail: the four remaining bank narratives (JPMorgan/London Whale, CS/Archegos,
>   Barings+SocGen+Knight, CS current-issues), Books 2-5 session through-lines, and the case-study
>   inline hook CARDS inside each reading (reverse fan-out; the `hooks` data already exists).
> - **Phase 3** §6-Phase-3 inline hover-snippet core-concept linking across every reading that
>   reuses a core concept (the expensive dedicated Sonnet fan-out; anchors on stable concept names).
> - **Phase 4** flag consolidation of `content-flags.md` into a per-reading worklist.
> - **Phase 5 (the main event)** the Opus-only content-quality pass over the ENTIRE corpus (101
>   readings + all Phase 1/2 net-new prose): §8.1 em-dash purge, §8.2 tone, §8.3 why-depth, §8.4
>   formula correctness, worked examples + real-world links. Bar-set on R63/R26/R28 first, then fan
>   out one Opus agent per file. `content-flags.md` now carries the securitization + case-study +
>   Book-1-through-line flags added this session.
>
> **PHASE 0.5 (reading-flow fixes) COMPLETE** — commits `c942658..85fdbcd`. All 6 tasks +
> a §1.6 follow-up landed, each Opus-reviewed clean. Build green; headless render-check 0
> failure markers on home/ch28/ch63/settings/book4/planner/concept.
> 1. **Scroll-jump on concept expand fixed** (`scrollAnchor.js`): a pointerdown-origin guard
>    (`CONTENT_TOGGLE_SELECTOR = "summary, [aria-expanded]"`, 400ms window) suppresses the
>    anchor restore for in-content expand/collapse, so the clicked card stays put and content
>    grows below it; the suppressed path refreshes the stored anchor offset so a later passive
>    reflow (resize/font-scale/split-open) does not reintroduce the jump. Passive reflows
>    (resize, drag, font-scale, split remount) still pin.
> 2. **Discovery links open at the top** (`Chapter.jsx` + `scrollAnchor.js`): root cause was
>    that cached readings (CommandPalette prefetches all) make `useReading` resolve
>    synchronously, so the anchor captured the stale pre-navigation scrollY before the mount
>    `scrollTo(0,0)`; fix exposes `resetAnchor()` from `useScrollAnchor`, called in the
>    mount-scroll effect. Continue-studying still resumes (opt-in via `state.resume`).
> 3. **Global "Return to Reading N" button** (`nav.activeReading` store key +
>    `ReturnToReading.jsx` mounted in Shell): top-left, survives concept-page hops, cleared
>    when the reading is marked done. REPLACES the §6 per-page ConceptPage back link (removed).
> 4. **"Next reading" marks the finished reading DONE** (`toggleDone`) and advances active
>    (guarded to keep active = a not-done reading). Uses existing curriculum-order `nextRn`.
> 5. **45-minute hydration reminder** (`HydrationReminder.jsx` + `prefs.hydrationReminder`
>    store key, default ON, Settings On/Off toggle): non-blocking `role="status"` toast,
>    foreground-time only (pauses on `document.hidden`), re-arms on dismiss.
> 6. **Em-dash / formatting purge of META** (`meta-data.js`, 25 dashes) **+ Home.jsx (16) +
>    index.html (3)** — user-facing structural/shell strings only, context-appropriate
>    rewrites, no structural fields touched.
>
> **⚠️ NEEDS MANUAL BROWSER VERIFICATION (cannot be verified headless — the Chrome-automation
> extension was not connected this session):**
> - Scroll: open a long reading (e.g. R28), scroll to middle, expand the first/middle/last
>   concept card — the clicked summary must not move; then expand-a-concept-then-open-a-split-
>   pane-without-scrolling must also not jump; and resize / font-scale (A+) / reading-column
>   drag / split open-close must still keep the anchored paragraph pinned.
> - Discovery-to-top: from the homepage 5-star list, a book page, and search, readings open at
>   the top; Continue-studying still resumes the saved position.
> - Return button: open R28 (not done) -> concept page -> a second concept page; the top-left
>   button reads "Return to Reading 28" throughout and returns there; after marking R28 done it
>   disappears; the concept page shows no duplicate back link.
> - Next: on R28, bottom "Next" marks R28 done, advances, and the Return button retracks.
> - Hydration toast: fires after 45 min of foreground time, dismiss re-arms, pauses when tab
>   hidden; Settings On/Off toggle works.
>
> **PHASE 0 (studyPath planner slice) COMPLETE** — commits `f5c64fa..dc21876`. The pure planner
> core now exists and the Planner uses it.
> - **`src/lib/studyPath.js`** (pure, deterministic, unit-tested with `node --test`, 12/12):
>   `orderedReadings(meta?, moves?)` (book -> session -> stable intra-session topo-sort by `deps`,
>   then authored `move` overrides), `buildBlocks(meta?, moves?)` (one block per Schweser session,
>   curated clusters lifted out into their own blocks, every reading covered once),
>   `scheduleBlocks({startDate, examDate, done})` (star-weighted spans packed into the window with
>   a reserved ~15% review tail; hardened so an over-subscribed short window never emits an
>   inverted span or bleeds into the review tail).
> - **`src/data/studyPath.js`** authored override table (R27/28/29 "Portfolio credit and copulas"
>   cluster + move-29-near-37). Small on purpose; the single place a human tunes ordering.
> - **`scripts/preview-blocks.mjs`** prints Book 1 blocks + a sample schedule (the owner
>   bar-approval artifact). **`src/pages/Planner.jsx`** now orders the plan via `orderedReadings()`
>   instead of raw `r.n`.
> - Deferred to Phase 1 (by the plan's own design): `planner.startDate` store key + the two-date
>   UI, the block-based Planner UI, and the "Next in your plan" Chapter CTA. `scheduleBlocks`
>   already accepts `startDate`, so Phase 1 is a wiring job.
>
> **⚠️ EXECUTION NOTE:** a Sonnet subagent session limit (reset ~17:50 IST, 2026-07-24) was hit
> mid-way through Phase 0. The studyPath review-finding fix (`870d859`) and Task 5 (`dc21876`)
> were therefore applied and committed by the orchestrator directly; both implement exactly the
> Opus-reviewer prescription / plan spec and are test-verified (12/12) and render-clean. The SDD
> **final whole-branch review is still PENDING** (needs a fresh subagent budget). Ledger:
> `.superpowers/sdd/progress.md`.
>
> **PHASE 1 F.1 (source-diagram audit) + Phase 0 visual pilot DONE.**
> - `docs/superpowers/specs/2026-07-24-source-diagram-audit.md` (commit `465479f`): 25 findings of
>   described-but-unrendered source visuals; 5 recommended reusable primitives
>   (`bowtie`, `nested-rings`, `annotated-table`, `waterfall-flow`, `party-flow`); pilot pick = the
>   R43 bow-tie. It cross-checked the existing widget registry so it does not re-flag the ~13
>   readings already covered.
> - **`bowtie` widget built + wired to R43** (commit `b8c1e88`, Opus-reviewed clean): renders
>   Figure 43.1 (center risk event; left wing = causes + preventive controls / frequency; right
>   wing = impacts + detective/corrective controls / severity) using R43's own sourced IT-outage
>   example as data-driven defaults, alongside the existing `lossdist` widget. CSS-variable colors
>   only, orphan-safe. First primitive of the Phase 1 F library. **Manual-verify:** bow-tie
>   legibility in both themes at `#/chapter/43`.
>
> **PHASE 0 PILOT GATE COMPLETE.** All three roadmap Phase 0 bars now have built, Opus-reviewed
> samples:
> - **Planner bar:** `node react-site/scripts/preview-blocks.mjs` (dep/session-ordered blocks + schedule).
> - **Visual-fidelity bar:** the R43 **bow-tie** widget + the r63 **balance-sheet stepper** (a
>   two-column solvency-vs-liquidity stepper; both reusable, data-driven, CSS-var, theme-aware).
> - **Block Review bar:** the dynamic **Block Review pilot** (`/block-review/:blockId`), piloted on
>   the `c27` "Portfolio credit and copulas" cluster (R27/28/29). Composed at runtime from
>   per-reading atoms (`src/lib/blockReview.js`, pure, 8 tests): an overview (authored through-line
>   + per-reading tagline/summary + top highYield) and an active-recall round (recall + quiz +
>   trap-checks) whose recall cards **graduate into the existing SRS queue** via `gradeCard` with the
>   same `"rn:i"` ids Review.jsx reads (no new engine). Surfaced by additive CTAs on Planner and at
>   the end of a block's last reading (Chapter), gated on all block readings being done
>   (`src/lib/blockEligibility.js`). Store: optional `blockReview.{[id]:{seenTs}}` key. Plan:
>   `docs/superpowers/plans/2026-07-24-block-review-pilot.md`.
> - Also built: the Phase 1 **F.1 source-diagram audit** (`docs/superpowers/specs/2026-07-24-source-diagram-audit.md`,
>   25 findings, 5 recommended primitives) that scoped the visual work.
>
> **⏸ OWNER CHECKPOINT (roadmap Phase 0 gate).** Phase 1 SCALING is gated on owner approval of these
> three bars + the manual-verify checklist above (interactive scroll/nav/toast, the two widgets'
> legibility in both themes, and the Block Review end-to-end: mark R27/28/29 done -> CTA -> review ->
> self-grade -> a `27:0`-style card appears due in `/review`). Everything is committed and the branch
> is mergeable; 32/32 unit tests pass; every touched page render-checks clean (0 markers, real DOM).
>
> **NEXT (Phase 1 scaling, each needs a task-level plan written from the roadmap/expansion specs):**
> the rest of the F widget library (nested-rings, annotated-table, waterfall-flow, party-flow per the
> audit), G planner UI (two-date UI + block-based Planner + "Next in your plan" CTA, wiring the built
> `scheduleBlocks`), §9-B ReadingArc breadcrumb, §7.1 v2 concept `layer`, then Phase 2 feature builds.
>
> **EXECUTION NOTE:** the account hit rolling subagent session limits several times this session; a
> few small, well-specified fixes/widgets (studyPath span fix, Planner crash fix, the balance-sheet
> stepper, dash cleanups) were applied directly by the orchestrator as atomic edits when the channel
> was down, each build/render/test-verified and (where code) Opus-reviewed once the channel recovered.
> A final whole-branch review re-run before merge is advisable (the earlier one caught a real crash).
>
> ---
>
> Previous resume point (2026-07-24, thirteenth session): implemented
> `docs/superpowers/specs/2026-07-24-reading-focus-and-source-anchoring-design.md` in full
> (four changes, all in `react-site/`). The content-quality pass (CLAUDE.md §8) is STILL the
> top priority and is still not started; this session was the owner-requested reading-focus
> work that preceded it.
>
> 1. **Scroll anchoring across reflows** — new `src/lib/scrollAnchor.js` (`useScrollAnchor(rootRef)`),
>    wired into `Chapter.jsx`. Captures `{el, offset}` on scroll (it cannot be captured at
>    reflow time: `resize`/`ResizeObserver` both fire after layout has already reflowed) and
>    restores with `scrollBy` when a `ResizeObserver` on the reading root, a `window.resize`,
>    or a `MutationObserver` on `<html>`'s `style` (font-scale) reports a reflow. Several
>    non-obvious constraints are encoded in the file's comments and must not be "cleaned up":
>    the capture is a TIMER not a rAF (rAF callbacks run before ResizeObserver callbacks in
>    the same frame, so a rAF capture always beats the observer to the pre-reflow geometry);
>    the restore uses `behavior: "instant"` because `html { scroll-behavior: smooth }` would
>    otherwise animate the correction; the busy guard is a wall-clock timeout, not one rAF;
>    and a split-pane open/close REMOUNTS `.page`, so the anchor is re-found by tag+text
>    fingerprint rather than dropped.
> 2. **PDF anchor ladder** — `PdfCore.jsx`'s `initialQuery: string` became
>    `initialQueries: string[]` (bare string still accepted); `runSearch` split into
>    `scanAll()` (populates the page-text cache once) + `findPages()` (pure cache lookup), so
>    trying candidates 2..n is free. Source pane uses `[pdf.query, title]`, condensed pane
>    `[title, pdf.query]`, `/pdf/:bn` uses `?q=` + a new `?q2=`. The run-once `autoRanRef` was
>    replaced by an effect keyed on the joined ladder, so an open pane re-searches when the
>    ladder changes — **callers must memoize the array**. Fixes the ~93% condensed-pane miss
>    rate measured in the spec. TOC suppression additionally prefers, among post-cutoff hits,
>    a page where the phrase appears in the first 160 chars (i.e. as a heading): measured
>    against the real PDFs this moves R30-condensed from a session divider (p14) to the
>    reading (p25) and R45-source from front matter (p11) to the reading (p107). That
>    heading-preference is a deliberate addition beyond the spec's literal 3% rule, which on
>    its own landed on divider pages.
> 3. **Fullscreen mode** — `src/lib/fullscreen.js` (session-only singleton, **deliberately NOT
>    in the persisted `layout` blob**: `requestFullscreen()` needs a user gesture, so a saved
>    `true` would reload half-applied). `main.jsx` gained a `Shell` component that drops
>    `<Nav />`, renders a `.fs-exit` chip and owns the global `f` hotkey; CSS zeroes `--nav-h`
>    and hides `.rail-panel/.edge-tab/.corner-pill/.qn-fab` under `html[data-fullscreen]`.
>    Nav button, command-palette "Toggle fullscreen", and Esc (via `fullscreenchange`).
> 4. **"Read in source" opens the split pane** — `Highlighter.jsx` now sets
>    `layout.split.q = {rn, text}` (new `setSplitQuery` mutator) and opens the source pane
>    instead of navigating to `/pdf/:bn`, above 1100px; below that the old navigate stands.
>    `Chapter.jsx` prepends the ad-hoc text to the source ladder only when `q.rn === rn`, and
>    clears it when the pane closes or the reading changes. `SplitPdfPane` gained a
>    "Full source ↗" escape hatch to the full-page reader.
>
> Also fixed this session (owner-reported): a permanent ~14px horizontal scrollbar in split
> view. Cause was `.page-resize` (the reading-column drag handle) sitting at a negative
> `right` offset, protruding past `.page`'s border box; with panes docked left `.page`'s right
> edge IS the viewport edge, so the handle pushed `scrollWidth` past `clientWidth`. Now
> `right: 0`, inside the column's own padding.
>
> **Verification actually run:** `npm run build` clean; headless render-check over
> `http://localhost:4177` (dist does NOT work over `file://`) → 0 hits for
> `widget failed|undefined<|>null<|tex-error` on home, R30, R41, `/pdf/2`, `/settings`;
> horizontal overflow measured 0 in all four split states (none / source / both / docked
> left); the anchor ladder simulated in Node against the real PDFs for R30/R41/R45/R71;
> fullscreen and "Read in source" driven end-to-end in a scripted headless page.
> **NOT verified and worth 60 seconds of manual checking in a real browser:** the scroll
> anchor itself. Headless Chrome under `--virtual-time-budget` fires no scroll events and
> schedules `ResizeObserver`/rAF unreliably, so the drift measurements there were bimodal
> (perfect or entirely uncorrected) and cannot be trusted either way. Open a long reading,
> scroll to the middle, then drag the reading-column handle, drag a split-pane handle, and hit
> A+ in the navbar: the paragraph under the nav bar should stay put.
>
> Previous resume point (2026-07-21, eleventh session): the tenth session's feature work
> (below) was reviewed, audited, and **MERGED to `main`** (fast-forward, commit `129be91`);
> the `scoped-roadmap-2026-07` branch was deleted. Work now continues on a fresh branch
> **`content-quality-2026-07`**. **The next priority is NOT a new feature: it is the
> content-quality pass, scoped in full in `react-site/CLAUDE.md` section 8** (em-dash purge +
> tone humanization + why-depth + a NEW formula-correctness verification layer). Owner
> directive: "hammering the main portions of the content is what will make users retain this
> software; everything else is replaceable." The phone-first card/deck/digestibility slate
> (Fable's M1-M7) is explicitly DEFERRED to a later version per the owner. Eleventh-session
> audit also caught and fixed a real defect in the tenth session's Vasicek WCDR content: the
> piecewise X-term called N⁻¹(X) "very negative" when in the formula it is +3.09 (a student
> trusting the prose would compute 0.002% vs the correct 14.6%); fixed in `book2/r26.js` and
> turned into a "teach the trap" point. This exact miss is why section 8.4 (numerical
> correctness verification) now exists. Also this session: brainstormed and wrote a NEW scoped
> design, `react-site/docs/superpowers/specs/2026-07-21-learning-coherence-design.md` (CLAUDE.md
> section 9), covering four workstreams the owner flagged after using the app: (A) planner as
> the study spine with hybrid `deps`+`sessions` sequencing + a curated override table + start
> date + "next in plan" CTA; (B) narrative orientation (auto arc breadcrumb + authored arc on
> 3-star-plus readings); (C) list exposition (breakdown points gain optional `explain`); (D)
> visual builders (progressive balance-sheet stepper + correlation/matrix widget, reviving and
> generalizing Fable's deferred section 6c for future CFA accounting/FSA material). Root causes
> confirmed by audit: R26/R28/R29 are incoherent grab-bags; the planner ignores all existing
> structural metadata and distributes in raw r.n order. That spec is the next major build after
> (and partly alongside) the section 8 content pass. NOT built, scoped only.
> The tenth-session feature summary, for reference:
>
> Tenth session (now merged) implemented the CLAUDE.md §6/§7 backlog in easiest-first order:
> 1. **§7.2 Settings** — `/settings` page, `layout.fontScale` store key applied as
>    `--font-scale` on `<html>`. Font family / background color deliberately not built
>    (still out of scope per the spec).
> 2. **§7.4 Split-view source material** — `PdfView.jsx`'s rendering was extracted into a
>    shared `PdfCore` component (`window` mode for the existing `/pdf/:bn` route, new `pane`
>    mode for container-scrolled side panes) so nothing was duplicated. Chapter.jsx gets
>    "Split: Source" / "Split: Condensed" toggles (desktop-only, ≥1100px, matching the
>    reading-width breakpoint; narrower viewports fall back to `/pdf/:bn`). Condensed
>    companion PDFs (books 1-4) copied into `public/pdfs/condensed{1..4}.pdf`. A live divider
>    between two open panes is deferred (static 50/50 split) — noted as a reasonable default,
>    not a gap.
> 3. **§7.1 Foundational-concept revision** — resolved the three open design questions:
>    prerequisites are read straight off each reading's existing `connections.from` (no new
>    tag); the revision surface is BOTH a new "Foundational prerequisites" card kind in
>    `Review.jsx`'s existing SRS engine (auto-generated Q/A from `connections.from[].why`, no
>    new authoring) AND an inline "Refresher" banner on Chapter.jsx for any prerequisite not
>    yet marked done.
> 4. **§6 Core-concept cross-reading system** — Phase 1 (auto-detection + `/concepts` index +
>    `/concept/:slug` deep-dive page + gated back-to-reading button) and Phase 2 (piecewise
>    `formulas[].terms[]` + `deepDive`, piloted on Vasicek WCDR, R26/R29) are DONE. **Phase 3
>    (inline hover-snippet linking fan-out across every reading that reuses a core concept) is
>    NOT built** — intentionally deferred per the roadmap's own sequencing note, since it's the
>    expensive phase and next session should treat it as its own dedicated fleet run (CLAUDE.md
>    §5), not squeezed into this session's tail. Also worth knowing: Phase 1's exact-name
>    auto-detector only surfaces 5 core concepts total on the current corpus (Sharpe ratio,
>    Information ratio, CPR from SMM, ISDA Master Agreement, Vasicek WCDR) — narrower than
>    CLAUDE.md §6's full R8/R11/R12/R13/R14/R21/R26/R27/R29/R59 Vasicek example, because most of
>    those readings reference the model in PROSE rather than in a `formulas[]`/`concepts[]`
>    name. Closing that gap is exactly what Phase 3's prose-level keyword matching is for.
> **§7.3 (paid-access device licensing)** was correctly left unbuilt (needs backend/auth
> infrastructure this repo doesn't have) per the roadmap's explicit deprioritization.
> **Every phase**: `npm run build` green, headless render-checks (0 failure markers), relevant
> `validate-reading.mjs` runs. Flagged, NOT verified (needs a real browser): the split-view
> pane divider drag-resize, the desktop/narrow-viewport split fallback, and the settings
> font-size chips' visual result across the type scale.
> **Known debt, now the TOP priority (see CLAUDE.md section 8):** the em-dash/prose-tone
> cleanup was never done at scale. Measured 2026-07-21: **7,614 em/en-dashes across `src/data`;
> 100 of 101 readings fail the validator's dash budget** (all pre-existing enrichment output,
> not introduced by recent sessions). Plus the unverified tone-humanization, the why-depth gap
> (r63 exemplar), and the newly-added formula-correctness audit. This is the next build.

Update the checkboxes as items land. Last updated: **2026-07-20 (seventh session — comfort-UI
batch: floating-pill Key points + On-this-page rails, draggable reading width, exact-position
resume, section bookmarks + /bookmarks page, highlight toggle-off fix. Foundation laid by
orchestrator, 6 Sonnet subagents on disjoint files, build green + render-check clean. See
"Shipped 2026-07-20" below. Interactive bits await browser verification.)** Previous:
**2026-07-19 (sixth session — see
"Shipped 2026-07-19 (sixth session)" below: bundle code-split 5MB→723KB, /mock exam mode,
two missing widgets built, Revision/palette/Quiz fixes via Sonnet workflow `wf_822cbc60-ce9`,
everything committed & pushed to GitHub.)** Previous: **2026-07-19 (fifth session — book 5
FULLY enriched: runs `wf_322b5ade-f47` (r81–r96 landed; 7 agents hit the session limit
but r92/r96 had landed anyway) + `wf_c1eee0ff-1d1` (r97–r101), 21/21 → ALL 101 READINGS
ENRICHED, full validator sweep + build green. Also fixed a cross-book defect: Quiz.jsx
SHUFFLES option order every round, so (a) answer-index clustering in data is harmless —
stop rebalancing it — and (b) any quiz `why` that references options by letter
("Option A", "(B)", "C and D") points at a random option in the UI. 245 such whys across
~75 files in all 5 books were rewritten to content paraphrases via fix runs
`wf_33e40b92-314` + `wf_e25bcd41-f87` (script: fix-letter-refs), plus 3 position-dependent
"None/Both of the above" options. Remaining letter matches are legitimate question
entities: r33 (Counterparty B), r66 (ratings BB/B/CCC), r84 (Stocks A and B). New failure
mode seen: agents killed by the session limit MID-EDIT can leave unescaped inner double
quotes → after any agent run over data files, import-sweep all files
(`node --input-type=module -e "await import('./$f')"`) before trusting the validator;
r86/r87 needed hand-repair this way.)**

## How to run / verify

```bash
cd react-site
npm install          # deps already in package.json (tailwind 3.4, radix, cmdk, pdfjs-dist 3.11)
npm run dev          # local dev
npm run build        # must stay green
node scripts/validate-reading.mjs book4/r67.js 67   # per-reading content schema gate
```

## Feature checklist (the 13 asks + extras)

| # | Feature | Status | Where |
|---|---------|--------|-------|
| 1 | Full PDFs in-app for cross-referencing | ✅ | `/pdf/:bn` (pdfjs-dist): windowed rendering, jump-to-page, full-text search w/ highlights |
| 2 | Formula derivations (optional) + plain intuition | ✅ content done (all 101) | schema `formulas[].plain` + `.derivation`; accordion UI in Chapter + `/formulas` |
| 3 | Teacher-grade explanations (no skimming, real contract detail) | ✅ all 101 readings | content workflow rewrote all `src/data/**` files from root source MDs |
| 4 | Per-reading quiz (6 MCQs, learning-buddy) | ✅ all 101 readings | `quiz` field + `components/chapter/Quiz.jsx`, scores in localStorage |
| 5 | Per-reading mind-map snippet | ✅ | `components/chapter/MiniMap.jsx`, mounted under Connections |
| 6 | ELI5 + "Think like this" sections in every reading | ✅ all 101 readings | `eli5` / `thinkLike` fields + Chapter sections |
| 7 | Practice test papers | ✅ via `/mock` | timed mock exams assembled from the ~600 per-reading quiz MCQs (no sourcing needed) |
| 8 | Quick read-through (select text → open PDF at that spot) | ✅ | selection toolbar "Read in source ↗" (Highlighter.jsx) → `/pdf/:bn?q=…` search-jump |
| 9 | External sources per reading | ✅ all 101 readings | `sources` field, "Go deeper" section |
| 10 | Pointwise breakdowns of enumerable ideas | ✅ all 101 readings | `breakdown` field + numbered-card renderer |
| 11 | LaTeX spacing/legibility fixes | ✅ content done (all 101) | content agents normalized `\text{}` etc.; validator rejects bare words in math |
| 12 | Better UI/UX with shadcn, not AI-slop | ✅ | Tailwind 3.4 + Radix/cmdk primitives; Nav/Home/Book restyled; favicon/meta/404 added |
| 13 | Quick notes (`n` key / floating +, notes page, export) | ✅ | `components/QuickNotes.jsx`, `/notes`, `lib/store.js` |
| + | Command palette (⌘K) across readings/concepts/formulas | ✅ | `components/CommandPalette.jsx` (full page list incl. Mock/Drills/Glossary/Highlights) |
| + | Progress & mastery dashboard (weak areas) | ✅ | `/progress` (+ Highlights tile, honest reset) |
| + | Printable formula sheet | ✅ | `/formulas` (filters name/plain/note) |
| + | Spaced-repetition review queue (SM-2-lite over recall cards) | ✅ | `/review`, `lib/store.js` |
| + | Mock exam mode (timed, cross-book, per-book breakdown) | ✅ | `/mock`, store `mocks` key; nav exam-countdown chip |

## Infrastructure already DONE ✅

- Design spec written + committed.
- Deps installed: tailwindcss 3.4 / postcss / autoprefixer; @radix-ui accordion, dialog,
  popover, tabs, progress; cmdk; clsx; tailwind-merge; class-variance-authority;
  lucide-react; pdfjs-dist 3.11.174.
- `tailwind.config.js` (preflight OFF, tokens mapped to existing CSS vars), `postcss.config.js`,
  `src/styles/tailwind.css` imported in `main.jsx`.
- shadcn-style primitives: `src/components/ui/{button,badge,accordion,dialog,popover,tabs,progress}.jsx`.
- `src/lib/cn.js`, `src/lib/store.js` (all user state: done/quiz/notes/SRS + export/import).
- `scripts/validate-reading.mjs` — schema gate for enriched readings.
- Book PDFs copied to `react-site/public/pdfs/`.
- Baseline `npm run build` green with all of the above.

## Running workflows (multi-agent, Sonnet)

1. **react-features** (run `wf_a9f8e60c-fe6`) — ✅ effectively done: all components/pages/
   routes landed EXCEPT `ReadInSource.jsx`, which the 2026-07-19 session wrote by hand and
   mounted in Chapter.jsx (build green again).
2. **content-enrich** — ✅ COMPLETE for all 101 readings: runs `wf_9a893f98-288`,
   `wf_52c5c68f-3c1`, `wf_cdf9550e-d63` (books 1–2 + part of 3), `wf_68efd330-8ac`
   (book 3), `wf_82f19ce4-f25` + `wf_5ad9b4ef-b6c` (book 4), `wf_322b5ade-f47` +
   `wf_c1eee0ff-1d1` (book 5). Teacher rewrite + eli5/thinkLike/breakdown/quiz/
   sources/derivations/pdf-locator + LaTeX fixes, validated by the gate script.
   Reviewer checklist for any future content work: pdf.query verbatim-in-source
   check (strip ** and normalize curly quotes when grepping the MD), sources URL
   domains, eli5/thinkLike spot-reads, NO option-letter references in quiz whys and
   no "None/Both of the above" options (Quiz.jsx shuffles option order every round;
   answer-index clustering in the data is harmless for the same reason), and an
   import-sweep of every touched file after agent runs (mid-edit-killed agents can
   leave unescaped quotes).
4. **fix-quiz-letter-refs** (script in session scratchpad, runs `wf_33e40b92-314` +
   `wf_e25bcd41-f87`) — ✅ done: rewrote all option-letter references in quiz whys
   across all 5 books to content paraphrases.
3. **shell-polish** — background Sonnet agent (2026-07-19) restyling Nav/Home/Book only.

If a session dies mid-workflow: scripts live under
`~/.claude/projects/-Users-priyanshusaraf-Desktop-frmp2-react-site/*/workflows/scripts/`;
resume with `Workflow({scriptPath, resumeFromRunId})` — completed readings are cached.
To find un-enriched readings at any time:
`cd react-site && for f in src/data/book*/r*.js; do rel=${f#src/data/}; rn=$(echo $rel | grep -o '[0-9]*'); node scripts/validate-reading.mjs $rel $rn >/dev/null 2>&1 || echo $rel; done`

## Remaining after workflows (integration — done by main session)

- [x] Routes in `main.jsx` (/notes /pdf/:bn /progress /formulas /review) + mount QuickNotes, CommandPalette.
- [x] Nav links for new pages (Study menu).
- [x] Chapter.jsx: render eli5/thinkLike/breakdown/quiz/sources/minimap/derivations
      (plain + "Show the math" accordion added 2026-07-19), done-toggle,
      "Open source PDF" button, ReadInSource mount, TOC update.
- [ ] Shell polish pass (Nav/Home typography, book cards) so it doesn't read as template output.
- [x] Full build + import-check all 101 files + headless render spot-checks (r02, r67, r85
      + /highlights + home, done 2026-07-19 fifth session; zero failure markers).

## Shipped 2026-07-19 (from the "proposed, not built" idea list)

- [x] **/planner** — study planner to exam date: exam date in the store (`planner.examDate`),
      not-done readings spread over remaining days weighted by priority stars, final ~15%
      of days reserved as a revision block. Re-balances as readings are marked done.
- [x] **/glossary** — every `concepts[].name/def` across the 101 readings, A–Z sticky index,
      search + per-book filter, each term links to its chapter.
- [x] **/drills** — randomized calculation drills: 14 seeded generators in `src/lib/drills.js`
      (VaR scaling, delta-normal VaR, EL, credit VaR, PD-from-spread, CDS spread, hazard
      cumulative PD, two-period PD, LCR, NSFR, LVaR, EWMA update, RAROC, IR); distractors
      are the classic wrong calculations; streak + session tally.
- [x] **Error log** — `notes[].kind: "note"|"error"`; QuickNotes dialog checkbox; wrong quiz
      answers get a "Log to error log" button (question + your pick + why, kind:error);
      Notes page has Everything/Notes/Error-log filter chips and a red badge.

## Shipped 2026-07-19 (fifth session — highlights & study-aids batch)

Spec: `docs/superpowers/specs/2026-07-19-highlights-study-aids-design.md` (documents the
user's feature ideas verbatim + division of work; committed).

- [x] **Chapter regression fix** — Chapter.jsx had stopped rendering eli5 / thinkLike /
      breakdown / Quiz / MiniMap / sources (TOC listed them; JSX never mounted them).
      All six sections restored in TOC order. All enriched content is now visible.
- [x] **Highlighting system** — select text in any chapter → floating toolbar: 4 theme-aware
      colors + "Read in source ↗" (absorbed the old ReadInSource chip; ONE toolbar now).
      Anchoring by normalized quote + 32-char context (`lib/highlights.js`, orphan-safe);
      persisted in the store (`highlights`, `hlLabels` keys). Click a mark → popover:
      recolor, remove, quote-into-note (goes to /notes), "Related in this reading"
      (`lib/related.js` keyword matcher → quiz/concept/eli5/formula with scroll-to).
- [x] **/highlights page** — all highlights grouped by reading; color + book filters;
      editable color legend (labels stored); Markdown export; Study-menu nav link.
- [x] **Stars on the reading page** — exam-priority ★ in the chapter header (from meta `hy`).
- [x] **"Key points to remember" left rail** — `KeyPoints.jsx`, top highYield items
      (stars ≥ 4, cap 6), collapsible, docked left ≥1400px (TOC docks right).
- [x] **Continue studying card** on Home (store `lastVisited`, touched on chapter visit).
- [x] **Quiz "Retake wrong only"** — partial rounds never call recordQuiz (best/last
      stay full-round-only).
- [x] **`[` / `]` keyboard nav** between readings (suppressed while typing).
- Gotcha fixed post-agents: useStore selectors MUST return stable identities
  (`useSyncExternalStore`); `s.x || {}` or object-building selectors cause React #185
  infinite loops (bit /highlights; fixed with raw-slice selectors + useMemo).
- Deferred by design (see spec §2): inline case-study preview widgets (v2); manim
  animations (needs Python/ffmpeg/LaTeX install + scene work; concrete pipeline in spec —
  pre-rendered .webm in public/anim/ + VideoFigure + per-reading `anim` field).

## Shipped 2026-07-19 (sixth session — architecture + mock exam batch)

- [x] **Bundle code-split** — `lib/readings.js` rewritten from eager `import.meta.glob` to
      lazy loaders + `useReading(rn)` / `useAllReadings()` hooks; secondary routes are
      `React.lazy` (PdfView keeps pdfjs out of the main chunk). Main bundle 5.0MB → 723KB
      (230KB gzip); each reading is its own on-demand chunk. Consumers converted
      (Search/Revision/Glossary/Formulas/Review/CommandPalette) by Sonnet workflow
      `wf_822cbc60-ce9`, each with a Loading state while chunks arrive.
- [x] **/mock — Mock exam mode** (needs no sourced papers): timed paper (3 min/question,
      auto-submit) assembled from the ~600 per-reading quiz MCQs, spread proportionally
      across selected books, options reshuffled per sitting; per-book score breakdown,
      wrong-first review with "log to error log", sitting history in the store (`mocks` key).
- [x] **Two missing widgets built** — r32 `counterparty-vs-lending` (core.js) and r45
      `reportingcake` (book3.js) were referenced by data but never existed → rendered
      "widget failed" boxes. Both now real interactive SVGs.
- [x] **Fixes**: Quiz keyboard shortcuts no longer fire while typing in inputs; Revision
      renders LaTeX (KaTeX) + HTML fields properly; command palette page list completed
      (was missing Planner/Drills/Glossary/Highlights/Mock); Search/Formulas filters
      improved (f.plain); ProgressPage reset message honest + Highlights stat tile;
      dead ReadInSource.jsx removed; 404 catch-all route; favicon + meta description;
      exam-countdown chip in the nav (from `planner.examDate`, red ≤14 days);
      recall cards keyboard-accessible.
- Verification note: dist/ ES modules do NOT load over file:// (CORS) — render-check the
  react build over HTTP (`python3 -m http.server` in dist/), not file://.

## Shipped 2026-07-20 (seventh session — comfort-UI batch)

Spec: `react-site/docs/superpowers/specs/2026-07-20-comfort-ui-design.md`. Six reading-comfort
changes. Orchestrator laid the shared foundation (store contract + CSS classes + route/nav
wiring), then fanned out 6 Sonnet subagents on disjoint files. Build green, headless
render-check of `/chapter/63` + `/` + `/bookmarks` = 0 failure markers; DOM confirms 17
bookmark toggles, both corner pills, and the resize handle present.

- [x] **Key points → floating pill** (`KeyPoints.jsx`) — bottom-LEFT `.corner-pill`; click
      expands `.rail-panel`; collapsed by default; state in `layout.keyPointsOpen`.
- [x] **"On this page" → floating pill** (`ChapterTOC.jsx`) — bottom-RIGHT pill/panel; keeps
      IntersectionObserver active tracking (re-attaches on open); bookmarked sections get a ★;
      state in `layout.tocOpen`. Now takes an `rn` prop.
- [x] **Draggable reading width** (`Chapter.jsx` `.page-resize`) — drag right edge, width
      changes 2×dx to stay centered, clamp [720, vw−32], double-click resets; persisted as
      `layout.pageWidth` (applied as inline `maxWidth` on `main.page`, which is now
      `position:relative`). Handle shown ≥1100px.
- [x] **Exact-position resume** — `lastVisited` extended to `{rn,ts,y,section}`; Chapter saves
      throttled scroll y + nearest section label, and restores on arrival with router
      `state.resume` (after math/widgets settle via rAF; resume intent captured into a ref
      BEFORE `touchVisited` resets it). Home + Book "Continue studying" cards pass
      `state={{resume:true}}` and show "Left off in …". Also honors `state.scrollTo` (from /bookmarks).
- [x] **Section bookmarks + `/bookmarks`** — `SectionLabel` gains optional `rn` → ☆/★
      `.bookmark-toggle`; store `bookmarks` key (`toggleBookmark`/`isBookmarked`/`allBookmarks`);
      new lazy `/bookmarks` page (Study menu + palette) groups bookmarks by reading, links to
      section via `state.scrollTo`, teaching empty state.
- [x] **Highlight toggle fix** (`Highlighter.jsx`) — (a) mark popover: clicking the active color
      now REMOVES the highlight; (b) selection toolbar detects intersection with existing
      `mark.hl` (`range.intersectsNode`) and enters edit mode (active color outlined; click it →
      remove, click another → recolor) instead of silently stacking a duplicate.
- Store additions (all optional keys, spread-prev): `layout {pageWidth,keyPointsOpen,tocOpen}`,
  `bookmarks`, `lastVisited.{y,section}`. Selectors kept #185-safe (raw slice + useMemo; boolean
  primitives from selectors).
- **Needs interactive (browser) verification** — drag-resize, highlight toggle-off, bookmark
  click, and scroll-resume can't be exercised headless. Flag for the user.

## Deferred / later

- Practice test papers (needs sourced papers).
- Any backend/auth/payments; state stays in localStorage with export/import for now.
- Other courses (multi-course shell) once Part II has conviction.
