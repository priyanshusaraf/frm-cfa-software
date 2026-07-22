import { createPortal } from "react-dom";
import Html from "../Html.jsx";
import { useStore, setKeyPointsOpen } from "../../lib/store.js";

/* "Key points to remember" — an Apple-style floating pill docked to the
   bottom-left corner (the TOC's floating panel occupies the right). Collapsed
   by default; expands into a floating panel on click. Content is the
   reading's own highYield items — no new content, just the top-priority ones
   kept one click away while scrolling. Portal onto <body> for the same reason
   as ChapterTOC. */
/* Scroll to the anchor a key point resolves to (a concept card or a section),
   expanding the card first if it's a collapsed <details>, and flash it so the
   eye lands on it. */
function jumpTo(target) {
  if (!target || !target.id) return;
  const el = document.getElementById(target.id);
  if (!el) return;
  if (target.expand && el.tagName === "DETAILS") el.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.add("jump-flash");
  setTimeout(() => el.classList.remove("jump-flash"), 1300);
}

export default function KeyPoints({ items, color, resolve }) {
  const open = useStore((s) => (s.layout && s.layout.keyPointsOpen) || false);
  const top = (items || []).filter((y) => y.stars >= 4).slice(0, 6);
  if (!top.length) return null;

  const dot = <span className="dot" style={{ background: color || "var(--amber)" }} />;

  if (!open) {
    return createPortal(
      <button className="corner-pill left" onClick={() => setKeyPointsOpen(true)}
              aria-expanded={false} title="Expand key points">
        {dot}
        Key points
        <span className="chev">▲</span>
      </button>,
      document.body
    );
  }

  return createPortal(
    <div className="rail-panel left">
      <div className="rail-panel-head">
        {dot}
        Key points to remember
        <button className="rail-panel-close" onClick={() => setKeyPointsOpen(false)}
                aria-label="Collapse">✕</button>
      </div>
      <div className="key-points">
        <ul>
          {top.map((y, i) => {
            const target = resolve ? resolve(y.what) : null;
            return (
              <li
                key={i}
                className={target ? "kp-jump" : undefined}
                role={target ? "button" : undefined}
                tabIndex={target ? 0 : undefined}
                onClick={target ? () => jumpTo(target) : undefined}
                onKeyDown={target ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); jumpTo(target); } } : undefined}
                title={target ? "Jump to where this is explained" : undefined}
              >
                <span className="kp-stars">{"★".repeat(y.stars)}</span>
                <Html as="span" html={y.what} />
                {target && <span className="kp-jump-arrow" aria-hidden="true">↳</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body
  );
}
