import { useMemo } from "react";
import allSpecies from "./generated/species.json";

/**
 * Central access point for species data. Returns the list plus a few
 * derived lookups so components don't each re-derive the same things.
 */
export function useSpeciesData() {
  const species = allSpecies;

  const byName = useMemo(() => {
    const map = new Map();
    for (const s of species) map.set(s.name, s);
    return map;
  }, [species]);

  const allMoveNames = useMemo(() => {
    const names = new Set();
    for (const s of species) {
      for (const m of s.moves.initial) names.add(m);
      for (const m of s.moves.upgrades) names.add(m);
    }
    return [...names].sort();
  }, [species]);

  const allTypes = useMemo(
    () => [...new Set(species.map((s) => s.elemental_type))].sort(),
    [species]
  );

  return { species, byName, allMoveNames, allTypes };
}

/** A species' own learnable pool (moves that don't require a sticker). */
export function getOwnMovePool(speciesEntry) {
  if (!speciesEntry) return new Set();
  return new Set([...speciesEntry.moves.initial, ...speciesEntry.moves.upgrades]);
}
