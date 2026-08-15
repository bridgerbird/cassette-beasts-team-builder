import { useMemo } from "react";
import { findSelfBuffCombos } from "../../data/types";
import { useSpeciesData } from "../../data/useSpeciesData";
import { TypeBadge } from "../Shared/TypeBadge";

export function SelfTargetTable({ members }) {
  const { byName } = useSpeciesData();

  const typedMembers = useMemo(
    () =>
      members
        .filter((m) => m.speciesName)
        .map((m) => ({
          id: m.id,
          label: m.nickname || m.speciesName,
          elementalType: byName.get(m.speciesName)?.elemental_type,
        }))
        .filter((m) => m.elementalType),
    [members, byName]
  );

  const combos = useMemo(() => findSelfBuffCombos(typedMembers), [typedMembers]);

  const labelFor = (id) => typedMembers.find((m) => m.id === id)?.label ?? "?";

  return (
    <section className="panel">
      <h3>Self Target Possibilities</h3>
      <p className="placeholder-note">
        Buff combos where one teammate's move type lands a positive effect on
        another teammate's own type -- deliberate "friendly fire" for a free buff.
      </p>

      {typedMembers.length < 2 ? (
        <p className="placeholder-note">Add at least 2 team members with a species chosen.</p>
      ) : combos.length === 0 ? (
        <p className="placeholder-note">No self-buff combos on this team's current type spread.</p>
      ) : (
        <table className="self-target-table">
          <thead>
            <tr>
              <th>Attacker</th>
              <th>Target</th>
              <th>Effect</th>
              <th>Grants</th>
            </tr>
          </thead>
          <tbody>
            {combos.map((c, i) => (
              <tr key={i}>
                <td>{labelFor(c.attackerId)} <TypeBadge type={c.attackerType} /></td>
                <td>{labelFor(c.defenderId)} <TypeBadge type={c.defenderType} /></td>
                <td>{c.message}</td>
                <td>{c.statuses.map(([name, turns]) => `${name} (${turns}t)`).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
