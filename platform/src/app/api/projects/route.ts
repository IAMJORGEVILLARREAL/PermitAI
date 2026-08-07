import { NextResponse } from "next/server";
import { createDemoProject, listProjects } from "@/lib/store";

export async function GET() {
  return NextResponse.json(listProjects());
}

/** Demo create — ignores real files; always returns a canned project. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    fileName?: string;
  };
  const project = createDemoProject(body);
  return NextResponse.json(project, { status: 201 });
}
