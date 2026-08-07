import type { PermitRequirement } from "@/lib/types";
import { subs } from "@/lib/seed";

export function PermitRow({ permit }: { permit: PermitRequirement }) {
  const sub = subs.find((s) => s.id === permit.responsibleSubId);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-slate">{permit.name}</h3>
        <p className="text-sm text-steel">{permit.authority}</p>
        <p className="mt-1 text-xs text-steel">
          Trigger: {permit.triggeringScopeTag} ·{" "}
          <a className="underline" href={permit.codeUrl} target="_blank" rel="noreferrer">
            Code citation
          </a>
        </p>
        {sub && (
          <p className="mt-1 text-xs text-slate">
            Responsible: <span className="font-medium">{sub.name}</span>
          </p>
        )}
        {permit.permitNumber && (
          <p className="mt-1 text-xs text-green">Permit #: {permit.permitNumber}</p>
        )}
      </div>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
          permit.status === "Obtained"
            ? "bg-green/15 text-green"
            : permit.status === "In Progress"
              ? "bg-amber/15 text-amber"
              : "bg-mist text-steel"
        }`}
      >
        {permit.status}
      </span>
    </div>
  );
}
