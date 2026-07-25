/* The copy + selection logic behind the study-nudge toast (StudyNudge.jsx).
   Kept pure and React-free so the rotation rules are unit-testable.

   Each nudge is:
     { id, prop, weight, text, action?, when? }
   - prop   names the BrainMascot accessory drawn beside the text.
   - action is optional: { label, to } routes in-app, { label, href } leaves.
   - when(ctx) gates contextual nudges on { rn, minutes, path }; a nudge with no
     `when` is always eligible.
   - weight biases the draw. Feature-discovery lines sit at 0.5 so they cannot
     crowd out the ones that actually look after the reader.

   Prose follows the house hard rule: no em-dashes or en-dashes anywhere. */

export const SPOTIFY_PLAYLIST =
  "https://open.spotify.com/playlist/5zAFhWieD1SMzQz0T3KkL4?si=5w5hG86aQRa7Cg3fLzRgmQ";

export const NUDGES = [
  /* ---- look after the body ---- */
  {
    id: "water-skin",
    prop: "water",
    weight: 1.4,
    text: "Drink some water. Helps your focus, and honestly it helps your skin too.",
  },
  {
    id: "water-refill",
    prop: "water",
    weight: 1,
    text: "Your brain is about 75% water and you have been running it hard. Go refill the glass.",
  },
  {
    id: "pushups",
    prop: "pushups",
    weight: 1,
    text: "Try 10 pushups right now. Sounds silly, works anyway. You will come back sharper.",
  },
  {
    id: "stretch",
    prop: "pushups",
    weight: 0.9,
    text: "Stand up, roll your shoulders back, look at something far away for 20 seconds. That is the whole ask.",
  },
  {
    id: "coffee",
    prop: "coffee",
    weight: 1,
    text: "Coffee break? If it is past 6pm maybe make it a decaf, tomorrow you will thank you.",
  },
  {
    id: "chocolate",
    prop: "chocolate",
    weight: 1,
    text: "Not sponsored, but Amul makes some genuinely good dark chocolate. Helps with focus too.",
  },
  {
    id: "eyes",
    prop: "focus",
    weight: 0.8,
    text: "Blink properly for a moment. Screens make us forget, and dry eyes make everything feel harder than it is.",
  },

  /* ---- morale ---- */
  {
    id: "boring-together",
    prop: "heart",
    weight: 1.1,
    text: "We know this one is a slog. We struggled with it too. You are not alone in finding it dull.",
  },
  {
    id: "consistency",
    prop: "spark",
    weight: 1,
    text: "Time to get those consistency scores back up.",
    action: { label: "See consistency", to: "/consistency" },
  },
  {
    id: "night-owls",
    prop: "heart",
    weight: 0.7,
    text: "The developers are night owls too. If something in here is confusing or broken, reach out.",
  },
  {
    id: "showing-up",
    prop: "spark",
    weight: 0.9,
    text: "Showing up on an ordinary day is the whole trick. Nobody passes this on motivation alone.",
  },

  /* ---- study technique ---- */
  {
    id: "pomodoro-offer",
    prop: "focus",
    weight: 1.2,
    text: "Want a Pomodoro clock? We built one into the app. 25 on, 5 off, repeat.",
    action: { label: "Open Pomodoro", to: "/pomodoro" },
  },
  {
    id: "recall-beats-reread",
    prop: "spark",
    weight: 0.9,
    text: "Close your eyes and try to say the last idea out loud from memory. Recall beats rereading, every time.",
  },
  {
    id: "playlist",
    prop: "music",
    weight: 0.9,
    text: "Here is the low key techno playlist we study to. No lyrics to argue with your thoughts.",
    action: { label: "Open in Spotify", href: SPOTIFY_PLAYLIST },
  },

  /* ---- shortcut tips (all of these are real bindings) ---- */
  {
    id: "tip-note",
    prop: "tip",
    weight: 0.8,
    text: "Did you know: select any text and press n to drop a quick note on it. Try it on the next thing that confuses you.",
  },
  {
    id: "tip-palette",
    prop: "tip",
    weight: 0.8,
    text: "Did you know: Cmd K opens the command palette. Jump to any reading or page without touching the nav.",
  },
  {
    id: "tip-prevnext",
    prop: "tip",
    weight: 0.7,
    text: "Did you know: [ and ] walk you to the previous and next reading. No scrolling back to the book page.",
  },
  {
    id: "tip-fullscreen",
    prop: "tip",
    weight: 0.7,
    text: "Did you know: press f for fullscreen. The nav slides away and peeks back when you reach for it.",
  },
  {
    id: "tip-quiz-keys",
    prop: "tip",
    weight: 0.6,
    text: "Did you know: in a quiz you can answer with 1 to 4 or a to d, and grade review cards with Space then a number.",
  },

  /* ---- feature discovery (low weight on purpose) ---- */
  {
    id: "feature-drills",
    prop: "spark",
    weight: 0.5,
    text: "When the formulas stop sticking, calculation drills beat rereading them.",
    action: { label: "Open drills", to: "/drills" },
  },
  {
    id: "feature-mindmap",
    prop: "spark",
    weight: 0.5,
    text: "Lost the shape of the syllabus? The mind map shows how every reading hangs together.",
    action: { label: "Open mind map", to: "/mindmap" },
  },
  {
    id: "feature-review",
    prop: "spark",
    weight: 0.5,
    text: "Your review queue is where the spaced repetition happens. Ten minutes there is worth an hour of rereading.",
    action: { label: "Open review queue", to: "/review" },
  },
  {
    id: "feature-highlights",
    prop: "spark",
    weight: 0.4,
    text: "Everything you have highlighted lives on one page, filterable by color and book.",
    action: { label: "Open highlights", to: "/highlights" },
  },

  /* ---- contextual ---- */
  {
    id: "long-on-reading",
    prop: "focus",
    weight: 2,
    when: (c) => !!c.rn && c.minutes >= 40,
    text: "You have been on this reading a while. If it is not landing, the core concept pages explain the underlying models properly.",
    action: { label: "Browse core concepts", to: "/concepts" },
  },
  {
    id: "long-session-break",
    prop: "heart",
    weight: 1.6,
    when: (c) => c.minutes >= 90,
    text: "Ninety minutes in. Take a real break, not a scrolling one. Retention falls off a cliff past here.",
  },
];

const DEFAULT_CTX = { rn: null, minutes: 0, path: "/" };

/* Draws a nudge, skipping anything in `recentIds` so the same line does not come
   round twice in a row. `rand` is injected purely so the test is deterministic.
   Falls back to ignoring `recentIds` rather than returning null when the pool is
   exhausted: a stale exclusion list must never silence the toast entirely. */
export function pickNudge(ctx, recentIds, rand) {
  const c = { ...DEFAULT_CTX, ...(ctx || {}) };
  const r = typeof rand === "function" ? rand : Math.random;
  const recent = new Set(recentIds || []);

  const eligible = NUDGES.filter((n) => {
    if (typeof n.when === "function") {
      try { if (!n.when(c)) return false; } catch { return false; }
    }
    return true;
  });
  if (!eligible.length) return null;

  const fresh = eligible.filter((n) => !recent.has(n.id));
  const pool = fresh.length ? fresh : eligible;

  const total = pool.reduce((sum, n) => sum + (n.weight || 1), 0);
  let t = r() * total;
  for (const n of pool) {
    t -= n.weight || 1;
    if (t <= 0) return n;
  }
  return pool[pool.length - 1]; // float drift guard
}

export function nudgeById(id) {
  return NUDGES.find((n) => n.id === id) || null;
}
