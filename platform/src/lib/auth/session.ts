import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "@/lib/db";

const COOKIE = "bsc_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 14;

/** The raw token lives only in the cookie; the database stores its digest. */
function digest(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, userAgent?: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + TTL_MS);

  await db.session.create({
    data: { userId, tokenHash: digest(token), expiresAt, userAgent },
  });
  await db.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  });

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: digest(token) } });
  }
  store.delete(COOKIE);
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string | null;
  orgId: string;
  org: {
    id: string;
    name: string;
    type: string;
    plan: string;
    logoUrl: string | null;
  };
  subProfileId: string | null;
};

/**
 * Deduplicated per request, so layouts, pages, and server actions can each
 * ask for the current user without extra queries.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: digest(token) },
    include: {
      user: { include: { org: { include: { subProfile: true } } } },
    },
  });

  if (!session || session.expiresAt < new Date()) return null;

  const { user } = session;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    title: user.title,
    orgId: user.orgId,
    org: {
      id: user.org.id,
      name: user.org.name,
      type: user.org.type,
      plan: user.org.plan,
      logoUrl: user.org.logoUrl,
    },
    subProfileId: user.org.subProfile?.id ?? null,
  };
});
