import Link from "next/link";
import { Wordmark } from "@/components/brand/Logo";
import { SerialNumber } from "@/components/artifacts/marks";

export function LandingFooter() {
  return (
    <footer className="border-t border-graphite bg-carbon text-fog">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={15} className="[&_span]:text-white [&_svg]:text-white" />
            <p className="mt-4 max-w-[32ch] text-[13px] leading-relaxed text-concrete">
              Scoping, procurement, and permit compliance for commercial general
              contractors—and the subcontractors who bid the work.
            </p>
          </div>
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
              Platform
            </h5>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li>
                <a href="#scope" className="text-fog transition-colors hover:text-white">
                  Scope decomposition
                </a>
              </li>
              <li>
                <a href="#marketplace" className="text-fog transition-colors hover:text-white">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#compliance" className="text-fog transition-colors hover:text-white">
                  Compliance ledger
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-fog transition-colors hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
              Account
            </h5>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li>
                <Link href="/login" className="text-fog transition-colors hover:text-white">
                  Sign in
                </Link>
              </li>
              <li>
                <a href="#request" className="text-fog transition-colors hover:text-white">
                  Request access
                </a>
              </li>
              <li>
                <a href="#trust" className="text-fog transition-colors hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
              Legal
            </h5>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li>
                <span className="text-steel">Terms of service</span>
              </li>
              <li>
                <span className="text-steel">Privacy</span>
              </li>
              <li>
                <span className="text-steel">Non-circumvention</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-graphite pt-6">
          <p className="max-w-[72ch] text-[12px] leading-relaxed text-steel">
            BuildScope output is an AI-generated advisory draft for professional
            validation. It is not a licensed design, engineering, or legal
            service, and does not replace review by a qualified professional or
            the authority having jurisdiction.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <SerialNumber label="©" value="2026 BuildScope" className="!text-steel [&_span]:!text-steel" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
              Doc rev 1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
