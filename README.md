# Cassette Beasts Team Planner

A standalone browser tool for planning Cassette Beasts teams: dex browsing,
a Showdown-style team builder, per-monster loadout planning, and a fusion
explorer. Built with React + Vite so it compiles down to a plain
`index.html` + JS/CSS bundle you can host anywhere or open locally.

This is currently a **skeleton**: tab navigation, team roster
add/remove/edit, localStorage-backed autosave, and export/import via a
share code all work. No real Cassette Beasts species/move/type/fusion
data is wired in yet -- that's the next step.

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
  hooks/
    useLocalStorage.js         generic localStorage-backed useState
    useTeamStore.js            team state + editing actions, autosaved
  utils/
    exportImport.js            team <-> share-code encode/decode, URL param
  App.jsx                      top-level tab wiring
  main.jsx                     React entry point
  index.css                    structural skeleton styles (design pass comes later)
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

- Wire in real species/move/type/status-effect data (sourced from the
  Cassette Beasts wiki's `Data:` JSON pages).
- Implement the Dex Browser using that data.
- Implement move/sticker selection in the Loadout Planner.
- Implement the type-chart-driven Self Target Possibilities table.
- Implement the Fusion Explorer + fusion sprite gallery using the
  fusion mapping data.
- Visual design pass (current styling is intentionally bare-bones).
