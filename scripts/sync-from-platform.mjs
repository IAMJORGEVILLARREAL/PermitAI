/**
 * Copy the canonical Next app from platform/ into the repo root
 * so Vercel can build from root (rootDirectory is not valid in vercel.json).
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const platform = join(root, "platform");

function syncDir(fromRel, toRel) {
  const from = join(platform, fromRel);
  const to = join(root, toRel);
  if (!existsSync(from)) return;
  rmSync(to, { recursive: true, force: true });
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

function syncFile(fromRel, toRel = fromRel) {
  const from = join(platform, fromRel);
  const to = join(root, toRel);
  if (!existsSync(from)) return;
  cpSync(from, to);
}

syncDir("src", "src");
syncDir("prisma", "prisma");
syncDir("public", "public");
syncFile("next.config.ts");
syncFile("tsconfig.json");
syncFile("postcss.config.mjs");
syncFile("eslint.config.mjs");
syncFile("next-env.d.ts");

console.log("Synced platform/ → repo root for Vercel build");
