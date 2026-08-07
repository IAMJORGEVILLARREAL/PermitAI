import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ==========================================================================
   Labels & tags. Industrial asset labels, not UI chrome.
   ========================================================================== */

/**
 * Barcode label. Bars are derived deterministically from the value so the
 * same ID always prints the same label — it reads as a real asset tag.
 */
export function BarcodeLabel({
  value,
  caption,
  height = 28,
  className,
}: {
  value: string;
  caption?: string;
  height?: number;
  className?: string;
}) {
  const bars = barsFor(value);
  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <svg
        width={bars.length * 2}
        height={height}
        viewBox={`0 0 ${bars.length * 2} ${height}`}
        aria-hidden
        className="text-carbon"
        shapeRendering="crispEdges"
      >
        {bars.map((w, i) =>
          w ? (
            <rect key={i} x={i * 2} y={0} width={w} height={height} fill="currentColor" />
          ) : null,
        )}
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-steel">
        {caption ?? value}
      </span>
    </div>
  );
}

function barsFor(value: string): number[] {
  // Deterministic pseudo-encoding: stable per string, visually plausible.
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const out: number[] = [];
  for (let i = 0; i < 44; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    const bit = Math.abs(h) % 3;
    out.push(bit === 0 ? 0 : bit === 1 ? 1 : 1.5);
  }
  // Quiet zones and guard bars, like a real symbology.
  out[0] = 1;
  out[1] = 0;
  out[out.length - 2] = 0;
  out[out.length - 1] = 1;
  return out;
}

/**
 * Material tag — the small spec plate riveted to a part.
 * Used for trade divisions, jurisdictions, occupancy classes.
 */
export function MaterialTag({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 px-2.5 py-1.5 shadow-[inset_0_0_0_1px_var(--color-hairline)]",
        className,
      )}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-concrete">
        {label}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-carbon">{value}</span>
    </div>
  );
}

/**
 * Specification table. The core data surface of the whole product:
 * hairline rules, mono keys, tabular values, no zebra striping.
 */
export function SpecTable({
  rows,
  dense,
  className,
}: {
  rows: Array<{
    key: string;
    value: ReactNode;
    /** Marks the row as machine-proposed rather than confirmed. */
    suggested?: boolean;
  }>;
  dense?: boolean;
  className?: string;
}) {
  return (
    <dl className={cn("w-full", className)}>
      {rows.map((row) => (
        <div
          key={row.key}
          className={cn(
            "flex items-baseline justify-between gap-6 border-b border-hairline",
            dense ? "py-1.5" : "py-2.5",
          )}
        >
          <dt className="spec shrink-0">{row.key}</dt>
          <dd
            className={cn(
              "min-w-0 text-right text-[13px] tabular-nums text-carbon",
              row.suggested && "text-steel",
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Sheet reference, e.g. A1.01 / S2.03. Always mono, always exact.
 */
export function SheetRef({
  sheet,
  title,
  active,
  className,
}: {
  sheet: string;
  title?: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "px-1.5 py-0.5 font-mono text-[11px] tabular-nums tracking-[0.04em]",
          active
            ? "bg-lime text-carbon"
            : "text-carbon shadow-[inset_0_0_0_1px_var(--color-hairline-strong)]",
        )}
      >
        {sheet}
      </span>
      {title ? <span className="truncate text-[12px] text-steel">{title}</span> : null}
    </span>
  );
}

/**
 * Title block — the drawing's identity strip. Reduced to hairlines and
 * mono keys, the way a specification book would set it.
 */
export function TitleBlock({
  project,
  fields,
  sheet,
  rev,
  className,
}: {
  project: string;
  fields: Array<{ key: string; value: ReactNode }>;
  sheet?: string;
  rev?: string;
  className?: string;
}) {
  return (
    <div className={cn("shadow-[inset_0_0_0_1px_var(--color-hairline)]", className)}>
      <div className="flex items-baseline justify-between gap-6 border-b border-hairline px-4 py-3">
        <span className="font-display text-[15px] font-medium tracking-[-0.02em] text-carbon">
          {project}
        </span>
        {rev ? <span className="spec">REV {rev}</span> : null}
      </div>
      <div className="grid grid-cols-2 gap-x-6 px-4 py-3 sm:grid-cols-4">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1 py-1">
            <span className="spec">{f.key}</span>
            <span className="font-mono text-[12px] tabular-nums text-carbon">
              {f.value}
            </span>
          </div>
        ))}
      </div>
      {sheet ? (
        <div className="flex items-center justify-between border-t border-hairline px-4 py-2">
          <span className="spec">SHEET</span>
          <span className="font-mono text-[13px] tabular-nums text-carbon">{sheet}</span>
        </div>
      ) : null}
    </div>
  );
}
