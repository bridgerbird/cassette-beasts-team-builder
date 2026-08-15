export function FusionGallery({ members }) {
  const withSpecies = members.filter((m) => m.speciesName);
  const pairCount = (withSpecies.length * (withSpecies.length - 1)) / 2;

  return (
    <section className="panel">
      <h3>Team Fusions</h3>
      <p className="placeholder-note">
        {withSpecies.length < 2
          ? "Add at least 2 team members with a species chosen to see fusion combos."
          : `${pairCount} fusion combo(s) on this team. Fusion result names/sprites need a fusion-mapping ` +
            "dataset the wiki's Data: namespace doesn't expose directly -- next data source to track down."}
      </p>
    </section>
  );
}
