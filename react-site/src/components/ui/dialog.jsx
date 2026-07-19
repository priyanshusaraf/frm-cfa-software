import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/cn.js";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

export function DialogContent({ className, children, title, ...props }) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-[2px]" />
      <D.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[95] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2",
          "rounded-card border border-linestrong bg-raised p-5 shadow-card focus:outline-none",
          className
        )}
        {...props}
      >
        {title && <D.Title className="m-0 mb-3 text-[1.05rem] font-bold text-ink">{title}</D.Title>}
        {children}
        <D.Close
          aria-label="Close"
          className="absolute right-3 top-3 h-7 w-7 inline-flex items-center justify-center rounded-el border-0 bg-transparent text-faint cursor-pointer hover:bg-hovered hover:text-ink"
        >
          <X size={15} />
        </D.Close>
      </D.Content>
    </D.Portal>
  );
}
