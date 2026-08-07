"use client";

import { Button } from "@/components/ui/Button";
import { Badge, StatusPill } from "@/components/ui/Badge";
import { formatUsd } from "@/lib/domain";
import type { Bid } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = {
  bids: Bid[];
  awardedBidId?: string;
  onAward?: (bidId: string) => void;
  awarding?: string | null;
  gcEstimate?: { low: number; high: number };
};

export function BidTable({
  bids,
  awardedBidId,
  onAward,
  awarding,
  gcEstimate,
}: Props) {
  if (!bids.length) {
    return (
      <div className="border border-dashed border-hairline-strong bg-fog/40 px-5 py-8">
        <p className="text-[14px] text-carbon">No bids yet</p>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-steel">
          This scope hasn&apos;t been posted to the marketplace. Go back to Scope Studio
          and click <span className="text-carbon">Post to marketplace</span> — matched
          subcontractors will submit sealed bids here.
        </p>
      </div>
    );
  }

  const sorted = [...bids].sort((a, b) => a.amount - b.amount);
  const low = sorted[0]?.amount ?? 0;
  const high = sorted[sorted.length - 1]?.amount ?? 0;
  const spread = high - low;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="LOW BID" value={formatUsd(low)} hint="Best price received" />
        <Stat label="HIGH BID" value={formatUsd(high)} hint="Highest price received" />
        <Stat
          label="SPREAD"
          value={formatUsd(spread)}
          hint={`${(((spread / low) || 0) * 100).toFixed(1)}% between low and high`}
        />
      </div>

      {gcEstimate ? (
        <p className="mb-6 text-[12px] text-steel">
          Your AI estimate was {formatUsd(gcEstimate.low)} – {formatUsd(gcEstimate.high)}.
          Bids below the low end may exclude scope — review notes before awarding.
        </p>
      ) : null}

      <div className="space-y-0 border-t border-hairline-strong">
        {sorted.map((bid, index) => {
          const isAwarded = awardedBidId === bid.id;
          const isLow = bid.amount === low;
          const delta = bid.amount - low;
          const vsEst =
            gcEstimate && bid.amount < gcEstimate.low
              ? "below estimate"
              : gcEstimate && bid.amount > gcEstimate.high
                ? "above estimate"
                : "in range";

          return (
            <div
              key={bid.id}
              className={cn(
                "grid gap-4 border-b border-hairline py-5 lg:grid-cols-[1fr_auto]",
                isLow && !awardedBidId ? "bg-lime-wash/40" : "",
              )}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
                    #{index + 1}
                  </span>
                  <h3 className="font-display text-[17px] font-medium tracking-[-0.02em] text-carbon">
                    {bid.subName}
                  </h3>
                  {isLow ? <Badge tone="verified">Lowest bid</Badge> : null}
                  {isAwarded ? <StatusPill tone="verified">Awarded</StatusPill> : null}
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-steel">
                  <span>{bid.rating.toFixed(1)} ★ marketplace rating</span>
                  <span>{bid.previousProjects} prior jobs on BuildScope</span>
                  <span className="font-mono tabular-nums">
                    {delta === 0 ? "At low bid" : `+${formatUsd(delta)} vs low`}
                  </span>
                  {gcEstimate ? <span>{vsEst}</span> : null}
                </div>

                <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-carbon">
                  {bid.notes}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="font-mono text-[22px] tabular-nums tracking-[-0.02em] text-carbon">
                  {formatUsd(bid.amount)}
                </div>
                <div className="spec">LUMP-SUM BID</div>
                {isAwarded ? null : onAward && !awardedBidId ? (
                  <Button
                    size="sm"
                    marked={isLow}
                    disabled={!!awarding}
                    onClick={() => onAward(bid.id)}
                  >
                    {awarding === bid.id ? "Awarding…" : "Award this bid"}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-hairline px-4 py-3">
      <div className="spec">{label}</div>
      <div className="mt-2 font-mono text-[20px] tabular-nums text-carbon">{value}</div>
      <div className="mt-1 text-[11px] text-steel">{hint}</div>
    </div>
  );
}
