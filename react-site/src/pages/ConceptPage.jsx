import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { findConcept } from "../lib/coreConcepts.js";
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
  const readingsMap = useAllReadings();

  const concept = useMemo(() => findConcept(readingsMap, slug), [readingsMap, slug]);
  const isRevision = concept && concept.layer === "revision";
  const layerLabel = isRevision ? "Revision" : "Core concept";
  const layerColor = isRevision ? "var(--purple)" : "var(--accent)";

  useEffect(() => {
    if (concept) document.title = concept.name + " — " + layerLabel + " — FRM Part II";
  }, [concept, layerLabel]);

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

  const hasHome = concept.homeReading != null;
  const homeMeta = hasHome ? readingMeta(concept.homeReading) : null;
  const homeBook = hasHome ? bookOf(concept.homeReading) : null;
  const homeD = hasHome ? readingsMap[concept.homeReading] : null;
  const formula = concept.kind === "formula" && homeD && homeD.formulas
    ? homeD.formulas.find((f) => f.name === concept.name)
    : null;
  const conceptEntry = concept.kind === "concept" && homeD && homeD.concepts
    ? homeD.concepts.find((c) => c.name === concept.name)
    : null;
  const otherRefs = (concept.refs || []).filter((r) => r !== concept.homeReading);
  const sections = concept.authored && Array.isArray(concept.sections) ? concept.sections : [];

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / <Link to="/concepts">Concepts</Link> / {concept.name}</div>

      <div className="kicker" style={{ color: layerColor }}>
        {layerLabel}
        {hasHome ? <> · {isRevision ? "assumed from" : "first defined in"} R{concept.homeReading}{homeMeta ? " · " + homeMeta.t : ""}</> : null}
      </div>
      <h1>{concept.name}</h1>
      {concept.lead && <p className="lead"><Html as="span" html={concept.lead} /></p>}

      {sections.length > 0 && (
        <>
          {isRevision && (
            <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--purple)", margin: "0.2rem 0 0.6rem" }}>
              Foundational refresher, re-taught from first principles
            </p>
          )}
          {sections.map((s, i) => (
            <div key={i}>
              {s.label && <div className="section-label" style={{ color: layerColor }}>{s.label}</div>}
              <div className="card"><Html html={s.html} /></div>
            </div>
          ))}
        </>
      )}

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

      {!formula && !conceptEntry && sections.length === 0 && hasHome && (
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
