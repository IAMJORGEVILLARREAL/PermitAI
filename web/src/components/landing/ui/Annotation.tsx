"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_EXPO } from "@/lib/motion";

type Props = {
  label: string;
  className?: string;
  align?: "left" | "right";
};

export function Annotation({ label, className = "", align = "left" }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute z-10 flex items-center gap-2 ${className}`}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.2 }}
    >
      {align === "right" ? (
        <>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
            {label}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-signal/40 radar-ping" />
            <span className="relative h-2 w-2 rounded-full bg-signal" />
          </span>
          <motion.span
            className="h-px w-10 origin-right bg-signal/70"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.35 }}
          />
        </>
      ) : (
        <>
          <motion.span
            className="h-px w-10 origin-left bg-signal/70"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.35 }}
          />
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-signal/40 radar-ping" />
            <span className="relative h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
            {label}
          </span>
        </>
      )}
    </motion.div>
  );
}
