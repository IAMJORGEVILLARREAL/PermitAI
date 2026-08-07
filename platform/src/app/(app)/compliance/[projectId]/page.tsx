"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import { PermitRow } from "@/components/compliance/PermitRow";
import { SectionTitle, Rule } from "@/components/ui/Panel";
import type { ProjectDetail } from "@/lib/types";

export default function CompliancePage() {
  const params = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${params.projectId}`)
      .then((r) => r.json())
      .then(setProject);
  }, [params.projectId]);

  if (!project) return <p className="text-[13px] text-steel">Loading Compliance Ledger…</p>;

  return (
    <div>
      <SectionTitle
        code="COMPLIANCE LEDGER"
        description={`${project.name} — who owns which permit`}
        actions={
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${project.id}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
            >
              Scope Studio
            </Link>
            <HealthScore score={project.healthScore} />
          </div>
        }
      >
        Compliance Ledger
      </SectionTitle>

      <p className="mt-8 max-w-2xl border border-hairline bg-fog/40 px-4 py-3 text-[13px] text-steel">
        After award, trade permits auto-assign to the winning sub. Sign out and continue as{" "}
        <Link href="/login" className="text-carbon underline">
          Jose (sub)
        </Link>{" "}
        to confirm the electrical permit obtained.
      </p>

      <section className="mt-12">
        <Rule label={`PERMITS · ${project.permits.length}`} />
        <div className="mt-6">
          {project.permits.map((permit) => (
            <PermitRow key={permit.id} permit={permit} />
          ))}
          {!project.permits.length ? (
            <p className="text-[13px] text-steel">
              Run AI Analysis first to generate the permit roadmap.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
