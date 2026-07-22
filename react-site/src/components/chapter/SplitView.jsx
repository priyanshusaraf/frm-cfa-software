import { useRef } from "react";
import { useStore, setSplitPaneWidth } from "../../lib/store.js";
import { useEdgeResize } from "../../lib/useEdgeResize.js";
import SplitPdfPane from "./SplitPdfPane.jsx";

const DEFAULT_WIDTH = 460;

/* Split-view source material alongside a reading (CLAUDE.md §7.4). Desktop-only
   (Chapter.jsx's toggleSplit falls back to the full-screen /pdf/:bn route below the
   1100px breakpoint, matching the reading-width resizer's own breakpoint).

   Free-form column model: the reading column (`children`, `.page`) is `flex: 1 1
   auto` and absorbs every drag. Each open pane is its own fixed-width column with
   its own resize handle on the edge facing the reading — dragging a pane changes
   ONLY that pane's stored width via setSplitPaneWidth; there is no two-way divider
   between panes. The pane group docks left or right of the reading per
   `layout.split.side` (setSplitSide); panes keep source-then-condensed order
   regardless of dock side. */
export default function SplitView({ source, condensed, bn, query, onClosePane, children }) {
  const side = useStore((s) => s.layout && s.layout.split && s.layout.split.side) || "right";
  const widths = useStore((s) => s.layout && s.layout.split && s.layout.split.widths);
  const storedSourceWidth = widths && widths.source;
  const storedCondensedWidth = widths && widths.condensed;

  const sourceRef = useRef(null);
  const condensedRef = useRef(null);

  // handle sits on the reading-facing edge: right dock -> pane's left edge (drag
  // left = wider, factor -1); left dock -> pane's right edge (drag right = wider,
  // factor +1). Hooks called unconditionally regardless of which panes are open.
  const sourceResize = useEdgeResize({
    targetRef: sourceRef,
    min: 240,
    factor: side === "left" ? 1 : -1,
    onCommit: (px) => setSplitPaneWidth("source", px),
    onReset: () => setSplitPaneWidth("source", null),
  });
  const condensedResize = useEdgeResize({
    targetRef: condensedRef,
    min: 240,
    factor: side === "left" ? 1 : -1,
    onCommit: (px) => setSplitPaneWidth("condensed", px),
    onReset: () => setSplitPaneWidth("condensed", null),
  });

  const sourceWidth = sourceResize.width ?? storedSourceWidth ?? DEFAULT_WIDTH;
  const condensedWidth = condensedResize.width ?? storedCondensedWidth ?? DEFAULT_WIDTH;

  const handleClass = "split-pane-resize split-pane-resize--" + (side === "left" ? "right" : "left");

  const paneGroup = (
    <div className="split-panes">
      {source && (
        <div className="split-pane" ref={sourceRef} style={{ width: sourceWidth, flex: `0 0 ${sourceWidth}px` }}>
          <SplitPdfPane kind="source" bn={bn} query={query} side={side} onClose={() => onClosePane("source")} />
          <div
            className={handleClass}
            onPointerDown={sourceResize.onPointerDown}
            onDoubleClick={sourceResize.onDoubleClick}
            title="Drag to resize · double-click to reset"
          />
        </div>
      )}
      {condensed && (
        <div className="split-pane" ref={condensedRef} style={{ width: condensedWidth, flex: `0 0 ${condensedWidth}px` }}>
          <SplitPdfPane kind="condensed" bn={bn} query={query} side={side} onClose={() => onClosePane("condensed")} />
          <div
            className={handleClass}
            onPointerDown={condensedResize.onPointerDown}
            onDoubleClick={condensedResize.onDoubleClick}
            title="Drag to resize · double-click to reset"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="split-shell">
      {side === "left" ? (
        <>
          {paneGroup}
          {children}
        </>
      ) : (
        <>
          {children}
          {paneGroup}
        </>
      )}
    </div>
  );
}
