/* The little brain that shows up beside a study nudge. One character, one idle
   loop (breathe + blink), and a swappable prop layer picked by `prop`.

   Two constraints that are not decoration:
   - every colour is a CSS variable, so the mascot works in both themes;
   - all motion is CSS keyframes in style.css (class hooks `bm-*`), never a JS
     animation loop, so an open toast costs nothing on the main thread and
     prefers-reduced-motion can freeze the whole thing in one media query. */

function Water() {
  return (
    <g className="bm-prop bm-bob">
      <path d="M50 44 h13 l-1.6 15.5 a4.9 4.9 0 0 1 -9.8 0 Z" className="bm-glass" />
      <path d="M51.1 53 h10.8 l-0.9 6.5 a4.9 4.9 0 0 1 -9 0 Z" className="bm-water" />
      <path d="M50 44 h13" className="bm-glass-rim" />
    </g>
  );
}

function Coffee() {
  return (
    <g className="bm-prop bm-bob">
      <path d="M49 46 h14 v9 a7 7 0 0 1 -14 0 Z" className="bm-cup" />
      <path d="M63 48 a4 4 0 0 1 0 7" className="bm-cup-handle" />
      <path d="M53 42 q2.5 -3 0 -6" className="bm-steam bm-steam-1" />
      <path d="M58.5 42 q2.5 -3 0 -6" className="bm-steam bm-steam-2" />
    </g>
  );
}

function Chocolate() {
  return (
    <g className="bm-prop bm-bob">
      <rect x="49" y="45" width="15" height="15" rx="2" className="bm-choc" />
      <path d="M56.5 45 v15 M49 52.5 h15" className="bm-choc-score" />
      <circle cx="64" cy="45" r="4.6" className="bm-choc-bite" />
    </g>
  );
}

function Pushups() {
  return (
    <g className="bm-prop bm-lift">
      <path d="M47 52 h18" className="bm-bar" />
      <rect x="43.5" y="47" width="4.5" height="10" rx="1.6" className="bm-weight" />
      <rect x="64" y="47" width="4.5" height="10" rx="1.6" className="bm-weight" />
    </g>
  );
}

function Music() {
  return (
    <g className="bm-prop">
      <path d="M52 56 v-13 l9 -2 v13" className="bm-note-stem" />
      <circle cx="49.5" cy="56.5" r="3.2" className="bm-note-head bm-bob" />
      <circle cx="61" cy="54" r="3.2" className="bm-note-head bm-bob bm-delay" />
      <circle cx="55" cy="49" r="13" className="bm-ring" />
      <circle cx="55" cy="49" r="13" className="bm-ring bm-delay" />
    </g>
  );
}

function Tip() {
  return (
    <g className="bm-prop">
      <path d="M56 38 a8.5 8.5 0 0 1 5 15.2 v2.3 h-10 v-2.3 A8.5 8.5 0 0 1 56 38 Z" className="bm-bulb bm-glow" />
      <path d="M51.6 58.6 h8.8 M52.6 61.6 h6.8" className="bm-bulb-base" />
    </g>
  );
}

function Focus() {
  return (
    <g className="bm-prop">
      <circle cx="56" cy="49" r="11" className="bm-target-ring" />
      <circle cx="56" cy="49" r="6" className="bm-target-ring bm-delay" />
      <circle cx="56" cy="49" r="2.2" className="bm-target-dot" />
    </g>
  );
}

function Heart() {
  return (
    <g className="bm-prop bm-beat">
      <path
        d="M56 60 c-9 -6 -12.5 -10.5 -12.5 -15 a6.4 6.4 0 0 1 12.5 -2.4 a6.4 6.4 0 0 1 12.5 2.4 c0 4.5 -3.5 9 -12.5 15 Z"
        className="bm-heart"
      />
    </g>
  );
}

function Spark() {
  return (
    <g className="bm-prop">
      <path d="M56 37 l2.6 7.6 l7.6 2.6 l-7.6 2.6 l-2.6 7.6 l-2.6 -7.6 l-7.6 -2.6 l7.6 -2.6 Z" className="bm-spark bm-twinkle" />
      <circle cx="67" cy="58" r="2" className="bm-spark bm-twinkle bm-delay" />
    </g>
  );
}

const PROPS = {
  water: Water,
  coffee: Coffee,
  chocolate: Chocolate,
  pushups: Pushups,
  music: Music,
  tip: Tip,
  focus: Focus,
  heart: Heart,
  spark: Spark,
};

export default function BrainMascot({ prop = "spark", size = 56 }) {
  const Prop = PROPS[prop] || Spark;
  return (
    <svg
      className="brain-mascot"
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <g className="bm-body bm-breathe">
        {/* two lobes + a stem, drawn as one silhouette so the fill reads as a brain */}
        <path
          className="bm-brain-fill"
          d="M30 26 a10 10 0 0 1 18 -3 a10 10 0 0 1 12 9.5 a9 9 0 0 1 -1 12.5 a11 11 0 0 1 -12 8 a11 11 0 0 1 -14 -3 a10 10 0 0 1 -6 -13 a9.5 9.5 0 0 1 3 -11 Z"
        />
        <path
          className="bm-brain-lines"
          d="M39 22 v30 M32 32 q6 2 7 -5 M32 44 q6 -2 7 5 M46 28 q-6 2 -7 -4 M47 46 q-7 -2 -8 4"
        />
        <g className="bm-face">
          <ellipse className="bm-eye bm-blink" cx="34" cy="36" rx="1.9" ry="2.3" />
          <ellipse className="bm-eye bm-blink" cx="44" cy="36" rx="1.9" ry="2.3" />
          <path className="bm-smile" d="M35 43 q4 3.4 8 0" />
        </g>
      </g>
      <Prop />
    </svg>
  );
}
