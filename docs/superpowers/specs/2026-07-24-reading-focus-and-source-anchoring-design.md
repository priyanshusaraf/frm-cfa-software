# Reading focus + source anchoring — design

Date: 2026-07-24
Scope: `react-site/` only. Four independent changes, shippable in any order.
Status: approved, not yet implemented.

---

## Why

Four defects/gaps in the reading experience, in the owner's priority order:

1. **Resizing loses your place.** Any reflow — browser window resize, dragging the
   reading-column handle, dragging a split-pane handle, changing font size — pushes the
   paragraph you were reading off screen. You have to hunt for it again.
2. **The condensed split pane almost never lands on the right section.** It opens on
   page 1 instead of the material for the reading you are on.
3. **No distraction-free mode.** The nav bar, the two floating rails and the notes
   button are always competing with the reading for screen.
4. **"Read in source" throws you out of the reading.** Selecting text and choosing
   "Read in source ↗" navigates to a separate full-page PDF route, losing the reading.
   The split view already exists and is the better destination.

### Evidence for #2 (measured, not assumed)

Every reading carries `pdf: { book, query }`, where `query` is a phrase authored against
the **full** Schweser book. `Chapter.jsx:510` passes that one string to *both* split
panes. Checking all 101 queries against the actual source text (whitespace-normalized,
case-folded, using the root `.md` sources as a proxy for the PDFs):

| anchor | found in full book | found in condensed book |
|---|---|---|
| `pdf.query` | 80 / 101 | **6 / 80** |
| reading `title` | 96 / 101 | **79 / 80** |

(Condensed companions exist for books 1–4 only, hence 80 rather than 101.)

So the condensed pane's search fails ~93% of the time and the pane sits on page 1. It is
not a scroll or rendering bug — it is the wrong search string.

Two secondary findings from the same measurement:

- **21 readings also fail against the full book.** Their `query` is authored prose, not
  source text: `"Reading 1 gave you two extremes"` (r02),
  `"R41 answers \"who's in charge of operational risk?\" at three levels"` (r41),
  `"If R17 defines the disease, R18 is the bank's immune system"` (r18). The source pane
  and the `/pdf/:bn` route are silently broken for these too.
- **Titles also appear in each book's table of contents**, typically in the leading ~3%
  of the document. Naive first-match on the title would land on the TOC. Measured
  distribution in the condensed sources: 30 titles occur twice, 13 three times, 9 four
  times; the early hit is almost always the TOC entry and the real section follows.

---

## 1. Scroll anchoring across reflows

### The problem with the obvious approach

You cannot capture the anchor when the resize happens. `window.resize` and
`ResizeObserver` both fire *after* layout has already reflowed, so by the time you are
notified, the element you wanted to pin has already moved and its pre-resize offset is
unrecoverable.

### Approach

Track the anchor continuously while the user scrolls, so a valid pre-reflow anchor is
always on hand; restore it when a reflow is observed.

New module `src/lib/scrollAnchor.js` exporting a `useScrollAnchor(rootRef)` hook.

**Track** — on `scroll` (passive, rAF-throttled):
- Anchor line = viewport top + `--nav-h`.
- Walk candidate block elements inside `rootRef.current`
  (`p, h1, h2, h3, h4, li, .card, .widget, table`) and take the first whose
  `getBoundingClientRect().bottom` is below the anchor line.
- Store `{ el, offset: rect.top - anchorLine }` in a ref. No React state — this must not
  re-render on scroll.

**Restore** — `scrollBy(0, el.getBoundingClientRect().top - anchorLine - offset)`, run
inside a `requestAnimationFrame` so it lands after the reflow has painted.

**Triggers:**
- A `ResizeObserver` on `rootRef.current`. This is the whole point of the design: the
  reading root changes size on window resize, reading-column drag, split-pane drag *and*
  font-scale change, so one observer covers all four with no plumbing into
  `useEdgeResize`, `SplitView` or `Nav`.
- A `window.resize` listener as well, for the viewport-height-only case where the root's
  own box does not change.

**Loop guard:** a `busyRef` flag set before each restore and cleared on the following
rAF, so the scroll fired by our own `scrollBy` does not overwrite the anchor. Restores
with `|delta| < 2px` are skipped.

