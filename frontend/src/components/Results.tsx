"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { Pricing } from "@/components/Pricing";
import type { AnalysisResult, Permit, Subcontractor } from "@/lib/types";

const BTN =
  "transition duration-150 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const BTN_GHOST =
  "transition duration-150 hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

type Props = {
  data: AnalysisResult;
  projectZip?: string;
  onRestart: () => void;
};

type SortMode = "distance" | "rating" | "match" | "reviews";
type RadiusOption = 10 | 20 | 30 | 50;

type TradeGroup = {
  trade: string;
  crews: Subcontractor[];
  topRating: number;
  nearestMi: number;
};

type FlatDocument = {
  name: string;
  permits: string[];
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <span aria-label={`${rating} out of 5 stars`}>
      <span className="text-[var(--amber)]">{"★".repeat(full)}</span>
      {half && <span className="text-[rgba(251,191,36,0.6)]">★</span>}
      <span className="text-[rgba(251,191,36,0.25)]">
        {"★".repeat(5 - full - (half ? 1 : 0))}
      </span>
    </span>
  );
}

function MapPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function cityFromAddress(address: string): string {
  const parts = address.split(",").map((part) => part.trim());
  return parts.length >= 2 ? parts[parts.length - 2] : address;
}

function flattenDocuments(permits: Permit[]): FlatDocument[] {
  const map = new Map<string, string[]>();
  for (const permit of permits) {
    for (const doc of permit.docs) {
      const existing = map.get(doc) ?? [];
      if (!existing.includes(permit.name)) {
        existing.push(permit.name);
      }
      map.set(doc, existing);
    }
  }
  return Array.from(map.entries())
    .map(([name, permitNames]) => ({ name, permits: permitNames }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function compareBy(mode: SortMode) {
  switch (mode) {
    case "match":
      return (a: Subcontractor, b: Subcontractor) => b.match - a.match;
    case "reviews":
      return (a: Subcontractor, b: Subcontractor) =>
        b.reviewCount - a.reviewCount;
    case "rating":
      return (a: Subcontractor, b: Subcontractor) => b.rating - a.rating;
    case "distance":
    default:
      return (a: Subcontractor, b: Subcontractor) => a.distanceMi - b.distanceMi;
  }
}

function sortContractors(
  contractors: Subcontractor[],
  mode: SortMode,
): Subcontractor[] {
  return [...contractors].sort(compareBy(mode));
}

/** Crews arrive pre-sorted, so each group's first crew represents it in the group order. */
function groupByTrade(
  contractors: Subcontractor[],
  mode: SortMode,
): TradeGroup[] {
  const map = new Map<string, Subcontractor[]>();
  for (const crew of contractors) {
    map.set(crew.trade, [...(map.get(crew.trade) ?? []), crew]);
  }
  const compare = compareBy(mode);
  return Array.from(map.entries())
    .map(([trade, crews]) => ({
      trade,
      crews,
      topRating: Math.max(...crews.map((c) => c.rating)),
      nearestMi: Math.min(...crews.map((c) => c.distanceMi)),
    }))
    .sort((a, b) => compare(a.crews[0], b.crews[0]));
}

function tradeSearchUrl(trade: string, city: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(
    `${trade} contractors near ${city}`,
  )}`;
}

export function Results({ data, projectZip, onRestart }: Props) {
  const [invited, setInvited] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [readyDocs, setReadyDocs] = useState<Record<string, boolean>>({});
  const [radius, setRadius] = useState<RadiusOption>(30);
  const [sortMode, setSortMode] = useState<SortMode>("distance");
  const [openTrades, setOpenTrades] = useState<Record<string, boolean>>({});
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const zipCode = projectZip ?? "85006";
  const city = cityFromAddress(data.address);

  const documents = useMemo(
    () => flattenDocuments(data.permits),
    [data.permits],
  );
  const readyCount = documents.filter((d) => readyDocs[d.name]).length;

  const filteredContractors = useMemo(() => {
    const withinRadius = data.subcontractors.filter(
      (s) => s.distanceMi <= radius,
    );
    return sortContractors(withinRadius, sortMode);
  }, [data.subcontractors, radius, sortMode]);

  const tradeGroups = useMemo(
    () => groupByTrade(filteredContractors, sortMode),
    [filteredContractors, sortMode],
  );

  const isOpen = (trade: string, index: number) =>
    openTrades[trade] ?? index === 0;

  const toggleTrade = (trade: string, index: number) =>
    setOpenTrades((prev) => ({ ...prev, [trade]: !isOpen(trade, index) }));

  const invite = (id: string, company: string) => {
    setInvited((prev) => ({ ...prev, [id]: true }));
    setToast(`Quote requested from ${company}`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const toggleDoc = (name: string) => {
    setReadyDocs((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-8 pb-24">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="display text-2xl font-bold text-[var(--cyan)]">
            BuildScope
          </div>
          <p className="text-sm text-[var(--muted)]">
            {data.projectName} · {data.address}
          </p>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className={`rounded-lg border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] ${BTN_GHOST}`}
        >
          New project
        </button>
      </header>

      {/* Section 0 — Project header */}
      <div className="animate-rise mb-12 flex flex-wrap items-center gap-4 rounded-2xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] p-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--amber)]">
            Project readiness
          </div>
          <div className="display stat-num text-5xl font-extrabold text-[var(--amber)]">
            {data.healthScore}
          </div>
      </div>
        <div className="h-10 w-px bg-[var(--line)]" />
        <div className="text-sm text-[var(--muted)]">
          <div>
            Est. fees{" "}
            <span className="stat-num">
              ${data.feeTotalLow.toLocaleString()} – $
              {data.feeTotalHigh.toLocaleString()}
            </span>
            </div>
          <div className="mt-1">
            <span className="stat-num">{data.permits.length}</span> permits ·{" "}
            <span className="stat-num">{documents.length}</span> documents ·{" "}
            <span className="stat-num">{filteredContractors.length}</span>{" "}
            local companies across{" "}
            <span className="stat-num">{tradeGroups.length}</span> trades
          </div>
      </div>
        <div className="ml-auto flex flex-wrap gap-2">
          {[data.occupancy, data.workType, data.valuation].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--teal)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section 1 — Permits & Approvals */}
      <section className="mb-12">
        <div
          className="animate-rise mb-5 flex flex-wrap items-end justify-between gap-3"
          style={{ animationDelay: "40ms" }}
        >
          <div>
            <h2 className="display text-2xl font-bold">Permits & Approvals</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Required for {cityFromAddress(data.address)} ·{" "}
              <span className="stat-num">{data.permits.length}</span> permits
            </p>
          </div>
          <div className="text-right text-sm">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              Total est. fees
            </div>
            <div className="stat-num font-semibold text-[var(--teal)]">
              ${data.feeTotalLow.toLocaleString()} – $
              {data.feeTotalHigh.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.permits.map((p, i) => (
            <article
              key={p.id}
              className="animate-rise rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4"
              style={{ animationDelay: `${80 + i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-[var(--muted)]">{p.authority}</p>
                </div>
                <span className="stat-num shrink-0 rounded-full bg-[rgba(52,211,153,0.15)] px-2 py-0.5 text-xs font-semibold text-[var(--ok)]">
                  {p.confidence}%
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{p.trigger}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--teal)]">
                <span>{p.citation}</span>
                {p.feeHigh > 0 && (
                  <span className="stat-num">
                    ${p.feeLow.toLocaleString()}–$
                    {p.feeHigh.toLocaleString()}
                  </span>
                )}
                <span>{p.timeline}</span>
              </div>
              {p.sourceUrl && (
                <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-3">
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-xs font-semibold text-[var(--cyan)] hover:underline ${BTN_GHOST}`}
                  >
                    View official source
                  </a>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(52,211,153,0.12)] px-2 py-0.5 text-[11px] font-medium text-[var(--ok)]">
                    ✓ Verified {p.verifiedOn}
            </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Section 2 — Required Documents */}
      <section className="animate-rise mb-12 rounded-2xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.06)] p-5 md:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="display text-2xl font-bold text-[var(--amber)]">
              Required Documents
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Checklist across all permits · mark items ready as you gather them
            </p>
          </div>
          <div className="text-right">
            <div className="stat-num text-lg font-semibold text-[var(--amber)]">
              {readyCount} of {documents.length} documents ready
            </div>
            <div className="mt-1.5 h-1.5 w-40 overflow-hidden rounded-full bg-[rgba(251,191,36,0.15)]">
              <div
                className="h-full rounded-full bg-[var(--amber)] transition-all duration-300"
                style={{
                  width:
                    documents.length > 0
                      ? `${(readyCount / documents.length) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>

        <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((doc, i) => {
            const isReady = !!readyDocs[doc.name];
            return (
              <li
                key={doc.name}
                className="animate-rise flex items-start gap-3 rounded-lg border border-[rgba(251,191,36,0.2)] bg-[rgba(11,18,32,0.5)] px-4 py-3"
                style={{ animationDelay: `${120 + i * 30}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleDoc(doc.name)}
                  aria-pressed={isReady}
                  aria-label={`Mark ${doc.name} as ${isReady ? "not ready" : "ready"}`}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                    isReady
                      ? "border-[var(--ok)] bg-[rgba(52,211,153,0.2)] text-[var(--ok)]"
                      : "border-[rgba(251,191,36,0.4)] hover:border-[var(--amber)]"
                  } ${BTN_GHOST}`}
                >
                  {isReady && <span className="text-xs font-bold">✓</span>}
                </button>
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-medium transition ${
                      isReady
                        ? "text-[var(--muted)] line-through decoration-[var(--ok)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {doc.name}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                    {doc.permits.join(" · ")}
                  </p>
                </div>
              </li>
            );
          })}
          </ul>
        </section>

      {/* Section 3 — Local Subcontractors */}
      <section>
        <div className="animate-rise mb-5">
          <h2 className="display text-3xl font-bold">Local Subcontractors</h2>
          <p className="mt-1 text-base text-[var(--muted)]">
            Grouped by trade · from Google Maps within{" "}
            <span className="stat-num">{radius}</span> miles of{" "}
            <span className="stat-num">{zipCode}</span> ({city})
          </p>
        </div>

        <div
          className="animate-rise mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4"
          style={{ animationDelay: "40ms" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Project ZIP
            </span>
            <span className="stat-num rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm font-semibold text-[var(--teal)]">
              {zipCode}
            </span>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Radius
            </span>
            <select
              value={radius}
              onChange={(e) =>
                setRadius(Number(e.target.value) as RadiusOption)
              }
              className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--cyan)]"
            >
              <option value={10}>10 miles</option>
              <option value={20}>20 miles</option>
              <option value={30}>30 miles</option>
              <option value={50}>50 miles</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Sort by
            </span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--cyan)]"
            >
              <option value="distance">Nearest first</option>
              <option value="rating">Top rated</option>
              <option value="match">Best match</option>
              <option value="reviews">Most reviews</option>
            </select>
          </label>

          <div className="ml-auto text-base text-[var(--teal)]">
            <span className="stat-num font-semibold">
              {filteredContractors.length}
            </span>{" "}
            companies across{" "}
            <span className="stat-num font-semibold">{tradeGroups.length}</span>{" "}
            trades
          </div>
        </div>

        {filteredContractors.length === 0 ? (
          <div className="animate-rise rounded-xl border border-[var(--line)] bg-[var(--panel)] p-8 text-center text-sm text-[var(--muted)]">
            No contractors within {radius} miles of ZIP {zipCode}. Try
            increasing the radius.
          </div>
        ) : (
          <div className="space-y-3">
            {tradeGroups.map((group, gi) => {
              const open = isOpen(group.trade, gi);
              return (
                <div
                  key={group.trade}
                  className="animate-rise overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]"
                  style={{ animationDelay: `${60 + gi * 40}ms` }}
                >
                  <div className="flex flex-wrap items-center gap-3 p-4">
                    <button
                      type="button"
                      onClick={() => toggleTrade(group.trade, gi)}
                      aria-expanded={open}
                      className={`flex flex-1 items-center gap-3 text-left ${BTN_GHOST}`}
                    >
                      <span
                        className={`text-[var(--cyan)] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        aria-hidden
                      >
                        ▶
                      </span>
                      <span className="display text-xl font-bold">
                        {group.trade}
                      </span>
                      <span className="rounded-full bg-[rgba(56,189,248,0.12)] px-3 py-1 text-sm font-semibold text-[var(--cyan)]">
                        <span className="stat-num">{group.crews.length}</span>{" "}
                        {group.crews.length === 1 ? "company" : "companies"}
                      </span>
                      <span className="text-sm text-[var(--muted)]">
                        top <StarRating rating={group.topRating} />{" "}
                        <span className="stat-num">{group.topRating}</span> ·
                        nearest{" "}
                        <span className="stat-num">{group.nearestMi}</span> mi
                      </span>
                    </button>

                    <a
                      href={tradeSearchUrl(group.trade, city)}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--cyan)] px-3 py-2 text-sm font-semibold text-[var(--cyan)] hover:bg-[rgba(56,189,248,0.1)] ${BTN_GHOST}`}
                    >
                      <MapPin />
                      See all on Google Maps
                    </a>
                  </div>

                  {open && (
                    <div className="grid gap-4 border-t border-[var(--line)] bg-[rgba(255,255,255,0.015)] p-4 sm:grid-cols-2 lg:grid-cols-3">
                      {group.crews.map((s, i) => {
                        const review = s.reviews[0];
                        return (
                          <article
                            key={s.id}
                            className="animate-rise flex flex-col rounded-xl border border-[var(--line)] bg-[var(--bg-2)] p-4"
                            style={{ animationDelay: `${i * 40}ms` }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold">{s.company}</h3>
                              <span className="stat-num shrink-0 text-sm font-medium text-[var(--teal)]">
                                {s.distanceMi} mi
                              </span>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                              <StarRating rating={s.rating} />
                              <span className="stat-num font-medium text-[var(--text)]">
                                {s.rating}
                              </span>
                              <span className="text-[var(--muted)]">
                                (<span className="stat-num">
                                  {s.reviewCount}
                                </span>{" "}
                                Google reviews)
                              </span>
                            </div>

                            <p className="mt-1.5 text-sm text-[var(--muted)]">
                              {s.address}
                            </p>
                            <p className="mt-0.5 text-sm text-[var(--teal)]">
                              {s.priceRange} · {s.eta}
                            </p>
                            <a
                              href={`tel:${s.phone.replace(/[^0-9+]/g, "")}`}
                              className="stat-num mt-0.5 text-sm text-[var(--text)] hover:text-[var(--cyan)]"
                            >
                              {s.phone}
                            </a>

                            {review && (
                              <div className="mt-3 flex-1 border-t border-[var(--line)] pt-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-[var(--amber)]">
                                    {"★".repeat(review.rating)}
                                  </span>
                                  <span className="font-medium">
                                    {review.author}
                                  </span>
                                  <span className="text-[var(--muted)]">
                                    {review.timeAgo}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-[var(--text)]">
                                  {review.text}
                                </p>
                              </div>
                            )}

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <a
                                href={s.mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-medium text-[var(--cyan)] hover:bg-[rgba(56,189,248,0.08)] ${BTN_GHOST}`}
                              >
                                <MapPin />
                                Maps
                              </a>
                              <button
                                type="button"
                                onClick={() => invite(s.id, s.company)}
                                disabled={!!invited[s.id]}
                                className={`ml-auto rounded-lg bg-[var(--cyan)] px-4 py-2 text-sm font-semibold text-[#041018] enabled:hover:brightness-110 disabled:bg-[rgba(52,211,153,0.2)] disabled:text-[var(--ok)] disabled:active:scale-100 ${BTN}`}
                              >
                                {invited[s.id]
                                  ? "Quote requested ✓"
                                  : "Request quote"}
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </section>

      <Pricing />

      <div className="mt-12">
        <Disclaimer />
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[var(--ok)] bg-[#062816] px-6 py-3 text-sm font-medium text-[var(--ok)] shadow-lg animate-rise"
        >
          ✓ {toast}
    </div>
      )}
    </section>
  );
}
