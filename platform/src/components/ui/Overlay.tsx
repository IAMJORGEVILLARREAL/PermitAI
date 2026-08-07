"use client";

import { useEffect, type ReactNode } from "react";
import { IconX } from "@/components/icons";
import { IconButton } from "./Button";

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

/**
 * Modal. Rises 4px into place and stops. No scale, no fade-in bounce.
 */
export function Modal({
  open,
  onClose,
  title,
  code,
  description,
  footer,
  children,
  width = "560px",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  code?: string;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  width?: string;
}) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-carbon/25"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{ width }}
        className="anim-rise relative max-h-[85vh] w-full overflow-auto bg-white shadow-[0_0_0_1px_var(--color-hairline-strong)]"
      >
        <header className="flex items-start justify-between gap-6 border-b border-hairline px-6 py-5">
          <div className="min-w-0">
            {code ? <div className="spec mb-2">{code}</div> : null}
            <h2 className="font-display text-[18px] font-medium tracking-[-0.02em] text-carbon">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-[13px] leading-relaxed text-steel">{description}</p>
            ) : null}
          </div>
          <IconButton onClick={onClose} aria-label="Close" size="sm">
            <IconX size={16} />
          </IconButton>
        </header>
        <div className="px-6 py-5">{children}</div>
        {footer ? (
          <footer className="flex items-center justify-end gap-2 border-t border-hairline px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Drawer. Slides in from the edge on a hard snap curve, like a tool drawer.
 */
export function Drawer({
  open,
  onClose,
  title,
  code,
  footer,
  children,
  width = "440px",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  code?: string;
  footer?: ReactNode;
  children: ReactNode;
  width?: string;
}) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-carbon/25" onClick={onClose} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        style={{ width }}
        className="anim-drawer absolute inset-y-0 right-0 flex max-w-full flex-col bg-white shadow-[-1px_0_0_0_var(--color-hairline-strong)]"
      >
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-hairline px-5">
          <div className="flex min-w-0 items-baseline gap-3">
            {code ? <span className="spec">{code}</span> : null}
            <h2 className="truncate font-display text-[15px] font-medium tracking-[-0.02em] text-carbon">
              {title}
            </h2>
          </div>
          <IconButton onClick={onClose} aria-label="Close" size="sm">
            <IconX size={16} />
          </IconButton>
        </header>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-5">{children}</div>
        {footer ? (
          <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-hairline px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
