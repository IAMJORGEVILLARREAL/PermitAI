"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion, motion } from "motion/react";
import { useRef } from "react";

type Props = {
  score?: number;
  size?: number;
  className?: string;
};

function scoreColor(score: number) {
  if (score < 70) return "var(--signal-hot)";
  if (score < 90) return "var(--signal)";
  return "var(--verified)";
}

export function HealthDonut({ score = 94, size = 120, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce ? score : 0);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (current / 100) * circumference;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCurrent(score);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(score * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, score, reduce]);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth="6"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor(current)}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke 0.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold tracking-tight text-paper">
          {current}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
          Health
        </span>
      </div>
    </div>
  );
}
