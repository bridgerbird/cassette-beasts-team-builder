# Cassette Beasts Team Planner

A standalone browser tool for planning Cassette Beasts teams: dex browsing,
a Showdown-style team builder, per-monster loadout planning, and a fusion
explorer. Built with React + Vite so it compiles down to a plain
`index.html` + JS/CSS bundle you can host anywhere or open locally.

Tab navigation, team roster add/remove/edit, localStorage-backed
autosave, and export/import via a share code all work. Real Cassette
Beasts data is now wired in:

- **Types & chemistry**: fully wired, hand-verified against the wiki's
  `Data:Types` source (`src/data/types.js`). Powers type badges (colored
  from the game's own palettes, not hotlinked images) and the Self
  Target Possibilities table.
- **Species**: a 38-form sample covering all 14 types plus a few full
  evolution chains ships in `src/data/species.sample.js`, so the Dex
  Browser and Team Builder are functional right now. Run
  `npm run fetch-data` to pull the complete ~390-form dataset from the
  wiki into `src/data/generated/species.json`, then swap the import in
  `src/data/useSpeciesData.js`.
- **Moves & status effects**: `npm run fetch-data` also pulls these into
  `src/data/generated/`, not yet wired into the UI.
- **Fusion mapping**: not yet found in the wiki's `Data:` namespace --
  the Fusion Explorer and fusion sprite gallery are still placeholders
  pending that data source.
- **Sprites**: not yet wired in (type badges use color, not images, for
  now). See the notes on sourcing sprites in our planning conversation.

## Project layout

```
src/
  components/
    Shared/Tabs.jsx           tab navigation shell
    Dex/DexBrowser.jsx        dex browser tab (placeholder)
    TeamBuilder/              team builder tab + its pieces
      TeamBuilder.jsx           top-level layout for this tab
      TeamMemberCard.jsx        one team slot (species/nickname/stats/type/sprite/moves)
      FusionGallery.jsx         all-pairs fusion sprite gallery (placeholder)
      SelfTargetTable.jsx       self-buff combinations table (placeholder)
      TeamNotes.jsx             free-text strategy notes
      ExportImportBar.jsx       share-code export/import UI
    Loadouts/LoadoutPlanner.jsx  loadout planner tab (placeholder)
    Fusion/FusionExplorer.jsx    fusion explorer tab (placeholder)
  data/
    teamShape.js               shape/defaults for a team and a team member
    types.js                   type chemistry chart + palettes + self-buff logic
    species.sample.js          38-form sample species dataset (bios excluded)
    useSpeciesData.js          hook exposing species data + lookup helpers
    generated/                 full datasets, created by `npm run fetch-data` (gitignored until you run it)
  hooks/
    useLocalStorage.js         generic localStorage-backed useState
    useTeamStore.js            team state + editing actions, autosaved
  utils/
    exportImport.js            team <-> share-code encode/decode, URL param
  App.jsx                      top-level tab wiring
  main.jsx                     React entry point
  index.css                    structural skeleton styles (design pass comes later)

scripts/
  fetch-wiki-data.mjs          run locally to pull full Species/Moves/StatusEffects JSON from the wiki
```

## Running it locally

```
npm install
npm run dev
```

This starts a dev server (Vite will print a `localhost` URL) with hot
reload while you work on it.

## Building a shareable static version

```
npm run build
```

This produces a `dist/` folder containing a self-contained `index.html`
plus bundled JS/CSS. That `dist/` folder is what you'd host (GitHub
Pages, Netlify, a plain file server, or just open `dist/index.html`
directly in a browser) to share the tool with other people. Each
person's team data is saved in their own browser's localStorage, so
nothing needs a backend.

## What's next

- Run `npm run fetch-data` and swap in the full species dataset for the
  38-form sample.
- Wire the Loadout Planner tab to move data (currently only the Team
  Builder's per-member move picker uses it).
- Track down a fusion-mapping data source (not in the wiki's `Data:`
  namespace) to power the Fusion Explorer and fusion sprite gallery.
- Source actual sprites -- see the sprite-sourcing options discussed
  earlier (self-hosted from the wiki for personal/non-commercial use,
  or extracted via `cbpickaxe` from your own copy of the game).
- Visual design pass (current styling is intentionally bare-bones).
