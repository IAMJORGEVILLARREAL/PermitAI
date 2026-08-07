import { NextResponse } from "next/server";
import { postScope } from "@/lib/store";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = postScope(id);
  if (!project) {
    return NextResponse.json({ error: "Scope not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
