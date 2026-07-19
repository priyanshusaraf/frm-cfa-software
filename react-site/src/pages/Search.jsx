import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { META, bookOf } from "../lib/meta.js";

function strip(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

function buildIndex(readings) {
  const INDEX = [];
  Object.keys(readings).forEach((rn) => {
    const d = readings[rn];
    const b = bookOf(parseInt(rn, 10));
    const where = "Book " + b.n + " · R" + rn + " · " + d.title;
    INDEX.push({
      term: "Reading " + rn + ": " + d.title,
      def: strip(d.tagline || d.teaches || "").slice(0, 220),
      where, r: rn, kind: "chapter", extra: "",
    });
    (d.concepts || []).forEach((c) => {
      INDEX.push({
        term: strip(c.name),
        def: strip(c.def || ""),
        where, r: rn, kind: "concept",
        extra: strip((c.related || []).map((x) => (typeof x === "object" ? x.label : x)).join(" · ")),
      });
    });
    (d.formulas || []).forEach((f) => {
      INDEX.push({
        term: strip(f.name),
        def: strip(f.plain || f.math) + (f.note ? " — " + strip(f.note) : ""),
        where, r: rn, kind: "formula", extra: "",
      });
    });
    (d.misconceptions || []).forEach((m) => {
      INDEX.push({
        term: "Trap: " + strip(m.wrong).slice(0, 90),
        def: strip(m.right),
        where, r: rn, kind: "trap", extra: "",
      });
    });
  });
  return INDEX;
}

function mark(s, terms) {
  let r = s;
  terms.forEach((t) => {
    r = r.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
  });
  return r;
}

export default function Search() {
  const allReadings = useAllReadings();
  const INDEX = useMemo(() => (allReadings ? buildIndex(allReadings) : []), [allReadings]);
  const totalReadings = useMemo(() => {
    let n = 0;
    META.books.forEach((b) => { n += b.readings.length; });
    return n;
  }, []);
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!allReadings) return null;
    const query = q.trim().toLowerCase();
    if (query.length < 2) return null;
    const terms = query.split(/\s+/);
    const scored = [];
    INDEX.forEach((it) => {
      const hayT = it.term.toLowerCase();
      const hayD = (it.def + " " + it.extra).toLowerCase();
      let score = 0;
      const all = terms.every((t) => {
        if (hayT.indexOf(t) >= 0) { score += hayT.indexOf(t) === 0 ? 30 : 12; return true; }
        if (hayD.indexOf(t) >= 0) { score += 4; return true; }
        return false;
      });
      if (all) {
        if (it.kind === "concept") score += 8;
        if (it.kind === "chapter") score += 5;
        scored.push({ it, s: score });
      }
    });
    scored.sort((a, b) => b.s - a.s);
    return { terms, scored: scored.slice(0, 40) };
  }, [q, INDEX]);

  return (
    <main className="page">
      <h1>Search every concept</h1>
      <p className="lead">Definitions, formulas, traps, and where each idea is introduced and reused.</p>
      {allReadings == null ? (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      ) : (
        <>
          <input
            className="search-box"
            type="search"
            placeholder="Try: expected shortfall, wrong-way risk, LCR, Vasicek, RAROC…"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div style={{ fontSize: "0.82rem", color: "var(--text-faint)", marginTop: "0.5rem" }}>
            {INDEX.length} searchable items across {totalReadings} readings.
          </div>
          <div>
            {results == null ? null : results.scored.length === 0 ? (
              <p style={{ color: "var(--text-faint)" }}>No matches. Try a shorter fragment.</p>
            ) : (
              results.scored.map((x, i) => (
                <Link className="search-result" key={i} to={"/chapter/" + x.it.r}>
                  <div className="sr-where">{x.it.where} · {x.it.kind}</div>
                  <div className="sr-term" dangerouslySetInnerHTML={{ __html: mark(x.it.term, results.terms) }} />
                  <div className="sr-def" dangerouslySetInnerHTML={{ __html: mark(x.it.def.slice(0, 260), results.terms) }} />
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}
