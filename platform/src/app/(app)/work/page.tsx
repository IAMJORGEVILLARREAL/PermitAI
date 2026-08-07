import { redirect } from "next/navigation";

/** Compat → origin/main sub workbench. */
export default function WorkRedirect() {
  redirect("/sub");
}
