/**
 * Seed data for the three MVP launch metros (PRD §11.3): Phoenix, Dallas,
 * Atlanta. The regulatory graph here is representative rather than exhaustive,
 * but it is structured exactly as production would be: every permit is tied to
 * an adopted code section with a real public URL, and every trigger is a
 * versioned edge from a scope tag.
 *
 * Run: npm run db:seed
 */

import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const db = new PrismaClient();

const DEMO_PASSWORD = "buildscope";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64, { N: 16384 }).toString("hex");
  return `scrypt$16384$${salt}$${derived}`;
}

function date(iso: string) {
  return new Date(`${iso}T00:00:00.000Z`);
}

/* ==========================================================================
   Scope tags — the machine-readable vocabulary the rules engine runs on
   ========================================================================== */

const SCOPE_TAGS = [
  // Structural
  { key: "structural.foundation", name: "Foundation / footings", category: "STRUCTURAL", division: "03" },
  { key: "structural.slab_on_grade", name: "Slab on grade", category: "STRUCTURAL", division: "03" },
  { key: "structural.load_bearing_alteration", name: "Load-bearing wall alteration", category: "STRUCTURAL", division: "05" },
  { key: "structural.shear_wall", name: "Shear wall", category: "STRUCTURAL", division: "05" },
  { key: "structural.steel_frame", name: "Structural steel framing", category: "STRUCTURAL", division: "05" },
  { key: "structural.wood_framing", name: "Wood framing", category: "STRUCTURAL", division: "06" },
  { key: "structural.roof_structure", name: "Roof structure", category: "STRUCTURAL", division: "06" },

  // Architectural
  { key: "arch.exterior_openings", name: "Exterior doors and windows", category: "ARCHITECTURAL", division: "08" },
  { key: "arch.storefront", name: "Aluminum storefront", category: "ARCHITECTURAL", division: "08" },
  { key: "arch.interior_partitions", name: "Interior partitions", category: "ARCHITECTURAL", division: "09" },
  { key: "arch.act_ceiling", name: "Acoustical ceiling", category: "ARCHITECTURAL", division: "09" },
  { key: "arch.finishes", name: "Interior finishes", category: "ARCHITECTURAL", division: "09" },
  { key: "arch.accessibility", name: "Accessible route / ADA", category: "ARCHITECTURAL", division: "10" },
  { key: "arch.demolition", name: "Interior demolition", category: "ARCHITECTURAL", division: "02" },
  { key: "arch.occupancy_change", name: "Change of occupancy", category: "ARCHITECTURAL", division: "01" },
  { key: "arch.signage", name: "Exterior signage", category: "ARCHITECTURAL", division: "10" },

  // MEP
  { key: "electrical.service_upgrade", name: "Electrical service upgrade", category: "MEP", division: "26" },
  { key: "electrical.branch_circuits", name: "Branch circuits and devices", category: "MEP", division: "26" },
  { key: "electrical.lighting", name: "Lighting and controls", category: "MEP", division: "26" },
  { key: "electrical.generator", name: "Standby generator", category: "MEP", division: "26" },
  { key: "plumbing.fixtures", name: "Plumbing fixtures", category: "MEP", division: "22" },
  { key: "plumbing.water_service", name: "Water service", category: "MEP", division: "22" },
  { key: "plumbing.grease_interceptor", name: "Grease interceptor", category: "MEP", division: "22" },
  { key: "plumbing.gas_piping", name: "Fuel gas piping", category: "MEP", division: "22" },
  { key: "hvac.rooftop_unit", name: "Rooftop HVAC unit", category: "MEP", division: "23" },
  { key: "hvac.ductwork", name: "Ductwork and diffusers", category: "MEP", division: "23" },
  { key: "hvac.exhaust_hood", name: "Commercial kitchen exhaust hood", category: "MEP", division: "23" },

  // Fire
  { key: "fire.sprinkler", name: "Fire sprinkler system", category: "FIRE", division: "21" },
  { key: "fire.alarm", name: "Fire alarm system", category: "FIRE", division: "28" },
  { key: "fire.suppression_kitchen", name: "Kitchen hood suppression", category: "FIRE", division: "21" },

  // Civil / site
  { key: "civil.grading", name: "Site grading and earthwork", category: "CIVIL", division: "31" },
  { key: "civil.paving", name: "Paving and parking", category: "CIVIL", division: "32" },
  { key: "civil.stormwater", name: "Stormwater management", category: "CIVIL", division: "33" },
  { key: "civil.utility_connection", name: "Utility connection", category: "CIVIL", division: "33" },
  { key: "civil.right_of_way", name: "Right-of-way work", category: "SITE", division: "32" },
] as const;

/* ==========================================================================
   Jurisdictions
   ========================================================================== */

type PermitSeed = {
  key: string;
  name: string;
  issuingAuthority: string;
  reviewType: string;
  description: string;
  fee: [number, number];
  days: [number, number];
  trade?: boolean;
  /// Citations, by code key
  codes: string[];
  /// Scope tags that trigger it, with an optional JSON condition
  triggers: Array<{ tag: string; condition?: Record<string, unknown> }>;
};

type CodeSeed = {
  key: string;
  citation: string;
  title: string;
  text: string;
  url: string;
};

type MetroSeed = {
  metro: string;
  state: string;
  stateName: string;
  county: string;
  city: string;
  portalUrl: string;
  ruleVersion: string;
  codes: CodeSeed[];
  permits: PermitSeed[];
};

