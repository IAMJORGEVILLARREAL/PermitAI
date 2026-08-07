/**
 * Domain vocabulary. SQLite has no enums, so these unions are the contract
 * between the schema's string columns and the application.
 */

/* --- Identity ------------------------------------------------------------- */

export const ORG_TYPES = ["GC", "SUB", "PLATFORM"] as const;
export type OrgType = (typeof ORG_TYPES)[number];

export const ROLES = [
  "GC_ADMIN",
  "GC_PM",
  "SUB_OWNER",
  "SUB_ESTIMATOR",
  "PLATFORM_ADMIN",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  GC_ADMIN: "Administrator",
  GC_PM: "Project Manager",
  SUB_OWNER: "Owner",
  SUB_ESTIMATOR: "Estimator",
  PLATFORM_ADMIN: "Platform Admin",
};

export const GC_ROLES: Role[] = ["GC_ADMIN", "GC_PM"];
export const SUB_ROLES: Role[] = ["SUB_OWNER", "SUB_ESTIMATOR"];

export function isGcRole(role: string): boolean {
  return (GC_ROLES as string[]).includes(role);
}

export function isSubRole(role: string): boolean {
  return (SUB_ROLES as string[]).includes(role);
}

/* --- Plans & pricing (PRD §4.2) ------------------------------------------- */

export const PLANS = {
  PRO: { label: "Pro", monthly: 499, activeProjects: 5, side: "GC" },
  BUSINESS: { label: "Business", monthly: 1299, activeProjects: 25, side: "GC" },
  ENTERPRISE: { label: "Enterprise", monthly: null, activeProjects: null, side: "GC" },
  SUB_FREE: { label: "Free", monthly: 0, activeProjects: null, side: "SUB" },
  SUB_PRO: { label: "Sub Pro", monthly: 149, activeProjects: null, side: "SUB" },
} as const;
export type PlanKey = keyof typeof PLANS;

/** FR-24. 4.5% of awarded value, capped at $2,000, paid by the sub. */
export const FEE_RATE_PCT = 4.5;
export const FEE_CAP_CENTS_USD = 2000;

export function computeTransactionFee(contractValue: number) {
  const gross = Math.round((contractValue * FEE_RATE_PCT) / 100);
  return { gross, capped: Math.min(gross, FEE_CAP_CENTS_USD) };
}

/* --- Projects ------------------------------------------------------------- */

export const PROJECT_STAGES = [
  "INTAKE",
  "PROCESSING",
  "SCOPING",
  "BIDDING",
  "AWARDED",
  "IN_PROGRESS",
  "CLOSEOUT",
  "COMPLETE",
] as const;
export type ProjectStage = (typeof PROJECT_STAGES)[number];

export const STAGE_LABELS: Record<ProjectStage, string> = {
  INTAKE: "Intake",
  PROCESSING: "Processing",
  SCOPING: "Scoping",
  BIDDING: "Bidding",
  AWARDED: "Awarded",
  IN_PROGRESS: "In progress",
  CLOSEOUT: "Closeout",
  COMPLETE: "Complete",
};

export const WORK_TYPES = [
  "NEW",
  "ALTERATION",
  "ADDITION",
  "CHANGE_OF_USE",
] as const;
export type WorkType = (typeof WORK_TYPES)[number];

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  NEW: "New construction",
  ALTERATION: "Alteration",
  ADDITION: "Addition",
  CHANGE_OF_USE: "Change of use",
};

/** IBC Chapter 3 occupancy classifications. */
export const OCCUPANCY_CLASSES = [
  { code: "A-2", label: "A-2 — Assembly, food and drink" },
  { code: "A-3", label: "A-3 — Assembly, worship and recreation" },
  { code: "B", label: "B — Business" },
  { code: "E", label: "E — Educational" },
  { code: "F-1", label: "F-1 — Factory, moderate hazard" },
  { code: "I-2", label: "I-2 — Institutional, medical care" },
  { code: "M", label: "M — Mercantile" },
  { code: "R-2", label: "R-2 — Residential, multi-family" },
  { code: "S-1", label: "S-1 — Storage, moderate hazard" },
] as const;

/** IBC Chapter 6 construction types. */
export const CONSTRUCTION_TYPES = [
  "I-A", "I-B", "II-A", "II-B", "III-A", "III-B", "IV-HT", "V-A", "V-B",
] as const;

