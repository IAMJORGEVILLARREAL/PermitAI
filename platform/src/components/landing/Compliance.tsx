import Image from "next/image";
import { Reveal } from "./Reveal";

const LEDGER = [
  {
    id: "PMT-24-08811",
    what: "Building permit, tenant improvement",
    who: "Meridian Builders",
    state: "Obtained",
    tone: "done" as const,
  },
  {
    id: "PMT-24-08812",
    what: "Electrical, 200A service upgrade",
    who: "Vance Electric Co.",
    state: "In progress",
    tone: "live" as const,
  },
  {
    id: "PMT-24-08814",
    what: "Mechanical, rooftop unit replacement",
    who: "Ardmore Mechanical",
    state: "Acknowledged",
    tone: "open" as const,
  },
  {
    id: "PMT-24-08817",
    what: "Fire protection, sprinkler main relocation",
    who: "Not yet awarded",
    state: "Required",
    tone: "req" as const,
  },
];

export function Compliance() {
  return (
    <section id="compliance" className="border-t border-hairline bg-fog/40">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <div className="spec mb-3">C1.01 / Compliance ledger</div>
              <h2 className="max-w-[14ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
                Every permit has a name on it.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-steel">
                When a subcontract executes, that trade&apos;s permits enter the
                project ledger with the sub as responsible party. Status changes
                are timestamped and immutable.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 relative aspect-[16/10] overflow-hidden bg-paper">
                <Image
                  src="/images/permit-packet.jpg"
                  alt="A rolled drawing set, hard hat, steel ruler, and stamped permit jacket on a plywood table."
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="bg-paper shadow-[inset_0_0_0_1px_var(--color-hairline)]">
              {LEDGER.map((row) => (
                <div
                  key={row.id}
                  className="grid gap-2 border-b border-hairline px-5 py-4 last:border-0 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:gap-4"
                >
                  <span className="font-mono text-[11px] tracking-[0.08em] text-concrete">
                    {row.id}
                  </span>
                  <div>
                    <p className="text-[13px] text-carbon">{row.what}</p>
                    <p className="mt-0.5 text-[12px] text-steel">{row.who}</p>
                  </div>
                  <span
                    className={
                      row.tone === "done"
                        ? "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-carbon"
                        : row.tone === "live"
                          ? "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-carbon"
                          : "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-steel"
                    }
                  >
                    <span
                      className={
                        row.tone === "live"
                          ? "h-1.5 w-1.5 bg-lime anim-blink"
                          : row.tone === "done"
                            ? "h-1.5 w-1.5 bg-carbon"
                            : "h-1.5 w-1.5 bg-concrete"
                      }
                      aria-hidden
                    />
                    {row.state}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-[48ch] text-[13px] leading-relaxed text-steel">
              Generative models never write the final permit list. A deterministic
              rule graph maps scope tags to adopted code sections—versioned,
              logged, and source-linked.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
