"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Annotation } from "./ui/Annotation";
import { Reveal } from "./ui/Reveal";
import { EASE_EXPO } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const radarRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !radarRef.current || !alertRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: radarRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.fromTo(
        ".radar-detect-ring",
        { scale: 0.3, opacity: 0 },
        { scale: 1.6, opacity: 0, duration: 1, stagger: 0.2 },
        0,
      )
        .fromTo(
          ".radar-hit",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.35,
        )
        .fromTo(
          alertRef.current,
          { x: 48, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          0.55,
        );
    }, radarRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="product" className="border-t border-line">
      {/* Code Change Radar - cinematic */}
      <div ref={radarRef} id="radar" className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src="/images/radar-feature.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center gap-10 px-4 py-24 md:px-6 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-lg">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
              Code Change Radar™
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
              Insurance against rework.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              When a jurisdiction amends code that hits your live project, Radar correlates the change and surfaces the exact trigger. Before the Stop Work Order does.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative mx-auto aspect-square max-w-[360px]">
              <div className="absolute inset-0 rounded-full border border-line/80" />
              <div className="absolute inset-10 rounded-full border border-line/60" />
              <div className="absolute inset-20 rounded-full border border-line/40" />
              <div
                className="radar-sweep absolute inset-0 rounded-full opacity-80"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--signal) 40%, transparent) 55deg, transparent 90deg)",
                }}
              />
              <span className="radar-detect-ring absolute inset-[18%] rounded-full border border-signal/50" />
              <span className="radar-detect-ring absolute inset-[10%] rounded-full border border-signal/30" />
              <span className="radar-hit absolute left-[64%] top-[30%] h-3 w-3 rounded-full bg-signal shadow-[0_0_24px_var(--signal)]" />
            </div>

            <motion.div
              ref={alertRef}
              className="mt-6 rounded-[14px] border border-signal/40 bg-surface/95 p-4 shadow-[0_0_40px_color-mix(in_srgb,var(--signal)_18%,transparent)] backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                Amendment detected
              </p>
              <p className="mt-2 font-display text-lg tracking-tight text-paper">
                123 Main St - structural shear-wall trigger
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                Re-evaluate §1705.3 · correlated to live scope tags
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Other moats */}
      <div className="mx-auto max-w-[1400px] space-y-24 px-4 py-24 md:px-6 md:py-32">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-4xl">
              Project Genome™
            </h3>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
              Smart defaults from your prior work. Project #2 is set up 60% faster because the genome already knows your scopes, jurisdictions, and templates.
            </p>
            <p className="mt-4 font-mono text-xs text-verified">60% faster repeat setup</p>
          </div>
          <div className="relative">
            <div className="rounded-[18px] border border-white/10 bg-black/20 p-1.5">
              <div className="rounded-[calc(18px-0.375rem)] border border-line bg-surface p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Genome match
                  </span>
                  <span className="font-mono text-[10px] text-verified">0.87</span>
                </div>
                <div className="space-y-2">
                  {["Type IV-A multi-family", "Austin ETJ", "Sprinklered + 4 stories"].map(
                    (row) => (
                      <div
                        key={row}
                        className="flex items-center justify-between rounded-lg border border-line bg-ink/50 px-3 py-2.5 text-sm"
                      >
                        <span className="text-paper">{row}</span>
                        <span className="font-mono text-[10px] text-verified">inherited</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <Annotation label="smart defaults" className="-left-2 top-8 hidden lg:flex" align="right" />
          </div>
        </Reveal>

        <Reveal className="grid items-center gap-10 lg:grid-cols-2" delay={0.05}>
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[18px] border border-white/10 bg-black/20 p-1.5">
              <div className="rounded-[calc(18px-0.375rem)] border border-line bg-surface p-5">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Subcontractor Compliance Ledger
                </div>
                {[
                  { who: "Northline Electric", what: "Electrical permit", state: "Ack'd" },
                  { who: "Forge Mechanical", what: "Mech. permit", state: "Pending" },
                  { who: "Harbor Fire", what: "Fire sprinkler", state: "Ack'd" },
                ].map((row) => (
                  <div
                    key={row.who}
                    className="flex items-center justify-between border-b border-line py-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-paper">{row.who}</p>
                      <p className="font-mono text-[10px] text-muted">{row.what}</p>
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wide ${
                        row.state === "Ack'd" ? "text-verified" : "text-signal"
                      }`}
                    >
                      {row.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Annotation
              label="timestamped ownership"
              className="-right-2 bottom-10 hidden lg:flex"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-4xl">
              Subcontractor Compliance Ledger
            </h3>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
              Shared, timestamped, auditable record of who owns which permit. No more Slack archaeology when an inspector asks.
            </p>
          </div>
        </Reveal>

        <Reveal className="rounded-[18px] border border-line bg-surface p-8 md:p-12" delay={0.05}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-4xl">
                Bid-Ready Intelligence Library
              </h3>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
                Reusable scope templates become proprietary institutional knowledge. Your next bid starts from a verified baseline, not a blank form.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["TI restaurant", "Warehouse shell", "School addition", "Clinic buildout", "Data hall", "Multifamily"].map(
                (t, i) => (
                  <motion.div
                    key={t}
                    className="rounded-[12px] border border-line bg-ink/60 px-3 py-4 transition-[border-color,background] duration-300 hover:border-structural/50 hover:bg-surface-2"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, ease: EASE_EXPO }}
                  >
                    <p className="font-mono text-[10px] text-structural">TEMPLATE</p>
                    <p className="mt-1 text-sm text-paper">{t}</p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
