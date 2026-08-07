import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Ingest the set",
    body: "Upload the full package. Sheets are classified and read, then the site address is overlaid with zoning, flood, wetland, and historic-district data.",
  },
  {
    n: "02",
    title: "Decompose the scope",
    body: "Vision models detect walls, openings, fixtures, panels, and structural members, then quantify them into packages by MasterFormat division.",
  },
  {
    n: "03",
    title: "Post the package",
    body: "You confirm the quantities and set a deadline. Matching ranks subcontractors on license, radius, bonding, capacity, and prior performance.",
  },
  {
    n: "04",
    title: "Level and award",
    body: "Sealed bids open at the deadline. Compare them side by side, award, and the subcontract generates with the scope attached as an exhibit.",
  },
  {
    n: "05",
    title: "Track the permits",
    body: "On execution, that sub's trade permits enter the project ledger with their name on them. Nothing gets chased down after the fact.",
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

        <div className="mt-16 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 50}>
              <article
                className={
                  i === 0
                    ? "lg:pr-5"
                    : i === STEPS.length - 1
                      ? "border-t border-hairline pt-10 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0"
                      : "border-t border-hairline pt-10 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-5"
                }
              >
                <div className="flex items-center gap-2.5 pb-3.5">
                  <span
                    className="size-1.5 shrink-0 bg-lime"
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] tracking-[0.12em] text-concrete">
                    {step.n}
                  </span>
                </div>
                <div className="h-px bg-hairline-strong" aria-hidden />
                <div className="pt-5">
                  <h3 className="font-display text-[18px] font-medium tracking-[-0.02em] text-carbon">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-steel">
                    {step.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
