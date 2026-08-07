"use client";

import { HealthDonut } from "./HealthDonut";
import { Annotation } from "./Annotation";

export function DashboardMock() {
  return (
    <div className="relative crop-mark">
      <div className="rounded-[18px] border border-white/10 bg-black/20 p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)]">
        <div className="overflow-hidden rounded-[calc(18px-0.375rem)] border border-line bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            <span className="font-mono text-[10px] tracking-wide text-muted">
              Portfolio Command Center
            </span>
            <span className="ml-auto font-mono text-[10px] text-verified">
              LIVE
            </span>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-[140px_1fr_1fr]">
            <div className="flex flex-col items-center justify-center rounded-[12px] border border-line bg-ink/60 p-3">
              <HealthDonut score={94} size={108} />
              <p className="mt-2 text-center font-mono text-[10px] text-muted">
                Portfolio avg
              </p>
            </div>

            <div className="rounded-[12px] border border-line bg-ink/50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Risk threshold
                </span>
                <span className="font-mono text-[10px] text-signal-hot">72</span>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {[42, 58, 51, 67, 74, 61, 88, 79, 55, 69, 83, 71].map((h, i) => (
                  <div
                    key={i}
                    className="relative flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        h >= 72
                          ? "color-mix(in srgb, var(--signal-hot) 70%, transparent)"
                          : "color-mix(in srgb, var(--structural) 55%, transparent)",
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 border-t border-dashed border-signal-hot/40 pt-1">
                <span className="font-mono text-[9px] text-signal-hot">
                  threshold line
                </span>
              </div>
            </div>

            <div className="rounded-[12px] border border-line bg-ink/50 p-3">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Code Change Radar
              </div>
              <ul className="space-y-2">
                <li className="rounded-lg border border-signal/30 bg-signal/5 px-2.5 py-2">
                  <p className="font-mono text-[10px] text-signal">ALERT</p>
                  <p className="text-xs leading-snug text-paper">
                    123 Main St - shear-wall trigger
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">
                    IBC §1705.3
                  </p>
                </li>
                <li className="rounded-lg border border-line px-2.5 py-2">
                  <p className="text-xs text-muted">Austin - egress update watched</p>
                </li>
                <li className="rounded-lg border border-line px-2.5 py-2">
                  <p className="text-xs text-muted">Phoenix - MEP amendment cleared</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Annotation
        label="health score"
        className="-left-2 top-[38%] hidden lg:flex"
        align="right"
      />
      <Annotation
        label="radar feed"
        className="-right-4 bottom-[28%] hidden lg:flex"
        align="left"
      />
    </div>
  );
}
