/** Tailwind runs with preflight OFF: the app keeps its hand-written base styles in
 * style.css; utilities + tokens below are used by the shadcn-style components. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        raised: "var(--bg-raised)",
        hovered: "var(--bg-hover)",
        inset: "var(--bg-inset)",
        line: "var(--border)",
        linestrong: "var(--border-strong)",
        ink: "var(--text)",
        dim: "var(--text-dim)",
        faint: "var(--text-faint)",
        accent: { DEFAULT: "var(--accent)", soft: "var(--accent-soft)" },
        green: { DEFAULT: "var(--green)", soft: "var(--green-soft)" },
        amber: { DEFAULT: "var(--amber)", soft: "var(--amber-soft)" },
        red: { DEFAULT: "var(--red)", soft: "var(--red-soft)" },
        purple: { DEFAULT: "var(--purple)", soft: "var(--purple-soft)" },
        cyan: { DEFAULT: "var(--cyan)", soft: "var(--cyan-soft)" },
        pink: { DEFAULT: "var(--pink)", soft: "var(--pink-soft)" },
      },
      borderRadius: { card: "var(--radius)", el: "var(--radius-sm)" },
      fontFamily: { app: "var(--font)", mono: "var(--mono)" },
      boxShadow: { card: "var(--shadow)" },
    },
  },
  plugins: [],
};
