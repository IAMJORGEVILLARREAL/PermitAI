"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEMO_SCENARIOS } from "@/data/mockAnalysis";

const DEFAULT_SCENARIO = DEMO_SCENARIOS[0];

const SCENARIO_ZIPS: Record<string, string> = {
  "miami-multifamily": "33130",
  "phoenix-ti": "85006",
  "austin-restaurant": "78702",
  "denver-adu": "80211",
};

function zipFor(scenarioId: string): string {
  return SCENARIO_ZIPS[scenarioId] ?? "85006";
}

const BTN =
  "transition duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

/** Names the shared plan set from a URL so the analysis reads the same either way. */
function parseLink(raw: string): { host: string; name: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    );
    if (!url.hostname.includes(".")) return null;
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    return {
      host: url.hostname.replace(/^www\./, ""),
      name: decodeURIComponent(lastSegment || url.hostname),
    };
  } catch {
    return null;
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  onAnalyze: (fileName: string, zip: string) => void;
  onBack: () => void;
};

export function UploadZone({ onAnalyze, onBack }: Props) {
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [link, setLink] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const takeFile = useCallback((next?: File | null) => {
    if (!next) return;
    setFile({ name: next.name, size: next.size });
  }, []);

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const linkSource = useMemo(() => parseLink(link), [link]);
  const source = file
    ? { name: file.name }
    : linkSource
      ? { name: linkSource.name }
      : null;

  // A file released outside the drop zone would otherwise make the browser
  // navigate to it, losing the app mid-presentation.
  useEffect(() => {
    const block = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragover", block);
    window.addEventListener("drop", block);
    return () => {
      window.removeEventListener("dragover", block);
      window.removeEventListener("drop", block);
    };
  }, []);

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
        Drop the plan set or paste a link to it. We read the address off the
        drawings and pull the right permits and local crews.
      </p>

      {/* Kept outside the drop zone: a click from inside it would bubble back
          and re-trigger openPicker, which makes Chrome suppress the dialog. */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          takeFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
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
        className={`mt-6 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-[var(--panel)] p-8 text-center transition duration-200 ${
          dragging
            ? "scale-[1.01] border-[var(--teal)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_32px_rgba(45,212,191,0.15)]"
            : "border-[var(--line)] hover:border-[var(--cyan)] hover:bg-[rgba(56,189,248,0.04)]"
        }`}
      >
        <div
          className={`mb-3 text-4xl transition duration-200 ${dragging ? "scale-110 text-[var(--teal)]" : "text-[var(--cyan)]"}`}
        >
          ⬆
        </div>
        <div className="text-lg font-semibold">
          {file ? file.name : "Drop plan set here"}
        </div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          {file ? formatSize(file.size) : "PDF · DWG · RVT · images"}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openPicker();
          }}
          className={`mt-5 rounded-lg border border-[var(--cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--cyan)] hover:bg-[rgba(56,189,248,0.1)] ${BTN}`}
        >
          {file ? "Choose a different file" : "Browse files"}
        </button>
      </div>

      <div className="mt-5">
        <label
          htmlFor="plan-link"
          className="text-sm font-semibold text-[var(--muted)]"
        >
          Or paste a link to the plans
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            id="plan-link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Dropbox, Google Drive, plan room…"
            className="min-w-[260px] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-base text-[var(--text)] outline-none transition placeholder:text-[rgba(147,164,195,0.5)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]"
          />
          {linkSource && (
            <span className="self-center rounded-lg bg-[rgba(52,211,153,0.12)] px-3 py-2 text-sm font-medium text-[var(--ok)]">
              ✓ {linkSource.host}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={!source}
        onClick={() => source && onAnalyze(source.name, "")}
        className={`mt-6 rounded-xl px-8 py-5 text-lg font-bold transition disabled:cursor-not-allowed ${
          source
            ? "animate-pulse-glow bg-[var(--cyan)] text-[#041018] shadow-[0_0_36px_rgba(56,189,248,0.55)]"
            : "border border-[var(--line)] bg-transparent text-[var(--muted)]"
        } ${BTN}`}
      >
        {source ? "Analyze →" : "Add a file or link to analyze"}
      </button>

      <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or run a saved project
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {DEMO_SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => onAnalyze(scenario.fileName, zipFor(scenario.id))}
            className={`rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 text-left hover:border-[var(--teal)] hover:bg-[rgba(45,212,191,0.08)] ${BTN}`}
          >
            <div className="text-xs uppercase tracking-wide text-[var(--teal)]">
              {scenario.city}
            </div>
            <div className="mt-1 font-semibold">{scenario.label}</div>
            <div className="mt-1 text-xs text-[var(--muted)]">
              {scenario.blurb}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          onAnalyze(DEFAULT_SCENARIO.fileName, zipFor(DEFAULT_SCENARIO.id))
        }
        className={`mt-4 rounded-xl border-2 border-[var(--teal)] bg-[rgba(45,212,191,0.1)] px-6 py-3 text-sm font-semibold text-[var(--teal)] hover:bg-[rgba(45,212,191,0.18)] ${BTN}`}
      >
        ⚡ Use demo plan set — {DEFAULT_SCENARIO.city}
      </button>
    </section>
  );
}
