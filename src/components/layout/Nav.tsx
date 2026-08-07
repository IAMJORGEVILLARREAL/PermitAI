"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRole, setRole } from "@/lib/role";
import type { Role } from "@/lib/types";

export function Nav() {
  const [role, setRoleState] = useState<Role>("gc");

  useEffect(() => {
    setRoleState(getRole());
  }, []);

  function switchRole(next: Role) {
    setRole(next);
    setRoleState(next);
  }

  return (
    <header className="border-b border-line bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={role === "sub" ? "/sub" : "/projects"} className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight text-slate">BuildScope</span>
          <span className="text-sm font-medium text-amber">AI</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          {role === "gc" ? (
            <>
              <Link className="text-steel hover:text-ink" href="/projects">
                Projects
              </Link>
            </>
          ) : (
            <Link className="text-steel hover:text-ink" href="/sub">
              My Work
            </Link>
          )}
          <Link className="text-steel hover:text-ink" href="/">
            Switch role
          </Link>
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium uppercase tracking-wide text-steel">
            {role === "gc" ? "GC" : "Sub"}
          </span>
          <button
            type="button"
            onClick={() => switchRole(role === "gc" ? "sub" : "gc")}
            className="rounded-md border border-line px-2 py-1 text-xs text-steel hover:bg-mist"
          >
            Toggle
          </button>
        </nav>
      </div>
    </header>
  );
}
