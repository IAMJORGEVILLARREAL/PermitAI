import { redirect } from "next/navigation";
import { Wordmark } from "@/components/brand/Logo";
import { getSessionUser } from "@/lib/auth/session";
import { AdvisoryNotice } from "@/components/ui/Feedback";
import {
  CornerBrackets,
  RegistrationMark,
  ScaleRule,
  SerialNumber,
} from "@/components/artifacts/marks";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/projects");

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_460px]">
      {/* Left: the industrial surface. Plan grid, marks, nothing else. */}
      <aside className="relative hidden overflow-hidden bg-carbon lg:block">
        <div className="material-grid-dark absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
              BuildScope
            </span>
            <RegistrationMark className="text-steel" />
          </div>

          <CornerBrackets tone="concrete" className="p-10">
            <h1 className="max-w-[14ch] font-display text-[56px] font-medium leading-[0.98] tracking-[-0.04em] text-white">
              Plans in. Contracts out.
            </h1>
            <p className="mt-8 max-w-[46ch] text-[14px] leading-relaxed text-concrete">
              Quantified scope packages, competitive bids from verified
              subcontractors, and permit compliance with a citation behind every
              line.
            </p>
          </CornerBrackets>

          <div className="flex items-end justify-between">
            <SerialNumber label="METROS" value="PHX / DFW / ATL" />
            <RegistrationMark className="text-steel" />
          </div>
        </div>
      </aside>

      {/* Right: the form. */}
      <main className="flex flex-col justify-between px-8 py-10 sm:px-14">
        <Wordmark size={16} />

        <div className="py-16">
          <span className="spec">ACCESS</span>
          <h2 className="mt-4 font-display text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-carbon">
            Sign in
          </h2>
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>

        <div>
          <ScaleRule className="mb-6" />
          <AdvisoryNotice />
        </div>
      </main>
    </div>
  );
}
