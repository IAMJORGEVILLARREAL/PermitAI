"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BidTable } from "@/components/marketplace/BidTable";
import { Rule, SectionTitle } from "@/components/ui/Panel";
import { Badge, ConfidenceMeter, StatusPill } from "@/components/ui/Badge";
import { MaterialTag, SpecTable } from "@/components/artifacts/labels";
import { formatUsd } from "@/lib/domain";
import type { ProjectDetail } from "@/lib/types";

/** Rough GC estimate band from quantities — for leveling context only. */
function estimateBand(trade: string): { low: number; high: number } {
  const bands: Record<string, [number, number]> = {
    Concrete: [115000, 140000],
    Framing: [88000, 105000],
    Openings: [48000, 62000],
    Drywall: [80000, 98000],
    Electrical: [100000, 125000],
    HVAC: [135000, 160000],
  };
  const [low, high] = bands[trade] ?? [50000, 80000];
  return { low, high };
}

export default function BidLevelingPage() {
  const params = useParams<{ id: string; scopeId: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [awarding, setAwarding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/projects/${params.id}`);
    if (!res.ok) {
      setError("Project not found");
      return;
    }
    setProject(await res.json());
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const scope = project?.scopes.find((s) => s.id === params.scopeId);
  const bids = useMemo(
    () => project?.bids.filter((b) => b.scopeId === params.scopeId) ?? [],
    [project, params.scopeId],
  );
  const estimate = scope ? estimateBand(scope.trade) : undefined;

  async function award(bidId: string) {
    setAwarding(bidId);
    setError(null);
    try {
      const res = await fetch(`/api/scopes/${params.scopeId}/award`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidId }),
      });
      if (!res.ok) throw new Error("Award failed");
      router.push(`/compliance/${params.id}`);
    } catch {
      setError("Could not award scope");
    } finally {
      setAwarding(null);
    }
  }

  if (error && !project) return <p className="text-[13px] text-alert">{error}</p>;
  if (!project || !scope) {
    return <p className="text-[13px] text-steel">Loading bid leveling…</p>;
  }

  const canAward = scope.status === "posted";
  const isDraft = scope.status === "draft";

  return (
    <div>
      <SectionTitle
        code="BID LEVELING"
        description="Compare marketplace bids on the same quantified scope, then award one sub."
        actions={
          <Link
            href={`/projects/${params.id}`}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
          >
            Back to Scope Studio
          </Link>
        }
      >
        {scope.trade}
      </SectionTitle>

      {/* Plain-language explainer */}
      <div className="mt-8 border border-hairline bg-fog/50 px-5 py-5">
        <div className="spec">WHAT THIS PAGE IS</div>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-carbon">
          You posted the <strong>{scope.trade}</strong> scope package for{" "}
          <strong>{project.name}</strong>. Matched subcontractors bid against the same
          takeoff (doors, storefront, etc.). Level the bids below — check price, rating,
          and exclusions — then award. Awarding creates a contract and moves related
          trade permits onto that sub&apos;s compliance checklist.
        </p>
        <ol className="mt-4 grid gap-2 text-[12px] text-steel sm:grid-cols-3">
          <li className="border border-hairline bg-paper px-3 py-2">
            <span className="font-mono text-[10px] text-concrete">01</span>
            <div className="mt-1 text-carbon">Review scope quantities (left)</div>
          </li>
          <li className="border border-hairline bg-paper px-3 py-2">
            <span className="font-mono text-[10px] text-concrete">02</span>
            <div className="mt-1 text-carbon">Compare bids & notes</div>
          </li>
          <li className="border border-hairline bg-paper px-3 py-2">
            <span className="font-mono text-[10px] text-concrete">03</span>
            <div className="mt-1 text-carbon">Award → Compliance Ledger</div>
          </li>
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <MaterialTag label="PROJECT" value={project.name} />
        <MaterialTag label="DIVISION" value={scope.division} />
        <MaterialTag label="BIDS" value={`${bids.length} received`} />
        <MaterialTag
          label="ESTIMATE"
          value={`${formatUsd(estimate!.low)} – ${formatUsd(estimate!.high)}`}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StatusPill
          tone={
            scope.status === "awarded"
              ? "verified"
              : scope.status === "posted"
                ? "active"
                : "neutral"
          }
        >
          {scope.status === "posted"
            ? "Open for award"
            : scope.status === "awarded"
              ? "Awarded"
              : "Not posted yet"}
        </StatusPill>
        <ConfidenceMeter value={scope.confidence} />
        <Badge tone="suggested">AI takeoff confirmed</Badge>
      </div>

      {error ? <p className="mt-4 text-[13px] text-alert">{error}</p> : null}

      {isDraft ? (
        <div className="mt-10 border border-dashed border-hairline-strong px-5 py-6">
          <p className="text-[14px] text-carbon">This scope is still a draft</p>
          <p className="mt-2 max-w-lg text-[13px] text-steel">
            Post it from Scope Studio first. Once it hits the marketplace, bids appear here
            automatically.
          </p>
          <Link
            href={`/projects/${params.id}`}
            className="mt-4 inline-flex h-9 items-center bg-carbon px-4 text-[13px] font-medium text-white"
          >
            Go post this scope
          </Link>
        </div>
      ) : null}

      <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Rule label="SCOPE EXHIBIT — WHAT THEY'RE BIDDING" />
          <p className="mt-3 text-[12px] leading-relaxed text-steel">
            Every bidder sees this same quantified package. That&apos;s why you can
            compare apples-to-apples.
          </p>
          <div className="mt-5">
            <SpecTable
              dense
              rows={scope.quantities.map((q) => ({
                key: q.label,
                value: `${q.value.toLocaleString()} ${q.unit}`,
              }))}
            />
          </div>
          <p className="mt-4 text-[12px] text-steel">{scope.summary}</p>

          {canAward ? (
            <div className="mt-8 border border-hairline px-4 py-4">
              <div className="spec">WHEN YOU AWARD</div>
              <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-steel">
                <li>· Winning sub gets a contract exhibit with these quantities</li>
                <li>· Related trade permits move to their compliance checklist</li>
                <li>· You land on the Compliance Ledger to track status</li>
              </ul>
            </div>
          ) : null}
        </section>

        <section>
          <Rule label={`BIDS · ${bids.length}`} />
          <div className="mt-6">
            <BidTable
              bids={bids}
              awardedBidId={scope.awardedBidId}
              onAward={canAward ? award : undefined}
              awarding={awarding}
              gcEstimate={estimate}
            />
          </div>
        </section>
      </div>

      {scope.status === "awarded" ? (
        <p className="mt-10 border border-hairline bg-lime-wash px-4 py-3 text-[13px] text-carbon">
          Scope awarded. Compliance Ledger activated for the responsible sub.{" "}
          <Link className="underline" href={`/compliance/${params.id}`}>
            View ledger →
          </Link>
        </p>
      ) : null}
    </div>
  );
}
