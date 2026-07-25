import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useStore, setFontScale, setHydrationReminder, setReminderMinutes,
  REMINDER_MIN, REMINDER_MAX, REMINDER_DEFAULT,
} from "../lib/store.js";
import { pickNudge } from "../lib/nudges.js";
import { showNudge } from "../components/StudyNudge.jsx";

/* Layout designed to accommodate more controls later (font family, background) —
   each preference gets its own labeled section, not a one-off single field. */
const TEXT_SIZES = [
  { v: 0.9, label: "Small" },
  { v: 1, label: "Default" },
  { v: 1.15, label: "Large" },
  { v: 1.3, label: "Extra large" },
];

const INTERVALS = [20, 30, 45, 60, 90];

export default function Settings() {
  useEffect(() => { document.title = "Settings — FRM Part II"; }, []);
  const fontScale = useStore((s) => (s.layout && s.layout.fontScale) || 1);
  const hydrationOn = useStore((s) => (s.prefs ? s.prefs.hydrationReminder !== false : true));
  const reminderMins = useStore((s) => (s.prefs && s.prefs.reminderMinutes) || REMINDER_DEFAULT);
  // Local draft so the field doesn't fight you mid-typing: the store only sees a
  // committed value (blur or Enter), where it gets clamped.
  const [draft, setDraft] = useState("");
  const custom = !INTERVALS.includes(reminderMins);

  function commitDraft() {
    if (draft.trim() !== "") setReminderMinutes(draft);
    setDraft("");
  }

  return (
    <main className="page">
      <div className="crumbs">
        <Link to="/">Home</Link> / Settings
      </div>
      <h1>Settings</h1>
      <p className="lead">Reading preferences for this device. More controls are on the way.</p>

      <section style={{ marginTop: "1.75rem" }}>
        <div className="section-label" style={{ color: "var(--accent)" }}>Text size</div>
        <div className="card">
          <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", marginTop: 0 }}>
            Scales body text, headings and formulas together across every page.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {TEXT_SIZES.map((t) => (
              <button
                key={t.v}
                className={"chip" + (fontScale === t.v ? " active" : "")}
                onClick={() => setFontScale(t.v)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginTop: "1.75rem" }}>
        <div className="section-label" style={{ color: "var(--accent)" }}>Study reminders</div>
        <div className="card">
          <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", marginTop: 0 }}>
            A gentle, dismissible toast every so often while you are actually reading. Water,
            posture, a study tip, sometimes just a reminder that this material is hard for
            everyone. It never interrupts or blocks the page, and time only counts while the
            tab is in front of you.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className={"chip" + (hydrationOn ? " active" : "")}
              aria-pressed={hydrationOn}
              onClick={() => setHydrationReminder(true)}
            >
              On
            </button>
            <button
              className={"chip" + (!hydrationOn ? " active" : "")}
              aria-pressed={!hydrationOn}
              onClick={() => setHydrationReminder(false)}
            >
              Off
            </button>
          </div>

          <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", margin: "1.1rem 0 0.4rem" }}>
            How often
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            {INTERVALS.map((m) => (
              <button
                key={m}
                className={"chip" + (reminderMins === m ? " active" : "")}
                aria-pressed={reminderMins === m}
                onClick={() => setReminderMinutes(m)}
              >
                {m} min
              </button>
            ))}
            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-faint)" }}>
              <span>Custom</span>
              <input
                type="number"
                min={REMINDER_MIN}
                max={REMINDER_MAX}
                value={draft !== "" ? draft : (custom ? String(reminderMins) : "")}
                placeholder="min"
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitDraft}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commitDraft(); e.currentTarget.blur(); } }}
                style={{
                  width: "4.2rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                  padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)",
                  border: "1px solid " + (custom ? "var(--accent)" : "var(--border)"),
                  background: "var(--bg-inset)", color: "var(--text)",
                }}
              />
            </label>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-faint)", margin: "0.6rem 0 0" }}>
            Anything from {REMINDER_MIN} to {REMINDER_MAX} minutes. Currently every{" "}
            <span className="font-mono">{reminderMins}</span> min of active study.
          </p>

          <div style={{ marginTop: "1rem" }}>
            <button
              className="chip"
              onClick={() => showNudge(pickNudge({ path: "/settings" }, []))}
            >
              Preview a nudge
            </button>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "1.75rem" }}>
        <div className="section-label" style={{ color: "var(--green)" }}>Pomodoro</div>
        <div className="card">
          <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", marginTop: 0 }}>
            Timed study blocks with real breaks between them. Block lengths, break lengths and
            your completed count live on the Pomodoro page, and a small countdown follows you
            around the app once a session is running.
          </p>
          <Link className="chip" to="/pomodoro">Open Pomodoro</Link>
        </div>
      </section>
    </main>
  );
}
