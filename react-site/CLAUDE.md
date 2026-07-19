# react-site/CLAUDE.md — the guide for every future agent working on this app

Written by Claude Fable 5 (2026-07-19) after reviewing every line of this codebase. This is
the binding style guide for **content, code, and UI**. If an instruction here conflicts with
your instinct, follow this file — the conventions below were established deliberately and the
student's experience depends on them staying coherent.

**Start every session by reading `../PROGRESS.md`** (the single resume point) and end every
session by updating it. The vanilla `../site/` app is frozen — never edit it; it exists only
as the reference implementation the widgets and renderers were ported from.

---

## 1. Who you are writing for, and how to teach

This is not a documentation site and not a summary generator. The user is **one student
preparing for the FRM Part II exam** who chose this app over just rereading the Schweser
books because the books state facts without building understanding. Every sentence you write
must earn its place by doing one of three jobs: building intuition, preventing a specific
confusion, or converting knowledge into exam-ready recall.

The teaching doctrine, in order of priority:

1. **Ground everything in the source material.** All curriculum content is extracted from
   the Schweser books at the repository root (`Book N (1).md` full texts; `FRM2_*_CompleteBookN.md`
   condensed companions for Books 1–4; Book 5 has only the full text). Never invent facts,
   numbers, named lists, or committee structures. If the source doesn't say it, you don't
   write it. Rephrasing for clarity is the job; adding content is a defect.
2. **Intuition before formalism.** Sections are ordered teaches → why → intuition → eli5 →
   thinkLike → visual → breakdown → formulas → concepts → … deliberately: the student meets
   the *idea* three or four times before the first equation. When you write a formula's
   `plain` field, it must let a student who skipped the math still answer a conceptual exam
   question about it. Derivations are optional depth (`derivation`), never the main path.
3. **Start from a person, not a definition.** The best explanations in this app anchor on an
   actor and their incentive ("Start from who is reading the report and what they are allowed
   to do about it…", "Picture an interest rate swap between Bank A and Bank B…"). Prefer that
   shape over "X is defined as Y".
4. **Teach the trap, not just the truth.** The exam is built from misconceptions. Every
   reading carries `misconceptions` ({wrong, right} pairs — write the *wrong* one so it
   genuinely sounds plausible), `concepts[].pitfall`, and `connections.confused`. When you
   explain anything subtle, ask: what would a smart student get wrong here? Write that down.
5. **Concrete numbers over abstractions.** A worked example with $100M notional and 4%/100bp
   beats a paragraph of prose. Examples live in `concepts[].example`; counterexamples
   (`counter`) show where the concept breaks.
6. **Respect the student's time.** `highYield` stars are a contract: 5★ = "this WILL be on
   the exam", and downstream features (KeyPoints rail, planner weighting, home-page global
   high-yield list) consume them. Don't inflate stars. `summary` is one page, telegraphic,
   rereadable the morning of the exam.

### Content schema (each `src/data/bookN/rNN.js` default-exports this)

```
{ book, reading, session, title, tagline, teaches, why, intuition,
  eli5, thinkLike,                       // teaching layers (HTML strings)
  visual,                                // optional: `<div class="widget" data-widget="NAME" ...>`
  breakdown: [{title, points[]}],        // pointwise lists of enumerable ideas
  formulas: [{name, math, plain, note, derivation}],
  concepts: [{name, def, intuition, example, counter, pitfall, related, memory}],
  connections: { from:[{r,why}], to:[{r,why}], confused:[{what,how}] },
  misconceptions: [{wrong, right}],
  highYield: [{stars, what, why}],
  quiz: [{q, options[4], answer, why}],
  recall: [{q, a}], hooks: [{title, text}],
  sources: [{title, url, note}], pdf: {book, query}, summary }
```

Hard rules learned from production incidents:

- **Quiz**: exactly 4 options. `Quiz.jsx` (and `/mock`) **shuffle option order every round**,
  so (a) answer-index clustering in the data is harmless — never "rebalance" it — and
  (b) a `why` that says "Option A" or "B and C" points at a *random* option in the UI.
  Whys must paraphrase content ("Doubling the horizon scales VaR by √2, not 2…"), never
  reference letters. No "None/Both of the above" options — they're position-dependent.
- **LaTeX**: `formulas[].math` is real LaTeX (`\dfrac{\text{…}}{\text{…}}`), typeset by KaTeX
  when it "looks like TeX" (`lib/tex.js` `isTex`). Prose math uses `\( … \)` / `\[ … \]` —
  **never `$…$`**, because dollar amounts in source text must not be mangled. Bare English
  words inside math must be wrapped in `\text{}` (the validator rejects them).
