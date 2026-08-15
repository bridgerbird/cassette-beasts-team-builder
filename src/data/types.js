// Sourced from the Cassette Beasts wiki's Data:Types page
// (https://wiki.cassettebeasts.com/wiki/Data:Types), which stores this
// as the game's own chemistry table. Verified against known in-game
// examples (e.g. Fire -> Air is POSITIVE / "Updraft" / grants Air Wall).
//
// Structure: chemistry[attackerType][defenderType] = { hint, message, statuses }
//   hint is one of POSITIVE (buff to defender), NEGATIVE (debuff/damage
//   effect to defender), or TRANSMUTATION (defender's type is temporarily
//   changed / "coated").
//   statuses is a list of [statusName, durationTurns] pairs applied.
//
// Only pairs with an actual chemistry interaction are listed; any pair
// not present here has no special interaction (plain damage).

export const TYPES = [
  "Air", "Astral", "Beast", "Earth", "Fire", "Glass", "Glitter",
  "Ice", "Lightning", "Metal", "Plant", "Plastic", "Poison", "Water",
];

// Official palette per type, 5 hex colors light->dark as defined by the
// game itself. Used to render our own type badges/swatches instead of
// hotlinking sprite images -- this is game *data*, not artwork, so it
// sidesteps the copyright ambiguity around reusing sprite assets.
export const TYPE_PALETTES = {
  Air: ["0c2c2a", "14433f", "206454", "38a876", "7fd29c"],
  Astral: ["171735", "27294f", "373f67", "57628e", "8390b9"],
  Beast: ["524e3d", "757157", "b0aa82", "d0ccae", "eeeee2"],
  Earth: ["35222a", "472a35", "6f3945", "935353", "bf8178"],
  Fire: ["491818", "702924", "d04d2f", "f28245", "f7c36e"],
  Glass: ["393c4c", "626c84", "9dacc3", "cee1ee", "ecf5f8"],
  Glitter: ["321a56", "5c357e", "c355c1", "f382c5", "faa3cf"],
  Ice: ["1a1e51", "283e77", "3471b2", "41b1e1", "91d5f3"],
  Lightning: ["782626", "9c4a35", "d98a30", "f1c255", "f8e68b"],
  Metal: ["3d2f41", "5a4860", "78668a", "9792b9", "b9bcda"],
  Plant: ["0c2c2a", "14433f", "308245", "56bf4a", "a9da71"],
  Plastic: ["480e20", "6f1625", "b12031", "e9423f", "f98571"],
  Poison: ["1f1443", "382376", "7629db", "b654f2", "d087f8"],
  Water: ["1f1443", "332876", "4648ce", "607aeb", "75affa"],
};

