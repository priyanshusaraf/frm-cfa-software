# CFA Level II FSA platform (`src/cfa/fsa`)

Owner brief (2026-10-07): be extremely thorough on CFA Level II Financial Statement Analysis.
Explain everything from first principles, show every accounting treatment as an ANIMATION
across all the financial statements, use demo companies, and let the student RECONSTRUCT the
statements themselves (type a line such as retained earnings, it goes green if right, then
"confirmation runs" audit the student's own numbers). Clean UI, fun, interactive.
Stay inside the 2026 curriculum: do not add topics the curriculum does not list just because a
prep book covers them; FLAG mismatches instead (see `docs/cfa/fsa-curriculum-reconciliation.md`).

## Layout

```
engine/ledger.js      double-entry engine: accounts + journal entries -> IS, OCI, BS, CFS
engine/layout.js      stable statement row layout for a scenario run
engine/practice.js    grading for the reconstruct game (pure, tested)
engine/*.test.js      node --test: every scenario balances; every practice round grades
scenarios/_kit.js     account builders (cash, asset, liab, equity, re, aoci, rev, exp, oci, nciEq, nciAlloc, divs) + dr/cr
scenarios/lmNN.js     default-export an array of scenarios for module NN
content/lmNN.js       default-export one module object
content/curriculum.js the official 2026 LOS list (scope); sections[].los point into it
widgets/Name.jsx      bespoke React widgets, loaded by file name
components/           Theater (animation player), Practice (reconstruct game), Statements, Blocks, Interactives
pages/                FsaHome, FsaModule, FsaLab, FsaPractice, FsaCoverage, FsaReference
fsa.css               all styling, fsa- prefix, CSS variables only
```

## Scenario format (`scenarios/lmNN.js`)

```js
import { cash, asset, liab, equity, re, aoci, nciEq, rev, exp, oci, nciAlloc, divs, dr, cr } from "./_kit.js";
{
  id: "lm11-db-pension",            // globally unique, prefix with module id
  module: "lm11",
  title: "...",                      // short, concrete
  standard: "IFRS vs US GAAP",       // small caps badge
  summary: "html",                   // what to watch for, 1-3 sentences
  accounts: [ cash(), asset("rec","Receivables"), liab("debt","Long-term debt","ncl",{tags:["debt"]}), equity("sc","Share capital"), re(), aoci(), rev("sales","Revenue",{tags:["sales"]}), exp("opex","Operating expenses"), oci("x","..."), ... ],
     // asset/liab group: "ca" | "nca" | "cl" | "ncl". Account order = display order.
     // tags let ratios find lines: S.tag("debt"), S.tag("sales").
  // EITHER one company:
  company: "Pinnacle Corp", opening: { cash: 1000, sc: 800, re: 200 },
  // OR several columns (method comparison, or a consolidation worksheet):
  columns: [
    { id: "ifrs", label: "IFRS", sub: "short note", opening: {...} },
    { id: "gaap", label: "US GAAP", sub: "...", opening: {...} },
    { id: "C", label: "Consolidated", sumOf: ["P","S","E"] },  // derived column
  ],
  show: { cf: false, oci: false },   // optional: hide a statement
  steps: [
    {
      title: "Event, stated as what happens",
      prompt: "optional: the event for the practice game, WITHOUT the answer",
      html: "explanation shown in the event card (why, mechanism, first principles)",
      entries: [ dr("inv", 300), cr("cash", 300, "CFI", "Acquisition of associate") ],   // one company
      entries: { ifrs: [ ... ], gaap: [ ... ] },                                          // columns
      notes: { ifrs: "per-column note" },
      memo: { title: "Memo calculation", rows: [["label","value"], ...] },  // last row is the answer
      insight: "html: what to notice",
      exam: "html: exam angle",
      close: true,         // year-end close: IS -> retained earnings, OCI -> AOCI, cash flows restart
      practice: false,     // exclude from the reconstruct game
    },
  ],
  ratios: [ { label: "Net profit margin", fn: (S) => S.NI / S.tag("sales"), fmt: "pct" } ],
     // S: v(lineKey), tag(t), NI, NIP (NI to parent), OCI, TA, TL, TE, CFO, CFI, CFF. fmt: pct | x | x3 | num
}
```

Rules the tests enforce (`npm test`):
- every step: debits = credits in every column; after every step: A = L + E and cash ties.
- every posting to `cash` names a cash-flow section (CFO/CFI/CFF) and a line label; nothing else may.
- opening balances must balance and may only be on balance sheet accounts.
- every practice round with perfect answers passes every confirmation run.
- no em dash or en dash characters anywhere.
Line keys (for ratios): `IS:<acct>`, `IS:NI`, `IS:NIP`, `OCI:<acct>`, `OCI:TOT`, `BS:<acct>`, `BS:ca|nca|cl|ncl`, `BS:TA|TL|TE`, `CF:CFO|CFI|CFF`, `CF:END`.
Equity accounts may be posted to directly (elimination entries, AOCI-to-retained-earnings transfers).
Expenses are debits, revenues and gains credits; a debit to a revenue account reduces it (used for "reduce equity income by 3").

## Module format (`content/lmNN.js`)

```js
export default {
  id: "lm11", num: 11,
  title: "Employee Compensation: Post-Employment and Share-Based",
  short: "Employee compensation",
  tagline: "one sentence on what this module is really about",
  minutes: 150,                          // honest reading + doing estimate
  // LOS text lives ONCE in content/curriculum.js; sections say which LOS they cover:
  sections: [
    { id: "db-obligation", title: "...", los: ["b"], blocks: [ ...blocks ] },
  ],
  traps:   [ { wrong: "plausible wrong belief", right: "the correction, with the mechanism" } ],
  gaap:    [ { topic: "...", ifrs: "...", usgaap: "..." } ],
  formulas:[ { name: "...", tex: "LaTeX", plain: "what it means in words" } ],
  recall:  [ { q: "...", a: "..." } ],
  itemSets:[ { id: "lm11-is1", title: "...", vignette: "html", questions: [ { q, options: [3 strings], answer: 0..2, why } ] } ],
  flags:   [ { los: "c", note: "anything that must be checked against the official book" } ],
}
```

Blocks (`sections[].blocks`):
| t | fields | renders |
|---|---|---|
| `p` | `html` | prose (one or more `<p>`) |
| `h` | `text` | sub-heading |
| `callout` | `tone` insight/exam/trap/gaap/example/beyond/flag, `title`, `html` | boxed note |
| `table` | `caption`, `head[]`, `rows[][]`, `note` | table (cells are HTML) |
| `formula` | `name`, `tex`, `plain` | KaTeX display formula |
| `steps` | `title`, `items[{title, html}]` | numbered procedure |
| `compare` | `items[{title, tone, points[]}]` | side-by-side columns (tone: accent/green/amber/purple/cyan/red) |
| `theater` | `scenario` | animated statements for a scenario id |
| `widget` | `name`, `props` | `widgets/<name>.jsx` |
| `check` | `id`, `q`, `options[3]`, `answer`, `why` | one-question concept check |
| `sort` | `prompt`, `buckets[{id,label}]`, `items[{text, bucket, why}]` | tap-to-sort game |
| `tree` | `title`, `root`, `nodes{ id: {q, help, options[{label,next}]} or {result, html, tone} }` | decision tree |

Prose math: `\( ... \)` inline, `\[ ... \]` display. Never `$...$` (dollar amounts).

## Teaching rules (binding, from the owner)

1. Problem first: put the student in the shoes of a person who has to act (the CFO, the analyst,
   the auditor). Show why the obvious approach fails before introducing the rule. Name things last.
2. Every rule gets its WHY in the same breath. Never state a counterintuitive fact bare.
3. Concrete numbers from the demo companies (Pinnacle Corp, Kestrel Ltd, and module-specific
   ones) beat abstractions. Every major treatment gets a scenario the student can watch.
4. Teach the trap: what would a smart candidate get wrong on a Level II item set?
5. IFRS vs US GAAP differences are exam gold: always say which standard, and give the difference.
6. NO em dashes or en dashes. No "Three things matter here." style announcements, no chained
   rhetorical questions with fragment answers, no aphoristic closers. Plain, sharp tutor voice.
7. Expand every abbreviation on first use in each module.
8. Item sets use THREE options, like the real Level II exam. A `why` never names a letter.
9. Scope = the 2026 CFA Level II LOS. Depth beyond the curriculum is allowed for mechanism
   only, labelled with a `beyond` callout. Never add an examinable fact the curriculum does not.

## Widgets (`widgets/<Name>.jsx`)

Default-export a React component taking optional props. Use `fsa-` classes from `fsa.css`
(`fsa-theater` frame, `fsa-btn`, `fsa-stmt` tables, `fsa-callout`, `fsa-ratios`) and CSS variables
only (`var(--accent)`, `var(--green)`, `var(--red)`, `var(--text-dim)`, `var(--border)`,
`var(--bg-raised)`...). No hex colors. Animate with CSS transitions or `useTween` from
`components/motion.js`. Respect `prefers-reduced-motion`. Every number a widget shows must be
computed, not typed in.
