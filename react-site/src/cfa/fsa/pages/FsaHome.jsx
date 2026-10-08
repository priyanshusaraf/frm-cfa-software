import React from "react";
import { Link } from "react-router-dom";
import { BookOpenText, Clapperboard, PencilRuler, ArrowRight, Flag } from "lucide-react";
import FsaLayout, { useFsaState } from "./FsaLayout.jsx";
import Theater from "../components/Theater.jsx";
import { MODULES } from "../content/index.js";
import { CURRICULUM } from "../content/curriculum.js";
import { scenarioById, SCENARIOS } from "../scenarios/index.js";
import { moduleProgress, allRounds } from "../progress.js";

export default function FsaHome() {
  const fsa = useFsaState();
  const demo = scenarioById("lm10-three-methods");
  const rounds = allRounds();
  const pr = fsa.practice || {};
  const starsTotal = rounds.reduce((s, r) => s + ((pr[r.key] && pr[r.key].stars) || 0), 0);
  const losTotal = CURRICULUM.modules.reduce((s, m) => s + m.los.length, 0);

  return (
    <FsaLayout>
      <div className="fsa-kicker">CFA Level II · Topic 3 · {CURRICULUM.weight} of the exam</div>
      <h1>Financial Statement Analysis</h1>
      <p className="fsa-lead">
        Every treatment in the Level II FSA curriculum, shown as it actually moves through the income statement, OCI, balance sheet and cash flow statement of a demo company.
        Read why the rule exists, watch the journal entries land, then rebuild the statements yourself until every cell turns green.
      </p>

      <div className="fsa-cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
        <div className="fsa-card" style={{ cursor: "default" }}>
          <BookOpenText size={18} style={{ color: "var(--accent)" }} />
          <h3>1. Understand the why</h3>
          <p>Each topic starts from a person who has to make a decision, and only then names the rule. IFRS and US GAAP differences are called out every time.</p>
        </div>
        <Link to="/cfa/fsa/lab" className="fsa-card">
          <Clapperboard size={18} style={{ color: "var(--cyan)" }} />
          <h3>2. Watch it move</h3>
          <p>{SCENARIOS.length} animated scenarios. Every journal line flies into the statement line it changes, then the totals settle and the integrity checks run.</p>
        </Link>
        <Link to="/cfa/fsa/practice" className="fsa-card">
          <PencilRuler size={18} style={{ color: "var(--green)" }} />
          <h3>3. Rebuild it yourself</h3>
          <p>{rounds.length} reconstruct rounds. Find the lines that move, type the new numbers, then the confirmation runs audit your own work. {starsTotal} of {rounds.length * 3} stars so far.</p>
        </Link>
      </div>

      <h2 style={{ marginTop: "2.2rem" }}>Try it now</h2>
      <p className="fsa-dim">The most tested comparison in the topic: one investee, three accounting methods. Press Play, or click Next and follow each chip.</p>
      {demo && <Theater scenario={demo} />}

      <h2 style={{ marginTop: "2.4rem" }}>Learning modules</h2>
      <div className="fsa-cards">
        {MODULES.map((m) => {
          const p = moduleProgress(m, fsa);
          return (
            <Link key={m.id} to={"/cfa/fsa/" + m.id} className="fsa-card">
              <div className="fsa-card-n">LM {m.num}</div>
              <h3>{m.title}</h3>
              <p>{m.pending ? "Being written. The LOS list is already in place." : m.tagline}</p>
              <div className="fsa-card-foot">
                <span>{m.los.length} LOS</span>
                <span>{p.secTotal} sections</span>
                <span>{p.rounds} rounds</span>
                <span>★ {p.stars}</span>
              </div>
              <div className="fsa-bar"><i style={{ width: Math.round(p.pct * 100) + "%" }} /></div>
            </Link>
          );
        })}
      </div>

      <div className="fsa-callout tone-flag" style={{ marginTop: "2rem" }}>
        <b><Flag size={12} /> Curriculum reconciliation status</b>
        <p>
          Scope is the {CURRICULUM.year} Level II FSA curriculum: {CURRICULUM.modules.length} learning modules and {losTotal} learning outcome statements. Your CFA books were not available in the cloud session, so the content has not yet been reconciled line by line against them.
          {" "}<Link to="/cfa/fsa/coverage">See the coverage map and the open flags <ArrowRight size={12} style={{ verticalAlign: "-1px" }} /></Link>
        </p>
      </div>
    </FsaLayout>
  );
}