export const CHEMISTRY = {
  Air: {
    Astral: { hint: "POSITIVE", message: "Energised", statuses: [["AP Boost", 3]] },
    Fire: { hint: "NEGATIVE", message: "Extinguished", statuses: [["Melee Attack Down", 3], ["Ranged Attack Down", 3]] },
    Glass: { hint: "NEGATIVE", message: "Resonating", statuses: [["Resonance", 1]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Air Coating", 3]] },
    Lightning: { hint: "POSITIVE", message: "Conducted", statuses: [["Multitarget", 3]] },
    Plant: { hint: "NEGATIVE", message: "Uprooted", statuses: [["AP Drain", 3]] },
  },
  Astral: {
    Air: { hint: "NEGATIVE", message: "Drained", statuses: [["AP Drain", 3]] },
    Astral: { hint: "POSITIVE", message: "Energised", statuses: [["AP Boost", 3]] },
    Earth: { hint: "NEGATIVE", message: "Drained", statuses: [["AP Drain", 3]] },
    Fire: { hint: "NEGATIVE", message: "Drained", statuses: [["AP Drain", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Astral Coating", 3]] },
    Water: { hint: "NEGATIVE", message: "Drained", statuses: [["AP Drain", 3]] },
  },
  Beast: {
    Glass: { hint: "NEGATIVE", message: "Shattered", statuses: [["Glass Shards", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Beast Coating", 3]] },
  },
  Earth: {
    Astral: { hint: "POSITIVE", message: "Energised", statuses: [["AP Boost", 3]] },
    Fire: { hint: "NEGATIVE", message: "Extinguished", statuses: [["Melee Attack Down", 3], ["Ranged Attack Down", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Earth Coating", 3]] },
    Lightning: { hint: "NEGATIVE", message: "Grounded", statuses: [["Unitarget", 3]] },
    Plastic: { hint: "NEGATIVE", message: "Buried", statuses: [["Evasion Down", 3], ["Speed Down", 3]] },
  },
  Fire: {
    Air: { hint: "POSITIVE", message: "Updraft", statuses: [["Air Wall", 2]] },
    Astral: { hint: "POSITIVE", message: "Energised", statuses: [["AP Boost", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Fire Coating", 3]] },
    Ice: { hint: "TRANSMUTATION", message: "Melted", statuses: [["Water Coating", 3]] },
    Metal: { hint: "NEGATIVE", message: "Melted", statuses: [["Burned", 3]] },
    Plant: { hint: "NEGATIVE", message: "Ignited", statuses: [["Burned", 3]] },
    Plastic: { hint: "TRANSMUTATION", message: "Melted", statuses: [["Poison Coating", 3]] },
    Poison: { hint: "NEGATIVE", message: "Ignited", statuses: [["Burned", 3]] },
    Water: { hint: "POSITIVE", message: "Steamed", statuses: [["Healing Steam", 3]] },
  },
  Glass: {
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glass Coating", 3]] },
    Lightning: { hint: "NEGATIVE", message: "Insulated", statuses: [["Unitarget", 3]] },
  },
  Glitter: {
    // Glitter-type moves coat ANY target type in "Glitter Coating".
    Air: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Astral: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Beast: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Earth: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Fire: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Glass: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Ice: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Lightning: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Metal: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Plant: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Plastic: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Poison: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
    Water: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Glitter Coating", 3]] },
  },
  Ice: {
    Air: { hint: "NEGATIVE", message: "Chilled", statuses: [["Accuracy Down", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Ice Coating", 3]] },
    Lightning: { hint: "POSITIVE", message: "Conducted", statuses: [["Multitarget", 3]] },
    Water: { hint: "TRANSMUTATION", message: "Frozen", statuses: [["Ice Coating", 3], ["Flinched", 1]] },
  },
  Lightning: {
    Air: { hint: "NEGATIVE", message: "Electrified", statuses: [["Conductive", 3]] },
    Earth: { hint: "TRANSMUTATION", message: "Vitrified", statuses: [["Glass Coating", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Lightning Coating", 3]] },
    Ice: { hint: "NEGATIVE", message: "Electrified", statuses: [["Conductive", 3]] },
    Metal: { hint: "NEGATIVE", message: "Electrified", statuses: [["Conductive", 3]] },
    Plastic: { hint: "POSITIVE", message: "Static", statuses: [["Contact Dmg Lightning", 3]] },
    Water: { hint: "NEGATIVE", message: "Electrified", statuses: [["Conductive", 3]] },
  },
  Metal: {
    Astral: { hint: "NEGATIVE", message: "Disturbed", statuses: [["Berserk", 3]] },
    Earth: { hint: "NEGATIVE", message: "Smashed", statuses: [["Melee Defence Down", 3], ["Ranged Defence Down", 3]] },
    Glass: { hint: "NEGATIVE", message: "Shattered", statuses: [["Glass Shards", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Metal Coating", 3]] },
    Ice: { hint: "NEGATIVE", message: "Smashed", statuses: [["Melee Defence Down", 3], ["Ranged Defence Down", 3]] },
    Lightning: { hint: "POSITIVE", message: "Conducted", statuses: [["Multitarget", 3]] },
  },
  Plant: {
    Earth: { hint: "NEGATIVE", message: "Seeded", statuses: [["Leeched", 3]] },
    Fire: { hint: "POSITIVE", message: "Smoke", statuses: [["Evasion Up", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Plant Coating", 3]] },
    Lightning: { hint: "NEGATIVE", message: "Grounded", statuses: [["Unitarget", 3]] },
    Poison: { hint: "POSITIVE", message: "Potentiated", statuses: [["Melee Attack Up", 3], ["Ranged Attack Up", 3]] },
    Water: { hint: "NEGATIVE", message: "Sapped", statuses: [["Leeched", 3]] },
  },
  Plastic: {
    Astral: { hint: "NEGATIVE", message: "Distracted", statuses: [["AP Drain", 3]] },
    Fire: { hint: "POSITIVE", message: "Smoke", statuses: [["Evasion Up", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Plastic Coating", 3]] },
    Lightning: { hint: "NEGATIVE", message: "Insulated", statuses: [["Unitarget", 3]] },
  },
  Poison: {
    Astral: { hint: "NEGATIVE", message: "Disturbed", statuses: [["Berserk", 3]] },
    Earth: { hint: "POSITIVE", message: "Tipped", statuses: [["Contact Dmg Poison", 3]] },
    Fire: { hint: "POSITIVE", message: "Fueled", statuses: [["AP Boost", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Poison Coating", 3]] },
    Metal: { hint: "POSITIVE", message: "Tipped", statuses: [["Contact Dmg Poison", 3]] },
    Plant: { hint: "NEGATIVE", message: "Absorbed", statuses: [["Poisoned", 3]] },
  },
  Water: {
    Astral: { hint: "POSITIVE", message: "Energised", statuses: [["AP Boost", 3]] },
    Earth: { hint: "NEGATIVE", message: "Eroded", statuses: [["Melee Defence Down", 3], ["Ranged Defence Down", 3]] },
    Fire: { hint: "NEGATIVE", message: "Extinguished", statuses: [["Melee Attack Down", 3], ["Ranged Attack Down", 3]] },
    Glitter: { hint: "TRANSMUTATION", message: "Sparkly", statuses: [["Water Coating", 3]] },
    Ice: { hint: "POSITIVE", message: "Bulked Up", statuses: [["Melee Defence Up", 3], ["Ranged Defence Up", 3]] },
    Lightning: { hint: "POSITIVE", message: "Conducted", statuses: [["Multitarget", 3]] },
    Metal: { hint: "NEGATIVE", message: "Corroded", statuses: [["Melee Defence Down", 3], ["Ranged Defence Down", 3]] },
    Plant: { hint: "POSITIVE", message: "Absorbed", statuses: [["Healing Leaf", 3]] },
  },
};

/**
 * Given an attacking type and a defending type, return the chemistry
 * interaction (or null if it's just plain damage with no special effect).
 */
export function getChemistry(attackerType, defenderType) {
  return CHEMISTRY[attackerType]?.[defenderType] ?? null;
}

/**
 * For a roster of teammates (each with an elementalType), find every
 * ordered pair (attacker, defender) where the attacker's type lands a
 * POSITIVE (buff) effect on the defender's type. This is exactly the
 * "Self Target Possibilities" the team builder surfaces.
 */
export function findSelfBuffCombos(members) {
  const combos = [];
  for (const attacker of members) {
    for (const defender of members) {
      if (attacker.id === defender.id) continue;
      const chem = getChemistry(attacker.elementalType, defender.elementalType);
      if (chem && chem.hint === "POSITIVE") {
        combos.push({
          attackerId: attacker.id,
          defenderId: defender.id,
          attackerType: attacker.elementalType,
          defenderType: defender.elementalType,
          ...chem,
        });
      }
    }
  }
  return combos;
}
