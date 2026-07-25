import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { useStore, setPomodoroPrefs, POMODORO_DEFAULTS } from "../lib/store.js";
import {
  usePomodoro, toggle, skip, reset, start,
  formatClock, phaseLabel, phaseMinutes, FOCUS,
} from "../lib/pomodoro.js";

/* Durations the student can pick without a free-form field: the two ends of each
   row are the same limits store.js clamps to, so the UI can never offer a value
   the store would reject. */
const LENGTHS = {
  focus: { label: "Focus block", opts: [15, 20, 25, 30, 45, 50, 60, 90] },
  brk: { label: "Short break", opts: [3, 5, 10, 15] },
  longBrk: { label: "Long break", opts: [10, 15, 20, 30] },
  cycles: { label: "Blocks before a long break", opts: [2, 3, 4, 5, 6] },
};

export default function Pomodoro() {
  useEffect(() => { document.title = "Pomodoro — FRM Part II"; }, []);
  const cfg = useStore((s) => (s.prefs && s.prefs.pomodoro) || null);
  const c = { ...POMODORO_DEFAULTS, ...(cfg || {}) };
  const completed = (cfg && cfg.completed) || 0;
  const p = usePomodoro();

  const left = p.started
    ? (p.running ? Math.max(0, p.endsAt - Date.now()) : p.remaining)
    : phaseMinutes(FOCUS, c) * 60000;

  return (
    <main className="page">
      <div className="crumbs">
        <Link to="/">Home</Link> / Pomodoro
      </div>
      <h1>Pomodoro</h1>
      <p className="lead">
        Study in timed blocks with real breaks between them. The clock keeps running while you
        read: a small countdown follows you around the app once you start.
      </p>

      <section style={{ marginTop: "1.5rem" }}>
        <div className="card accent">
          <div className="pomo-dial">
            <span className="pomo-phase">{p.started ? phaseLabel(p.phase) : "Ready"}</span>
            <span className="pomo-time">{formatClock(left)}</span>
            <div className="pomo-controls">
              <button className={"chip" + (p.running ? "" : " active")} onClick={() => (p.started ? toggle() : start(FOCUS))}>
                {p.running ? <Pause size={12} style={{ verticalAlign: "-1px" }} /> : <Play size={12} style={{ verticalAlign: "-1px" }} />}
                {" "}{p.running ? "Pause" : p.started ? "Resume" : "Start focus block"}
              </button>
              {p.started && (
                <button className="chip" onClick={skip}>
                  <SkipForward size={12} style={{ verticalAlign: "-1px" }} /> Skip
                </button>
              )}
              {p.started && (
                <button className="chip" onClick={reset}>
                  <RotateCcw size={12} style={{ verticalAlign: "-1px" }} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "1.75rem" }}>
        <div className="section-label" style={{ color: "var(--accent)" }}>Lengths</div>
        <div className="card">
          <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", marginTop: 0 }}>
            Changes apply to the next block, not the one already running.
          </p>
          {Object.keys(LENGTHS).map((k) => (
            <div key={k} style={{ marginBottom: "0.9rem" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", marginBottom: "0.35rem" }}>
                {LENGTHS[k].label}
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {LENGTHS[k].opts.map((v) => (
                  <button
                    key={v}
                    className={"chip" + (c[k] === v ? " active" : "")}
                    aria-pressed={c[k] === v}
                    onClick={() => setPomodoroPrefs({ [k]: v })}
                  >
                    {k === "cycles" ? v : v + " min"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "1.75rem" }}>
        <div className="section-label" style={{ color: "var(--green)" }}>Focus blocks completed</div>
        <div className="card">
          <div className="stat-row">
            <div className="stat">
              <div className="n font-mono">{completed}</div>
              <div className="l">all time</div>
            </div>
            <div className="stat">
              <div className="n font-mono">{p.cycle}</div>
              <div className="l">this session</div>
            </div>
          </div>
          <p style={{ fontSize: "0.84rem", color: "var(--text-faint)", marginBottom: 0 }}>
            Skipped blocks are not counted. Only a block you actually sat through earns a tick.
          </p>
        </div>
      </section>
    </main>
  );
}
