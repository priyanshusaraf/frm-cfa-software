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
        <b>Source status: not yet reconciled against your books</b>
        <p>Your CFA books are in your local Downloads folder, which the cloud session cannot reach. The module list is confirmed from several 2026 sources; the LOS wording was reconstructed from third-party listings and the long-standing Level II wording, so <b>LOS letters are this platform's ordering</b> and may differ from CFA Institute's. Content was written from the curriculum's LOS and from IFRS and US GAAP as the curriculum teaches them.</p>
        <p>To reconcile: commit the books (PDF or Markdown) to the repository, for example under <code>cfa-l2/</code>, and ask for a reconciliation pass. Each module's flags below are the first things to check.</p>
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
