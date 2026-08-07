"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Segmented } from "@/components/ui/Tabs";
import { getRole, setRole, setSubId, type Role } from "@/lib/role";

/** Demo role switch — GC ↔ SubC without separate accounts. */
export function RoleToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRoleState] = useState<Role>("gc");

  useEffect(() => {
    setRoleState(getRole());
  }, []);

  // Keep toggle in sync if user lands on a role-specific route.
  useEffect(() => {
    if (pathname?.startsWith("/sub") || pathname?.startsWith("/work")) {
      setRole("sub");
      setSubId("sub-jose");
      setRoleState("sub");
    } else if (
      pathname?.startsWith("/projects") ||
      pathname?.startsWith("/compliance")
    ) {
      setRole("gc");
      setRoleState("gc");
    }
  }, [pathname]);

  function switchRole(next: string) {
    const r = next as Role;
    setRole(r);
    setRoleState(r);
    if (r === "sub") {
      setSubId("sub-jose");
      router.push("/sub");
    } else {
      router.push("/projects");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-concrete sm:inline">
        View as
      </span>
      <Segmented
        value={role}
        onChange={switchRole}
        options={[
          { id: "gc", label: "GC" },
          { id: "sub", label: "SubC" },
        ]}
      />
    </div>
  );
}
