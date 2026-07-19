# FRM Part II react-site — marketable-product upgrade (design spec)

Date: 2026-07-18. Scope: `react-site/` only — `site/` (vanilla HTML app) is frozen.

## Goal

Turn the React port into a product a candidate can actually use to clear FRM Part II:
teacher-grade explanations, self-testing, source-PDF cross-referencing, personal notes,
and a UI that doesn't look AI-generated.

## Constraints

- Node 18 toolchain → Tailwind **3.4** (not v4) + hand-vendored shadcn-style components
  (Radix primitives + cmdk), since the shadcn CLI targets newer stacks.
- All content extracted from root source material (`Book N (1).md`, `FRM2_*_CompleteBookN.md`),
  never invented. Book 5 has only the full text.
- All user state is localStorage (no backend yet); export/import as JSON for portability.
- Content work fanned out to Sonnet agents (token economy), one agent per reading file —
  disjoint file ownership, no merge conflicts.

## Reading schema extensions (all optional; renderer degrades gracefully)

```js
{
  eli5: "<p>…</p>",                    // plain-language explanation of the whole reading
  thinkLike: "<p>…</p>",               // "think like this" — the practitioner mental model
  breakdown: [{ title, points: [""] }],// pointwise breakdowns of enumerable ideas
  formulas: [{ name, math, note,
      plain: "…",                      // intuitive one-liner: what the formula is saying
      derivation: "<p>…\\(x\\)…</p>" }], // optional collapsible full derivation
  quiz: [{ q, options: [4 strings], answer: 0-3, why }], // 5–8 exam-style MCQs
  sources: [{ title, url, note }],     // external real-world reading
  pdf: { book: N, query: "…" }         // search string that locates this reading in Book N PDF
}
```

## Features

1. **PDF cross-reference** — book PDFs copied to `react-site/public/pdfs/bookN.pdf`;
   `/pdf/:bn` page renders with `pdfjs-dist` (text layer + find). Chapter has "Open source PDF".
2. **Quick read-through** — select text in a chapter → floating "Read in source PDF" chip →
   opens `/pdf/:bn?q=<first ~8 words>` and jumps to the first match.
3. **Derivations** — per formula: `plain` intuition always visible, `derivation` behind an
   accordion ("Show the math"). Also surfaced on the formula-sheet page.
4. **Per-reading quiz** — MCQ engine, instant feedback + "why", score saved per reading,
   retake keeps best + last; scores feed the progress dashboard.
5. **Mini mind-map** — small SVG on each chapter built from `connections.from/to` +
   `META.graph` edges touching this reading; nodes link to their chapters.
6. **ELI5 + Think-like-this** — new sections near the top of every chapter.
7. **Pointwise breakdowns** — `breakdown` rendered as scannable numbered cards.
8. **External sources** — `sources` section at chapter end.
9. **LaTeX fixes** — content agents normalize spacing (`\,`, `\text{}`, no bare words in
   math mode); `fitMath` retained.
10. **shadcn UI** — Tailwind 3.4 tokens (HSL vars, dark-first), Radix-based Button/Card/
    Tabs/Accordion/Dialog/Popover/Badge/Progress/Command; editorial type (serif display +
    tabular numerals), restrained color = book accent only. No purple-gradient slop.
11. **Quick notes** — floating ＋ button & `n` shortcut → popover captures note bound to
    (reading, nearest section, selected text if any). `/notes` page lists/filters/exports.
12. **Command palette** — ⌘K fuzzy search across readings, concepts, formulas.
13. **Progress & mastery** — mark-done per reading, quiz scores, weak-area list
    (score < 70% or 5★ readings not done) on a `/progress` dashboard.

### Additional ideas shipped now (cheap + high value)
- **Formula sheet** `/formulas` — every formula grouped by book/reading, filter by stars, printable.
- **Spaced-repetition review queue** `/review` — SM-2-lite over all recall cards; due counts in nav.
- **Confusion drill** — quiz mode generated from `connections.confused` pairs.

### Ideas proposed, not built yet (see final report)
~~Study planner to exam date; error log ("why I was wrong" notes type); glossary index;
calculation drills with randomized numbers~~ — all four shipped 2026-07-19
(`/planner`, notes `kind:"error"` + quiz "Log to error log", `/glossary`, `/drills`).
Still open: sync backend; multi-course shell.

## Content pass (workflow, Sonnet)

One agent per reading rXX.js: read current file + locate the reading in the source MD
(grep by title/keywords); rewrite thin `teaches/why/intuition/concepts` at teacher grade
(specifics like actual instruments/contracts, worked numbers); add all new fields; fix LaTeX.
Validation gate per file: `node -e 'import("./src/data/...").then(m => sanity checks)'`.

## Verification

`npm run build`; import-check all 101 files (schema sanity script); headless render
spot-checks of representative chapters (r67, r85, r02); manual QA list in report.
