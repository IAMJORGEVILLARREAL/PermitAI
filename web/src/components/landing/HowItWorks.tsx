"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Upload plans",
    body: "PDF, DWG, or RVT. AI classifies, OCRs, and extracts scope tags.",
    image: "/images/how-upload.jpg",
    alt: "Plan sheets scanned by a glowing line",
  },
  {
    title: "Reason against the graph",
    body: "A deterministic rules engine matches scope to a versioned Regulatory Graph. Source-linked permit list in under 90 seconds.",
    image: "/images/how-reason.jpg",
    alt: "Regulatory node graph lighting up",
  },
  {
    title: "Radar watches",
    body: "Cited code sections stay under watch. Your team gets the alert before inspection does.",
    image: "/images/how-radar.jpg",
    alt: "Radar dish catching an amber signal ping",
  },
];

export function HowItWorks() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !path.current) return;
    const length = path.current.getTotalLength();
    path.current.style.strokeDasharray = `${length}`;
    path.current.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="how" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Upload. Reason. Watch.
          </h2>
          <p className="mt-4 max-w-[48ch] text-base text-muted md:text-lg">
            GenAI drafts. A hard-coded rules engine decides. Radar keeps the baseline alive.
          </p>
        </Reveal>

        <div ref={wrap} className="relative mt-14">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-[72px] hidden h-8 w-full md:block"
            viewBox="0 0 1000 40"
            fill="none"
            aria-hidden
          >
            <path
              ref={path}
              d="M80 20 H920"
              stroke="var(--signal)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <Reveal key={step.title} as="li">
                <article className="rounded-[18px] border border-white/10 bg-black/20 p-1.5">
                  <div className="overflow-hidden rounded-[calc(18px-0.375rem)] border border-line bg-surface">
                    <div className="relative aspect-square">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-medium tracking-tight text-paper">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
