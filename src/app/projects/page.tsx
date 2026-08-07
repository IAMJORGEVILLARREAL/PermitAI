"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HealthScore } from "@/components/compliance/HealthScore";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate">Command Center</h1>
          <p className="text-steel">Portfolio view — what needs action today.</p>
        </div>
        <button
          type="button"
          className="rounded-md bg-slate px-4 py-2 text-sm font-medium text-white opacity-60"
          title="Demo uses seeded project"
          disabled
        >
          New Project
        </button>
      </div>

      {loading ? (
        <p className="text-steel">Loading projects…</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 shadow-sm transition hover:border-steel"
            >
              <div>
                <h2 className="text-lg font-semibold text-slate">{project.name}</h2>
                <p className="text-sm text-steel">
                  {project.address}, {project.city}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-mist px-2 py-1 text-steel">{project.stage}</span>
                  <span className="rounded-full bg-mist px-2 py-1 text-steel">
                    ${project.valuation.toLocaleString()}
                  </span>
                </div>
              </div>
              <HealthScore score={project.healthScore} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
