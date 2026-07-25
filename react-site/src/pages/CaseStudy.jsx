import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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

/* Stable per-case anchor id. Derived from the book number rather than the bank
   name so renaming a case never breaks an inbound link. */
export const caseId = (bookNum) => "case-book" + bookNum;

export default function CaseStudy() {
  const rootRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.title = "Case study · real banks · FRM Part II";
  }, []);

  useEffect(() => {
    if (rootRef.current) initWidgets(rootRef.current);
  }, []);

  /* Arriving from a reading's "In the real world" card used to dump you at the
     top of a five-case page and leave you hunting. `?case=` scrolls to the one
     you asked for. The rAF waits for widgets and math to settle first, or the
     measured offset is taken against a layout that is about to change. */
  useEffect(() => {
    const want = new URLSearchParams(location.search).get("case");
    if (!want) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(want);
        if (!el) return;
        const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - (navH * 16 + 16);
        window.scrollTo({ top, behavior: "instant" });
      });
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [location.search]);

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
      <div style={{ margin: "0.4rem 0 0" }}><BeyondExamBadge /></div>

      {/* Jump list: five long cases on one page is a scroll hunt without it. */}
      <div className="case-index">
        {banks.map((b) => (
          <a key={b.book} className="chip" href={"#" + caseId(b.book)}
             onClick={(e) => {
               e.preventDefault();
               const el = document.getElementById(caseId(b.book));
               if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
             }}>
            Book {b.book} · {b.domain}
          </a>
        ))}
      </div>

      {banks.map((b) => {
        const book = bookOf(b.book === 5 ? 96 : b.book === 4 ? 63 : b.book === 3 ? 41 : b.book === 2 ? 26 : 1);
        const color = book ? book.color : "var(--accent)";
        return (
          <section
            key={b.book}
            id={caseId(b.book)}
            className="card case-card"
            style={{ borderLeft: "3px solid " + color }}
          >
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

                {b.links && b.links.length > 0 && (
                  <div style={{ marginTop: "0.9rem" }}>
                    <div className="section-label" style={{ color: "var(--text-faint)" }}>Read the primary record</div>
                    <div className="case-links">
                      {b.links.map((l) => (
                        <a key={l.url} className="case-link" href={l.url} target="_blank" rel="noopener noreferrer">
                          <span className="cl-title">{l.title} ↗</span>
                          {l.note && <span className="cl-note">{l.note}</span>}
                        </a>
                      ))}
                    </div>
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
