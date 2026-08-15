import { useState } from "react";
import { Tabs } from "./components/Shared/Tabs";
import { DexBrowser } from "./components/Dex/DexBrowser";
import { TeamBuilder } from "./components/TeamBuilder/TeamBuilder";
import { LoadoutPlanner } from "./components/Loadouts/LoadoutPlanner";
import { FusionExplorer } from "./components/Fusion/FusionExplorer";

const TABS = [
  { id: "dex", label: "Dex", Component: DexBrowser },
  { id: "team", label: "Team Builder", Component: TeamBuilder },
  { id: "loadouts", label: "Loadouts", Component: LoadoutPlanner },
  { id: "fusion", label: "Fusion Explorer", Component: FusionExplorer },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("team");
  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.Component;

  return (
    <div className="app">
      <header className="app__header">
        <h1>Cassette Beasts Team Builder</h1>
      </header>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <main className="app__main">
        <ActiveComponent />
      </main>
    </div>
  );
}
