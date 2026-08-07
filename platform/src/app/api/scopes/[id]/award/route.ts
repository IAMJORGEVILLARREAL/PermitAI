import { NextResponse } from "next/server";
import { awardScope } from "@/lib/store";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await req.json()) as { bidId?: string };
  if (!body.bidId) {
    return NextResponse.json({ error: "bidId required" }, { status: 400 });
  }
  const detail = awardScope(id, body.bidId);
  if (!detail) {
    return NextResponse.json({ error: "Award failed" }, { status: 400 });
  }
  return NextResponse.json(detail);
}
