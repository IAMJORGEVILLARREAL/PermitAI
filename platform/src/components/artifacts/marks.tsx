import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ==========================================================================
   Graphic language. Hairlines, marks, ticks. Nothing decorative.
   ========================================================================== */

/**
 * Small corner brackets. Frames a region without drawing a box around it.
 */
export function CornerBrackets({
  children,
  className,
  size = 8,
  tone = "concrete",
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  tone?: "concrete" | "carbon" | "lime";
}) {
  const color =
    tone === "lime"
      ? "border-lime"
      : tone === "carbon"
        ? "border-carbon"
        : "border-concrete";
  const s = { width: size, height: size };
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        style={s}
        className={cn("absolute left-0 top-0 border-l border-t", color)}
      />
      <span
        aria-hidden
        style={s}
        className={cn("absolute right-0 top-0 border-r border-t", color)}
      />
      <span
        aria-hidden
        style={s}
        className={cn("absolute bottom-0 left-0 border-b border-l", color)}
      />
      <span
        aria-hidden
        style={s}
        className={cn("absolute bottom-0 right-0 border-b border-r", color)}
      />
      {children}
    </div>
  );
}

/** Printer's registration mark. */
export function RegistrationMark({
  size = 14,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
      className={cn("text-concrete", className)}
    >
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 1v9.5M12 13.5V23M1 12h9.5M13.5 12H23" />
    </svg>
  );
}

/** Crosshair — marks a coordinate or a detection anchor. */
export function Crosshair({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
      className={cn("text-carbon", className)}
    >
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      <rect x="9.5" y="9.5" width="5" height="5" />
    </svg>
  );
}

/** Tiny alignment dots. Used to imply a grid without drawing one. */
export function AlignmentDots({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="h-[2px] w-[2px] bg-concrete" />
      ))}
    </span>
  );
}

/**
 * Dimension line with arrow terminals and an inset label — the way a
 * measurement is called out on a drawing.
 */
export function DimensionLine({
  label,
  orientation = "horizontal",
  className,
}: {
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "vertical") {
    return (
      <div className={cn("flex h-full w-6 flex-col items-center", className)}>
        <Arrow dir="up" />
        <span className="w-px flex-1 bg-concrete" />
        <span className="my-1 -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-steel">
          {label}
        </span>
        <span className="w-px flex-1 bg-concrete" />
        <Arrow dir="down" />
      </div>
    );
  }
  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <Arrow dir="left" />
      <span className="h-px flex-1 bg-concrete" />
      <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-steel">
        {label}
      </span>
      <span className="h-px flex-1 bg-concrete" />
      <Arrow dir="right" />
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" | "up" | "down" }) {
  const rotate = { left: 0, up: 90, right: 180, down: 270 }[dir];
  return (
    <svg
      width="6"
      height="8"
      viewBox="0 0 6 8"
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)` }}
      className="shrink-0 text-concrete"
    >
      <path d="M6 0 0 4l6 4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

/** Machined measurement edge. A ruler, reduced to its ticks. */
export function ScaleRule({
  className,
  labels,
}: {
  className?: string;
  labels?: string[];
}) {
  return (
    <div className={cn("select-none", className)} aria-hidden>
      <div className="material-ticks h-2 w-full" />
      {labels ? (
        <div className="mt-1 flex justify-between font-mono text-[9px] tracking-[0.1em] text-concrete">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Tiny coordinate readout. */
export function Coordinate({
  x,
  y,
  sheet,
  className,
}: {
  x: number;
  y: number;
  sheet?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] tabular-nums tracking-[0.08em] text-steel",
        className,
      )}
    >
      {sheet ? <span className="text-concrete">{sheet}</span> : null}
      <span>
        X{x.toFixed(2)} Y{y.toFixed(2)}
      </span>
    </span>
  );
}

/** Serial number — laser-etched, always mono, always uppercase. */
export function SerialNumber({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-concrete",
        className,
      )}
    >
      {label ? <span className="text-concrete/70">{label}</span> : null}
      <span className="text-steel">{value}</span>
    </span>
  );
}

/** Revision identifier, as it appears in a revision block. */
export function RevisionId({
  rev,
  date,
  className,
}: {
  rev: string | number;
  date?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex h-4 min-w-4 items-center justify-center px-1 font-mono text-[10px] tabular-nums text-carbon shadow-[inset_0_0_0_1px_var(--color-hairline-strong)]">
        {rev}
      </span>
      {date ? (
        <span className="font-mono text-[10px] tracking-[0.08em] text-concrete">
          {date}
        </span>
      ) : null}
    </span>
  );
}
