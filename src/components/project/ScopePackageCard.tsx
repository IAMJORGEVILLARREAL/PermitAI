"use client";

import Link from "next/link";
import type { ScopePackage } from "@/lib/types";

type Props = {
  scope: ScopePackage;
  projectId: string;
  onPost?: (scopeId: string) => void;
  posting?: boolean;
};

export function ScopePackageCard({ scope, projectId, onPost, posting }: Props) {
  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-steel">{scope.division}</p>
          <h3 className="text-lg font-semibold text-slate">{scope.trade}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              scope.status === "draft"
                ? "bg-amber/15 text-amber"
                : scope.status === "posted"
                  ? "bg-steel/10 text-steel"
                  : "bg-green/15 text-green"
            }`}
          >
            {scope.status === "draft" ? "AI-suggested" : scope.status}
          </span>
          <span className="text-xs text-steel">
            {(scope.confidence * 100).toFixed(0)}% conf.
          </span>
        </div>
      </div>

      <p className="mb-3 text-sm text-steel">{scope.summary}</p>

      <ul className="mb-4 space-y-1 text-sm">
        {scope.quantities.map((q) => (
          <li key={q.label} className="flex justify-between border-b border-line/70 py-1">
            <span>{q.label}</span>
            <span className="font-medium">
              {q.value.toLocaleString()} {q.unit}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {scope.status === "draft" && onPost && (
          <button
            type="button"
            disabled={posting}
            onClick={() => onPost(scope.id)}
            className="rounded-md bg-slate px-3 py-2 text-sm font-medium text-white hover:bg-steel disabled:opacity-60"
          >
            {posting ? "Posting…" : "Post to Marketplace"}
          </button>
        )}
        {(scope.status === "posted" || scope.status === "awarded") && (
          <Link
            href={`/projects/${projectId}/bids/${scope.id}`}
            className="rounded-md border border-line px-3 py-2 text-sm font-medium text-slate hover:bg-mist"
          >
            {scope.status === "awarded" ? "View award" : "View bids"}
          </Link>
        )}
      </div>
    </article>
  );
}
