import { TYPE_PALETTES } from "../../data/types";

export function TypeBadge({ type }) {
  if (!type) return <span className="type-badge type-badge--empty">—</span>;
  const palette = TYPE_PALETTES[type];
  const bg = palette ? `#${palette[1]}` : "#666";
  const fg = palette ? `#${palette[4]}` : "#fff";
  return (
    <span className="type-badge">
      <img
        className="type-badge__icon"
        src={`/icons/types/${type}.png`}
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span className="type-badge__label" style={{ backgroundColor: bg, color: fg }}>
        {type}
      </span>
    </span>
  );
}