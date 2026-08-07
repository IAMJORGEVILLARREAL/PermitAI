"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const boxes = [
  { x: 12, y: 18, w: 28, h: 22, color: "#FF5A5A", label: "structural" },
  { x: 48, y: 30, w: 24, h: 18, color: "#4C8DFF", label: "mep" },
  { x: 30, y: 58, w: 36, h: 16, color: "#FFB020", label: "egress" },
];

const permits = [
  { name: "Building permit", cite: "IBC 2021 §105.1", kind: "code" as const },
  { name: "Fire sprinkler", cite: "IFC §903.2", kind: "code" as const },
  { name: "Egress path review", cite: "IBC §1006.2", kind: "code" as const },
  { name: "Mech. exhaust note", cite: "AI suggestion", kind: "ai" as const },
];

export function GroundTruth() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gt-box",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".gt-row",
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Confidence, not certainty.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base text-muted md:text-lg">
            Every permit is source-linked to the municipal code section with a confidence score. GenAI is never the final recommendation.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="mt-12 grid gap-4 overflow-hidden rounded-[18px] border border-line bg-surface lg:grid-cols-2"
        >
          <div className="relative min-h-[320px] border-b border-line bg-ink/70 p-6 lg:border-b-0 lg:border-r">
            <div className="absolute inset-6 blueprint-grid opacity-50" />
            <p className="relative z-[1] font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Plan sheet · Level 02
            </p>
            <svg
              className="relative z-[1] mt-4 h-[240px] w-full"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <rect
                x="8"
                y="12"
                width="84"
                height="76"
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.6"
              />
              <path
                d="M20 20 H80 V80 H20 Z M20 50 H80 M50 20 V80"
                stroke="var(--muted)"
                strokeWidth="0.4"
                fill="none"
                opacity="0.5"
              />
              {boxes.map((b) => (
                <g key={b.label} className="gt-box" style={{ transformOrigin: "center" }}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    fill="none"
                    stroke={b.color}
                    strokeWidth="0.8"
                  />
                  <text
                    x={b.x + 1}
                    y={b.y - 1.5}
                    fill={b.color}
                    fontSize="3"
                    fontFamily="var(--font-jetbrains-mono), monospace"
                  >
                    {b.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Permit list
            </p>
            <ul className="mt-4 space-y-3">
              {permits.map((p) => (
                <li
                  key={p.name}
                  className="gt-row flex items-start justify-between gap-3 rounded-[12px] border border-line bg-ink/40 px-3 py-3"
                >
                  <div>
                    <p className="text-sm text-paper">{p.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">{p.cite}</p>
                  </div>
                  {p.kind === "code" ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-verified">
                      <CheckCircle weight="fill" className="h-4 w-4" />
                      code-backed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-signal">
                      <WarningCircle weight="fill" className="h-4 w-4" />
                      AI suggestion
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted">
              AI-Generated Advisory Draft for Professional Validation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
