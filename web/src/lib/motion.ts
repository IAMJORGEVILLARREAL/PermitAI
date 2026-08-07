export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const CTA_PRIMARY = "Scan Your Plans - Free";
export const CTA_SECONDARY = "See how it works";
