import * as P from "@radix-ui/react-progress";
import { cn } from "../../lib/cn.js";

export default function Progress({ value = 0, color = "var(--accent)", className }) {
  return (
    <P.Root
      value={value}
      className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-inset border border-line", className)}
    >
      <P.Indicator
        className="h-full rounded-full transition-transform duration-300"
        style={{ background: color, transform: `translateX(-${100 - Math.min(100, value)}%)`, width: "100%" }}
      />
    </P.Root>
  );
}
