export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <nav className="tabs" role="tablist" aria-label="Planner sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`tab-button${activeTab === tab.id ? " tab-button--active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