/** Model codes adopted, in some form, by all three launch jurisdictions. */
const MODEL_CODES: CodeSeed[] = [
  {
    key: "ibc_105_1",
    citation: "IBC 2021 §105.1",
    title: "Permits — Required",
    text: "Any owner or owner's authorized agent who intends to construct, enlarge, alter, repair, move, demolish or change the occupancy of a building or structure, or to erect, install, enlarge, alter, repair, remove, convert or replace any impact-resistant coverings, electrical, gas, mechanical or plumbing system, shall first make application to the building official and obtain the required permit.",
    url: "https://codes.iccsafe.org/content/IBC2021P1/chapter-1-scope-and-administration#IBC2021P1_Pt01_Ch01_Sec105.1",
  },
  {
    key: "ibc_903_2",
    citation: "IBC 2021 §903.2",
    title: "Automatic Sprinkler Systems — Where Required",
    text: "Approved automatic sprinkler systems in new buildings and structures shall be provided in the locations described in Sections 903.2.1 through 903.2.12.",
    url: "https://codes.iccsafe.org/content/IBC2021P1/chapter-9-fire-protection-and-life-safety-systems#IBC2021P1_Pt03_Ch09_Sec903.2",
  },
  {
    key: "ibc_907_2",
    citation: "IBC 2021 §907.2",
    title: "Fire Alarm and Detection Systems — Where Required",
    text: "An approved fire alarm system installed in accordance with the provisions of this code and NFPA 72 shall be provided in new buildings and structures in accordance with Sections 907.2.1 through 907.2.23.",
    url: "https://codes.iccsafe.org/content/IBC2021P1/chapter-9-fire-protection-and-life-safety-systems#IBC2021P1_Pt03_Ch09_Sec907.2",
  },
  {
    key: "ibc_1006_2",
    citation: "IBC 2021 §1006.2",
    title: "Egress Based on Occupant Load and Common Path of Travel Distance",
    text: "Two exits or exit access doorways from any space shall be provided where the design occupant load or the common path of egress travel distance exceeds the values listed in Table 1006.2.1.",
    url: "https://codes.iccsafe.org/content/IBC2021P1/chapter-10-means-of-egress#IBC2021P1_Pt03_Ch10_Sec1006.2",
  },
  {
    key: "ibc_3401",
    citation: "IBC 2021 §3401",
    title: "Existing Structures — General",
    text: "The provisions of this chapter shall control the alteration, repair, addition and change of occupancy of existing structures.",
    url: "https://codes.iccsafe.org/content/IBC2021P1/chapter-34-existing-structures",
  },
  {
    key: "nec_230_79",
    citation: "NEC 2020 §230.79",
    title: "Rating of Service Disconnecting Means",
    text: "The service disconnecting means shall have a rating not less than the calculated load to be carried, determined in accordance with Part III, IV, or V of Article 220.",
    url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70",
  },
  {
    key: "imc_507",
    citation: "IMC 2021 §507",
    title: "Commercial Kitchen Hoods",
    text: "Commercial kitchen exhaust hoods shall comply with the requirements of this section. Hoods shall be Type I or Type II and shall be designed to capture and confine cooking vapors and residues.",
    url: "https://codes.iccsafe.org/content/IMC2021P1/chapter-5-exhaust-systems#IMC2021P1_Ch05_Sec507",
  },
  {
    key: "ipc_1003",
    citation: "IPC 2021 §1003.3",
    title: "Grease Interceptors",
    text: "A grease interceptor or automatic grease removal device shall be required to receive the drainage from fixtures and equipment with grease-laden waste located in food preparation areas.",
    url: "https://codes.iccsafe.org/content/IPC2021P1/chapter-10-traps-interceptors-and-separators#IPC2021P1_Ch10_Sec1003",
  },
  {
    key: "ada_206",
    citation: "2010 ADA Standards §206",
    title: "Accessible Routes",
    text: "Accessible routes shall be provided within the site from accessible parking spaces and accessible passenger loading zones; public streets and sidewalks; and public transportation stops to the accessible building or facility entrance they serve.",
    url: "https://www.ada.gov/law-and-regs/design-standards/2010-stds/#206-accessible-routes",
  },
];

