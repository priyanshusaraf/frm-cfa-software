/* Distraction-free reading mode. SESSION-ONLY state, deliberately kept out of the
   persisted `layout` blob: browsers reject requestFullscreen() outside a user
   gesture, so a saved `fullscreen: true` would reload into a state where the CSS
   says fullscreen but the browser chrome is still there, with no clean recovery.
   Subscribe/get/set matches the store.js house pattern. */
import { useSyncExternalStore } from "react";

let on = false;
const listeners = new Set();

function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function snapshot() { return on; }

export function useFullscreen() { return useSyncExternalStore(subscribe, snapshot); }
export function isFullscreen() { return on; }

export function setFullscreen(next) {
  const v = !!next;
  if (v === on) return;
  on = v;
  const root = document.documentElement;
  if (v) {
    root.setAttribute("data-fullscreen", "1");
    // the catch matters: denial must still leave the in-app part (nav + rails
    // hidden, panes full height) working
    if (root.requestFullscreen) { try { root.requestFullscreen().catch(() => {}); } catch { /* noop */ } }
  } else {
    root.removeAttribute("data-fullscreen");
    if (document.fullscreenElement && document.exitFullscreen) {
      try { document.exitFullscreen().catch(() => {}); } catch { /* noop */ }
    }
  }
  listeners.forEach((l) => l());
}

export function toggleFullscreen() { setFullscreen(!on); }

/* Syncs state back when the browser leaves fullscreen on its own (Esc, F11, tab
   switch) — this is what makes Esc work without a dedicated key handler. */
if (typeof document !== "undefined") {
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && on) setFullscreen(false);
  });
}
