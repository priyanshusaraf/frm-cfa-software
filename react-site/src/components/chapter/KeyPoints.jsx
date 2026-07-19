import { useState } from "react";
import { createPortal } from "react-dom";
import Html from "../Html.jsx";

/* "Key points to remember" rail, docked to the empty left side of wide screens
   (the TOC occupies the right). Content is the reading's own highYield items —
   no new content, just the top-priority ones kept in view while scrolling.
   Portal onto <body> for the same reason as ChapterTOC. */
export default function KeyPoints({ items, color }) {
  const [open, setOpen] = useState(true);
  const top = (items || []).filter((y) => y.stars >= 4).slice(0, 6);
  if (!top.length) return null;

  return createPortal(
    <aside className={"key-points" + (open ? "" : " collapsed")}>
      <button className="key-points-head" onClick={() => setOpen((o) => !o)}
              aria-expanded={open} title={open ? "Collapse" : "Expand"}>
        <span className="dot" style={{ background: color || "var(--amber)" }} />
        Key points to remember
        <span className="key-points-caret">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <ul>
          {top.map((y, i) => (
            <li key={i}>
              <span className="kp-stars">{"★".repeat(y.stars)}</span>
              <Html as="span" html={y.what} />
            </li>
          ))}
        </ul>
      )}
    </aside>,
    document.body
  );
}
