/* Text highlighting for the chapter body: paints stored highlights on mount,
   offers a selection toolbar (4 colors + "Read in source ↗" — this replaces
   the old standalone ReadInSource selection chip, absorbing its PDF
   search-jump action so there is only ever one floating toolbar), and a
   click popover on existing marks (recolor / remove / quick note /
   "related in this reading"). */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { captureSelection, paint, unpaint } from "../../lib/highlights.js";
import { useStore, addHighlight, removeHighlight, setHighlightColor, addNote, HL_COLORS, hlLabels } from "../../lib/store.js";
import { getReading } from "../../lib/readings.js";
import { findRelated } from "../../lib/related.js";
import Html from "../Html.jsx";

const EMPTY = [];
const MIN_SEL_LEN = 3;
const MAX_QUERY_LEN = 120;

export default function Highlighter({ rn, book, containerRef }) {
  const navigate = useNavigate();
  const highlights = useStore((s) => (s.highlights && s.highlights[rn]) || EMPTY);
  const hlLabelState = useStore((s) => s.hlLabels);
  const labels = hlLabels({ hlLabels: hlLabelState });

  const [toolbar, setToolbar] = useState(null); // { x, y }
  const [popover, setPopover] = useState(null); // { id, x, y, h }
  const [noteDraft, setNoteDraft] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const popRef = useRef(null);

  /* Paint stored highlights whenever the reading or its highlight set
     changes; retry once on a rAF because KaTeX / widgets can render their
     final DOM a tick after mount, shifting where quotes actually live. */
  useEffect(() => {
    const root = containerRef && containerRef.current;
    if (!root) return;
    unpaint(root);
    paint(root, highlights, handleMarkClick);
    const raf = requestAnimationFrame(() => {
      paint(root, highlights, handleMarkClick);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rn, highlights, containerRef]);

  /* Selection toolbar on mouseup with a real, non-collapsed selection
     inside the chapter root. */
  useEffect(() => {
    function onMouseUp(e) {
      if (e.target && e.target.closest && (e.target.closest(".hl-toolbar") || e.target.closest(".hl-pop"))) return;
      const root = containerRef && containerRef.current;
      if (!root) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) return;
      const text = sel.toString().trim();
      if (text.length < MIN_SEL_LEN) return;
      const rect = range.getBoundingClientRect();
      if (!rect || (!rect.width && !rect.height)) return;
      setPopover(null);
      setToolbar({
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.bottom + window.scrollY + 8,
      });
    }
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, [containerRef]);

  /* Dismiss on scroll / escape / outside click. */
  useEffect(() => {
    function close() { setToolbar(null); setPopover(null); }
    function onKey(e) { if (e.key === "Escape") close(); }
    function onDown(e) {
      const t = e.target;
      if (t && t.closest && (t.closest(".hl-toolbar") || t.closest(".hl-pop") || t.closest("mark.hl"))) return;
      close();
    }
    window.addEventListener("scroll", close, { passive: true, capture: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("scroll", close, { capture: true });
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  function handleMarkClick(id, mark) {
    const h = highlights.find((x) => x.id === id);
    if (!h) return;
    const rect = mark.getBoundingClientRect();
    setToolbar(null);
    setNoteDraft("");
    setNoteSaved(false);
    setPopover({
      id,
      x: Math.max(12, rect.left + window.scrollX),
      y: rect.bottom + window.scrollY + 6,
      h,
    });
  }

  function pickColor(color) {
    const root = containerRef && containerRef.current;
    const sel = window.getSelection();
    const cap = root ? captureSelection(root, sel) : null;
    setToolbar(null);
    if (sel) sel.removeAllRanges();
    if (!cap) return;
    addHighlight(rn, { color, ...cap });
  }

  function readInSource() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().replace(/\s+/g, " ").trim() : "";
    setToolbar(null);
    if (sel) sel.removeAllRanges();
    if (!book || !text) return;
    navigate(`/pdf/${book}?q=${encodeURIComponent(text.slice(0, MAX_QUERY_LEN))}`, { state: { from: `/chapter/${rn}` } });
  }

  function recolor(color) {
    if (!popover) return;
    setHighlightColor(rn, popover.id, color);
    setPopover((p) => (p && p.id === popover.id ? { ...p, h: { ...p.h, color } } : p));
  }

  function removeThis() {
    if (!popover) return;
    removeHighlight(rn, popover.id);
    setPopover(null);
  }

  function saveNote() {
    if (!popover || !noteDraft.trim()) return;
    addNote({ rn, section: popover.h.section, quote: popover.h.text, text: noteDraft.trim() });
    setNoteDraft("");
    setNoteSaved(true);
  }

  function scrollToSection(sectionId) {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setPopover(null);
  }

  const readingData = popover ? getReading(rn) : null;
  const related = readingData && popover ? findRelated(readingData, popover.h.text, 4) : [];

  return createPortal(
    <>
      {toolbar && (
        <div className="hl-toolbar" style={{ left: toolbar.x, top: toolbar.y }}>
          {HL_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`hl-swatch sw-${c}`}
              title={`Highlight — ${labels[c]}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pickColor(c)}
            />
          ))}
          <button
            type="button"
            className="text-[0.78rem] font-semibold text-dim hover:text-ink whitespace-nowrap px-1"
            onMouseDown={(e) => e.preventDefault()}
            onClick={readInSource}
            title="Find this passage in the source book PDF"
          >
            Read in source ↗
          </button>
        </div>
      )}

      {popover && (
        <div ref={popRef} className="hl-pop" style={{ left: popover.x, top: popover.y }}>
          <div className="flex items-center gap-1.5">
            {HL_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className={`hl-swatch sw-${c}`}
                title={labels[c]}
                onClick={() => recolor(c)}
                style={popover.h.color === c ? { outline: "2px solid var(--text)", outlineOffset: "1px" } : undefined}
              />
            ))}
            <button
              type="button"
              className="ml-auto text-[0.75rem] font-semibold text-red hover:brightness-110"
              onClick={removeThis}
            >
              Remove
            </button>
          </div>

          <div className="text-[0.8rem] text-dim italic border-l-2 border-line pl-2 my-1.5 line-clamp-3">
            "{popover.h.text}"
          </div>

          <textarea
            className="w-full text-[0.82rem] bg-inset border border-line rounded-el p-1.5 text-ink resize-none"
            rows={2}
            placeholder="Quick note on this passage…"
            value={noteDraft}
            onChange={(e) => { setNoteDraft(e.target.value); setNoteSaved(false); }}
          />
          <button
            type="button"
            className="self-start text-[0.75rem] font-semibold text-accent hover:brightness-110 mt-1"
            onClick={saveNote}
            disabled={!noteDraft.trim()}
          >
            {noteSaved ? "Saved ✓" : "Save note"}
          </button>

          {related.length > 0 && (
            <div className="mt-2 pt-2 border-t border-line">
              <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-faint mb-1">
                Related in this reading
              </div>
              <ul className="flex flex-col gap-1">
                {related.map((r, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="text-left text-[0.78rem] text-dim hover:text-accent w-full"
                      onClick={() => scrollToSection(r.sectionId)}
                      disabled={!r.sectionId}
                    >
                      <span className="text-faint uppercase text-[0.68rem] mr-1">{r.type}</span>
                      <Html as="span" html={r.snippet || r.label} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>,
    document.body
  );
}
