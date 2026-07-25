/* Pomodoro timer. The RUNNING state (phase, endsAt, running, cycle) is
   SESSION-ONLY and deliberately kept out of the persisted user blob, following
   lib/fullscreen.js's precedent: a saved `endsAt` reloads into a timer that
   expired three hours ago, and there is no honest way to recover from that. The
   durations and the lifetime completed count DO persist, via store.js `prefs`.

   subscribe/get/set matches the store.js house pattern so components can use
   useSyncExternalStore without a context provider.

   `advance` is a pure function so phase sequencing is testable without timers. */
import { useSyncExternalStore } from "react";
import { getState, POMODORO_DEFAULTS, incPomodoroCompleted } from "./store.js";

export const FOCUS = "focus";
export const BREAK = "break";
export const LONG_BREAK = "longBreak";

let state = { phase: FOCUS, running: false, endsAt: 0, remaining: 0, cycle: 0, started: false };
const listeners = new Set();
let ticker = null;

function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function snapshot() { return state; }
export function usePomodoro() { return useSyncExternalStore(subscribe, snapshot); }
export function getPomodoro() { return state; }

function emit(next) {
  state = next;
  listeners.forEach((l) => l());
}

export function settings() {
  const s = getState();
  return { ...POMODORO_DEFAULTS, ...((s.prefs && s.prefs.pomodoro) || {}) };
}

export function phaseMinutes(phase, cfg) {
  const c = cfg || settings();
  if (phase === BREAK) return c.brk;
  if (phase === LONG_BREAK) return c.longBrk;
  return c.focus;
}

export function phaseLabel(phase) {
  if (phase === BREAK) return "Short break";
  if (phase === LONG_BREAK) return "Long break";
  return "Focus";
}

/* Pure: given the phase that just finished and how many focus blocks have been
   completed INCLUDING that one, return the next phase. Every `cycles`-th focus
   block earns the long break. */
export function advance(phase, completedFocus, cfg) {
  const c = { ...POMODORO_DEFAULTS, ...(cfg || {}) };
  if (phase !== FOCUS) return FOCUS;
  return completedFocus > 0 && completedFocus % c.cycles === 0 ? LONG_BREAK : BREAK;
}

export function formatClock(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

/* Callers register what should happen when a phase ends (the toast). Kept as a
   setter rather than an import so this module stays free of UI dependencies. */
let onPhaseEnd = null;
export function setPhaseEndHandler(fn) { onPhaseEnd = fn; }

function stopTicker() {
  if (ticker) { clearInterval(ticker); ticker = null; }
}

function startTicker() {
  stopTicker();
  // 250ms so the displayed second never lags visibly behind the wall clock
  ticker = setInterval(() => {
    if (!state.running) return;
    const left = state.endsAt - Date.now();
    if (left > 0) { emit({ ...state, remaining: left }); return; }
    finishPhase();
  }, 250);
}

function finishPhase() {
  const cfg = settings();
  const ended = state.phase;
  let cycle = state.cycle;
  if (ended === FOCUS) { cycle += 1; incPomodoroCompleted(); }
  // `cycle` stays monotonic for the session; advance() does the modulo itself.
  const next = advance(ended, cycle, cfg);
  const mins = phaseMinutes(next, cfg);
  emit({
    phase: next,
    running: true,
    endsAt: Date.now() + mins * 60000,
    remaining: mins * 60000,
    cycle,
    started: true,
  });
  if (onPhaseEnd) { try { onPhaseEnd(ended, next); } catch { /* a failing toast must not stop the clock */ } }
}

export function start(phase) {
  const cfg = settings();
  const p = phase || state.phase || FOCUS;
  const mins = phaseMinutes(p, cfg);
  emit({ ...state, phase: p, running: true, endsAt: Date.now() + mins * 60000, remaining: mins * 60000, started: true });
  startTicker();
}

export function pause() {
  if (!state.running) return;
  stopTicker();
  emit({ ...state, running: false, remaining: Math.max(0, state.endsAt - Date.now()) });
}

export function resume() {
  if (state.running || !state.started) return;
  emit({ ...state, running: true, endsAt: Date.now() + state.remaining });
  startTicker();
}

export function toggle() {
  if (!state.started) { start(FOCUS); return; }
  if (state.running) pause(); else resume();
}

/* Skips to the next phase WITHOUT crediting a completed focus block: a skipped
   block was not studied and must not inflate the count. */
export function skip() {
  const cfg = settings();
  const next = advance(state.phase, state.phase === FOCUS ? state.cycle : state.cycle, cfg);
  const mins = phaseMinutes(next, cfg);
  emit({ ...state, phase: next, running: true, endsAt: Date.now() + mins * 60000, remaining: mins * 60000, started: true });
  startTicker();
}

export function reset() {
  stopTicker();
  emit({ phase: FOCUS, running: false, endsAt: 0, remaining: 0, cycle: 0, started: false });
}
