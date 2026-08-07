"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import { PermitRow } from "@/components/compliance/PermitRow";
import { PlanViewer } from "@/components/project/PlanViewer";
import { ScopePackageCard } from "@/components/project/ScopePackageCard";
import { AnalyzingOverlay } from "@/components/demo/analyze/AnalyzingOverlay";
import { Button } from "@/components/ui/Button";
import { Rule, SectionTitle } from "@/components/ui/Panel";
import { MaterialTag } from "@/components/artifacts/labels";
import { formatUsd } from "@/lib/domain";
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
    void load();
  }, [load]);

  async function finishAnalysis() {
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
    return <p className="text-[13px] text-alert">{error}</p>;
  }

  if (!project) {
    return <p className="text-[13px] text-steel">Loading Scope Studio…</p>;
  }

  const address = `${project.address}, ${project.city}`;

  return (
    <div>
      {analyzing ? (
        <AnalyzingOverlay
          fileName="permit-set.pdf"
          detectedAddress={address}
          onDone={() => void finishAnalysis()}
        />
      ) : null}

      <SectionTitle
        code="SCOPE STUDIO"
        description={`${address} · ${project.occupancy} · ${project.constructionType}`}
        actions={
          <div className="flex items-center gap-3">
            <HealthScore score={project.healthScore} />
            <Link
              href={`/compliance/${project.id}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel underline decoration-hairline-strong underline-offset-4 hover:text-carbon"
            >
              Compliance ledger
            </Link>
            <Button
              marked
              disabled={analyzing}
              onClick={() => {
                setError(null);
                setAnalyzing(true);
              }}
            >
              {project.analyzed ? "Re-run AI analysis" : "Run AI analysis"}
            </Button>
          </div>
        }
      >
        {project.name}
      </SectionTitle>

      <div className="mt-8 flex flex-wrap gap-2">
        <MaterialTag label="STAGE" value={project.stage} />
        <MaterialTag label="VALUATION" value={formatUsd(project.valuation)} />
        <MaterialTag label="OCCUPANCY" value={project.occupancy} />
        <MaterialTag label="CONST. TYPE" value={project.constructionType} />
      </div>

      {error ? <p className="mt-4 text-[13px] text-alert">{error}</p> : null}

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <Rule label="PLAN SET" />
          <div className="mt-5">
            <PlanViewer analyzed={project.analyzed} />
          </div>
        </div>

        <div>
          <Rule label={`SCOPE PACKAGES · ${project.scopes.length || "—"}`} />
          <p className="mt-3 text-[12px] text-steel">
            AI-quantified bid packages from origin/main. Post Electrical to unlock marketplace bids.
          </p>

          {!project.analyzed ? (
            <div className="mt-6 border border-dashed border-hairline-strong bg-fog/40 p-6 text-[13px] text-steel">
              Upload is mocked. Click <span className="text-carbon">Run AI analysis</span> for
              MasterFormat scopes and a source-linked permit roadmap.
            </div>
          ) : null}

          <div className="mt-8 space-y-10">
            {project.scopes.map((scope) => (
              <ScopePackageCard
                key={scope.id}
                scope={scope}
                projectId={project.id}
                onPost={postScope}
                posting={postingId === scope.id}
              />
            ))}
          </div>
        </div>
      </div>

      {project.analyzed ? (
        <section className="mt-20">
          <Rule label={`PERMIT ROADMAP · ${project.permits.length}`} />
          <div className="mt-6">
            {project.permits.map((permit) => (
              <PermitRow key={permit.id} permit={permit} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
