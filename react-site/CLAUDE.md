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
7. **Never leave the student needing to ask "why?" elsewhere.** The whole reason this app
   exists is so the student never has to reach for another tool to understand a claim. When a
   statement is **counterintuitive** — anything that cuts against a natural assumption — you
   MUST supply the mechanism in the same breath, not just assert the surprising fact. Example
   of the failure (real, from r63): *"deposits have become LESS stable over time — depositors
   rate-shop across institutions"* states the surprise but not the WHY, so the student had to
   ask an AI. The fix is to explain the causal chain (online banking made moving money
   frictionless; deposit-insurance caps mean large balances flee first; competition means the
   whole deposit market reprices at once under stress) — **sourced from Schweser, never
   invented.** Give counterintuitive points MORE room, not less. Where students genuinely
   struggle, a simpler, slower explanation is correct; simpler ≠ oversimplified — never drop
   the exam-relevant nuance, just build the intuition before stating it.

**Exemplar worth rereading before any intuition/eli5 pass: R28's tranche-correlation
explanation** (user-flagged as the best writing in the app, 2026-07-21). Two moves worth
copying: (1) it opens with a *known, simpler* system before the real one — a fair-coin-flip
analogy for zero correlation, then perturbs it ("now raise the correlation... it's more like
flipping 1,000 coins that are all wired to tend to land the same way") rather than presenting
the correlated case cold; (2) the `eli5` reframes the entire tranche waterfall as apartment
rent tickets (Gold/Silver/Bronze paid in a fixed pecking order) and resolves the SAME
correlation mechanism through that frame, so a reader who only has the ELI5 still reaches the
real conclusion (senior hurt by correlation, equity helped by it) without needing the formal
version at all. Both explanations independently earn the punchline instead of just asserting
it — that's the bar.

### Prose style — HARD RULES (apply to every user-facing content field)

- **NO EM-DASHES OR EN-DASHES ANYWHERE** (`—`, `–`). They read as AI-generated and the product
  owner has banned them outright. Rewrite with a comma, colon, parentheses, or a full stop —
  usually a full stop or colon reads better anyway. This applies to ALL content fields
  (`teaches`, `why`, `intuition`, `eli5`, `thinkLike`, `concepts[].*`, `breakdown[].points`,
  `misconceptions`, `highYield`, `hooks`, `recall`, `summary`, taglines, quiz whys). A minus
  sign in math (`a-b`) or a hyphen in a compound word (`risk-weighted`) is fine; the banned
  characters are specifically the long dashes. Grep check before shipping any content edit:
  `grep -Rn '—\|–' src/data/<file>` must return nothing.
- **Human, plain tone.** Write the way a sharp tutor talks, not the way a textbook is printed.
  The tone-humanization + em-dash removal has NOT been done across the 101 readings: as of
  2026-07-21, `src/data` still holds **7,614 em/en-dashes and 100 of 101 readings fail the
  validator's dash budget.** This is now the product's TOP-PRIORITY backlog item, scoped in
  full in **section 8** (it supersedes the older workstream note in
  `docs/superpowers/specs/2026-07-20-comfort-ui-v2-plan.md` §6b).

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

### 1a. Problem-first teaching doctrine: binding for Revision and Core-Concept pages

Added 2026-07-21 (third pass), after the user reviewed a ChatGPT explanation of the
CDO/CLO/CMO/securitization family and found it far better than anything currently in the app:
clear on the fundamental picture, explained simply, and explicit about the concept's distinct
use cases (credit-loss tranching vs mortgage-prepayment tranching) instead of blurring them
together. This section makes that explanation shape a standing doctrine, not a one-off.

**Where this applies.** Section 1's rules above (ground in Schweser, intuition before
formalism, teach the trap, concrete numbers) govern every reading. This doctrine is an
ADDITIONAL, stricter structure that specifically governs the two standalone content layers
that exist to teach something once, deeply, and get reused everywhere it resurfaces:

1. **Foundational-concept / revision pages** (section 7.1): Part I (or otherwise
   already-assumed) knowledge that a Part II reading depends on and that students have
   typically half-forgotten. These should reteach the concept from first principles, not
   just remind the student of a fact. The shipped v1 (a `connections.from`-derived "Refresher"
   banner + SRS card, both auto-generated from a one-line `why`) is the lightweight case;
   a concept dense or confusing enough to need real re-teaching (securitization, TVM,
   duration/convexity, option basics, correlation, copulas) earns a dedicated page built to
   the structure below instead of a one-liner.
