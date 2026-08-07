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
    id: "sub-volt",
    name: "Voltage South Electric",
    trade: "Electrical",
    rating: 4.5,
    workRadiusMiles: 55,
    city: "Doral",
    license: "EC-12991002",
  },
  {
    id: "sub-spark",
    name: "Keyline Power Systems",
    trade: "Electrical",
    rating: 4.6,
    workRadiusMiles: 45,
    city: "Fort Lauderdale",
    license: "EC-14112290",
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
    id: "sub-stud",
    name: "Peninsula Metal Stud",
    trade: "Framing",
    rating: 4.3,
    workRadiusMiles: 40,
    city: "Miami",
    license: "CBC-13008811",
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
  {
    id: "sub-glass",
    name: "Bay Glazing & Entrances",
    trade: "Openings",
    rating: 4.7,
    workRadiusMiles: 40,
    city: "Miami",
    license: "CGC-22190884",
  },
  {
    id: "sub-door",
    name: "Southland Door & Hardware",
    trade: "Openings",
    rating: 4.4,
    workRadiusMiles: 60,
    city: "Homestead",
    license: "CGC-19882201",
  },
  {
    id: "sub-store",
    name: "Coastal Storefront Co.",
    trade: "Openings",
    rating: 4.6,
    workRadiusMiles: 35,
    city: "Miami Beach",
    license: "CGC-21004419",
  },
  {
    id: "sub-hvac",
    name: "Tropic Air Mechanical",
    trade: "HVAC",
    rating: 4.5,
    workRadiusMiles: 50,
    city: "Miramar",
    license: "CMC-15560012",
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj-miami-ti",
    name: "Brickell Office TI",
    address: "1450 Brickell Ave",
    city: "Miami, FL",
    valuation: 1850000,
    stage: "Bidding",
    healthScore: 58,
    analyzed: true,
    occupancy: "B - Business",
    constructionType: "Type II-B",
  },
  {
    id: "proj-wynwood",
    name: "Wynwood Gallery Fit-Out",
    address: "2550 NW 2nd Ave",
    city: "Miami, FL",
    valuation: 920000,
    stage: "Bidding",
    healthScore: 71,
    analyzed: true,
    occupancy: "A-3 Assembly",
    constructionType: "Type III-B",
  },
  {
    id: "proj-coral",
    name: "Coral Gables Medical Suite",
    address: "2601 Ponce de Leon Blvd",
    city: "Coral Gables, FL",
    valuation: 2400000,
    stage: "Scoping",
    healthScore: 40,
    analyzed: false,
    occupancy: "B - Business",
    constructionType: "Type I-A",
  },
  {
    id: "proj-dade",
    name: "Doral Logistics Shell",
    address: "8700 NW 25th St",
    city: "Doral, FL",
    valuation: 4100000,
    stage: "Construction",
    healthScore: 82,
    analyzed: true,
    occupancy: "S-1 Storage",
    constructionType: "Type II-B",
  },
];

/** Scopes for Brickell — mix of posted (with bids) and draft. */
export const brickellScopes: ScopePackage[] = [
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
    status: "posted",
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
      { label: "HM doors + frames", value: 18, unit: "ea" },
      { label: "Aluminum storefront", value: 240, unit: "sq. ft." },
      { label: "Hardware sets", value: 18, unit: "ea" },
    ],
    status: "posted",
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
    status: "posted",
    confidence: 0.93,
  },
];

export const wynwoodScopes: ScopePackage[] = [
  {
    id: "scope-wyn-elec",
    projectId: "proj-wynwood",
    trade: "Electrical",
    division: "Division 26",
    summary: "Gallery lighting, track, and dimming controls",
    quantities: [
      { label: "Track lighting", value: 180, unit: "lf" },
      { label: "Circuits", value: 22, unit: "ea" },
    ],
    status: "posted",
    confidence: 0.89,
  },
  {
    id: "scope-wyn-dry",
    projectId: "proj-wynwood",
    trade: "Drywall",
    division: "Division 09",
    summary: "Gallery partitions and Level 5 finish walls",
    quantities: [
      { label: "Partitions", value: 2400, unit: "sq. ft." },
      { label: "Level 5 finish", value: 1800, unit: "sq. ft." },
    ],
    status: "awarded",
    confidence: 0.92,
    awardedSubId: "sub-ana",
    awardedBidId: "bid-scope-wyn-dry-sub-ana",
  },
  {
    id: "scope-wyn-open",
    projectId: "proj-wynwood",
    trade: "Openings",
    division: "Division 08",
    summary: "Storefront entry and security doors",
    quantities: [
      { label: "Storefront", value: 120, unit: "sq. ft." },
      { label: "Security doors", value: 4, unit: "ea" },
    ],
    status: "draft",
    confidence: 0.84,
  },
];