const METROS: MetroSeed[] = [
  {
    metro: "PHX",
    state: "AZ",
    stateName: "Arizona",
    county: "Maricopa County",
    city: "Phoenix",
    portalUrl: "https://www.phoenix.gov/pdd",
    ruleVersion: "PHX-2026.02",
    codes: [
      {
        key: "phx_ch39",
        citation: "Phoenix City Code Ch. 39",
        title: "Building Construction Code",
        text: "The Phoenix Building Construction Code adopts the 2018 International Building Code with City of Phoenix amendments, including permit thresholds, plan review requirements, and inspection procedures.",
        url: "https://codelibrary.amlegal.com/codes/phoenix/latest/phoenix_az/0-0-0-1",
      },
      {
        key: "phx_ch31",
        citation: "Phoenix City Code Ch. 31",
        title: "Grading and Drainage",
        text: "A grading permit is required prior to any grading, excavation, or fill exceeding the thresholds established in this chapter, and a drainage report may be required for sites disturbing more than one acre.",
        url: "https://codelibrary.amlegal.com/codes/phoenix/latest/phoenix_az/0-0-0-1",
      },
      {
        key: "phx_zoning_705",
        citation: "Phoenix Zoning Ordinance §705",
        title: "Sign Regulations",
        text: "No sign shall be erected, altered, or relocated without first obtaining a sign permit from the Planning and Development Department, except as expressly exempted.",
        url: "https://phoenix.municipal.codes/ZO/705",
      },
    ],
    permits: [
      {
        key: "phx_building",
        name: "Commercial Building Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Primary construction permit covering structural, architectural, and accessibility scope. Required for new construction, additions, and alterations affecting the building envelope or structure.",
        fee: [2400, 18500],
        days: [21, 45],
        codes: ["phx_ch39", "ibc_105_1", "ibc_3401"],
        triggers: [
          { tag: "structural.foundation" },
          { tag: "structural.slab_on_grade" },
          { tag: "structural.load_bearing_alteration" },
          { tag: "structural.steel_frame" },
          { tag: "structural.wood_framing" },
          { tag: "structural.roof_structure" },
          { tag: "arch.exterior_openings" },
          { tag: "arch.interior_partitions", condition: { valuationMin: 50000 } },
          { tag: "arch.occupancy_change" },
        ],
      },
      {
        key: "phx_electrical",
        name: "Electrical Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit for new electrical service, feeders, branch circuits, and fixtures. Issued to the licensed electrical contractor performing the work.",
        fee: [350, 4200],
        days: [7, 21],
        trade: true,
        codes: ["phx_ch39", "nec_230_79"],
        triggers: [
          { tag: "electrical.service_upgrade" },
          { tag: "electrical.branch_circuits" },
          { tag: "electrical.lighting" },
          { tag: "electrical.generator" },
        ],
      },
      {
        key: "phx_plumbing",
        name: "Plumbing Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit for water service, waste and vent, fixtures, and fuel gas piping. Issued to the licensed plumbing contractor.",
        fee: [280, 3400],
        days: [7, 18],
        trade: true,
        codes: ["phx_ch39", "ipc_1003"],
        triggers: [
          { tag: "plumbing.fixtures" },
          { tag: "plumbing.water_service" },
          { tag: "plumbing.gas_piping" },
          { tag: "plumbing.grease_interceptor" },
        ],
      },
      {
        key: "phx_mechanical",
        name: "Mechanical Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit for HVAC equipment, ductwork, and exhaust systems including commercial kitchen hoods.",
        fee: [310, 3800],
        days: [7, 21],
        trade: true,
        codes: ["phx_ch39", "imc_507"],
        triggers: [
          { tag: "hvac.rooftop_unit" },
          { tag: "hvac.ductwork" },
          { tag: "hvac.exhaust_hood" },
        ],
      },
      {
        key: "phx_fire_sprinkler",
        name: "Fire Sprinkler System Permit",
        issuingAuthority: "Phoenix Fire Department — Fire Prevention",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for installation or modification of automatic sprinkler systems. Reviewed by Fire Prevention separately from the building permit.",
        fee: [450, 5200],
        days: [14, 35],
        trade: true,
        codes: ["ibc_903_2"],
        triggers: [
          { tag: "fire.sprinkler" },
          { tag: "fire.suppression_kitchen" },
        ],
      },
      {
        key: "phx_fire_alarm",
        name: "Fire Alarm System Permit",
        issuingAuthority: "Phoenix Fire Department — Fire Prevention",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for new or modified fire alarm and detection systems, including notification appliance changes triggered by partition work.",
        fee: [400, 3900],
        days: [14, 30],
        trade: true,
        codes: ["ibc_907_2"],
        triggers: [{ tag: "fire.alarm" }],
      },
      {
        key: "phx_demolition",
        name: "Demolition Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "OVER_THE_COUNTER",
        description:
          "Required for removal of structural elements or full interior demolition. Asbestos survey documentation required prior to issuance.",
        fee: [180, 1400],
        days: [3, 10],
        codes: ["phx_ch39", "ibc_3401"],
        triggers: [
          { tag: "arch.demolition" },
          { tag: "structural.load_bearing_alteration" },
        ],
      },
      {
        key: "phx_grading",
        name: "Grading and Drainage Permit",
        issuingAuthority: "City of Phoenix Site Planning",
        reviewType: "PLAN_REVIEW",
        description:
          "Required prior to earthwork exceeding code thresholds. A drainage report is required for sites disturbing one acre or more.",
        fee: [600, 7500],
        days: [21, 60],
        codes: ["phx_ch31"],
        triggers: [
          { tag: "civil.grading" },
          { tag: "civil.stormwater" },
          { tag: "civil.paving", condition: { valuationMin: 100000 } },
        ],
      },
      {
        key: "phx_sign",
        name: "Sign Permit",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "OVER_THE_COUNTER",
        description:
          "Required before erecting, altering, or relocating any exterior sign, including wall and monument signage.",
        fee: [150, 900],
        days: [5, 15],
        codes: ["phx_zoning_705"],
        triggers: [{ tag: "arch.signage" }],
      },
      {
        key: "phx_row",
        name: "Right-of-Way Permit",
        issuingAuthority: "City of Phoenix Street Transportation Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for any work, staging, or utility connection within the public right-of-way.",
        fee: [220, 2600],
        days: [10, 30],
        codes: ["phx_ch39"],
        triggers: [
          { tag: "civil.right_of_way" },
          { tag: "civil.utility_connection" },
        ],
      },
      {
        key: "phx_co",
        name: "Certificate of Occupancy",
        issuingAuthority: "City of Phoenix Planning & Development Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Final approval to occupy. Requires all trade inspections closed and fire clearance obtained.",
        fee: [180, 1200],
        days: [7, 21],
        codes: ["ibc_105_1", "ibc_1006_2", "ada_206"],
        triggers: [
          { tag: "arch.occupancy_change" },
          { tag: "arch.accessibility" },
        ],
      },
    ],
  },
  {
    metro: "DFW",
    state: "TX",
    stateName: "Texas",
    county: "Dallas County",
    city: "Dallas",
    portalUrl: "https://dallascityhall.com/departments/sustainabledevelopment",
    ruleVersion: "DFW-2026.01",
    codes: [
      {
        key: "dal_ch52",
        citation: "Dallas City Code Ch. 52",
        title: "Administrative Procedures for the Construction Codes",
        text: "This chapter establishes permit requirements, plan review procedures, and inspection requirements for all construction within the City of Dallas, adopting the International Codes with local amendments.",
        url: "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-1",
      },
      {
        key: "dal_ch51a",
        citation: "Dallas Development Code §51A-4.000",
        title: "Zoning Regulations — Use Regulations",
        text: "No building or land shall be used and no building shall be erected, altered, or converted except in conformity with the use regulations of the district in which it is located.",
        url: "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-1",
      },
    ],
    permits: [
      {
        key: "dal_building",
        name: "Commercial Building Permit",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Primary construction permit for new commercial construction, additions, and alterations. Includes structural and architectural review.",
        fee: [2100, 17200],
        days: [25, 55],
        codes: ["dal_ch52", "ibc_105_1", "ibc_3401"],
        triggers: [
          { tag: "structural.foundation" },
          { tag: "structural.slab_on_grade" },
          { tag: "structural.load_bearing_alteration" },
          { tag: "structural.steel_frame" },
          { tag: "structural.wood_framing" },
          { tag: "arch.exterior_openings" },
          { tag: "arch.interior_partitions", condition: { valuationMin: 30000 } },
          { tag: "arch.occupancy_change" },
        ],
      },
      {
        key: "dal_electrical",
        name: "Electrical Permit",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit for electrical service, distribution, and branch circuits. Issued to the licensed electrical contractor of record.",
        fee: [300, 3900],
        days: [7, 20],
        trade: true,
        codes: ["dal_ch52", "nec_230_79"],
        triggers: [
          { tag: "electrical.service_upgrade" },
          { tag: "electrical.branch_circuits" },
          { tag: "electrical.lighting" },
          { tag: "electrical.generator" },
        ],
      },
      {
        key: "dal_plumbing",
        name: "Plumbing Permit",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit covering water, waste, vent, gas piping, and grease interceptors.",
        fee: [260, 3200],
        days: [7, 18],
        trade: true,
        codes: ["dal_ch52", "ipc_1003"],
        triggers: [
          { tag: "plumbing.fixtures" },
          { tag: "plumbing.water_service" },
          { tag: "plumbing.gas_piping" },
          { tag: "plumbing.grease_interceptor" },
        ],
      },
      {
        key: "dal_mechanical",
        name: "Mechanical Permit",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "PLAN_REVIEW",
        description: "Trade permit for HVAC equipment, ductwork, and exhaust systems.",
        fee: [280, 3500],
        days: [7, 20],
        trade: true,
        codes: ["dal_ch52", "imc_507"],
        triggers: [
          { tag: "hvac.rooftop_unit" },
          { tag: "hvac.ductwork" },
          { tag: "hvac.exhaust_hood" },
        ],
      },
      {
        key: "dal_fire",
        name: "Fire Protection System Permit",
        issuingAuthority: "Dallas Fire-Rescue — Fire Prevention Division",
        reviewType: "PLAN_REVIEW",
        description:
          "Covers sprinkler, standpipe, alarm, and kitchen suppression systems under a single fire protection review.",
        fee: [420, 5600],
        days: [15, 40],
        trade: true,
        codes: ["ibc_903_2", "ibc_907_2"],
        triggers: [
          { tag: "fire.sprinkler" },
          { tag: "fire.alarm" },
          { tag: "fire.suppression_kitchen" },
        ],
      },
      {
        key: "dal_demolition",
        name: "Demolition Permit",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "OVER_THE_COUNTER",
        description:
          "Required for interior or structural demolition. Asbestos notification to TCEQ required prior to issuance.",
        fee: [200, 1600],
        days: [3, 12],
        codes: ["dal_ch52", "ibc_3401"],
        triggers: [
          { tag: "arch.demolition" },
          { tag: "structural.load_bearing_alteration" },
        ],
      },
      {
        key: "dal_paving",
        name: "Paving and Drainage Permit",
        issuingAuthority: "Dallas Public Works",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for parking lot construction, drainage improvements, and site grading.",
        fee: [550, 6800],
        days: [20, 50],
        codes: ["dal_ch52"],
        triggers: [
          { tag: "civil.grading" },
          { tag: "civil.paving" },
          { tag: "civil.stormwater" },
        ],
      },
      {
        key: "dal_co",
        name: "Certificate of Occupancy",
        issuingAuthority: "Dallas Development Services Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for any new occupancy or change in use. Zoning use compliance verified at issuance.",
        fee: [175, 1100],
        days: [7, 25],
        codes: ["dal_ch51a", "ibc_1006_2", "ada_206"],
        triggers: [
          { tag: "arch.occupancy_change" },
          { tag: "arch.accessibility" },
        ],
      },
    ],
  },
  {
    metro: "ATL",
    state: "GA",
    stateName: "Georgia",
    county: "Fulton County",
    city: "Atlanta",
    portalUrl: "https://www.atlantaga.gov/government/departments/city-planning",
    ruleVersion: "ATL-2026.01",
    codes: [
      {
        key: "atl_ch8",
        citation: "Atlanta Code of Ordinances Ch. 8",
        title: "Buildings and Building Regulations",
        text: "The city adopts the Georgia State Minimum Standard Codes, including the International Building Code with Georgia amendments, and establishes local permit and inspection procedures.",
        url: "https://library.municode.com/ga/atlanta/codes/code_of_ordinances",
      },
      {
        key: "atl_ch74",
        citation: "Atlanta Code of Ordinances Ch. 74, Art. X",
        title: "Post-Development Stormwater Management",
        text: "Any land development activity disturbing 5,000 square feet or more shall submit a stormwater management plan and obtain approval prior to permit issuance.",
        url: "https://library.municode.com/ga/atlanta/codes/code_of_ordinances",
      },
      {
        key: "atl_ch16",
        citation: "Atlanta Zoning Ordinance Ch. 16",
        title: "Zoning — Use and Site Requirements",
        text: "Land and structures shall be used only in accordance with the district regulations established by this chapter, and no certificate of occupancy shall be issued for a nonconforming use.",
        url: "https://library.municode.com/ga/atlanta/codes/code_of_ordinances",
      },
    ],
    permits: [
      {
        key: "atl_building",
        name: "Commercial Building Permit",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "PLAN_REVIEW",
        description:
          "Primary construction permit for commercial work, including structural, architectural, and life-safety review.",
        fee: [2600, 19800],
        days: [30, 65],
        codes: ["atl_ch8", "ibc_105_1", "ibc_3401"],
        triggers: [
          { tag: "structural.foundation" },
          { tag: "structural.slab_on_grade" },
          { tag: "structural.load_bearing_alteration" },
          { tag: "structural.steel_frame" },
          { tag: "structural.wood_framing" },
          { tag: "arch.exterior_openings" },
          { tag: "arch.interior_partitions", condition: { valuationMin: 25000 } },
          { tag: "arch.occupancy_change" },
        ],
      },
      {
        key: "atl_electrical",
        name: "Electrical Permit",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "PLAN_REVIEW",
        description:
          "Trade permit for electrical work, issued to a Georgia-licensed electrical contractor.",
        fee: [320, 4100],
        days: [8, 22],
        trade: true,
        codes: ["atl_ch8", "nec_230_79"],
        triggers: [
          { tag: "electrical.service_upgrade" },
          { tag: "electrical.branch_circuits" },
          { tag: "electrical.lighting" },
          { tag: "electrical.generator" },
        ],
      },
      {
        key: "atl_plumbing",
        name: "Plumbing Permit",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "PLAN_REVIEW",
        description: "Trade permit for plumbing, gas piping, and interceptors.",
        fee: [290, 3300],
        days: [8, 20],
        trade: true,
        codes: ["atl_ch8", "ipc_1003"],
        triggers: [
          { tag: "plumbing.fixtures" },
          { tag: "plumbing.water_service" },
          { tag: "plumbing.gas_piping" },
          { tag: "plumbing.grease_interceptor" },
        ],
      },
      {
        key: "atl_mechanical",
        name: "Mechanical Permit",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "PLAN_REVIEW",
        description: "Trade permit for HVAC equipment, ductwork, and kitchen exhaust.",
        fee: [300, 3600],
        days: [8, 22],
        trade: true,
        codes: ["atl_ch8", "imc_507"],
        triggers: [
          { tag: "hvac.rooftop_unit" },
          { tag: "hvac.ductwork" },
          { tag: "hvac.exhaust_hood" },
        ],
      },
      {
        key: "atl_fire",
        name: "Fire Protection Permit",
        issuingAuthority: "Atlanta Fire Rescue Department",
        reviewType: "PLAN_REVIEW",
        description:
          "Sprinkler, alarm, and suppression review. Georgia State Fire Marshal review may also apply for certain occupancies.",
        fee: [480, 5900],
        days: [18, 45],
        trade: true,
        codes: ["ibc_903_2", "ibc_907_2"],
        triggers: [
          { tag: "fire.sprinkler" },
          { tag: "fire.alarm" },
          { tag: "fire.suppression_kitchen" },
        ],
      },
      {
        key: "atl_demolition",
        name: "Demolition Permit",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "OVER_THE_COUNTER",
        description: "Required for structural or full interior demolition.",
        fee: [210, 1500],
        days: [4, 14],
        codes: ["atl_ch8", "ibc_3401"],
        triggers: [
          { tag: "arch.demolition" },
          { tag: "structural.load_bearing_alteration" },
        ],
      },
      {
        key: "atl_stormwater",
        name: "Land Disturbance Permit",
        issuingAuthority: "Atlanta Department of Watershed Management",
        reviewType: "PLAN_REVIEW",
        description:
          "Required for land disturbance of 5,000 square feet or more. Includes stormwater management plan review.",
        fee: [700, 8200],
        days: [25, 70],
        codes: ["atl_ch74"],
        triggers: [
          { tag: "civil.grading" },
          { tag: "civil.stormwater" },
          { tag: "civil.paving" },
        ],
      },
      {
        key: "atl_co",
        name: "Certificate of Occupancy",
        issuingAuthority: "Atlanta Office of Buildings",
        reviewType: "PLAN_REVIEW",
        description:
          "Final occupancy approval. Zoning compliance and all trade inspections must be closed.",
        fee: [190, 1300],
        days: [10, 30],
        codes: ["atl_ch16", "ibc_1006_2", "ada_206"],
        triggers: [
          { tag: "arch.occupancy_change" },
          { tag: "arch.accessibility" },
        ],
      },
    ],
  },
];