2. **Core-concept deep-dive pages** (section 6, `/concept/:slug`): an advanced model or
   structure that resurfaces across readings and deserves one authoritative, deeper-than-the-
   book explanation instead of getting thinly re-explained every time it comes up.

Ordinary per-reading content (`teaches`/`why`/`intuition`/etc.) should keep doing what
section 1 already asks of it, but should NOT re-teach something that has its own Revision
or Core-Concept page: it should explain the reading's own specific material and link out
(`connections.from`/`related`) to the deeper page for the underlying concept. The reading is
where the curriculum-specific material lives; the Revision/Core-Concept page is where the
concept itself lives.

**The narrative structure.** Do not open with a definition. A definition is a label for an
idea the student doesn't have yet, and a label attached too early gets memorized instead of
understood. Instead, build the idea in this order:

1. **Create the problem.** Put the student inside a concrete situation as the person who has
   to act, not as an observer reading a description. "You're a bank holding a thousand
   mortgages and you need cash today, not in thirty years" beats "securitization is a
   process by which...". Name the actor, their constraint, and what they're stuck wanting to
   do that they currently can't.
2. **Explain why the obvious first move falls short.** There is almost always an existing,
   simpler way to handle the problem before the concept being taught existed. Show it, and
   show concretely why it stops being enough, the specific pain point, not a vague "but this
   has limits." The student should start wanting the next idea before you introduce it.
3. **Introduce the simplest real solution, alone.** One idea at a time. No exceptions, no
   variants, no forward references to what comes later. The student should think "that
   makes sense" before any complexity gets layered on.
4. **Show where that simplest solution runs out.** Who is left unhappy by it, and why,
   concretely (a number, a scenario, an incentive that doesn't line up).
5. **Introduce the next evolution as the direct answer to that gap**, and repeat steps 4-5
   for every further step in the concept's real history, sourced from Schweser (or, for the
   core-concept "extra depth" layer specifically, well-established outside finance history,
   clearly labeled per section 6's beyond-exam-scope rule). The progression should read as a
   chain the student can retrace (A existed, A's limit forced B, B's limit forced C), not a
   flat list of siblings.
6. **Once multiple live options exist, compare them explicitly, side by side.** Don't teach
   sibling structures as separate, unconnected facts. Name what they share (often the same
   mechanical skeleton, tranching, waterfalls, thresholds) and the ONE dimension that
   actually differs between them, then answer, concretely: why would someone choose one over
   another, what risk does one carry that the other doesn't, what does an investor or
   manager actually get from each that they don't get from its sibling. (This is exactly
   where the CDO/CLO-vs-CMO confusion lived: both tranche a pool, but a CMO tranches
   PREPAYMENT/cash-flow timing while a CDO/CLO tranches DEFAULT/credit losses, two unrelated
   risk dimensions that happen to use the same word, "tranche.")
7. **Only now, name it.** Formal terms become labels the student attaches to an idea they
   already hold, not the thing they were asked to memorize cold.

Thread through every stage: **treat each new idea as the answer to a question the student
has already started asking, and never answer a question they don't have yet.** If the reader
wouldn't yet be wondering "so what happens if...", don't introduce the thing that answers it.

**Tone.** Same "human, plain tone" hard rule as the rest of section 1 (no em/en-dashes,
concrete numbers, a person and their incentive, not "X is defined as Y"). This doctrine
changes STRUCTURE and ORDER, not the prose-style rules already in force. Write like a sharp
tutor thinking out loud with the student, not a textbook or a lecture-note summary: ask the
question the student is silently forming, then answer it, rather than pre-empting every
question with an encyclopedia entry.

