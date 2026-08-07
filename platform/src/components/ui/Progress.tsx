import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Determinate progress reads as a machined scale: discrete segments, a
 * hairline track, and the number always spelled out.
 */
export function Progress({
  value,
  label,
  segments = 24,
  className,
}: {
  value: number;
  label?: ReactNode;
  segments?: number;
  className?: string;
}) {
  const filled = Math.round(Math.min(Math.max(value, 0), 1) * segments);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <div className="flex items-baseline justify-between gap-4">
          <span className="spec">{label}</span>
          <span className="font-mono text-[11px] tabular-nums text-carbon">
            {(value * 100).toFixed(0)}%
          </span>
        </div>
      ) : null}
      <div className="flex gap-px" aria-hidden>
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1", i < filled ? "bg-carbon" : "bg-hairline")}
          />
        ))}
      </div>
    </div>
  );
}

/** Indeterminate work. The track indexes forward in steps, like a CNC feed. */
export function IndeterminateBar({ className }: { className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden bg-hairline", className)} aria-hidden>
      <div className="anim-index h-full w-full" />
    </div>
  );
}

/**
 * Compliance Health Score (PRD glossary): 0–100, shown as a machined arc.
 * Monochrome; the value is the message. Lime appears only at full compliance.
 */
export function HealthScore({
  value,
  size = 56,
  label,
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const pct = Math.min(Math.max(value, 0), 100) / 100;
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  const complete = value >= 100;
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={2}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={complete ? "var(--color-lime)" : "var(--color-carbon)"}
          strokeWidth={2}
          strokeDasharray={`${c * pct} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-mono text-[16px] tabular-nums leading-none text-carbon">
          {Math.round(value)}
        </span>
        {label ? <span className="spec mt-1">{label}</span> : null}
      </div>
    </div>
  );
}
