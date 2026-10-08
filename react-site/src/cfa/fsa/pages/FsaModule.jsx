import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, Circle, Clock, Clapperboard, PencilRuler, Star, Flag } from "lucide-react";
import FsaLayout, { scrollToSection, useFsaState } from "./FsaLayout.jsx";
import Blocks from "../components/Blocks.jsx";
import { ItemSet } from "../components/Interactives.jsx";
import Html from "../../../components/Html.jsx";
import { moduleById, coverage, MODULES } from "../content/index.js";
import { scenariosFor } from "../scenarios/index.js";
import { roundsFor, moduleProgress } from "../progress.js";
import { toggleFsaRead } from "../../../lib/store.js";
import { renderMath } from "../../../lib/tex.js";

function SectionHeader({ mod, s, read, n }) {
  return (
    <>
      <h2><span className="fsa-sec-no">§{n}</span>{s.title}</h2>
      <div className="fsa-sec-meta">
        {(s.los || []).map((l) => <span key={l} className="fsa-los-chip">LOS {mod.num}{l}</span>)}
        <button type="button" className="fsa-btn fsa-mark" style={{ marginLeft: "auto" }} onClick={() => toggleFsaRead(mod.id, s.id)} aria-pressed={!!read}>
          {read ? <CheckCircle2 size={14} style={{ color: "var(--green)" }} /> : <Circle size={14} />} {read ? "Read" : "Mark as read"}
        </button>
      </div>
    </>
  );
}

function FormulaCard({ f }) {
  const html = useMemo(() => renderMath(f.tex, true), [f.tex]);
  return (
    <div className="fsa-formula">
      <div className="fsa-formula-n">{f.name}</div>
      <div className="fsa-formula-m f-tex" dangerouslySetInnerHTML={{ __html: html }} />
      {f.plain && <Html className="fsa-formula-p" html={f.plain} />}
    </div>
  );
}

