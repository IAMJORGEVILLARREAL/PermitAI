import Image from "next/image";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Ingest the set",
    body: "Upload PDF, DWG, or RVT. Sheets classify automatically. The address overlays zoning, flood, wetland, and historic-district data.",
    image: "/images/plan-sheet.jpg",
    alt: "Architectural floor plan spread on a drafting table.",
  },
  {
    n: "02",
    title: "Decompose the scope",
    body: "Vision models detect walls, openings, fixtures, and panels, then quantify them into MasterFormat Scope Packages with source coordinates.",
    image: "/images/hands-plans.jpg",
    alt: "Estimator measuring quantities on a plan set with a scale ruler.",
  },
  {
    n: "03",
    title: "Match, bid, award",
    body: "Post a package. Verified subs receive a takeoff-ready invite. Sealed bids open into a leveling table. Award writes the subcontract.",
    image: "/images/radar-feature.jpg",
    alt: "BuildScope radar dashboard monitoring subcontractor matches in real time.",
  },
];

export function Loop() {
  return (
    <section id="loop" className="border-t border-hairline bg-fog/40">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">A1.01 / The BuildScope loop</div>
          <h2 className="max-w-[16ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            One pass from plan set to signed subcontract.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <article>
                <div className="relative aspect-square overflow-hidden bg-paper">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-concrete">
                    {step.n}
                  </span>
                  <h3 className="font-display text-[20px] font-medium tracking-[-0.02em] text-carbon">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-steel">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
