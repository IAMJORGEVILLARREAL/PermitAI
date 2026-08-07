import { Reveal } from "./Reveal";

const CELLS = [
  {
    k: "Rules engine",
    h: "Deterministic, not generated",
    p: "Permit requirements execute against a versioned rule graph. Generative models are confined to interpreting unstructured plan notes.",
  },
  {
    k: "Citations",
    h: "Linked to adopted code",
    p: "Every requirement carries its issuing authority, the scope tag that triggered it, and a link to the municipal section in force.",
  },
  {
    k: "Audit log",
    h: "Immutable and versioned",
    p: "Every user action, contract event, and rule version used is recorded and cannot be rewritten after the fact.",
  },
  {
    k: "Isolation",
    h: "Walled between tenants",
    p: "Bids, contract values, and pricing never cross between competing organizations. Enterprise adds dedicated schema isolation.",
  },
  {
    k: "Encryption",
    h: "AES-256 and TLS 1.3",
    p: "Data encrypted at rest and in transit. SOC 2 Type II certification targeted within twelve months of launch.",
  },
  {
    k: "Standing",
    h: "A draft for validation",
    p: "Output is an advisory draft for professional review. BuildScope is not a licensed design, engineering, or legal service.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">T1.01 / Trust</div>
          <h2 className="max-w-[16ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            What the output is, and what it is not.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((c, i) => (
            <Reveal key={c.k} delay={i * 40}>
              <article className="h-full bg-paper p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                  {c.k}
                </p>
                <h3 className="mt-4 font-display text-[18px] font-medium tracking-[-0.02em] text-carbon">
                  {c.h}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-steel">{c.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
