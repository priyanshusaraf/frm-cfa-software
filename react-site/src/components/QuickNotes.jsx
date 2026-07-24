import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { StickyNote, Check } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "./ui/dialog.jsx";
import Button from "./ui/button.jsx";
import { readingMeta } from "../lib/meta.js";
import { addNote } from "../lib/store.js";

/* Globally-mounted floating quick-note capture. Press "n" (outside inputs) or
   click the fab to open a small note-taking dialog pre-filled with the current
   reading context, nearest section heading, and any active text selection. */
export default function QuickNotes() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [quote, setQuote] = useState("");
  const [section, setSection] = useState("");
  const [text, setText] = useState("");
  const [kind, setKind] = useState("note");
  const textareaRef = useRef(null);
  const savedTimer = useRef(null);

  const rnMatch = /^\/chapter\/(\d+)/.exec(location.pathname);
  const rn = rnMatch ? Number(rnMatch[1]) : 0;
  const meta = rn ? readingMeta(rn) : null;
  const contextLabel = meta ? "R" + rn + " · " + meta.t : "General";

  function captureAndOpen() {
    const sel = window.getSelection ? window.getSelection().toString().trim() : "";
    setQuote(sel);

    let nearest = "";
    const labels = document.querySelectorAll(".section-label");
    for (const el of labels) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 80) nearest = el.textContent || "";
      else break;
    }
    setSection(nearest || document.title || "");

    setText("");
    setKind("note");
    setOpen(true);
  }

  useEffect(() => {
    function onKeydown(e) {
      if (e.key !== "n" || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const el = document.activeElement;
      if (el) {
        const tag = el.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable) return;
      }
      e.preventDefault();
      captureAndOpen();
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current && textareaRef.current.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => () => { if (savedTimer.current) clearTimeout(savedTimer.current); }, []);

  function handleSave() {
    if (!text.trim() && !quote.trim()) { setOpen(false); return; }
    addNote({ rn: rn || 0, section: section || document.title, quote, text, kind });
    setOpen(false);
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1600);
  }

  return (
    <>
      {/* qn-fab is the stable class hook fullscreen mode hides this by (style.css) */}
      <button
        type="button"
        aria-label={saved ? "Note saved" : "Quick note (press n)"}
        title={saved ? "Saved" : "Quick note (n)"}
        onClick={captureAndOpen}
        className="qn-fab fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full
          border border-linestrong bg-accent-soft text-accent shadow-card transition-transform
          hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        {saved ? <Check size={18} /> : <StickyNote size={18} />}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Quick note">
          <div className="mb-2 text-[0.78rem] font-semibold uppercase tracking-wide text-faint">
            {contextLabel}
          </div>
          {quote ? (
            <blockquote className="mb-3 border-l-2 border-linestrong pl-3 text-[0.85rem] italic text-dim">
              &ldquo;{quote}&rdquo;
            </blockquote>
          ) : null}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a quick note…"
            rows={5}
            className="w-full resize-y rounded-el border border-line bg-inset p-2.5 font-app text-[0.9rem]
              text-ink outline-none focus:border-accent"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSave(); }
            }}
          />
          <label className="mt-2 flex cursor-pointer select-none items-center gap-2 text-[0.83rem] text-dim">
            <input
              type="checkbox"
              checked={kind === "error"}
              onChange={(e) => setKind(e.target.checked ? "error" : "note")}
            />
            Error-log entry (a &ldquo;why I was wrong&rdquo; note — filterable on the Notes page)
          </label>
          <div className="mt-3 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button variant="default" size="sm" onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
