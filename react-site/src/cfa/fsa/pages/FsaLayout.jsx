import React, { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Clapperboard, PencilRuler, ScrollText, ListChecks } from "lucide-react";
import "../fsa.css";
import { MODULES } from "../content/index.js";
import { useStore } from "../../../lib/store.js";

/* Shared shell for every /cfa/fsa page: its own sidebar (the FRM Study
   sidebar is for the FRM readings and is not shown here), then the page. */

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function useFsaState() {
  const cfa = useStore((s) => s.cfa);
  return (cfa && cfa.fsa) || EMPTY;
}
const EMPTY = {};

export default function FsaLayout({ children, moduleId }) {
  const { pathname } = useLocation();
  const fsa = useFsaState();
  const read = (fsa.read && moduleId && fsa.read[moduleId]) || EMPTY;
  const current = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const top = [
    { to: "/cfa/fsa", label: "Overview", Icon: Home, end: true },
    { to: "/cfa/fsa/lab", label: "Animation lab", Icon: Clapperboard },
    { to: "/cfa/fsa/practice", label: "Reconstruct", Icon: PencilRuler },
    { to: "/cfa/fsa/reference", label: "Cheat sheet", Icon: ScrollText },
    { to: "/cfa/fsa/coverage", label: "Curriculum coverage", Icon: ListChecks },
  ];

  return (
    <div className="fsa-shell">
      <nav className="fsa-side" aria-label="FSA navigation">
        <NavLink to="/cfa/fsa" className="fsa-side-brand" style={{ padding: 0, background: "none" }}>Financial Statement Analysis</NavLink>
        <div className="fsa-side-sub">CFA Level II · 2026</div>
        {top.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "active" : "")}>
            <Icon size={14} style={{ flex: "none", transform: "translateY(2px)" }} /> {label}
          </NavLink>
        ))}
        <div className="fsa-side-group">Learning modules</div>
        {MODULES.map((m) => (
          <React.Fragment key={m.id}>
            <NavLink to={"/cfa/fsa/" + m.id} className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="n">{m.num}</span>
              <span>{m.short || m.title}{m.pending ? <em className="fsa-dim" style={{ fontSize: "0.72rem" }}> · in progress</em> : null}</span>
            </NavLink>
            {current && current.id === m.id && m.sections.map((s) => (
              <a
                key={s.id}
                href={"#/cfa/fsa/" + m.id}
                className={"fsa-side-sec" + (read[s.id] ? " is-read" : "")}
                onClick={(e) => { e.preventDefault(); scrollToSection(s.id); }}
              >
                {s.title}
              </a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <main className="fsa-main">{children}</main>
    </div>
  );
}
