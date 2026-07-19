import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

const styles = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-el font-app font-semibold cursor-pointer " +
    "border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent " +
    "disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-accent-soft border-transparent text-accent hover:brightness-110",
        outline: "bg-transparent border-line text-dim hover:bg-hovered hover:text-ink",
        solid: "bg-accent border-transparent text-[var(--bg)] hover:brightness-110",
        ghost: "bg-transparent border-transparent text-dim hover:bg-hovered hover:text-ink",
        danger: "bg-red-soft border-transparent text-red hover:brightness-110",
      },
      size: {
        sm: "text-[0.8rem] px-2.5 py-1",
        md: "text-[0.88rem] px-3.5 py-1.5",
        lg: "text-[0.95rem] px-5 py-2.5",
        icon: "h-8 w-8 p-0 text-[0.9rem]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const Button = forwardRef(function Button({ className, variant, size, ...props }, ref) {
  return <button ref={ref} className={cn(styles({ variant, size }), className)} {...props} />;
});
export default Button;
