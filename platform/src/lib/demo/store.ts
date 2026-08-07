import {
  analyzedPermits,
  analyzedScopes,
  bidsForScope,
  initialProjects,
  seedBids,
  seedPermits,
  seedScopes,
  tradePermitMap,
} from "./seed";
import type { Bid, PermitRequirement, Project, ProjectDetail, ScopePackage } from "./types";

type StoreState = {
  projects: Project[];
  scopes: ScopePackage[];
  permits: PermitRequirement[];
  bids: Bid[];
};

declare global {
  // Persist demo state across hot reloads in dev
  // eslint-disable-next-line no-var
  var __buildScopeStoreV2: StoreState | undefined;
}

function createState(): StoreState {
  return {
    projects: structuredClone(initialProjects),
    scopes: structuredClone(seedScopes()),
    permits: structuredClone(seedPermits()),
    bids: structuredClone(seedBids()),
  };
}

function getState(): StoreState {
  if (!globalThis.__buildScopeStoreV2) {
    globalThis.__buildScopeStoreV2 = createState();
  }
  return globalThis.__buildScopeStoreV2;
}

export function resetStore() {
  globalThis.__buildScopeStoreV2 = createState();
}

export function listProjects(): Project[] {
  return getState().projects;
}

export function getProjectDetail(id: string): ProjectDetail | null {
  const state = getState();
  const project = state.projects.find((p) => p.id === id);
  if (!project) return null;

  return {
    ...project,
    scopes: state.scopes.filter((s) => s.projectId === id),
    permits: state.permits.filter((p) => p.projectId === id),
    bids: state.bids.filter((b) =>
      state.scopes.some((s) => s.projectId === id && s.id === b.scopeId),
    ),
  };
}

export async function analyzeProject(id: string): Promise<ProjectDetail | null> {
  const state = getState();
  const project = state.projects.find((p) => p.id === id);
  if (!project) return null;

  await new Promise((r) => setTimeout(r, 1500));

  project.analyzed = true;
  project.stage = "Scoping";
  project.healthScore = 55;

  const removedScopeIds = new Set(
    state.scopes.filter((s) => s.projectId === id).map((s) => s.id),
  );
  state.scopes = state.scopes.filter((s) => s.projectId !== id);
  state.permits = state.permits.filter((p) => p.projectId !== id);
  state.bids = state.bids.filter((b) => !removedScopeIds.has(b.scopeId));

  const drafts = structuredClone(analyzedScopes).map((s, i) => ({
    ...s,
    id: id === "proj-coral" ? s.id : `scope-${id}-${i}`,
    projectId: id,
    status: "draft" as const,
    awardedSubId: undefined,
    awardedBidId: undefined,
  }));

  const permits = structuredClone(analyzedPermits).map((p, i) => ({
    ...p,
    id: id === "proj-coral" ? p.id : `permit-${id}-${i}`,
    projectId: id,
    status: "Required" as const,
    responsibleSubId: undefined,
    permitNumber: undefined,
  }));

  state.scopes.push(...drafts);
  state.permits.push(...permits);
  return getProjectDetail(id);
}

export function postScope(scopeId: string): ProjectDetail | null {
  const state = getState();
  const scope = state.scopes.find((s) => s.id === scopeId);
  if (!scope) return null;

  scope.status = "posted";
  state.bids = state.bids.filter((b) => b.scopeId !== scopeId);
  state.bids.push(...bidsForScope(scopeId, scope.trade));

  const project = state.projects.find((p) => p.id === scope.projectId);
  if (project && project.stage === "Scoping") project.stage = "Bidding";

  return getProjectDetail(scope.projectId);
}

