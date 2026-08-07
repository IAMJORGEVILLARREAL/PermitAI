"use client";

import type { Bid } from "@/lib/types";

type Props = {
  bids: Bid[];
  awardedBidId?: string;
  onAward?: (bidId: string) => void;
  awarding?: string | null;
};

export function BidTable({ bids, awardedBidId, onAward, awarding }: Props) {
  if (!bids.length) {
    return <p className="text-sm text-steel">No bids yet. Post this scope to the marketplace.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-steel">
          <tr>
            <th className="px-4 py-3">Subcontractor</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Prior jobs</th>
            <th className="px-4 py-3">Bid</th>
            <th className="px-4 py-3">Notes</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => {
            const isAwarded = awardedBidId === bid.id;
            return (
              <tr key={bid.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-slate">{bid.subName}</td>
                <td className="px-4 py-3">{bid.rating.toFixed(1)} ★</td>
                <td className="px-4 py-3">{bid.previousProjects}</td>
                <td className="px-4 py-3 font-semibold">
                  ${bid.amount.toLocaleString()}
                </td>
                <td className="max-w-xs px-4 py-3 text-steel">{bid.notes}</td>
                <td className="px-4 py-3 text-right">
                  {isAwarded ? (
                    <span className="rounded-full bg-green/15 px-2 py-1 text-xs font-medium text-green">
                      Awarded
                    </span>
                  ) : onAward && !awardedBidId ? (
                    <button
                      type="button"
                      disabled={!!awarding}
                      onClick={() => onAward(bid.id)}
                      className="rounded-md bg-amber px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95 disabled:opacity-60"
                    >
                      {awarding === bid.id ? "Awarding…" : "Award"}
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
