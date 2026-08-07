import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

const COOKIE = "bsc_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 14;
const DEMO_TOKEN = "demo-buildscope";

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

/** Hardcoded demo identity — no DB required (Vercel-safe). */
export const DEMO_USER: SessionUser = {
  id: "demo-user-paul",
  name: "Paul Chen",
  email: "paul@ironline.test",
  role: "GC_ADMIN",
  title: "Owner",
  orgId: "demo-org-horizon",
  org: {
    id: "demo-org-horizon",
    name: "Horizon Builders GC",
    type: "GC",
    plan: "BUSINESS",
    logoUrl: null,
  },
  subProfileId: null,
};

export async function createSession(_userId?: string) {
  const expiresAt = new Date(Date.now() + TTL_MS);
  const store = await cookies();
  store.set(COOKIE, DEMO_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/**
 * Deduplicated per request. Cookie-only demo session — works on Vercel
 * without SQLite / Prisma.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  if (token === DEMO_TOKEN || token.startsWith("demo")) return DEMO_USER;
  return null;
});