export function awardScope(scopeId: string, bidId: string): ProjectDetail | null {
  const state = getState();
  const scope = state.scopes.find((s) => s.id === scopeId);
  const bid = state.bids.find((b) => b.id === bidId && b.scopeId === scopeId);
  if (!scope || !bid) return null;

  scope.status = "awarded";
  scope.awardedSubId = bid.subId;
  scope.awardedBidId = bid.id;

  const permitIds = tradePermitMap[scope.trade] ?? [];
  for (const permit of state.permits) {
    if (permit.projectId === scope.projectId && permitIds.includes(permit.id)) {
      permit.responsibleSubId = bid.subId;
      if (permit.status === "Required") {
        permit.status = "In Progress";
      }
    }
  }

  const project = state.projects.find((p) => p.id === scope.projectId);
  if (project) {
    const total = state.permits.filter((p) => p.projectId === project.id).length;
    const done = state.permits.filter(
      (p) =>
        p.projectId === project.id &&
        (p.status === "Obtained" || p.status === "N/A"),
    ).length;
    project.healthScore = total
      ? Math.max(62, Math.round((done / total) * 100))
      : project.healthScore;
    if (project.stage !== "Construction") project.stage = "Awarded";
  }

  return getProjectDetail(scope.projectId);
}

export function acknowledgePermit(
  permitId: string,
  status: "In Progress" | "Obtained",
  permitNumber?: string,
): PermitRequirement | null {
  const state = getState();
  const permit = state.permits.find((p) => p.id === permitId);
  if (!permit) return null;

  permit.status = status;
  if (permitNumber) permit.permitNumber = permitNumber;

  const project = state.projects.find((p) => p.id === permit.projectId);
  if (project) {
    const total = state.permits.filter((p) => p.projectId === project.id).length;
    const done = state.permits.filter(
      (p) =>
        p.projectId === project.id &&
        (p.status === "Obtained" || p.status === "N/A"),
    ).length;
    project.healthScore = total ? Math.round((done / total) * 100) : project.healthScore;
  }

  return permit;
}

export function getSubWork(subId: string) {
  const state = getState();
  const awardedScopes = state.scopes.filter((s) => s.awardedSubId === subId);
  const permits = state.permits.filter((p) => p.responsibleSubId === subId);
  const bids = state.bids.filter((b) => b.subId === subId);

  return { awardedScopes, permits, bids };
}

/** Demo-only: any upload/search creates a canned fake project. */
const FAKE_TEMPLATES: Array<Omit<Project, "id" | "analyzed" | "stage" | "healthScore">> = [
  {
    name: "Little Havana Retail TI",
    address: "1548 SW 8th St",
    city: "Miami, FL",
    valuation: 640000,
    occupancy: "M - Mercantile",
    constructionType: "Type V-A",
  },
  {
    name: "Edgewater Condo Amenity Reno",
    address: "788 NE 23rd St",
    city: "Miami, FL",
    valuation: 1180000,
    occupancy: "R-2 Residential",
    constructionType: "Type I-A",
  },
  {
    name: "Design District Showroom",
    address: "140 NE 39th St",
    city: "Miami, FL",
    valuation: 2100000,
    occupancy: "M - Mercantile",
    constructionType: "Type II-A",
  },
  {
    name: "Coconut Grove Office Refresh",
    address: "2990 SW 27th Ave",
    city: "Miami, FL",
    valuation: 875000,
    occupancy: "B - Business",
    constructionType: "Type II-B",
  },
];

let fakeCursor = 0;

export function createDemoProject(input?: {
  name?: string;
  fileName?: string;
}): Project {
  const state = getState();
  const template = FAKE_TEMPLATES[fakeCursor % FAKE_TEMPLATES.length];
  fakeCursor += 1;

  const id = `proj-demo-${Date.now().toString(36)}`;
  const labelFromFile = input?.fileName
    ?.replace(/\.(pdf|zip|dwg|png|jpg)$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();

  const project: Project = {
    ...template,
    id,
    name:
      input?.name?.trim() ||
      (labelFromFile
        ? labelFromFile.replace(/\b\w/g, (c) => c.toUpperCase())
        : template.name),
    stage: "Intake",
    healthScore: 38,
    analyzed: false,
  };

  state.projects.unshift(project);
  return project;
}
