// Central definition of what a "team" and a "team member" look like.
// No real Cassette Beasts data lives here yet -- this is just the
// skeleton shape the rest of the app is built against. Species/move/
// type data will be fetched and wired in separately.

export const MAX_TEAM_SIZE = 6;

export function createEmptyMember() {
  return {
    id: crypto.randomUUID(),
    speciesName: null, // references a species by name in the loaded dataset
    nickname: "",
    moveNames: [], // array of move name strings, up to the species' move_slots
  };
}

export function createEmptyTeam() {
  return {
    id: crypto.randomUUID(),
    name: "Untitled Team",
    members: [],
    notes: "",
  };
}
