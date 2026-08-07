"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import { PermitRow } from "@/components/compliance/PermitRow";
import { PlanViewer } from "@/components/project/PlanViewer";
import { ScopePackageCard } from "@/components/project/ScopePackageCard";
import type { ProjectDetail } from "@/lib/types";

export default function ScopeStudioPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [postingId, setPostingId] = useState<string | null>(null);
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

  async function runAnalysis() {
    setAnalyzing(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${params.id}/analyze`, { method: "POST" });
      if (!res.ok) throw new Error("Analyze failed");
      setProject(await res.json());
    } catch {
      setError("Analysis failed — check API");
    } finally {
      setAnalyzing(false);
    }
  }

  async function postScope(scopeId: string) {
    setPostingId(scopeId);
    try {
      const res = await fetch(`/api/scopes/${scopeId}/post`, { method: "POST" });
      if (!res.ok) throw new Error("Post failed");
      setProject(await res.json());
    } catch {
      setError("Could not post scope");
    } finally {
      setPostingId(null);
    }
  }

  if (error && !project) {
    return <p className="text-danger">{error}</p>;
  }

  if (!project) {
    return <p className="text-steel">Loading Scope Studio…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-steel">Scope Decomposition Studio</p>
          <h1 className="text-3xl font-semibold text-slate">{project.name}</h1>
          <p className="text-steel">
            {project.address}, {project.city} · {project.occupancy} · {project.constructionType}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HealthScore score={project.healthScore} />
          <Link
            href={`/compliance/${project.id}`}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-slate hover:bg-mist"
          >
            Compliance Ledger
          </Link>
          <button
            type="button"
            onClick={runAnalysis}
            disabled={analyzing}
            className="rounded-md bg-amber px-4 py-2 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
          >
            {analyzing ? "Analyzing plans…" : project.analyzed ? "Re-run AI Analysis" : "Run AI Analysis"}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <PlanViewer analyzed={project.analyzed} />

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-slate">Scope Packages</h2>
            <p className="text-sm text-steel">
              AI-quantified bid packages. Confirm, then post to the marketplace.
            </p>
          </div>

          {!project.analyzed && (
            <div className="rounded-lg border border-dashed border-line bg-white/70 p-6 text-sm text-steel">
              Upload is mocked for the hackathon. Click <strong>Run AI Analysis</strong> to generate
              MasterFormat scope packages and a source-linked permit roadmap.
            </div>
          )}

          {project.scopes.map((scope) => (
            <ScopePackageCard
              key={scope.id}
              scope={scope}
              projectId={project.id}
              onPost={postScope}
              posting={postingId === scope.id}
            />
          ))}

          {project.analyzed && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate">Permit Roadmap</h2>
              {project.permits.map((permit) => (
                <PermitRow key={permit.id} permit={permit} />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
