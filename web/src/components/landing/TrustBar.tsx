"use client";

import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";

const items = [
  { prefix: "$", to: 5, suffix: "B+", label: "lost annually to delays" },
  { prefix: "<", to: 90, suffix: "s", label: "to a permit list" },
  { prefix: "", to: 90, suffix: "%+", label: "scope-tag accuracy" },
  { prefix: "", to: 2, suffix: "", label: "SOC 2 in progress", staticLabel: "SOC 2" },
];

export function TrustBar() {
  return (
    <section aria-label="Key metrics" className="border-y border-line bg-surface/60">
      <Reveal className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-line md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col justify-center bg-ink px-5 py-6 md:px-8 md:py-7"
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-paper md:text-3xl">
              {item.staticLabel ? (
                <span>{item.staticLabel}</span>
              ) : (
                <CountUp
                  prefix={item.prefix}
                  to={item.to}
                  suffix={item.suffix}
                />
              )}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
