import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Progressive Confidence (PRD 10.1) without leaving grayscale.
 * The machine's proposals are marked structurally — a hatched, dashed edge —
 * and human-verified state is marked with solid carbon. Lime is reserved for
 * the current/active thing, never for "good".
 */
type Tone =
  | "neutral" // resting metadata
  | "suggested" // machine-proposed, unverified
  | "verified" // human-confirmed
  | "active" // the current selection / live state — the lime budget
  | "alert" // functional only: overdue, expired, failed
  | "dark";

const TONES: Record<Tone, string> = {
  neutral: "bg-fog text-steel",
  suggested:
    "material-hatch text-steel shadow-[inset_0_0_0_1px_var(--color-hairline-strong)]",
  verified: "bg-carbon text-white",
  active: "bg-lime text-carbon",
  alert: "bg-alert-wash text-alert",
  dark: "bg-graphite text-fog",
};

export function Badge({
  tone = "neutral",
  children,
  icon,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-[3px]",
        "font-mono text-[10px] uppercase leading-none tracking-[0.1em]",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** Status with a hard square indicator. Reads like an equipment decal. */
export function StatusPill({
  tone = "neutral",
  children,
  pulse,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  const dot: Record<Tone, string> = {
    neutral: "bg-concrete",
    suggested: "bg-concrete",
    verified: "bg-carbon",
    active: "bg-lime",
    alert: "bg-alert",
    dark: "bg-fog",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-steel",
        className,
      )}
    >
      <span className={cn("h-[6px] w-[6px]", dot[tone], pulse && "anim-blink")} />
      {children}
    </span>
  );
}

/**
 * Confidence meter — segmented like a machined gauge, never a smooth bar.
 * Nothing is colored; the count of filled ticks and the number carry the
 * meaning. Below 75% the ticks go hollow so low confidence reads at a glance.
 */
export function ConfidenceMeter({
  value,
  segments = 10,
  showValue = true,
  className,
}: {
  value: number;
  segments?: number;
  showValue?: boolean;
  className?: string;
}) {
  const filled = Math.round(value * segments);
  const low = value < 0.75;
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex gap-px" aria-hidden>
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 w-[3px]",
              i >= filled
                ? "bg-hairline"
                : low
                  ? "shadow-[inset_0_0_0_1px_var(--color-steel)]"
                  : "bg-carbon",
            )}
          />
        ))}
      </span>
      {showValue ? (
        <span className="font-mono text-[10px] tabular-nums text-steel">
          {(value * 100).toFixed(0)}%
        </span>
      ) : null}
    </span>
  );
}
