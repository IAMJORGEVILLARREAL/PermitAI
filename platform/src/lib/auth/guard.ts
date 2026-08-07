import "server-only";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isGcRole, isSubRole, type Role } from "@/lib/domain";
import { getSessionUser, type SessionUser } from "./session";

/**
 * Authorization lives here, not in the UI. Every server action and page that
 * touches tenant data goes through one of these guards, so tenant isolation
 * (NFR-02) is enforced by construction rather than by remembering a where clause.
 */

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireGc(): Promise<SessionUser> {
  const user = await requireUser();
  if (!isGcRole(user.role)) redirect("/work");
  return user;
}

export async function requireSub(): Promise<SessionUser> {
  const user = await requireUser();
  if (!isSubRole(user.role)) redirect("/projects");
  return user;
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role as Role)) {
    throw new AccessError("Your role does not permit this action.");
  }
  return user;
}

export class AccessError extends Error {
  constructor(message = "Not authorized.") {
    super(message);
    this.name = "AccessError";
  }
}

/** Loads a project only if it belongs to the caller's organization. */
export async function requireOwnedProject(projectId: string, user: SessionUser) {
  const project = await db.project.findFirst({
    where: { id: projectId, orgId: user.orgId },
  });
  if (!project) throw new AccessError("Project not found.");
  return project;
}

/**
 * Scope packages are readable by the owning GC, and by a sub only through an
 * invitation. This is the seam the marketplace data firewall (§9.2) depends on.
 */
export async function requireScopeAccess(scopeId: string, user: SessionUser) {
  const scope = await db.scopePackage.findUnique({
    where: { id: scopeId },
    include: { project: true },
  });
  if (!scope) throw new AccessError("Scope package not found.");

  if (isGcRole(user.role)) {
    if (scope.project.orgId !== user.orgId) {
      throw new AccessError("Scope package not found.");
    }
    return { scope, as: "GC" as const };
  }

  if (!user.subProfileId) throw new AccessError("No subcontractor profile.");
  const invitation = await db.bidInvitation.findUnique({
    where: {
      scopePackageId_profileId: {
        scopePackageId: scopeId,
        profileId: user.subProfileId,
      },
    },
  });
  if (!invitation) throw new AccessError("You were not invited to this scope.");
  return { scope, as: "SUB" as const, invitation };
}

/** NFR-05: every significant action is recorded. */
export async function recordAudit(input: {
  user?: SessionUser | null;
  action: string;
  entityType: string;
  entityId: string;
  data?: Record<string, unknown>;
}) {
  await db.auditEvent.create({
    data: {
      orgId: input.user?.orgId,
      userId: input.user?.id,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      data: JSON.stringify(input.data ?? {}),
    },
  });
}
