export function TeamNotes({ notes, onChange }) {
  return (
    <section className="panel">
      <h3>Extra Notes</h3>
      <textarea
        className="team-notes"
        value={notes}
        placeholder="Strategies, combo ideas, matchup plans..."
        onChange={(e) => onChange(e.target.value)}
        rows={5}
      />
    </section>
  );
}