**Bail-outs:** if the anchor element has been detached from the DOM (reading navigation,
re-render), drop the anchor and take a fresh one on the next scroll.

### Wiring

`Chapter.jsx` calls `useScrollAnchor(rootRef)` — `rootRef` already exists and is the
`<main className="page">` reading root.

Out of scope for this change (one-line additions later if wanted): `Revision.jsx`,
`ConceptPage.jsx`.

---

## 2. PDF anchor ladder

### `PdfCore.jsx`

Replace the `initialQuery: string` prop with `initialQueries: string[]` (still accepting
a bare string for back-compat, normalized to a one-element array internally).

Restructure `runSearch` into two pieces:
- `scanAll()` — populates the existing `textCacheRef` for every page, once. Keeps the
  current concurrency-4 worker pool and the current "jump to the first matching page as
  soon as it is scanned" optimization, which applies to the **first** candidate only.
- `findPages(normQ)` — pure lookup over the already-populated cache.

Candidate loop: try candidates in order; the first that yields ≥1 page wins and search
stops. Because the cache is shared, trying candidates 2..n after a full scan costs no
additional text extraction. If no candidate matches, fall back to the existing
loosening behaviour (first 5 words of candidate 1) before giving up.

**TOC suppression.** Once `found` is computed for the winning candidate:

```
tocCutoff = max(2, ceil(numPages * 0.03))
if (found.length > 1 && found[0] <= tocCutoff) {
  const later = found.find(p => p > tocCutoff)
  if (later) jump to `later` instead of found[0]
}
```

The full `matches` array is left intact, so the ↑ / ↓ match controls still reach the TOC
hit. Only the initial jump target changes.

**Re-run on candidate change.** Today `autoRanRef` blocks any re-run after the first
search. Replace it with a `useEffect` keyed on `initialQueries.join("|")`, so an
already-open pane re-searches when the candidate list changes (needed by change 4).
Callers must memoize the array to avoid a re-search per render.

### Call sites

| Surface | Candidate ladder |
|---|---|
| Source split pane | `[pdf.query, title]` |
| Condensed split pane | `[title, pdf.query]` |
| `/pdf/:bn` route | `[q, q2]` from the URL |

- `SplitView.jsx`: replace the single `query` prop with `sourceQueries` and
  `condensedQueries` (both `string[]`), passed through to each `SplitPdfPane`.
- `SplitPdfPane.jsx`: `query` prop becomes `queries`, forwarded as `initialQueries`.
- `Chapter.jsx`: build both ladders in a `useMemo` keyed on `d` (and, for the source
  ladder, on the ad-hoc query from change 4).
- `PdfView.jsx` / `Chapter.jsx`'s "Open source PDF ↗" link: add an optional second
  candidate as `&q2=<title>` so the full-page route gets the same fallback.

This fixes the 74/80 broken condensed anchors and the 21 broken source anchors without
touching any of the 101 content files.

---

## 3. Fullscreen mode

### State

Session-only, **not persisted**. A small module singleton in
`src/lib/fullscreen.js` (subscribe/get/set, matching the `store.js` house pattern), or
React state lifted into `main.jsx` — implementer's choice, but it must not go into the
`layout` blob.

Rationale: browsers reject `requestFullscreen()` outside a user gesture. A persisted
`fullscreen: true` would reload into a state where the CSS says fullscreen but the
browser chrome is still there — a half-applied mode with no clean recovery.

### Behaviour

On toggle **on**:
- `main.jsx` stops rendering `<Nav />`.
- `document.documentElement` gets `data-fullscreen="1"`.
- `document.documentElement.requestFullscreen().catch(() => {})` — the catch matters;
  denial must leave the in-app part working.

On toggle **off**: reverse all three, `document.exitFullscreen()` guarded by
`document.fullscreenElement`.

### CSS (`style.css`)

```css
html[data-fullscreen] { --nav-h: 0rem; }
html[data-fullscreen] .rail-panel,
html[data-fullscreen] .edge-tab,
html[data-fullscreen] .corner-pill,
html[data-fullscreen] .qn-fab { display: none; }
```

`--nav-h: 0rem` is what lets the sticky `.split-panes` column
(`top: var(--nav-h); height: calc(100vh - var(--nav-h))`) fill the viewport.
`html[data-fullscreen]` (0,1,1) outranks the `:root` declaration (0,1,0), so no
`!important` is needed.

