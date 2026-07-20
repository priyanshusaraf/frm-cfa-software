import { useStore, setBlockWidth } from "../../lib/store.js";
import { useEdgeResize } from "../../lib/useEdgeResize.js";

/* Wraps a single list/card block so the student can widen it independently (e.g. to let
   the "Six sources of funding liquidity" card take more of the row). Width persists per
   block key in the store; the drag handle is desktop-only (hidden < 1100px via CSS) and
   double-click resets. In a flex-wrap row, giving one block an explicit basis reflows the
   others around it. The global page resizer is separate and still applies on top. */
export default function Resizable({ blockKey, className = "", children }) {
  const stored = useStore(
    (s) => (s.layout && s.layout.blockWidths && s.layout.blockWidths[blockKey]) || null
  );
  const { width, onPointerDown, onDoubleClick } = useEdgeResize({
    min: 260,
    factor: 1,
    onCommit: (px) => setBlockWidth(blockKey, px),
    onReset: () => setBlockWidth(blockKey, null),
  });
  const applied = width ?? stored;
  const style = applied ? { flex: `0 0 ${applied}px`, maxWidth: "100%" } : undefined;

  return (
    <div className={"resizable " + className} style={style}>
      {children}
      <div
        className="block-resize"
        onPointerDown={onPointerDown}
        onDoubleClick={onDoubleClick}
        title="Drag to resize this list · double-click to reset"
        aria-hidden="true"
      />
    </div>
  );
}
