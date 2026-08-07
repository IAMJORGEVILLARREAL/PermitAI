import { cn } from "@/lib/cn";

/**
 * The mark: a measured field with a scope crosshair at its center.
 * Corner brackets = the plan boundary. Crosshair = the extracted element.
 * Drawn on a 24 grid at 1px so it stays honest at every size.
 */
export function LogoMark({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      shapeRendering="geometricPrecision"
      aria-hidden
      className={cn("text-carbon", className)}
    >
      <path d="M2.5 7.5v-5h5M16.5 2.5h5v5M21.5 16.5v5h-5M7.5 21.5h-5v-5" />
      <path d="M12 6.5v11M6.5 12h11" />
      <rect x="9.5" y="9.5" width="5" height="5" />
    </svg>
  );
}

export function Wordmark({
  size = 15,
  className,
  showMark = true,
}: {
  size?: number;
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark ? <LogoMark size={size + 5} /> : null}
      <span
        style={{ fontSize: size }}
        className="font-display font-medium tracking-[-0.03em] text-carbon"
      >
        BuildScope
      </span>
    </span>
  );
}
