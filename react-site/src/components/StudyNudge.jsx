import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore, REMINDER_DEFAULT } from "../lib/store.js";
import { pickNudge } from "../lib/nudges.js";
import BrainMascot from "./BrainMascot.jsx";

/* Unobtrusive, dismissible toast: never a browser alert/confirm, which would
   block the page (and the extension). Foreground-only accumulation: paused
   while document.hidden so a backgrounded tab doesn't silently rack up time.

   `showNudge` is an imperative escape hatch for callers that need a toast on
   demand (Settings' Preview button, Pomodoro phase transitions) without
   duplicating the toast markup. It is a module-level bridge rather than a
   context provider because the store pattern replaces providers here. */

const TICK = 15000;
const AUTO_HIDE = 25000;
const RECENT_MEMORY = 6; // how many ids to keep out of the rotation

let pushNudge = null;
export function showNudge(nudge) {
  if (pushNudge && nudge) pushNudge(nudge);
}

export default function StudyNudge() {
  // #185-safe: primitive selectors, no fresh object/array per render.
  const enabled = useStore((s) => (s.prefs ? s.prefs.hydrationReminder !== false : true));
  const minutes = useStore((s) => (s.prefs && s.prefs.reminderMinutes) || REMINDER_DEFAULT);
  const location = useLocation();
  const [nudge, setNudge] = useState(null);

  const elapsedRef = useRef(0);
  const lastTickRef = useRef(Date.now());
  const recentRef = useRef([]);
  const pageStartRef = useRef(Date.now());
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  // Contextual nudges ask "how long on THIS reading", so the clock restarts per route.
  useEffect(() => { pageStartRef.current = Date.now(); }, [location.pathname]);

  const show = useCallback((n) => {
    if (!n) return;
    recentRef.current = [n.id, ...recentRef.current].slice(0, RECENT_MEMORY);
    setNudge(n);
  }, []);

  useEffect(() => { pushNudge = show; return () => { pushNudge = null; }; }, [show]);

  useEffect(() => {
    if (!enabled) return;
    lastTickRef.current = Date.now();
    const interval = minutes * 60000;
    const id = setInterval(() => {
      if (document.hidden) { lastTickRef.current = Date.now(); return; }
      const now = Date.now();
      elapsedRef.current += now - lastTickRef.current;
      lastTickRef.current = now;
      if (elapsedRef.current < interval) return;
      elapsedRef.current = 0;
      const path = pathRef.current;
      const m = /^\/chapter\/(\d+)/.exec(path);
      show(pickNudge({
        rn: m ? parseInt(m[1], 10) : null,
        minutes: Math.round((now - pageStartRef.current) / 60000),
        path,
      }, recentRef.current));
    }, TICK);
    return () => clearInterval(id);
  }, [enabled, minutes, show]);

  // Auto-hide so a nudge you walked away from isn't still sitting there later.
  useEffect(() => {
    if (!nudge) return;
    const id = setTimeout(() => setNudge(null), AUTO_HIDE);
    return () => clearTimeout(id);
  }, [nudge]);

  // The preview button must work even with reminders off, so only the TIMER is
  // gated on `enabled`, not the rendering.
  if (!nudge) return null;
  const { action } = nudge;

  return (
    <div className="nudge-toast" role="status" aria-live="polite">
      <BrainMascot prop={nudge.prop} size={52} />
      <div className="nudge-body">
        <span className="nudge-text">{nudge.text}</span>
        {action && action.to && (
          <Link className="nudge-action" to={action.to} onClick={() => setNudge(null)}>
            {action.label}
          </Link>
        )}
        {action && action.href && (
          <a className="nudge-action" href={action.href} target="_blank" rel="noreferrer noopener">
            {action.label}
          </a>
        )}
      </div>
      <button type="button" className="nudge-close" onClick={() => setNudge(null)} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
