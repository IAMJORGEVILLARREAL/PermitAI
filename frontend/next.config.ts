import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Lets a production build run without clobbering the .next dir of a live dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    root,
  },
};

export default nextConfig;
