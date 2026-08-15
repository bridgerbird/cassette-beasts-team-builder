import { useMemo, useState } from "react";
import { useSpeciesData } from "../../data/useSpeciesData";
import { TypeBadge } from "../Shared/TypeBadge";

export function DexBrowser() {
  const { species, allTypes } = useSpeciesData();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return species.filter((s) => {
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const matchesType = !typeFilter || s.elemental_type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [species, query, typeFilter]);

  return (
    <section className="panel">
      <h2>Dex Browser</h2>
      <p className="placeholder-note">
        Showing the bundled sample dataset ({species.length} forms). Run{" "}
        <code>npm run fetch-data</code> to pull the full ~390-form dex from the wiki.
      </p>

      <div className="dex-filters">
        <input
          type="text"
          placeholder="Search name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All types</option>
          {allTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="dex-grid">
        {filtered.map((s) => (
          <div className="dex-card" key={s.name}>
            <div className="dex-card__header">
              <strong>{s.name}</strong>
              <TypeBadge type={s.elemental_type} />
            </div>
            <p className="placeholder-note">{s.description}</p>
            <div className="dex-card__stats">
              <span>HP {s.stats.max_hp}</span>
              <span>MeleeAtk {s.stats.melee_attack}</span>
              <span>RangedAtk {s.stats.ranged_attack}</span>
              <span>Spd {s.stats.speed}</span>
              <span>Slots {s.stats.move_slots}</span>
            </div>
            {(s.evolves_from.length > 0 || s.evolves_to.length > 0) && (
              <p className="placeholder-note dex-card__evo">
                {s.evolves_from.length > 0 && <>Evolves from {s.evolves_from.join(", ")}. </>}
                {s.evolves_to.length > 0 && <>Evolves to {s.evolves_to.map((e) => e.evolved_form).join(", ")}.</>}
              </p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="placeholder-note">No forms match that search.</p>
        )}
      </div>
    </section>
  );
}