**Priority content backlog under this doctrine (not yet built):** the securitization/
structured-finance family, covered bonds to pass-through MBS to CMOs to credit tranching
(CDO/CLO) to CDO-squared, is the flagship case that motivated this section and should be the
next Revision-and-Core-Concept build (after the existing Vasicek WCDR core-concept pilot).
It needs BOTH layers: a Revision page re-teaching securitization/structured finance from
first principles (Part I foundation many Part II readings assume), and a Core-Concept page
(or a small family of them, one per structure) making the CMO-vs-CDO/CLO distinction the
explicit centerpiece via stage 6 above, since that exact distinction, cash-flow/prepayment
tranching vs credit/default tranching under the shared word "tranche", is the single biggest
source of confusion the user identified. Build it the same way section 6/7.1 were built:
research the actual Book 2-4 source coverage of these structures first, confirm the specific
readings and formulas involved, then write to the structure above; do not invent facts or
history not supported by Schweser or well-established finance history (and label the latter
per the beyond-exam-scope rule).

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

**Never run `git stash`, `git reset`, or any other repo-wide git state change from inside a
fan-out agent.** Agents share one working tree with the orchestrator and with each other; a
stash/pop on a dirty tree can silently drop or reorder another agent's or the orchestrator's
uncommitted edits (this happened on 2026-07-21 — a content agent's stash/pop wiped four
infra files the orchestrator had just written, recovered only because the orchestrator still
had the edits in its own context and could redo them). Agents touch only their assigned
files with Edit/Write; if a file-scoped edit needs a clean baseline, re-read the file, don't
stash.

## 6. Roadmap: cross-reading core-concept system (Phase 1+2 BUILT, Phase 3 not yet)

Requested 2026-07-21: reused, theory-dense models (the motivating example: Vasicek WCDR,
which is defined once in R21 and then referenced by name across R8/R11/R12/R13/R14/R26/R27/
R29/R59) currently get re-explained thin or not at all when they resurface in a later
reading. The ask is a Wikipedia-style cross-reference system: hover a model's name anywhere
it's reused → short snippet pops up → "Learn more" opens a dedicated, deeper-than-the-book
explanation page → a "Back to reading" button returns to wherever you came from (shown only
if you arrived from an actual reading, not from a concepts index). This is a multi-phase,
usage-intensive build — do NOT implement it opportunistically inside an unrelated session;
treat it as its own scoped project. Decisions already made with the user (do not re-litigate
without asking):

- **Which models qualify — automatic, not curated.** Any name that appears in `formulas[]`
  or `concepts[]` across 2+ readings (normalized match) is auto-promoted to a "core concept."
  No manual registry to maintain.