/* ==========================================================================
   Subcontractor supply (PRD §11.1 phase 1: seed the supply side)
   ========================================================================== */

type SubSeed = {
  org: string;
  legal: string;
  principal: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  counties: string[];
  radius: number;
  divisions: string[];
  license: { state: string; number: string; classification: string; expires: string; status?: string };
  rating: number;
  ratings: number;
  completed: number;
  capacity: string;
  bonding: [number, number];
  plan?: string;
  /// Force an insurance edge case for demonstrating verification states
  coi?: "OK" | "EXPIRING" | "EXPIRED";
};

const SUBS: SubSeed[] = [
  {
    org: "Sonoran Electric",
    legal: "Sonoran Electric LLC",
    principal: "Jose Ramirez",
    email: "jose@sonoranelectric.test",
    city: "Phoenix", state: "AZ", zip: "85034",
    counties: ["Maricopa", "Pinal"], radius: 45,
    divisions: ["26", "27"],
    license: { state: "AZ", number: "ROC-318442", classification: "C-11 Electrical", expires: "2027-03-31" },
    rating: 4.8, ratings: 21, completed: 21, capacity: "MEDIUM",
    bonding: [2500000, 6000000], plan: "SUB_PRO",
  },
  {
    org: "Vertex Power Systems",
    legal: "Vertex Power Systems Inc.",
    principal: "Dana Whitfield",
    email: "dana@vertexpower.test",
    city: "Tempe", state: "AZ", zip: "85281",
    counties: ["Maricopa"], radius: 35,
    divisions: ["26"],
    license: { state: "AZ", number: "ROC-291877", classification: "C-11 Electrical", expires: "2026-11-30" },
    rating: 4.6, ratings: 14, completed: 14, capacity: "HIGH",
    bonding: [1500000, 4000000],
  },
  {
    org: "Copperline Contractors",
    legal: "Copperline Contractors LLC",
    principal: "Marcus Bell",
    email: "marcus@copperline.test",
    city: "Mesa", state: "AZ", zip: "85201",
    counties: ["Maricopa"], radius: 40,
    divisions: ["26", "28"],
    license: { state: "AZ", number: "ROC-402113", classification: "C-11 Electrical", expires: "2026-09-15" },
    rating: 4.3, ratings: 8, completed: 8, capacity: "HIGH",
    bonding: [800000, 2000000], coi: "EXPIRING",
  },
  {
    org: "Ironwood Electrical",
    legal: "Ironwood Electrical Services LLC",
    principal: "Tanya Cole",
    email: "tanya@ironwoodelec.test",
    city: "Glendale", state: "AZ", zip: "85301",
    counties: ["Maricopa"], radius: 30,
    divisions: ["26"],
    license: { state: "AZ", number: "ROC-355901", classification: "C-11 Electrical", expires: "2026-07-31", status: "EXPIRED" },
    rating: 3.9, ratings: 4, completed: 4, capacity: "AT_CAPACITY",
    bonding: [500000, 1200000], coi: "EXPIRED",
  },
  {
    org: "Saguaro Mechanical",
    legal: "Saguaro Mechanical Contractors Inc.",
    principal: "Elena Duarte",
    email: "elena@saguaromech.test",
    city: "Phoenix", state: "AZ", zip: "85040",
    counties: ["Maricopa", "Pinal"], radius: 50,
    divisions: ["23", "22"],
    license: { state: "AZ", number: "ROC-277318", classification: "C-39 Air Conditioning", expires: "2027-06-30" },
    rating: 4.7, ratings: 18, completed: 18, capacity: "MEDIUM",
    bonding: [3000000, 7500000], plan: "SUB_PRO",
  },
  {
    org: "Cactus Plumbing Works",
    legal: "Cactus Plumbing Works LLC",
    principal: "Ray Nakamura",
    email: "ray@cactusplumbing.test",
    city: "Scottsdale", state: "AZ", zip: "85251",
    counties: ["Maricopa"], radius: 35,
    divisions: ["22"],
    license: { state: "AZ", number: "ROC-311204", classification: "C-37 Plumbing", expires: "2027-01-31" },
    rating: 4.5, ratings: 12, completed: 12, capacity: "HIGH",
    bonding: [1200000, 3000000],
  },
  {
    org: "Redrock Concrete",
    legal: "Redrock Concrete & Foundations LLC",
    principal: "Hank Delacroix",
    email: "hank@redrockconcrete.test",
    city: "Phoenix", state: "AZ", zip: "85009",
    counties: ["Maricopa", "Yavapai"], radius: 60,
    divisions: ["03", "31"],
    license: { state: "AZ", number: "ROC-244890", classification: "B-01 General Commercial", expires: "2027-08-31" },
    rating: 4.9, ratings: 27, completed: 27, capacity: "MEDIUM",
    bonding: [5000000, 12000000], plan: "SUB_PRO",
  },
  {
    org: "Mesa Framing Partners",
    legal: "Mesa Framing Partners LLC",
    principal: "Priya Raghavan",
    email: "priya@mesaframing.test",
    city: "Mesa", state: "AZ", zip: "85210",
    counties: ["Maricopa"], radius: 45,
    divisions: ["06", "09"],
    license: { state: "AZ", number: "ROC-298441", classification: "B-01 General Commercial", expires: "2027-04-30" },
    rating: 4.4, ratings: 16, completed: 16, capacity: "HIGH",
    bonding: [2000000, 5000000],
  },
  {
    org: "Grand Canyon Fire Protection",
    legal: "Grand Canyon Fire Protection Inc.",
    principal: "Owen Fitzgerald",
    email: "owen@gcfireprotection.test",
    city: "Phoenix", state: "AZ", zip: "85021",
    counties: ["Maricopa", "Pinal", "Yavapai"], radius: 75,
    divisions: ["21", "28"],
    license: { state: "AZ", number: "ROC-330117", classification: "C-16 Fire Protection", expires: "2027-02-28" },
    rating: 4.8, ratings: 19, completed: 19, capacity: "LOW",
    bonding: [2200000, 5500000], plan: "SUB_PRO",
  },
  {
    org: "Desert Openings Supply",
    legal: "Desert Openings Supply Co.",
    principal: "Nina Sokolov",
    email: "nina@desertopenings.test",
    city: "Chandler", state: "AZ", zip: "85224",
    counties: ["Maricopa"], radius: 40,
    divisions: ["08"],
    license: { state: "AZ", number: "ROC-361558", classification: "C-06 Doors & Openings", expires: "2027-05-31" },
    rating: 4.2, ratings: 9, completed: 9, capacity: "HIGH",
    bonding: [900000, 2400000],
  },
  {
    org: "Trinity Electric of Dallas",
    legal: "Trinity Electric of Dallas LP",
    principal: "Wes Harlow",
    email: "wes@trinityelectric.test",
    city: "Dallas", state: "TX", zip: "75207",
    counties: ["Dallas", "Tarrant"], radius: 50,
    divisions: ["26"],
    license: { state: "TX", number: "TECL-28841", classification: "Electrical Contractor", expires: "2027-02-28" },
    rating: 4.7, ratings: 22, completed: 22, capacity: "MEDIUM",
    bonding: [3500000, 8000000], plan: "SUB_PRO",
  },
  {
    org: "Peachtree Mechanical",
    legal: "Peachtree Mechanical Services LLC",
    principal: "Corey Alston",
    email: "corey@peachtreemech.test",
    city: "Atlanta", state: "GA", zip: "30318",
    counties: ["Fulton", "DeKalb"], radius: 45,
    divisions: ["23", "22"],
    license: { state: "GA", number: "CN-210447", classification: "Conditioned Air Contractor", expires: "2027-06-30" },
    rating: 4.6, ratings: 15, completed: 15, capacity: "HIGH",
    bonding: [1800000, 4500000],
  },
];

