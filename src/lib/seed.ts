import type { Bid, PermitRequirement, Project, ScopePackage, SubProfile } from "./types";

export const subs: SubProfile[] = [
  {
    id: "sub-jose",
    name: "Biscayne Electric Co.",
    trade: "Electrical",
    rating: 4.8,
    workRadiusMiles: 40,
    city: "Miami",
    license: "EC-13004567",
  },
  {
    id: "sub-maria",
    name: "Bayfront Plumbing LLC",
    trade: "Plumbing",
    rating: 4.6,
    workRadiusMiles: 35,
    city: "Miami Beach",
    license: "CFC-14288901",
  },
  {
    id: "sub-derek",
    name: "Coral Framing Inc.",
    trade: "Framing",
    rating: 4.5,
    workRadiusMiles: 50,
    city: "Hialeah",
    license: "CBC-12567334",
  },
  {
    id: "sub-ana",
    name: "Magic City Drywall",
    trade: "Drywall",
    rating: 4.7,
    workRadiusMiles: 30,
    city: "Miami",
    license: "CBC-11890221",
  },
  {
    id: "sub-chris",
    name: "Atlantic Concrete Pros",
    trade: "Concrete",
    rating: 4.4,
    workRadiusMiles: 45,
    city: "Coral Gables",
    license: "CUC-10998442",
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj-miami-ti",
    name: "Brickell Office TI",
    address: "1450 Brickell Ave",
    city: "Miami, FL",
    valuation: 1850000,
    stage: "Scoping",
    healthScore: 42,
    analyzed: false,
    occupancy: "B - Business",
    constructionType: "Type II-B",
  },
];

export const analyzedScopes: ScopePackage[] = [
  {
    id: "scope-concrete",
    projectId: "proj-miami-ti",
    trade: "Concrete",
    division: "Division 03",
    summary: "Slab on grade and footing package for tenant demising work",
    quantities: [
      { label: "Slab on grade", value: 3500, unit: "sq. ft." },
      { label: "Footings", value: 200, unit: "linear ft." },
    ],
    status: "draft",
    confidence: 0.91,
  },
  {
    id: "scope-framing",
    projectId: "proj-miami-ti",
    trade: "Framing",
    division: "Division 06",
    summary: "Metal stud framing for new partitions and shear wall infill",
    quantities: [
      { label: "Metal stud walls", value: 4200, unit: "sq. ft." },
      { label: "Shear wall panels", value: 6, unit: "ea" },
    ],
    status: "draft",
    confidence: 0.88,
  },
  {
    id: "scope-openings",
    projectId: "proj-miami-ti",
    trade: "Openings",
    division: "Division 08",
    summary: "Hollow metal doors and aluminum storefront at lobby",
    quantities: [
      { label: "HM doors", value: 18, unit: "ea" },
      { label: "Storefront", value: 240, unit: "sq. ft." },
    ],
    status: "draft",
    confidence: 0.86,
  },
  {
    id: "scope-drywall",
    projectId: "proj-miami-ti",
    trade: "Drywall",
    division: "Division 09",
    summary: "Gypsum board, ACT ceilings, and ceramic wet areas",
    quantities: [
      { label: "Drywall", value: 8200, unit: "sq. ft." },
      { label: "ACT ceiling", value: 3100, unit: "sq. ft." },
      { label: "Ceramic tile", value: 380, unit: "sq. ft." },
    ],
    status: "draft",
    confidence: 0.9,
  },
  {
    id: "scope-electrical",
    projectId: "proj-miami-ti",
    trade: "Electrical",
    division: "Division 26",
    summary: "200A service upgrade, branch circuits, and fixture package",
    quantities: [
      { label: "Service upgrade", value: 200, unit: "A" },
      { label: "Branch circuits", value: 45, unit: "ea" },
      { label: "Fixtures", value: 120, unit: "ea" },
    ],
    status: "draft",
    confidence: 0.93,
  },
];

export const analyzedPermits: PermitRequirement[] = [
  {
    id: "permit-building",
    projectId: "proj-miami-ti",
    name: "Commercial Building Permit",
    authority: "City of Miami Building Department",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Building",
    triggeringScopeTag: "Alteration > $50,000",
    status: "Required",
  },
  {
    id: "permit-electrical",
    projectId: "proj-miami-ti",
    name: "Electrical Trade Permit",
    authority: "City of Miami Building Department",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Building",
    triggeringScopeTag: "Electrical_PanelUpgrade",
    status: "Required",
  },
  {
    id: "permit-plumbing",
    projectId: "proj-miami-ti",
    name: "Plumbing Trade Permit",
    authority: "City of Miami Building Department",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Building",
    triggeringScopeTag: "Plumbing_FixtureRelocate",
    status: "Required",
  },
  {
    id: "permit-fire",
    projectId: "proj-miami-ti",
    name: "Fire Alarm Modification Permit",
    authority: "Miami Fire Rescue — Fire Prevention",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Fire-Rescue",
    triggeringScopeTag: "FireAlarm_DeviceAdds",
    status: "Required",
  },
];

/** Bids created when a scope is posted to the marketplace */
export function bidsForScope(scopeId: string, trade: string): Bid[] {
  const tradeSubs = subs.filter((s) => s.trade === trade);
  const pool = tradeSubs.length >= 3 ? tradeSubs : [...tradeSubs, ...subs].slice(0, 3);

  const amounts: Record<string, number[]> = {
    Concrete: [128000, 119500, 134200],
    Framing: [96500, 91200, 101800],
    Openings: [54000, 49800, 57200],
    Drywall: [87500, 84200, 91000],
    Electrical: [112000, 104500, 118750],
  };

  const base = amounts[trade] ?? [75000, 72000, 80000];

  return pool.slice(0, 3).map((sub, i) => ({
    id: `bid-${scopeId}-${sub.id}`,
    scopeId,
    subId: sub.id,
    subName: sub.name,
    rating: sub.rating,
    amount: base[i] ?? base[0] + i * 2500,
    notes:
      i === 0
        ? "Includes material escalation contingency through Q3."
        : i === 1
          ? "Can mobilize within 10 business days."
          : "Excludes night/weekend premium.",
    previousProjects: 8 + i * 3,
  }));
}

/** Map trade → which permit(s) the awarded sub becomes responsible for */
export const tradePermitMap: Record<string, string[]> = {
  Electrical: ["permit-electrical"],
  Plumbing: ["permit-plumbing"],
  Concrete: ["permit-building"],
  Framing: ["permit-building"],
  Openings: ["permit-building"],
  Drywall: ["permit-building"],
};
