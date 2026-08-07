import "server-only";
import { db } from "@/lib/db";
import { analyzeProject, postScope, refreshHealth } from "@/lib/engine";
import { computeTransactionFee } from "@/lib/domain";

/**
 * Thin REST adapters matching origin/main's hackathon API contract,
 * backed by the Prisma platform store instead of the in-memory store.
 */

type Detail = NonNullable<Awaited<ReturnType<typeof fetchDetail>>>;

async function fetchDetail(id: string) {
  return db.project.findUnique({
    where: { id },
    include: {
      scopePackages: {
        include: {
          lineItems: { orderBy: { sortOrder: "asc" } },
          bids: { include: { profile: true }, orderBy: { amount: "asc" } },
        },
        orderBy: { division: "asc" },
      },
      requirements: {
        include: { permit: true, responsible: true, scopeTag: true },
      },
    },
  });
}

function serializeProject(p: {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  valuation: number | null;
  stage: string;
  healthScore: number;
  occupancyClass: string | null;
  constructionType: string | null;
  analyzed: boolean;
}) {
  return {
    id: p.id,
    name: p.name,
    address: p.addressLine,
    city: `${p.city}, ${p.state}`,
    valuation: p.valuation ?? 0,
    stage: p.stage,
    healthScore: p.healthScore,
    analyzed: p.analyzed,
    occupancy: p.occupancyClass,
    constructionType: p.constructionType,
  };
}

function serializeDetail(project: Detail) {
  return {
    ...serializeProject({
      ...project,
      analyzed: project.scopePackages.length > 0,
    }),
    scopes: project.scopePackages.map((s) => ({
      id: s.id,
      projectId: s.projectId,
      trade: s.title,
      division: s.division,
      summary: s.summary,
      quantities: s.lineItems.map((i) => ({
        label: i.description,
        value: i.quantity,
        unit: i.unit,
      })),
      status: s.status.toLowerCase(),
      confidence: s.confidence,
      awardedSubId: s.bids.find((b) => b.status === "AWARDED")?.profileId,
      awardedBidId: s.bids.find((b) => b.status === "AWARDED")?.id,
    })),
    permits: project.requirements.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      name: r.permit.name,
      authority: r.permit.issuingAuthority,
      triggeringScopeTag: r.scopeTag?.key,
      status:
        r.status === "IN_PROGRESS"
          ? "In Progress"
          : r.status === "OBTAINED"
            ? "Obtained"
            : "Required",
      responsibleSubId: r.responsibleProfileId,
      permitNumber: r.permitNumber,
    })),
    bids: project.scopePackages.flatMap((s) =>
      s.bids.map((b) => ({
        id: b.id,
        scopeId: s.id,
        subId: b.profileId,
        subName: b.profile.legalName,
        rating: b.profile.compositeRating,
        amount: b.amount,
        notes: b.notes,
        previousProjects: b.profile.projectsCompleted,
      })),
    ),
  };
}

export async function listProjectsApi() {
  const projects = await db.project.findMany({
    include: { _count: { select: { scopePackages: true } } },
    orderBy: { createdAt: "desc" },
  });
  return projects.map((p) =>
    serializeProject({ ...p, analyzed: p._count.scopePackages > 0 }),
  );
}

export async function getProjectDetailApi(id: string) {
  const project = await fetchDetail(id);
  if (!project) return null;
  return serializeDetail(project);
}

export async function analyzeProjectApi(id: string) {
  await analyzeProject(id);
  return getProjectDetailApi(id);
}

export async function postScopeApi(scopeId: string) {
  const deadline = new Date(Date.now() + 45_000);
  await postScope(scopeId, deadline);
  const scope = await db.scopePackage.findUniqueOrThrow({ where: { id: scopeId } });
  return getProjectDetailApi(scope.projectId);
}

