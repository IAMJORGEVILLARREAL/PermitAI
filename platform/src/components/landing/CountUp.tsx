"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (reduced) {
      setDisplay(format(value));
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tick = (ts: number) => {
          if (start === null) start = ts;
          const t = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
