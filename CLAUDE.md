# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is — READ THIS FIRST

An **interactive learning website for the FRM Part II exam** (5 books, 101 readings). There
are two apps in this repo:

- **`react-site/` — the ACTIVE product** (Vite + React). All development happens here.
  Before touching it, read **`react-site/CLAUDE.md`** — the binding guide (written by Fable)
  for teaching style, content schema rules, code conventions, UI doctrine, and verification.
  Read **`PROGRESS.md`** at the root for where development stands, and update it before
  ending any session.
- **`site/` — FROZEN** vanilla-JS predecessor. Never edit it; it's the reference the React
  app's widgets/renderers were ported from. The rest of this file documents it for
  reference only.

The repository root holds the Schweser source material both apps' content derives from —
the content rule at the bottom of this file applies to BOTH apps.

## The frozen vanilla site (`site/`) — reference documentation

Built as a fully static, dependency-free vanilla-JS site. There is **no build system, no framework, no package.json, no server** — the site runs directly from `file://`.

## Running & verifying (there is no build/lint/test tooling)

- **Run the site:** open `site/index.html` in a browser (`open site/index.html` on macOS). Everything works over `file://` — do not add a dev server or bundler.
- **Syntax-check JS** (the primary "did I break it" check):
  ```bash
  node -c site/assets/app.js
  for f in site/data/book*/*.js site/assets/widgets-book*.js; do node -c "$f" || echo "FAIL $f"; done
  ```
- **Load-integrity check** (confirm all readings still register): stub the global and require every data file in Node:
  ```bash
  cd site && node -e 'global.FRM={readings:{},register:function(r){this.readings[r.reading]=r}};
    require("fs").readdirSync("data").forEach(d=>require("fs").readdirSync("data/"+d).forEach(f=>require("./data/"+d+"/"+f)));
    console.log(Object.keys(FRM.readings).length,"readings")'
  ```
- **Render-check a page** (catches runtime/rendering errors `node -c` cannot): headless Chrome dumping the post-JS DOM, then grep for `widget failed`, `undefined<`, `>null<`, `tex-error`:
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --virtual-time-budget=4500 --dump-dom "file://$(pwd)/site/chapter.html?r=85"
  ```

## Architecture

### Data flow: everything derives from `meta.js`
`site/assets/meta.js` defines `window.FRM` and `FRM.META` — the **single source of truth for structure**: the `books` array (each with `sessions` and `readings` carrying `n`, title, `hy` exam-priority stars, `deps`, `tag`), the cross-book `threads`, and the mind-map `graph` (`nodes`/`edges`). Reading numbers, file paths, nav counts, dependency arrows, and the mind map are all computed from this — never hardcode a reading count or path. `FRM.rfile(rn)` maps a reading number to `data/bookN/rNN.js` (2-digit zero-padded).

### Content lives in per-reading self-registering files
Each reading is one file, `site/data/bookN/rXX.js` (r01–r101), that calls `FRM.register({...})`. Files are pulled in on demand by `FRM.loadReading` / `FRM.loadAll`, which inject `<script>` tags (this is why the site needs no server). Each registered object **must match this schema exactly** or the renderer emits blank/`undefined` sections:

```
{ book, reading, session, title, tagline, teaches, why, intuition,
  visual,                                   // optional HTML string: `<div class="widget" data-widget="NAME" ...></div>`
  formulas: [{name, math, note}],
  concepts: [{name, def, intuition, example, counter, pitfall, related, memory}],
  connections: { from:[{r,why}], to:[{r,why}], confused:[{what,how}] },
  misconceptions: [{wrong, right}],
  highYield: [{stars, what, why}],
  recall: [{q, a}],
  hooks: [{title, text}],
  summary }
```
The nested shapes matter: `misconceptions` is `{wrong,right}` (not strings), `highYield` is `{stars,what,why}`, `hooks` is `{title,text}`, `connections.confused` is `{what,how}` while `connections.from/to` are `{r,why}`. Cross-references in `connections`/`concepts[].related` point at reading numbers and must resolve against `meta.js`.

### The engine: `site/assets/app.js`
One IIFE exposing the `FRM` global. Contains the renderers (`renderChapter`, `renderBook`, `renderHome`, `renderMindMap`), the dynamic loader, dark-first theme toggle, the interactive `WIDGETS` library, and `FRM.initWidgets` (scans a rendered subtree for `[data-widget]` and instantiates each). Widget helpers are re-exported as `FRM.widgetHelpers` (`svgEl`, `shell`, `rng`, `npdf`, `ncdf`, `ninv`, `esc`) so widgets can also be defined in external files.

### Pages are thin shells
`index / book / chapter / mindmap / search / revision.html` each load `meta.js` + `app.js` and call one `FRM.render*` (or `FRM.loadAll` + inline logic for search/revision). `chapter.html` additionally loads the per-book widget files.

### Widgets
Interactive SVG teaching diagrams. Core widgets live in `app.js`'s `WIDGETS` object; per-book widgets live in `site/assets/widgets-bookN.js` (currently books 3–5 only — books 1–2 widgets still live inline in `app.js`), which register onto `FRM.WIDGETS` using `FRM.widgetHelpers` and are loaded via `<script>` in `chapter.html` only (that is the only page that renders `visual` fields). A reading shows a widget by setting its `visual` field to a `<div class="widget" data-widget="NAME">`. Conventions: colors must be theme-aware CSS variables (`var(--accent)`, `var(--red)`, …) so light/dark both work; each widget calls its own `draw()` once and re-draws on control input; numeric widgets read real values from `data-*` JSON attributes with sensible defaults.

### Math rendering (KaTeX, chapter.html only)
Formulas are real LaTeX, typeset by a locally vendored copy of KaTeX at `site/assets/vendor/katex/` (JS + CSS + fonts) — no CDN, keeping the `file://`/no-build constraint intact. `chapter.html` loads it directly; other pages do not. In `app.js`: `FRM.renderMath(s, display)` typesets a `formulas[].math` string if it "looks like TeX" (contains a backslash or a braced `_{}`/`^{}`) and otherwise passes it through unchanged; `FRM.renderMathInline` handles LaTeX embedded in prose via `\( … \)` (inline) / `\[ … \]` (display) — deliberately not `$…$`, since dollar amounts in the source text (e.g. "$100 million") must not be mangled; `FRM.fitMath(root)` auto-shrinks formulas that overflow their card. When writing a new reading's `formulas[].math`, use LaTeX syntax (e.g. `\dfrac{\text{...}}{\text{...}}` for ratios) rather than the old HTML/Unicode form.

## Content rule (most important)

This is a learning tool, not a doc site: **all reading content must be extracted from the source material at the repository root — never invented, oversimplified, or padded with filler.** The root holds two source flavors per book:
- `Book N (1).md` / `.pdf` — the full Schweser text (authoritative; the only source for Book 5).
- `FRM2_<Topic>_CompleteBookN.md` / `.pdf` — condensed companions (exist for Books 1–4 only).

When adding or editing a reading, work from these files. When adding a reading, also add its entry to the `readings` array in `meta.js` (and a `graph` node/edge or `thread` reference if it belongs on the mind map) so the rest of the site picks it up.
