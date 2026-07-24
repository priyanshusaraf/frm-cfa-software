import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../lib/store.js";
import { rpath, readingMeta } from "../lib/meta.js";

/* Global "Return to Reading" chrome (Phase 0.5 item 10, CLAUDE.md-tracked plan
   task-3-brief). Replaces the old per-page ConceptPage §6 back link: this button
   survives navigating through any number of concept pages (or anywhere else),
   not just one hop back. Rendered from Shell (main.jsx), guarded by fullscreen
   like the rest of the app chrome. */
export default function ReturnToReading() {
  const rn = useStore((s) => (s.nav ? s.nav.activeReading : null)); // primitive selector: React #185-safe
  const loc = useLocation();
  const nav = useNavigate();
  if (!rn) return null;
  if (loc.pathname === rpath(rn)) return null; // already there
  const meta = readingMeta(rn);
  if (!meta) return null;
  return (
    <button
      type="button"
      className="return-to-reading"
      onClick={() => nav(rpath(rn), { state: { resume: true } })}
      title={`Return to Reading ${rn}: ${meta.t}`}
    >
      ← Return to Reading {rn}
    </button>
  );
}
