/* Shared PDF-rendering core behind both the full-page /pdf/:bn route (PdfView.jsx,
   window-scroll mode) and the chapter split-view side panes (SplitPdfPane.jsx,
   container-scroll mode) — see react-site/CLAUDE.md §7.4. Windowed virtualization
   (only pages near the viewport own a canvas), jump-to-page and full-text search
   with match highlighting all live here once so both call sites share one
   implementation instead of drifting.
   `mode="window"` tracks window.scrollY/innerHeight and the page list sits inside
   whatever scrolls the page (used by the /pdf/:bn route). `mode="pane"` makes the
   page-list container itself the scrolling element (own overflow-y:auto), so it
   works self-contained inside a fixed-height side pane. */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";
import Button from "./ui/button.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const PAGE_GAP = 14; // must match the wrapper's mb-3.5
const WINDOW_BUFFER = 2; // pages beyond the visible range that keep a canvas
const MAX_DPR = 2; // rendering above 2x costs 4x the memory for no visible gain
const SEARCH_CONCURRENCY = 4; // keeps the worker responsive for page renders

function normalize(s) {
  return (s || "").replace(/\s+/g, " ").trim().toLowerCase();
}

/* Combine a text item's own transform with the page viewport transform to get its
   on-canvas box (CSS-pixel space), the same math pdf.js's own text layer uses. */
function computeItemRects(items, viewport, words) {
  if (!items || !viewport || !words || !words.length) return [];
  const rects = [];
  for (const it of items) {
    const str = (it.str || "").toLowerCase();
    if (!str || !words.some((w) => w.length >= 3 && str.includes(w))) continue;
    const tx = pdfjsLib.Util.transform(viewport.transform, it.transform);
    const angle = Math.atan2(tx[1], tx[0]);
    const fontHeight = Math.hypot(tx[2], tx[3]) || 1;
    let left, top;
    if (Math.abs(angle) < 0.01) {
      left = tx[4];
      top = tx[5] - fontHeight;
    } else {
      left = tx[4] + fontHeight * Math.sin(angle);
      top = tx[5] - fontHeight * Math.cos(angle);
    }
    const unitLen = Math.hypot(it.transform[0], it.transform[1]) || 1;
    const width = Math.max((it.width || 0) * (Math.hypot(tx[0], tx[1]) / unitLen), 2);
    rects.push({ left, top, width, height: fontHeight * 1.15 });
  }
  return rects;
}

const PdfPage = memo(function PdfPage({ pageNum, pdfDoc, cssWidth, cssHeight, scale, active, highlightWords, getPageText, registerRef }) {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);
  const lastTaskRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [rects, setRects] = useState([]);

  useEffect(() => {
    if (!active || !pdfDoc || !cssWidth) {
      viewportRef.current = null;
      setRendered(false);
      setRects([]);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      // A previous render on this canvas (e.g. a scale change) must fully settle
      // before the canvas can be reused, or pdf.js throws.
      const prev = lastTaskRef.current;
      if (prev) {
        try { prev.cancel(); } catch { /* noop */ }
        await prev.promise.catch(() => {});
      }
      if (cancelled) return;
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const viewport = page.getViewport({ scale });
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.width = Math.max(1, Math.floor(viewport.width * dpr));
        canvas.height = Math.max(1, Math.floor(viewport.height * dpr));
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        const task = page.render({
          canvasContext: canvas.getContext("2d"),
          viewport,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        });
        lastTaskRef.current = task;
        await task.promise;
        if (cancelled) return;
        lastTaskRef.current = null;
        viewportRef.current = viewport;
        setRendered(true);
      } catch {
        /* cancelled mid-render or page failed; placeholder stays visible */
      }
    })();
    return () => {
      cancelled = true;
      const t = lastTaskRef.current;
      if (t) { try { t.cancel(); } catch { /* noop */ } }
    };
  }, [active, pdfDoc, pageNum, scale, cssWidth]);

  useEffect(() => {
    let cancelled = false;
    if (!rendered || !highlightWords || !highlightWords.length || !viewportRef.current) {
      setRects((prev) => (prev.length ? [] : prev));
      return undefined;
    }
    getPageText(pageNum).then((entry) => {
      if (cancelled || !entry) return;
      setRects(computeItemRects(entry.items, viewportRef.current, highlightWords));
    });
    return () => { cancelled = true; };
  }, [rendered, highlightWords, pageNum, getPageText]);

  return (
    <div
      ref={registerRef}
      data-page={pageNum}
      className="relative mx-auto mb-3.5 bg-inset border border-line rounded-el overflow-hidden"
      style={{ width: cssWidth, height: cssHeight }}
    >
      {active && <canvas ref={canvasRef} className="block bg-raised" />}
      {active && !rendered && (
        <div className="absolute inset-0 flex items-center justify-center text-faint text-xs">Rendering…</div>
      )}
      {rects.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {rects.map((r, i) => (
            <div
              key={i}
              className="absolute rounded-[2px]"
              style={{ left: r.left, top: r.top, width: r.width, height: r.height, background: "rgba(245, 166, 35, 0.4)" }}
            />
          ))}
        </div>
      )}
      <div className="absolute bottom-1 right-2 text-[0.68rem] text-faint select-none">{pageNum}</div>
    </div>
  );
});

