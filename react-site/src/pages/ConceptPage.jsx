import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { findConcept } from "../lib/coreConcepts.js";
import { readingMeta, rpath, bookOf } from "../lib/meta.js";
import { renderMath, isTex, fitMath } from "../lib/tex.js";
import Html from "../components/Html.jsx";
import SectionLabel from "../components/chapter/SectionLabel.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";

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
    if (concept) document.title = (concept.display || concept.name) + " — " + layerLabel + " — FRM Part II";
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
      <div className="crumbs"><Link to="/">Home</Link> / <Link to="/concepts">Concepts</Link> / {concept.display || concept.name}</div>

      <div className="kicker" style={{ color: layerColor }}>
        {layerLabel}
        {hasHome ? <> · {isRevision ? "assumed from" : "first defined in"} R{concept.homeReading}{homeMeta ? " · " + homeMeta.t : ""}</> : null}
      </div>
      <h1>{concept.display || concept.name}</h1>
      {concept.lead && <p className="lead"><Html as="span" html={concept.lead} /></p>}

      {sections.length > 0 && (
        <>
          {isRevision && (
            <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--purple)", margin: "0.2rem 0 0.6rem" }}>
              Foundational refresher, re-taught from first principles
            </p>
          )}
          {/* .prose in the column, not a stack of cards: this is the same body
              treatment Chapter.jsx gives teaches/why/intuition. */}
          {sections.map((s, i) => (
            <div key={i}>
              {s.label && <SectionLabel txt={s.label} color={layerColor} />}
              <div className="prose"><Html html={s.html} /></div>
            </div>
          ))}
        </>
      )}

      {formula && (
        <>
          {/* Chapter.jsx's formula box, minus the .f-name kicker: `formula` is
              looked up BY the concept's name, so that kicker is always a verbatim
              duplicate of the <h1> right above it. It earns its place in a reading,
              where one box holds several named formulas; here the formula is the
              page. renderMath returns an HTML STRING: as a React child it prints as
              escaped markup. The f-tex class is what fitMath() queries to shrink
              over-wide formulas. */}
          <div className="formula-block">
            <div
              className={"f-math" + (isTex(formula.math) ? " f-tex" : "")}
              dangerouslySetInnerHTML={{ __html: renderMath(formula.math, true) }}
            />
            {formula.plain && <p style={{ fontStyle: "italic", fontSize: "0.86rem", margin: "0.4rem 0 0" }}><Html as="span" html={formula.plain} /></p>}
            {formula.note && <div className="f-note"><Html as="span" html={formula.note} /></div>}
            {formula.derivation && (
              <Accordion type="single" collapsible style={{ marginTop: "0.5rem" }}>
                <AccordionItem value="derivation">
                  <AccordionTrigger>Show the math</AccordionTrigger>
                  <AccordionContent>
                    <Html html={formula.derivation} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          {formula.terms && formula.terms.length > 0 && (
            <>
              <SectionLabel txt="Every symbol, explained" color="var(--cyan)" />
              <dl className="term-list">
                {formula.terms.map((t, i) => (
                  <div key={i}>
                    <dt>
                      {isTex(t.symbol)
                        ? <span dangerouslySetInnerHTML={{ __html: renderMath(t.symbol, false) }} />
                        : t.symbol}
                    </dt>
                    <dd>
                      <Html as="span" html={t.meaning} />
                      {t.why && <div className="term-why"><Html as="span" html={t.why} /></div>}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {formula.deepDive && (
            <>
              {/* no em-dash: the owner treats them as the product's clearest "AI wrote this" tell */}
              <SectionLabel txt="Extra depth: beyond the exam" color="var(--purple)" />
              <div className="card accent" style={{ borderColor: "var(--purple)" }}>
                {/* normal case, not a second uppercase kicker: the SectionLabel above
                    already announces this section, and two stacked all-caps labels
                    saying the same thing is what makes a page look generated. The
                    sentence stays because §6 requires beyond-exam depth to be
                    unmistakably marked. */}
                <p style={{ fontSize: "0.84rem", color: "var(--text-dim)", marginTop: 0, marginBottom: "0.8rem" }}>
                  General finance background, not required for the FRM exam.
                </p>
                <Html html={formula.deepDive} />
              </div>
            </>
          )}
        </>
      )}

      {/* The real field vocabulary from ConceptCard (tag pill + body), not
          .section-label shrunk with an inline font-size — that class owns a
          coloured dot and section-start semantics and was never meant to label a
          field. Same tags and colours a reading shows, so the two read alike. */}
      {conceptEntry && (
        <>
          <div className="concept-field def">
            <span className="field-tag def">Definition</span>
            <div><Html as="span" html={conceptEntry.def} /></div>
          </div>
          {conceptEntry.intuition && (
            <div className="concept-field">
              <span className="field-tag int">Intuition</span>
              <div><Html as="span" html={conceptEntry.intuition} /></div>
            </div>
          )}
          {conceptEntry.example && (
            <div className="concept-field">
              <span className="field-tag ex">Example</span>
              <div><Html as="span" html={conceptEntry.example} /></div>
            </div>
          )}
          {conceptEntry.counter && (
            <div className="concept-field">
              <span className="field-tag cex">Counterexample</span>
              <div><Html as="span" html={conceptEntry.counter} /></div>
            </div>
          )}
          {conceptEntry.pitfall && (
            <div className="concept-field">
              <span className="field-tag pit">Pitfall</span>
              <div><Html as="span" html={conceptEntry.pitfall} /></div>
            </div>
          )}
        </>
      )}

      {!formula && !conceptEntry && sections.length === 0 && hasHome && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          This concept's home reading is still loading its content.
        </div>
      )}

      {/* A list of links, not a card: wrapping one or two links in a full card is
          most of a box for none of the content. Chips are the app's existing
          affordance for a row of navigable references (concepts[].related). */}
      <SectionLabel txt="Also referenced in" color="var(--text-faint)" />
      {otherRefs.length === 0 ? (
        <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", margin: "0.2rem 0 0" }}>
          No other readings reuse this concept yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0.2rem 0 0" }}>
          {otherRefs.map((r) => {
            const m = readingMeta(r);
            return (
              <Link key={r} className="chip" to={rpath(r)}>R{r}{m ? " · " + m.t : ""}</Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
