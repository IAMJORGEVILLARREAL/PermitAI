import { NextResponse } from "next/server";
import { awardScope } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { bidId?: string };
  if (!body.bidId) {
    return NextResponse.json({ error: "bidId required" }, { status: 400 });
  }

  const project = awardScope(id, body.bidId);
  if (!project) {
    return NextResponse.json({ error: "Scope or bid not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
