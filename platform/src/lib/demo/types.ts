export type Role = "gc" | "sub";

export type ScopeStatus = "draft" | "posted" | "awarded";

export type PermitStatus = "Required" | "In Progress" | "Obtained" | "N/A";

export interface QuantityLine {
  label: string;
  value: number;
  unit: string;
}

export interface ScopePackage {
  id: string;
  projectId: string;
  trade: string;
  division: string;
  summary: string;
  quantities: QuantityLine[];
  status: ScopeStatus;
  confidence: number;
  awardedSubId?: string;
  awardedBidId?: string;
}

export interface Bid {
  id: string;
  scopeId: string;
  subId: string;
  subName: string;
  rating: number;
  amount: number;
  notes: string;
  previousProjects: number;
}

export interface PermitRequirement {
  id: string;
  projectId: string;
  name: string;
  authority: string;
  codeUrl: string;
  triggeringScopeTag: string;
  status: PermitStatus;
  responsibleSubId?: string;
  permitNumber?: string;
}

export interface SubProfile {
  id: string;
  name: string;
  trade: string;
  rating: number;
  workRadiusMiles: number;
  city: string;
  license: string;
}

export interface Project {
  id: string;
  name: string;
  address: string;
  city: string;
  valuation: number;
  stage: string;
  healthScore: number;
  analyzed: boolean;
  occupancy: string;
  constructionType: string;
}

export interface ProjectDetail extends Project {
  scopes: ScopePackage[];
  permits: PermitRequirement[];
  bids: Bid[];
}
