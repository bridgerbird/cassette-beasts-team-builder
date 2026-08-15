import { useMemo, useState } from "react";
import { useSpeciesData } from "../../data/useSpeciesData";
import { TypeBadge } from "../Shared/TypeBadge";

function formatNumber(bestiaryIndex) {
  if (bestiaryIndex === undefined || bestiaryIndex === null || bestiaryIndex < 0) return "—";
  return `#${String(bestiaryIndex).padStart(3, "0")}`;
}

// Column definitions: key (used in sort state), label, and an accessor
// that pulls the sortable value off a species entry.
const COLUMNS = [
  { key: "name", label: "Species", accessor: (s) => s.name },
  { key: "number", label: "Number", accessor: (s) => s.bestiary_index },
  { key: "elemental_type", label: "Type", accessor: (s) => s.elemental_type },
  { key: "max_hp", label: "HP", accessor: (s) => s.stats.max_hp },
  { key: "melee_attack", label: "M Atk", accessor: (s) => s.stats.melee_attack },
  { key: "melee_defense", label: "M Def", accessor: (s) => s.stats.melee_defense },
  { key: "ranged_attack", label: "R Atk", accessor: (s) => s.stats.ranged_attack },
  { key: "ranged_defense", label: "R Def", accessor: (s) => s.stats.ranged_defense },
  { key: "speed", label: "Speed", accessor: (s) => s.stats.speed },
  { key: "evolves_from", label: "Remasters From", accessor: (s) => s.evolves_from.join(", ") },
];

export function DexBrowser() {
  const { species, allTypes } = useSpeciesData();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState({ key: "number", direction: "asc" });

  const handleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: "asc" }; // third click: back to "none"
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // "none" state falls back to the original default: Number ascending.
    const effectiveKey = sort.key ?? "number";
    const effectiveDirection = sort.key ? sort.direction : "asc";
    const column = COLUMNS.find((c) => c.key === effectiveKey);
    const dir = effectiveDirection === "asc" ? 1 : -1;

    return species
      .filter((s) => {
        const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
        const matchesType = !typeFilter || s.elemental_type === typeFilter;
        return matchesQuery && matchesType;
      })
      .slice()
      .sort((a, b) => {
        // "Number" is special: unnumbered/secret forms (-1 or missing)
        // always sort to the bottom regardless of sort direction, since
        // they don't have a real rank to reverse.
        if (effectiveKey === "number") {
          const aIdx = a.bestiary_index ?? -1;
          const bIdx = b.bestiary_index ?? -1;
          const aUnranked = aIdx < 0;
          const bUnranked = bIdx < 0;
          if (aUnranked !== bUnranked) return aUnranked ? 1 : -1;
          if (aUnranked && bUnranked) return 0;
          return (aIdx - bIdx) * dir;
        }

        const aVal = column.accessor(a);
        const bVal = column.accessor(b);
        if (typeof aVal === "string") return aVal.localeCompare(bVal) * dir;
        return (aVal - bVal) * dir;
      });
  }, [species, query, typeFilter, sort]);

  return (
    <section className="panel">
      <h2>Dex Browser</h2>
      <p className="placeholder-note">
        Use the 'Types' filter on the right of the search bar to show only a specific type.
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

      <div className="dex-table-wrap">
        <table className="dex-table">
          <thead>
            <tr>
              <th className="dex-table__sprite-col"></th>
              {COLUMNS.map((col) => (
                <th key={col.key}>
                  <button
                    className="dex-table__sort-button"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <span className="dex-table__sort-arrow">
                      {sort.key === col.key ? (sort.direction === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.name}>
                <td className="dex-table__sprite-col">
                  <img
                    className="dex-sprite"
                    src={`/sprites/${s.name}.png`}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="dex-sprite-placeholder" style={{ display: "none" }} aria-hidden="true" />
                </td>
                <td>
                  <strong>{s.name}</strong>
                  <div className="placeholder-note">{s.description}</div>
                </td>
                <td>{formatNumber(s.bestiary_index)}</td>
                <td><TypeBadge type={s.elemental_type} /></td>
                <td>{s.stats.max_hp}</td>
                <td>{s.stats.melee_attack}</td>
                <td>{s.stats.melee_defense}</td>
                <td>{s.stats.ranged_attack}</td>
                <td>{s.stats.ranged_defense}</td>
                <td>{s.stats.speed}</td>
                <td className="dex-table__remasters">{s.evolves_from.length > 0 ? s.evolves_from.join(", ") : "—"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="placeholder-note">No forms match that search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}