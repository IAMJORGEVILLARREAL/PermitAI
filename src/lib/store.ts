import {
  analyzedPermits,
  analyzedScopes,
  bidsForScope,
  initialProjects,
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
  var __buildScopeStore: StoreState | undefined;
}

function createState(): StoreState {
  return {
    projects: structuredClone(initialProjects),
    scopes: [],
    permits: [],
    bids: [],
  };
}

function getState(): StoreState {
  if (!globalThis.__buildScopeStore) {
    globalThis.__buildScopeStore = createState();
  }
  return globalThis.__buildScopeStore;
}

export function resetStore() {
  globalThis.__buildScopeStore = createState();
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
      state.scopes.some((s) => s.projectId === id && s.id === b.scopeId)
    ),
  };
}

export async function analyzeProject(id: string): Promise<ProjectDetail | null> {
  const state = getState();
  const project = state.projects.find((p) => p.id === id);
  if (!project) return null;

  // Fake AI latency for demo
  await new Promise((r) => setTimeout(r, 1500));

  project.analyzed = true;
  project.stage = "Permitting";
  project.healthScore = 55;

  state.scopes = analyzedScopes.map((s) => ({ ...s }));
  state.permits = analyzedPermits.map((p) => ({ ...p }));
  state.bids = state.bids.filter(
    (b) => !state.scopes.some((s) => s.id === b.scopeId)
  );

  return getProjectDetail(id);
}

export function postScope(scopeId: string): ProjectDetail | null {
  const state = getState();
  const scope = state.scopes.find((s) => s.id === scopeId);
  if (!scope) return null;

  scope.status = "posted";
  state.bids = state.bids.filter((b) => b.scopeId !== scopeId);
  state.bids.push(...bidsForScope(scopeId, scope.trade));

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
        (p.status === "Obtained" || p.status === "N/A")
    ).length;
    project.healthScore = total
      ? Math.round((done / total) * 100) || 62
      : project.healthScore;
    project.stage = "Construction";
  }

  return getProjectDetail(scope.projectId);
}

export function acknowledgePermit(
  permitId: string,
  status: "In Progress" | "Obtained",
  permitNumber?: string
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
        (p.status === "Obtained" || p.status === "N/A")
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
