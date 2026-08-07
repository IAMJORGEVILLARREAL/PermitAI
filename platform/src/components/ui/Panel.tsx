import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Cards disappear. A Panel is a region of the same surface, separated by
 * space first, tone second, and a hairline only when structure demands it.
 */
export function Panel({
  children,
  className,
  tone = "paper",
  edge = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "raised" | "sunken" | "dark";
  /** Add a hairline outline. Use only when adjacency would otherwise confuse. */
  edge?: boolean;
}) {
  const tones = {
    paper: "bg-paper text-carbon",
    raised: "bg-white text-carbon",
    sunken: "bg-fog/60 text-carbon",
    dark: "material-coated text-fog",
  } as const;
  return (
    <section
      className={cn(
        tones[tone],
        edge &&
          (tone === "dark"
            ? "shadow-[inset_0_0_0_1px_var(--color-graphite)]"
            : "shadow-[inset_0_0_0_1px_var(--color-hairline)]"),
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Panel header. A single hairline under it, generous height, and the mono
 * voice for the reference code on the left rail.
 */
export function PanelHeader({
  title,
  subtitle,
  code,
  actions,
  dark,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  code?: string;
  actions?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex h-12 items-center justify-between gap-6 border-b px-4",
        dark ? "border-graphite" : "border-hairline",
        className,
      )}
    >
      <div className="flex min-w-0 items-baseline gap-3">
        {code ? (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.1em]",
              dark ? "text-concrete" : "text-concrete",
            )}
          >
            {code}
          </span>
        ) : null}
        <h2
          className={cn(
            "truncate font-display text-[14px] font-medium tracking-[-0.01em]",
            dark ? "text-white" : "text-carbon",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <span className="truncate text-[12px] text-steel">{subtitle}</span>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-1.5">{actions}</div>
      ) : null}
    </header>
  );
}

export function PanelBody({
  children,
  className,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return <div className={cn(pad && "p-6", className)}>{children}</div>;
}

/** Hairline rule, optionally with a mono label set into it. */
export function Rule({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  if (!label) return <hr className={cn("border-t border-hairline", className)} />;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
        {label}
      </span>
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}

/**
 * Section heading with massive type and a lot of air above it.
 * The workhorse for page-level structure.
 */
export function SectionTitle({
  children,
  code,
  description,
  actions,
  className,
}: {
  children: ReactNode;
  code?: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-8", className)}>
      <div className="min-w-0">
        {code ? (
          <div className="spec mb-3">{code}</div>
        ) : null}
        <h1 className="font-display text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-carbon">
          {children}
        </h1>
        {description ? (
          <p className="mt-3 max-w-prose text-[13px] leading-relaxed text-steel">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
