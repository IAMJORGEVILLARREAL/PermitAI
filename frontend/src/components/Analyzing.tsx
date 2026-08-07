"use client";

import { useEffect, useState } from "react";
import { ANALYZE_STAGES } from "@/data/mockAnalysis";

const TOTAL_MS = 3000;
const STAGE_MS = 650;

type Props = {
  fileName: string;
  detectedAddress: string;
  scopeTags: string[];
  onDone: () => void;
};

export function Analyzing({
  fileName,
  detectedAddress,
  scopeTags,
  onDone,
}: Props) {
  const [stage, setStage] = useState(0);
  const [visibleTags, setVisibleTags] = useState(0);
  const [progress, setProgress] = useState(0);
  const [addressFound, setAddressFound] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = Date.now();

    timers.push(setTimeout(() => setAddressFound(true), 900));

    for (let i = 1; i < ANALYZE_STAGES.length; i++) {
      timers.push(setTimeout(() => setStage(i), i * STAGE_MS));
    }

    const tagInterval = TOTAL_MS / (scopeTags.length + 1);
    for (let i = 0; i < scopeTags.length; i++) {
      timers.push(setTimeout(() => setVisibleTags(i + 1), 500 + i * tagInterval));
    }

    const progressTick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(pct);
      if (elapsed >= TOTAL_MS) clearInterval(progressTick);
    }, 40);

    timers.push(setTimeout(onDone, TOTAL_MS));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressTick);
    };
  }, [onDone, scopeTags]);

  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[var(--cyan)] animate-pulse-ring" />
        <div className="absolute inset-3 rounded-full border border-[var(--teal)] opacity-60 animate-pulse-ring [animation-delay:0.4s]" />
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--bg-2)]">
          <div className="scan-line absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </div>
      </div>

      <h1 className="display text-3xl font-extrabold md:text-4xl">
        Analyzing {fileName}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Reading sheets · regulatory graph · local trade match
      </p>

      <div
        className={`mt-6 w-full max-w-md rounded-xl border px-4 py-3 text-left transition-all duration-500 ${
          addressFound
            ? "border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.08)] opacity-100"
            : "border-[var(--line)] opacity-40"
        }`}
      >
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
          Project address from plans
        </div>
        <div className="mt-1 font-semibold">
          {addressFound ? detectedAddress : "Locating title block…"}
        </div>
      </div>

      <div className="mt-6 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-[rgba(56,189,248,0.12)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--teal)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium tabular-nums text-[var(--cyan)]">
        {Math.round(progress)}%
      </p>

      {/* Live scope ticker — the WOW moment */}
      <div className="mt-6 w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 text-left">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ok)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--ok)]" />
          </span>
          Detected scope
        </div>
        <div className="flex min-h-[72px] flex-wrap gap-1.5">
          {SCOPE_TAGS.slice(0, visibleTags).map((tag) => (
            <span
              key={tag}
              className="animate-tag-pop inline-flex items-center gap-1 rounded-md border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.1)] px-2 py-0.5 font-mono text-[11px] text-[var(--ok)]"
            >
              {tag}
              <span className="text-[10px]">✓</span>
            </span>
          ))}
          {visibleTags === 0 && (
            <span className="text-xs text-[var(--muted)]">Scanning sheets…</span>
          )}
        </div>
      </div>

      <ul className="mt-6 w-full max-w-md space-y-3 text-left">
        {ANALYZE_STAGES.map((s, i) => {
          const active = stage === i;
          const done = stage > i;
          return (
            <li
              key={s.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
                done
                  ? "border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.08)]"
                  : active
                    ? "border-[var(--cyan)] bg-[rgba(56,189,248,0.1)] shadow-[0_0_16px_rgba(56,189,248,0.12)]"
                    : "border-[var(--line)] opacity-50"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  done
                    ? "scale-100 bg-[var(--ok)] text-[#042014]"
                    : active
                      ? "scale-110 bg-[var(--cyan)] text-[#041018]"
                      : "bg-[var(--bg-2)] text-[var(--muted)]"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <div>
                <div className="font-semibold">{s.label}</div>
                <div className="text-xs text-[var(--muted)]">{s.detail}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
