"use client";

type Props = {
  onClick: () => void;
  loading?: boolean;
  label?: string;
};

export function AwardButton({ onClick, loading, label = "Award" }: Props) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="rounded-md bg-amber px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95 disabled:opacity-60"
    >
      {loading ? "Awarding…" : label}
    </button>
  );
}
