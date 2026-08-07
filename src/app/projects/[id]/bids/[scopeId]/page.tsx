"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BidTable } from "@/components/marketplace/BidTable";
import type { ProjectDetail } from "@/lib/types";

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
    load();
  }, [load]);

  const scope = project?.scopes.find((s) => s.id === params.scopeId);
  const bids = project?.bids.filter((b) => b.scopeId === params.scopeId) ?? [];

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
      const updated: ProjectDetail = await res.json();
      setProject(updated);
      router.push(`/compliance/${params.id}`);
    } catch {
      setError("Could not award scope");
    } finally {
      setAwarding(null);
    }
  }

  if (error && !project) return <p className="text-danger">{error}</p>;
  if (!project || !scope) return <p className="text-steel">Loading bids…</p>;

  return (
    <div>
      <div className="mb-6">
        <Link href={`/projects/${params.id}`} className="text-sm text-steel hover:text-ink">
          ← Back to Scope Studio
        </Link>
        <h1 className="mt-2 text-3xl font-semibold text-slate">Bid Leveling</h1>
        <p className="text-steel">
          {scope.trade} · {scope.division} · {scope.summary}
        </p>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      <BidTable
        bids={bids}
        awardedBidId={scope.awardedBidId}
        onAward={scope.status === "posted" ? award : undefined}
        awarding={awarding}
      />

      {scope.status === "awarded" && (
        <div className="mt-6 rounded-lg border border-green/30 bg-green/10 p-4 text-sm text-slate">
          Scope awarded. Compliance Ledger activated for the responsible sub.{" "}
          <Link className="font-medium underline" href={`/compliance/${params.id}`}>
            View ledger →
          </Link>
        </div>
      )}
    </div>
  );
}
