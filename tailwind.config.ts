import type { Config } from "tailwindcss";

/** Tailwind v4 uses CSS-first config in globals.css; this file kept for tooling/editor hints. */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
