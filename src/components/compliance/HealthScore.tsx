export function HealthScore({ score }: { score: number }) {
  const color =
    score < 70 ? "text-danger border-danger" : score < 90 ? "text-amber border-amber" : "text-green border-green";

  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-semibold ${color}`}
      title="Compliance Health Score"
    >
      {score}
    </div>
  );
}
