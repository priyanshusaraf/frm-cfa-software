import React, { useEffect, useMemo, useState } from "react";
import { Flag, Timer, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import FsaLayout, { useFsaState } from "./FsaLayout.jsx";
import Html from "../../../components/Html.jsx";
import { MODULES } from "../content/index.js";
import { recordFsaMock } from "../../../lib/store.js";

/* Timed mock in the Level II format: item sets (a vignette plus questions with
   three options), one set on screen at a time, vignette beside the questions.
   Pace defaults to the real exam's: 44 questions in 132 minutes, so 3 minutes
   per question. The timer is session-only on purpose (a persisted deadline
   would reload into an exam that expired hours ago). */

const PER_Q_SECONDS = 180;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtClock(s) {
  const m = Math.floor(Math.max(0, s) / 60), r = Math.max(0, s) % 60;
  return m + ":" + String(r).padStart(2, "0");
}

export default function FsaMock() {
  const fsa = useFsaState();
  const pool = useMemo(
    () => MODULES.flatMap((m) => (m.itemSets || []).map((set) => ({ ...set, moduleId: m.id, moduleNum: m.num, moduleTitle: m.title }))),
    []
  );
  const [mods, setMods] = useState(() => new Set(MODULES.map((m) => m.id)));
  const [count, setCount] = useState(4);
  const [phase, setPhase] = useState("setup");
  const [sets, setSets] = useState([]);
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [left, setLeft] = useState(0);
  const [startTs, setStartTs] = useState(0);

  const available = pool.filter((s) => mods.has(s.moduleId));
  const nQ = sets.reduce((s, x) => s + x.questions.length, 0);

  useEffect(() => {
    if (phase !== "exam") return;
    const t = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => { if (phase === "exam" && left <= 0) finish(); }, [left, phase]); // eslint-disable-line

  const start = () => {
    const chosen = shuffle(available).slice(0, Math.min(count, available.length));
    setSets(chosen);
    setCur(0);
    setAnswers({});
    setFlags({});
    setLeft(chosen.reduce((s, x) => s + x.questions.length, 0) * PER_Q_SECONDS);
    setStartTs(Date.now());
    setPhase("exam");
    window.scrollTo(0, 0);
  };

  const key = (si, qi) => si + ":" + qi;
  const finish = () => {
    let correct = 0;
    const perModule = {};
    sets.forEach((set, si) => set.questions.forEach((q, qi) => {
      const ok = answers[key(si, qi)] === q.answer;
      if (ok) correct++;
      const pm = perModule[set.moduleId] || [0, 0];
      perModule[set.moduleId] = [pm[0] + (ok ? 1 : 0), pm[1] + 1];
    }));
    recordFsaMock({ ts: Date.now(), total: nQ, correct, minutes: Math.round((Date.now() - startTs) / 60000), perModule });
    setPhase("review");
    window.scrollTo(0, 0);
  };

  const history = fsa.mocks || [];

  if (phase === "setup") {
    return (
      <FsaLayout>
        <div className="fsa-kicker">Mock exam</div>
        <h1>Timed item sets, exam conditions</h1>
        <p className="fsa-lead">
          Level II is item sets: a vignette, then questions with three options. This mock draws sets at random from the modules you pick and gives you three minutes per question, the real exam's pace. Answers are hidden until you submit.
        </p>
        <div className="fsa-formula-n" style={{ marginTop: "1.4rem" }}>Modules</div>
        <div className="fsa-tabs">
          {MODULES.map((m) => {
            const n = (m.itemSets || []).length;
            const on = mods.has(m.id);
            return (
              <button type="button" key={m.id} className={"chip" + (on ? " active" : "")} disabled={!n} onClick={() => setMods((p) => { const s = new Set(p); if (s.has(m.id)) s.delete(m.id); else s.add(m.id); return s; })}>
                LM {m.num} · {n} set{n === 1 ? "" : "s"}
              </button>
            );
          })}
        </div>
        <div className="fsa-formula-n" style={{ marginTop: "1rem" }}>Number of item sets</div>
        <div className="fsa-tabs">
          {[2, 4, 6, available.length].filter((v, i, a) => v > 0 && a.indexOf(v) === i).map((n) => (
            <button type="button" key={n} className={"chip" + (count === n ? " active" : "")} onClick={() => setCount(n)}>
              {n === available.length ? "All " + n : n}
            </button>
          ))}
        </div>
        <p className="fsa-dim">
          {Math.min(count, available.length)} sets, about {Math.min(count, available.length) * 4} questions, {Math.round(Math.min(count, available.length) * 4 * PER_Q_SECONDS / 60)} minutes.
        </p>
        <button type="button" className="fsa-btn fsa-btn-primary" onClick={start} disabled={!available.length}><Timer size={15} /> Start the mock</button>

        {history.length > 0 && (
          <section style={{ marginTop: "2.4rem" }}>
            <h2 style={{ fontSize: "1.15rem" }}>Your mocks</h2>
            <div className="fsa-table tablewrap">
              <table>
                <thead><tr><th>Date</th><th>Score</th><th>Minutes</th><th>By module</th></tr></thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td>{new Date(h.ts).toLocaleDateString()}</td>
                      <td><b>{Math.round((h.correct / Math.max(1, h.total)) * 100)}%</b> <span className="fsa-dim">({h.correct}/{h.total})</span></td>
                      <td>{h.minutes}</td>
                      <td className="fsa-dim">{Object.entries(h.perModule || {}).map(([m, v]) => m.toUpperCase() + " " + v[0] + "/" + v[1]).join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </FsaLayout>
    );
  }

  const set = sets[cur];
  const review = phase === "review";
  let score = 0;
  if (review) sets.forEach((s, si) => s.questions.forEach((q, qi) => { if (answers[key(si, qi)] === q.answer) score++; }));
  const answered = Object.keys(answers).length;

  return (
    <FsaLayout>
      <div className="fsa-mock-bar">
        <div>
          <div className="fsa-kicker">{review ? "Mock review" : "Mock exam"} · set {cur + 1} of {sets.length}</div>
          <b>{set.title}</b> <span className="fsa-dim">· LM {set.moduleNum}</span>
        </div>
        <div className="fsa-mock-nav">
          {sets.map((s, si) => (
            <div key={si} className="fsa-mock-set">
              {s.questions.map((q, qi) => {
                const a = answers[key(si, qi)];
                const cls = review ? (a === q.answer ? " ok" : " bad") : a != null ? " done" : "";
                return (
                  <button type="button" key={qi} className={"fsa-mock-q" + cls + (si === cur ? " cur" : "") + (flags[key(si, qi)] ? " flag" : "")} onClick={() => setCur(si)} title={"Set " + (si + 1) + ", question " + (qi + 1)}>
                    {qi + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {review ? (
          <div className="fsa-mock-score"><b>{score} / {nQ}</b><span>{Math.round((score / Math.max(1, nQ)) * 100)}%</span></div>
        ) : (
          <div className={"fsa-mock-clock" + (left < 300 ? " low" : "")}><Timer size={15} /> {fmtClock(left)}</div>
        )}
      </div>

      <div className="fsa-mock-body">
        <Html className="fsa-vignette fsa-mock-vig" html={set.vignette} />
        <div>
          {set.questions.map((q, qi) => {
            const k = key(cur, qi);
            const a = answers[k];
            return (
              <div key={qi} className="fsa-is-q" style={{ marginTop: qi ? "1.2rem" : 0 }}>
                <div className="fsa-is-qn" style={{ display: "flex", justifyContent: "space-between" }}>
                  Question {qi + 1}
                  {!review && (
                    <button type="button" className={"fsa-link" + (flags[k] ? " is-flag" : "")} onClick={() => setFlags((p) => ({ ...p, [k]: !p[k] }))}>
                      <Flag size={12} /> {flags[k] ? "Flagged" : "Flag for review"}
                    </button>
                  )}
                </div>
                <Html className="fsa-cq-q" html={q.q} />
                <div className="fsa-cq-opts">
                  {q.options.map((o, j) => {
                    const st = review ? (j === q.answer ? " ok" : a === j ? " bad" : " dim") : a === j ? " is-picked" : "";
                    return (
                      <button type="button" key={j} className={"fsa-cq-opt" + st} disabled={review} onClick={() => setAnswers((p) => ({ ...p, [k]: j }))}>
                        <span className="fsa-cq-letter">{"ABC"[j]}</span>
                        <Html as="span" html={o} />
                      </button>
                    );
                  })}
                </div>
                {review && (
                  <div className={"fsa-cq-why " + (a === q.answer ? "ok" : "bad")}>
                    {a === q.answer ? <CheckCircle2 size={13} /> : <XCircle size={13} />} <Html as="span" html={q.why} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fsa-pr-bar" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.9rem" }}>
        <button type="button" className="fsa-btn" onClick={() => setCur((c) => Math.max(0, c - 1))} disabled={cur === 0}><ChevronLeft size={15} /> Previous set</button>
        {cur < sets.length - 1 && <button type="button" className="fsa-btn" onClick={() => { setCur((c) => c + 1); window.scrollTo(0, 0); }}>Next set <ChevronRight size={15} /></button>}
        {!review && <span className="fsa-dim">{answered} of {nQ} answered</span>}
        {!review && <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => { if (answered === nQ || window.confirm((nQ - answered) + " questions are unanswered. Submit anyway?")) finish(); }}>Submit the mock</button>}
        {review && <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => setPhase("setup")}><RotateCcw size={14} /> New mock</button>}
      </div>
    </FsaLayout>
  );
}
