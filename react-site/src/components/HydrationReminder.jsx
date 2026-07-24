import { useEffect, useState, useRef } from "react";
import { useStore } from "../lib/store.js";

const INTERVAL = 45 * 60 * 1000; // 45 minutes of foreground time

/* Unobtrusive, dismissible toast — never a browser alert/confirm, which would
   block the page (and the extension). Foreground-only accumulation: paused
   while document.hidden so a backgrounded tab doesn't silently rack up time. */
export default function HydrationReminder() {
  // #185-safe: primitive selector, no fresh object/array per render.
  const enabled = useStore((s) => (s.prefs ? s.prefs.hydrationReminder !== false : true));
  const [show, setShow] = useState(false);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;
    lastTickRef.current = Date.now();
    const id = setInterval(() => {
      if (document.hidden) { lastTickRef.current = Date.now(); return; }
      const now = Date.now();
      elapsedRef.current += now - lastTickRef.current;
      lastTickRef.current = now;
      if (elapsedRef.current >= INTERVAL) { setShow(true); elapsedRef.current = 0; }
    }, 15000);
    return () => clearInterval(id);
  }, [enabled]);

  if (!enabled || !show) return null;
  return (
    <div className="hydration-toast" role="status">
      <span>Time for a water break. Stretch, hydrate, back in a minute.</span>
      <button onClick={() => setShow(false)} aria-label="Dismiss">✕</button>
    </div>
  );
}
