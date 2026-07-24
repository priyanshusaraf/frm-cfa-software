import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { banks, BEYOND_EXAM } from "../data/caseStudy.js";
import { readingMeta, rpath, bookOf } from "../lib/meta.js";
import { initWidgets } from "../widgets/index.js";
import Html from "../components/Html.jsx";

function BeyondExamBadge() {
  return (
    <span className="chip" style={{ fontSize: "0.68rem", color: "var(--purple)", borderColor: "var(--purple)" }}>
      {BEYOND_EXAM}
    </span>
  );
}

export default function CaseStudy() {
  const rootRef = useRef(null);

  useEffect(() => {
    document.title = "Case study · real banks · FRM Part II";
  }, []);

  useEffect(() => {
    if (rootRef.current) initWidgets(rootRef.current);
  }, []);

  return (
    <main className="page wide" ref={rootRef}>
      <div className="crumbs"><Link to="/">Home</Link> / Case study</div>
      <div className="kicker" style={{ color: "var(--purple)" }}>Real banks, real failures</div>
      <h1>Case study</h1>
      <p className="lead">
        A running thread of real banks, each anchored on the risk domain the curriculum made it famous
        for. The exam mechanics still come from Schweser; a bank's real events and numbers are the
        illustration layer on top, and everything drawn from the real world rather than the source text
        is labeled so you never mistake it for something GARP will test.
      </p>
      <div style={{ margin: "0.4rem 0 1.2rem" }}><BeyondExamBadge /></div>

      {banks.map((b) => {
        const book = bookOf(b.book === 5 ? 96 : b.book === 4 ? 63 : b.book === 3 ? 41 : b.book === 2 ? 26 : 1);
        const color = book ? book.color : "var(--accent)";
        return (
          <section key={b.book} className="card" style={{ marginBottom: "0.9rem", borderLeft: "3px solid " + color }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
              <strong style={{ fontSize: "0.95rem" }}>
                Book {b.book} · {b.domain}: {b.bank}
              </strong>
              {b.status === "planned" && (
                <span className="chip" style={{ fontSize: "0.68rem", color: "var(--text-faint)" }}>narrative planned</span>
              )}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", margin: "0.4rem 0 0" }}>{b.why}</p>

            {b.status === "authored" && (
              <div style={{ marginTop: "0.8rem" }}>
                {(b.narrative || []).map((s, i) => (
                  <div key={i} style={{ marginBottom: "0.7rem" }}>
                    <div className="section-label" style={{ color: color }}>{s.label}</div>
                    <Html html={s.html} />
                  </div>
                ))}

                {b.statements && (
                  <div style={{ marginTop: "0.6rem" }}>
                    <div className="section-label" style={{ color: "var(--purple)" }}>
                      Financial-statement deep-dive <BeyondExamBadge />
                    </div>
                    <div
                      className="widget"
                      data-widget="annotated-table"
                      data-table={JSON.stringify({
                        title: b.statements.title,
                        cols: b.statements.cols,
                        rows: b.statements.rows,
                        corner: b.statements.corner,
                        unit: b.statements.unit,
                        shade: b.statements.shade,
                        caption: b.statements.note,
                      })}
                    />
                  </div>
                )}

                {b.hooks && b.hooks.length > 0 && (
                  <div style={{ marginTop: "0.8rem" }}>
                    <div className="section-label" style={{ color: "var(--text-faint)" }}>Where this shows up in your readings</div>
                    {b.hooks.map((h) => {
                      const m = readingMeta(h.rn);
                      return (
                        <p key={h.rn} style={{ fontSize: "0.86rem", margin: "0.3rem 0" }}>
                          <Link to={rpath(h.rn)}>R{h.rn}{m ? " · " + m.t : ""}</Link>
                          <span style={{ color: "var(--text-dim)" }}>: {h.oneLiner}</span>
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
