export type DemoStep = "landing" | "upload" | "analyzing" | "results";

export type DemoScenario = {
  id: string;
  label: string;
  city: string;
  fileName: string;
  blurb: string;
};

export type Permit = {
  id: string;
  name: string;
  authority: string;
  trigger: string;
  citation: string;
  feeLow: number;
  feeHigh: number;
  timeline: string;
  confidence: number;
  docs: string[];
  trade?: string;
  sourceUrl?: string;
  verifiedOn?: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
};

export type Subcontractor = {
  id: string;
  company: string;
  trade: string;
  match: number;
  rating: number;
  reviewCount: number;
  distanceMi: number;
  address: string;
  phone: string;
  mapsUrl: string;
  source: "Google Maps";
  priceRange: string;
  eta: string;
  reviews: Review[];
  forPermit?: string;
};

export type AnalysisResult = {
  projectName: string;
  address: string;
  occupancy: string;
  constructionType: string;
  workType: string;
  valuation: string;
  healthScore: number;
  scopeTags: string[];
  permits: Permit[];
  subcontractors: Subcontractor[];
  feeTotalLow: number;
  feeTotalHigh: number;
};