- **`pdf.query`** must appear **verbatim** in the source MD (strip `**` and normalize curly
  quotes when grepping to check) — it drives the "Open source PDF" search-jump.
- **`sources`**: reputable domains only (regulators, exchanges, Investopedia-tier references,
  original papers). Check every URL's domain plausibility.
- **`visual` widgets**: the `data-widget` name MUST be registered in `src/widgets/*` or the
  chapter renders a "widget failed" box. Check
  `grep -rho 'register("[a-z0-9-]*"' src/widgets` before referencing a name. (r32/r45 shipped
  broken for a session because a content agent invented widget names.)
- Cross-references (`connections.from/to`, `concepts[].related` `{r, label}`) must resolve
  against reading numbers in `src/lib/meta-data.js`.

**Gate every content change** with `node scripts/validate-reading.mjs bookN/rNN.js NN`, and
after ANY multi-agent run over data files, import-sweep every touched file
(`node --input-type=module -e "await import('./src/data/$f')"`) — agents killed mid-edit can
leave unescaped quotes that the validator never gets to see.

---

## 2. How to write code here

Stack: **Vite + React 18, plain JSX, no TypeScript**, react-router `HashRouter`, Tailwind 3.4
(preflight OFF) coexisting with a legacy `src/styles/style.css`, Radix primitives, KaTeX,
pdfjs-dist. Keep the dependency list this small — adding a dependency needs a reason a
one-file utility can't satisfy.

### Architecture invariants (breaking these has bitten us before)

- **`src/lib/meta-data.js` is the single source of truth for structure** (books, readings,
  stars, deps, threads, graph). Never hardcode a reading count, book color, or path — derive
  via `lib/meta.js` helpers (`bookOf`, `readingMeta`, `rpath`, `bpath`).
- **Readings load lazily** (`src/lib/readings.js`). `useReading(rn)` for one reading,
  `useAllReadings()` for the full map — both return `null` while loading and **every consumer
  must render a loading state** (the pattern: keep the page's `h1`/lead visible, swap the body
  for a faint "Loading…" line). `getReading(rn)` is a sync cache read, only safe in components
  that render *after* the reading is already on screen (MiniMap, Highlighter). The legacy
  `readings` export is an initially-EMPTY map — never build an index from it at module scope.
  Do not revert to eager loading: it was a 5MB main bundle.
- **All user state lives in one versioned localStorage blob** via `src/lib/store.js`
  (`useSyncExternalStore`). Two iron rules: (1) selectors must return **stable identities** —
  `useStore((s) => s.x || {})` creates a fresh object per call and causes React #185 infinite
  loops; select the raw slice and default *outside* the selector. (2) Every reader treats
  newer keys as optional (old blobs lack them); mutations always spread the previous state.
  New user data = new optional key on the blob + mutation function in store.js, documented in
  the shape comment at the top. No other persistence, no backend.
- **Route-level code splitting**: Home/Book/Chapter are eager; everything else is
  `React.lazy` in `main.jsx` (PdfView especially — it isolates pdfjs). New pages follow that
  pattern and get: a route in main.jsx, a Study-menu entry in `Nav.jsx`, and a `PAGES` entry
  in `CommandPalette.jsx`.
- **Trusted-HTML rendering**: curriculum HTML goes through the `<Html>` component (which
  typesets `\( … \)` prose math). Formula math: `renderMath(f.math, display)` +
  `isTex() ? "f-tex" : ""` class + `fitMath(root)` after mount. Never render a content field
  as raw JSX text (it will print literal `<em>` tags) and never bypass `<Html>` with your own
  `dangerouslySetInnerHTML` for content fields.
- **Global keyboard handlers** must start with the guard:
  `if (e.metaKey||e.ctrlKey||e.altKey) return;` then bail if `e.target` is
  INPUT/TEXTAREA/contentEditable. Existing shortcuts (don't collide): `n` note, `⌘K` palette,
  `[`/`]` prev-next reading, `1-4`/`a-d` quiz answer, `Space`+`1-4` review grading.
- **Widgets** (`src/widgets/`) are imperative `(el) => void` draw functions registered by
  name, written in the ported vanilla style (`var`, string-built controls, `svgEl`/`shell`
  helpers). Colors ONLY via CSS variables so both themes work. Each widget reads params from
  `data-*` JSON attributes with defaults, draws once, and redraws on its own control input.
  Books 1–2 widgets live in `core.js`, books 3–5 in `book{3,4,5}.js`.

### Style

- Function components + hooks only; no classes, no HOCs, no context providers (the store
  pattern replaces them). Small files, one component per concern; page-level composition in
  `src/pages/`, chapter internals in `src/components/chapter/`, generic primitives in
  `src/components/ui/`.
- Match the file you're editing: this codebase mixes Tailwind utility classes (newer shell
  components) and inline `style={{}}` with CSS-variable values (older pages). Either is
  fine — **do not "clean up" one into the other in unrelated diffs.**
