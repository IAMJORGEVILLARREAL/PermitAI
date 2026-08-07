import { StatusPill } from "@/components/ui/Badge";
import type { PermitRequirement } from "@/lib/types";

export function PermitRow({ permit }: { permit: PermitRequirement }) {
  const tone =
    permit.status === "Obtained"
      ? "verified"
      : permit.status === "In Progress"
        ? "active"
        : "neutral";

  return (
    <div className="flex items-start justify-between gap-8 border-b border-hairline py-5">
      <div className="min-w-0">
        <div className="text-[14px] text-carbon">{permit.name}</div>
        <div className="mt-1 text-[11px] text-steel">{permit.authority}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-concrete">
          Trigger · {permit.triggeringScopeTag}
        </div>
        {permit.responsibleSubId ? (
          <div className="mt-2 text-[12px] text-carbon">
            Assigned · {permit.responsibleSubId}
          </div>
        ) : null}
        {permit.permitNumber ? (
          <div className="mt-1 font-mono text-[12px] text-carbon">#{permit.permitNumber}</div>
        ) : null}
        <a
          href={permit.codeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.08em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
        >
          Source citation
        </a>
      </div>
      <StatusPill tone={tone}>{permit.status}</StatusPill>
    </div>
  );
}
