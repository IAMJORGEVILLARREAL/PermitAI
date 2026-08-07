/** Static plan sheet stand-in for the demo (OCR/CV pipeline not wired). */
export function PlanViewer({
  title = "A-201 · Level 1 floor plan",
  caption = "Sample plan set · overlay marks extracted scope triggers",
}: {
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="border border-hairline bg-fog/40">
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline px-4 py-3">
        <div className="spec">{title}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
          PLAN SET
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sample-plan.svg"
        alt={caption}
        className="block h-auto w-full"
      />
      <figcaption className="border-t border-hairline px-4 py-2.5 text-[11px] text-steel">
        {caption}
      </figcaption>
    </figure>
  );
}
