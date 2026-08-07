import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const CELLS = [
  {
    value: 2,
    suffix: " min",
    label: "50-sheet set classified and quantified",
  },
  {
    value: 100,
    suffix: "%",
    label: "Permit outputs linked to adopted code",
  },
  {
    value: 4.5,
    decimals: 1,
    suffix: "%",
    label: "Sub fee on award, capped at $2,000",
  },
  {
    value: 8,
    suffix: " trades",
    label: "Live at launch, concrete through fire protection",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-hairline bg-paper" aria-label="Key measures">
      <div className="mx-auto grid max-w-[1180px] sm:grid-cols-2 lg:grid-cols-4">
        {CELLS.map((cell, i) => (
          <Reveal key={cell.label} delay={i * 50}>
            <div className="border-b border-hairline px-5 py-8 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-8 lg:[&:nth-child(2)]:border-r">
              <p className="font-display text-[36px] font-medium tracking-[-0.03em] text-carbon">
                <CountUp
                  value={cell.value}
                  decimals={cell.decimals}
                  suffix={cell.suffix}
                />
              </p>
              <p className="mt-2 max-w-[22ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-steel">
                {cell.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
