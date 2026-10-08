import React from "react";
import { Link } from "react-router-dom";
import FsaLayout from "./FsaLayout.jsx";
import Html from "../../../components/Html.jsx";
import { CURRICULUM } from "../content/curriculum.js";
import { MODULES, coverage } from "../content/index.js";
import { scenariosFor } from "../scenarios/index.js";

/* The reconciliation view the owner asked for: every 2026 LOS, where it is
   taught, and what still has to be checked against the books. */
export default function FsaCoverage() {
  const rows = MODULES.map((m) => {
    const cov = coverage(m);
    const flags = m.flags || [];
    return { m, cov, flags };
  });
  const total = rows.reduce((s, r) => s + r.cov.length, 0);
  const covered = rows.reduce((s, r) => s + r.cov.filter((l) => l.sections.length).length, 0);
  const flagged = rows.reduce((s, r) => s + r.flags.length, 0);

  return (
    <FsaLayout>
      <div className="fsa-kicker">Curriculum coverage</div>
      <h1>Every 2026 LOS, and where it is taught</h1>
      <p className="fsa-lead">
        The platform's scope is the {CURRICULUM.year} CFA Level II {CURRICULUM.topic} curriculum and nothing more. This page maps each learning outcome statement to the sections that teach it, and lists everything that still needs checking against your books.
      </p>
      <div className="fsa-card-foot" style={{ fontSize: "0.82rem", margin: "0.8rem 0 1.4rem" }}>
        <span>{CURRICULUM.modules.length} modules</span>
        <span>{covered} / {total} LOS taught</span>
        <span>{flagged} open flags</span>
      </div>

      <div className="fsa-callout tone-flag">
        <b>Source status</b>
        <p>
          <b>LOS: verified.</b> Every learning outcome statement and its letter comes from CFA Institute's official {CURRICULUM.year} Level II topic outline. This check found that LM 11 had been rewritten for the current curriculum (forecasting share-based compensation, and modeling and valuing post-employment benefits); the module is being rebuilt to match.
        </p>
        <p>
          <b>Content: not yet checked line by line against your books.</b> It was written from the LOS, from IFRS and US GAAP as the curriculum teaches them, and checked against CFA Institute's public 2026 reading summaries where they exist. The open flags below are the points to check first. To finish the job, commit your books (PDF or Markdown) under <code>cfa-l2/</code> and ask for a reconciliation pass.
        </p>
      </div>

      <div className="fsa-callout tone-insight" style={{ marginTop: "1rem" }}>
        <b>Deliberately not built</b>
        <p>Topics some prep books still print near this material but that are not Level II FSA LOS in {CURRICULUM.year}, such as leases, income taxes, inventories and long-lived assets in their own right (Level I topics), are left out on purpose. They appear here only where a Level II LOS uses them, for example the lease and LIFO adjustments inside LM 15.</p>
      </div>

      {rows.map(({ m, cov, flags }) => (
        <section key={m.id} style={{ marginTop: "2rem" }}>
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem" }}>
            <Link to={"/cfa/fsa/" + m.id} style={{ color: "var(--text)" }}>LM {m.num} · {m.title}</Link>
            <span className="fsa-dim" style={{ fontWeight: 400, fontSize: "0.82rem", marginLeft: "0.6rem" }}>{scenariosFor(m.id).length} animations</span>
          </h2>
          <div className="fsa-table tablewrap fsa-cov">
            <table>
              <thead><tr><th style={{ width: "3.5rem" }}>LOS</th><th>Statement</th><th style={{ width: "28%" }}>Taught in</th><th style={{ width: "6rem" }}>Status</th></tr></thead>
              <tbody>
                {cov.map((l) => {
                  const lf = flags.filter((f) => f.los === l.id);
                  const st = !l.sections.length ? "gap" : lf.length ? "flag" : "ok";
                  return (
                    <tr key={l.id}>
                      <td style={{ fontFamily: "var(--mono)" }}>{m.num}{l.id}</td>
                      <td>{l.text}{lf.map((f, i) => <Html key={i} className="fsa-table-note" html={"Flag: " + f.note} />)}</td>
                      <td>{l.sections.length ? l.sections.map((s) => <div key={s.id}>{s.title}</div>) : <span className="fsa-dim">{m.pending ? "module in progress" : "nothing yet"}</span>}</td>
                      <td><span className={"fsa-status " + st}>{st === "ok" ? "covered" : st === "flag" ? "check book" : "gap"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </FsaLayout>
  );
}
