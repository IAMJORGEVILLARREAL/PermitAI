"use client";

import { useState } from "react";

const BTN =
  "transition duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  who: string;
  points: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Professional",
    price: "$299",
    cadence: "per month, billed annually",
    who: "Small GCs, 5–25 people",
    points: [
      "10 active projects · 3 seats",
      "Unlimited plan analysis",
      "Quote requests to matched crews",
      "Code Change Radar — weekly digest",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$799",
    cadence: "per month, billed annually",
    who: "Mid-size GCs & developers",
    points: [
      "50 active projects · 15 seats",
      "White-label permit reports",
      "Immediate code-change alerts",
      "Priority chat support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "from $2,500 per month",
    who: "National contractors",
    points: [
      "Unlimited projects · SSO",
      "Procore API integration",
      "Custom watch lists",
      "Dedicated CSM with SLA",
    ],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  const [picked, setPicked] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  return (
    <section aria-labelledby="pricing-heading" className="mt-16">
      <div className="flex flex-wrap items-end gap-3">
        <h2 id="pricing-heading" className="display text-3xl">
          Keep every project on the platform
        </h2>
        <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
          This run was free
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Permits change, crews change, and so does your scope. A subscription
        keeps the analysis, the document checklist, and your crew shortlist
        alive for every job you bid.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              tier.featured
                ? "border-[var(--cyan)] bg-[rgba(56,189,248,0.06)] shadow-[0_0_32px_rgba(56,189,248,0.12)]"
                : "border-[var(--line)] bg-[var(--panel)]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="display text-xl font-bold">{tier.name}</span>
              {tier.featured && (
                <span className="rounded-full bg-[var(--cyan)] px-2 py-0.5 text-xs font-bold text-[#041018]">
                  Most popular
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="stat-num display text-4xl font-extrabold">
                {tier.price}
              </span>
            </div>
            <div className="text-sm text-[var(--muted)]">{tier.cadence}</div>
            <div className="mt-1 text-sm text-[var(--teal)]">{tier.who}</div>

            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {tier.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-[var(--ok)]" aria-hidden>
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {sent === tier.name ? (
              <p className="mt-6 rounded-xl border border-[var(--ok)] bg-[rgba(52,211,153,0.1)] px-4 py-3 text-sm font-medium text-[var(--ok)]">
                ✓ Sent — setup link is on its way to {email || "your inbox"}
              </p>
            ) : picked === tier.name ? (
              <form
                className="mt-6 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(tier.name);
                }}
              >
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-3 text-sm outline-none focus:border-[var(--cyan)]"
                />
                <button
                  type="submit"
                  className={`rounded-xl bg-[var(--cyan)] px-4 py-3 text-sm font-bold text-[#041018] ${BTN}`}
                >
                  Go →
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setPicked(tier.name)}
                className={`mt-6 rounded-xl px-5 py-3 text-base font-bold ${
                  tier.featured
                    ? "bg-[var(--cyan)] text-[#041018]"
                    : "border border-[var(--line)] text-[var(--text)]"
                } ${BTN}`}
              >
                {tier.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-[var(--muted)]">
        Need someone to file for you? Concierge permit management runs $499 per
        building permit and $99 per trade permit, billed monthly.
      </p>
    </section>
  );
}
