"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#loop", label: "Platform" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]",
        scrolled
          ? "border-b border-hairline bg-paper/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link href="#top" aria-label="BuildScope home" onClick={() => setOpen(false)}>
          <Wordmark size={15} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-steel transition-colors duration-[160ms] hover:text-carbon"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden text-[13px] text-steel transition-colors hover:text-carbon sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="relative inline-flex h-9 items-center bg-carbon px-4 pl-5 text-[13px] font-medium text-white transition-[background-color,transform] duration-[100ms] ease-[cubic-bezier(0.2,0,0,1)] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-lime hover:bg-graphite active:translate-y-px"
          >
            Open demo
          </Link>
          <button
            type="button"
            className="ml-1 inline-flex h-9 items-center px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-steel md:hidden"
            aria-expanded={open}
            aria-controls="landing-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="landing-mobile-nav"
          className="border-t border-hairline bg-paper md:hidden"
        >
          <nav className="mx-auto flex max-w-[1180px] flex-col px-5 py-4" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-hairline py-3.5 text-[15px] text-carbon"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-concrete">
                  {l.label.slice(0, 2).toUpperCase()}
                </span>
                {l.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="py-3.5 text-[15px] text-steel"
            >
              Sign in
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
