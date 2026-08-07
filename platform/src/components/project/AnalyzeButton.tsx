"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { runAnalysis } from "@/app/(app)/projects/[id]/actions";

const STAGES = [
  { label: "Scanning plan sheets", detail: "Sheet classification · title block OCR" },
  { label: "Extracting scope & trades", detail: "Symbology · quantities · confidence" },
  { label: "Evaluating rule graph", detail: "Jurisdiction edges · source citations" },
  { label: "Building Scope Packages", detail: "MasterFormat · marketplace-ready" },
] as const;

const TAGS = [
  "structural.slab_on_grade",
  "electrical.service_upgrade",
  "electrical.branch_circuits",
  "hvac.rooftop_unit",
  "fire.sprinkler",
  "arch.storefront",
];

const TOTAL_MS = 3200;

/** Faruk-style analyze theater, restyled to Minimal Industrial. */
export function AnalyzeButton({
  projectId,
  address,
}: {
  projectId: string;
  address: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState(0);
  const [addressFound, setAddressFound] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!open) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const startAt = Date.now();

    timers.push(setTimeout(() => setAddressFound(true), 700));
    for (let i = 1; i < STAGES.length; i++) {
      timers.push(setTimeout(() => setStage(i), i * 700));
    }
    const tagStep = TOTAL_MS / (TAGS.length + 1);
    for (let i = 0; i < TAGS.length; i++) {
      timers.push(setTimeout(() => setTags(i + 1), 400 + i * tagStep));
    }

    const tick = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startAt) / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(tick);
    }, 40);

    timers.push(
      setTimeout(() => {
        start(async () => {
          await runAnalysis(projectId);
          setOpen(false);
          router.refresh();
        });
      }, TOTAL_MS),
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [open, projectId, router]);

  return (
    <>
      <Button
        marked
        disabled={open || pending}
        onClick={() => {
          setStage(0);
          setProgress(0);
          setTags(0);
          setAddressFound(false);
          setOpen(true);
        }}
      >
        Analyze plan set
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/70 px-5"
          role="dialog"
          aria-modal="true"
          aria-label="Analyzing plan set"
        >
          <div className="w-full max-w-lg border border-hairline-strong bg-paper p-8 shadow-none">
            <div className="spec">ANALYSIS · ENGINE</div>
            <h2 className="mt-3 font-display text-[26px] font-medium tracking-[-0.03em] text-carbon">
              Reading plan set
            </h2>
            <p className="mt-2 text-[13px] text-steel">
              Deterministic extraction · regulatory graph · no free-text permits
            </p>

            <div
              className={`mt-6 border px-4 py-3 transition-colors duration-[240ms] ${
                addressFound
                  ? "border-lime bg-lime-wash"
                  : "border-hairline bg-fog/40"
              }`}
            >
              <div className="spec">ADDRESS FROM TITLE BLOCK</div>
              <div className="mt-1 text-[14px] text-carbon">
                {addressFound ? address : "Locating title block…"}
              </div>
            </div>

            <div className="mt-6 h-1.5 w-full bg-fog">
              <div
                className="h-full bg-lime transition-[width] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-steel">
              <span>{STAGES[stage]?.label}</span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <p className="mt-1 text-[11px] text-concrete">{STAGES[stage]?.detail}</p>

            <div className="mt-6 border border-hairline p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 bg-lime" />
                <span className="spec">DETECTED SCOPE TAGS</span>
              </div>
              <div className="flex min-h-[56px] flex-wrap gap-1.5">
                {TAGS.slice(0, tags).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex border border-hairline-strong bg-fog px-2 py-0.5 font-mono text-[10px] text-carbon"
                  >
                    {tag}
                  </span>
                ))}
                {tags === 0 ? (
                  <span className="text-[11px] text-steel">Scanning sheets…</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