The QuickNotes floating button currently has only Tailwind utility classes and no stable
hook — add `qn-fab` to it in `QuickNotes.jsx`.

### Entry and exit

- A nav button (lucide `Maximize2` / `Minimize2`), next to the theme toggle.
- Keyboard `f`, reusing the existing typing guard from the `[` / `]` handler in
  `Chapter.jsx` (skip when `target` is `INPUT` / `TEXTAREA` / `isContentEditable`, and
  when a modifier key is held). Register it globally, not per-page.
- A command-palette entry ("Toggle fullscreen").
- While in fullscreen: a floating exit chip in the top-right corner, since the nav
  button is gone.
- A `fullscreenchange` listener syncs state back when the browser exits on its own
  (Esc, F11, tab switch). This is what makes Esc work without a dedicated handler.

---

## 4. "Read in source" opens the split pane

### `Highlighter.jsx` — `readInSource()`

```
if (matchMedia("(min-width: 1100px)").matches) {
  setSplitQuery(rn, selectedText)
  setSplitPane("source", true)
} else {
  navigate(`/pdf/${book}?q=…`)   // unchanged — split view is desktop-only
}
```

The 1100px breakpoint matches `Chapter.jsx`'s `toggleSplit` and the CSS backstop.

### Carrying the ad-hoc query

New store field and mutator:

```
layout.split.q = { rn, text }     // setSplitQuery(rn, text); setSplitQuery(null) clears
```

- `Chapter.jsx` prepends it to the source ladder **only when `q.rn === rn`**:
  `[q.text, pdf.query, title]`, otherwise `[pdf.query, title]`.
- Cleared with `setSplitQuery(null)` when the source pane closes and when the reading
  changes, so a stale selection from another reading never anchors the pane.
- Truncated to the existing `MAX_QUERY_LEN` (120) and whitespace-normalized, as today.

### "Full source ↗"

Added to `SplitPdfPane`'s toolbar, source pane only, next to the close button: a link to
`/pdf/:bn?q=<current candidate>&q2=<title>` with `state={{ from: '/chapter/' + rn }}`.
This is the top-of-screen escape hatch to the full-page reader that the old navigate
behaviour provided. `SplitPdfPane` needs `rn` passed down for the back-link state.

### Explicitly unchanged

Per the owner's decision, the chapter header's "Open source PDF ↗" and "Split: Source"
buttons keep their current behaviour. Only the selection toolbar changes.

---

## Verification

Per `react-site/CLAUDE.md` §4:

```bash
cd react-site
npm run build          # must pass clean
npm run dev            # render-check over http:// — dist does NOT work over file://
```

Manual checks, in priority order:

1. **Anchor** — open a long reading (e.g. R30), scroll to mid-document, then in turn:
   drag the browser window narrower, drag the reading-column handle, drag a split-pane
   handle, hit `A+` in the nav. The paragraph under the nav bar stays under the nav bar
   each time. Then confirm normal scrolling is not jittery and does not fight you.
2. **Condensed anchor** — open R30 (book 2), open the condensed split. It lands on the
   R30 section, not page 1 and not the table of contents. Spot-check R45 (book 3) and
   R71 (book 4). Then check a reading from the broken-source list — R41 — and confirm
   the source pane now lands via the title fallback.
3. **Fullscreen** — toggle from the nav button: browser chrome, nav, both rails and the
   notes button all disappear and the split panes fill the height. Esc restores
   everything and the nav button returns to its un-pressed state. Repeat with the `f`
   key. Confirm `f` typed into the QuickNotes textarea and the PDF search box does *not*
   toggle.
4. **Read in source** — select a phrase mid-reading, choose "Read in source ↗": the
   source pane opens beside the reading (not a navigation) and finds that phrase.
   Select a different phrase with the pane already open: it re-searches. Click
   "Full source ↗": the full-page route opens with the same anchor and its back link
   returns to the reading. Narrow the window below 1100px and confirm the old navigate
   behaviour still applies.

## Follow-ups (not in this change)

- The 21 readings whose `pdf.query` is authored prose rather than source text still rely
  on the title fallback. Rewriting those queries against the real source is a content
  task worth logging separately.
- `useScrollAnchor` on `Revision.jsx` and `ConceptPage.jsx`.
