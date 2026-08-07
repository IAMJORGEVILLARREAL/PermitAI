"use client";

import { motion, useReducedMotion } from "motion/react";
import { XCircle } from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";
import { EASE_EXPO } from "@/lib/motion";

const traps = [
  {
    title: "Re-entry every project",
    body: "Same scope. Same jurisdictions. Typed in again from scratch.",
  },
  {
    title: "Static after day one",
    body: "One-and-done calculators go blind the moment a code amends.",
  },
  {
    title: "Single-player handoff",
    body: "No shared ledger. Subs guess ownership. Audit trails vanish.",
  },
];

export function Problem() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="max-w-[14ch] font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            The One-and-Done Trap.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            Permit delays and fines cost construction $5B+ a year. Existing tools are convenience calculators, not risk systems.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 md:grid-cols-3">
          {traps.map((trap, i) => (
            <RevealItem key={trap.title}>
              <motion.article
                className="group relative overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition-[border-color,transform,background] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal-hot/40 hover:bg-surface-2"
                initial={false}
                whileInView={
                  reduce
                    ? undefined
                    : {
                        x: [0, -1, 1, -1, 0],
                      }
                }
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.45,
                  ease: EASE_EXPO,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <XCircle weight="duotone" className="h-6 w-6 text-signal-hot" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal-hot/80 line-through">
                    old way
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight text-paper line-through decoration-signal-hot/70 decoration-1">
                  {trap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{trap.body}</p>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <div className="absolute inset-0 blueprint-grid opacity-20" />
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-12 max-w-2xl rounded-[14px] border border-signal/25 bg-signal/5 p-6" delay={0.1}>
          <p className="font-display text-xl tracking-tight text-paper md:text-2xl">
            We lock in your project&apos;s regulatory baseline and monitor it for you.
          </p>
          <p className="mt-2 text-sm text-muted">
            From convenience to an un-cancelable risk-management utility.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
