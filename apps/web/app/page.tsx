import { ArrowRight, BookMarked, LibraryBig } from "lucide-react";
import Link from "next/link";
import { getAuthors, getFeaturedWorks, getTraditions, getWorks } from "@philo4all/content";
import { ContinueReading } from "../components/continue-reading";
import { WorkCard } from "../components/work-card";

export default function HomePage() {
  const works = getWorks();
  const featured = getFeaturedWorks();
  const authors = getAuthors();
  const traditions = getTraditions();

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <h1>Philosophy for everyone.</h1>
          <p>
            Read public-domain classics in a quiet, focused library built for curiosity, progress, and return visits.
          </p>
          <div className="actions">
            <Link className="button primary" href="/library">
              Open library <LibraryBig aria-hidden="true" size={18} />
            </Link>
            <Link className="button secondary" href="/saved">
              Saved passages <BookMarked aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <ContinueReading works={works} />
      </section>

      <section aria-labelledby="featured-title">
        <div className="section-row">
          <div>
            <h2 id="featured-title" className="section-title">
              Featured works
            </h2>
            <p className="muted">A gentle first shelf across ancient, Stoic, modern, and political philosophy.</p>
          </div>
          <Link className="button secondary" href="/library">
            Browse all <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="grid">
          {featured.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section aria-labelledby="browse-title">
        <div className="section-row">
          <div>
            <h2 id="browse-title" className="section-title">
              Browse by thinker and tradition
            </h2>
            <p className="muted">A catalog shape that can grow from five seed works to a real public library.</p>
          </div>
        </div>
        <div className="grid">
          <div className="panel">
            <div className="meta-line">Thinkers</div>
            <h3>{authors.length} authors</h3>
            <p className="muted">{authors.map((author) => author.name).join(", ")}</p>
          </div>
          <div className="panel">
            <div className="meta-line">Traditions</div>
            <h3>{traditions.length} paths</h3>
            <p className="muted">{traditions.join(", ")}</p>
          </div>
          <div className="panel">
            <div className="meta-line">Library</div>
            <h3>{works.length} launch seeds</h3>
            <p className="muted">Each work carries source, translator, and rights metadata for launch QA.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
