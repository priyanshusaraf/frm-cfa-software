import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Shuffle, Star, PlayCircle } from "lucide-react";
import FsaLayout, { useFsaState } from "./FsaLayout.jsx";
import Practice from "../components/Practice.jsx";
import { MODULES } from "../content/index.js";
import { allRounds } from "../progress.js";

/* The reconstruct arena: every practice round across the platform. A round
   key is scenarioId|columnId|step, URL-encoded into the path. */
export default function FsaPractice() {
  const { key } = useParams();
  const nav = useNavigate();
  const fsa = useFsaState();
  const pr = fsa.practice || {};
  const rounds = useMemo(() => allRounds(), []);
  const [filter, setFilter] = useState("all");

  const decoded = key ? decodeURIComponent(key) : null;
  const ri = decoded ? rounds.findIndex((r) => r.key === decoded) : -1;
  const round = ri >= 0 ? rounds[ri] : null;

  const go = (r) => nav("/cfa/fsa/practice/" + encodeURIComponent(r.key));
  const nextRound = () => {
    if (ri < 0) return;
    const after = rounds.slice(ri + 1).find((r) => r.scn.module === round.scn.module && !pr[r.key]) || rounds[ri + 1];
    if (after) go(after); else nav("/cfa/fsa/practice");
  };
  const random = (pool) => {
    const list = pool.filter((r) => !pr[r.key] || pr[r.key].stars < 3);
    const src = list.length ? list : pool;
    if (src.length) go(src[Math.floor(Math.random() * src.length)]);
  };

  if (round) {
    const mod = MODULES.find((m) => m.id === round.scn.module);
    return (
      <FsaLayout>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
          <Link to="/cfa/fsa/practice" className="fsa-link" style={{ marginLeft: 0 }}><ArrowLeft size={13} /> All rounds</Link>
          <span className="fsa-dim">LM {mod ? mod.num : ""} · round {ri + 1} of {rounds.length}</span>
        </div>
        <Practice key={round.key} scenario={round.scn} colId={round.colId} stepIdx={round.stepIdx} onNext={nextRound} />
        <p className="fsa-dim" style={{ marginTop: "1rem" }}>
          Stuck? <Link to={"/cfa/fsa/lab/" + round.scn.id}>Watch this scenario animate</Link> first, then come back.
        </p>
      </FsaLayout>
    );
  }

  const shown = filter === "all" ? rounds : rounds.filter((r) => r.scn.module === filter);
  const played = rounds.filter((r) => pr[r.key]).length;
  const stars = rounds.reduce((s, r) => s + ((pr[r.key] && pr[r.key].stars) || 0), 0);
  const byScn = [];
  shown.forEach((r) => {
    let g = byScn.find((x) => x.scn.id === r.scn.id);
    if (!g) { g = { scn: r.scn, rounds: [] }; byScn.push(g); }
    g.rounds.push(r);
  });

  return (
    <FsaLayout>
      <div className="fsa-kicker">Reconstruct the statements</div>
      <h1>Rebuild it yourself</h1>
      <p className="fsa-lead">
        You get the statements just before an event. Round 1: click every line it will hit. Round 2: type the new numbers, totals included; each cell turns green or red. Round 3: confirmation runs audit your numbers the way an accountant would before signing off.
      </p>
      <div className="fsa-card-foot" style={{ fontSize: "0.8rem", margin: "0.8rem 0 1rem" }}>
        <span>{rounds.length} rounds</span><span>{played} played</span><span>★ {stars} / {rounds.length * 3}</span>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => random(shown)} disabled={!shown.length}><Shuffle size={14} /> Random round{filter !== "all" ? " in this module" : ""}</button>
        {shown.find((r) => !pr[r.key]) && (
          <button type="button" className="fsa-btn" onClick={() => go(shown.find((r) => !pr[r.key]))}><PlayCircle size={14} /> Next unplayed</button>
        )}
      </div>
      <div className="fsa-tabs">
        <button type="button" className={"chip" + (filter === "all" ? " active" : "")} onClick={() => setFilter("all")}>All modules</button>
        {MODULES.map((m) => (
          <button type="button" key={m.id} className={"chip" + (filter === m.id ? " active" : "")} onClick={() => setFilter(m.id)}>LM {m.num}</button>
        ))}
      </div>
      {byScn.length === 0 && <p className="fsa-dim">No rounds here yet. Rounds appear automatically for every animated scenario a module adds.</p>}
      {byScn.map((g) => (
        <section key={g.scn.id} style={{ marginTop: "1.4rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>{g.scn.title} <span className="fsa-dim" style={{ fontWeight: 400 }}>· LM {String(g.scn.module).slice(2)}</span></h3>
          <div className="fsa-pr-list">
            {g.rounds.map((r) => {
              const st = pr[r.key];
              return (
                <button type="button" key={r.key} className="fsa-pr-item" onClick={() => go(r)}>
                  <span>
                    Step {r.stepIdx}: {r.title}
                    {g.scn.columns && g.scn.columns.length > 1 && <small>{r.colLabel}</small>}
                  </span>
                  <span className="fsa-stars">
                    {[1, 2, 3].map((i) => <Star key={i} className={st && i <= st.stars ? "on" : ""} fill={st && i <= st.stars ? "currentColor" : "none"} />)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </FsaLayout>
  );
}
