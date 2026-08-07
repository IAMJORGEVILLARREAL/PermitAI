import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireGc } from "@/lib/auth/guard";
import { SectionTitle, Rule } from "@/components/ui/Panel";
import { Badge, ConfidenceMeter } from "@/components/ui/Badge";
import { SpecTable } from "@/components/artifacts/labels";
import { BidSeal } from "@/components/project/BidSeal";
import { divisionLabel, formatUsd } from "@/lib/domain";

/** Bid leveling surface — mirrors origin/main /projects/[id]/bids/[scopeId]. */
export default async function BidLevelingPage({
  params,
}: {
  params: Promise<{ id: string; scopeId: string }>;
}) {
  const { id, scopeId } = await params;
  const user = await requireGc();

  const scope = await db.scopePackage.findFirst({
    where: { id: scopeId, projectId: id, project: { orgId: user.orgId } },
    include: {
      project: true,
      lineItems: { orderBy: { sortOrder: "asc" } },
      invitations: { include: { profile: true }, orderBy: { matchScore: "desc" } },
      bids: { include: { profile: true }, orderBy: { amount: "asc" } },
      contract: { include: { subOrg: true, fee: true } },
    },
  });
  if (!scope) notFound();

  return (
    <div>
      <SectionTitle
        code={`BID LEVELING · DIV ${scope.division}`}
        description={`${scope.project.name} · ${scope.invitations.length} invited`}
        actions={
          <Link
            href={`/projects/${id}`}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
          >
            Back to project
          </Link>
        }
      >
        {scope.title}
      </SectionTitle>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Badge tone="active">{divisionLabel(scope.division)}</Badge>
        <ConfidenceMeter value={scope.confidence} />
        <span className="font-mono text-[11px] tabular-nums text-steel">
          GC est. {formatUsd(scope.estValueLow)} – {formatUsd(scope.estValueHigh)}
        </span>
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-2">
        <section>
          <Rule label="SCOPE EXHIBIT" />
          <div className="mt-5">
            <SpecTable
              dense
              rows={scope.lineItems.map((i) => ({
                key: i.description,
                value: `${i.quantity.toLocaleString()} ${i.unit}`,
              }))}
            />
          </div>

          <Rule label="MATCHED SUBS" className="mt-12" />
          <div className="mt-4">
            {scope.invitations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between gap-4 border-b border-hairline py-3"
              >
                <div>
                  <div className="text-[13px] text-carbon">{inv.profile.legalName}</div>
                  <div className="text-[11px] text-steel">
                    {inv.profile.compositeRating.toFixed(1)} ★ · {inv.status}
                  </div>
                </div>
                <div className="font-mono text-[11px] tabular-nums text-steel">
                  {(inv.matchScore * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Rule label="BIDS" />
          <div className="mt-5">
            {scope.contract ? (
              <SpecTable
                dense
                rows={[
                  { key: "AWARDED TO", value: scope.contract.subOrg.name },
                  { key: "VALUE", value: formatUsd(scope.contract.value) },
                  {
                    key: "PLATFORM FEE",
                    value: formatUsd(scope.contract.fee?.cappedAmount ?? 0),
                  },
                  { key: "STATUS", value: scope.contract.status },
                ]}
              />
            ) : (
              <BidSeal
                projectId={id}
                scopeId={scope.id}
                deadline={scope.bidDeadline}
                bids={scope.bids.map((b) => ({
                  id: b.id,
                  amount: b.amount,
                  legalName: b.profile.legalName,
                  rating: b.profile.compositeRating,
                  projectsCompleted: b.profile.projectsCompleted,
                }))}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