- **Depth beyond the book is allowed.** Core-concept pages MAY include general finance
  knowledge not present in the Schweser source (unlike every other content field in this
  app) — but it MUST be clearly labeled as beyond-exam-scope ("Extra depth" / "Beyond the
  exam") so a student never mistakes outside content for something GARP will test. This is a
  deliberate, scoped exception to the "never invent, only from Schweser" hard rule in section
  1 — it applies ONLY to this feature's extra-depth layer, nowhere else.
- **Piecewise formula breakdown wanted.** For a formula like WCDR, every symbol needs its own
  explained row (what it is, why it's there, e.g. why the inverse-normal, why the √ρ), not
  one paragraph — the R21 "Show the math" derivation is a good base to build from but isn't
  itself piecewise.

Proposed build (not yet started, no code written):

1. **`src/lib/coreConcepts.js`** — scans `useAllReadings()`, builds `{ slug, name,
   homeReading (lowest rn it appears in), refs: [rn...] }` for every formula/concept name
   that recurs across 2+ readings.
2. **`/concepts` index + `/concept/:slug` page** — lazy routes like other secondary pages;
   the deep-dive page renders the home reading's existing formula/concept content as the
   base layer, plus a new optional authored layer (`formulas[].terms: [{symbol, meaning,
   why}]` for the piecewise breakdown, `formulas[].deepDive` HTML for the extra-depth
   section, visually separated and labeled per the rule above).
3. **Inline reference + hover snippet** — later readings that reuse a core-concept name get
   it wrapped (auto-detected, not manually authored, same keyword-match style as
   `lib/related.js`) in a small component rendering a dotted-underline term; hover (desktop)
   or tap (mobile — hover doesn't exist on touch, needs a tap-to-open fallback) shows a short
   auto-generated snippet via a Radix HoverCard/Popover, with a "Learn more →" link to
   `/concept/:slug`.
4. **Back-to-reading button** — navigate to the concept page with router `state: {
   fromReading: rn }` (same convention as the existing `state.resume`/`state.scrollTo` on
   Chapter.jsx); the concept page shows "← Back to Reading {rn}" only when that state key is
   present, so arriving via `/concepts` or a bare link shows no button.

Sequencing, because this touches every reading that reuses any core concept (a large
fan-out): **Phase 1** (BUILT, 2026-07-21 tenth session): `scripts/build-core-concepts.mjs`
auto-detection + `/concepts` index + `/concept/:slug` page (book-layer content only) +
back-to-reading button, no hover snippets yet, no extra-depth content yet. **Phase 2**
(BUILT, same session): piecewise `formulas[].terms[]` breakdown + first authored
`formulas[].deepDive` content, piloted on Vasicek WCDR (`src/data/book2/r26.js`). **Phase 3**
(NOT YET BUILT): the inline hover-snippet linking pass across all readings that reference an
established core concept (the expensive phase; do as a dedicated fleet run, one agent per
file, following section 5's rules).

Every Core-Concept page's authored content (the base layer plus any `deepDive`/`terms[]`
layer) MUST follow the problem-first narrative doctrine in section 1a, not just the general
section 1 rules. The Vasicek WCDR pilot's `deepDive` predates section 1a and should get a
pass against it (stage-by-stage: problem, why the simple version falls short, evolution,
comparison, only-then-the-formula) next time that page is touched, not necessarily as its own
standalone task.

**Next priority content build (per section 1a):** the securitization/structured-finance
family, covered bonds through pass-through MBS through CMOs to CDO/CLO credit tranching. Scan
Book 2 (Credit Risk) and Book 3/4 (wherever MBS/ABS/CMO mechanics live) for the actual
readings and formulas involved before writing anything, the way the Vasicek pilot did, then
build both a Revision page (section 7.1, securitization from first principles as Part I
foundation) and a Core-Concept page or small family of them (this section), built to make the
CMO-vs-CDO/CLO distinction (cash-flow/prepayment tranching vs credit/default tranching, the
same word "tranche" for two unrelated risk dimensions) the explicit stage-6 comparison
centerpiece.

## 7. Roadmap: further ideas scoped 2026-07-21 (7.1/7.2/7.4 v1 BUILT, 7.5 BUILT, 7.3 deprioritized)

Four more requests from the same session, deliberately scoped here instead of built, so a
future session with more usage budget can implement them without re-deriving requirements.
**When the user says something like "check CLAUDE.md for what's left and implement it,"
this section (and section 6) is what they mean.** Treat each as its own scoped project —
brainstorm/confirm specifics with the user before building, the way section 6 was handled,
since these are still spec-level, not fully nailed down.

### 7.1 Foundational-concept revision system

The problem, in the user's words: for FRM Part II specifically (as opposed to Part I / CFA
Level I), readings constantly assume prerequisite concepts the student learned earlier and
may have quietly forgotten. This is a *different* problem from section 6's core-concept
system: section 6 is about a reused ADVANCED model resurfacing (Vasicek WCDR); this is about
a basic/foundational prerequisite silently assumed and never re-taught.

**v1, BUILT (tenth session, 2026-07-21):** prerequisites are read straight off each reading's
existing `connections.from` entries (no new tag needed); the surface is both a "Refresher"
banner on Chapter.jsx for any prerequisite reading not yet marked done, and a "Foundational
prerequisites" card kind in `Review.jsx`'s existing SRS engine, auto-generated from
`connections.from[].why` (no new authoring). This v1 is intentionally lightweight: a one-line
reminder plus a spaced-repetition card, not a re-teaching.

**v2, NOT YET BUILT: real revision pages.** The user's own example that motivated going
further: forgetting that equity is the lowest tranche in the capital structure while reading
R28's correlation material, which depends on already knowing the tranche waterfall, plus a
second, richer example surfaced later (2026-07-21, same day): CDO/CLO/CMO structuring is Part
I foundational knowledge that resurfaces constantly in Part II credit and structured-product
readings, and a one-line reminder isn't enough for it, it needs to be RE-TAUGHT from first
principles. v2 is a dedicated, reusable Revision page per major prerequisite concept
(securitization/structured finance, TVM, duration/convexity, option basics, futures
mechanics, correlation, copulas, regression intuition, credit-risk fundamentals, and others as
they come up), built to the section 1a problem-first doctrine, not a summary of the prior
material. Likely implementation: reuse the section 6 `/concept/:slug` page architecture (it
already renders a base layer, comparison content, and a gated back-to-reading button) with a
`layer: "revision"` vs `layer: "core"` distinction, rather than building a parallel page type
from scratch, since the two systems want the same shape (one deep page, linked from every
reading that assumes it, don't re-teach inline). The securitization/CDO-CLO-CMO family
(section 6's "next priority content build") is the natural pilot for this v2 mechanism, since
it needs both a Revision page (structured finance from first principles) and a Core-Concept
page (the CMO-vs-CDO/CLO comparison) at once.

### 7.2 Settings page (BUILT, tenth session, 2026-07-21: font size only)

`/settings` page (lazy route, Study-menu + command-palette entry). `layout.fontScale` store
key, applied as `--font-scale` on `<html>` per the existing CSS-variable convention. Font
family and background color/theme granularity beyond the existing dark/light toggle remain
explicitly deferred, "not that important," in the user's words, don't build those until
asked again. The page shell is laid out as labeled sections so more controls can be added
without restructuring.

### 7.3 Paid-access device licensing (auth + device binding)

For when this app is distributed for money. Full rule set as specified by the user
2026-07-21 (do not simplify or reinterpret without re-confirming — these numbers were
deliberate):

- Account requires a user ID + password, **plus additional device-binding signal** beyond
  credentials alone (exact mechanism TBD at design time — e.g. a server-issued device token
  stored per device — since credentials alone can't enforce device limits).
- Each account gets **exactly one "computer" slot and one "phone" slot** as primary devices —
  both may be used concurrently, no restriction between them.
- If the account is used from a device that isn't one of the two current primary devices:
  that new device gets a **4-hour access window**, after which it's locked out, and **cannot
  attempt access again for 2 days** — UNLESS the user promotes it to replace a primary device
  during that window (see next rule).
- **Primary device reassignment (swapping which computer/phone is "the" primary) is allowed
  at most once per 7 days.** This is the actual anti-sharing mechanism: someone who wants to
  hand the account to a friend can technically do it, but only by burning their one
  reassignment per week and giving up their own access in the process — not something a
  legitimate single user would ever hit accidentally.
- If a legitimate user needs off-primary-device access outside these rules (e.g. traveling,
  borrowed device, lost phone), the intended path is a **support enquiry to us**, not a
  product-side self-service override — i.e. this is a deliberately strict default with a
  human escape hatch, not a fully automated flow.

This needs backend infrastructure this repo does not currently have (there is no
server/auth/payments layer yet — see PROGRESS.md's "Deferred / later" list, which already
flagged "any backend/auth/payments" as out of scope for the current local-storage-only
architecture). Scoping this now is explicitly about **capturing the exact business rule**
before it's forgotten, not about being close to buildable — implementing it is a distinct,
large project (needs a backend, a database, session/device-token management, and a support
workflow) that should get its own brainstorm-through-plan cycle whenever the product is
ready to charge for access.

### 7.4 Split-view source material alongside a reading (BUILT, tenth session; free-form rework twelfth session, 2026-07-22)

Lets the student open source material (the full Schweser book) and/or the condensed
companion PDF (Books 1-4 only) in a side pane next to the reading instead of navigating away
to `/pdf/:bn`. `PdfView.jsx`'s rendering was extracted into a shared `PdfCore` component
(`window` mode for the route, `pane` mode for the new container-scrolled side panes) rather
than duplicating it. Chapter.jsx's "Split: Source"/"Split: Condensed" toggles support source
alone, condensed alone, or both at once; desktop-only (≥1100px, matching the reading-width
resizer's breakpoint), falling back to the full-screen `/pdf/:bn` route below that.

**Free-form rework (2026-07-22, this file's twelfth session), per the owner's "full
customizability" ask:** the layout is now one flex row where the **reading column is always
visible** (`flex: 1 1 auto`, `min-width: 160px` so a book can fill ~90% of the screen) and
each open pane is an independent fixed-width column. Model deliberately kept simple: **the
reading column absorbs every drag** — dragging a pane's own resize handle (on the edge facing
the reading) changes only that pane's width via `setSplitPaneWidth`; to move width between two
open books you drag each one (no two-way divider, by owner's request). A **left/right dock
toggle** (`setSplitSide`, "Dock left/right" button in the chapter action row) flips the pane
group to either side of the reading. Each PDF pane has its own **zoom** (`setSplitZoom`, −/%/+
in the PdfCore toolbar, 0.5–3×): the pane page now fills its width (pane-mode `maxWidth` raised
to 2400) and zoom multiplies beyond that with horizontal scroll. All new state lives on the
`layout.split` blob as optional keys `{ side, widths:{source,condensed}, zoom:{source,condensed} }`
(the old single-region `width`/`ratio` keys and their setters were removed). PDF text
highlighting was explicitly **deferred** out of this pass (it needs a selectable text layer
over every page + its own stored book-highlights data — its own build when the owner asks).

Separately this session: the **top navbar center** now shows "Reading N" on any `/chapter/:rn`
page with app-wide **font-size zoom** (A−/%/A+, wired to the existing `layout.fontScale` /
`setFontScale`, clamped 0.8–1.6×) right underneath it, so the student can resize reading text
without opening Settings. It's an absolutely-centered, `pointer-events-none` wrapper inside the
sticky `.topnav` (children re-enable pointer events) so it never disturbs the nav flex layout.

### 7.5 Reading focus + source anchoring (BUILT, thirteenth session, 2026-07-24)

Spec: `docs/superpowers/specs/2026-07-24-reading-focus-and-source-anchoring-design.md`. Four
changes, all shipped. Things a future agent must not undo:

- **`src/lib/scrollAnchor.js`** keeps the paragraph under the nav bar pinned across every
  reflow (window resize, reading-column drag, split-pane drag, font-scale change, split
  open/close). `useScrollAnchor(rootRef)` from `Chapter.jsx`. The file's comments encode
  constraints that look like over-engineering and are not: the capture is a **timer, not a
  rAF** (rAF callbacks run before ResizeObserver callbacks in the same frame, so a rAF
  capture always beats the observer to the pre-reflow geometry); the restore uses
  `behavior: "instant"` because `html { scroll-behavior: smooth }` would otherwise animate
  it; the busy guard is a wall-clock timeout because a programmatic scroll's own `scroll`
  event can arrive more than a frame later; and opening a split pane **remounts** `.page`,
  so the anchor is re-found by tag+text fingerprint instead of dropped. Not yet applied to
  `Revision.jsx` / `ConceptPage.jsx` (one-line additions if wanted).
- **`PdfCore` takes `initialQueries: string[]`, an anchor ladder**, not a single query
  (a bare string is still accepted). Candidates are tried in order against a page-text cache
  that is scanned once, so candidates 2..n are free. Source pane `[pdf.query, title]`,
  condensed pane `[title, pdf.query]`, `/pdf/:bn` `[q, q2]`. **Callers MUST memoize the
  array** — the auto-search effect is keyed on the joined ladder so an open pane re-searches
  when it changes, and a fresh array every render would re-search every render. `pdf.query`
  is authored against the FULL book and appears in the condensed companion only ~7% of the
  time, which is why the condensed ladder leads with the title. Initial-jump TOC suppression
  skips the leading 3% of pages AND prefers a post-cutoff page where the phrase appears in
  the first 160 characters (a heading) over one that merely mentions it, which is what keeps
  it off study-session divider pages; the full `matches` array is untouched so ↑/↓ still
  reach every hit.
- **Fullscreen state lives in `src/lib/fullscreen.js`, NOT in the `layout` blob.** It is
  session-only on purpose: `requestFullscreen()` requires a user gesture, so a persisted
  `true` reloads into a half-applied mode with no clean recovery. `main.jsx`'s `Shell` owns
  the `f` hotkey and the `.fs-exit` chip; `html[data-fullscreen]` zeroes `--nav-h` and hides
  `.rail-panel`, `.edge-tab`, `.corner-pill`, `.qn-fab`.
- **The selection toolbar's "Read in source ↗" opens the source split pane** (≥1100px) via
  `layout.split.q = {rn, text}` rather than navigating to `/pdf/:bn`. The `rn` scoping
  matters: the ad-hoc anchor is only prepended to the ladder when it belongs to the reading
  on screen, and is cleared when the pane closes or the reading changes. The chapter header's
  "Open source PDF ↗" and "Split: Source" buttons deliberately keep their old behaviour.

Follow-up logged by the spec and still open: **21 readings whose `pdf.query` is authored
prose rather than verbatim source text** (r02, r18, r41, …) now rely on the title fallback.
Rewriting those queries against the real source is a content task and belongs with section 8.

## 8. TOP PRIORITY: the content-quality pass (scoped 2026-07-21, eleventh session)

The product owner's explicit direction after reviewing the tenth session's feature work:
**hammering the main portions of the content is what will make users retain this software;
everything else is replaceable.** This section is the single highest-priority backlog item,
ABOVE any new feature. The content was enriched across all 101 readings in earlier sessions,
but three quality gaps were never closed and a fourth was found in the tenth session's audit.
As each data file gets opened, do 8.1 + 8.2 + 8.3 in ONE pass (the agent re-reads the file
anyway), with 8.4 as an Opus review layer on top.

### 8.1 Em-dash / en-dash purge (the owner's #1 "reads as AI" tell)

Measured 2026-07-21: **7,614 em/en-dashes across `src/data`; 100 of 101 readings fail
`validate-reading.mjs`'s dash budget.** The owner banned these outright (section 1 "Prose
style HARD RULES") because they are the most visible AI-generated signal in the product, and
for a paid product a buyer will notice. A blind `sed`/regex replace is FORBIDDEN: it produces
broken grammar in thousands of spots. Every dash needs a context-appropriate rewrite (comma,
colon, parentheses, or a full stop; a full stop or colon usually reads best). Gate each file
with `grep -Rn '—\|–' src/data/bookN/rNN.js` returning nothing AND the validator passing.

### 8.2 Tone humanization

The warm, sharp-tutor voice (sections 1 and 1a) has NOT been verified across the 101 readings.
In the same per-file pass, rewrite textbook-flavored or lecture-note prose into a tutor
thinking out loud with the student. The R28 exemplar (section 1) and the problem-first
doctrine (section 1a) are the bar; simpler where students struggle, but never oversimplified.

### 8.3 Why-depth (never make the student reach for another AI)

Per section 1.7: every counterintuitive claim must carry its causal mechanism in the same
breath, sourced from Schweser, never invented. The reference failure is r63's "deposits have
become LESS stable over time" asserting the surprise without the why. In the same per-file
pass, find counterintuitive assertions and supply the sourced mechanism.

### 8.4 Formula / numerical correctness verification (NEW, added this session)

Motivating incident: the tenth session's Vasicek WCDR piecewise breakdown shipped with a sign
error (the X term called N⁻¹(X) "very negative" when in the formula it is +3.09; a student
trusting the prose would compute 0.002% instead of the correct 14.6%), caught and fixed only
during an Opus audit. The enrichment's math (every `formulas[].plain`, `.derivation`,
`.terms[]`, and any worked number in prose) has never been numerically audited, and
intuitive-sounding prose can be mathematically inverted while still reading fine, so tone
review alone will not catch this. Add a math-correctness layer: for every formula touched, an
Opus reviewer checks the plain-language and derivation text against the actual equation (plug
in numbers where feasible) so no explanation contradicts its own formula. This is a real
defect class that students rely on for the exam, not a style nit.

### 8.5 Flagship content build: the securitization / structured-finance family

Per sections 1a and 6: build the covered bonds → pass-through MBS → CMO → CDO/CLO family to
the problem-first doctrine, with the CMO-vs-CDO/CLO distinction (cash-flow/prepayment
tranching vs credit/default tranching under the shared word "tranche") as the stage-6
comparison centerpiece. Needs both a Revision page (section 7.1 v2, structured finance from
first principles) and a Core-Concept page (section 6). This is content work and fits this
priority; scan the Book 2/3/4 source coverage first, invent nothing.

### 8.6 Execution and the DEFERRED slate

Execution: Sonnet fleet, one agent per data file (section 5 rules: file-scoped prompts, agents
never build and never touch git state), each agent given its file plus the relevant Schweser
source path, MUST NOT invent facts. Opus reviewers handle 8.4 (math correctness) and
doctrine/tone compliance before a wave is done; route any fix back through Sonnet, then
re-review. Batch in waves; the orchestrator builds, import-sweeps, and render-checks after each
wave and tracks completion per file. Start with one reference file (r63 for the why-depth bar,
plus one math-dense reading such as r26 for the correctness bar) so the owner can approve the
depth/tone/correctness bar before the full ~101-file fleet runs.

**Explicitly DEFERRED to a later software version (owner directive, 2026-07-21):** the
phone-first digestibility / card-deck slate Fable designed in
`docs/superpowers/specs/2026-07-20-comfort-ui-v2-plan.md` (section 5 flashcard engine +
`/deck/:rn`, section 6 M2 trap-check game, M3 story mode, M4 streak/daily-goal, M7 two-minute
sprint). In the owner's words these are "not exactly necessary right now"; content retention
beats new surfaces. Revisit only after the content-quality pass has landed.

NOTE: the section 6c **progressive balance-sheet widget** was previously listed here as
deferred, but the owner RE-PRIORITIZED it on 2026-07-21 into the learning-coherence build
(section 9): it is no longer deferred. It grows into a reusable visual-builder family
(balance-sheet stepper + correlation/matrix widget) because the future CFA accounting/FSA
material will lean on it.

## 9. Roadmap: the learning-coherence build (spec'd 2026-07-21, NOT YET BUILT)

Full design: `docs/superpowers/specs/2026-07-21-learning-coherence-design.md`. Brainstormed and
owner-approved. This is the next major build after (and partly alongside) the section 8 content
pass. One thesis, the student cannot feel the story, addressed in four workstreams. Decisions
already locked with the owner (do not re-litigate without asking):

- **A. Planner as the study spine (HYBRID sequencing).** New `src/lib/studyPath.js` builds a
  base order by topologically sorting `deps` within each `sessions` group (prereqs before
  dependents, sessions kept contiguous), then applies a small authored override table
  (`src/data/studyPath.js`, e.g. `{ move: 29, near: 37, why: "..." }`) for the genuinely
  confusing clusters (CVA family, IRB-capital R21<->R59, copula chain). `Planner.jsx` uses this
  instead of the raw `r.n` sort. Add `planner.startDate` (optional store key, default today) so
  the plan window is `[start..exam]`. Add a "Next in your plan ->" CTA on `Chapter.jsx` (plan
  order, additive, does NOT hijack the curriculum-order prev/next or `[`/`]`). Framing is
  honest exam-weighted coverage, NOT an invented pass-probability model.
- **B. Narrative orientation (BOTH layers).** Auto breadcrumb `ReadingArc.jsx` on every chapter
  (session position + builds-on + sets-up, derived from `sessions`/`deps`/`connections`, no
  authoring) PLUS an authored arc doctrine for 3-star-plus readings (extends sections 1a/8):
  each opens by establishing its lens/perspective, what it assumes, what it sets up, and every
  formula must say what you do with it and where it is reused. R26/R28/R29 (audited as
  incoherent grab-bags) are the pilot rewrites.
- **C. List exposition.** `breakdown[].points` may become `{ point, explain }` (plain string
  still allowed); `explain` renders as an always-visible dimmer sub-line. Content pass adds it
  where list items are cryptic dead-ends. Folds into the section 8 per-file fleet.
- **D. Visual builders as infrastructure** (this is where the section 6c widget went, no longer
  deferred): a progressive two-column balance-sheet stepper (pilot r63; generalizes to
  leverage/liquidity/capital/securitization/repo and future CFA accounting/FSA) and a
  matrix/correlation-table widget (heatmap grid). Standard widget conventions; numbers derived
  from existing narrative, invent nothing.

Content workstreams (B, C, and the 3-star-plus coherence rewrites) fold into the section 8
per-file fleet with Opus review; the code/infra workstreams (A planner, D widgets) are
orchestrator-owned and run in parallel. Pilot set: R26/R28/R29 + R63, so the owner approves the
bar before the full fleet. Sub-reading content splitting (physically breaking R29 apart) is
explicitly OUT of v1 scope, flagged for a later pass.
