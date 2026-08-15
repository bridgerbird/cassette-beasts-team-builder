import { useState } from "react";
import { encodeTeam, decodeTeam, setTeamCodeInUrl } from "../../utils/exportImport";

export function ExportImportBar({ team, onImport }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const handleExport = () => {
    const generated = encodeTeam(team);
    setCode(generated);
    setTeamCodeInUrl(generated);
    setStatus("Team code generated below, and added to the page URL.");
  };

  const handleImport = () => {
    try {
      const decoded = decodeTeam(code.trim());
      onImport(decoded);
      setStatus("Team imported.");
    } catch (err) {
      console.error(err);
      setStatus("That code couldn't be read. Double-check it and try again.");
    }
  };

  return (
    <section className="panel export-import">
      <h3>Export / Import</h3>
      <div className="export-import__actions">
        <button onClick={handleExport}>Generate share code</button>
        <button onClick={handleImport}>Import from code</button>
      </div>
      <textarea
        className="export-import__code"
        value={code}
        placeholder="Team code appears here, or paste one in to import"
        onChange={(e) => setCode(e.target.value)}
        rows={3}
      />
      {status && <p className="placeholder-note">{status}</p>}
    </section>
  );
}
