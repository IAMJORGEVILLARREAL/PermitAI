"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { IconX } from "@/components/icons";

/* --- Empty state ---------------------------------------------------------- */

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-20 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-6 text-concrete">{icon}</div> : null}
      <h3 className="font-display text-[16px] font-medium tracking-[-0.02em] text-carbon">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-steel">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* --- Skeleton ------------------------------------------------------------- */

/** Loading placeholder. A hatched region, never a shimmer. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("material-hatch h-4 w-full bg-fog/50", className)} aria-hidden />;
}

/* --- Toasts --------------------------------------------------------------- */

type Toast = {
  id: number;
  title: string;
  detail?: string;
  tone?: "neutral" | "alert";
};

const ToastContext = createContext<{
  push: (t: Omit<Toast, "id">) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 5000);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-[340px] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="anim-rise pointer-events-auto flex items-start justify-between gap-4 bg-carbon px-4 py-3 text-white"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {t.tone === "alert" ? (
                  <span className="h-[6px] w-[6px] shrink-0 bg-alert" aria-hidden />
                ) : (
                  <span className="h-[6px] w-[6px] shrink-0 bg-lime" aria-hidden />
                )}
                <span className="text-[13px] leading-tight">{t.title}</span>
              </div>
              {t.detail ? (
                <p className="mt-1 pl-4 text-[12px] leading-snug text-concrete">
                  {t.detail}
                </p>
              ) : null}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="shrink-0 text-concrete transition-colors hover:text-white"
              aria-label="Dismiss"
            >
              <IconX size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

/* --- Advisory notice ------------------------------------------------------ */

/**
 * NFR-06 requires that AI output is always framed as an advisory draft for
 * professional validation. This is the in-page form of that notice.
 */
export function AdvisoryNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "border-l-[3px] border-hairline-strong pl-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-concrete",
        className,
      )}
    >
      AI-generated advisory draft for professional validation. Not a licensed
      design, engineering, or legal service.
    </p>
  );
}