export const dadeScopes: ScopePackage[] = [
  {
    id: "scope-dade-conc",
    projectId: "proj-dade",
    trade: "Concrete",
    division: "Division 03",
    summary: "Tilt-up panels and dock apron",
    quantities: [
      { label: "Tilt panels", value: 48, unit: "ea" },
      { label: "Dock apron", value: 12000, unit: "sq. ft." },
    ],
    status: "awarded",
    confidence: 0.94,
    awardedSubId: "sub-chris",
    awardedBidId: "bid-scope-dade-conc-sub-chris",
  },
  {
    id: "scope-dade-elec",
    projectId: "proj-dade",
    trade: "Electrical",
    division: "Division 26",
    summary: "800A service and warehouse lighting",
    quantities: [
      { label: "Service", value: 800, unit: "A" },
      { label: "High-bay fixtures", value: 96, unit: "ea" },
    ],
    status: "awarded",
    confidence: 0.91,
    awardedSubId: "sub-jose",
    awardedBidId: "bid-scope-dade-elec-sub-jose",
  },
];

/** Used when GC runs "analyze" on an unanalyzed project (Coral Gables). */
export const analyzedScopes: ScopePackage[] = [
  {
    id: "scope-coral-frame",
    projectId: "proj-coral",
    trade: "Framing",
    division: "Division 06",
    summary: "Exam-room partitions and corridor framing",
    quantities: [
      { label: "Metal stud walls", value: 5100, unit: "sq. ft." },
    ],
    status: "draft",
    confidence: 0.9,
  },
  {
    id: "scope-coral-elec",
    projectId: "proj-coral",
    trade: "Electrical",
    division: "Division 26",
    summary: "Medical-grade power and nurse-call rough-in",
    quantities: [
      { label: "Dedicated circuits", value: 38, unit: "ea" },
      { label: "Nurse call devices", value: 24, unit: "ea" },
    ],
    status: "draft",
    confidence: 0.87,
  },
  {
    id: "scope-coral-hvac",
    projectId: "proj-coral",
    trade: "HVAC",
    division: "Division 23",
    summary: "Rooftop units and exam-room distribution",
    quantities: [
      { label: "RTUs", value: 3, unit: "ea" },
      { label: "Ductwork", value: 920, unit: "lf" },
    ],
    status: "draft",
    confidence: 0.85,
  },
];

