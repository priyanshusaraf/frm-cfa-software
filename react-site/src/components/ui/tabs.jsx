import * as T from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn.js";

export const Tabs = T.Root;
export const TabsContent = T.Content;

export function TabsList({ className, ...props }) {
  return (
    <T.List
      className={cn("inline-flex items-center gap-1 rounded-el border border-line bg-inset p-1", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <T.Trigger
      className={cn(
        "rounded-el border-0 bg-transparent px-3 py-1 font-app text-[0.84rem] text-dim cursor-pointer",
        "data-[state=active]:bg-accent-soft data-[state=active]:text-accent data-[state=active]:font-semibold",
        className
      )}
      {...props}
    />
  );
}
