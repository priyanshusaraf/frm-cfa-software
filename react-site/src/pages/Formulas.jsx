import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { META, readingMeta, rpath } from "../lib/meta.js";
import { useAllReadings } from "../lib/readings.js";
import { renderMath, isTex, fitMath } from "../lib/tex.js";
import Html from "../components/Html.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";
import Button from "../components/ui/button.jsx";

const STAR_OPTIONS = [
  { key: "all", label: "All" },
  { key: "4", label: "4★+" },
  { key: "5", label: "5★" },
];

function chipStyle(active, color) {
  return active
    ? { cursor: "pointer", border: "1px solid " + (color || "var(--accent)"), color: color || "var(--accent)", background: "var(--bg-hover)" }
    : { cursor: "pointer" };
}

export default function Formulas() {
  const [q, setQ] = useState("");
  const [bookFilter, setBookFilter] = useState(null); // null = all
  const [minStars, setMinStars] = useState("all");
  const rootRef = useRef(null);
  const readings = useAllReadings();

  useEffect(() => { document.title = "Formulas — FRM Part II"; }, []);

  const grouped = useMemo(() => {
    if (!readings) return [];
    const needle = q.trim().toLowerCase();
    const out = [];
    for (const b of META.books) {
      if (bookFilter && b.n !== bookFilter) continue;
      const bookReadings = [];
      for (const r of b.readings) {
        const meta = readingMeta(r.n);
        if (minStars === "4" && !(meta.hy >= 4)) continue;
        if (minStars === "5" && !(meta.hy >= 5)) continue;
        const d = readings[r.n];
        if (!d || !d.formulas || !d.formulas.length) continue;
        const fs = needle
          ? d.formulas.filter((f) =>
              (f.name || "").toLowerCase().includes(needle) ||
              (f.plain || "").toLowerCase().includes(needle) ||
              (f.note || "").toLowerCase().includes(needle)
            )
          : d.formulas;
        if (!fs.length) continue;
        bookReadings.push({ r, meta, d, fs });
      }
      if (bookReadings.length) out.push({ book: b, bookReadings });
    }
    return out;
  }, [readings, q, bookFilter, minStars]);

  useEffect(() => {
    if (rootRef.current) fitMath(rootRef.current);
  }, [grouped]);

  const totalCount = grouped.reduce(
    (sum, g) => sum + g.bookReadings.reduce((s2, br) => s2 + br.fs.length, 0),
    0
  );

  return (
    <main className="page" ref={rootRef}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, .page { background: #fff !important; color: #000 !important; }
          .formula-block { break-inside: avoid; page-break-inside: avoid; border-color: #999 !important; background: #fff !important; }
          a { color: #000 !important; text-decoration: none !important; }
        }
      `}</style>

      <div className="kicker no-print" style={{ color: "var(--accent)" }}>Reference</div>
      <h1 className="no-print">Formulas</h1>
      <p className="lead no-print">Every formula across all 101 readings, in one printable reference.</p>

      {!readings && (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      )}

      {readings && (
      <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Filter by name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            flex: "1 1 220px",
            padding: "0.5rem 0.8rem",
            borderRadius: "var(--radius, 10px)",
            border: "1px solid var(--line, #333)",
            background: "var(--bg-inset, transparent)",
            color: "inherit",
            fontSize: "0.9rem",
          }}
        />
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <button
            className="chip"
            style={chipStyle(bookFilter === null)}
            onClick={() => setBookFilter(null)}
          >
            All books
          </button>
          {META.books.map((b) => (
            <button
              key={b.n}
              className="chip"
              style={chipStyle(bookFilter === b.n, b.color)}
              onClick={() => setBookFilter(bookFilter === b.n ? null : b.n)}
            >
              B{b.n} {b.short}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {STAR_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className="chip"
              style={chipStyle(minStars === opt.key)}
              onClick={() => setMinStars(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => window.print()}>Print</Button>
      </div>
      )}

      {readings && (
      <p className="no-print" style={{ fontSize: "0.83rem", color: "var(--text-dim)" }}>{totalCount} formulas</p>
      )}

      {readings && grouped.length === 0 && (
        <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>No formulas match this filter.</p>
      )}

      {grouped.map(({ book, bookReadings }) => (
        <section key={book.n}>
          <div className="section-label">
            <span className="dot" style={{ background: book.color }} />
            Book {book.n} · {book.short}
          </div>
          {bookReadings.map(({ r, d, fs }) => (
            <div key={r.n} style={{ marginBottom: "1.4rem" }}>
              <h3 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem" }}>
                <Link to={rpath(r.n)} style={{ color: book.color, marginRight: "0.5rem" }}>R{r.n}</Link>
                {d.title}
              </h3>
              {fs.map((f, i) => (
                <div className="formula-block" key={i}>
                  <div className="f-name" style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                    <span>{f.name}</span>
                  </div>
                  <div
                    className={"f-math" + (isTex(f.math) ? " f-tex" : "")}
                    dangerouslySetInnerHTML={{ __html: renderMath(f.math, true) }}
                  />
                  {f.plain && <p style={{ fontStyle: "italic", fontSize: "0.86rem", margin: "0.4rem 0 0" }}><Html as="span" html={f.plain} /></p>}
                  {f.note && <div className="f-note">{f.note}</div>}
                  {f.derivation && (
                    <Accordion type="single" collapsible style={{ marginTop: "0.5rem" }}>
                      <AccordionItem value="derivation">
                        <AccordionTrigger>Show the math</AccordionTrigger>
                        <AccordionContent>
                          <Html html={f.derivation} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
