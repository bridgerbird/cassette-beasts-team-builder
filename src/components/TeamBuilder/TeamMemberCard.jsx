export function TeamMemberCard({ member, onUpdate, onRemove }) {
  return (
    <div className="member-card">
      <div className="member-card__sprite-slot" aria-hidden="true">
        {/* Sprite will render here once species data is wired in */}
        <span className="placeholder-note">sprite</span>
      </div>

      <div className="member-card__fields">
        <label className="field">
          <span className="field__label">Species</span>
          <span className="field__value placeholder-note">
            {member.speciesId ?? "Not chosen"}
          </span>
        </label>

        <label className="field">
          <span className="field__label">Nickname</span>
          <input
            type="text"
            value={member.nickname}
            placeholder="(defaults to species name)"
            onChange={(e) => onUpdate(member.id, { nickname: e.target.value })}
          />
        </label>

        <div className="field">
          <span className="field__label">Type</span>
          <span className="placeholder-note">—</span>
        </div>

        <div className="field">
          <span className="field__label">Stats</span>
          <span className="placeholder-note">—</span>
        </div>

        <div className="field">
          <span className="field__label">Chosen Moves</span>
          <span className="placeholder-note">
            {member.moves.length === 0 ? "None selected" : `${member.moves.length} selected`}
          </span>
        </div>
      </div>

      <button className="member-card__remove" onClick={() => onRemove(member.id)}>
        Remove
      </button>
    </div>
  );
}
