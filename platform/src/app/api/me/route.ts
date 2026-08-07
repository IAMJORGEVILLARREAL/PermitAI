import { NextResponse } from "next/server";
import { getMeApi } from "@/lib/api";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const role = url.searchParams.get("role") === "sub" ? "sub" : "gc";
  const subEmail = url.searchParams.get("subEmail") ?? undefined;
  return NextResponse.json(await getMeApi(role, subEmail));
}
