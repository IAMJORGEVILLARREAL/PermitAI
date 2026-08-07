"use client";

import {
  HardDrives,
  LinkSimple,
  LockKey,
  ShieldCheck,
  TreeStructure,
} from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";

const rows = [
  {
    icon: TreeStructure,
    title: "Hard-coded rules engine",
    body: "GenAI drafts. Deterministic matching decides. No hallucinated final recommendation.",
  },
  {
    icon: LinkSimple,
    title: "Source citations",
    body: "Every permit links to the exact municipal code section plus a confidence score.",
  },
  {
    icon: HardDrives,
    title: "Immutable audit log",
    body: "Who acknowledged what, when. Built for insurers, owners, and Stop Work reviews.",
  },
  {
    icon: LockKey,
    title: "AES-256 / TLS 1.3",
    body: "Encryption in transit and at rest. Tenant isolation for Enterprise schemas.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 in progress",
    body: "Controls designed for mid-market GC procurement from day one.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Defensible by design.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base text-muted md:text-lg">
            Trust is not a badge row. It is how recommendations are produced, cited, and retained.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <RevealItem key={row.title}>
              <article className="h-full rounded-[14px] border border-line bg-surface p-5 transition-[border-color,background] duration-300 hover:border-verified/35 hover:bg-surface-2">
                <row.icon weight="duotone" className="h-6 w-6 text-verified" />
                <h3 className="mt-4 font-display text-lg font-medium text-paper">
                  {row.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10 rounded-[14px] border border-signal/30 bg-signal/5 px-5 py-4" delay={0.05}>
          <p className="font-mono text-xs leading-relaxed text-paper md:text-sm">
            PermitAI output is an AI-generated advisory draft for professional validation. Not a licensed design or legal service.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
