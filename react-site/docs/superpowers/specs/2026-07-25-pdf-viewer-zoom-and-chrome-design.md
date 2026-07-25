# PDF viewer: page-stable zoom, fullscreen chrome, navbar split controls

Date: 2026-07-25
Status: design approved, not yet implemented
Owner ask (verbatim, 2026-07-25):

> 1. pdf resizing ends up shifting the page number a lot, this is very annoying.
> 2. in full screen mode for the pdf, i cant view the navbar. also the navbar needs to have
>    the option to split source and compressed and left right all that as well. also, we now
>    need pdf editing tools which are persistent, so pdf highlighting, removal of pdf
>    highlights, annotations, etc should be allowed on the pdf as well, including zoom and
>    all too.

**Scope decision (owner, same session): the persistent PDF highlighting / annotation
subsystem is CUT from this pass** ("meh lets forget about the pdf highlighting and all that
its unnecessary right now"). Everything else is in. The annotation design that was worked out
before it was cut is preserved in the appendix so a future session does not re-derive it.

This spec covers three changes plus one small addition they imply:

- **1a** page-stable zoom and resize in `PdfCore`
- **1b** auto-hiding navbar in fullscreen
- **1c** split / dock controls moved into the navbar
- **1d** a zoom control on the full-page `/pdf/:bn` route (see "Why 1d is here")

---

## 1a. Page-stable zoom and resize

### The defect

`PdfCore` lays every page out arithmetically: all pages share one `cssHeight`, so page *n*
starts at `contTop + (n-1) * unit` where `unit = cssHeight + PAGE_GAP`. `cssHeight` is derived
from `containerWidth * zoom`. Nothing preserves scroll position when it changes, so a zoom
step or a pane drag rescales every page while `scrollTop` stays put: you were on page 412, you
are now on page 380. The reading column solved the equivalent problem in `lib/scrollAnchor.js`
(§7.5); the PDF never got it.

### The fix

Because the layout is arithmetic, the PDF needs none of `scrollAnchor.js`'s fingerprint
machinery. The anchor is two numbers: **the page you are on, and your fractional position
inside it**.

New pure module `src/lib/pdfAnchor.js`:

```
anchorFrom(scrollTop, contTop, unit, numPages) -> { page, frac }
offsetFor({ page, frac }, contTop, unit, numPages) -> scrollTop
```

`page` is 1-based and clamped to `[1, numPages]`; `frac` is clamped to `[0, 1)`. Both guard
`unit <= 0` and non-finite inputs by returning a safe default (`{page:1, frac:0}` / `0`)
rather than throwing, per the house defensive-rendering rule.

In `PdfCore`:

- The existing scroll handler already computes the visible range from exactly these values.
  Extend it to also write `anchorRef.current = anchorFrom(...)` on every run.
- Add a `useLayoutEffect` keyed on `unit`. When `unit` changes from a previously recorded
  value, recompute `contTop` the same way the scroll handler does and scroll to
  `offsetFor(anchorRef.current, contTop, unit, numPages)`. Layout effect, not effect: it must
  land before paint or the jump is visible.
- Both modes: `window.scrollTo({ top, behavior: "instant" })` in `window` mode,
  `scrollElRef.current.scrollTo({ top, behavior: "instant" })` in `pane` mode.
  **`behavior: "instant"` is mandatory** — `html { scroll-behavior: smooth }` is set globally
  and would otherwise animate every zoom step (the same trap `scrollAnchor.js` documents).

### Two guards that look optional and are not

1. **Skip the restore when the anchor is `{page: 1, frac: 0}`.** `unit` changes once at load
   when `pageBase` arrives and the placeholder 640px height is replaced by the real one. At
   that moment there is no meaningful anchor, and restoring would fight the initial
   anchor-ladder jump (`runLadder` → `jumpTo` → `scrollIntoView`). Page 1 at offset 0 is
   exactly the no-op case, so skipping it costs nothing and removes the race.
2. **A short busy window after the restore.** The programmatic scroll fires its own `scroll`
   event; the handler must not recompute `anchorRef` from a mid-restore geometry. A
   `restoringRef` flag cleared on a wall-clock timeout (not a rAF) is the pattern
   `scrollAnchor.js` already established, and for the same reason: a programmatic scroll's
   event can arrive more than a frame later.

The ResizeObserver path needs no separate capture. It only sets `containerWidth` state; the
page heights do not change until React commits, so any scroll event before that commit still
reflects the old geometry and produces the correct anchor.

### Tests

`src/lib/pdfAnchor.test.js` (`node:test`, matched by `npm test`'s `src/lib/*.test.js` glob):
round-trip identity across a unit change, clamping at page 1 and at `numPages`, `frac` stays
in `[0,1)`, and the degenerate inputs (`unit = 0`, `numPages = 0`, `NaN`) return the safe
defaults instead of throwing.

---

## 1b. Auto-hiding navbar in fullscreen

Today `main.jsx`'s `Shell` renders `<Nav/>` only when not fullscreen, so fullscreen strips the
navbar app-wide and the only surviving control is the `.fs-exit` chip. That is correct for
distraction-free reading and wrong the moment you want to zoom, switch panes, or change dock
side without leaving the mode.

**Behaviour:** the navbar stays hidden, and slides down when the pointer reaches the very top
edge of the screen. It also reveals on `focus-within`, so a keyboard user reaches it by
tabbing — no new hotkey, which matters because `f`, `n`, `[`, `]`, `1-4`, `a-d`, `space` and
`⌘K` are all taken.

**Implementation:**

- `Shell` always renders `<Nav/>`. In fullscreen it wraps it in `.nav-peek` and renders a
  `.nav-peek-trigger` strip (~10px, full width, fixed at top) immediately before it.
- CSS: `.nav-peek { position: fixed; inset: 0 0 auto 0; z-index: 55; transform:
  translateY(-100%); transition: transform .18s ease }`, revealed by
  `.nav-peek-trigger:hover + .nav-peek`, `.nav-peek:hover`, `.nav-peek:focus-within`, and
  `.nav-peek[data-open="1"]`. Once revealed the nav itself covers the trigger strip, so
  `:hover` on the nav is what keeps it open.
- **`--nav-h` stays `0rem` in fullscreen.** The peeked nav overlays; it must not reserve
  layout space, or the sticky `.split-panes` column stops filling the viewport.
- **The Radix menu problem:** the Study popover renders in a portal *outside* `.nav-peek`, so
  hover and `focus-within` both go false the moment the menu opens and the nav slides away
  under an open menu. Fix with explicit state, not `:has()` — a `:has([data-radix-popper-
  content-wrapper])` rule would also pin the nav open for concept hover-cards and every other
  popover in the app. `Nav` takes an optional `onMenuOpenChange` prop wired to its existing
  `studyOpen` state; `Shell` holds the boolean and sets `data-open` on `.nav-peek`.
- `Nav`'s fullscreen button currently carries a comment saying the nav is unmounted while
  fullscreen and therefore only ever shows "enter". That stops being true: it must read
  `useFullscreen()` and swap to `Minimize2`. The `.fs-exit` chip stays — it is the visible
  exit affordance while the nav is hidden.

---

## 1c. Split and dock controls in the navbar

New `src/components/NavSplitControls.jsx`, rendered by `Nav` next to the existing "Reading N"
cluster, only on `/chapter/:rn`. Contents: **Source** and **Condensed** toggles, plus a dock
**Left / Right** switch shown when either pane is open. Same store mutators as today
(`setSplitPane`, `setSplitSide`); no new state.

The equivalent buttons come **out** of `Chapter.jsx`'s action row. "Open source PDF ↗" stays
there — it is a navigation link, not a split control. This is the "one place to look" choice
the owner picked over keeping both.

Details that decide the implementation:

- **Desktop-only via `hidden lg:flex`**, matching the classes the Chapter buttons already use.
  Because the controls are never visible below the breakpoint, `NavSplitControls` does **not**
  need `Chapter.toggleSplit`'s narrow-viewport `/pdf/:bn` fallback. That fallback stays with
  Chapter's own (still-present) "Open source PDF" path.
- **Condensed exists only for Books 1-4** (content rule). The toggle is omitted for Book 5.
- **Readings without a `pdf` field**: `SplitView` is only rendered when `splitOpen && d.pdf`,
  so a nav toggle on such a reading would set state that nothing renders. `NavSplitControls`
  therefore uses `useReading(rn)` and renders nothing while it is `null` or when `d.pdf` is
  absent. This is a cache hit in practice (Chapter has already loaded it), not a second fetch.
- Per-pane **zoom stays in the pane's own toolbar**. It is per-pane state; a single global nav
  control would make "which pane am I zooming?" ambiguous.
- Visual language follows the existing nav: `NavButton` (a `role="button"` span, because a
  plain `<button>` inside `.topnav` picks up a `style.css` rule that beats single-class
  Tailwind utilities), active state as `bg-accent-soft` + `text-accent`.

---

## 1d. Zoom on the full-page `/pdf/:bn` route

`PdfCore` renders its zoom control only when an `onZoom` prop is passed, which today means the
split panes only. The full-page route has no zoom at all. With 1b making fullscreen a real
place to read a PDF, a fullscreen `/pdf/:bn` with no zoom control leaves items 1 and 2 half
met, so this is in scope.

`PdfView` gains a zoom value from a new optional store key `layout.pdfZoom` (same 0.5-3×
clamp, same `setSplitZoom`-shaped mutator `setPdfZoom`), passed as `zoom` / `onZoom`. It
persists like every other layout preference, and it inherits 1a's anchoring for free since
both go through the same `unit` change path.

---

## Verification

- `npm test` — new `pdfAnchor` cases green, existing 44 still green.
  (`npm test` is `node:test`, **not** vitest; `npx vitest run` falsely reports broken files.)
- `npm run build` — green, no new warnings.
- Render-check `/chapter/32` and `/pdf/2` per CLAUDE.md §4, asserting real DOM content, not
  just the absence of `widget failed|undefined<|>null<|tex-error` (a render-throw passes a
  bare marker grep).
- **Cannot be verified headless, flag for the owner instead of claiming it works:** the zoom
  anchoring itself (needs scrolling + a zoom step), the hover-peek navbar, and the Radix menu
  interaction with the peek.

## Out of scope

- PDF text highlighting / annotation (cut by the owner this session; appendix below).
- Any change to the anchor-ladder search behaviour (§7.5) or to `scrollAnchor.js`.
- Mobile / narrow-viewport split view — still deliberately absent.

---

## Appendix: the cut annotation design (do not re-derive)

Worked out and approved in outline this session before the owner cut it. If it is picked up
again, these decisions were already made:

- **Tools wanted:** multi-colour text highlight and sticky-note annotation. Explicitly **not**
  wanted: underline/strikethrough, freehand pen drawing.
- **Text layer:** add pdf.js's own `renderTextLayer` over the canvas for windowed pages only,
  reusing the existing `getPageText` cache. Real browser selection and copy come free; hand-
  positioned spans were rejected.
- **Anchoring: normalized page coordinates, not text anchors.** Reading highlights use
  quote+prefix/suffix because React re-renders move the DOM; a PDF's text never moves, so
  store rects as fractions of page size (`{x,y,w,h}` in 0..1). Zoom-independent, resize-proof,
  nothing to orphan.
- **Store:** one new optional key
  `pdfMarks: { [pdfId]: [ { id, page, kind, color, rects, text, note, rn, ts } ] }`,
  `pdfId` = `"book2"` / `"condensed3"`, `kind` = `"hl"|"note"`, colours reusing the existing
  `hlLabels` legend so there is one colour vocabulary app-wide.
- **Surfacing:** marks are tagged with the reading they were made from and appear in a
  "Source PDF" group on `/highlights` and `/notes`; clicking reopens the PDF at that page with
  the mark flashed. This needs `/pdf/:bn` to learn `?doc=condensed&page=N&mark=<id>`, since
  condensed PDFs have no route today.
- **Known edge:** a selection spanning a page break becomes one mark per page, created
  together and stored separately.
- **Known limit:** localStorage-only like all other state, so marks travel with the existing
  export/import, not with the PDF file.
