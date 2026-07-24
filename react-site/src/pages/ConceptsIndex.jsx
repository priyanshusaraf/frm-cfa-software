import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { listConcepts } from "../lib/coreConcepts.js";
import { readingMeta } from "../lib/meta.js";

/* Phase 1 of the cross-reading core-concept system (CLAUDE.md §6): an index of
   every auto-detected core concept (a formula/concept name reused across 2+
   readings), most-referenced first. */
export default function ConceptsIndex() {
  useEffect(() => { document.title = "Core Concepts — FRM Part II"; }, []);
  const readingsMap = useAllReadings();
  const [q, setQ] = useState("");

  const concepts = useMemo(() => listConcepts(readingsMap), [readingsMap]);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return concepts;
    return concepts.filter((c) => c.name.toLowerCase().includes(query));
  }, [concepts, q]);

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / Core Concepts</div>
      <h1>Core Concepts</h1>
      <p className="lead">
        Models and formulas that resurface across multiple readings, gathered into one
        deeper explanation each instead of getting re-explained thin every time they come up.
      </p>

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search core concepts…"
        className="bg-inset border border-line rounded-el px-2.5 py-1.5 text-sm text-ink w-full sm:w-80"
        style={{ margin: "1rem 0" }}
      />

      {!readingsMap ? (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          {concepts.length === 0
            ? "No cross-reading concepts detected yet."
            : "No core concepts match that search."}
        </div>
      ) : (
        <div className="grid2">
          {filtered.map((c) => {
            const home = c.homeReading != null ? readingMeta(c.homeReading) : null;
            const isRevision = c.layer === "revision";
            return (
              <Link key={c.slug} to={`/concept/${c.slug}`} className="card" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0 }}>{c.name}</h3>
                  <span className="chip" style={{ fontSize: "0.68rem", color: isRevision ? "var(--purple)" : "var(--accent)", borderColor: isRevision ? "var(--purple)" : "var(--accent)" }}>
                    {isRevision ? "revision" : "core"}
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", margin: "0.4rem 0 0" }}>
                  {c.homeReading != null
                    ? <>{isRevision ? "Assumed from" : "First defined in"} R{c.homeReading}{home ? " · " + home.t : ""}{c.refs.length ? " · referenced in " + c.refs.length + " readings" : ""}</>
                    : "Foundational prerequisite, re-taught from first principles"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
