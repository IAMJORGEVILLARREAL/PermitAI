export function PlanViewer({ analyzed }: { analyzed: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 text-xs text-steel">
        <span>Plan viewer</span>
        <span className={analyzed ? "text-amber" : ""}>
          {analyzed ? "AI Analysis Overlay ON" : "Original drawing"}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sample-plan.svg"
        alt="Sample construction floor plan"
        className="h-auto w-full bg-mist"
      />
      {analyzed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate/70 to-transparent p-3 text-xs text-white">
          Highlighted: electrical panel upgrade · storefront openings · partition framing
        </div>
      )}
    </div>
  );
}
