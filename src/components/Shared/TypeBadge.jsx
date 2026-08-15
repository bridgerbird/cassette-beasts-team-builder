import { TYPE_PALETTES } from "../../data/types";

export function TypeBadge({ type }) {
  if (!type) return <span className="type-badge type-badge--empty">—</span>;
  const palette = TYPE_PALETTES[type];
  const bg = palette ? `#${palette[1]}` : "#666";
  const fg = palette ? `#${palette[4]}` : "#fff";
  return (
    <span className="type-badge" style={{ backgroundColor: bg, color: fg }}>
      {type}
    </span>
  );
}
