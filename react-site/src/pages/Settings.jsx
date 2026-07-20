import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore, setFontScale } from "../lib/store.js";

/* Layout designed to accommodate more controls later (font family, background) —
   each preference gets its own labeled section, not a one-off single field. */
const TEXT_SIZES = [
  { v: 0.9, label: "Small" },
  { v: 1, label: "Default" },
  { v: 1.15, label: "Large" },
  { v: 1.3, label: "Extra large" },
];

export default function Settings() {
  useEffect(() => { document.title = "Settings — FRM Part II"; }, []);
  const fontScale = useStore((s) => (s.layout && s.layout.fontScale) || 1);

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
    </main>
  );
}
