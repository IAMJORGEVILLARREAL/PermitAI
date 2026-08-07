import type { Role } from "./types";

const ROLE_KEY = "buildscope-role";
const SUB_KEY = "buildscope-sub";

export function getRole(): Role {
  if (typeof window === "undefined") return "gc";
  return (localStorage.getItem(ROLE_KEY) as Role) || "gc";
}

export function setRole(role: Role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getSubId(): string {
  if (typeof window === "undefined") return "sub-jose";
  return localStorage.getItem(SUB_KEY) || "sub-jose";
}

export function setSubId(subId: string) {
  localStorage.setItem(SUB_KEY, subId);
}
