/** origin/main plan viewer, restyled to Minimal Industrial. */
export function PlanViewer({ analyzed }: { analyzed?: boolean }) {
  return (
    <figure className="border border-hairline bg-fog/40">
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline px-4 py-3">
        <div className="spec">A-201 · LEVEL 2 FLOOR PLAN</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
          {analyzed ? "OVERLAY ON" : "RAW SHEET"}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sample-plan.svg"
        alt="Sample construction plan sheet"
        className="block h-auto w-full"
      />
      <figcaption className="border-t border-hairline px-4 py-2.5 text-[11px] text-steel">
        {analyzed
          ? "AI overlay active — structural / MEP triggers marked on sheet."
          : "Demo sheet from origin/main. Run analysis to extract scopes."}
      </figcaption>
    </figure>
  );
}
