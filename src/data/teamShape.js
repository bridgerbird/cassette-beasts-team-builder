// Central definition of what a "team" and a "team member" look like.
// No real Cassette Beasts data lives here yet -- this is just the
// skeleton shape the rest of the app is built against. Species/move/
// type data will be fetched and wired in separately.

export const MAX_TEAM_SIZE = 6;

export function createEmptyMember() {
  return {
    id: crypto.randomUUID(),
    speciesId: null, // will reference an entry in the fetched species data
    nickname: "",
    moves: [], // array of { moveId, requiresSticker: boolean }
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
