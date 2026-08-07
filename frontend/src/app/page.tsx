"use client";

import { useCallback, useState } from "react";
import { Analyzing } from "@/components/Analyzing";
import { Landing } from "@/components/Landing";
import { Results } from "@/components/Results";
import { UploadZone } from "@/components/UploadZone";
import { SCENARIO_RESULTS } from "@/data/mockAnalysis";
import type { AnalysisResult, DemoStep } from "@/lib/types";

export default function Home() {
  const [step, setStep] = useState<DemoStep>("landing");
  const [fileName, setFileName] = useState("plans.pdf");
  const [result, setResult] = useState<AnalysisResult>(
    SCENARIO_RESULTS["phoenix-ti"],
  );

  const onDone = useCallback(() => setStep("results"), []);

  if (step === "landing") {
    return <Landing onStart={() => setStep("upload")} />;
  }

  if (step === "upload") {
    return (
      <UploadZone
        onBack={() => setStep("landing")}
        onAnalyze={(name, scenarioId) => {
          setFileName(name);
          setResult(
            SCENARIO_RESULTS[scenarioId ?? "phoenix-ti"] ??
              SCENARIO_RESULTS["phoenix-ti"],
          );
          setStep("analyzing");
        }}
      />
    );
  }

  if (step === "analyzing") {
    return <Analyzing fileName={fileName} onDone={onDone} />;
  }

  return (
    <Results
      data={result}
      onRestart={() => {
        setStep("landing");
        setFileName("plans.pdf");
        setResult(SCENARIO_RESULTS["phoenix-ti"]);
      }}
    />
  );
}
