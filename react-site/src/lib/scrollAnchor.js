/* Keep the paragraph you are reading under the nav bar across every reflow:
   window resize, reading-column drag, split-pane drag, font-scale change, and
   opening/closing a split pane (which remounts the reading DOM, see below).

   The anchor CANNOT be captured when the reflow happens — `window.resize` and
   `ResizeObserver` both fire after layout has already reflowed, so by then the
   element's pre-resize offset is gone. So we track the anchor continuously while
   the user scrolls (a valid pre-reflow anchor is always on hand) and only
   restore it when a reflow is observed. */
import { useEffect, useRef } from "react";

const CANDIDATES = "p, h1, h2, h3, h4, li, .card, .widget, table";
const MIN_DELTA = 2; // sub-pixel corrections are noise, not a lost place
const CAPTURE_DELAY = 90; // ms — long enough to stay out of a reflow's own frame
const REFLOW_WINDOW = 250; // ms after a reflow during which a capture is not trusted
const RO_DEBOUNCE = 60; // ms — a live drag fires many resizes in a burst (useEdgeResize
// applies width on every pointermove); collapsing the burst into one correction after
// it settles avoids firing a scrollBy mid-burst that a moment later becomes stale and
// fights with the NEXT burst entry's own correction.
const BUSY_GUARD = 220; // ms to hold off treating our own corrective scroll as a
// user scroll. This must be a wall-clock timeout, not a single requestAnimationFrame:
// the browser's own "scroll" event for a programmatic scrollBy is dispatched
// asynchronously and is not guaranteed to land within the very next frame
// (measured 1+ frame late under real conditions), so clearing the guard on the
// next rAF let that later event slip through, get mistaken for a user scroll,
// and re-capture the anchor mid-correction — this was the actual cause of the
// large drifts on font-scale changes (a spurious recapture locks in whatever
// half-corrected position happened to be on screen as the new "truth").
const TEXT_LEN = 40; // identity fingerprint length for re-resolving an anchor across a remount

/* --nav-h is authored in rem and custom properties come back unresolved, so the
   rem has to be converted against the root font size (which --font-scale moves). */
function anchorLine() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue("--nav-h").trim();
  const n = parseFloat(raw);
  if (!n) return 0;
  if (raw.endsWith("rem") || raw.endsWith("em")) return n * (parseFloat(getComputedStyle(root).fontSize) || 16);
  return n;
}

/* Split-view open/close (Chapter.jsx) swaps the reading's root element type at
   the position Chapter returns from (`<main>` directly vs `<SplitView><main>`),
   so React unmounts and remounts the whole subtree instead of reusing the node —
   the anchored element's identity is gone even though the exact same content is
   on screen a moment later, just at a different offset. Re-find the equivalent
   element by tag + text fingerprint under the (new) root rather than losing the
   anchor outright. */
function resolveByIdentity(root, tag, text) {
  if (!root || !tag || !text) return null;
  const els = root.querySelectorAll(tag);
  for (const el of els) {
    if ((el.textContent || "").slice(0, TEXT_LEN) === text) return el;
  }
  return null;
}

