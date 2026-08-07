"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "secondary";
  className?: string;
  type?: "button" | "submit";
  showArrow?: boolean;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  showArrow = true,
}: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px active:scale-[0.98] btn-shine focus-visible:outline-none";

  const styles =
    variant === "primary"
      ? "bg-signal text-ink shadow-[0_0_0_1px_color-mix(in_srgb,var(--signal)_40%,transparent),0_0_32px_color-mix(in_srgb,var(--signal)_28%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--signal)_55%,transparent),0_0_48px_color-mix(in_srgb,var(--signal)_40%,transparent)]"
      : variant === "secondary"
        ? "bg-surface-2 text-paper border border-line hover:border-signal/40 hover:bg-surface"
        : "bg-transparent text-paper border border-line hover:border-signal/50 hover:bg-surface/60";

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 dark:bg-white/10">
          <ArrowUpRight weight="bold" className="h-3.5 w-3.5" aria-hidden />
        </span>
      ) : null}
    </>
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `${base} ${styles} ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
