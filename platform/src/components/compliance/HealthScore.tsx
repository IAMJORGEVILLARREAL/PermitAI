import { HealthScore as DSHealth } from "@/components/ui/Progress";

/** Adapter: origin/main HealthScore → design-system HealthScore. */
export function HealthScore({ score }: { score: number }) {
  return <DSHealth value={score} label="HEALTH" />;
}
