import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, hlLabels, setHlLabel, removeHighlight, HL_COLORS } from "../lib/store.js";
import { META, rpath, readingMeta, bookOf } from "../lib/meta.js";

const HL_HEX = { y: "#e6c34a", g: "#4ac97e", b: "#4a9ee6", r: "#e65a5a" };

function LegendRow({ labels }) {
  const [drafts, setDrafts] = useState(labels);

  useEffect(() => { setDrafts(labels); }, [labels]);

  function commit(color) {
    const val = (drafts[color] || "").trim();
    if (val && val !== labels[color]) setHlLabel(color, val);
    else setDrafts((d) => ({ ...d, [color]: labels[color] }));
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", margin: "1rem 0" }}>
      {HL_COLORS.map((c) => (
        <div
          key={c}
          className="card"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem" }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "0.9rem",
              height: "0.9rem",
              borderRadius: "3px",
              background: HL_HEX[c],
              flex: "0 0 auto",
              display: "inline-block",
            }}
          />
          <input
            type="text"
            value={drafts[c] || ""}
            onChange={(e) => setDrafts((d) => ({ ...d, [c]: e.target.value }))}
            onBlur={() => commit(c)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.currentTarget.blur(); }
            }}
            style={{
              width: "9rem",
              padding: "0.3rem 0.5rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--bg-inset)",
              color: "var(--text)",
              font: "inherit",
              fontSize: "0.85rem",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function HighlightRow({ h, rn }) {
  return (
    <div
      className="card"
      style={{
        marginBottom: "0.6rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.6rem",
      }}
    >
      <span
        aria-hidden="true"
        title={h.color}
        style={{
          width: "0.85rem",
          height: "0.85rem",
          marginTop: "0.2rem",
          borderRadius: "3px",
          background: HL_HEX[h.color] || HL_HEX.y,
          flex: "0 0 auto",
          display: "inline-block",
        }}
      />
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <blockquote
          style={{
            margin: 0,
            padding: "0.35rem 0.7rem",
            borderLeft: "2px solid var(--border-strong)",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--text-dim)",
          }}
        >
          &ldquo;{h.text}&rdquo;
        </blockquote>
        <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginTop: "0.3rem" }}>
          {new Date(h.ts).toLocaleString()}
          {h.section ? <> · {h.section}</> : null}
        </div>
      </div>
      <button className="chip" onClick={() => removeHighlight(rn, h.id)} style={{ flex: "0 0 auto" }}>
        Remove
      </button>
    </div>
  );
}

const EMPTY_HL = {};

export default function Highlights() {
  /* selectors must return stable identities for useSyncExternalStore —
     raw store slices only; derive merged/defaulted objects via useMemo */
  const rawHighlights = useStore((s) => s.highlights);
  const rawLabels = useStore((s) => s.hlLabels);
  const highlights = rawHighlights || EMPTY_HL;
  const labels = useMemo(() => hlLabels({ hlLabels: rawLabels }), [rawLabels]);
  const [colorFilter, setColorFilter] = useState("all");
  const [bookFilter, setBookFilter] = useState("all");

  useEffect(() => { document.title = "Your highlights"; }, []);

  const rows = useMemo(() => {
    const out = [];
    for (const rnKey of Object.keys(highlights)) {
      const rn = Number(rnKey);
      const list = highlights[rnKey] || [];
      for (const h of list) out.push({ rn, h });
    }
    return out;
  }, [highlights]);

  const filtered = useMemo(() => {
    let list = rows;
    if (colorFilter !== "all") list = list.filter((x) => x.h.color === colorFilter);
    if (bookFilter !== "all") {
      const bn = Number(bookFilter);
      list = list.filter((x) => {
        const book = bookOf(x.rn);
        return book && book.n === bn;
      });
    }
    return list;
  }, [rows, colorFilter, bookFilter]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const { rn, h } of filtered) {
      if (!map.has(rn)) map.set(rn, []);
      map.get(rn).push(h);
    }
    const entries = [...map.entries()];
    for (const [, list] of entries) list.sort((a, b) => b.ts - a.ts);
    entries.sort((a, b) => a[0] - b[0]);
    return entries;
  }, [filtered]);

  function handleExport() {
    const byBook = new Map();
    for (const rnKey of Object.keys(highlights)) {
      const rn = Number(rnKey);
      const list = highlights[rnKey] || [];
      if (!list.length) continue;
      const book = bookOf(rn);
      const bn = book ? book.n : 0;
      if (!byBook.has(bn)) byBook.set(bn, { book, readings: new Map() });
      byBook.get(bn).readings.set(rn, [...list].sort((a, b) => a.ts - b.ts));
    }
    const bns = [...byBook.keys()].sort((a, b) => a - b);
    let md = "# Highlights\n\n";
    for (const bn of bns) {
      const entry = byBook.get(bn);
      md += "## " + (entry.book ? "Book " + entry.book.n + " — " + entry.book.title : "Unfiled") + "\n\n";
      const rns = [...entry.readings.keys()].sort((a, b) => a - b);
      for (const rn of rns) {
        const meta = readingMeta(rn);
        md += "### R" + rn + (meta ? " · " + meta.t : "") + "\n\n";
        for (const h of entry.readings.get(rn)) {
          const label = labels[h.color] || h.color;
          md += "**" + label + "** — " + new Date(h.ts).toLocaleDateString() + "\n\n";
          md += "> " + h.text.replace(/\n/g, "\n> ") + "\n\n";
        }
      }
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frm2-highlights.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page">
      <h1>Your highlights</h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
        Colors carry your own meaning — label them below. Select text in any chapter to create a highlight.
      </p>

      <LegendRow labels={labels} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", margin: "1rem 0" }}>
        <button className={"chip" + (colorFilter === "all" ? " active" : "")} onClick={() => setColorFilter("all")}>
          All colors
        </button>
        {HL_COLORS.map((c) => (
          <button
            key={c}
            className={"chip" + (colorFilter === c ? " active" : "")}
            onClick={() => setColorFilter(c)}
            style={colorFilter === c ? { borderColor: HL_HEX[c], color: HL_HEX[c] } : undefined}
          >
            {labels[c] || c}
          </button>
        ))}
        <span style={{ width: "1px", alignSelf: "stretch", background: "var(--border)" }} />
        <button className={"chip" + (bookFilter === "all" ? " active" : "")} onClick={() => setBookFilter("all")}>
          All books
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
        <span style={{ flex: "1 1 auto" }} />
        <button className="chip" onClick={handleExport} disabled={rows.length === 0}>
          Export Markdown
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          No highlights yet. Select any passage of text inside a chapter to highlight it — pick a color from
          the toolbar that appears, then come back here to see it grouped by reading, filter by color or
          book, or export everything to Markdown.
        </div>
      ) : (
        groups.map(([rn, list]) => {
          const meta = readingMeta(rn);
          const book = bookOf(rn);
          return (
            <section key={rn} style={{ marginBottom: "1.75rem" }}>
              <div className="section-label" style={{ color: book ? book.color : "var(--text-faint)" }}>
                <Link to={rpath(rn)} style={{ color: "inherit" }}>
                  R{rn}{meta ? " · " + meta.t : ""} →
                </Link>
              </div>
              {list.map((h) => (
                <HighlightRow key={h.id} h={h} rn={rn} />
              ))}
            </section>
          );
        })
      )}
    </main>
  );
}
