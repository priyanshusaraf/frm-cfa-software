import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DRILLS, makeQuestion } from "../lib/drills.js";
import { rpath, readingMeta } from "../lib/meta.js";
import Html from "../components/Html.jsx";
import Button from "../components/ui/button.jsx";

const LETTERS = ["A", "B", "C", "D"];

export default function Drills() {
  const [drillId, setDrillId] = useState("mixed");
  const [seed, setSeed] = useState(() => (Date.now() ^ (Math.random() * 1e9)) >>> 0);
  const [picked, setPicked] = useState(null);
  const [streak, setStreak] = useState(0);
  const [tally, setTally] = useState({ right: 0, total: 0 });

  const inst = useMemo(() => makeQuestion(drillId, seed), [drillId, seed]);
  const meta = readingMeta(inst.drill.rn);

  function choose(oi) {
    if (picked != null) return;
    setPicked(oi);
    const ok = oi === inst.answer;
    setStreak((s) => (ok ? s + 1 : 0));
    setTally((t) => ({ right: t.right + (ok ? 1 : 0), total: t.total + 1 }));
  }

  function next() {
    setPicked(null);
    setSeed((s) => (s * 1664525 + 1013904223) >>> 0);
  }

  function switchDrill(id) {
    setDrillId(id);
    setPicked(null);
    setSeed((s) => (s * 22695477 + 1) >>> 0);
  }

  return (
    <main className="page">
      <h1>Calculation drills</h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: "0.25rem 0 1rem" }}>
        The exam's bread-and-butter calculations with <strong>fresh random numbers every time</strong>.
        Distractors are the classic wrong calculations, so guessing the shape of the mistake won't save
        you — do the arithmetic. Calculator recommended, just like exam day.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
        <button className={"chip" + (drillId === "mixed" ? " active" : "")} onClick={() => switchDrill("mixed")}>
          🎲 Mixed
        </button>
        {DRILLS.map((d) => (
          <button
            key={d.id}
            className={"chip" + (drillId === d.id ? " active" : "")}
            onClick={() => switchDrill(d.id)}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "baseline", marginBottom: "0.5rem" }}>
          <strong style={{ fontSize: "0.9rem" }}>{inst.drill.title}</strong>
          <Link to={rpath(inst.drill.rn)} style={{ fontSize: "0.78rem", whiteSpace: "nowrap" }}>
            R{inst.drill.rn}{meta ? " · " + meta.t : ""} →
          </Link>
        </div>
        <Html html={inst.q} style={{ fontSize: "0.95rem" }} />
        <div style={{ display: "grid", gap: "0.4rem", marginTop: "0.75rem" }}>
          {inst.options.map((opt, oi) => {
            let border = "var(--border)";
            let bg = "transparent";
            if (picked != null) {
              if (oi === inst.answer) { border = "var(--green)"; bg = "var(--green-soft, rgba(60,180,110,0.12))"; }
              else if (oi === picked) { border = "var(--red)"; bg = "var(--red-soft, rgba(220,80,80,0.12))"; }
            }
            return (
              <button
                key={oi}
                type="button"
                disabled={picked != null}
                onClick={() => choose(oi)}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "baseline",
                  textAlign: "left",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid " + border,
                  background: bg,
                  color: picked != null && oi !== inst.answer && oi !== picked ? "var(--text-faint)" : "var(--text)",
                  font: "inherit",
                  fontSize: "0.9rem",
                  cursor: picked == null ? "pointer" : "default",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem", color: "var(--text-faint)" }}>
                  {LETTERS[oi]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {picked != null && (
          <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", fontSize: "0.88rem", color: "var(--text-dim)" }}>
            {inst.why}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Button onClick={next}>{picked == null ? "Skip → new numbers" : "Next question"}</Button>
        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "var(--font-mono, monospace)" }}>
          streak {streak}
          {tally.total > 0 && <> · {tally.right}/{tally.total} this session</>}
        </span>
      </div>
    </main>
  );
}
