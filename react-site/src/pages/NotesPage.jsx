import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, updateNote, deleteNote, exportState, importState } from "../lib/store.js";
import { META, rpath, readingMeta } from "../lib/meta.js";

function NoteEditor({ note }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);

  function save() {
    updateNote(note.id, text);
    setEditing(false);
  }

  function remove() {
    if (window.confirm("Delete this note? This cannot be undone.")) deleteNote(note.id);
  }

  const meta = note.rn ? readingMeta(note.rn) : null;

  return (
    <div className="card" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
          {note.kind === "error" && (
            <span
              style={{
                color: "var(--red)",
                border: "1px solid var(--red)",
                borderRadius: "5px",
                padding: "0 0.3rem",
                marginRight: "0.45rem",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              error log
            </span>
          )}
          {new Date(note.ts).toLocaleString()}
          {note.section ? <> · {note.section}</> : null}
        </span>
        {note.rn ? (
          <Link to={rpath(note.rn)} style={{ fontSize: "0.78rem", whiteSpace: "nowrap" }}>
            R{note.rn}{meta ? " · " + meta.t : ""} →
          </Link>
        ) : null}
      </div>

      {note.quote ? (
        <blockquote
          style={{
            margin: "0.5rem 0",
            padding: "0.4rem 0.75rem",
            borderLeft: "2px solid var(--border-strong)",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "var(--text-dim)",
          }}
        >
          &ldquo;{note.quote}&rdquo;
        </blockquote>
      ) : null}

      {editing ? (
        <div style={{ marginTop: "0.5rem" }}>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              resize: "vertical",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-inset)",
              color: "var(--text)",
              font: "inherit",
              fontSize: "0.9rem",
            }}
          />
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <button className="chip" onClick={save}>Save</button>
            <button className="chip" onClick={() => { setText(note.text); setEditing(false); }}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ margin: "0.4rem 0", fontSize: "0.92rem", whiteSpace: "pre-wrap" }}>{note.text}</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="chip" onClick={() => setEditing(true)}>Edit</button>
            <button className="chip" onClick={remove}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function NotesPage() {
  const notes = useStore((s) => s.notes);
  const [filter, setFilter] = useState("");
  const [bookFilter, setBookFilter] = useState("all");
  const [kindFilter, setKindFilter] = useState("all"); // all | note | error
  const fileInputRef = useRef(null);

  useEffect(() => { document.title = "Your notes"; }, []);

  const filtered = useMemo(() => {
    let list = notes;
    if (kindFilter !== "all") {
      list = list.filter((n) => (n.kind || "note") === kindFilter);
    }
    if (bookFilter !== "all") {
      const bn = Number(bookFilter);
      list = list.filter((n) => {
        const meta = n.rn ? readingMeta(n.rn) : null;
        const book = meta ? META.books.find((b) => b.readings.some((r) => r.n === n.rn)) : null;
        return book && book.n === bn;
      });
    }
    const q = filter.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (n) =>
          (n.text || "").toLowerCase().includes(q) ||
          (n.quote || "").toLowerCase().includes(q) ||
          (n.section || "").toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => b.ts - a.ts);
  }, [notes, filter, bookFilter, kindFilter]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const n of filtered) {
      const key = n.rn || 0;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(n);
    }
    const entries = [...map.entries()];
    entries.sort((a, b) => {
      if (a[0] === 0) return 1;
      if (b[0] === 0) return -1;
      return a[0] - b[0];
    });
    return entries;
  }, [filtered]);

  function handleExport() {
    const blob = new Blob([exportState()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frm2-notes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importState(String(reader.result));
      } catch (err) {
        alert("Import failed: " + (err && err.message ? err.message : "invalid file"));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <main className="page">
      <h1>Your notes</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", margin: "1rem 0" }}>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter notes…"
          style={{
            flex: "1 1 220px",
            padding: "0.45rem 0.7rem",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--bg-inset)",
            color: "var(--text)",
            font: "inherit",
            fontSize: "0.88rem",
          }}
        />
        <button className={"chip" + (bookFilter === "all" ? " active" : "")} onClick={() => setBookFilter("all")}>
          All
        </button>
        {META.books.map((b) => (
          <button
            key={b.n}
            className={"chip" + (bookFilter === String(b.n) ? " active" : "")}
            onClick={() => setBookFilter(String(b.n))}
            style={bookFilter === String(b.n) ? { borderColor: b.color, color: b.color } : undefined}
          >
            Book {b.n}
          </button>
        ))}
        <span style={{ width: "1px", alignSelf: "stretch", background: "var(--border)" }} />
        <button className={"chip" + (kindFilter === "all" ? " active" : "")} onClick={() => setKindFilter("all")}>
          Everything
        </button>
        <button className={"chip" + (kindFilter === "note" ? " active" : "")} onClick={() => setKindFilter("note")}>
          Notes
        </button>
        <button
          className={"chip" + (kindFilter === "error" ? " active" : "")}
          onClick={() => setKindFilter("error")}
          style={kindFilter === "error" ? { borderColor: "var(--red)", color: "var(--red)" } : undefined}
        >
          Error log
        </button>
        <button className="chip" onClick={handleExport}>Export</button>
        <button className="chip" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportFile}
          style={{ display: "none" }}
        />
      </div>

      {groups.length === 0 ? (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          No notes yet. Press <strong>n</strong> anywhere on the site (or click the note button in the
          bottom-right corner) to capture a quick note — it will remember what you're reading and any
          text you've selected.
        </div>
      ) : (
        groups.map(([rn, group]) => {
          const meta = rn ? readingMeta(rn) : null;
          const book = rn ? META.books.find((b) => b.readings.some((r) => r.n === rn)) : null;
          return (
            <section key={rn} style={{ marginBottom: "1.75rem" }}>
              <div
                className="section-label"
                style={{ color: book ? book.color : "var(--text-faint)" }}
              >
                {rn ? "R" + rn + (meta ? " · " + meta.t : "") : "General"}
              </div>
              {group.map((n) => (
                <NoteEditor key={n.id} note={n} />
              ))}
            </section>
          );
        })
      )}
    </main>
  );
}
