"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: ReactNode;
  count?: number;
  content?: ReactNode;
};

/**
 * Tabs. The current selection is the sanctioned use of lime: a 2px rule
 * under the active item, nothing else.
 */
export function Tabs({
  items,
  defaultId,
  onChange,
  className,
  panelClassName,
}: {
  items: TabItem[];
  defaultId?: string;
  onChange?: (id: string) => void;
  className?: string;
  panelClassName?: string;
}) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active);

  return (
    <div className={className}>
      <div role="tablist" className="flex items-stretch gap-6 border-b border-hairline">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActive(item.id);
                onChange?.(item.id);
              }}
              className={cn(
                "relative -mb-px flex items-center gap-2 pb-3 pt-1 text-[13px]",
                "transition-colors duration-[100ms]",
                isActive ? "text-carbon" : "text-steel hover:text-carbon",
              )}
            >
              {item.label}
              {typeof item.count === "number" ? (
                <span className="font-mono text-[10px] tabular-nums text-concrete">
                  {item.count}
                </span>
              ) : null}
              {isActive ? (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-lime" />
              ) : null}
            </button>
          );
        })}
      </div>
      {current?.content ? (
        <div role="tabpanel" className={cn("pt-6", panelClassName)}>
          {current.content}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Segmented control — a mechanical selector. Options butt against each other
 * and the selection snaps.
 */
export function Segmented({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<{ id: string; label: ReactNode }>;
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex shadow-[inset_0_0_0_1px_var(--color-hairline-strong)]",
        className,
      )}
    >
      {options.map((o) => {
        const isActive = o.id === value;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={isActive}
            className={cn(
              "h-8 px-3 text-[12px] transition-colors duration-[100ms]",
              isActive ? "bg-carbon text-white" : "text-steel hover:bg-fog/70",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
