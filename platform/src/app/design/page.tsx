"use client";

import { useState } from "react";
import { Wordmark } from "@/components/brand/Logo";
import { Button, IconButton } from "@/components/ui/Button";
import {
  Checkbox,
  Field,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@/components/ui/Field";
import { Badge, ConfidenceMeter, StatusPill } from "@/components/ui/Badge";
import { Panel, PanelBody, PanelHeader, Rule, SectionTitle } from "@/components/ui/Panel";
import { CellMono, CellNote, DataTable } from "@/components/ui/Table";
import { HealthScore, IndeterminateBar, Progress } from "@/components/ui/Progress";
import { Segmented, Tabs } from "@/components/ui/Tabs";
import { Drawer, Modal } from "@/components/ui/Overlay";
import {
  AdvisoryNotice,
  EmptyState,
  Skeleton,
  ToastProvider,
  useToast,
} from "@/components/ui/Feedback";
import {
  AlignmentDots,
  Coordinate,
  CornerBrackets,
  Crosshair,
  DimensionLine,
  RegistrationMark,
  RevisionId,
  ScaleRule,
  SerialNumber,
} from "@/components/artifacts/marks";
import {
  BarcodeLabel,
  MaterialTag,
  SheetRef,
  SpecTable,
  TitleBlock,
} from "@/components/artifacts/labels";
import { ICON_INDEX, IconPlanSet, IconPlus, IconArrowRight } from "@/components/icons";

/* ==========================================================================
   Design system review. Every primitive in the BuildScope "Minimal
   Industrial" system, on one surface.
   ========================================================================== */

export default function DesignPage() {
  return (
    <ToastProvider>
      <div className="mx-auto max-w-[1180px] px-8 py-16">
        <Header />
        <Colors />
        <Typography />
        <Icons />
        <Controls />
        <Forms />
        <Status />
        <Data />
        <Artifacts />
        <Surfaces />
        <Motion />
        <Overlays />
        <footer className="mt-32 flex items-center justify-between border-t border-hairline pt-6">
          <SerialNumber label="DOC" value="BSC-DS-0001" />
          <AdvisoryNotice className="max-w-md" />
        </footer>
      </div>
    </ToastProvider>
  );
}

function Section({
  code,
  title,
  description,
  children,
}: {
  code: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-28">
      <SectionTitle code={code} description={description}>
        {title}
      </SectionTitle>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Header() {
  return (
    <header>
      <div className="flex items-start justify-between">
        <Wordmark size={17} />
        <div className="flex flex-col items-end gap-2">
          <SerialNumber label="SYSTEM" value="MINIMAL INDUSTRIAL / v1" />
          <RevisionId rev="A" date="2026.08.06" />
        </div>
      </div>
      <h1 className="mt-16 max-w-[16ch] font-display text-[72px] font-medium leading-[0.95] tracking-[-0.04em] text-carbon">
        The quiet tool professionals trust.
      </h1>
      <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-steel">
        Everything reduced to its essential form. Grayscale carries the
        structure; a single accent carries attention. Nothing decorative.
      </p>
      <div className="mt-10 flex items-center gap-3">
        <Button variant="primary" marked iconRight={<IconArrowRight size={14} />}>
          Primary action
        </Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <ScaleRule
        className="mt-16"
        labels={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
      />
    </header>
  );
}

/* --- Color ---------------------------------------------------------------- */

const SWATCHES = [
  { name: "Carbon Black", hex: "#111111", cls: "bg-carbon" },
  { name: "Graphite", hex: "#242424", cls: "bg-graphite" },
  { name: "Steel", hex: "#5E5E5E", cls: "bg-steel" },
  { name: "Concrete", hex: "#A7A7A7", cls: "bg-concrete" },
  { name: "Fog", hex: "#EAEAEA", cls: "bg-fog" },
  { name: "Paper", hex: "#F8F8F6", cls: "bg-paper" },
];

function Colors() {
  return (
    <Section
      code="01 — COLOR"
      title="Grayscale, and one accent"
      description="The system lives entirely in gray. Lime never exceeds three to five percent of a composition; it marks the current selection, the live status, or the single important action."
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {SWATCHES.map((s) => (
          <div key={s.hex}>
            <div
              className={`${s.cls} h-24 w-full shadow-[inset_0_0_0_1px_var(--color-hairline)]`}
            />
            <div className="mt-3 text-[13px] text-carbon">{s.name}</div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-concrete">
              {s.hex}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="h-24 w-full bg-lime" />
          <div className="mt-3 text-[13px] text-carbon">Highlight Lime</div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-concrete">
            #C7F000
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <Rule label="THE LIME BUDGET" />
          <p className="max-w-prose text-[13px] leading-relaxed text-steel">
            Laser levels, layout markings, CAD highlight layers. It should feel
            precious. In this entire page it appears exactly six times: the
            marked action above, the active tab, the selected table row, the
            live status dot, a full-compliance score, and the toast indicator.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* --- Typography ----------------------------------------------------------- */

function Typography() {
  return (
    <Section
      code="02 — TYPE"
      title="One family. Huge, then quiet."
      description="Geist for display, Inter for body, Geist Mono for anything with an exact value: permit numbers, code references, dimensions, revision IDs, drawing labels."
    >
      <div className="space-y-10">
        {[
          { size: 72, label: "DISPLAY / 72", text: "Plans in." },
          { size: 44, label: "DISPLAY / 44", text: "Quantified scopes out." },
          { size: 28, label: "DISPLAY / 28", text: "Source-linked compliance." },
        ].map((r) => (
          <div key={r.label} className="flex items-baseline gap-8">
            <span className="spec w-28 shrink-0">{r.label}</span>
            <span
              style={{ fontSize: r.size }}
              className="font-display font-medium leading-none tracking-[-0.035em] text-carbon"
            >
              {r.text}
            </span>
          </div>
        ))}
        <div className="flex items-baseline gap-8">
          <span className="spec w-28 shrink-0">BODY / 15</span>
          <p className="max-w-prose text-[15px] leading-relaxed text-steel">
            Body copy sits in Inter at a comfortable measure with generous
            leading. It never competes with the display line above it, and it
            never fills the full width of the surface.
          </p>
        </div>
        <div className="flex items-baseline gap-8">
          <span className="spec w-28 shrink-0">MONO / 12</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px] tabular-nums text-carbon">
            <span>BLD-2026-004417</span>
            <span>IBC 1006.2.1</span>
            <span>3,540 SF</span>
            <span>REV C</span>
            <span>A1.01</span>
          </div>
        </div>
        <div className="flex items-baseline gap-8">
          <span className="spec w-28 shrink-0">SPEC / 10</span>
          <span className="spec">
            JURISDICTION — CITY OF PHOENIX / MARICOPA COUNTY
          </span>
        </div>
      </div>
    </Section>
  );
}

/* --- Icons ---------------------------------------------------------------- */

function Icons() {
  const entries = Object.entries(ICON_INDEX);
  return (
    <Section
      code="03 — ICONOGRAPHY"
      title="Laser cut, 1px, no fills"
      description="Drawn on a 24 unit grid with butt caps and miter joins. Every terminal lands on a whole or half unit so the geometry stays exact at any size."
    >
      <div className="grid grid-cols-4 gap-px bg-hairline sm:grid-cols-6 lg:grid-cols-9">
        {entries.map(([name, Cmp]) => (
          <div
            key={name}
            className="flex aspect-square flex-col items-center justify-center gap-2 bg-paper text-carbon"
            title={name}
          >
            <Cmp size={22} />
            <span className="px-1 text-center font-mono text-[8px] leading-tight tracking-[0.06em] text-concrete">
              {name.replace("Icon", "").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --- Controls ------------------------------------------------------------- */

function Controls() {
  return (
    <Section
      code="04 — CONTROLS"
      title="Machined parts"
      description="Flat surfaces, hairline edges, one pixel of mechanical travel on press. Lime never fills a button — at most it marks the single important action in a view."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <Rule label="VARIANTS" />
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" marked>
              Marked action
            </Button>
            <Button variant="primary" icon={<IconPlus size={14} />}>
              With icon
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <Rule label="SIZES" />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <IconButton variant="secondary" aria-label="Add">
              <IconPlus size={16} />
            </IconButton>
            <IconButton aria-label="Sheets">
              <IconPlanSet size={16} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Rule label="NAVIGATION" className="mb-6" />
        <Tabs
          items={[
            {
              id: "scopes",
              label: "Scope packages",
              count: 8,
              content: (
                <p className="max-w-prose text-[13px] leading-relaxed text-steel">
                  The active tab is the sanctioned use of lime: a two pixel rule
                  and nothing else. Counts sit alongside the label in mono.
                </p>
              ),
            },
            { id: "permits", label: "Permit roadmap", count: 14, content: null },
            { id: "subs", label: "Matched subs", count: 12, content: null },
            { id: "audit", label: "Audit log", content: null },
          ]}
        />
      </div>
    </Section>
  );
}

/* --- Forms ---------------------------------------------------------------- */

function Forms() {
  const [segment, setSegment] = useState("plan");
  return (
    <Section
      code="05 — INPUT"
      title="Carved, not boxed"
      description="Fields have no container. A baseline rule thickens to carbon on focus. Labels use the mono spec voice; reference codes sit on the right rail."
    >
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
        <Field label="Project name" refCode="FR-08" required>
          <Input placeholder="Desert Ridge Medical Office — Shell" />
        </Field>
        <Field label="Project valuation" refCode="USD" hint="Drives the fee schedule tier.">
          <Input mono placeholder="4,250,000" inputMode="numeric" />
        </Field>
        <Field label="Occupancy classification" refCode="IBC CH.3">
          <Select defaultValue="">
            <option value="" disabled>
              Select classification
            </option>
            <option>B — Business</option>
            <option>M — Mercantile</option>
            <option>F-1 — Factory, Moderate Hazard</option>
            <option>S-1 — Storage, Moderate Hazard</option>
          </Select>
        </Field>
        <Field
          label="Permit number"
          refCode="ISSUED"
          error="No record found in the Phoenix permit index."
        >
          <Input mono defaultValue="BLD-2026-004417" aria-invalid />
        </Field>
        <Field label="Scope notes" className="lg:col-span-2">
          <Textarea placeholder="Relocate sprinkler main at gridline C. Remove load-bearing wall between 104 and 106." />
        </Field>
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-3">
        <div className="space-y-4">
          <Rule label="APPROVAL" />
          <Checkbox
            defaultChecked
            label="Quantities confirmed"
            description="I have reviewed the extracted takeoff against the plan set."
          />
          <Checkbox label="Post to marketplace on confirm" />
          <Checkbox disabled label="Requires structural review" />
        </div>
        <div className="space-y-4">
          <Rule label="SELECTION" />
          <Radio name="work" defaultChecked label="New construction" />
          <Radio name="work" label="Alteration" />
          <Radio name="work" label="Change of use" />
        </div>
        <div className="space-y-5">
          <Rule label="MECHANICAL" />
          <Switch defaultChecked label="Show AI detections" />
          <Switch label="Sealed bidding" />
          <Segmented
            value={segment}
            onChange={setSegment}
            options={[
              { id: "plan", label: "Plan" },
              { id: "sheets", label: "Sheets" },
              { id: "scopes", label: "Scopes" },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* --- Status --------------------------------------------------------------- */

function Status() {
  return (
    <Section
      code="06 — STATE"
      title="Progressive confidence"
      description="The product must always separate what the machine proposed from what a human accepted. That distinction is structural, not chromatic: machine output is hatched and hairlined, confirmed output is solid carbon."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <Rule label="TAGS" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="suggested">AI suggested</Badge>
            <Badge tone="verified">GC confirmed</Badge>
            <Badge tone="active">Bidding</Badge>
            <Badge tone="neutral">Draft</Badge>
            <Badge tone="dark">Awarded</Badge>
            <Badge tone="alert">Expired</Badge>
          </div>
          <Rule label="STATUS" />
          <div className="flex flex-wrap items-center gap-5">
            <StatusPill tone="active" pulse>
              Processing
            </StatusPill>
            <StatusPill tone="verified">License verified</StatusPill>
            <StatusPill tone="neutral">Awaiting bids</StatusPill>
            <StatusPill tone="alert">COI expired</StatusPill>
          </div>
        </div>
        <div className="space-y-6">
          <Rule label="CONFIDENCE" />
          <div className="space-y-3">
            {[
              { label: "Sheet classification", v: 0.97 },
              { label: "Door + window count", v: 0.88 },
              { label: "Handwritten note NER", v: 0.62 },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-6">
                <span className="text-[13px] text-steel">{r.label}</span>
                <ConfidenceMeter value={r.v} />
              </div>
            ))}
          </div>
          <Rule label="PROGRESS" />
          <Progress value={0.62} label="PLAN SET PROCESSING" />
          <IndeterminateBar />
          <div className="flex items-center gap-10 pt-2">
            <HealthScore value={78} label="COMPLIANCE" />
            <HealthScore value={100} label="CLOSED OUT" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --- Data ----------------------------------------------------------------- */

type BidRow = {
  id: string;
  sub: string;
  city: string;
  rating: number;
  projects: number;
  amount: number;
  status: "verified" | "suggested" | "alert";
};

const BIDS: BidRow[] = [
  { id: "b1", sub: "Sonoran Electric LLC", city: "Phoenix, AZ", rating: 4.8, projects: 21, amount: 184500, status: "verified" },
  { id: "b2", sub: "Vertex Power Systems", city: "Tempe, AZ", rating: 4.6, projects: 14, amount: 191200, status: "verified" },
  { id: "b3", sub: "Copperline Contractors", city: "Mesa, AZ", rating: 4.3, projects: 8, amount: 176900, status: "suggested" },
  { id: "b4", sub: "Ironwood Electrical", city: "Glendale, AZ", rating: 3.9, projects: 4, amount: 168400, status: "alert" },
];

function Data() {
  const [active, setActive] = useState("b1");
  return (
    <Section
      code="07 — DATA"
      title="Specification tables"
      description="Horizontal hairlines only. No vertical rules, no zebra striping, no card. Every quantity is right-aligned and tabular. The selected row carries the lime marker."
    >
      <DataTable
        columns={[
          {
            key: "sub",
            header: "Subcontractor",
            render: (r) => (
              <>
                <span className="text-carbon">{r.sub}</span>
                <CellNote>{r.city}</CellNote>
              </>
            ),
          },
          {
            key: "status",
            header: "Verification",
            width: "160px",
            render: (r) =>
              r.status === "verified" ? (
                <StatusPill tone="verified">Verified</StatusPill>
              ) : r.status === "alert" ? (
                <StatusPill tone="alert">COI expiring</StatusPill>
              ) : (
                <StatusPill tone="neutral">In review</StatusPill>
              ),
          },
          {
            key: "rating",
            header: "Rating",
            numeric: true,
            width: "90px",
            render: (r) => <CellMono>{r.rating.toFixed(1)}</CellMono>,
          },
          {
            key: "projects",
            header: "Projects",
            numeric: true,
            width: "90px",
            render: (r) => <CellMono>{r.projects}</CellMono>,
          },
          {
            key: "amount",
            header: "Bid",
            numeric: true,
            width: "130px",
            render: (r) => (
              <CellMono>${r.amount.toLocaleString("en-US")}</CellMono>
            ),
          },
        ]}
        rows={BIDS}
        rowKey={(r) => r.id}
        activeKey={active}
        onRowClick={(r) => setActive(r.id)}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div>
          <Rule label="SPEC TABLE" className="mb-4" />
          <SpecTable
            rows={[
              { key: "DIVISION", value: "26 — Electrical" },
              { key: "SERVICE", value: "400A, 3-phase" },
              { key: "BRANCH CIRCUITS", value: "45" },
              { key: "FIXTURES", value: "120", suggested: true },
              { key: "PANEL SCHEDULE", value: "E2.02" },
            ]}
          />
        </div>
        <div>
          <Rule label="EMPTY + LOADING" className="mb-4" />
          <div className="space-y-2">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-2/3" />
            <Skeleton className="w-1/2" />
          </div>
          <EmptyState
            className="py-12"
            icon={<IconPlanSet size={28} />}
            title="No plan sets uploaded"
            description="Upload a PDF plan set to begin sheet classification and scope decomposition."
            action={<Button variant="primary" marked>Upload plans</Button>}
          />
        </div>
      </div>
    </Section>
  );
}

/* --- Artifacts ------------------------------------------------------------ */

function Artifacts() {
  return (
    <Section
      code="08 — GRAPHIC LANGUAGE"
      title="Engineered marks"
      description="Registration marks, dimension arrows, crosshairs, measurement ticks, serial numbers, revision IDs, barcode labels, material tags, corner brackets, alignment dots. Nothing else."
    >
      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-3">
        <div className="space-y-5">
          <Rule label="MARKS" />
          <div className="flex items-center gap-8">
            <RegistrationMark />
            <Crosshair />
            <AlignmentDots count={4} />
          </div>
          <CornerBrackets className="p-6">
            <div className="material-grid h-24 w-full" />
          </CornerBrackets>
        </div>

        <div className="space-y-5">
          <Rule label="MEASUREMENT" />
          <DimensionLine label="3,540 SF" />
          <div className="flex h-24 items-stretch gap-4">
            <DimensionLine orientation="vertical" label="24'-6&quot;" />
            <div className="material-grid flex-1" />
          </div>
          <Coordinate sheet="A1.01" x={412.5} y={288.25} />
        </div>

        <div className="space-y-5">
          <Rule label="IDENTIFICATION" />
          <BarcodeLabel value="BLD-2026-004417" />
          <div className="flex flex-wrap gap-2">
            <MaterialTag label="DIVISION" value="03" />
            <MaterialTag label="JURISDICTION" value="PHX" />
            <MaterialTag label="TYPE" value="II-B" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <RevisionId rev="C" date="2026.07.14" />
            <SerialNumber label="PROJECT" value="P-0442" />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Rule label="SHEET REFERENCES" className="mb-4" />
        <div className="flex flex-wrap items-center gap-6">
          <SheetRef sheet="A1.01" title="Floor plan — Level 1" active />
          <SheetRef sheet="S2.03" title="Foundation details" />
          <SheetRef sheet="E2.02" title="Panel schedule" />
          <SheetRef sheet="M3.01" title="Mechanical roof plan" />
        </div>
      </div>

      <div className="mt-14">
        <Rule label="TITLE BLOCK" className="mb-4" />
        <TitleBlock
          project="Desert Ridge Medical Office — Shell"
          rev="C"
          sheet="A1.01"
          fields={[
            { key: "PROJECT NO.", value: "P-0442" },
            { key: "JURISDICTION", value: "PHOENIX, AZ" },
            { key: "VALUATION", value: "$4,250,000" },
            { key: "CONST. TYPE", value: "II-B" },
            { key: "OCCUPANCY", value: "B" },
            { key: "WORK TYPE", value: "NEW" },
            { key: "ISSUED", value: "2026.07.14" },
            { key: "EXAMINER", value: "D.O." },
          ]}
        />
      </div>
    </Section>
  );
}

/* --- Surfaces ------------------------------------------------------------- */

function Surfaces() {
  return (
    <Section
      code="09 — SURFACE"
      title="Carved from one material"
      description="Cards disappear. Regions are separated by space first, tone second, and a hairline only where structure genuinely demands it. Materials are matte and manufactured — never glossy, never chrome."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {[
          { cls: "material-aluminum", name: "Anodized aluminum" },
          { cls: "material-concrete", name: "Concrete" },
          { cls: "material-coated", name: "Powder-coated steel" },
          { cls: "material-grid-dark", name: "Plan surface" },
        ].map((m) => (
          <div key={m.name}>
            <div className={`${m.cls} h-28 w-full`} />
            <div className="mt-3 text-[13px] text-carbon">{m.name}</div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-concrete">
              .{m.cls}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Panel tone="raised" edge>
          <PanelHeader code="P-0442" title="Raised" subtitle="white" />
          <PanelBody>
            <p className="text-[13px] leading-relaxed text-steel">
              Used for working surfaces that sit above the page: tables,
              editors, drawers.
            </p>
          </PanelBody>
        </Panel>
        <Panel tone="sunken">
          <PanelHeader code="P-0442" title="Sunken" subtitle="fog" />
          <PanelBody>
            <p className="text-[13px] leading-relaxed text-steel">
              Used for inert regions: metadata rails, disabled zones, wells.
            </p>
          </PanelBody>
        </Panel>
        <Panel tone="dark">
          <PanelHeader dark code="P-0442" title="Dark" subtitle="coated" />
          <PanelBody>
            <p className="text-[13px] leading-relaxed text-concrete">
              Chrome and plan viewers. The only place the interface inverts.
            </p>
          </PanelBody>
        </Panel>
      </div>
    </Section>
  );
}

/* --- Motion --------------------------------------------------------------- */

function Motion() {
  const [run, setRun] = useState(0);
  return (
    <Section
      code="10 — MOTION"
      title="CNC, not personality"
      description="Everything snaps into place. No bounce, no elasticity, no spring. Two curves: a machine curve for entrances and a snap curve for anything that travels between hard stops."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <Rule label="CURVES" />
          <SpecTable
            dense
            rows={[
              { key: "MACHINE", value: "cubic-bezier(0.2, 0, 0, 1)" },
              { key: "SNAP", value: "cubic-bezier(0.85, 0, 0.15, 1)" },
              { key: "DURATIONS", value: "100 / 160 / 240 / 400 ms" },
            ]}
          />
          <Button variant="secondary" onClick={() => setRun((r) => r + 1)}>
            Replay
          </Button>
        </div>
        <div className="space-y-8">
          <div>
            <span className="spec">RISE</span>
            <div key={`a${run}`} className="anim-rise mt-3 h-12 w-full bg-fog" />
          </div>
          <div>
            <span className="spec">DRAWER</span>
            <div className="mt-3 overflow-hidden">
              <div key={`b${run}`} className="anim-drawer h-12 w-full bg-carbon" />
            </div>
          </div>
          <div>
            <span className="spec">INDEX</span>
            <IndeterminateBar className="mt-3" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --- Overlays ------------------------------------------------------------- */

function Overlays() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { push } = useToast();

  return (
    <Section
      code="11 — OVERLAY"
      title="Sliding drawers"
      description="Modals rise four pixels and stop. Drawers travel in from the edge on the snap curve. Both dim the surface behind them rather than floating above it with shadow."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={() => setModal(true)}>
          Open modal
        </Button>
        <Button variant="secondary" onClick={() => setDrawer(true)}>
          Open drawer
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            push({
              title: "Scope package posted",
              detail: "12 verified subcontractors matched and invited.",
            })
          }
        >
          Push toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            push({
              title: "Certificate of insurance expired",
              detail: "Sonoran Electric LLC — marketplace access suspended.",
              tone: "alert",
            })
          }
        >
          Push alert
        </Button>
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        code="FR-18"
        title="Post scope to marketplace"
        description="Sealed bids. Amounts stay hidden from you and from other bidders until the deadline passes."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" marked onClick={() => setModal(false)}>
              Post and invite 12 subs
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <SpecTable
            rows={[
              { key: "DIVISION", value: "26 — Electrical" },
              { key: "SCOPE VALUE (EST.)", value: "$172,000 – $198,000" },
              { key: "MATCHED SUBS", value: "12" },
            ]}
          />
          <Field label="Bid deadline" refCode="FR-21">
            <Input mono defaultValue="2026.08.21 17:00 MST" />
          </Field>
          <AdvisoryNotice />
        </div>
      </Modal>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        code="SUB-0118"
        title="Sonoran Electric LLC"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDrawer(false)}>
              Close
            </Button>
            <Button variant="primary" marked onClick={() => setDrawer(false)}>
              Award scope
            </Button>
          </>
        }
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <StatusPill tone="verified">License verified</StatusPill>
            <SerialNumber label="EIN" value="86-•••4412" />
          </div>
          <SpecTable
            rows={[
              { key: "LICENSE", value: "AZ ROC 318-442 / C-11" },
              { key: "EXPIRES", value: "2027.03.31" },
              { key: "BONDING", value: "$2,500,000" },
              { key: "WORK RADIUS", value: "45 MI — MARICOPA CO." },
              { key: "CAPACITY", value: "MEDIUM" },
              { key: "COMPOSITE RATING", value: "4.8 / 5.0" },
            ]}
          />
          <BarcodeLabel value="SUB-0118-AZROC318442" />
        </div>
      </Drawer>
    </Section>
  );
}
