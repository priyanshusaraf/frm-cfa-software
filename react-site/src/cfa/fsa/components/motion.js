import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
}

/* Eased tween toward `value`. If a new target arrives mid-flight the tween
   restarts from the number currently on screen, not from the old target, so a
   fast scrub through the timeline never snaps. */
export function useTween(value, duration = 650) {
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  useEffect(() => {
    if (prefersReducedMotion() || duration <= 0) { shownRef.current = value; setShown(value); return; }
    const from = shownRef.current;
    if (Math.abs(from - value) < 1e-9) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      const v = from + (value - from) * e;
      shownRef.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return shown;
}

/* Flies a small chip from one element to another. Resolves when it lands (or
   immediately if either element is missing or off-screen, so a caller waiting
   on it never hangs). Uses the Web Animations API: no dependency, and the
   chip lives on <body> so it can cross the event card / statement boundary. */
export function flyChip(fromEl, toEl, text, tone, duration = 700) {
  return new Promise((resolve) => {
    if (!fromEl || !toEl || prefersReducedMotion()) { resolve(); return; }
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    if (b.bottom < 0 || b.top > vh || a.bottom < 0 || a.top > vh) { resolve(); return; }
    const chip = document.createElement("div");
    chip.className = "fsa-flychip fsa-tone-" + (tone || "up");
    chip.textContent = text;
    document.body.appendChild(chip);
    const cw = chip.offsetWidth, ch = chip.offsetHeight;
    const x0 = a.left + a.width - cw - 8, y0 = a.top + (a.height - ch) / 2;
    const x1 = b.left + b.width - cw - 6, y1 = b.top + (b.height - ch) / 2;
    chip.style.left = x0 + "px";
    chip.style.top = y0 + "px";
    const dx = x1 - x0, dy = y1 - y0;
    const lift = Math.min(80, Math.abs(dx) * 0.15 + 20);
    const anim = chip.animate(
      [
        { transform: "translate(0,0) scale(0.9)", opacity: 0 },
        { transform: "translate(" + dx * 0.15 + "px," + (dy * 0.15 - lift) + "px) scale(1.05)", opacity: 1, offset: 0.25 },
        { transform: "translate(" + dx + "px," + dy + "px) scale(1)", opacity: 1, offset: 0.9 },
        { transform: "translate(" + dx + "px," + dy + "px) scale(0.6)", opacity: 0 },
      ],
      { duration, easing: "cubic-bezier(.3,.7,.2,1)" }
    );
    const done = () => { chip.remove(); resolve(); };
    anim.onfinish = done;
    anim.oncancel = done;
  });
}

export function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
