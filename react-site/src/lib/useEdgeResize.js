import { useState } from "react";

/* Shared right-edge drag-to-resize logic for the page column and per-list blocks.
   Captures the handle node + pointerId into locals (React nulls e.currentTarget after
   the handler returns) and listens on window so a fast drag that leaves the handle still
   tracks and, crucially, ENDS — the earlier page-resizer bug was reading the nulled
   e.currentTarget in onUp, which threw before the move listener was removed and left the
   drag running forever. `factor` is 2 for a centered column (grows symmetrically) and 1
   for a left-anchored block. Returns the live width during a drag (null otherwise). */
export function useEdgeResize({ targetRef, min = 240, factor = 1, onCommit, onReset }) {
  const [width, setWidth] = useState(null);

  function onPointerDown(e) {
    e.preventDefault();
    const handle = e.currentTarget;
    const pointerId = e.pointerId;
    const startX = e.clientX;
    const target = (targetRef && targetRef.current) || handle.parentElement;
    if (!target) return;
    const startW = target.getBoundingClientRect().width;
    let lastW = startW;
    try { handle.setPointerCapture(pointerId); } catch { /* unsupported — window listeners still work */ }
    handle.classList.add("dragging");

    function onMove(ev) {
      let w = startW + factor * (ev.clientX - startX);
      w = Math.max(min, Math.min(window.innerWidth - 32, w));
      lastW = w;
      setWidth(w);
    }
    function end() {
      handle.classList.remove("dragging");
      try { handle.releasePointerCapture(pointerId); } catch { /* no-op */ }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      if (onCommit) onCommit(lastW);
      setWidth(null);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  }

  function onDoubleClick() {
    if (onReset) onReset();
    setWidth(null);
  }

  return { width, onPointerDown, onDoubleClick };
}
