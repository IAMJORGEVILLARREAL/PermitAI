import { NextResponse } from "next/server";
import { acknowledgePermit } from "@/lib/store";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await req.json()) as {
    status?: "In Progress" | "Obtained";
    permitNumber?: string;
  };
  if (!body.status || !["In Progress", "Obtained"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const permit = acknowledgePermit(id, body.status, body.permitNumber);
  if (!permit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(permit);
}
