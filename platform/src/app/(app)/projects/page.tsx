"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import { SectionTitle } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/Badge";
import { NewProjectButton, NewProjectModal } from "@/components/project/NewProjectModal";
import { formatUsd } from "@/lib/domain";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SectionTitle
        code="01 — COMMAND CENTER"
        description="Portfolio view — what needs action today."
        actions={<NewProjectButton onClick={() => setModalOpen(true)} />}
      >
        Projects
      </SectionTitle>

      <NewProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projects={projects}
        onCreated={(project) => setProjects((prev) => [project, ...prev])}
      />

      {loading ? (
        <p className="mt-12 text-[13px] text-steel">Loading projects…</p>
      ) : (
        <div className="mt-12 border-t border-hairline-strong">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="flex items-center justify-between gap-8 border-b border-hairline py-6 transition-colors hover:bg-fog/50"
            >
              <div className="min-w-0">
                <div className="font-display text-[17px] font-medium tracking-[-0.02em] text-carbon">
                  {project.name}
                </div>
                <div className="mt-1.5 text-[12px] text-steel">
                  {project.address}, {project.city}
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <StatusPill tone={project.analyzed ? "active" : "neutral"}>
                    {project.stage}
                  </StatusPill>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
                    {project.occupancy} · {project.constructionType}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-10">
                <div className="text-right">
                  <div className="font-mono text-[15px] tabular-nums text-carbon">
                    {formatUsd(project.valuation)}
                  </div>
                  <div className="spec mt-1">VALUATION</div>
                </div>
                <HealthScore score={project.healthScore} />
              </div>
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 border-b border-hairline py-8 text-[13px] text-steel transition-colors hover:bg-fog/50 hover:text-carbon"
          >
            <span className="font-mono text-[16px] leading-none">+</span>
            Add another project
          </button>
        </div>
      )}
    </div>
  );
}
