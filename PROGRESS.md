# FRM Part II — product upgrade progress tracker

Single source of truth for **where development stands**, so work can resume even if a
session dies or limits run out. Scope of all work: **`react-site/` only** — the vanilla
`site/` app is frozen. Full design: `docs/superpowers/specs/2026-07-18-react-marketable-design.md`.

> **⏭ ACTIVE RESUME POINT (2026-07-21, eleventh session):** the tenth session's feature work
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
> correctness verification) now exists. The tenth-session feature summary, for reference:
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
