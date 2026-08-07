"use client";

import { useCallback, useState } from "react";
import { Analyzing } from "@/components/Analyzing";
import { Landing } from "@/components/Landing";
import { Results } from "@/components/Results";
import { UploadZone } from "@/components/UploadZone";
import { SCENARIO_RESULTS } from "@/data/mockAnalysis";
import type { AnalysisResult, DemoStep } from "@/lib/types";

const ZIP_SCENARIOS: { prefix: string; scenarioId: string }[] = [
  { prefix: "331", scenarioId: "miami-multifamily" },
  { prefix: "330", scenarioId: "miami-multifamily" },
  { prefix: "333", scenarioId: "miami-multifamily" },
  { prefix: "787", scenarioId: "austin-restaurant" },
  { prefix: "802", scenarioId: "denver-adu" },
];

const FALLBACK_SCENARIO = "phoenix-ti";
const FALLBACK_ZIP = "85006";

const FILENAME_SCENARIOS: { match: RegExp; scenarioId: string }[] = [
  { match: /408|miami|brickell|architectural/i, scenarioId: "miami-multifamily" },
  { match: /austin|kitchen|restaurant/i, scenarioId: "austin-restaurant" },
  { match: /denver|adu|sloan/i, scenarioId: "denver-adu" },
  { match: /phoenix|culver/i, scenarioId: "phoenix-ti" },
];

function scenarioForZip(zip: string): string {
  const hit = ZIP_SCENARIOS.find((entry) => zip.startsWith(entry.prefix));
  return hit?.scenarioId ?? FALLBACK_SCENARIO;
}

/** ZIP wins when supplied; otherwise the plan filename decides the jurisdiction. */
function resolveScenario(fileName: string, zip: string): string {
  if (zip) return scenarioForZip(zip);
  const hit = FILENAME_SCENARIOS.find((entry) => entry.match.test(fileName));
  return hit?.scenarioId ?? "miami-multifamily";
}

function zipOf(result: AnalysisResult): string {
  return result.address.match(/\b\d{5}\b/)?.[0] ?? FALLBACK_ZIP;
}

export default function Home() {
  const [step, setStep] = useState<DemoStep>("landing");
  const [fileName, setFileName] = useState("plans.pdf");
  const [zip, setZip] = useState(FALLBACK_ZIP);
  const [result, setResult] = useState<AnalysisResult>(
    SCENARIO_RESULTS[FALLBACK_SCENARIO],
  );

  const onDone = useCallback(() => setStep("results"), []);

  if (step === "landing") {
    return <Landing onStart={() => setStep("upload")} />;
  }

  if (step === "upload") {
    return (
      <UploadZone
        onBack={() => setStep("landing")}
        onAnalyze={(name, projectZip) => {
          const scenarioId = resolveScenario(name, (projectZip ?? "").trim());
          const next =
            SCENARIO_RESULTS[scenarioId] ?? SCENARIO_RESULTS[FALLBACK_SCENARIO];
          setFileName(name);
          setResult(next);
          setZip(zipOf(next));
          setStep("analyzing");
        }}
      />
    );
  }

  if (step === "analyzing") {
    return (
      <Analyzing
        fileName={fileName}
        detectedAddress={result.address}
        scopeTags={result.scopeTags}
        onDone={onDone}
      />
    );
  }

  return (
    <Results
      data={result}
      projectZip={zip}
      onRestart={() => {
        setStep("landing");
        setFileName("plans.pdf");
        setZip(FALLBACK_ZIP);
        setResult(SCENARIO_RESULTS[FALLBACK_SCENARIO]);
      }}
    />
  );
}
