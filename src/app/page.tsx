"use client";

import { useRouter } from "next/navigation";
import { setRole, setSubId } from "@/lib/role";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl py-10">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-amber">
        Hackathon demo
      </p>
      <h1 className="mb-3 text-4xl font-semibold tracking-tight text-slate">
        BuildScope AI
      </h1>
      <p className="mb-8 max-w-2xl text-lg text-steel">
        Turn construction plans into qualified subcontractor contracts—with permit compliance
        built into the award, not bolted on after.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setRole("gc");
            router.push("/projects");
          }}
          className="rounded-xl border border-line bg-white p-6 text-left shadow-sm transition hover:border-steel"
        >
          <p className="text-xs uppercase tracking-wide text-steel">Side A</p>
          <h2 className="mt-1 text-xl font-semibold text-slate">Continue as GC</h2>
          <p className="mt-2 text-sm text-steel">
            Run AI analysis, post scopes, level bids, and watch the compliance ledger activate.
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole("sub");
            setSubId("sub-jose");
            router.push("/sub");
          }}
          className="rounded-xl border border-line bg-white p-6 text-left shadow-sm transition hover:border-amber"
        >
          <p className="text-xs uppercase tracking-wide text-steel">Side B</p>
          <h2 className="mt-1 text-xl font-semibold text-slate">Continue as Sub</h2>
          <p className="mt-2 text-sm text-steel">
            Biscayne Electric Co. — acknowledge trade permits on awarded scopes.
          </p>
        </button>
      </div>

      <ol className="mt-10 list-decimal space-y-2 pl-5 text-sm text-steel">
        <li>GC → open Brickell Office TI → Run AI Analysis</li>
        <li>Post Electrical scope → open bids → Award</li>
        <li>Open Compliance Ledger, then switch to Sub and confirm permit obtained</li>
      </ol>
    </div>
  );
}
