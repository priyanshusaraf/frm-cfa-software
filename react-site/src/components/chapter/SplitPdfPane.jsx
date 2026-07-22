import { X } from "lucide-react";
import PdfCore from "../PdfCore.jsx";
import { useStore, setSplitZoom } from "../../lib/store.js";

const LABELS = { source: "Source", condensed: "Condensed" };

/* One side of the split view (Chapter.jsx §7.4) — a self-scrolling PdfCore instance
   sized to fill its flex slot, with a close button instead of the full route's
   back link, plus a per-pane zoom control (rendered by PdfCore itself when
   `onZoom` is passed) so the PDF text can get bigger independent of pane width.
   Condensed companions only exist for books 1-4 (CLAUDE.md content rule). */
export default function SplitPdfPane({ kind, bn, query, side, onClose }) {
  const fileUrl = import.meta.env.BASE_URL + "pdfs/" + (kind === "condensed" ? "condensed" : "book") + bn + ".pdf";
  const zoom = useStore((s) => s.layout && s.layout.split && s.layout.split.zoom && s.layout.split.zoom[kind]) || 1;

  return (
    <PdfCore
      fileUrl={fileUrl}
      label={LABELS[kind] + " · Book " + bn}
      maxWidth={2400}
      mode="pane"
      initialQuery={query}
      zoom={zoom}
      onZoom={(z) => setSplitZoom(kind, z)}
      toolbarRight={
        <button
          onClick={onClose}
          className="text-dim hover:text-ink p-1 rounded-el hover:bg-hovered"
          title={"Close " + LABELS[kind].toLowerCase() + " pane"}
          aria-label={"Close " + LABELS[kind].toLowerCase() + " pane"}
        >
          <X size={14} />
        </button>
      }
    />
  );
}
