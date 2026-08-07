"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/Logo";
import { AdvisoryNotice } from "@/components/ui/Feedback";
import { RoleToggle } from "@/components/shell/RoleToggle";
import { getRole, type Role } from "@/lib/role";
import { cn } from "@/lib/cn";
import { logout } from "@/app/(auth)/login/actions";

const GC_NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/registry", label: "Regulatory registry" },
];

const SUB_NAV = [
  { href: "/sub", label: "My work" },
  { href: "/registry", label: "Regulatory registry" },
];

export function AppShell({
  userName,
  orgName,
  children,
}: {
  userName: string;
  orgName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [role, setRoleState] = useState<Role>("gc");

  useEffect(() => {
    setRoleState(getRole());
  }, [pathname]);

  const nav = role === "sub" ? SUB_NAV : GC_NAV;

  return (
    <div className="flex min-h-screen">
      <nav className="flex w-[232px] shrink-0 flex-col justify-between border-r border-hairline px-5 py-6">
        <div>
          <Link href="/" aria-label="BuildScope home">
            <Wordmark size={15} />
          </Link>
          <ul className="mt-10 space-y-px">
            {nav.map((n) => {
              const active =
                pathname === n.href || pathname?.startsWith(`${n.href}/`);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={cn(
                      "block px-2 py-2 text-[13px] transition-colors",
                      active
                        ? "bg-fog/70 text-carbon"
                        : "text-steel hover:bg-fog/70 hover:text-carbon",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="border-t border-hairline pt-4">
            <div className="text-[13px] text-carbon">{userName}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete">
              {role === "gc" ? "General contractor" : "Subcontractor"}
            </div>
            <div className="mt-1 text-[11px] text-steel">
              {role === "gc" ? orgName : "Biscayne Electric Co."}
            </div>
            <form action={logout}>
              <button className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-concrete transition-colors hover:text-carbon">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-end border-b border-hairline px-10">
          <RoleToggle />
        </header>
        <div className="px-10 py-10">{children}</div>
        <div className="border-t border-hairline px-10 py-5">
          <AdvisoryNotice />
        </div>
      </main>
    </div>
  );
}
