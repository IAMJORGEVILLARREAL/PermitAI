"use client";

import { useCallback, useRef, useState } from "react";
import { DEMO_SCENARIOS } from "@/data/mockAnalysis";

const DEFAULT_SCENARIO = DEMO_SCENARIOS[0];

const BTN =
  "transition duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  onAnalyze: (fileName: string, scenarioId?: string) => void;
  onBack: () => void;
};

export function UploadZone({ onAnalyze, onBack }: Props) {
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const takeFile = useCallback((next?: File | null) => {
    if (!next) return;
    setFile({ name: next.name, size: next.size });
  }, []);

  const useDemo = () => {
    setFile({
      name: DEFAULT_SCENARIO.fileName,
      size: 4_200_000,
    });
    onAnalyze(DEFAULT_SCENARIO.fileName, DEFAULT_SCENARIO.id);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className={`mb-8 self-start text-sm text-[var(--muted)] hover:text-white ${BTN}`}
      >
        ← Back
      </button>

      <h1 className="display animate-rise text-4xl font-extrabold md:text-5xl">
        Upload project plans
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        PDF, DWG, RVT, or images — or use the demo plan set for live demos.
      </p>

      <button
        type="button"
        onClick={useDemo}
        className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[var(--teal)] bg-[rgba(45,212,191,0.1)] px-6 py-4 text-base font-semibold text-[var(--teal)] hover:bg-[rgba(45,212,191,0.18)] ${BTN}`}
      >
        <span className="text-xl">⚡</span>
        Use demo plan set
        <span className="text-xs font-normal text-[var(--muted)]">
          (recommended for demo)
        </span>
      </button>

      <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or upload your own
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragging(false);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          takeFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-[var(--panel)] p-8 text-center transition duration-200 ${
          dragging
            ? "scale-[1.01] border-[var(--teal)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_32px_rgba(45,212,191,0.15)]"
            : "border-[var(--line)] hover:border-[var(--cyan)] hover:bg-[rgba(56,189,248,0.04)]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => takeFile(e.target.files?.[0])}
        />
        <div
          className={`mb-4 text-4xl transition duration-200 ${dragging ? "scale-110 text-[var(--teal)]" : "text-[var(--cyan)]"}`}
        >
          ⬆
        </div>
        <div className="text-lg font-semibold">
          {file ? file.name : "Drop plan set here"}
        </div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          {file ? formatSize(file.size) : "drag a file, or use the button below"}
        </div>
        <span
          className={`mt-5 rounded-lg border border-[var(--cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--cyan)] hover:bg-[rgba(56,189,248,0.1)] ${BTN}`}
        >
          Browse files
        </span>
      </div>

      {file && (
        <div className="animate-rise mt-4 flex items-center gap-3 rounded-xl border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.08)] px-4 py-3 text-sm text-[var(--ok)]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ok)] text-xs font-bold text-[#042014]">
            ✓
          </span>
          <span>
            Ready: <span className="font-semibold">{file.name}</span>
            <span className="text-[var(--muted)]"> · {formatSize(file.size)}</span>
          </span>
        </div>
      )}

      <button
        type="button"
        disabled={!file}
        onClick={() => file && onAnalyze(file.name)}
        className={`mt-8 rounded-xl px-8 py-4 text-base font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${
          file
            ? "bg-[var(--cyan)] text-[#041018] shadow-[0_0_28px_rgba(56,189,248,0.4)] hover:brightness-110 active:scale-[0.97]"
            : "bg-[var(--cyan)] text-[#041018]"
        } ${BTN}`}
      >
        Run AI Analysis →
      </button>
    </section>
  );
}
