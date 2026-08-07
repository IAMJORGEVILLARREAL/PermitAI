"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { EASE_EXPO } from "@/lib/motion";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const reduce = useReducedMotion();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("ok");
  }

  return (
    <section id="cta" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <Image
        src="/images/cta-radar-band.jpg"
        alt=""
        fill
        className="object-cover opacity-50"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      {!reduce ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2">
          <div
            className="radar-sweep absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--signal) 45%, transparent) 60deg, transparent 100deg)",
            }}
          />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_40px_var(--signal)]" />
          <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/40 radar-ping" />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-[800px] px-4 text-center md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl lg:text-6xl">
            Stop finding out at inspection.
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-base text-muted md:text-lg">
            Drop your work email. We&apos;ll set up a free plan scan for your next jurisdiction.
          </p>
        </Reveal>

        <motion.form
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
        >
          <label className="sr-only" htmlFor="cta-email">
            Work email
          </label>
          <input
            id="cta-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@gc-company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="h-12 flex-1 rounded-full border border-line bg-surface px-5 text-sm text-paper placeholder:text-muted/70 focus:border-signal focus:outline-none"
            required
          />
          <MagneticButton type="submit" className="justify-center sm:shrink-0">
            Scan Your Plans - Free
          </MagneticButton>
        </motion.form>

        <p className="mt-3 min-h-[1.25rem] font-mono text-xs" aria-live="polite">
          {status === "ok" ? (
            <span className="text-verified">Got it. We&apos;ll be in touch.</span>
          ) : null}
          {status === "error" ? (
            <span className="text-signal-hot">Enter a valid work email.</span>
          ) : null}
        </p>
      </div>
    </section>
  );
}
