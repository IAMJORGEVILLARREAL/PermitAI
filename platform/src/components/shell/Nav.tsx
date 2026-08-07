"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type NavItem = {
  href: string;
  label: string;
  /** Rendered as a mono count on the right rail. */
  count?: number;
};

/**
 * Primary navigation. The current section is the sanctioned lime: a 3px
 * marker on the left edge, and nothing else changes color.
 */
export function Nav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex h-9 items-center justify-between pl-5 pr-4 text-[13px]",
              "transition-colors duration-[100ms]",
              active ? "text-carbon" : "text-steel hover:bg-fog/70 hover:text-carbon",
            )}
          >
            {active ? (
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-lime" />
            ) : null}
            <span>{item.label}</span>
            {typeof item.count === "number" && item.count > 0 ? (
              <span className="font-mono text-[10px] tabular-nums text-concrete">
                {item.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
