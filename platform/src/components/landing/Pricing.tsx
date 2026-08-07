import { Reveal } from "./Reveal";

const GC_TIERS = [
  {
    name: "Pro",
    price: "$499",
    period: "/mo",
    note: "Billed annually",
    body: "Up to 5 active projects. Plan analysis, scope decomposition, permit roadmap, marketplace posting, compliance dashboard.",
    cta: "Request access",
    href: "#request",
    featured: false,
  },
  {
    name: "Business",
    price: "$1,299",
    period: "/mo",
    note: "Most chosen · billed annually",
    body: "Up to 25 active projects. Adds advanced sub management, white-labeled bid packages, code change monitoring, priority support.",
    cta: "Request access",
    href: "#request",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    note: "$3k–$8k/mo typical",
    body: "Unlimited projects. API, SSO, dedicated CSM, Procore and Autodesk integrations.",
    cta: "Contact sales",
    href: "#request",
    featured: false,
  },
];

const SUB_TIERS = [
  {
    k: "Subcontractor",
    v: "Free",
    n: "Receive matched invitations, submit sealed bids, manage awarded contracts and permit acknowledgements.",
  },
  {
    k: "Sub Pro",
    v: "$149/mo",
    n: "Priority placement, instant trade alerts, portfolio showcase, historical pricing analytics.",
  },
  {
    k: "On award",
    v: "4.5%",
    n: "Of awarded subcontract value, capped at $2,000 per contract. Charged only when the work is won.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-hairline bg-fog/40">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">F1.01 / Terms</div>
          <h2 className="max-w-[16ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            Subscription for GCs. Success fee for subs.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-hairline md:grid-cols-3">
          {GC_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 50}>
              <article
                className={
                  tier.featured
                    ? "flex h-full flex-col bg-carbon p-7 text-fog sm:p-8"
                    : "flex h-full flex-col bg-paper p-7 sm:p-8"
                }
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={
                      tier.featured
                        ? "font-display text-[22px] font-medium tracking-[-0.02em] text-white"
                        : "font-display text-[22px] font-medium tracking-[-0.02em] text-carbon"
                    }
                  >
                    {tier.name}
                  </h3>
                  {tier.featured ? (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-lime">
                      Most chosen
                    </span>
                  ) : null}
                </div>
                <p
                  className={
                    tier.featured
                      ? "mt-4 text-[13px] leading-relaxed text-concrete"
                      : "mt-4 text-[13px] leading-relaxed text-steel"
                  }
                >
                  {tier.body}
                </p>
                <p
                  className={
                    tier.featured
                      ? "mt-8 font-display text-[36px] font-medium tracking-[-0.03em] text-white"
                      : "mt-8 font-display text-[36px] font-medium tracking-[-0.03em] text-carbon"
                  }
                >
                  {tier.price}
                  {tier.period ? (
                    <span
                      className={
                        tier.featured
                          ? "ml-1 text-[14px] text-concrete"
                          : "ml-1 text-[14px] text-steel"
                      }
                    >
                      {tier.period}
                    </span>
                  ) : null}
                </p>
                <p
                  className={
                    tier.featured
                      ? "mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete"
                      : "mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete"
                  }
                >
                  {tier.note}
                </p>
                <a
                  href={tier.href}
                  className={
                    tier.featured
                      ? "relative mt-8 inline-flex h-10 w-fit items-center bg-white px-4 pl-5 text-[13px] font-medium text-carbon transition-[transform,background-color] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-lime hover:bg-fog active:translate-y-px"
                      : "mt-8 inline-flex h-10 w-fit items-center px-4 text-[13px] font-medium text-carbon shadow-[inset_0_0_0_1px_var(--color-hairline-strong)] transition-[background-color,transform] hover:bg-fog/70 active:translate-y-px"
                  }
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-px bg-hairline md:grid-cols-3">
            {SUB_TIERS.map((s) => (
              <div key={s.k} className="bg-paper p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                  {s.k}
                </p>
                <p className="mt-3 font-display text-[24px] font-medium tracking-[-0.02em] text-carbon">
                  {s.v}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-steel">{s.n}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