- Comments state constraints the code can't show (why a rAF retry exists, why a guard is
  needed), never narrate what the next line does.
- Defensive rendering: content code must never throw on a missing/malformed field — the
  orphan-safe pattern in `lib/highlights.js` (catch, skip, report) is the house standard.

---

## 3. UI doctrine

The bar is "credible commercial study tool", not "AI-generated dashboard". Concretely:

- **Dark-first, two themes.** Theme = `data-theme` on `<html>`, set pre-paint in
  `index.html`. Every color in JSX/SVG/CSS is a variable: text `var(--text)/--text-dim/
  --text-faint`, chrome `--border/--border-strong/--bg-raised/--bg-inset/--bg-hover`, semantic
  `--accent/--green/--red/--amber/--purple/--cyan/--pink` (+ `-soft` fills). Tailwind tokens
  map onto the same vars (`text-ink`, `text-dim`, `text-faint`, `border-line`,
  `border-linestrong`, `bg-raised`, `bg-inset`, `bg-hovered`, `bg-accent-soft`, `rounded-el`,
  `rounded-card`, `shadow-card`, `font-app`, `font-mono`). A hex literal in a component is a
  review failure (the only exceptions: the mind-map's fixed book palette and highlight-mark
  colors, which are shared across themes by design).
- **Book color is the identity system.** Anything scoped to a book uses `b.color` /
  `b.colorSoft` from META (kickers, progress bars, borders-left, dots, chips). Don't invent
  new accent colors per feature.
- **Established patterns — reuse, don't reinvent:** `.section-label` with colored dot for
  section starts; `.card` (+ `.card.accent`) for grouped content; `.chip` for filter pills
  (active = colored border + colored text); `.kicker` for the small colored eyebrow above
  h1; `.stat-row`/`.stat` for number tiles; `.reading-row` for reading lists; `Progress`
  bar with per-book color; `Badge` tones green/amber/red for scores. Radix (`components/ui/`)
  for anything with open/close semantics — dialog, popover, accordion.
- **Type scale is quiet:** body ~0.9rem, secondary 0.82–0.88rem, metadata 0.72–0.78rem,
  numbers and counts in `font-mono`. Emphasis comes from weight and color, not size jumps.
- **Interaction details are the polish:** hover states on everything clickable
  (`hover:border-linestrong hover:bg-hovered` or color shift), `transition-colors`,
  keyboard access for anything with onClick (role="button", tabIndex, Enter/Space), loading
  states for every async boundary, and empty states that *teach* ("No highlights yet.
  Select any passage of text inside a chapter…" — every empty state tells the student how
  to create the thing).
- Layout: content column `main.page` (~860px), wide pages `main.page.wide`; docked rails
  (TOC right, KeyPoints left) only ≥1400px via portals to `<body>`.

---

## 4. Verification — nothing ships without this

```bash
npm run build                                   # must stay green, zero warnings you introduced
node scripts/validate-reading.mjs bookN/rNN.js NN   # after any content edit
# render-check (dist does NOT work over file:// — ES-module CORS):
npm run build && cd dist && python3 -m http.server 4177 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=9000 --dump-dom "http://localhost:4177/index.html#/chapter/32" \
  | grep -c 'widget failed\|undefined<\|>null<\|tex-error'   # must print 0
```

Spot-check at minimum: home, one chapter per touched book, and every page whose code you
changed. Interactive behavior (text selection → highlight toolbar, keyboard shortcuts)
cannot be verified headless — flag it for the user instead of claiming it works.

## 5. Working as a fleet

For fan-out work (per-reading content passes, per-file conversions): one agent per file,
file-scoped prompts that paste the exact API contract, agents do NOT run builds (they
collide); the orchestrating session builds, import-sweeps, render-checks, and fixes after
all agents land. Reuse the enrichment workflow script referenced in `../PROGRESS.md` for
content passes. Update `../PROGRESS.md` (and the feature table) before ending the session —
it is the only memory the next session is guaranteed to have.