export const brickellPermits: PermitRequirement[] = [
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

export const wynwoodPermits: PermitRequirement[] = [
  {
    id: "permit-wyn-bldg",
    projectId: "proj-wynwood",
    name: "Commercial Building Permit",
    authority: "City of Miami Building Department",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Building",
    triggeringScopeTag: "Change of occupancy",
    status: "In Progress",
  },
  {
    id: "permit-wyn-elec",
    projectId: "proj-wynwood",
    name: "Electrical Trade Permit",
    authority: "City of Miami Building Department",
    codeUrl: "https://www.miami.gov/My-Government/Departments-Organizations/Building",
    triggeringScopeTag: "Lighting_Track",
    status: "Required",
  },
];

export const dadePermits: PermitRequirement[] = [
  {
    id: "permit-dade-bldg",
    projectId: "proj-dade",
    name: "Shell Building Permit",
    authority: "Miami-Dade County RER",
    codeUrl: "https://www.miamidade.gov/global/economy/building/home.page",
    triggeringScopeTag: "New construction",
    status: "Obtained",
    permitNumber: "BLD-2026-11842",
    responsibleSubId: "sub-chris",
  },
  {
    id: "permit-dade-elec",
    projectId: "proj-dade",
    name: "Electrical Trade Permit",
    authority: "Miami-Dade County RER",
    codeUrl: "https://www.miamidade.gov/global/economy/building/home.page",
    triggeringScopeTag: "Electrical_Service",
    status: "In Progress",
    responsibleSubId: "sub-jose",
  },
];

export const analyzedPermits: PermitRequirement[] = [
  {
    id: "permit-coral-bldg",
    projectId: "proj-coral",
    name: "Commercial Building Permit",
    authority: "City of Coral Gables Building Division",
    codeUrl: "https://www.coralgables.com/",
    triggeringScopeTag: "Medical alteration",
    status: "Required",
  },
  {
    id: "permit-coral-elec",
    projectId: "proj-coral",
    name: "Electrical Trade Permit",
    authority: "City of Coral Gables Building Division",
    codeUrl: "https://www.coralgables.com/",
    triggeringScopeTag: "Medical_Power",
    status: "Required",
  },
];

const AMOUNTS: Record<string, number[]> = {
  Concrete: [128000, 119500, 134200, 122800],
  Framing: [96500, 91200, 101800],
  Openings: [54000, 49800, 57200, 52100],
  Drywall: [87500, 84200, 91000],
  Electrical: [112000, 104500, 118750, 109200],
  HVAC: [146000, 139500, 152800],
};

const NOTES = [
  "Includes material escalation contingency through Q3.",
  "Can mobilize within 10 business days.",
  "Excludes night/weekend premium.",
  "Value-engineered alternate available (−4%).",
];

/** Bids created when a scope is posted to the marketplace */
export function bidsForScope(scopeId: string, trade: string): Bid[] {
  const tradeSubs = subs.filter((s) => s.trade === trade);
  const pool =
    tradeSubs.length >= 3
      ? tradeSubs
      : [...tradeSubs, ...subs.filter((s) => s.trade !== trade)].slice(0, 3);

  const base = AMOUNTS[trade] ?? [75000, 72000, 80000];

  return pool.slice(0, Math.min(4, pool.length)).map((sub, i) => ({
    id: `bid-${scopeId}-${sub.id}`,
    scopeId,
    subId: sub.id,
    subName: sub.name,
    rating: sub.rating,
    amount: base[i] ?? base[0] + i * 2500,
    notes: NOTES[i % NOTES.length],
    previousProjects: 8 + i * 3 + (trade === "Openings" ? 4 : 0),
  }));
}

/** Pre-seeded bids for posted/awarded scopes so demos open with a live marketplace. */
export function seedBids(): Bid[] {
  const posted = [
    ...brickellScopes.filter((s) => s.status === "posted" || s.status === "awarded"),
    ...wynwoodScopes.filter((s) => s.status === "posted" || s.status === "awarded"),
    ...dadeScopes.filter((s) => s.status === "posted" || s.status === "awarded"),
  ];

  const out: Bid[] = [];
  for (const scope of posted) {
    const generated = bidsForScope(scope.id, scope.trade);
    if (scope.status === "awarded" && scope.awardedBidId) {
      // Keep full set; award flag lives on the scope
      out.push(...generated);
      if (!generated.some((b) => b.id === scope.awardedBidId)) {
        const winner = subs.find((s) => s.id === scope.awardedSubId);
        if (winner) {
          out.push({
            id: scope.awardedBidId,
            scopeId: scope.id,
            subId: winner.id,
            subName: winner.name,
            rating: winner.rating,
            amount: AMOUNTS[scope.trade]?.[1] ?? 80000,
            notes: "Awarded — contract exhibit issued.",
            previousProjects: 14,
          });
        }
      }
    } else {
      out.push(...generated);
    }
  }
  return out;
}

export function seedScopes(): ScopePackage[] {
  return [...brickellScopes, ...wynwoodScopes, ...dadeScopes];
}

export function seedPermits(): PermitRequirement[] {
  return [...brickellPermits, ...wynwoodPermits, ...dadePermits];
}

/** Map trade → which permit(s) the awarded sub becomes responsible for */
export const tradePermitMap: Record<string, string[]> = {
  Electrical: ["permit-electrical", "permit-wyn-elec", "permit-dade-elec", "permit-coral-elec"],
  Plumbing: ["permit-plumbing"],
  Concrete: ["permit-building", "permit-dade-bldg"],
  Framing: ["permit-building"],
  Openings: ["permit-building"],
  Drywall: ["permit-building", "permit-wyn-bldg"],
  HVAC: ["permit-coral-bldg"],
};
