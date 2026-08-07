import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

/**
 * Controls read as machined parts: flat surfaces, hairline edges, a 1px
 * mechanical travel on press. Lime never fills a button — at most it marks
 * one action per view via `marked`.
 */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-carbon text-white hover:bg-graphite active:bg-carbon",
  secondary:
    "bg-transparent text-carbon shadow-[inset_0_0_0_1px_var(--color-hairline-strong)] hover:bg-fog/70",
  ghost: "bg-transparent text-steel hover:bg-fog/70 hover:text-carbon",
  danger:
    "bg-transparent text-alert shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-alert)_30%,transparent)] hover:bg-alert-wash",
};

const SIZES: Record<Size, string> = {
  sm: "h-7 gap-1.5 px-2.5 text-[12px]",
  md: "h-9 gap-2 px-4 text-[13px]",
  lg: "h-11 gap-2.5 px-6 text-[14px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
  /** Marks this as the one important action in the view. Adds the lime edge. */
  marked?: boolean;
}

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconRight,
  block,
  marked,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex select-none items-center justify-center font-medium",
        "transition-[background-color,color,transform] duration-[100ms] ease-[cubic-bezier(0.2,0,0,1)]",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        SIZES[size],
        block && "w-full",
        marked && "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-lime",
        marked && (size === "sm" ? "pl-3.5" : size === "lg" ? "pl-7" : "pl-5"),
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

export function IconButton({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: Omit<ButtonProps, "marked">) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "transition-colors duration-[100ms] ease-[cubic-bezier(0.2,0,0,1)] active:translate-y-px",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
