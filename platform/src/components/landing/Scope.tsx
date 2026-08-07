import Image from "next/image";
import { Reveal } from "./Reveal";

const ROWS = [
  { div: "03", pkg: "Slab on grade, 4 in.", qty: "3,480 SF" },
  { div: "03", pkg: "Continuous footings", qty: "212 LF" },
  { div: "08", pkg: "Hollow metal doors and frames", qty: "34 EA" },
  { div: "08", pkg: "Aluminum storefront", qty: "486 SF" },
  { div: "09", pkg: "Gypsum board partitions", qty: "5,140 SF" },
  { div: "26", pkg: "Branch circuits, 20A", qty: "45 EA" },
  { div: "26", pkg: "Service upgrade, 200A", qty: "1 EA" },
];

export function Scope() {
  return (
    <section id="scope" className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">A2.01 / Scope decomposition</div>
          <h2 className="max-w-[17ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            Every quantity points back to a line on the drawing.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-steel">
            The takeoff is not a summary paragraph. Each detection is a structured
            object—type, coordinates, confidence—so a quantity can always be
            traced to the geometry that produced it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:gap-12">
          <Reveal delay={60}>
            <div className="relative aspect-[3/2] overflow-hidden bg-fog">
              <Image
                src="/images/plan-sheet.jpg"
                alt="Architectural floor plan sheet with column grid, dimension strings, and hatched wall sections."
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-px bg-lime anim-scan-x"
                aria-hidden
              />
              <div className="absolute left-4 top-4 bg-carbon px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-lime">
                03 CONCRETE
              </div>
              <div className="absolute right-8 top-1/3 bg-carbon px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-lime">
                26 ELECTRICAL
              </div>
              <div className="absolute bottom-10 left-1/3 bg-carbon px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-lime">
                08 OPENINGS
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="shadow-[inset_0_0_0_1px_var(--color-hairline)]">
              <table className="w-full text-left text-[13px]">
                <caption className="sr-only">
                  Illustrative scope packages extracted from one plan set
                </caption>
                <thead>
                  <tr className="border-b border-hairline bg-fog/50">
                    <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Div
                    </th>
                    <th className="px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Package
                    </th>
                    <th className="px-4 py-3 text-right font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-steel">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={`${r.div}-${r.pkg}`} className="border-b border-hairline last:border-0">
                      <td className="px-4 py-3 font-mono text-[12px] text-concrete">
                        {r.div}
                      </td>
                      <td className="px-4 py-3 text-carbon">{r.pkg}</td>
                      <td className="px-4 py-3 text-right font-mono text-[12px] text-carbon">
                        {r.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between border-t border-hairline px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
                <span>7 of 12 packages</span>
                <span>Sample · not customer data</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
