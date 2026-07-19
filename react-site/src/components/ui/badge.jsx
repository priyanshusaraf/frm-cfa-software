import { cn } from "../../lib/cn.js";

const tones = {
  neutral: "bg-hovered text-dim border-line",
  accent: "bg-accent-soft text-accent border-transparent",
  green: "bg-green-soft text-green border-transparent",
  amber: "bg-amber-soft text-amber border-transparent",
  red: "bg-red-soft text-red border-transparent",
  purple: "bg-purple-soft text-purple border-transparent",
};

export default function Badge({ tone = "neutral", className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.72rem] font-bold uppercase tracking-wide",
        tones[tone] || tones.neutral,
        className
      )}
      {...props}
    />
  );
}