export default function FsaModule() {
  const { mid } = useParams();
  const mod = moduleById(mid);
  const fsa = useFsaState();
  if (!mod) return <Navigate to="/cfa/fsa" replace />;

  const read = (fsa.read && fsa.read[mod.id]) || {};
  const cov = coverage(mod);
  const scns = scenariosFor(mod.id);
  const rounds = roundsFor(mod.id);
  const prog = moduleProgress(mod, fsa);
  const idx = MODULES.findIndex((m) => m.id === mod.id);
  const prev = MODULES[idx - 1], next = MODULES[idx + 1];
  const pr = fsa.practice || {};
  const secNo = {};
  mod.sections.forEach((s, i) => { secNo[s.id] = i + 1; });

  return (
    <FsaLayout moduleId={mod.id}>
      <div className="fsa-kicker">Learning Module {mod.num} · CFA Level II · Financial Statement Analysis</div>
      <h1>{mod.title}</h1>
      {mod.tagline && <p className="fsa-lead">{mod.tagline}</p>}
      <div className="fsa-card-foot" style={{ marginTop: "0.8rem", fontSize: "0.78rem" }}>
        {mod.minutes ? <span><Clock size={12} /> about {Math.round(mod.minutes / 60 * 10) / 10} h</span> : null}
        <span>{mod.sections.length} sections</span>
        <span><Clapperboard size={12} /> {scns.length} animations</span>
        <span><PencilRuler size={12} /> {rounds.length} reconstruct rounds</span>
        <span><Star size={12} /> {prog.stars} / {prog.maxStars}</span>
      </div>

      {mod.pending ? (
        <div className="fsa-callout tone-flag" style={{ marginTop: "1.5rem" }}>
          <b>Being written</b>
          <p>This module is still being authored. The learning outcome statements it will cover are listed below.</p>
        </div>
      ) : null}

      <div className="fsa-los">
        <div className="fsa-formula-n">Learning outcome statements, and where each is taught</div>
        <ol>
          {cov.map((l) => (
            <li key={l.id}>
              <span className="l">{mod.num}{l.id}</span>
              <span>{l.text}</span>
              <span>
                {l.sections.length ? (
                  <span className="fsa-los-secs">
                    {l.sections.map((s) => (
                      <a key={s.id} href={"#/cfa/fsa/" + mod.id} title={s.title} onClick={(e) => { e.preventDefault(); scrollToSection(s.id); }}>§{secNo[s.id]}</a>
                    ))}
                  </span>
                ) : <span className="fsa-status gap">not yet covered</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {mod.sections.map((s, i) => (
        <section key={s.id} id={s.id} className="fsa-section">
          <SectionHeader mod={mod} s={s} read={read[s.id]} n={i + 1} />
          <Blocks blocks={s.blocks} />
        </section>
      ))}

      {mod.traps && mod.traps.length > 0 && (
        <section id="traps" className="fsa-section">
          <h2>Traps the exam sets</h2>
          <p className="fsa-dim">Each left-hand belief is plausible enough to be a wrong answer option. Cover the right side and test yourself.</p>
          <div className="fsa-traps">
            {mod.traps.map((t, i) => (
              <div key={i} className="fsa-trap">
                <div className="w"><b>Tempting</b><Html as="span" html={t.wrong} /></div>
                <div className="r"><b>Actually</b><Html as="span" html={t.right} /></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {mod.gaap && mod.gaap.length > 0 && (
        <section id="gaap" className="fsa-section">
          <h2>IFRS vs US GAAP</h2>
          <div className="fsa-table tablewrap">
            <table>
              <thead><tr><th>Topic</th><th>IFRS</th><th>US GAAP</th></tr></thead>
              <tbody>
                {mod.gaap.map((g, i) => (
                  <tr key={i}><td><b><Html as="span" html={g.topic} /></b></td><td><Html as="span" html={g.ifrs} /></td><td><Html as="span" html={g.usgaap} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {mod.formulas && mod.formulas.length > 0 && (
        <section id="formulas" className="fsa-section">
          <h2>Formula sheet</h2>
          <div style={{ display: "grid", gap: "0.7rem" }}>
            {mod.formulas.map((f, i) => <FormulaCard key={i} f={f} />)}
          </div>
        </section>
      )}

      {mod.recall && mod.recall.length > 0 && (
        <section id="recall" className="fsa-section">
          <h2>Recall: say it before you open it</h2>
          {mod.recall.map((r, i) => (
            <details key={i} className="fsa-recall">
              <summary><Html as="span" html={r.q} /></summary>
              <Html html={r.a} />
            </details>
          ))}
        </section>
      )}

      {mod.itemSets && mod.itemSets.length > 0 && (
        <section id="itemsets" className="fsa-section">
          <h2>Item sets</h2>
          <p className="fsa-dim">Level II format: a vignette, then questions with three options. Answer all of them, then grade the set.</p>
          <div style={{ display: "grid", gap: "1.2rem" }}>
            {mod.itemSets.map((set) => <ItemSet key={set.id} set={set} />)}
          </div>
        </section>
      )}

      {rounds.length > 0 && (
        <section id="reconstruct" className="fsa-section">
          <h2>Reconstruct the statements</h2>
          <p className="fsa-dim">Every animation in this module is also a practice round. You get the statements before an event; you find the lines it hits, type the new numbers, and the confirmation runs audit your work.</p>
          <div className="fsa-pr-list">
            {rounds.map((r) => {
              const st = pr[r.key];
              return (
                <Link key={r.key} to={"/cfa/fsa/practice/" + encodeURIComponent(r.key)} className="fsa-pr-item" style={{ textDecoration: "none", color: "var(--text)" }}>
                  <span>
                    {r.title}
                    <small>{r.scn.title}{r.scn.columns && r.scn.columns.length > 1 ? " · " + r.colLabel : ""}</small>
                  </span>
                  <span className="fsa-stars">
                    {[1, 2, 3].map((i) => <Star key={i} className={st && i <= st.stars ? "on" : ""} fill={st && i <= st.stars ? "currentColor" : "none"} />)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {mod.flags && mod.flags.length > 0 && (
        <section id="flags" className="fsa-section">
          <h2><Flag size={18} style={{ verticalAlign: "-2px", color: "var(--amber)" }} /> To verify against your book</h2>
          <p className="fsa-dim">Points where the curriculum wording matters and could not be checked against your edition from the cloud session.</p>
          <ul className="fsa-prose">
            {mod.flags.map((f, i) => <li key={i}><span className="fsa-los-chip">LOS {mod.num}{f.los}</span> <Html as="span" html={f.note} /></li>)}
          </ul>
        </section>
      )}

      <div className="fsa-pr-bar" style={{ justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        {prev ? <Link to={"/cfa/fsa/" + prev.id}>← LM{prev.num} {prev.short || prev.title}</Link> : <span />}
        {next ? <Link to={"/cfa/fsa/" + next.id}>LM{next.num} {next.short || next.title} →</Link> : <span />}
      </div>
    </FsaLayout>
  );
}
