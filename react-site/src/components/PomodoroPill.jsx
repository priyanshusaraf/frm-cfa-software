import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import { usePomodoro, toggle, reset, formatClock, phaseLabel } from "../lib/pomodoro.js";

/* Persistent corner countdown. Renders NOTHING until a session has actually been
   started, so a student who never touches the Pomodoro never sees it. The
   `pomo-fab` class is the stable hook fullscreen mode hides it by (style.css),
   matching QuickNotes' `qn-fab`. */
export default function PomodoroPill() {
  const p = usePomodoro();
  if (!p.started) return null;

  const left = p.running ? Math.max(0, p.endsAt - Date.now()) : p.remaining;
  return (
    <div
      className="pomo-fab"
      data-phase={p.phase}
      data-running={p.running ? "1" : "0"}
      role="timer"
      aria-label={phaseLabel(p.phase) + ", " + formatClock(left) + " remaining"}
    >
      <span className="pomo-dot" aria-hidden="true" />
      <span className="pomo-clock">{formatClock(left)}</span>
      <button type="button" onClick={toggle} title={p.running ? "Pause" : "Resume"} aria-label={p.running ? "Pause" : "Resume"}>
        {p.running ? <Pause size={13} /> : <Play size={13} />}
      </button>
      <button type="button" onClick={reset} title="Stop and reset" aria-label="Stop and reset">
        <RotateCcw size={13} />
      </button>
      <Link className="pomo-link" to="/pomodoro" title="Open Pomodoro" aria-label="Open Pomodoro page">
        <Maximize2 size={13} />
      </Link>
    </div>
  );
}
