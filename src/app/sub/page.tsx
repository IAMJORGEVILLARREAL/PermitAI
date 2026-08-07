"use client";

import { useEffect, useState } from "react";
import { getSubId } from "@/lib/role";
import type { PermitRequirement, ScopePackage, SubProfile } from "@/lib/types";

type SubMe = {
  role: "sub";
  sub: SubProfile;
  awardedScopes: ScopePackage[];
  permits: PermitRequirement[];
};

export default function SubDashboardPage() {
  const [data, setData] = useState<SubMe | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const subId = getSubId();
    const res = await fetch(`/api/me?role=sub&subId=${subId}`);
    setData(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function acknowledge(permitId: string) {
    setBusyId(permitId);
    setMessage(null);
    try {
      const res = await fetch(`/api/permits/${permitId}/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Obtained",
          permitNumber: `MIA-E-${Math.floor(10000 + Math.random() * 89999)}`,
        }),
      });
      if (!res.ok) throw new Error("ack failed");
      setMessage("Permit marked Obtained and logged to the GC Compliance Ledger.");
      await load();
    } catch {
      setMessage("Could not acknowledge permit.");
    } finally {
      setBusyId(null);
    }
  }

  if (!data) return <p className="text-steel">Loading sub dashboard…</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-slate">My Work</h1>
      <p className="mb-6 text-steel">
        {data.sub.name} · {data.sub.trade} · License {data.sub.license} · {data.sub.rating}★
      </p>

      {message && (
        <p className="mb-4 rounded-md border border-line bg-white px-3 py-2 text-sm text-slate">
          {message}
        </p>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-slate">Awarded scopes</h2>
        {!data.awardedScopes.length ? (
          <p className="text-sm text-steel">
            No awards yet. As GC, post the Electrical scope and award Biscayne Electric Co.
          </p>
        ) : (
          <div className="space-y-3">
            {data.awardedScopes.map((scope) => (
              <div key={scope.id} className="rounded-lg border border-line bg-white p-4">
                <h3 className="font-semibold text-slate">{scope.trade}</h3>
                <p className="text-sm text-steel">{scope.summary}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-slate">Permit acknowledgements</h2>
        {!data.permits.length ? (
          <p className="text-sm text-steel">No permits assigned to you yet.</p>
        ) : (
          <div className="space-y-3">
            {data.permits.map((permit) => (
              <div
                key={permit.id}
                className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate">{permit.name}</h3>
                  <p className="text-sm text-steel">{permit.authority}</p>
                  <p className="text-xs text-steel">Status: {permit.status}</p>
                  {permit.permitNumber && (
                    <p className="text-xs text-green">#{permit.permitNumber}</p>
                  )}
                </div>
                {permit.status !== "Obtained" && (
                  <button
                    type="button"
                    disabled={busyId === permit.id}
                    onClick={() => acknowledge(permit.id)}
                    className="rounded-md bg-green px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
                  >
                    {busyId === permit.id ? "Saving…" : "Confirm Permit Obtained"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
