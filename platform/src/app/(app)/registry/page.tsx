import { requireUser } from "@/lib/auth/guard";
import { Rule, SectionTitle } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";
import { formatUsd } from "@/lib/domain";

/** Static Miami rule graph for the demo (no DB). */
const MIAMI_PERMITS = [
  {
    name: "Commercial Building Permit",
    authority: "City of Miami Building Department",
    fee: [2400, 18500] as const,
    days: [21, 45] as const,
    trade: false,
    triggers: ["Alteration > $50,000", "Change of occupancy"],
    citations: [
      { citation: "FBC 2023 §105.1", url: "https://www.floridabuilding.org/" },
      { citation: "Miami Code Ch. 8", url: "https://www.miami.gov/" },
    ],
  },
  {
    name: "Electrical Trade Permit",
    authority: "City of Miami Building Department",
    fee: [350, 4200] as const,
    days: [7, 21] as const,
    trade: true,
    triggers: ["Electrical_PanelUpgrade", "Electrical_Service"],
    citations: [
      { citation: "NEC 2020 §230.79", url: "https://www.nfpa.org/" },
    ],
  },
  {
    name: "Plumbing Trade Permit",
    authority: "City of Miami Building Department",
    fee: [280, 3400] as const,
    days: [7, 18] as const,
    trade: true,
    triggers: ["Plumbing_FixtureRelocate", "Plumbing_Grease"],
    citations: [
      { citation: "FPC 2023 §1003", url: "https://www.floridabuilding.org/" },
    ],
  },
  {
    name: "Fire Alarm Modification Permit",
    authority: "Miami Fire Rescue — Fire Prevention",
    fee: [400, 3900] as const,
    days: [14, 30] as const,
    trade: true,
    triggers: ["FireAlarm_DeviceAdds"],
    citations: [
      { citation: "NFPA 72", url: "https://www.nfpa.org/" },
      { citation: "FBC Fire §907", url: "https://www.floridabuilding.org/" },
    ],
  },
  {
    name: "Coastal Construction / HVHZ review",
    authority: "City of Miami Building Department",
    fee: [800, 6000] as const,
    days: [14, 40] as const,
    trade: false,
    triggers: ["High-velocity hurricane zone", "Storefront glazing"],
    citations: [
      { citation: "FBC HVHZ §2411", url: "https://www.floridabuilding.org/" },
    ],
  },
];

export default async function RegistryPage() {
  await requireUser();

  return (
    <div>
      <SectionTitle
        code="REGULATORY GRAPH · MIAMI, FL"
        description="Source-linked permits the engine can fire for City of Miami commercial work."
      >
        Regulatory registry
      </SectionTitle>

      <div className="mt-8 flex flex-wrap gap-2">
        <Badge tone="verified">Rule set MIA-2026.02</Badge>
        <Badge tone="neutral">{MIAMI_PERMITS.length} permits</Badge>
      </div>

      <section className="mt-14">
        <Rule label="CITY OF MIAMI — MUNICIPAL" />
        <div className="mt-6">
          {MIAMI_PERMITS.map((p) => (
            <div key={p.name} className="border-b border-hairline py-6">
              <div className="flex items-start justify-between gap-8">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[15px] text-carbon">{p.name}</h3>
                    {p.trade ? (
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-concrete">
                        TRADE
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-[12px] text-steel">{p.authority}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.triggers.map((t) => (
                      <span
                        key={t}
                        className="border border-hairline bg-fog px-2 py-0.5 font-mono text-[10px] text-carbon"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {p.citations.map((c) => (
                      <a
                        key={c.citation}
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.08em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
                      >
                        {c.citation}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[12px] tabular-nums text-carbon">
                    {formatUsd(p.fee[0])}–{formatUsd(p.fee[1])}
                  </div>
                  <div className="spec mt-1">
                    {p.days[0]}–{p.days[1]} DAYS
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