/* --- Plan processing ------------------------------------------------------ */

export const PLANSET_STATUSES = [
  "UPLOADED",
  "CLASSIFYING",
  "DETECTING",
  "AGGREGATING",
  "READY",
  "FAILED",
] as const;
export type PlanSetStatus = (typeof PLANSET_STATUSES)[number];

export const SHEET_CLASSIFICATIONS = [
  "TITLE",
  "ARCHITECTURAL",
  "STRUCTURAL",
  "CIVIL",
  "MEP",
  "DETAIL",
  "SCHEDULE",
  "UNRECOGNIZED",
] as const;
export type SheetClassification = (typeof SHEET_CLASSIFICATIONS)[number];

export const DETECTION_STATUSES = ["SUGGESTED", "CONFIRMED", "REJECTED"] as const;
export type DetectionStatus = (typeof DETECTION_STATUSES)[number];

/* --- MasterFormat --------------------------------------------------------- */

export const DIVISIONS: Record<string, string> = {
  "01": "General Requirements",
  "02": "Existing Conditions",
  "03": "Concrete",
  "04": "Masonry",
  "05": "Metals",
  "06": "Wood, Plastics & Composites",
  "07": "Thermal & Moisture Protection",
  "08": "Openings",
  "09": "Finishes",
  "10": "Specialties",
  "21": "Fire Suppression",
  "22": "Plumbing",
  "23": "HVAC",
  "26": "Electrical",
  "27": "Communications",
  "28": "Electronic Safety & Security",
  "31": "Earthwork",
  "32": "Exterior Improvements",
  "33": "Utilities",
};

export function divisionLabel(division: string) {
  return DIVISIONS[division] ? `${division} — ${DIVISIONS[division]}` : division;
}

/* --- Marketplace ---------------------------------------------------------- */

export const SCOPE_STATUSES = [
  "DRAFT",
  "POSTED",
  "BIDDING",
  "AWARDED",
  "COMPLETED",
  "CANCELLED",
] as const;
export type ScopeStatus = (typeof SCOPE_STATUSES)[number];

export const CAPACITY_LEVELS = ["HIGH", "MEDIUM", "LOW", "AT_CAPACITY"] as const;
export type Capacity = (typeof CAPACITY_LEVELS)[number];

export const CAPACITY_LABELS: Record<Capacity, string> = {
  HIGH: "High availability",
  MEDIUM: "Medium availability",
  LOW: "Low availability",
  AT_CAPACITY: "At capacity",
};

/** Weight of each factor in the match score (FR-19). License is pass/fail. */
export const MATCH_WEIGHTS = {
  geography: 0.3,
  performance: 0.25,
  specialization: 0.2,
  capacity: 0.15,
  activity: 0.1,
} as const;

/* --- Compliance ----------------------------------------------------------- */

export const REQUIREMENT_STATUSES = [
  "REQUIRED",
  "IN_PROGRESS",
  "OBTAINED",
  "NOT_APPLICABLE",
] as const;
export type RequirementStatus = (typeof REQUIREMENT_STATUSES)[number];

export const REQUIREMENT_LABELS: Record<RequirementStatus, string> = {
  REQUIRED: "Required",
  IN_PROGRESS: "In progress",
  OBTAINED: "Obtained",
  NOT_APPLICABLE: "Not applicable",
};

/**
 * Compliance Health Score: obtained + not-applicable over total required.
 * Deliberately simple and explainable — a GC has to be able to argue with it.
 */
export function computeHealthScore(
  requirements: Array<{ status: string }>,
): number {
  if (requirements.length === 0) return 100;
  const settled = requirements.filter(
    (r) => r.status === "OBTAINED" || r.status === "NOT_APPLICABLE",
  ).length;
  return Math.round((settled / requirements.length) * 100);
}

/* --- Formatting ----------------------------------------------------------- */

export function formatUsd(value: number | null | undefined, compact = false) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(value);
}

export function formatQuantity(value: number, unit: string) {
  const n = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value);
  return `${n} ${unit}`;
}

/** Drawing-style date: 2026.08.06 */
export function formatSpecDate(date: Date | string | null | undefined) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function daysUntil(date: Date | string | null | undefined) {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  return Math.ceil((d.getTime() - Date.now()) / 86_400_000);
}
