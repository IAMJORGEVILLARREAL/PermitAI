"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Overlay";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { IconPlus, IconPlanSet } from "@/components/icons";
import { formatUsd } from "@/lib/domain";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  onCreated: (project: Project) => void;
};

export function NewProjectModal({ open, onClose, projects, onCreated }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return projects
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [projects, query]);

  async function createFake(name?: string, uploadName?: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || query || undefined,
          fileName: uploadName || fileName || undefined,
        }),
      });
      if (!res.ok) throw new Error("create failed");
      const project: Project = await res.json();
      onCreated(project);
      onClose();
      setQuery("");
      setFileName(null);
      router.push(`/projects/${project.id}`);
    } catch {
      setError("Could not create demo project.");
    } finally {
      setBusy(false);
    }
  }

  function takeFile(file: File | null | undefined) {
    if (!file) return;
    setFileName(file.name);
    // Demo: any file immediately becomes a fake project.
    void createFake(undefined, file.name);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      code="NEW PROJECT"
      title="Add a project"
      description="Search your portfolio or upload a plan set. Demo mode always loads a sample project — no real OCR."
      width="560px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button
            marked
            disabled={busy}
            onClick={() => void createFake()}
          >
            {busy ? "Creating…" : "Create demo project"}
          </Button>
        </>
      }
    >
      <Field label="Search projects" refCode="NAME / ADDRESS">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Brickell, Wynwood, openings…"
          autoFocus
        />
      </Field>

      {matches.length > 0 ? (
        <div className="mt-3 border border-hairline">
          <div className="spec border-b border-hairline px-3 py-2">MATCHING PROJECTS</div>
          {matches.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onClose();
                router.push(`/projects/${p.id}`);
              }}
              className="flex w-full items-center justify-between gap-4 border-b border-hairline px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-fog/50"
            >
              <div className="min-w-0">
                <div className="text-[13px] text-carbon">{p.name}</div>
                <div className="mt-0.5 text-[11px] text-steel">
                  {p.address}, {p.city}
                </div>
              </div>
              <div className="shrink-0 font-mono text-[11px] tabular-nums text-steel">
                {formatUsd(p.valuation)}
              </div>
            </button>
          ))}
        </div>
      ) : null}

      {query.trim() && matches.length === 0 ? (
        <p className="mt-3 text-[12px] text-steel">
          No matches. Create a demo project from this name, or upload a plan set below.
        </p>
      ) : null}

      <div className="mt-8">
        <div className="spec mb-3">OR UPLOAD A PLAN SET</div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.zip,.dwg,image/*"
          className="hidden"
          onChange={(e) => takeFile(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            takeFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 border border-dashed px-6 py-10 text-center transition-colors",
            dragging
              ? "border-lime bg-lime-wash"
              : "border-hairline-strong bg-fog/40 hover:bg-fog/70",
          )}
        >
          <IconPlanSet size={28} className="text-steel" />
          <div>
            <div className="text-[14px] text-carbon">
              {fileName ? fileName : "Drop PDF / ZIP here, or browse"}
            </div>
            <div className="mt-1 text-[11px] text-steel">
              Demo: any file opens a sample Miami project
            </div>
          </div>
        </button>
      </div>

      {error ? <p className="mt-4 text-[13px] text-alert">{error}</p> : null}
    </Modal>
  );
}

export function NewProjectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button marked onClick={onClick} icon={<IconPlus size={16} />}>
      New project
    </Button>
  );
}
