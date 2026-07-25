import { forwardRef } from "react";
import { useReading } from "../lib/readings.js";
import { useStore, setSplitPane, setSplitSide, setSplitQuery } from "../lib/store.js";

/* Split-view controls, hoisted out of Chapter.jsx's action row into the navbar so
   they stay reachable in fullscreen and sit in one place (CLAUDE.md §7.4).
   Rendered by Nav only on /chapter/:rn.

   Desktop-only via `hidden lg:flex`, matching the classes the Chapter buttons used.
   Because these are never visible below the split's 1100px breakpoint, they need
   none of Chapter.toggleSplit's narrow-viewport /pdf/:bn fallback.

   Plain <button> inside .topnav picks up a style.css rule that beats single-class
   Tailwind utilities on specificity, so this uses role="button" spans like Nav's
   own NavButton. */
const Toggle = forwardRef(function Toggle({ active, onClick, title, children }, ref) {
  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={!!active}
      title={title}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className={
        "cursor-pointer select-none whitespace-nowrap rounded-el border px-2 py-[0.2rem] font-app text-[0.74rem] leading-none transition-colors " +
        (active
          ? "border-accent bg-accent-soft font-semibold text-accent"
          : "border-line text-dim hover:bg-hovered hover:text-ink")
      }
    >
      {children}
    </span>
  );
});

export default function NavSplitControls({ rn }) {
  const source = useStore((s) => !!(s.layout && s.layout.split && s.layout.split.panes && s.layout.split.panes.source));
  const condensed = useStore((s) => !!(s.layout && s.layout.split && s.layout.split.panes && s.layout.split.panes.condensed));
  const side = useStore((s) => s.layout && s.layout.split && s.layout.split.side) || "right";
  /* cache hit in practice (Chapter has already loaded this reading), not a second
     fetch. Readings with no `pdf` field have nothing to open: SplitView only
     renders when `d.pdf` exists, so a toggle here would set state nothing reads. */
  const d = useReading(rn || 0);
  if (!d || !d.pdf) return null;

  const open = source || condensed;

  /* mirrors Chapter.closeSplitPane: an ad-hoc "Read in source" anchor belongs to
     the open pane, so closing the pane must drop it or it re-anchors on reopen */
  function toggleSource() {
    if (source) setSplitQuery(null);
    setSplitPane("source", !source);
  }

  return (
    <span className="ml-1 hidden shrink-0 items-center gap-1 lg:flex">
      <Toggle
        active={source}
        onClick={toggleSource}
        title="Show the full Schweser book beside this reading"
      >
        Source
      </Toggle>
      {d.pdf.book <= 4 && (
        /* condensed companions exist for Books 1-4 only (CLAUDE.md content rule) */
        <Toggle
          active={condensed}
          onClick={() => setSplitPane("condensed", !condensed)}
          title="Show the condensed companion beside this reading"
        >
          Condensed
        </Toggle>
      )}
      {open && (
        <>
          <Toggle
            active={side === "left"}
            onClick={() => setSplitSide("left")}
            title="Dock the books to the left of the reading"
          >
            ◧
          </Toggle>
          <Toggle
            active={side === "right"}
            onClick={() => setSplitSide("right")}
            title="Dock the books to the right of the reading"
          >
            ◨
          </Toggle>
        </>
      )}
    </span>
  );
}