export function useScrollAnchor(rootRef) {
  const anchorRef = useRef(null); // { el, offset, tag, text } — no React state: this must not re-render on scroll
  const busyRef = useRef(false); // guards the scroll our own restore fires
  const busyTimerRef = useRef(null);
  const observedRef = useRef(null);
  const roRef = useRef(null);
  const restoreRef = useRef(null); // lets the identity-change effect below call the same restore() the RO uses

  useEffect(() => {
    let timer = null;
    let reflowAt = 0;

    function capture() {
      timer = null;
      if (busyRef.current) return;
      /* A reflow that clamps the scroll position fires a scroll event in the same
         frame as the resize, and within a frame the browser runs scroll events
         (step 2) before ResizeObserver callbacks (step 7). Anything captured in
         that window is post-reflow geometry and would leave restore() nothing to
         correct — so skip it, but reschedule rather than drop the refresh, or a
         single incidental resize would leave us anchorless forever. */
      if (Date.now() - reflowAt < REFLOW_WINDOW) {
        timer = setTimeout(capture, REFLOW_WINDOW);
        return;
      }
      const root = rootRef.current;
      if (!root) return;
      const line = anchorLine();
      const els = root.querySelectorAll(CANDIDATES);
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > line) {
          anchorRef.current = { el, offset: rect.top - line, tag: el.tagName, text: (el.textContent || "").slice(0, TEXT_LEN) };
          return;
        }
      }
      anchorRef.current = null;
    }

    /* A timer, not a rAF: rAF callbacks run before ResizeObserver callbacks in
       the same frame, so a rAF capture would always beat the observer to the
       pre-reflow geometry. See the reflow-window guard in capture(). */
    function onScroll() {
      if (busyRef.current) return; // our own scrollBy, not the user
      if (timer) clearTimeout(timer);
      timer = setTimeout(capture, CAPTURE_DELAY);
    }

    function restore() {
      reflowAt = Date.now();
      let a = anchorRef.current;
      if (!a) return;
      // reading navigation / a split-pane open-close remount detaches the anchor
      // node even though the same content is still there — re-find it by
      // identity before giving up on the anchor entirely.
      if (!a.el.isConnected) {
        const found = resolveByIdentity(rootRef.current, a.tag, a.text);
        if (!found) { anchorRef.current = null; return; }
        a = { ...a, el: found };
        anchorRef.current = a;
      }
      /* Read geometry and correct synchronously, no rAF wrapper: reading
         `getBoundingClientRect()` forces the browser to flush any pending
         layout on demand, so the post-reflow position is already available the
         moment restore() runs (ResizeObserver/MutationObserver callbacks fire
         after layout per spec anyway) — an rAF here bought nothing but an extra
         frame of latency. */
      const line = anchorLine();
      const delta = a.el.getBoundingClientRect().top - line - a.offset;
      if (Math.abs(delta) < MIN_DELTA) return;
      busyRef.current = true;
      if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
      // html has `scroll-behavior: smooth`; a reflow correction must SNAP, or it
      // animates for ~300ms and spews scroll events that overwrite the anchor
      window.scrollBy({ top: delta, behavior: "instant" });
      busyTimerRef.current = setTimeout(() => { busyRef.current = false; }, BUSY_GUARD);
    }
    restoreRef.current = restore;

    window.addEventListener("scroll", onScroll, { passive: true });
    // the root's own box does not change on a viewport-height-only resize
    window.addEventListener("resize", restore);
    let roTimer = null;
    if (typeof ResizeObserver !== "undefined") {
      roRef.current = new ResizeObserver(() => {
        // No "first report is just the initial mount" suppression here on
        // purpose: restore() is already a safe no-op when there is no captured
        // anchor yet (the common "just mounted" case), and gating on a `seen`
        // WeakSet per-target actively broke the split-open/close case — that
        // remount observes a BRAND NEW `.page` node, so its first ever report
        // was always being swallowed as "just mounting" even though a real,
        // valid anchor already existed and genuinely needed correcting.
        // Debounced (see RO_DEBOUNCE): a live drag reports many intermediate
        // sizes in a burst, and correcting after every single one just to have
        // the next one immediately invalidate it wastes work and adds jitter —
        // wait for the burst to settle and correct once.
        if (roTimer) clearTimeout(roTimer);
        roTimer = setTimeout(() => { roTimer = null; restore(); }, RO_DEBOUNCE);
      });
    }
    /* Font-scale (and fullscreen) change `--nav-h`'s resolved px value and the
       reading column's rem-based padding/type sizes WITHOUT necessarily moving
       `.page`'s own border-box edges in a way a plain ResizeObserver reliably
       reports promptly (its content still reflows, but the trigger is a CSS
       custom-property/attribute change on <html>, not a layout-driven resize of
       the observed element) — watch that directly instead of hoping the
       ResizeObserver on `.page` happens to pick it up. */
    let moTimer = null;
    const mo = typeof MutationObserver !== "undefined"
      ? new MutationObserver(() => {
          // batch: a font-scale click can touch style twice in one tick
          if (moTimer) return;
          moTimer = setTimeout(() => { moTimer = null; restore(); }, 0);
        })
      : null;
    if (mo) mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "data-fullscreen"] });
    capture();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", restore);
      if (roRef.current) { roRef.current.disconnect(); roRef.current = null; }
      if (mo) mo.disconnect();
      if (moTimer) clearTimeout(moTimer);
      if (roTimer) clearTimeout(roTimer);
      observedRef.current = null;
      if (timer) clearTimeout(timer);
      if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    };
  }, [rootRef]);

  /* No dep array on purpose: the root element only exists after the page swaps
     out its loading state, so the observer has to re-target whenever the ref
     lands on a different element. One ResizeObserver covers window resize,
     reading-column drag, split-pane drag AND font-scale change with no plumbing
     into useEdgeResize / SplitView / Nav.

     Also call restore() directly the instant the observed element's identity
     changes (not just when ResizeObserver eventually reports it): a split-pane
     open/close remounts `.page` to a brand-new node at the exact same scroll
     position as the old one, so the correction is needed right away rather than
     waiting on a ResizeObserver round trip. */
  useEffect(() => {
    const el = rootRef.current;
    const ro = roRef.current;
    if (!ro || !el || el === observedRef.current) return;
    const hadPrevious = !!observedRef.current;
    if (observedRef.current) ro.unobserve(observedRef.current);
    observedRef.current = el;
    ro.observe(el);
    if (hadPrevious && restoreRef.current) restoreRef.current();
  });
}
