"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import { PermitRow } from "@/components/compliance/PermitRow";
import type { ProjectDetail } from "@/lib/types";

export default function CompliancePage() {
  const params = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${params.projectId}`)
      .then((r) => r.json())
      .then(setProject);
  }, [params.projectId]);

  if (!project) return <p className="text-steel">Loading Compliance Ledger…</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={`/projects/${project.id}`} className="text-sm text-steel hover:text-ink">
            ← Scope Studio
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-slate">Compliance Ledger</h1>
          <p className="text-steel">{project.name} — who owns which permit</p>
        </div>
        <HealthScore score={project.healthScore} />
      </div>

      <div className="mb-6 rounded-lg border border-line bg-white p-4 text-sm text-steel">
        After award, trade permits are auto-assigned to the winning sub. Switch role to{" "}
        <Link href="/" className="font-medium text-slate underline">
          Sub
        </Link>{" "}
        (Biscayne Electric Co.) to acknowledge the electrical permit.
      </div>

      <div className="space-y-3">
        {project.permits.map((permit) => (
          <PermitRow key={permit.id} permit={permit} />
        ))}
        {!project.permits.length && (
          <p className="text-sm text-steel">Run AI Analysis first to generate the permit roadmap.</p>
        )}
      </div>
    </div>
  );
}