/* fileUrl: resolved by the caller (route knows book numbers; pane knows kind).
   mode: "window" (page list scrolls with the document) | "pane" (page list is its
   own scrolling element, sized to fill its container). */
export default function PdfCore({
  fileUrl,
  label,
  maxWidth = 900,
  mode = "window",
  initialQuery = "",
  initialPage = null,
  toolbarLeft, // optional extra node rendered at the start of the toolbar (back link, etc.)
  toolbarRight, // optional extra node rendered at the end of the toolbar (open-full link, close button)
}) {
  const pdfDocRef = useRef(null);
  const textCacheRef = useRef(new Map());
  const pageRefs = useRef({});
  const autoRanRef = useRef(false);
  const scrollElRef = useRef(null); // "pane" mode only: the div that actually scrolls

  const [containerEl, setContainerEl] = useState(null);
  const [containerWidth, setContainerWidth] = useState(maxWidth);
  const [pageBase, setPageBase] = useState(null); // {width,height} of page 1 at scale 1
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [win, setWin] = useState([1, 4]); // first/last page with a live canvas
  const [query, setQuery] = useState(initialQuery);
  const [matches, setMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [activeWords, setActiveWords] = useState([]);
  const [searching, setSearching] = useState(false);
  const [scanned, setScanned] = useState(0);

  useEffect(() => {
    if (!fileUrl) {
      setError("No PDF configured for this book.");
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    autoRanRef.current = false;
    setLoading(true);
    setLoadPct(null);
    setError(null);
    setNumPages(0);
    setPageBase(null);
    setMatches([]);
    setMatchIndex(0);
    setActiveWords([]);
    setWin([1, 4]);
    pdfDocRef.current = null;
    textCacheRef.current = new Map();

    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.onProgress = ({ loaded, total }) => {
      if (!cancelled && total) setLoadPct(Math.min(100, Math.round((loaded / total) * 100)));
    };
    loadingTask.promise
      .then(async (doc) => {
        if (cancelled) return;
        pdfDocRef.current = doc;
        const page1 = await doc.getPage(1);
        if (cancelled) return;
        const vp = page1.getViewport({ scale: 1 });
        setPageBase({ width: vp.width, height: vp.height });
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError("Couldn't load " + (label || "this PDF") + (e && e.message ? " (" + e.message + ")" : "") + ".");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      try { loadingTask.destroy(); } catch { /* noop */ }
    };
  }, [fileUrl, label]);

  useEffect(() => {
    if (!containerEl) return undefined;
    const measure = () =>
      setContainerWidth(Math.max(200, Math.min(maxWidth, Math.floor(containerEl.getBoundingClientRect().width))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerEl);
    return () => ro.disconnect();
  }, [containerEl, maxWidth]);

  const scale = pageBase ? containerWidth / pageBase.width : 1;
  const cssWidth = containerWidth;
  const cssHeight = pageBase ? Math.round(containerWidth * (pageBase.height / pageBase.width)) : 640;

  /* Scroll → visible page range, computed arithmetically (all pages share one
     height), so no per-page observers and no layout reads in a loop. In "pane"
     mode a separate wrapper (scrollElRef) owns the scrollbar and containerEl's
     offset within it is measured directly (robust to the pane's own padding);
     in "window" mode the document scrolls and containerEl's page offset is
     measured against the viewport. */
  useEffect(() => {
    if (!numPages || !containerEl) return undefined;
    const unit = cssHeight + PAGE_GAP;
    const scrollTarget = mode === "pane" ? scrollElRef.current : window;
    if (!scrollTarget) return undefined;
    let raf = null;
    const update = () => {
      raf = null;
      const contRect = containerEl.getBoundingClientRect();
      const contTop = mode === "pane"
        ? (contRect.top - scrollElRef.current.getBoundingClientRect().top) + scrollElRef.current.scrollTop
        : contRect.top + window.scrollY;
      const viewTop = mode === "pane" ? scrollElRef.current.scrollTop : window.scrollY;
      const vh = mode === "pane" ? scrollElRef.current.clientHeight : window.innerHeight;
      const clamp = (n) => Math.max(1, Math.min(numPages, n));
      const first = clamp(Math.floor((viewTop - contTop) / unit) + 1);
      const last = clamp(Math.ceil((viewTop + vh - contTop) / unit));
      setWin((prev) => (prev[0] === first && prev[1] === last ? prev : [first, last]));
      const cur = clamp(Math.round((viewTop + 80 - contTop) / unit) + 1);
      setCurrentPage(cur);
      setPageInput(String(cur));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [numPages, containerEl, cssHeight, mode]);

  const getPageText = useCallback(async (pageNum) => {
    const doc = pdfDocRef.current;
    if (!doc) return null;
    if (textCacheRef.current.has(pageNum)) return textCacheRef.current.get(pageNum);
    const page = await doc.getPage(pageNum);
    const tc = await page.getTextContent();
    const str = tc.items.map((it) => it.str || "").join(" ");
    const entry = { items: tc.items, norm: normalize(str) };
    textCacheRef.current.set(pageNum, entry);
    return entry;
  }, []);

  const jumpTo = useCallback((pageNum) => {
    setPageInput(String(pageNum));
    requestAnimationFrame(() => {
      const el = pageRefs.current[pageNum];
      if (el) el.scrollIntoView({ block: "start" });
    });
  }, []);

  const runSearch = useCallback(async (raw) => {
    const doc = pdfDocRef.current;
    const total = numPages;
    const normQ = normalize(raw);
    if (!doc || !total || !normQ) {
      setMatches([]);
      setMatchIndex(0);
      setActiveWords([]);
      return;
    }
    setSearching(true);
    setScanned(0);
    try {
      let next = 1;
      const worker = async () => {
        while (next <= total) {
          const n = next++;
          await getPageText(n);
          setScanned((s) => s + 1);
        }
      };
      await Promise.all(Array.from({ length: Math.min(SEARCH_CONCURRENCY, total) }, worker));

      let found = [];
      for (let n = 1; n <= total; n++) {
        const e = textCacheRef.current.get(n);
        if (e && e.norm.includes(normQ)) found.push(n);
      }
      let used = normQ;
      if (found.length === 0) {
        const loosened = normQ.split(" ").filter(Boolean).slice(0, 5).join(" ");
        if (loosened && loosened !== normQ) {
          for (let n = 1; n <= total; n++) {
            const e = textCacheRef.current.get(n);
            if (e && e.norm.includes(loosened)) found.push(n);
          }
          used = loosened;
        }
      }
      setMatches(found);
      setMatchIndex(0);
      setActiveWords(used ? used.split(" ").filter((w) => w.length >= 3) : []);
      if (found.length) jumpTo(found[0]);
    } finally {
      setSearching(false);
    }
  }, [numPages, getPageText, jumpTo]);

  useEffect(() => {
    if (autoRanRef.current || !numPages) return;
    autoRanRef.current = true;
    if (initialQuery) {
      runSearch(initialQuery);
    } else if (initialPage) {
      const n = Math.min(numPages, Math.max(1, parseInt(initialPage, 10) || 1));
      jumpTo(n);
    }
  }, [numPages, initialQuery, initialPage, runSearch, jumpTo]);

  function handlePageInputKey(e) {
    if (e.key !== "Enter") return;
    const n = Math.min(numPages, Math.max(1, parseInt(pageInput, 10) || 1));
    jumpTo(n);
  }
  function handleSearchKey(e) {
    if (e.key === "Enter") runSearch(query);
  }
  function nextMatch() {
    if (!matches.length) return;
    const i = (matchIndex + 1) % matches.length;
    setMatchIndex(i);
    jumpTo(matches[i]);
  }
  function prevMatch() {
    if (!matches.length) return;
    const i = (matchIndex - 1 + matches.length) % matches.length;
    setMatchIndex(i);
    jumpTo(matches[i]);
  }

  const pageNums = useMemo(() => Array.from({ length: numPages }, (_, i) => i + 1), [numPages]);
  const winFirst = Math.max(1, win[0] - WINDOW_BUFFER);
  const winLast = Math.min(numPages, win[1] + WINDOW_BUFFER);

  const toolbar = (
    <div className={"z-20 bg-raised border-b border-line px-4 py-2 flex flex-wrap items-center gap-2.5" + (mode === "pane" ? "" : " sticky top-0")}>
      {toolbarLeft}
      <span className="text-sm font-semibold text-ink">
        {label}{numPages ? " — p" + currentPage + "/" + numPages : ""}
      </span>
      {numPages > 0 && (
        <span className="flex items-center gap-1.5 text-sm text-dim">
          Go to
          <input
            type="number"
            min={1}
            max={numPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={handlePageInputKey}
            className="w-16 bg-inset border border-line rounded-el px-1.5 py-1 text-ink text-sm"
          />
        </span>
      )}
      <span className="flex items-center gap-1.5 ml-auto">
        <input
          type="text"
          value={query}
          placeholder="Search…"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearchKey}
          className={(mode === "pane" ? "w-28 " : "w-40 sm:w-64 ") + "bg-inset border border-line rounded-el px-2.5 py-1 text-sm text-ink"}
        />
        <Button size="sm" variant="outline" onClick={() => runSearch(query)} disabled={searching || !numPages}>
          {searching ? "…" : "Search"}
        </Button>
        <Button size="sm" variant="ghost" onClick={prevMatch} disabled={!matches.length} title="Previous match">↑</Button>
        <Button size="sm" variant="ghost" onClick={nextMatch} disabled={!matches.length} title="Next match">↓</Button>
        {mode !== "pane" && (
          <span className="text-xs text-faint whitespace-nowrap min-w-[6rem]">
            {searching
              ? "scanning p" + Math.min(scanned + 1, numPages) + "/" + numPages + "…"
              : matches.length
                ? matchIndex + 1 + " of " + matches.length + " matches"
                : query
                  ? "no matches"
                  : ""}
          </span>
        )}
      </span>
      {toolbarRight}
    </div>
  );

  const body = (
    <>
      {error && (
        <div className="card" style={{ maxWidth: 460, margin: "2rem auto", textAlign: "center" }}>
          <h3>Couldn't open this PDF</h3>
          <p className="text-dim">{error}</p>
        </div>
      )}
      {!error && loading && (
        <div style={{ padding: "2.5rem 0", textAlign: "center" }}>
          <div className="text-dim text-sm">Loading {label}{loadPct !== null ? " — " + loadPct + "%" : "…"}</div>
          {loadPct !== null && (
            <div style={{ maxWidth: 220, margin: "0.9rem auto 0" }} className="h-1.5 bg-inset rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: loadPct + "%", transition: "width .2s" }} />
            </div>
          )}
        </div>
      )}
      {!error && !loading && numPages > 0 && (
        <div ref={setContainerEl} style={{ maxWidth, margin: "0 auto", padding: mode === "pane" ? "0.75rem" : undefined }}>
          {pageNums.map((n) => (
            <PdfPage
              key={n}
              pageNum={n}
              pdfDoc={pdfDocRef.current}
              cssWidth={cssWidth}
              cssHeight={cssHeight}
              scale={scale}
              active={n >= winFirst && n <= winLast}
              highlightWords={matches[matchIndex] === n ? activeWords : null}
              getPageText={getPageText}
              registerRef={(el) => { pageRefs.current[n] = el; }}
            />
          ))}
        </div>
      )}
    </>
  );

  if (mode === "pane") {
    return (
      <div className="flex h-full flex-col">
        {toolbar}
        <div className="flex-1 overflow-y-auto" ref={scrollElRef}>
          {body}
        </div>
      </div>
    );
  }

  return (
    <>
      {toolbar}
      <main className="page">{body}</main>
    </>
  );
}
