import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireGc } from "@/lib/auth/guard";
import { SectionTitle, Rule } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/Badge";
import { HealthScore } from "@/components/ui/Progress";
import { MaterialTag } from "@/components/artifacts/labels";
import {
  formatUsd, REQUIREMENT_LABELS, STAGE_LABELS,
  type ProjectStage, type RequirementStatus,
} from "@/lib/domain";

/** Dedicated Compliance Ledger — ported from origin/main into the industrial shell. */
export default async function CompliancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireGc();

  const project = await db.project.findFirst({
    where: { id, orgId: user.orgId },
    include: {
      jurisdiction: true,
      contracts: { include: { subOrg: true, scopePackage: true } },
      requirements: {
        include: {
          permit: true,
          responsible: true,
          scopeTag: true,
          acknowledgements: { orderBy: { createdAt: "desc" }, take: 3 },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!project) notFound();

  const obtained = project.requirements.filter((r) => r.status === "OBTAINED").length;
  const assigned = project.requirements.filter((r) => r.responsibleProfileId).length;

  return (
    <div>
      <SectionTitle
        code="COMPLIANCE LEDGER"
        description={`${project.addressLine}, ${project.city} · rule-linked, auditable`}
        actions={
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${project.id}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
            >
              Back to project
            </Link>
            <HealthScore value={project.healthScore} label="HEALTH" />
          </div>
        }
      >
        {project.name}
      </SectionTitle>

      <div className="mt-8 flex flex-wrap gap-2">
        <MaterialTag label="STAGE" value={STAGE_LABELS[project.stage as ProjectStage]} />
        <MaterialTag label="OBTAINED" value={`${obtained} / ${project.requirements.length}`} />
        <MaterialTag label="ASSIGNED" value={`${assigned} trade permits`} />
        <MaterialTag label="JURISDICTION" value={project.jurisdiction?.name ?? "—"} />
      </div>

      {project.contracts.length > 0 ? (
        <section className="mt-16">
          <Rule label="AWARDED CONTRACTS" />
          <div className="mt-5">
            {project.contracts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-6 border-b border-hairline py-4"
              >
                <div>
                  <div className="text-[14px] text-carbon">{c.scopePackage.title}</div>
                  <div className="mt-1 text-[11px] text-steel">
                    {c.subOrg.name} · {c.status}
                  </div>
                </div>
                <div className="font-mono text-[13px] tabular-nums text-carbon">
                  {formatUsd(c.value)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16">
        <Rule
          label={`PERMIT REQUIREMENTS · ${project.requirements.length}${
            project.requirements[0] ? ` · ${project.requirements[0].ruleVersion}` : ""
          }`}
        />
        <div className="mt-6">
          {project.requirements.length === 0 ? (
            <p className="text-[13px] text-steel">
              Run plan analysis to generate the permit roadmap from the regulatory graph.
            </p>
          ) : null}

          {project.requirements.map((r) => {
            const citations = JSON.parse(r.citations) as Array<{
              citation: string; title: string; url: string;
            }>;
            return (
              <div key={r.id} className="border-b border-hairline py-6">
                <div className="flex items-start justify-between gap-8">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[15px] text-carbon">{r.permit.name}</h3>
                      {r.permit.isTradePermit ? (
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-concrete">
                          TRADE
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-[12px] text-steel">
                      {r.permit.issuingAuthority}
                      {r.scopeTag
                        ? ` · Trigger: ${r.scopeTag.key}`
                        : ""}
                    </div>
                    <div className="mt-2 text-[12px] text-carbon">
                      {r.responsible
                        ? `Responsible: ${r.responsible.legalName}`
                        : "Responsible: GC (unassigned trade)"}
                    </div>
                    {r.permitNumber ? (
                      <div className="mt-1 font-mono text-[12px] text-carbon">
                        #{r.permitNumber}
                      </div>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {citations.map((c) => (
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
                    {r.acknowledgements[0] ? (
                      <p className="mt-3 text-[11px] text-concrete">
                        Last ack: {r.acknowledgements[0].status}
                        {r.acknowledgements[0].permitNumber
                          ? ` · ${r.acknowledgements[0].permitNumber}`
                          : ""}
                      </p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusPill
                      tone={
                        r.status === "OBTAINED"
                          ? "verified"
                          : r.status === "IN_PROGRESS"
                            ? "active"
                            : "neutral"
                      }
                    >
                      {REQUIREMENT_LABELS[r.status as RequirementStatus]}
                    </StatusPill>
                    <div className="mt-2 font-mono text-[11px] tabular-nums text-steel">
                      {formatUsd(r.permit.estFeeLow)}–{formatUsd(r.permit.estFeeHigh)}
                    </div>
                    <div className="spec mt-1">
                      {r.permit.estTimelineDaysLow}–{r.permit.estTimelineDaysHigh} DAYS
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
