import { getCorpusTraditions, getCorpusWorks } from "../../lib/corpus";
import { LibraryFilter } from "../../components/library-filter";

export default function LibraryPage() {
  return (
    <div className="page-shell">
      <div className="section-row" style={{ marginTop: 0 }}>
        <div>
          <h1 className="section-title">Library</h1>
          <p className="muted">Search public-domain philosophy by work, thinker, tradition, and reading length.</p>
        </div>
      </div>
      <LibraryFilter works={getCorpusWorks()} traditions={getCorpusTraditions()} />
    </div>
  );
}
