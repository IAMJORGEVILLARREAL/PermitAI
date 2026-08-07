import { redirect } from "next/navigation";

/** Compat alias for origin/main `/sub` → platform sub workbench. */
export default function SubAliasPage() {
  redirect("/work");
}
