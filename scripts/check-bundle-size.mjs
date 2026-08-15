/**
 * Bundle size budget.
 *
 * Fails the build when a bundle grows past its limit. The point is to catch the
 * accidental import - someone pulls a 70kB date library into the header, the
 * main bundle jumps, and nobody notices until the app feels slow on 3G.
 *
 * Run:  npm run size          (expects `npm run build` to have run first)
 *       npm run build:check   (does both)
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";

// Limits are on the GZIPPED size, because that is what actually crosses the
// network. Raise them deliberately, never "just to make CI green".
const BUDGETS = [
  { pattern: /^React-Practice\.[a-f0-9]+\.js$/, label: "main bundle", maxKB: 120 },
  { pattern: /^React-Practice\.[a-f0-9]+\.css$/, label: "main css", maxKB: 8 },
  { pattern: /^Grocery\.[a-f0-9]+\.js$/, label: "grocery chunk", maxKB: 15 },
  { pattern: /^RestaurantMenu\.[a-f0-9]+\.js$/, label: "menu chunk", maxKB: 25 },
];

const kb = (bytes) => bytes / 1024;
const fmt = (n) => n.toFixed(1).padStart(7);

let files;
try {
  files = readdirSync(DIST);
} catch {
  console.error(`✗ No ${DIST}/ folder. Run "npm run build" first.`);
  process.exit(1);
}

let failed = false;
let matchedAny = false;

console.log("\n  Bundle size budget (gzipped)\n");
console.log("  status  file                          gzip      limit");
console.log("  ------  ----------------------------  --------  --------");

for (const budget of BUDGETS) {
  // The dev server and the production build BOTH write into dist/, so old
  // unminified dev bundles can still be sitting there. Always measure the
  // most recently written match, which is the one we just built.
  const match = files
    .filter((f) => budget.pattern.test(f))
    .sort(
      (a, b) =>
        statSync(join(DIST, b)).mtimeMs - statSync(join(DIST, a)).mtimeMs,
    )[0];

  if (!match) {
    console.log(
      `  ${"skip".padEnd(6)}  ${budget.label.padEnd(28)}  ${"-".padStart(8)}  ${fmt(budget.maxKB)}`,
    );
    continue;
  }

  matchedAny = true;
  const raw = readFileSync(join(DIST, match));
  const gzipped = kb(gzipSync(raw).length);
  const over = gzipped > budget.maxKB;
  if (over) failed = true;

  console.log(
    `  ${(over ? "FAIL" : "ok").padEnd(6)}  ${match.slice(0, 28).padEnd(28)}  ${fmt(gzipped)}  ${fmt(budget.maxKB)}`,
  );
}

if (!matchedAny) {
  console.error("\n✗ No bundles matched any budget. Did the build succeed?\n");
  process.exit(1);
}

if (failed) {
  console.error("\n✗ A bundle is over budget.");
  console.error(
    "  Check what you imported. If the growth is genuinely justified,",
    "\n  raise the limit in scripts/check-bundle-size.mjs in the same commit.\n",
  );
  process.exit(1);
}

console.log("\n✓ All bundles within budget\n");
