"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { awardBid, openBidsNow } from "@/app/(app)/projects/[id]/actions";
import { formatUsd } from "@/lib/domain";

type BidRow = {
  id: string;
  amount: number;
  legalName: string;
  rating: number;
  projectsCompleted: number;
};

/** Live seal countdown + early reveal for the hackathon walkthrough. */
export function BidSeal({
  projectId,
  scopeId,
  deadline,
  bids,
}: {
  projectId: string;
  scopeId: string;
  deadline: Date | string | null;
  bids: BidRow[];
}) {
  const router = useRouter();
  const [now, setNow] = useState(() => Date.now());
  const [pending, start] = useTransition();
  const end = deadline ? new Date(deadline).getTime() : 0;
  const sealed = end > now;
  const remainMs = Math.max(0, end - now);

  useEffect(() => {
    if (!sealed) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [sealed]);

  useEffect(() => {
    if (!sealed && deadline) router.refresh();
  }, [sealed, deadline, router]);

  const secs = Math.ceil(remainMs / 1000);

  return (
    <>
      <div className="spec mb-3">
        {bids.length} BIDS ·{" "}
        {sealed ? `SEALED · OPENS IN ${secs}s` : "OPEN FOR AWARD"}
      </div>

      {sealed ? (
        <div className="mb-4 flex items-center justify-between gap-4 border border-hairline bg-fog/50 px-3 py-2.5">
          <p className="text-[12px] text-steel">
            Sealed bidding — amounts hidden until the deadline.
          </p>
          <Button
            size="sm"
            disabled={pending}
            onClick={() =>
              start(async () => {
                await openBidsNow(scopeId, projectId);
                router.refresh();
              })
            }
          >
            Open now
          </Button>
        </div>
      ) : null}

      {bids.length === 0 ? (
        <p className="text-[12px] text-steel">No bids submitted yet.</p>
      ) : (
        bids.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between gap-4 border-b border-hairline py-2.5"
          >
            <div className="min-w-0">
              <div className="text-[13px] text-carbon">{b.legalName}</div>
              <div className="text-[11px] text-steel">
                {b.rating.toFixed(1)} ★ · {b.projectsCompleted} projects
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-mono text-[13px] tabular-nums text-carbon">
                {sealed ? "SEALED" : formatUsd(b.amount)}
              </span>
              {!sealed ? (
                <Button
                  size="sm"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await awardBid(b.id, projectId);
                      router.refresh();
                    })
                  }
                >
                  Award
                </Button>
              ) : null}
            </div>
          </div>
        ))
      )}
    </>
  );
}
