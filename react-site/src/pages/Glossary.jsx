import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { META, bookOf, rpath } from "../lib/meta.js";
import Html from "../components/Html.jsx";

function strip(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

function buildGlossary(readings) {
  const entries = [];
  Object.keys(readings).forEach((rn) => {
    const d = readings[rn];
    const n = parseInt(rn, 10);
    const b = bookOf(n);
    (d.concepts || []).forEach((c) => {
      const term = strip(c.name).trim();
      if (!term) return;
      entries.push({ term, def: c.def || "", rn: n, title: d.title, book: b });
    });
  });
  entries.sort((a, b) => a.term.localeCompare(b.term) || a.rn - b.rn);
  return entries;
}

const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function letterOf(term) {
  const c = (term[0] || "").toUpperCase();
  return AZ.includes(c) ? c : "#";
}

export default function Glossary() {
  const allReadings = useAllReadings();
  const all = useMemo(() => (allReadings ? buildGlossary(allReadings) : []), [allReadings]);
  const [q, setQ] = useState("");
  const [book, setBook] = useState("all");

  const filtered = useMemo(() => {
    let list = all;
    if (book !== "all") list = list.filter((e) => e.book && String(e.book.n) === book);
    const s = q.trim().toLowerCase();
    if (s) list = list.filter((e) => e.term.toLowerCase().includes(s) || strip(e.def).toLowerCase().includes(s));
    return list;
  }, [all, q, book]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      const L = letterOf(e.term);
      if (!map.has(L)) map.set(L, []);
      map.get(L).push(e);
    }
    return [...map.entries()];
  }, [filtered]);

  const present = useMemo(() => new Set(groups.map(([L]) => L)), [groups]);

  if (!allReadings) {
    return (
      <main className="page">
        <h1>Glossary</h1>
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Glossary</h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: "0.25rem 0 1rem" }}>
        Every concept defined across the curriculum — {all.length} terms from all 101 readings. Click a
        term&rsquo;s reading link to see it in context.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", margin: "0 0 0.75rem" }}>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms and definitions…"
          style={{
            flex: "1 1 240px",
            padding: "0.45rem 0.7rem",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--bg-inset)",
            color: "var(--text)",
            font: "inherit",
            fontSize: "0.88rem",
          }}
        />
        <button className={"chip" + (book === "all" ? " active" : "")} onClick={() => setBook("all")}>
          All
        </button>
        {META.books.map((b) => (
          <button
            key={b.n}
            className={"chip" + (book === String(b.n) ? " active" : "")}
            onClick={() => setBook(String(b.n))}
            style={book === String(b.n) ? { borderColor: b.color, color: b.color } : undefined}
          >
            Book {b.n}
          </button>
        ))}
      </div>

      <div
        style={{
          position: "sticky",
          top: "3.2rem",
          zIndex: 5,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.15rem",
          padding: "0.4rem 0",
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          marginBottom: "1rem",
        }}
      >
        {AZ.map((L) => (
          <a
            key={L}
            href={present.has(L) ? "#gl-" + L : undefined}
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.78rem",
              padding: "0.1rem 0.35rem",
              borderRadius: "6px",
              color: present.has(L) ? "var(--accent)" : "var(--text-faint)",
              pointerEvents: present.has(L) ? "auto" : "none",
              textDecoration: "none",
            }}
          >
            {L}
          </a>
        ))}
      </div>

      {groups.length === 0 && (
        <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>No terms match this filter.</p>
      )}

      {groups.map(([L, entries]) => (
        <section key={L} id={"gl-" + L} style={{ scrollMarginTop: "6rem", marginBottom: "1.5rem" }}>
          <div className="section-label">{L}</div>
          {entries.map((e, i) => (
            <div className="card" key={e.term + "-" + e.rn + "-" + i} style={{ marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "baseline" }}>
                <strong style={{ fontSize: "0.95rem" }}>{e.term}</strong>
                <Link
                  to={rpath(e.rn)}
                  style={{ fontSize: "0.78rem", whiteSpace: "nowrap", color: e.book ? e.book.color : undefined }}
                >
                  R{e.rn} · {e.title} →
                </Link>
              </div>
              {e.def && (
                <div style={{ fontSize: "0.88rem", color: "var(--text-dim)", marginTop: "0.3rem" }}>
                  <Html as="span" html={e.def} />
                </div>
              )}
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
