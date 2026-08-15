#!/usr/bin/env node
// Pulls the game's raw data straight from the Cassette Beasts wiki's
// Data: namespace (Data:Species, Data:Moves, Data:StatusEffects) via
// the standard MediaWiki Action API, and writes it into src/data/ as
// plain JSON files the app can import.
//
// Why a script you run yourself: this sandbox's network is locked to a
// small allowlist of package registries and can't reach the wiki, but
// your machine has normal internet access. Run this whenever you want
// to refresh the dataset (e.g. after a game update adds new species).
//
// Usage:
//   node scripts/fetch-wiki-data.mjs
//
// This only needs to be run occasionally -- the output is committed
// as regular JSON files, so the app doesn't need network access at
// runtime.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "src", "data", "generated");

const API_BASE = "https://wiki.cassettebeasts.com/api.php";

// Data: pages we pull. Data:Types is NOT included here because it's
// already hand-transcribed and verified in src/data/types.js -- no
// need to re-fetch something small, stable, and already checked.
const PAGES = [
  { title: "Data:Species", outFile: "species.json" },
  { title: "Data:Moves", outFile: "moves.json" },
  { title: "Data:StatusEffects", outFile: "status-effects.json" },
];

async function fetchPageSource(title) {
  const url = new URL(API_BASE);
  url.searchParams.set("action", "query");
  url.searchParams.set("prop", "revisions");
  url.searchParams.set("titles", title);
  url.searchParams.set("rvslots", "main");
  url.searchParams.set("rvprop", "content");
  url.searchParams.set("format", "json");
  url.searchParams.set("formatversion", "2");

  const res = await fetch(url, {
    headers: {
      // Identify politely -- this is a one-off manual data pull, not a crawler.
      "User-Agent": "cassette-beasts-team-planner (personal fan project, manual data refresh)",
    },
  });

  if (!res.ok) {
    throw new Error(`Request for "${title}" failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const page = data?.query?.pages?.[0];

  if (!page || page.missing) {
    throw new Error(`Page "${title}" not found on the wiki.`);
  }

  const content = page.revisions?.[0]?.slots?.main?.content;
  if (!content) {
    throw new Error(`No content returned for "${title}".`);
  }

  return content;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const { title, outFile } of PAGES) {
    process.stdout.write(`Fetching ${title}... `);
    try {
      const raw = await fetchPageSource(title);
      // The Data: pages store their content as plain JSON text.
      const parsed = JSON.parse(raw);
      const outPath = path.join(OUT_DIR, outFile);
      await writeFile(outPath, JSON.stringify(parsed, null, 2), "utf-8");
      const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
      console.log(`done (${count} entries) -> src/data/generated/${outFile}`);
    } catch (err) {
      console.log("FAILED");
      console.error(`  ${err.message}`);
    }
  }

  console.log("\nDone. Re-run this script any time to refresh the data.");
}

main();
