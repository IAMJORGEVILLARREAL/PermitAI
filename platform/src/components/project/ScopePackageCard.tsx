"use client";

import Link from "next/link";
import { Badge, ConfidenceMeter, StatusPill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SpecTable } from "@/components/artifacts/labels";
import type { ScopePackage } from "@/lib/types";

type Props = {
  scope: ScopePackage;
  projectId: string;
  onPost?: (scopeId: string) => void;
  posting?: boolean;
};

export function ScopePackageCard({ scope, projectId, onPost, posting }: Props) {
  return (
    <article className="border-b border-hairline pb-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="spec">{scope.division}</div>
          <h3 className="mt-2 font-display text-[19px] font-medium tracking-[-0.02em] text-carbon">
            {scope.trade}
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-steel">{scope.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge tone={scope.status === "draft" ? "suggested" : "verified"}>
              {scope.status === "draft" ? "AI suggested" : scope.status}
            </Badge>
            <ConfidenceMeter value={scope.confidence} />
          </div>
        </div>
        {scope.status !== "draft" ? (
          <StatusPill tone={scope.status === "awarded" ? "verified" : "active"}>
            {scope.status}
          </StatusPill>
        ) : null}
      </div>

      <div className="mt-5">
        <SpecTable
          dense
          rows={scope.quantities.map((q) => ({
            key: q.label,
            value: `${q.value.toLocaleString()} ${q.unit}`,
            suggested: scope.status === "draft",
          }))}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {scope.status === "draft" && onPost ? (
          <Button
            marked
            disabled={posting}
            onClick={() => onPost(scope.id)}
          >
            {posting ? "Posting…" : "Post to marketplace"}
          </Button>
        ) : null}
        {scope.status === "posted" || scope.status === "awarded" ? (
          <Link
            href={`/projects/${projectId}/bids/${scope.id}`}
            className="inline-flex h-9 items-center border border-hairline-strong px-4 text-[13px] text-carbon transition-colors hover:bg-fog/70"
          >
            {scope.status === "awarded" ? "View award" : "View bids"}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
