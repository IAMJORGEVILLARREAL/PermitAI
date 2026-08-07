"use client";

import Image from "next/image";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";

const personas = [
  {
    name: "Paul",
    role: "Small GC owner",
    pain: "Bids die waiting on permit lists.",
    outcome: "Scope-to-list in under 90 seconds. Project #2 inherits the genome.",
    stat: "<90s to bid-ready list",
    image: "/images/persona-paul.jpg",
    quote:
      "I used to rebuild the same permit matrix every bid. Now the baseline rides with the project.",
  },
  {
    name: "Maria",
    role: "Compliance manager",
    pain: "A sub's expired permit can stop the whole site.",
    outcome: "One ledger. Timestamped ownership. Audit trail for insurers.",
    stat: "1 shared ledger",
    image: "/images/persona-maria.jpg",
    quote:
      "When the owner asks who owns the electrical permit, I answer in one screen, not twelve threads.",
  },
  {
    name: "Ray",
    role: "Permit expeditor",
    pain: "Incomplete plans. Municipal rabbit holes. Messy billing.",
    outcome: "Throughput up. Source-linked lists justify every fee.",
    stat: "5→25 jurisdictions",
    image: "/images/persona-ray.jpg",
    quote:
      "Clients send half a set. I still return a source-linked list they can defend.",
  },
];

export function UseCases() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Built for the people who eat the delay.
          </h2>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Illustrative personas - not real customer quotes.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {personas.map((p) => (
            <RevealItem key={p.name}>
              <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-black/20 p-1.5 transition-[transform,border-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                <div className="flex h-full flex-col overflow-hidden rounded-[calc(18px-0.375rem)] border border-line bg-surface">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={p.image}
                      alt={`Illustrative portrait of ${p.name}, ${p.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-medium text-paper">
                        {p.name}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {p.role}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      <span className="text-signal-hot">Pain:</span> {p.pain}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      <span className="text-verified">Outcome:</span> {p.outcome}
                    </p>
                    <blockquote className="mt-4 border-l border-signal/40 pl-3 text-sm leading-relaxed text-paper/90">
                      “{p.quote}”
                    </blockquote>
                    <p className="mt-auto pt-5 font-mono text-xs text-signal">{p.stat}</p>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
