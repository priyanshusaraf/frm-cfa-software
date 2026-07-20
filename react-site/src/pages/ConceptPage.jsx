import { useEffect, useMemo } from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { findCoreConcept } from "../lib/coreConcepts.js";
import { readingMeta, rpath, bookOf } from "../lib/meta.js";
import { renderMath, isTex, fitMath } from "../lib/tex.js";
import Html from "../components/Html.jsx";

/* Phase 1+2 of the cross-reading core-concept system (CLAUDE.md §6). The base
   layer renders the home reading's own formula/concept entry (already-sourced
   Schweser content) — nothing here is invented. `formulas[].terms[]` (piecewise
   symbol breakdown) and `formulas[].deepDive` (explicitly-labeled beyond-exam-scope
   depth) are optional Phase-2 authored layers; both render only when present, so
   this page works for every core concept even before Phase 2 content lands. */
export default function ConceptPage() {
  const { slug } = useParams();
  const location = useLocation();
  const fromReading = location.state && location.state.fromReading;
  const readingsMap = useAllReadings();

  const concept = useMemo(() => findCoreConcept(readingsMap, slug), [readingsMap, slug]);

  useEffect(() => {
    if (concept) document.title = concept.name + " — Core Concept — FRM Part II";
  }, [concept]);

  useEffect(() => {
    if (concept) requestAnimationFrame(() => fitMath(document.body));
  }, [concept]);

  if (!readingsMap) {
    return (
      <main className="page">
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      </main>
    );
  }
  if (!concept) return <Navigate to="/concepts" replace />;

  const homeMeta = readingMeta(concept.homeReading);
  const homeBook = bookOf(concept.homeReading);
  const homeD = readingsMap[concept.homeReading];
  const formula = concept.kind === "formula" && homeD && homeD.formulas
    ? homeD.formulas.find((f) => f.name === concept.name)
    : null;
  const conceptEntry = concept.kind === "concept" && homeD && homeD.concepts
    ? homeD.concepts.find((c) => c.name === concept.name)
    : null;
  const otherRefs = concept.refs.filter((r) => r !== concept.homeReading);

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / <Link to="/concepts">Core Concepts</Link> / {concept.name}</div>

      {fromReading && (
        <Link to={rpath(fromReading)} className="text-dim hover:text-ink text-sm no-underline" style={{ display: "inline-block", marginBottom: "0.6rem" }}>
          ← Back to Reading {fromReading}
        </Link>
      )}

      <div className="kicker" style={{ color: homeBook ? homeBook.color : "var(--accent)" }}>
        Core concept · first defined in R{concept.homeReading}{homeMeta ? " · " + homeMeta.t : ""}
      </div>
      <h1>{concept.name}</h1>

      {formula && (
        <>
          <div className="formula-block">
            <div className="f-math">{renderMath(formula.math, true)}</div>
            {formula.plain && <p style={{ fontSize: "0.95rem", margin: "0.7rem 0 0" }}><Html as="span" html={formula.plain} /></p>}
            {formula.note && <p className="f-note"><Html as="span" html={formula.note} /></p>}
          </div>

          {formula.terms && formula.terms.length > 0 && (
            <>
              <div className="section-label" style={{ color: "var(--accent)" }}>Every symbol, explained</div>
              <div className="card">
                {formula.terms.map((t, i) => (
                  <div key={i} style={{ marginBottom: i === formula.terms.length - 1 ? 0 : "0.9rem", paddingBottom: i === formula.terms.length - 1 ? 0 : "0.9rem", borderBottom: i === formula.terms.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "0.95rem" }}>
                      {isTex(t.symbol) ? renderMath(t.symbol, false) : t.symbol}
                    </div>
                    <div style={{ fontSize: "0.9rem", margin: "0.25rem 0 0" }}><Html as="span" html={t.meaning} /></div>
                    {t.why && <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "0.25rem" }}><Html as="span" html={t.why} /></div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {formula.derivation && (
            <>
              <div className="section-label" style={{ color: "var(--accent)" }}>Show the math</div>
              <div className="card"><Html html={formula.derivation} /></div>
            </>
          )}

          {formula.deepDive && (
            <>
              <div className="section-label" style={{ color: "var(--purple)" }}>Extra depth — beyond the exam</div>
              <div className="card accent" style={{ borderColor: "var(--purple)" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--purple)", marginTop: 0 }}>
                  General finance background, not required for the FRM exam
                </p>
                <Html html={formula.deepDive} />
              </div>
            </>
          )}
        </>
      )}

      {conceptEntry && (
        <>
          <div className="card">
            <div className="concept-field def"><div><Html as="span" html={conceptEntry.def} /></div></div>
            {conceptEntry.intuition && (
              <div className="concept-field" style={{ marginTop: "0.7rem" }}>
                <div className="section-label" style={{ color: "var(--accent)", fontSize: "0.7rem" }}>Intuition</div>
                <div><Html as="span" html={conceptEntry.intuition} /></div>
              </div>
            )}
            {conceptEntry.example && (
              <div className="concept-field" style={{ marginTop: "0.7rem" }}>
                <div className="section-label" style={{ color: "var(--green)", fontSize: "0.7rem" }}>Example</div>
                <div><Html as="span" html={conceptEntry.example} /></div>
              </div>
            )}
            {conceptEntry.counter && (
              <div className="concept-field" style={{ marginTop: "0.7rem" }}>
                <div className="section-label" style={{ color: "var(--red)", fontSize: "0.7rem" }}>Where it breaks</div>
                <div><Html as="span" html={conceptEntry.counter} /></div>
              </div>
            )}
            {conceptEntry.pitfall && (
              <div className="concept-field" style={{ marginTop: "0.7rem" }}>
                <div className="section-label" style={{ color: "var(--amber)", fontSize: "0.7rem" }}>Exam pitfall</div>
                <div><Html as="span" html={conceptEntry.pitfall} /></div>
              </div>
            )}
          </div>
        </>
      )}

      {!formula && !conceptEntry && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          This concept's home reading is still loading its content.
        </div>
      )}

      <div className="section-label" style={{ color: "var(--text-faint)" }}>Also referenced in</div>
      <div className="card">
        {otherRefs.length === 0 ? (
          <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", margin: 0 }}>No other readings reuse this concept yet.</p>
        ) : (
          otherRefs.map((r) => {
            const m = readingMeta(r);
            return (
              <p key={r} style={{ margin: "0.3rem 0" }}>
                <Link to={rpath(r)}>R{r}{m ? " · " + m.t : ""}</Link>
              </p>
            );
          })
        )}
      </div>
    </main>
  );
}
