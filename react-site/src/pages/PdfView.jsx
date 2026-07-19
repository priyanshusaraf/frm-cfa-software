/* Source-PDF viewer: renders public/pdfs/bookN.pdf with windowed virtualization —
   only pages near the viewport own a canvas (all others are fixed-height
   placeholders), so canvas memory stays bounded no matter how large the book is.
   Includes jump-to-page and full-text search with match highlighting, so any
   reading can be cross-referenced against the original Schweser text. */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, useLocation, Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";
import Button from "../components/ui/button.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const MAX_WIDTH = 900;
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

export default function PdfView() {
  const { bn: bnParam } = useParams();
  const bn = parseInt(bnParam, 10);
  const validBook = Number.isInteger(bn) && bn >= 1 && bn <= 5;

  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const location = useLocation();
  const backTo = (location.state && location.state.from) || "/";

  const pdfDocRef = useRef(null);
  const textCacheRef = useRef(new Map());
  const pageRefs = useRef({});
  const autoRanRef = useRef(false);

  const [containerEl, setContainerEl] = useState(null);
  const [containerWidth, setContainerWidth] = useState(MAX_WIDTH);
  const [pageBase, setPageBase] = useState(null); // {width,height} of page 1 at scale 1
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [win, setWin] = useState([1, 4]); // first/last page with a live canvas
  const [query, setQuery] = useState(qParam);
  const [matches, setMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [activeWords, setActiveWords] = useState([]);
  const [searching, setSearching] = useState(false);
  const [scanned, setScanned] = useState(0);

  useEffect(() => {
    if (!validBook) {
      setError('Unknown book "' + bnParam + '".');
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

    const url = import.meta.env.BASE_URL + "pdfs/book" + bn + ".pdf";
    const loadingTask = pdfjsLib.getDocument(url);
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
        setError(
          "Couldn't load Book " + bn + "'s PDF" + (e && e.message ? " (" + e.message + ")" : "") +
          ". Make sure public/pdfs/book" + bn + ".pdf exists."
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
      try { loadingTask.destroy(); } catch { /* noop */ }
    };
  }, [bn, validBook, bnParam]);

  useEffect(() => {
    if (!containerEl) return undefined;
    const measure = () =>
      setContainerWidth(Math.max(280, Math.min(MAX_WIDTH, Math.floor(containerEl.getBoundingClientRect().width))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerEl);
    return () => ro.disconnect();
  }, [containerEl]);

  const scale = pageBase ? containerWidth / pageBase.width : 1;
  const cssWidth = containerWidth;
  const cssHeight = pageBase ? Math.round(containerWidth * (pageBase.height / pageBase.width)) : 640;

  /* Scroll → visible page range, computed arithmetically (all pages share one
     height), so no per-page observers and no layout reads in a loop. */
  useEffect(() => {
    if (!numPages || !containerEl) return undefined;
    const unit = cssHeight + PAGE_GAP;
    let raf = null;
    const update = () => {
      raf = null;
      const contTop = containerEl.getBoundingClientRect().top + window.scrollY;
      const viewTop = window.scrollY;
      const vh = window.innerHeight;
      const clamp = (n) => Math.max(1, Math.min(numPages, n));
      const first = clamp(Math.floor((viewTop - contTop) / unit) + 1);
      const last = clamp(Math.ceil((viewTop + vh - contTop) / unit));
      setWin((prev) => (prev[0] === first && prev[1] === last ? prev : [first, last]));
      const cur = clamp(Math.round((viewTop + 80 - contTop) / unit) + 1);
      setCurrentPage(cur);
      setPageInput(String(cur));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [numPages, containerEl, cssHeight]);

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
    if (qParam) {
      setQuery(qParam);
      runSearch(qParam);
    } else if (pageParam) {
      const n = Math.min(numPages, Math.max(1, parseInt(pageParam, 10) || 1));
      jumpTo(n);
    }
  }, [numPages, qParam, pageParam, runSearch, jumpTo]);

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

  return (
    <>
      <div className="sticky top-0 z-20 bg-raised border-b border-line px-4 py-2 flex flex-wrap items-center gap-2.5">
        <Link to={backTo} className="text-dim hover:text-ink text-sm no-underline">← Back</Link>
        <span className="text-sm font-semibold text-ink">
          Book {validBook ? bn : "?"}{numPages ? " — p" + currentPage + "/" + numPages : ""}
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
            placeholder="Search this book…"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKey}
            className="w-40 sm:w-64 bg-inset border border-line rounded-el px-2.5 py-1 text-sm text-ink"
          />
          <Button size="sm" variant="outline" onClick={() => runSearch(query)} disabled={searching || !numPages}>
            {searching ? "…" : "Search"}
          </Button>
          <Button size="sm" variant="ghost" onClick={prevMatch} disabled={!matches.length} title="Previous match">↑</Button>
          <Button size="sm" variant="ghost" onClick={nextMatch} disabled={!matches.length} title="Next match">↓</Button>
          <span className="text-xs text-faint whitespace-nowrap min-w-[6rem]">
            {searching
              ? "scanning p" + Math.min(scanned + 1, numPages) + "/" + numPages + "…"
              : matches.length
                ? matchIndex + 1 + " of " + matches.length + " matches"
                : query
                  ? "no matches"
                  : ""}
          </span>
        </span>
      </div>

      <main className="page">
        {error && (
          <div className="card" style={{ maxWidth: 560, margin: "3rem auto", textAlign: "center" }}>
            <h3>Couldn't open this PDF</h3>
            <p className="text-dim">{error}</p>
            <Link to={backTo} className="text-accent">← Go back</Link>
          </div>
        )}
        {!error && loading && (
          <div style={{ padding: "3.5rem 0", textAlign: "center" }}>
            <div className="text-dim text-sm">
              Loading Book {validBook ? bn : ""}{loadPct !== null ? " — " + loadPct + "%" : "…"}
            </div>
            {loadPct !== null && (
              <div style={{ maxWidth: 260, margin: "0.9rem auto 0" }} className="h-1.5 bg-inset rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: loadPct + "%", transition: "width .2s" }} />
              </div>
            )}
          </div>
        )}
        {!error && !loading && numPages > 0 && (
          <div ref={setContainerEl} style={{ maxWidth: MAX_WIDTH, margin: "0 auto" }}>
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
      </main>
    </>
  );
}
