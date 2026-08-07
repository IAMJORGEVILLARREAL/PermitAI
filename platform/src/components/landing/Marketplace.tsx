import Image from "next/image";
import { CornerBrackets, RegistrationMark } from "@/components/artifacts/marks";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const MATCH_CRITERIA = [
  {
    code: "01",
    title: "License match",
    body: "Verified trade license in the project jurisdiction. Expired or invalid credentials suspend marketplace access automatically.",
  },
  {
    code: "02",
    title: "Bonding & insurance",
    body: "Bonding capacity checked against estimated scope value. COIs are parsed for limits and dates, with 30-day expiry flags.",
  },
  {
    code: "03",
    title: "Work radius",
    body: "Only subcontractors whose declared service area covers the jobsite receive the invitation.",
  },
  {
    code: "04",
    title: "Performance graph",
    body: "Composite rating from safety, schedule, quality, and communication on prior platform work. Capacity signals weight the rank.",
  },
];

const FLOW = [
  {
    step: "01",
    title: "Confirm the package",
    body: "Review the AI-quantified Scope Package, adjust quantities, add notes, set a bid deadline.",
  },
  {
    step: "02",
    title: "Post to marketplace",
    body: "One click invites ranked, pre-vetted subs. They receive the takeoff-ready package—not a 100-page blast.",
  },
  {
    step: "03",
    title: "Sealed bidding",
    body: "Amounts stay hidden until the deadline. You see who was invited and who viewed the package.",
  },
  {
    step: "04",
    title: "Level and award",
    body: "Side-by-side bids with ratings and history. Award generates the subcontract with the scope as an exhibit.",
  },
];

export function Marketplace() {
  return (
    <section id="marketplace" className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">B1.01 / Marketplace</div>
          <h2 className="max-w-[16ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            A closed-loop market for quantified scopes.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-steel">
            BuildScope is not a bid board. AI-generated Scope Packages are matched
            to subcontractors who are licensed, insured, and rated for the work—
            then every award feeds performance data back into the next match.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal delay={60}>
            <CornerBrackets className="p-1" size={10}>
              <div className="relative aspect-[4/3] overflow-hidden bg-fog">
                <Image
                  src="/images/hands-plans.jpg"
                  alt="Hands marking quantities on a drawing set with a pencil and scale rule."
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </CornerBrackets>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
              Pre-extracted bid package · takeoff already done
            </p>
          </Reveal>

          <div className="flex flex-col justify-center gap-8">
            {FLOW.map((item, i) => (
              <Reveal key={item.step} delay={80 + i * 50}>
                <article className="grid grid-cols-[auto_1fr] gap-4 border-t border-hairline pt-5 first:border-t-0 first:pt-0">
                  <span className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-concrete">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-medium tracking-[-0.02em] text-carbon">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-steel">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={40}>
          <div className="mt-24 flex items-end justify-between gap-6 border-t border-hairline pt-10">
            <div>
              <div className="spec mb-3">B1.02 / Matching</div>
              <h3 className="max-w-[18ch] font-display text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-carbon">
                How a sub gets invited.
              </h3>
            </div>
            <RegistrationMark className="hidden shrink-0 sm:block" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2">
          {MATCH_CRITERIA.map((c, i) => (
            <Reveal key={c.code} delay={i * 40}>
              <article className="h-full bg-paper p-6 sm:p-8">
                <span className="font-mono text-[10px] tracking-[0.14em] text-concrete">
                  MATCH / {c.code}
                </span>
                <h4 className="mt-4 font-display text-[20px] font-medium tracking-[-0.02em] text-carbon">
                  {c.title}
                </h4>
                <p className="mt-3 max-w-prose text-[13px] leading-relaxed text-steel">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <Reveal>
            <div className="spec mb-3">B1.03 / Bid leveling</div>
            <h3 className="max-w-[14ch] font-display text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-carbon">
              Competitive bids. Verified names.
            </h3>
            <p className="mt-4 max-w-[40ch] text-[13px] leading-relaxed text-steel">
              After the deadline, compare sealed bids side by side—rating, prior
              platform work, amount, and notes—then award without leaving the
              record.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="overflow-x-auto shadow-[inset_0_0_0_1px_var(--color-hairline)]">
              <table className="w-full min-w-[520px] text-left text-[13px]">
                <caption className="sr-only">
                  Illustrative bid leveling table for a Division 03 scope package
                </caption>
                <thead>
                  <tr className="border-b border-hairline bg-fog/50">
                    <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Subcontractor
                    </th>
                    <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Rating
                    </th>
                    <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Prior
                    </th>
                    <th className="px-4 py-3 text-right font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Sealed bid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-hairline bg-lime-wash/40">
                    <td className="px-4 py-3.5 text-carbon">Terraline Concrete</td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-steel">4.4</td>
                    <td className="px-4 py-3.5 font-mono text-[11px] tracking-[0.08em] text-concrete">
                      3 jobs
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[13px] text-carbon">
                      $<CountUp value={178900} />
                    </td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-4 py-3.5 text-carbon">Cordero Structural</td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-steel">4.8</td>
                    <td className="px-4 py-3.5 font-mono text-[11px] tracking-[0.08em] text-concrete">
                      11 jobs
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[13px] text-carbon">
                      $<CountUp value={184200} />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 text-carbon">Halvorsen Brothers</td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-steel">4.6</td>
                    <td className="px-4 py-3.5 font-mono text-[11px] tracking-[0.08em] text-concrete">
                      7 jobs
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[13px] text-carbon">
                      $<CountUp value={191750} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between border-t border-hairline px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
                <span>Div 03 · slab & footings · sample data</span>
                <span>Sealed until deadline</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-16 grid gap-px bg-hairline md:grid-cols-3">
            <div className="bg-fog/40 p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                For GCs
              </p>
              <p className="mt-3 font-display text-[22px] font-medium tracking-[-0.02em] text-carbon">
                $0 to post
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-steel">
                General contractors pay no marketplace transaction fee. Post
                scopes, level bids, and award inside the Pro or Business plan.
              </p>
            </div>
            <div className="bg-fog/40 p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                For subcontractors
              </p>
              <p className="mt-3 font-display text-[22px] font-medium tracking-[-0.02em] text-carbon">
                Free to bid
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-steel">
                Receive matched invitations and submit sealed bids at no cost.
                Pay only when you win the work.
              </p>
            </div>
            <div className="material-coated p-6 text-fog sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                On award
              </p>
              <p className="mt-3 font-display text-[22px] font-medium tracking-[-0.02em] text-white">
                4.5% · capped $2,000
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-concrete">
                Success fee on awarded subcontract value, paid by the
                subcontractor at signing. Compliance ledger activates the same
                moment.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
