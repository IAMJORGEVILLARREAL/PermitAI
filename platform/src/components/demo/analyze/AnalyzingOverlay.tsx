"use client";

import { useEffect, useState } from "react";
import { ANALYZE_STAGES } from "@/data/mockAnalysis";

const TOTAL_MS = 2800;
const STAGE_MS = 600;

const DEFAULT_TAGS = [
  "structural.slab",
  "electrical.service",
  "electrical.branch",
  "hvac.ductwork",
  "fire.alarm",
  "arch.openings",
];

/** Faruk analyze theater, restyled to Minimal Industrial (design system). */
export function AnalyzingOverlay({
  fileName,
  detectedAddress,
  scopeTags = DEFAULT_TAGS,
  onDone,
}: {
  fileName: string;
  detectedAddress: string;
  scopeTags?: string[];
  onDone: () => void;
}) {
  const [stage, setStage] = useState(0);
  const [visibleTags, setVisibleTags] = useState(0);
  const [progress, setProgress] = useState(0);
  const [addressFound, setAddressFound] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = Date.now();

    timers.push(setTimeout(() => setAddressFound(true), 700));
    for (let i = 1; i < ANALYZE_STAGES.length; i++) {
      timers.push(setTimeout(() => setStage(i), i * STAGE_MS));
    }
    const tagStep = TOTAL_MS / (scopeTags.length + 1);
    for (let i = 0; i < scopeTags.length; i++) {
      timers.push(setTimeout(() => setVisibleTags(i + 1), 400 + i * tagStep));
    }

    const tick = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(tick);
    }, 40);

    timers.push(setTimeout(onDone, TOTAL_MS));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [onDone, scopeTags]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/70 px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Analyzing plan set"
    >
      <div className="w-full max-w-lg border border-hairline-strong bg-paper p-8">
        <div className="spec">ANALYSIS · ENGINE</div>
        <h2 className="mt-3 font-display text-[26px] font-medium tracking-[-0.03em] text-carbon">
          Analyzing {fileName}
        </h2>
        <p className="mt-2 text-[13px] text-steel">
          Reading sheets · regulatory graph · trade match
        </p>

        <div
          className={`mt-6 border px-4 py-3 transition-colors duration-[240ms] ${
            addressFound ? "border-lime bg-lime-wash" : "border-hairline bg-fog/40"
          }`}
        >
          <div className="spec">ADDRESS FROM TITLE BLOCK</div>
          <div className="mt-1 text-[14px] text-carbon">
            {addressFound ? detectedAddress : "Locating title block…"}
          </div>
        </div>

        <div className="mt-6 h-1.5 w-full bg-fog">
          <div
            className="h-full bg-lime transition-[width] duration-150 ease-[cubic-bezier(0.2,0,0,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-steel">
          <span>{ANALYZE_STAGES[stage]?.label}</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>

        <div className="mt-6 border border-hairline p-4">
          <div className="spec mb-2">DETECTED SCOPE TAGS</div>
          <div className="flex min-h-[56px] flex-wrap gap-1.5">
            {scopeTags.slice(0, visibleTags).map((tag) => (
              <span
                key={tag}
                className="inline-flex border border-hairline-strong bg-fog px-2 py-0.5 font-mono text-[10px] text-carbon"
              >
                {tag}
              </span>
            ))}
            {visibleTags === 0 ? (
              <span className="text-[11px] text-steel">Scanning sheets…</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
