type Props = { onStart: () => void };

export function Landing({ onStart }: Props) {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-6 rounded-full border border-[var(--line)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
        Marketplace Demo
      </span>

      <h1 className="display text-7xl font-extrabold tracking-tight text-[var(--cyan)] md:text-8xl">
        BuildScope
      </h1>

      <p className="mt-6 max-w-xl text-lg text-[var(--muted)] md:text-xl">
        Upload your plans — we scope every permit and document you need, then
        match you with rated local subcontractors near your project site.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-[var(--muted)]">
        {["Permits & approvals", "Document checklist", "Local trade matching"].map(
          (item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--line)] px-3 py-1.5"
            >
              {item}
            </span>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-12 rounded-xl bg-[var(--cyan)] px-10 py-4 text-lg font-semibold text-[#041018] shadow-[0_0_28px_rgba(56,189,248,0.35)] transition duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        Analyze a project →
      </button>

      <p className="mt-5 text-sm text-[var(--muted)]">
        First analysis is free · Plans from{" "}
        <span className="stat-num font-semibold text-[var(--text)]">
          $299/mo
        </span>{" "}
        for small GCs
      </p>
    </section>
  );
}
