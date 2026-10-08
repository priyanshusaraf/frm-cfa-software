import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FsaLayout from "./FsaLayout.jsx";
import Theater from "../components/Theater.jsx";
import Html from "../../../components/Html.jsx";
import { MODULES } from "../content/index.js";
import { scenarioById, scenariosFor } from "../scenarios/index.js";

/* Every animated scenario on the platform in one place, grouped by module. */
export default function FsaLab() {
  const { sid } = useParams();
  const scn = sid ? scenarioById(sid) : null;

  if (scn) {
    const mod = MODULES.find((m) => m.id === scn.module);
    return (
      <FsaLayout moduleId={null}>
        <Link to="/cfa/fsa/lab" className="fsa-link" style={{ marginLeft: 0 }}><ArrowLeft size={13} /> All animations</Link>
        <div className="fsa-kicker" style={{ marginTop: "0.8rem" }}>LM {mod ? mod.num : ""} · {mod ? mod.title : ""}</div>
        <Theater scenario={scn} />
        <p className="fsa-dim">
          Read the full explanation in <Link to={"/cfa/fsa/" + scn.module}>LM {mod ? mod.num : ""}</Link>, or{" "}
          <Link to="/cfa/fsa/practice">rebuild these statements yourself</Link>.
        </p>
      </FsaLayout>
    );
  }

  return (
    <FsaLayout>
      <div className="fsa-kicker">Animation lab</div>
      <h1>Watch every treatment move</h1>
      <p className="fsa-lead">
        Each scenario is a demo company and a sequence of real journal entries. The statements are computed from the entries, never typed in, so what you see always balances. Use the arrow keys inside a scenario to step.
      </p>
      {MODULES.map((m) => {
        const list = scenariosFor(m.id);
        if (!list.length) return null;
        return (
          <section key={m.id} style={{ marginTop: "2rem" }}>
            <h2 style={{ margin: "0 0 0.4rem" }}>LM {m.num} · {m.title}</h2>
            <div className="fsa-cards">
              {list.map((s) => (
                <Link key={s.id} to={"/cfa/fsa/lab/" + s.id} className="fsa-card">
                  {s.standard && <div className="fsa-th-std">{s.standard}</div>}
                  <h3>{s.title}</h3>
                  {s.summary && <Html as="p" html={s.summary} />}
                  <div className="fsa-card-foot">
                    <span>{s.steps.length} steps</span>
                    <span>{s.columns && s.columns.length > 1 ? s.columns.length + " columns" : "1 company"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </FsaLayout>
  );
}
