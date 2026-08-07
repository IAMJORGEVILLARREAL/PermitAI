"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    if (!email || !email.includes("@")) {
      setMsg("Enter a valid work email.");
      return;
    }
    setMsg("Received. We will follow up for Miami, Florida.");
    e.currentTarget.reset();
  }

  return (
    <section id="request" className="material-coated text-fog">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Reveal>
          <div className="spec mb-3 !text-concrete">CLOSE / 01</div>
          <h2 className="max-w-[14ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
            Find out at bid time, not at inspection.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-concrete">
            Send one plan set. We return quantified Scope Packages, matched
            marketplace invitations, and a source-linked permit roadmap.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-concrete" htmlFor="landing-email">
              Work email
            </label>
            <input
              id="landing-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className="h-11 border-0 bg-graphite px-4 text-[14px] text-white placeholder:text-steel outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            />
            <button
              type="submit"
              className="relative mt-1 inline-flex h-11 items-center justify-center bg-white px-5 pl-6 text-[14px] font-medium text-carbon transition-[transform,background-color] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-lime hover:bg-fog active:translate-y-px"
            >
              Request access
            </button>
            <p className="min-h-[1.25rem] text-[12px] text-concrete" role="status" aria-live="polite">
              {msg}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel">
              Built for commercial work in Miami, Florida
            </p>
            <a
              href="/login"
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-white"
            >
              Already have demo access? Sign in
            </a>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
