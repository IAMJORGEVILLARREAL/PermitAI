"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { MouseEvent } from "react";
import { MagneticButton } from "./ui/MagneticButton";
import { DashboardMock } from "./ui/DashboardMock";
import { CTA_PRIMARY, CTA_SECONDARY, EASE_EXPO } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useSpring(tiltX, { stiffness: 90, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 90, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--signal) 14%, transparent), transparent 55%)`;

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 8);
    tiltX.set(-py * 8);
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-[100dvh] overflow-hidden pt-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-blueprint.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
      </div>

      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />
      ) : null}

      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden h-[340px] w-[340px] md:block">
        <div className="absolute inset-0 rounded-full border border-line/70" />
        <div className="absolute inset-8 rounded-full border border-line/50" />
        <div className="absolute inset-16 rounded-full border border-line/40" />
        <div
          className="radar-sweep absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--signal) 35%, transparent) 50deg, transparent 80deg)",
          }}
        />
        <span className="absolute left-[62%] top-[28%] h-2.5 w-2.5">
          <span className="absolute inset-0 rounded-full bg-signal radar-ping" />
          <span className="relative block h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_20px_var(--signal)]" />
        </span>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-6 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-20 lg:pt-10">
        <div className="max-w-xl">
          <motion.p
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-signal"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            Compliance-as-a-Service // Construction
          </motion.p>

          <motion.h1
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper md:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
          >
            The System of Record for Permit Compliance.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[36ch] text-base leading-relaxed text-muted md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_EXPO }}
          >
            Ingest plans, map every jurisdiction&apos;s live code, and warn your team before a change blows the schedule.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_EXPO }}
          >
            <MagneticButton href="#cta">{CTA_PRIMARY}</MagneticButton>
            <MagneticButton href="#how" variant="ghost" showArrow={false}>
              {CTA_SECONDARY}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          style={
            reduce
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 900,
                }
          }
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_EXPO }}
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
