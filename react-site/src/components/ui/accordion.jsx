import * as A from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn.js";

export function Accordion(props) { return <A.Root {...props} />; }

export function AccordionItem({ className, ...props }) {
  return (
    <A.Item
      className={cn("border border-line rounded-card bg-raised overflow-hidden my-2", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <A.Header className="m-0">
      <A.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-3 px-4 py-3 cursor-pointer",
          "bg-transparent border-0 font-app text-left text-[0.95rem] font-semibold text-ink hover:bg-hovered",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown size={15} className="shrink-0 text-faint transition-transform group-data-[state=open]:rotate-180" />
      </A.Trigger>
    </A.Header>
  );
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <A.Content
      className={cn("border-t border-line px-4 py-3 text-[0.94rem] leading-relaxed", className)}
      {...props}
    >
      {children}
    </A.Content>
  );
}
