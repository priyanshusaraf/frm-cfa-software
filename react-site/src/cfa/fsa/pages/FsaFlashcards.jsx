import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import FsaLayout from "./FsaLayout.jsx";
import Html from "../../../components/Html.jsx";
import { MODULES } from "../content/index.js";
import { useStore, gradeCard, dueCards } from "../../../lib/store.js";

/* Spaced-repetition review of every module's recall cards and traps, on the
   app's existing SM-2-lite engine (store.gradeCard). Card ids are prefixed
   "cfa:fsa:" so they can never collide with the FRM review queue's ids. */

function buildCards() {
  const out = [];
  MODULES.forEach((m) => {
    (m.recall || []).forEach((r, i) => out.push({ id: "cfa:fsa:" + m.id + ":r" + i, mod: m, kind: "Recall", front: r.q, back: r.a }));
    (m.traps || []).forEach((t, i) => out.push({
      id: "cfa:fsa:" + m.id + ":t" + i, mod: m, kind: "Trap",
      front: "True or false, and why? <br><br><i>" + t.wrong + "</i>",
      back: "<b>False.</b> " + t.right,
    }));
  });
  return out;
}

const GRADES = [
  { g: 0, label: "Again", hint: "10 min", tone: "red" },
  { g: 1, label: "Hard", hint: "shorter", tone: "amber" },
  { g: 2, label: "Good", hint: "normal", tone: "accent" },
  { g: 3, label: "Easy", hint: "longer", tone: "green" },
];

export default function FsaFlashcards() {
  const all = useMemo(buildCards, []);
  const srs = useStore((s) => s.srs);
  const [mod, setMod] = useState("all");
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(0);

  const pool = mod === "all" ? all : all.filter((c) => c.mod.id === mod);
  const ids = useMemo(() => pool.map((c) => c.id), [pool]);
  const due = useMemo(() => dueCards(ids), [ids, srs]); // eslint-disable-line
  const fresh = ids.filter((id) => !(srs && srs[id])).length;
  const card = due.length ? pool.find((c) => c.id === due[0]) : null;

  const grade = (g) => {
    if (!card) return;
    gradeCard(card.id, g);
    setShown(false);
    setDone((d) => d + 1);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === " " && card) { e.preventDefault(); setShown((v) => !v); }
      else if (shown && ["1", "2", "3", "4"].includes(e.key)) { e.preventDefault(); grade(Number(e.key) - 1); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  let next = null;
  if (!card) ids.forEach((id) => { const c = srs && srs[id]; if (c && c.due && (next === null || c.due < next)) next = c.due; });

  return (
    <FsaLayout>
      <div className="fsa-kicker">Flashcards</div>
      <h1>Spaced repetition</h1>
      <p className="fsa-lead">Every recall card and every exam trap from the modules. Say the answer before you flip. Cards you know come back later; cards you miss come back in ten minutes.</p>
      <div className="fsa-tabs">
        <button type="button" className={"chip" + (mod === "all" ? " active" : "")} onClick={() => { setMod("all"); setShown(false); }}>All modules</button>
        {MODULES.map((m) => (
          <button type="button" key={m.id} className={"chip" + (mod === m.id ? " active" : "")} onClick={() => { setMod(m.id); setShown(false); }}>LM {m.num}</button>
        ))}
      </div>
      <div className="fsa-card-foot" style={{ fontSize: "0.8rem", marginBottom: "1rem" }}>
        <span>{due.length} due</span><span>{fresh} new</span><span>{pool.length} cards</span><span>{done} reviewed this session</span>
      </div>

      {card ? (
        <div className="fsa-flash" key={card.id + (shown ? "b" : "f")}>
          <div className="fsa-flash-meta">LM {card.mod.num} · {card.mod.short || card.mod.title} · {card.kind}</div>
          <Html className="fsa-flash-front" html={card.front} />
          {shown ? (
            <>
              <Html className="fsa-flash-back" html={card.back} />
              <div className="fsa-flash-grades">
                {GRADES.map((x) => (
                  <button type="button" key={x.g} className={"fsa-btn fsa-grade tone-" + x.tone} onClick={() => grade(x.g)}>
                    <b>{x.label}</b><small>{x.g + 1} · {x.hint}</small>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => setShown(true)}>Show answer <small style={{ opacity: 0.7 }}>(space)</small></button>
          )}
        </div>
      ) : (
        <div className="fsa-callout tone-example">
          <b>All caught up</b>
          <p>No cards are due in this set. {next ? "The next one comes back " + new Date(next).toLocaleString() + "." : ""} Read a module or play a reconstruct round in the meantime.</p>
          {done > 0 && <button type="button" className="fsa-link" onClick={() => setDone(0)}><RotateCcw size={12} /> Reset session count</button>}
        </div>
      )}
    </FsaLayout>
  );
}
