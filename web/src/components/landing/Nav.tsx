"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import { MagneticButton } from "./ui/MagneticButton";
import { CTA_PRIMARY } from "@/lib/motion";

const links = [
  { href: "#product", label: "Product" },
  { href: "#radar", label: "Radar" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[40] px-4 pt-3 md:px-6"
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full border px-4 transition-[background,border-color,box-shadow,height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-16 md:px-5 ${
            scrolled
              ? "border-line bg-ink/75 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent bg-ink/30 backdrop-blur-md"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-glyph.jpg"
              alt="PermitAI mark"
              width={28}
              height={28}
              className="h-7 w-7 rounded-md object-cover"
              priority
            />
            <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
              PermitAI
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-medium text-sm text-muted transition-colors duration-300 hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="#cta" className="!px-5 !py-2.5 !text-[13px]">
              {CTA_PRIMARY}
            </MagneticButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[50] bg-ink/90 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col px-6 pt-24">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-5 font-display text-3xl tracking-tight text-paper"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <MagneticButton href="#cta" onClick={() => setOpen(false)}>
                  {CTA_PRIMARY}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
