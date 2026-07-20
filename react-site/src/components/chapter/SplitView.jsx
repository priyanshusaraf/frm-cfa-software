import { useRef } from "react";
import { useStore, setSplitWidth } from "../../lib/store.js";
import { useEdgeResize } from "../../lib/useEdgeResize.js";
import SplitPdfPane from "./SplitPdfPane.jsx";

const DEFAULT_WIDTH = 480;

/* Split-view source material alongside a reading (CLAUDE.md §7.4). Desktop-only
   (Chapter.jsx's toggleSplit falls back to the full-screen /pdf/:bn route below the
   1100px breakpoint, matching the reading-width resizer's own breakpoint). One pane
   open: reading | pane, resizable via the region's left edge (reuses the
   useEdgeResize drag pattern from Resizable.jsx). Both open: the reading gives up
   its space entirely (source | condensed, per the spec) — split evenly; a live
   divider between the two panes is a follow-up, not built this pass. */
export default function SplitView({ source, condensed, bn, query, onClosePane, children }) {
  const both = source && condensed;
  const regionRef = useRef(null);
  const storedWidth = useStore((s) => (s.layout && s.layout.split && s.layout.split.width) || null);
  const { width: dragWidth, onPointerDown, onDoubleClick } = useEdgeResize({
    targetRef: regionRef,
    min: 340,
    factor: -1, // handle sits on the pane region's LEFT edge: dragging left widens it
    onCommit: (px) => setSplitWidth(px),
    onReset: () => setSplitWidth(null),
  });
  const regionWidth = dragWidth ?? storedWidth ?? DEFAULT_WIDTH;

  return (
    <div className="split-shell">
      {!both && children}
      <div
        className="split-region"
        ref={regionRef}
        style={both ? undefined : { width: regionWidth, flex: `0 0 ${regionWidth}px` }}
      >
        {!both && (
          <div
            className="split-region-resize"
            onPointerDown={onPointerDown}
            onDoubleClick={onDoubleClick}
            title="Drag to resize · double-click to reset"
          />
        )}
        <div className="split-panes">
          {source && (
            <div className="split-pane">
              <SplitPdfPane kind="source" bn={bn} query={query} onClose={() => onClosePane("source")} />
            </div>
          )}
          {condensed && (
            <div className="split-pane">
              <SplitPdfPane kind="condensed" bn={bn} query={query} onClose={() => onClosePane("condensed")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
