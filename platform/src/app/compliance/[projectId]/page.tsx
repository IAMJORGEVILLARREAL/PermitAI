import { redirect } from "next/navigation";

/** Compat alias for origin/main `/compliance/[projectId]`. */
export default async function ComplianceAliasPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  redirect(`/projects/${projectId}/compliance`);
}
