import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import { IconCheck, IconChevronDown } from "@/components/icons";

/* --- Labels & field shell ------------------------------------------------- */

export function Label({
  children,
  required,
  className,
}: {
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("spec", className)}>
      {children}
      {required ? <span className="text-carbon"> *</span> : null}
    </span>
  );
}

export function Field({
  label,
  hint,
  error,
  required,
  refCode,
  children,
  className,
}: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Drawing-style reference code, set at the right of the label rail. */
  refCode?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      {(label || refCode) && (
        <span className="flex items-baseline justify-between gap-3">
          {label ? <Label required={required}>{label}</Label> : <span />}
          {refCode ? (
            <span className="font-mono text-[10px] text-concrete">{refCode}</span>
          ) : null}
        </span>
      )}
      {children}
      {error ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-alert">
          {error}
        </span>
      ) : hint ? (
        <span className="text-[12px] leading-snug text-steel">{hint}</span>
      ) : null}
    </label>
  );
}

/* --- Controls ------------------------------------------------------------- */

/**
 * Inputs are carved from the surface: no box, just a baseline rule that
 * thickens to carbon on focus. Snaps, doesn't glow.
 */
const CONTROL = [
  "w-full bg-transparent px-0 text-[14px] text-carbon",
  "border-0 border-b border-hairline-strong",
  "placeholder:text-concrete",
  "transition-[border-color] duration-[100ms] ease-[cubic-bezier(0.2,0,0,1)]",
  "hover:border-concrete focus:border-carbon focus:outline-none focus:ring-0",
  "disabled:text-concrete disabled:border-hairline",
  "aria-[invalid=true]:border-alert",
].join(" ");

export function Input({
  className,
  mono,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      className={cn(CONTROL, "h-9", mono && "font-mono text-[13px] tracking-tight", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(CONTROL, "min-h-24 resize-y py-2 leading-relaxed", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select className={cn(CONTROL, "h-9 appearance-none pr-7", className)} {...props}>
        {children}
      </select>
      <IconChevronDown
        size={14}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-steel"
      />
    </span>
  );
}

/* --- Mechanical inputs ---------------------------------------------------- */

/** Approval checkbox — a square you tick, like a drawing sign-off box. */
export function Checkbox({
  label,
  description,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <label className={cn("group flex cursor-pointer items-start gap-3", className)}>
      <span className="relative mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center shadow-[inset_0_0_0_1px_var(--color-concrete)] transition-colors duration-[100ms] group-hover:shadow-[inset_0_0_0_1px_var(--color-carbon)] has-[:checked]:bg-carbon has-[:checked]:shadow-none">
        <input
          type="checkbox"
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...props}
        />
        <IconCheck
          size={11}
          className="pointer-events-none scale-0 text-white transition-transform duration-[100ms] ease-[cubic-bezier(0.85,0,0.15,1)] peer-checked:scale-100"
        />
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-1">
          {label ? (
            <span className="text-[13px] leading-tight text-carbon">{label}</span>
          ) : null}
          {description ? (
            <span className="text-[12px] leading-snug text-steel">{description}</span>
          ) : null}
        </span>
      )}
    </label>
  );
}

/** Radio — the selected mark is the one place lime appears in a form. */
export function Radio({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className={cn("group flex cursor-pointer items-center gap-3", className)}>
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center shadow-[inset_0_0_0_1px_var(--color-concrete)] transition-colors group-hover:shadow-[inset_0_0_0_1px_var(--color-carbon)] has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-carbon)]">
        <input
          type="radio"
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...props}
        />
        <span className="h-2 w-2 scale-0 bg-carbon transition-transform duration-[100ms] ease-[cubic-bezier(0.85,0,0.15,1)] peer-checked:scale-100" />
      </span>
      {label ? <span className="text-[13px] text-carbon">{label}</span> : null}
    </label>
  );
}

/** Mechanical switch. Travels between two hard stops. */
export function Switch({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className={cn("group flex cursor-pointer items-center gap-3", className)}>
      <span className="relative inline-flex h-5 w-9 items-center bg-fog p-px shadow-[inset_0_0_0_1px_var(--color-hairline-strong)] transition-colors duration-[160ms] has-[:checked]:bg-carbon has-[:checked]:shadow-none">
        <input
          type="checkbox"
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...props}
        />
        <span className="material-aluminum h-full w-4 shadow-[inset_0_0_0_1px_var(--color-concrete)] transition-transform duration-[160ms] ease-[cubic-bezier(0.85,0,0.15,1)] peer-checked:translate-x-4" />
      </span>
      {label ? <span className="text-[13px] text-carbon">{label}</span> : null}
    </label>
  );
}
