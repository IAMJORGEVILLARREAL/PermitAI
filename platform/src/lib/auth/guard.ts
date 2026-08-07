import "server-only";

import { redirect } from "next/navigation";
import type { Role } from "@/lib/domain";
import { getSessionUser, type SessionUser } from "./session";

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireGc(): Promise<SessionUser> {
  return requireUser();
}

export async function requireSub(): Promise<SessionUser> {
  return requireUser();
}

export async function requireRole(..._roles: Role[]): Promise<SessionUser> {
  return requireUser();
}

export class AccessError extends Error {
  constructor(message = "Not authorized.") {
    super(message);
    this.name = "AccessError";
  }
}

export async function recordAudit(_input: {
  user: SessionUser;
  action: string;
  entityType: string;
  entityId: string;
  data?: unknown;
}) {
  // Demo: no persistent audit store on Vercel.
}
