import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * scrypt via node:crypto — no native dependency, and the parameters are
 * explicit rather than hidden behind a library default.
 */
const KEYLEN = 64;
const COST = 16384;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, KEYLEN, { N: COST }).toString("hex");
  return `scrypt$${COST}$${salt}$${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, cost, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !cost || !salt || !hash) return false;
  const derived = scryptSync(password, salt, KEYLEN, { N: Number(cost) });
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
