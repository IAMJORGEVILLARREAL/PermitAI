import { NextResponse } from "next/server";
import { acknowledgePermitApi } from "@/lib/api";

const STATUS_MAP: Record<string, string> = {
  "In Progress": "IN_PROGRESS",
  Obtained: "OBTAINED",
  Required: "REQUIRED",
  IN_PROGRESS: "IN_PROGRESS",
  OBTAINED: "OBTAINED",
  REQUIRED: "REQUIRED",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { status?: string; permitNumber?: string };
    const status = STATUS_MAP[body.status ?? ""] ?? null;
    if (!status) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const permit = await acknowledgePermitApi(id, status, body.permitNumber);
    return NextResponse.json(permit);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Acknowledge failed" },
      { status: 400 },
    );
  }
}
