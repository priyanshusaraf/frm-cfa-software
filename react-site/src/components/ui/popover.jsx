import * as P from "@radix-ui/react-popover";
import { cn } from "../../lib/cn.js";

export const Popover = P.Root;
export const PopoverTrigger = P.Trigger;
export const PopoverAnchor = P.Anchor;

export function PopoverContent({ className, sideOffset = 6, ...props }) {
  return (
    <P.Portal>
      <P.Content
        sideOffset={sideOffset}
        className={cn(
          "z-[95] w-80 rounded-card border border-linestrong bg-raised p-4 shadow-card focus:outline-none",
          className
        )}
        {...props}
      />
    </P.Portal>
  );
}
