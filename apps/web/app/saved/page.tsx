import { SavedClient } from "./saved-client";

export default function SavedPage() {
  return (
    <div className="page-shell">
      <div className="section-row" style={{ marginTop: 0 }}>
        <div>
          <h1 className="section-title">Saved</h1>
          <p className="muted">Local demo bookmarks now; Supabase sync is ready in the schema for account mode.</p>
        </div>
      </div>
      <SavedClient />
    </div>
  );
}
