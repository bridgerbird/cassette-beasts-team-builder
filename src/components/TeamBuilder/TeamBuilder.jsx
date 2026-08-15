import { useTeamStore } from "../../hooks/useTeamStore";
import { MAX_TEAM_SIZE } from "../../data/teamShape";
import { TeamMemberCard } from "./TeamMemberCard";
import { FusionGallery } from "./FusionGallery";
import { SelfTargetTable } from "./SelfTargetTable";
import { TeamNotes } from "./TeamNotes";
import { ExportImportBar } from "./ExportImportBar";

export function TeamBuilder() {
  const {
    team,
    setNotes,
    addMember,
    removeMember,
    updateMember,
    replaceTeam,
  } = useTeamStore();

  return (
    <div className="team-builder">
      <section className="panel roster">
        <div className="roster__header">
          <h2>Team Roster</h2>
          <span className="placeholder-note">
            {team.members.length} / {MAX_TEAM_SIZE}
          </span>
        </div>

        <div className="roster__grid">
          {team.members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onUpdate={updateMember}
              onRemove={removeMember}
            />
          ))}

          {team.members.length < MAX_TEAM_SIZE && (
            <button className="roster__add-slot" onClick={addMember}>
              + Add Team Member
            </button>
          )}
        </div>
      </section>

      <FusionGallery members={team.members} />
      <SelfTargetTable members={team.members} />
      <TeamNotes notes={team.notes} onChange={setNotes} />
      <ExportImportBar team={team} onImport={replaceTeam} />
    </div>
  );
}