export async function awardScopeApi(scopeId: string, bidId: string) {
  const bid = await db.bid.findUniqueOrThrow({
    where: { id: bidId },
    include: {
      scopePackage: { include: { lineItems: true, project: true } },
      profile: { include: { org: true } },
    },
  });
  if (bid.scopePackageId !== scopeId) throw new Error("Bid is not for this scope");

  const fee = computeTransactionFee(bid.amount);
  const exhibit = bid.scopePackage.lineItems
    .map((i) => `${i.quantity.toLocaleString()} ${i.unit} — ${i.description}`)
    .join("\n");

  const contract = await db.contract.create({
    data: {
      scopePackageId: bid.scopePackageId,
      bidId: bid.id,
      projectId: bid.scopePackage.projectId,
      gcOrgId: bid.scopePackage.project.orgId,
      subOrgId: bid.profile.orgId,
      value: bid.amount,
      status: "SENT",
      scopeExhibit: exhibit,
      fee: {
        create: { grossAmount: fee.gross, cappedAmount: fee.capped, status: "PENDING" },
      },
    },
  });

  await db.bid.update({ where: { id: bidId }, data: { status: "AWARDED" } });
  await db.bid.updateMany({
    where: { scopePackageId: scopeId, id: { not: bidId } },
    data: { status: "LOST" },
  });
  await db.scopePackage.update({
    where: { id: scopeId },
    data: { status: "AWARDED", awardedAt: new Date(), bidDeadline: new Date() },
  });

  const tradeReqs = await db.permitRequirement.findMany({
    where: {
      projectId: bid.scopePackage.projectId,
      contractId: null,
      permit: { isTradePermit: true },
    },
    include: { scopeTag: true },
  });
  for (const req of tradeReqs) {
    if (req.scopeTag?.division !== bid.scopePackage.division) continue;
    await db.permitRequirement.update({
      where: { id: req.id },
      data: {
        contractId: contract.id,
        responsibleProfileId: bid.profileId,
        status: "IN_PROGRESS",
      },
    });
  }

  await db.project.update({
    where: { id: bid.scopePackage.projectId },
    data: { stage: "AWARDED" },
  });
  await refreshHealth(bid.scopePackage.projectId);
  return getProjectDetailApi(bid.scopePackage.projectId);
}

export async function acknowledgePermitApi(
  requirementId: string,
  status: string,
  permitNumber?: string,
) {
  const req = await db.permitRequirement.update({
    where: { id: requirementId },
    data: {
      status,
      permitNumber: permitNumber || null,
      obtainedAt: status === "OBTAINED" ? new Date() : null,
    },
    include: { permit: true, responsible: true, scopeTag: true },
  });
  await refreshHealth(req.projectId);
  return {
    id: req.id,
    projectId: req.projectId,
    name: req.permit.name,
    authority: req.permit.issuingAuthority,
    status: req.status,
    responsibleSubId: req.responsibleProfileId,
    permitNumber: req.permitNumber,
    triggeringScopeTag: req.scopeTag?.key,
  };
}

export async function getMeApi(role: "gc" | "sub", subEmail?: string) {
  if (role === "gc") {
    return { role: "gc", org: "Ironline Construction", name: "Paul Arriaga" };
  }
  const user = await db.user.findFirst({
    where: {
      email: subEmail ?? "jose@sonoranelectric.test",
      role: { in: ["SUB_OWNER", "SUB_ESTIMATOR"] },
    },
    include: {
      org: { include: { subProfile: true } },
    },
  });
  if (!user?.org.subProfile) {
    return { role: "sub", error: "Sub not found" };
  }
  const profileId = user.org.subProfile.id;
  const bids = await db.bid.findMany({
    where: { profileId },
    include: { scopePackage: { include: { project: true } } },
  });
  const permits = await db.permitRequirement.findMany({
    where: { responsibleProfileId: profileId },
    include: { permit: true, project: true },
  });
  return {
    role: "sub",
    sub: {
      id: profileId,
      name: user.name,
      company: user.org.name,
      trade: "Electrical",
    },
    awardedScopes: bids
      .filter((b) => b.status === "AWARDED")
      .map((b) => ({
        id: b.scopePackageId,
        title: b.scopePackage.title,
        project: b.scopePackage.project.name,
        amount: b.amount,
      })),
    permits: permits.map((p) => ({
      id: p.id,
      name: p.permit.name,
      project: p.project.name,
      status: p.status,
      permitNumber: p.permitNumber,
    })),
    bids: bids.map((b) => ({
      id: b.id,
      scopeId: b.scopePackageId,
      amount: b.amount,
      status: b.status,
    })),
  };
}
