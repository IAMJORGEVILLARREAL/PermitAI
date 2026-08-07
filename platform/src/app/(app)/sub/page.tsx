"use client";

import { useEffect, useState } from "react";
import { getSubId, setSubId } from "@/lib/role";
import { Button } from "@/components/ui/Button";
import { SectionTitle, Rule } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/Badge";
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
    setSubId("sub-jose");
    const subId = getSubId();
    const res = await fetch(`/api/me?role=sub&subId=${subId}`);
    setData(await res.json());
  }

  useEffect(() => {
    void load();
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

  if (!data) return <p className="text-[13px] text-steel">Loading sub dashboard…</p>;

  return (
    <div>
      <SectionTitle
        code="SUB WORKBENCH"
        description={`${data.sub.name} · ${data.sub.trade} · License ${data.sub.license} · ${data.sub.rating}★`}
      >
        My work
      </SectionTitle>

      {message ? (
        <p className="mt-6 border border-hairline bg-fog/50 px-4 py-3 text-[13px] text-carbon">
          {message}
        </p>
      ) : null}

      <section className="mt-14">
        <Rule label="AWARDED SCOPES" />
        <div className="mt-6">
          {!data.awardedScopes.length ? (
            <p className="text-[13px] text-steel">
              No awards yet. As GC, post Electrical and award Biscayne Electric Co.
            </p>
          ) : (
            data.awardedScopes.map((scope) => (
              <div key={scope.id} className="border-b border-hairline py-5">
                <div className="font-display text-[17px] font-medium text-carbon">
                  {scope.trade}
                </div>
                <p className="mt-1 text-[12px] text-steel">{scope.summary}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-16">
        <Rule label="PERMIT ACKNOWLEDGEMENTS" />
        <div className="mt-6">
          {!data.permits.length ? (
            <p className="text-[13px] text-steel">No permits assigned to you yet.</p>
          ) : (
            data.permits.map((permit) => (
              <div
                key={permit.id}
                className="flex flex-col gap-4 border-b border-hairline py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-[14px] text-carbon">{permit.name}</div>
                  <div className="mt-1 text-[11px] text-steel">{permit.authority}</div>
                  <div className="mt-2">
                    <StatusPill
                      tone={permit.status === "Obtained" ? "verified" : "active"}
                    >
                      {permit.status}
                    </StatusPill>
                  </div>
                  {permit.permitNumber ? (
                    <div className="mt-2 font-mono text-[12px] text-carbon">
                      #{permit.permitNumber}
                    </div>
                  ) : null}
                </div>
                {permit.status !== "Obtained" ? (
                  <Button
                    marked
                    disabled={busyId === permit.id}
                    onClick={() => void acknowledge(permit.id)}
                  >
                    {busyId === permit.id ? "Saving…" : "Confirm permit obtained"}
                  </Button>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
