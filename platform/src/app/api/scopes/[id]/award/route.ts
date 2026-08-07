import { NextResponse } from "next/server";
import { awardScopeApi } from "@/lib/api";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { bidId?: string };
    if (!body.bidId) {
      return NextResponse.json({ error: "bidId required" }, { status: 400 });
    }
    const detail = await awardScopeApi(id, body.bidId);
    if (!detail) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(detail);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Award failed" },
      { status: 400 },
    );
  }
}
