import Image from "next/image";
import { Reveal } from "./Reveal";

const PERSONAS = [
  {
    name: "Paul",
    role: "GC owner · 10–50 employees",
    image: "/images/persona-paul.jpg",
    alt: "Illustrative portrait of a general contractor owner.",
    headline: "Stop scoping by hand.",
    body: "Upload Monday. Competitive bids from verified subs by Wednesday—including firms you have never called. Save days of takeoff and often mid-single-digit percent on the package.",
    today: "Email PDFs to the same five subs. Level in a spreadsheet.",
    instead: "Post a package. Compare sealed bids with ratings and history.",
  },
  {
    name: "Maria",
    role: "Compliance director · 100–500 employees",
    image: "/images/persona-maria.jpg",
    alt: "Illustrative portrait of a compliance director.",
    headline: "One ledger across thirty jobs.",
    body: "License status, insurance expiry, and permit acknowledgement—live across the portfolio. When a sub lets a credential lapse, access suspends before it becomes your liability.",
    today: "Spreadsheets, Procore tabs, and frantic phone calls.",
    instead: "Health score and responsible-party ledger, updated in real time.",
  },
  {
    name: "Jose",
    role: "Electrical sub · 15–40 employees",
    image: "/images/persona-ray.jpg",
    alt: "Illustrative portrait of a subcontractor owner.",
    headline: "Bid what is already measured.",
    body: "Matched invite: 200A service, 45 branch circuits, 120 fixtures. Pre-extracted sheets. Estimated takeoff time saved: hours. Free to receive work; 4.5% only when you win.",
    today: "100-page sets. Manual fixture counts. Bids you lose.",
    instead: "Structured package. Bid in minutes. Pay on award only.",
  },
];

export function Personas() {
  return (
    <section id="users" className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="spec mb-3">P1.01 / Two sides</div>
          <h2 className="max-w-[14ch] font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon">
            One record. Both sides of the bid.
          </h2>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
            Personas are illustrative · not real customers
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-fog">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
                  {p.name} · {p.role}
                </p>
                <h3 className="mt-3 font-display text-[22px] font-medium tracking-[-0.02em] text-carbon">
                  {p.headline}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-steel">
                  {p.body}
                </p>
                <dl className="mt-5 border-t border-hairline">
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-hairline py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
                      Today
                    </dt>
                    <dd className="m-0 text-[12px] leading-relaxed text-steel">
                      {p.today}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
                      Instead
                    </dt>
                    <dd className="m-0 text-[12px] leading-relaxed text-carbon">
                      {p.instead}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
