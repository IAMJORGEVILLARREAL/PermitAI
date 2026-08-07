import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ==========================================================================
   Data tables. Horizontal hairlines only — no vertical rules, no zebra.
   ========================================================================== */

export type Column<T> = {
  key: string;
  header: ReactNode;
  /** Right-align and set tabular figures. Use for every quantity and price. */
  numeric?: boolean;
  width?: string;
  render: (row: T, index: number) => ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  activeKey,
  empty,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  /** Key of the currently selected row — the lime marker lands here. */
  activeKey?: string;
  empty?: ReactNode;
  className?: string;
}) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>;
  }
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      <thead>
        <tr className="border-b border-hairline-strong">
          {columns.map((c) => (
            <th
              key={c.key}
              scope="col"
              style={c.width ? { width: c.width } : undefined}
              className={cn(
                "spec whitespace-nowrap px-3 pb-2 pt-0 font-normal",
                c.numeric && "text-right",
              )}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const key = rowKey(row, i);
          const active = activeKey === key;
          return (
            <tr
              key={key}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-b border-hairline transition-colors duration-[100ms]",
                onRowClick && "cursor-pointer hover:bg-fog/60",
                active && "bg-fog/70",
              )}
            >
              {columns.map((c, ci) => (
                <td
                  key={c.key}
                  className={cn(
                    "relative px-3 py-2.5 align-middle text-[13px] text-carbon",
                    c.numeric && "text-right tabular-nums",
                  )}
                >
                  {active && ci === 0 ? (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] bg-lime"
                    />
                  ) : null}
                  {c.render(row, i)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Secondary text inside a cell — a sub-line under the primary value. */
export function CellNote({ children }: { children: ReactNode }) {
  return <div className="mt-0.5 text-[11px] text-steel">{children}</div>;
}

/** Mono cell for IDs, permit numbers, dimensions, revisions. */
export function CellMono({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-[12px] tabular-nums text-carbon", className)}>
      {children}
    </span>
  );
}
