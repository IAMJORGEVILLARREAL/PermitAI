"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { EASE_EXPO } from "@/lib/motion";

type Tier = {
  name: string;
  monthly: number | null;
  blurb: string;
  popular?: boolean;
  features: string[];
  cta: string;
};

const tiers: Tier[] = [
  {
    name: "Professional",
    monthly: 299,
    blurb: "Small GCs who need speed to bid.",
    features: [
      "10 active projects",
      "3 seats",
      "Unlimited plan analysis",
      "5 scope templates",
      "Radar: weekly digest",
      "Sub view & acknowledge",
      "Email support (48hr)",
    ],
    cta: "Start Professional",
  },
  {
    name: "Business",
    monthly: 799,
    blurb: "Mid-size GCs who need live risk control.",
    popular: true,
    features: [
      "50 active projects",
      "15 seats",
      "Unlimited plan analysis",
      "25 scope templates",
      "Radar: immediate alerts",
      "White-label reporting",
      "Priority chat + email",
    ],
    cta: "Start Business",
  },
  {
    name: "Enterprise",
    monthly: null,
    blurb: "National contractors. Custom control plane.",
    features: [
      "Unlimited projects",
      "Custom seats + SSO",
      "Unlimited templates",
      "Radar: custom watch lists",
      "Procore API access",
      "Custom domain reports",
      "Dedicated CSM + SLA",
    ],
    cta: "Talk to sales",
  },
];

function priceLabel(monthly: number | null, annual: boolean) {
  if (monthly === null) return "Custom";
  const value = annual ? Math.round(monthly * 0.9) : monthly;
  return `$${value}`;
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            Pricing that costs less than one delay.
          </h2>
          <p className="mt-4 max-w-[48ch] text-base text-muted">
            Annual billing saves 10%. Add Concierge or Project Top-Up packs when you need them.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                !annual ? "bg-surface-2 text-paper" : "text-muted"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                annual ? "bg-signal text-ink" : "text-muted"
              }`}
            >
              Annual
              <span className="ml-1.5 font-mono text-[10px]">-10%</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Reveal key={tier.name}>
              <article
                className={`relative flex h-full flex-col rounded-[18px] border p-1.5 ${
                  tier.popular
                    ? "border-signal/50 shadow-[0_0_60px_color-mix(in_srgb,var(--signal)_18%,transparent)]"
                    : "border-white/10"
                } bg-black/20`}
              >
                {tier.popular ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                    Most popular
                  </span>
                ) : null}
                <div className="flex h-full flex-col rounded-[calc(18px-0.375rem)] border border-line bg-surface p-6">
                  <h3 className="font-display text-xl font-medium text-paper">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{tier.blurb}</p>
                  <div className="mt-5 flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${tier.name}-${annual}`}
                        className="font-display text-4xl font-semibold tracking-tight text-paper"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: EASE_EXPO }}
                      >
                        {priceLabel(tier.monthly, annual)}
                      </motion.span>
                    </AnimatePresence>
                    {tier.monthly !== null ? (
                      <span className="mb-1 text-sm text-muted">/mo</span>
                    ) : null}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <Check
                          weight="bold"
                          className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <MagneticButton
                      href="#cta"
                      variant={tier.popular ? "primary" : "secondary"}
                      className="w-full justify-center"
                      showArrow={tier.popular}
                    >
                      {tier.cta}
                    </MagneticButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-[14px] border border-line bg-surface/70 px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
              Add-on
            </p>
            <p className="mt-1 text-sm text-paper">
              Project Top-Up packs: $99 for 5 additional active slots (Professional).
            </p>
          </div>
          <div className="rounded-[14px] border border-line bg-surface/70 px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
              Add-on
            </p>
            <p className="mt-1 text-sm text-paper">
              Concierge: $499/building permit, $99/trade permit, billed monthly in arrears.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
