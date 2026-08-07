import { NextRequest, NextResponse } from "next/server";
import { getSubWork } from "@/lib/store";
import { subs } from "@/lib/seed";
import type { Role } from "@/lib/types";

export async function GET(request: NextRequest) {
  const role = (request.nextUrl.searchParams.get("role") ?? "gc") as Role;
  const subId = request.nextUrl.searchParams.get("subId") ?? "sub-jose";

  if (role === "sub") {
    const sub = subs.find((s) => s.id === subId) ?? subs[0];
    const work = getSubWork(sub.id);
    return NextResponse.json({ role, sub, ...work });
  }

  return NextResponse.json({
    role: "gc",
    org: "Horizon Builders GC",
    name: "Paul Chen",
  });
}
