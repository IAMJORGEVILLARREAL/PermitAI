import { LandingNav } from "./Nav";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { Loop } from "./Loop";
import { Marketplace } from "./Marketplace";
import { Scope } from "./Scope";
import { Compliance } from "./Compliance";
import { Personas } from "./Personas";
import { Pricing } from "./Pricing";
import { Trust } from "./Trust";
import { FinalCta } from "./FinalCta";
import { LandingFooter } from "./Footer";

export function LandingPage() {
  return (
    <div className="bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-carbon focus:px-3 focus:py-2 focus:text-[13px] focus:text-white"
      >
        Skip to content
      </a>
      <LandingNav />
      <main id="main">
        <Hero />
        <TrustBar />
        <Loop />
        <Marketplace />
        <Scope />
        <Compliance />
        <Personas />
        <Pricing />
        <Trust />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}
