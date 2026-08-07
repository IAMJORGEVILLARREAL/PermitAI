import Image from "next/image";
import { ScaleRule, SerialNumber } from "@/components/artifacts/marks";
import { IconArrowRight } from "@/components/icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-site.jpg"
          alt="Early morning on a commercial jobsite: a concrete deck pour inside a structural steel frame."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(248,248,246,0.92) 0%, rgba(248,248,246,0.78) 42%, rgba(248,248,246,0.55) 68%, rgba(248,248,246,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1180px] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <SerialNumber label="DOC" value="BSC-LP-0001" />
            <span className="hidden h-3 w-px bg-hairline-strong sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
              Phoenix · Dallas · Atlanta
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-10 font-display text-[15px] font-medium tracking-[-0.02em] text-carbon sm:text-[17px]">
            BuildScope
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(44px,9vw,80px)] font-medium leading-[0.94] tracking-[-0.04em] text-carbon">
            Plans in. Contracts out.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-steel sm:text-[16px]">
            Read the set, post quantified scopes to verified subcontractors, and
            lock permit accountability into every award.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#request"
              className="relative inline-flex h-11 items-center gap-2.5 bg-carbon px-6 pl-7 text-[14px] font-medium text-white transition-[background-color,transform] duration-[100ms] ease-[cubic-bezier(0.2,0,0,1)] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-lime hover:bg-graphite active:translate-y-px"
            >
              Request access
              <IconArrowRight size={14} />
            </a>
            <a
              href="#marketplace"
              className="inline-flex h-11 items-center px-6 text-[14px] font-medium text-carbon shadow-[inset_0_0_0_1px_var(--color-hairline-strong)] transition-[background-color,transform] duration-[100ms] hover:bg-fog/70 active:translate-y-px"
            >
              See the marketplace
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <ScaleRule
            className="mt-14 max-w-md"
            labels={["01", "02", "03", "04", "05"]}
          />
        </Reveal>
      </div>
    </section>
  );
}
