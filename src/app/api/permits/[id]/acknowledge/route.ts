import { NextResponse } from "next/server";
import { acknowledgePermit } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as {
    status?: "In Progress" | "Obtained";
    permitNumber?: string;
  };

  if (!body.status) {
    return NextResponse.json({ error: "status required" }, { status: 400 });
  }

  const permit = acknowledgePermit(id, body.status, body.permitNumber);
  if (!permit) {
    return NextResponse.json({ error: "Permit not found" }, { status: 404 });
  }
  return NextResponse.json(permit);
}
