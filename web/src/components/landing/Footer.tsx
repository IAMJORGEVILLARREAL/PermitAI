const sitemap = [
  {
    title: "Product",
    links: [
      { href: "#product", label: "Features" },
      { href: "#radar", label: "Code Change Radar" },
      { href: "#how", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "#trust", label: "Security" },
      { href: "#trust", label: "Advisory disclaimer" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#cta", label: "Contact" },
      { href: "#cta", label: "Design partners" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_2fr] md:px-6">
        <div>
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-paper">
            PermitAI
          </a>
          <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">
            Compliance-as-a-Service for construction. The system of record for permit risk.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {sitemap.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-paper/80 transition-colors hover:text-signal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="disclaimer-bar px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] leading-relaxed text-muted">
            PermitAI output is an AI-generated advisory draft for professional validation. Not a licensed design or legal service.
          </p>
          <p className="shrink-0 font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} PermitAI
          </p>
        </div>
      </div>
    </footer>
  );
}
