// For every ordered pair of teammates (A, B), this will surface every
// move-type A has access to that lands a BUFF (per the chemistry/type
// chart) when used on B's type -- i.e. deliberate "friendly fire" buffs,
// like an Air ally getting an Air Wall buff from a Fire-type ally attack.

export function SelfTargetTable({ members }) {
  return (
    <section className="panel">
      <h3>Self Target Possibilities</h3>
      <p className="placeholder-note">
        {members.length < 2
          ? "Add at least 2 team members to see self-buff combinations."
          : "Buff combinations between teammates will be computed here once the type chart and move data are wired in."}
      </p>
    </section>
  );
}
