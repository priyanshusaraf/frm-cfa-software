import React, { useState } from "react";
import { Link } from "react-router-dom";
import FsaLayout from "./FsaLayout.jsx";
import Html from "../../../components/Html.jsx";
import { MODULES } from "../content/index.js";
import FormulaBox from "../components/FormulaBox.jsx";


/* One page to revise from the morning of the exam: every IFRS vs US GAAP
   difference, every formula, every trap, pulled from the modules. */
export default function FsaReference() {
  const [tab, setTab] = useState("gaap");
  const mods = MODULES.filter((m) => !m.pending);
  const tabs = [
    { id: "gaap", label: "IFRS vs US GAAP" },
    { id: "formulas", label: "Formulas" },
    { id: "traps", label: "Traps" },
  ];
  return (
    <FsaLayout>
      <div className="fsa-kicker">Cheat sheet</div>
      <h1>Everything to reread before the exam</h1>
      <p className="fsa-lead">Collected from every module, grouped by module. Each row links back to the module where it is explained properly.</p>
      <div className="fsa-tabs">
        {tabs.map((t) => (
          <button type="button" key={t.id} className={"chip" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {mods.map((m) => {
        const rows = tab === "gaap" ? m.gaap : tab === "formulas" ? m.formulas : m.traps;
        if (!rows || !rows.length) return null;
        return (
          <section key={m.id} style={{ marginTop: "1.6rem" }}>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem" }}>
              <Link to={"/cfa/fsa/" + m.id} style={{ color: "var(--text)" }}>LM {m.num} · {m.title}</Link>
            </h2>
            {tab === "gaap" && (
              <div className="fsa-table tablewrap">
                <table>
                  <thead><tr><th style={{ width: "22%" }}>Topic</th><th>IFRS</th><th>US GAAP</th></tr></thead>
                  <tbody>
                    {rows.map((g, i) => (
                      <tr key={i}><td><b><Html as="span" html={g.topic} /></b></td><td><Html as="span" html={g.ifrs} /></td><td><Html as="span" html={g.usgaap} /></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tab === "formulas" && (
              <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))" }}>
                {rows.map((f, i) => (
                  <FormulaBox key={i} name={f.name} tex={f.tex} plain={f.plain} />
                ))}
              </div>
            )}
            {tab === "traps" && (
              <div className="fsa-traps">
                {rows.map((t, i) => (
                  <div key={i} className="fsa-trap">
                    <div className="w"><b>Tempting</b><Html as="span" html={t.wrong} /></div>
                    <div className="r"><b>Actually</b><Html as="span" html={t.right} /></div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </FsaLayout>
  );
}
