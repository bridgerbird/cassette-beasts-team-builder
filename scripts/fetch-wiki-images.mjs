#!/usr/bin/env node
// Pulls the favicon, type icons, and static species sprites from the
// Cassette Beasts wiki and saves them into public/, where Vite serves
// anything at the site root.
//
// Usage:
//   node scripts/fetch-wiki-images.mjs
//
// Like fetch-wiki-data.mjs, this runs on YOUR machine (not in an AI
// sandbox), since it needs normal internet access to wiki.cassettebeasts.com.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SPRITES_DIR = path.join(PUBLIC_DIR, "sprites");
const TYPE_ICONS_DIR = path.join(PUBLIC_DIR, "icons", "types");

const FILE_PATH_BASE = "https://wiki.cassettebeasts.com/wiki/Special:FilePath/";

// All 15 type icon files, confirmed from the wiki's Category:Type_Icons page.
const TYPE_ICON_NAMES = [
  "Air", "Astral", "Beast", "Earth", "Fire", "Glass", "Glitter", "Ice",
  "Lightning", "Metal", "Plant", "Plastic", "Poison", "Typeless", "Water",
];

async function fetchBinary(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "cassette-beasts-team-planner (personal fan project, manual asset fetch)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

// MediaWiki file titles use underscores for spaces in the URL.
function wikiFileUrl(filename) {
  return FILE_PATH_BASE + encodeURIComponent(filename.replace(/ /g, "_"));
}

async function fetchFavicon() {
  process.stdout.write("Fetching favicon... ");
  try {
    const bytes = await fetchBinary("https://wiki.cassettebeasts.com/favicon.ico");
    await writeFile(path.join(PUBLIC_DIR, "favicon-source.ico"), bytes);
    console.log(`done -> public/favicon-source.ico (${bytes.length} bytes)`);
  } catch (err) {
    console.log("FAILED");
    console.error(
      `  ${err.message}\n` +
      "  The standard /favicon.ico path didn't work. To find the real one:\n" +
      "  open https://wiki.cassettebeasts.com in a browser, view page source,\n" +
      "  and look for <link rel=\"icon\" ...> or <link rel=\"shortcut icon\" ...>\n" +
      "  in the <head> -- that href is the actual favicon URL."
    );
  }
}

async function fetchTypeIcons() {
  await mkdir(TYPE_ICONS_DIR, { recursive: true });
  for (const name of TYPE_ICON_NAMES) {
    process.stdout.write(`Fetching type icon ${name}... `);
    try {
      const bytes = await fetchBinary(wikiFileUrl(`${name}.png`));
      await writeFile(path.join(TYPE_ICONS_DIR, `${name}.png`), bytes);
      console.log(`done (${bytes.length} bytes)`);
    } catch (err) {
      console.log(`FAILED (${err.message})`);
    }
  }
}

async function fetchSprites() {
  await mkdir(SPRITES_DIR, { recursive: true });

  let speciesNames;
  try {
    const { default: species } = await import("../src/data/generated/species.json", {
      with: { type: "json" },
    });
    speciesNames = species.map((s) => s.name);
  } catch {
    console.log(
      "Couldn't load src/data/generated/species.json -- run `npm run fetch-data` first " +
      "if you want sprites for the full dex. Falling back to the sample dataset's species."
    );
    const { SPECIES_SAMPLE } = await import("../src/data/species.sample.js");
    speciesNames = SPECIES_SAMPLE.map((s) => s.name);
  }

  console.log(`Fetching ${speciesNames.length} sprites (this takes a while)...`);
  let ok = 0, failed = 0;
  for (const name of speciesNames) {
    try {
      const bytes = await fetchBinary(wikiFileUrl(`${name}.png`));
      await writeFile(path.join(SPRITES_DIR, `${name}.png`), bytes);
      ok++;
    } catch (err) {
      failed++;
      console.error(`  FAILED: ${name} (${err.message})`);
    }
    // Be polite -- small delay between requests instead of hammering the wiki.
    await new Promise((r) => setTimeout(r, 150));
  }
  console.log(`Sprites: ${ok} succeeded, ${failed} failed.`);
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  await fetchFavicon();
  await fetchTypeIcons();
  await fetchSprites();
  console.log("\nDone. Re-run any time to refresh assets.");
}

main();