/* ==========================================================================
   Seed
   ========================================================================== */

async function main() {
  console.log("Resetting database…");
  // Order matters: children before parents.
  await db.$transaction([
    db.auditEvent.deleteMany(),
    db.notification.deleteMany(),
    db.message.deleteMany(),
    db.messageThread.deleteMany(),
    db.performanceReview.deleteMany(),
    db.codeChangeImpact.deleteMany(),
    db.codeChangeAlert.deleteMany(),
    db.permitAcknowledgement.deleteMany(),
    db.permitRequirement.deleteMany(),
    db.transactionFee.deleteMany(),
    db.contract.deleteMany(),
    db.bid.deleteMany(),
    db.bidInvitation.deleteMany(),
    db.lineItemDetection.deleteMany(),
    db.scopePackageSheet.deleteMany(),
    db.scopeLineItem.deleteMany(),
    db.scopePackage.deleteMany(),
    db.detection.deleteMany(),
    db.sheet.deleteMany(),
    db.document.deleteMany(),
    db.planSet.deleteMany(),
    db.geoOverlay.deleteMany(),
    db.project.deleteMany(),
    db.bondingCapacity.deleteMany(),
    db.insurancePolicy.deleteMany(),
    db.license.deleteMany(),
    db.subTrade.deleteMany(),
    db.subcontractorProfile.deleteMany(),
    db.session.deleteMany(),
    db.user.deleteMany(),
    db.ruleEdge.deleteMany(),
    db.ruleSetVersion.deleteMany(),
    db.permitCodeSection.deleteMany(),
    db.permit.deleteMany(),
    db.codeSection.deleteMany(),
    db.organization.deleteMany(),
    db.jurisdiction.deleteMany(),
    db.scopeTag.deleteMany(),
  ]);

  /* --- Scope tags --------------------------------------------------------- */

  console.log("Seeding scope tags…");
  const tagIds = new Map<string, string>();
  for (const tag of SCOPE_TAGS) {
    const created = await db.scopeTag.create({ data: { ...tag } });
    tagIds.set(tag.key, created.id);
  }

  /* --- Jurisdictions, codes, permits, rules ------------------------------- */

  const cityIds = new Map<string, string>();
  let codeCount = 0;
  let permitCount = 0;
  let edgeCount = 0;

  for (const metro of METROS) {
    console.log(`Seeding ${metro.city}, ${metro.state}…`);

    const state = await db.jurisdiction.create({
      data: { name: metro.stateName, type: "STATE", state: metro.state },
    });
    const county = await db.jurisdiction.create({
      data: {
        name: metro.county,
        type: "COUNTY",
        state: metro.state,
        metro: metro.metro,
        parentId: state.id,
      },
    });
    const city = await db.jurisdiction.create({
      data: {
        name: `City of ${metro.city}`,
        type: "MUNICIPAL",
        state: metro.state,
        metro: metro.metro,
        parentId: county.id,
        portalUrl: metro.portalUrl,
      },
    });
    cityIds.set(metro.metro, city.id);

    await db.ruleSetVersion.create({
      data: {
        jurisdictionId: city.id,
        version: metro.ruleVersion,
        publishedAt: date("2026-02-01"),
        isCurrent: true,
        notes: `Adopted rule set for ${metro.city}. Reviewed by domain analyst.`,
      },
    });

    // Model codes are adopted by each jurisdiction with its own effective date.
    const codeIds = new Map<string, string>();
    for (const code of [...MODEL_CODES, ...metro.codes]) {
      const created = await db.codeSection.create({
        data: {
          jurisdictionId: city.id,
          citation: code.citation,
          title: code.title,
          text: code.text,
          version: metro.ruleVersion,
          effectiveDate: date("2026-01-01"),
          url: code.url,
        },
      });
      codeIds.set(code.key, created.id);
      codeCount++;
    }

    for (const permit of metro.permits) {
      const created = await db.permit.create({
        data: {
          jurisdictionId: city.id,
          name: permit.name,
          issuingAuthority: permit.issuingAuthority,
          reviewType: permit.reviewType,
          description: permit.description,
          estFeeLow: permit.fee[0],
          estFeeHigh: permit.fee[1],
          estTimelineDaysLow: permit.days[0],
          estTimelineDaysHigh: permit.days[1],
          isTradePermit: permit.trade ?? false,
          codeSections: {
            create: permit.codes
              .map((key) => codeIds.get(key))
              .filter((id): id is string => Boolean(id))
              .map((codeSectionId) => ({ codeSectionId })),
          },
        },
      });
      permitCount++;

      for (const trigger of permit.triggers) {
        const scopeTagId = tagIds.get(trigger.tag);
        if (!scopeTagId) throw new Error(`Unknown scope tag: ${trigger.tag}`);
        await db.ruleEdge.create({
          data: {
            scopeTagId,
            permitId: created.id,
            jurisdictionId: city.id,
            condition: JSON.stringify(trigger.condition ?? {}),
            ruleVersion: metro.ruleVersion,
            effectiveDate: date("2026-01-01"),
          },
        });
        edgeCount++;
      }
    }
  }

  /* --- General contractors ------------------------------------------------ */

  console.log("Seeding general contractors…");

  const ironline = await db.organization.create({
    data: {
      name: "Ironline Construction Group",
      type: "GC",
      plan: "PRO",
      billingEmail: "ap@ironline.test",
      defaultJurisdictionId: cityIds.get("PHX"),
    },
  });

  const meridian = await db.organization.create({
    data: {
      name: "Meridian Builders",
      type: "GC",
      plan: "BUSINESS",
      billingEmail: "ap@meridianbuilders.test",
      defaultJurisdictionId: cityIds.get("PHX"),
    },
  });

  const paul = await db.user.create({
    data: {
      orgId: ironline.id,
      email: "paul@ironline.test",
      name: "Paul Arriaga",
      title: "Owner",
      role: "GC_ADMIN",
      passwordHash: hashPassword(DEMO_PASSWORD),
    },
  });

  await db.user.create({
    data: {
      orgId: ironline.id,
      email: "devon@ironline.test",
      name: "Devon Wu",
      title: "Project Manager",
      role: "GC_PM",
      passwordHash: hashPassword(DEMO_PASSWORD),
    },
  });

  const maria = await db.user.create({
    data: {
      orgId: meridian.id,
      email: "maria@meridianbuilders.test",
      name: "Maria Solano",
      title: "Compliance Director",
      role: "GC_ADMIN",
      passwordHash: hashPassword(DEMO_PASSWORD),
    },
  });

  /* --- Subcontractors ----------------------------------------------------- */

  console.log("Seeding subcontractors…");

  for (const sub of SUBS) {
    const org = await db.organization.create({
      data: {
        name: sub.org,
        type: "SUB",
        plan: sub.plan ?? "SUB_FREE",
        billingEmail: sub.email,
      },
    });

    await db.user.create({
      data: {
        orgId: org.id,
        email: sub.email,
        name: sub.principal,
        title: "Owner",
        role: "SUB_OWNER",
        passwordHash: hashPassword(DEMO_PASSWORD),
      },
    });

    const licenseExpired = sub.license.status === "EXPIRED";
    const profile = await db.subcontractorProfile.create({
      data: {
        orgId: org.id,
        legalName: sub.legal,
        ein: `86-${String(1000000 + Math.floor(Math.random() * 8999999)).slice(0, 7)}`,
        principalName: sub.principal,
        phone: "(602) 555-0100",
        baseCity: sub.city,
        baseState: sub.state,
        baseZip: sub.zip,
        counties: JSON.stringify(sub.counties),
        workRadiusMiles: sub.radius,
        capacity: sub.capacity,
        compositeRating: sub.rating,
        ratingCount: sub.ratings,
        projectsCompleted: sub.completed,
        marketplaceStatus:
          licenseExpired || sub.coi === "EXPIRED" ? "SUSPENDED" : "ACTIVE",
        suspensionReason: licenseExpired
          ? "State license expired — re-verification required."
          : sub.coi === "EXPIRED"
            ? "Certificate of insurance expired."
            : null,
      },
    });

    for (const division of sub.divisions) {
      const tags = SCOPE_TAGS.filter((t) => t.division === division);
      for (const tag of tags) {
        await db.subTrade.create({
          data: {
            profileId: profile.id,
            scopeTagId: tagIds.get(tag.key),
            division,
            name: tag.name,
          },
        });
      }
    }

    await db.license.create({
      data: {
        profileId: profile.id,
        state: sub.license.state,
        number: sub.license.number,
        classification: sub.license.classification,
        issuedAt: date("2019-05-01"),
        expiresAt: date(sub.license.expires),
        status: sub.license.status ?? "VERIFIED",
        lastVerifiedAt: date("2026-08-01"),
        verificationSource: `${sub.license.state} contractor licensing board API`,
      },
    });

    const coiExpiry =
      sub.coi === "EXPIRED"
        ? "2026-06-30"
        : sub.coi === "EXPIRING"
          ? "2026-09-01"
          : "2027-04-30";
    const coiStatus =
      sub.coi === "EXPIRED" ? "EXPIRED" : sub.coi === "EXPIRING" ? "EXPIRING" : "VERIFIED";

    await db.insurancePolicy.create({
      data: {
        profileId: profile.id,
        carrier: "Continental Surety & Casualty",
        policyNumber: `GL-${Math.floor(100000 + Math.random() * 899999)}`,
        coverageType: "GENERAL_LIABILITY",
        limitEach: 1000000,
        limitAggregate: 2000000,
        effectiveDate: date("2026-05-01"),
        expirationDate: date(coiExpiry),
        namedInsured: sub.legal,
        status: coiStatus,
        parseConfidence: 0.94,
      },
    });

    await db.insurancePolicy.create({
      data: {
        profileId: profile.id,
        carrier: "Continental Surety & Casualty",
        policyNumber: `WC-${Math.floor(100000 + Math.random() * 899999)}`,
        coverageType: "WORKERS_COMP",
        limitEach: 1000000,
        limitAggregate: 1000000,
        effectiveDate: date("2026-05-01"),
        expirationDate: date("2027-04-30"),
        namedInsured: sub.legal,
        status: "VERIFIED",
        parseConfidence: 0.91,
      },
    });

    await db.bondingCapacity.create({
      data: {
        profileId: profile.id,
        suretyName: "Western Alliance Surety",
        singleLimit: sub.bonding[0],
        aggregateLimit: sub.bonding[1],
        verifiedAt: date("2026-07-15"),
        status: "VERIFIED",
      },
    });
  }

  /* --- Projects ----------------------------------------------------------- */

  console.log("Seeding projects…");

  const phx = cityIds.get("PHX")!;

  await db.project.create({
    data: {
      orgId: ironline.id,
      createdById: paul.id,
      name: "Desert Ridge Medical Office — Shell",
      addressLine: "21001 N Tatum Blvd",
      city: "Phoenix",
      state: "AZ",
      zip: "85050",
      lat: 33.6787,
      lng: -111.9761,
      jurisdictionId: phx,
      valuation: 4250000,
      occupancyClass: "B",
      constructionType: "II-B",
      workType: "NEW",
      stage: "INTAKE",
      overlays: {
        create: [
          { kind: "FLOOD", value: "Zone X", detail: "Area of minimal flood hazard.", source: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home", isTrigger: false },
          { kind: "HISTORIC", value: "None", detail: "No listed district within 500 ft.", source: "National Register of Historic Places", url: "https://www.nps.gov/subjects/nationalregister/index.htm", isTrigger: false },
          { kind: "WETLAND", value: "None", detail: "No mapped wetlands on parcel.", source: "USFWS National Wetlands Inventory", url: "https://www.fws.gov/program/national-wetlands-inventory", isTrigger: false },
          { kind: "ZONING", value: "C-2", detail: "Intermediate Commercial District.", source: "City of Phoenix Zoning Map", url: "https://phoenix.municipal.codes/ZO", isTrigger: false },
        ],
      },
    },
  });

  await db.project.create({
    data: {
      orgId: ironline.id,
      createdById: paul.id,
      name: "Roosevelt Row Restaurant TI",
      addressLine: "914 N 5th St",
      city: "Phoenix",
      state: "AZ",
      zip: "85004",
      lat: 33.4595,
      lng: -112.0704,
      jurisdictionId: phx,
      valuation: 780000,
      occupancyClass: "A-2",
      constructionType: "III-B",
      workType: "CHANGE_OF_USE",
      stage: "INTAKE",
      overlays: {
        create: [
          { kind: "FLOOD", value: "Zone X", detail: "Area of minimal flood hazard.", source: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home", isTrigger: false },
          { kind: "HISTORIC", value: "Roosevelt Historic District", detail: "Parcel is within a designated historic district — HP review required.", source: "Phoenix Historic Preservation Office", url: "https://www.phoenix.gov/pdd/historic", isTrigger: true },
          { kind: "ZONING", value: "DTC — Downtown Code", detail: "Downtown Code, Evans Churchill Character Area.", source: "City of Phoenix Zoning Map", url: "https://phoenix.municipal.codes/ZO", isTrigger: false },
        ],
      },
    },
  });

  await db.project.create({
    data: {
      orgId: meridian.id,
      createdById: maria.id,
      name: "Deer Valley Logistics — Building C",
      addressLine: "2402 W Pinnacle Peak Rd",
      city: "Phoenix",
      state: "AZ",
      zip: "85027",
      lat: 33.6961,
      lng: -112.1096,
      jurisdictionId: phx,
      valuation: 11400000,
      occupancyClass: "S-1",
      constructionType: "II-B",
      workType: "NEW",
      stage: "INTAKE",
      overlays: {
        create: [
          { kind: "FLOOD", value: "Zone AO (depth 1 ft)", detail: "Shallow flooding hazard — elevation certificate required.", source: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home", isTrigger: true },
          { kind: "ZONING", value: "A-1", detail: "Light Industrial District.", source: "City of Phoenix Zoning Map", url: "https://phoenix.municipal.codes/ZO", isTrigger: false },
        ],
      },
    },
  });

  const counts = {
    jurisdictions: await db.jurisdiction.count(),
    codeSections: codeCount,
    permits: permitCount,
    scopeTags: SCOPE_TAGS.length,
    ruleEdges: edgeCount,
    organizations: await db.organization.count(),
    users: await db.user.count(),
    subProfiles: await db.subcontractorProfile.count(),
    projects: await db.project.count(),
  };

  console.log("\nSeed complete:");
  for (const [key, value] of Object.entries(counts)) {
    console.log(`  ${key.padEnd(16)} ${value}`);
  }
  console.log(`\nDemo password for every account: ${DEMO_PASSWORD}`);
  console.log("  GC owner        paul@ironline.test");
  console.log("  GC compliance   maria@meridianbuilders.test");
  console.log("  Subcontractor   jose@sonoranelectric.test\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
