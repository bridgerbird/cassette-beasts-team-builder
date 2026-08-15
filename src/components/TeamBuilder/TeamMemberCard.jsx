import { useSpeciesData, getOwnMovePool } from "../../data/useSpeciesData";
import { TypeBadge } from "../Shared/TypeBadge";

export function TeamMemberCard({ member, onUpdate, onRemove }) {
  const { species, byName, allMoveNames } = useSpeciesData();
  const speciesEntry = member.speciesName ? byName.get(member.speciesName) : null;
  const ownPool = getOwnMovePool(speciesEntry);
  const maxSlots = speciesEntry?.stats.move_slots ?? 0;

  const handleSpeciesChange = (name) => {
    // Changing species clears moves, since slot count / legal pool changes.
    onUpdate(member.id, { speciesName: name || null, moveNames: [] });
  };

  const toggleMove = (moveName) => {
    const has = member.moveNames.includes(moveName);
    if (has) {
      onUpdate(member.id, { moveNames: member.moveNames.filter((m) => m !== moveName) });
    } else if (member.moveNames.length < maxSlots) {
      onUpdate(member.id, { moveNames: [...member.moveNames, moveName] });
    }
  };

  return (
    <div className="member-card">
      <div className="member-card__sprite-slot" aria-hidden="true">
        {speciesEntry ? (
          <img
            className="member-card__sprite"
            src={`${import.meta.env.BASE_URL}sprites/${speciesEntry.name}.png`}
            alt=""
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <span className="placeholder-note">sprite</span>
        )}
      </div>

      <div className="member-card__fields">
        <label className="field">
          <span className="field__label">Species</span>
          <select
            value={member.speciesName ?? ""}
            onChange={(e) => handleSpeciesChange(e.target.value)}
          >
            <option value="">Choose a species...</option>
            {species.map((s) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Nickname</span>
          <input
            type="text"
            value={member.nickname}
            placeholder={speciesEntry?.name ?? "(pick a species first)"}
            onChange={(e) => onUpdate(member.id, { nickname: e.target.value })}
          />
        </label>

        <div className="field">
          <span className="field__label">Type</span>
          <TypeBadge type={speciesEntry?.elemental_type} />
        </div>

        <div className="field">
          <span className="field__label">Stats</span>
          {speciesEntry ? (
            <div className="stat-grid">
              <span>HP {speciesEntry.stats.max_hp}</span>
              <span>AP {speciesEntry.stats.max_ap}</span>
              <span>Melee Atk {speciesEntry.stats.melee_attack}</span>
              <span>Melee Def {speciesEntry.stats.melee_defense}</span>
              <span>Ranged Atk {speciesEntry.stats.ranged_attack}</span>
              <span>Ranged Def {speciesEntry.stats.ranged_defense}</span>
              <span>Speed {speciesEntry.stats.speed}</span>
            </div>
          ) : (
            <span className="placeholder-note">—</span>
          )}
        </div>

        <div className="field">
          <span className="field__label">
            Chosen Moves {speciesEntry && `(${member.moveNames.length}/${maxSlots})`}
          </span>
          {speciesEntry ? (
            <>
              <div className="move-chip-list">
                {member.moveNames.map((m) => (
                  <span
                    key={m}
                    className={`move-chip${ownPool.has(m) ? "" : " move-chip--sticker"}`}
                    title={ownPool.has(m) ? "Learned naturally" : "Requires a sticker"}
                  >
                    {m}
                    {!ownPool.has(m) && <span className="move-chip__sticker-tag"> (sticker)</span>}
                    <button
                      className="move-chip__remove"
                      onClick={() => toggleMove(m)}
                      aria-label={`Remove ${m}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <details className="move-picker">
                <summary>
                  {member.moveNames.length >= maxSlots ? "Slots full" : "Add a move..."}
                </summary>
                <div className="move-picker__list">
                  {allMoveNames
                    .filter((m) => !member.moveNames.includes(m))
                    .map((m) => (
                      <button
                        key={m}
                        className={`move-option${ownPool.has(m) ? "" : " move-option--sticker"}`}
                        onClick={() => toggleMove(m)}
                        disabled={member.moveNames.length >= maxSlots}
                      >
                        {m}{!ownPool.has(m) && " (sticker)"}
                      </button>
                    ))}
                </div>
              </details>
            </>
          ) : (
            <span className="placeholder-note">Pick a species to choose moves</span>
          )}
        </div>
      </div>

      <button className="member-card__remove" onClick={() => onRemove(member.id)}>
        Remove
      </button>
    </div>
  );
}
