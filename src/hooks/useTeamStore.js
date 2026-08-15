import { useLocalStorage } from "./useLocalStorage";
import { MAX_TEAM_SIZE, createEmptyMember, createEmptyTeam } from "../data/teamShape";

const STORAGE_KEY = "cbtp.team.v1";

/**
 * Single source of truth for the current team, autosaved to
 * localStorage on every change. Exposes editing actions used by
 * the Team Builder tab.
 */
export function useTeamStore() {
  const [team, setTeam] = useLocalStorage(STORAGE_KEY, createEmptyTeam());

  const renameTeam = (name) => setTeam((t) => ({ ...t, name }));

  const setNotes = (notes) => setTeam((t) => ({ ...t, notes }));

  const addMember = () =>
    setTeam((t) =>
      t.members.length >= MAX_TEAM_SIZE
        ? t
        : { ...t, members: [...t.members, createEmptyMember()] }
    );

  const removeMember = (memberId) =>
    setTeam((t) => ({
      ...t,
      members: t.members.filter((m) => m.id !== memberId),
    }));

  const updateMember = (memberId, updates) =>
    setTeam((t) => ({
      ...t,
      members: t.members.map((m) =>
        m.id === memberId ? { ...m, ...updates } : m
      ),
    }));

  const replaceTeam = (newTeam) => setTeam(newTeam);

  const resetTeam = () => setTeam(createEmptyTeam());

  return {
    team,
    renameTeam,
    setNotes,
    addMember,
    removeMember,
    updateMember,
    replaceTeam,
    resetTeam,
  };
}
