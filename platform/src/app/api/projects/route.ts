import { NextResponse } from "next/server";
import { listProjectsApi } from "@/lib/api";

export async function GET() {
  return NextResponse.json(await listProjectsApi());
}
