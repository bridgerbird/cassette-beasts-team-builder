export function FusionGallery({ members }) {
  const pairCount = (members.length * (members.length - 1)) / 2;

  return (
    <section className="panel">
      <h3>Team Fusions</h3>
      <p className="placeholder-note">
        {members.length < 2
          ? "Add at least 2 team members to see fusion sprites."
          : `${pairCount} fusion combo(s) will render here once fusion data is wired in.`}
      </p>
    </section>
  );
}
