import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCorpusWorkBySlug } from "../../../lib/corpus";

export function generateStaticParams() {
  return [];
}

export default function WorkPage({ params }: { params: { workSlug: string } }) {
  const work = getCorpusWorkBySlug(params.workSlug);

  if (!work) {
    notFound();
  }

  const firstChapter = work.chapters[0];

  return (
    <div className="page-shell">
      <section className="work-hero">
        <div>
          <div className="meta-line">{work.tradition} · {work.era}</div>
          <h1 className="work-title">{work.title}</h1>
          <p className="muted" style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
            {work.summary}
          </p>
          <p className="muted">By {work.authorName} · {work.readingLength} read</p>
          {firstChapter ? (
            <div className="actions">
              <Link className="button primary" href={`/read/${work.slug}/${firstChapter.slug}`}>
                Start reading <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="button secondary" href="/library">
                Back to library
              </Link>
            </div>
          ) : null}
        </div>
        <aside className="panel" aria-label="Source metadata">
          <div className="meta-line">Source</div>
          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>{work.source.provider}</h2>
          <p className="muted">{work.source.rights}</p>
          <p className="muted">{work.source.jurisdictionNote}</p>
          {work.source.translator ? <p className="muted">Translator: {work.source.translator}</p> : null}
          <a className="button secondary" href={work.source.sourceUrl} target="_blank" rel="noreferrer">
            View source <ExternalLink aria-hidden="true" size={17} />
          </a>
        </aside>
      </section>

      <section aria-labelledby="chapters-title">
        <div className="section-row">
          <div>
            <h2 id="chapters-title" className="section-title">
              Chapters
            </h2>
            <p className="muted">Structured for quick navigation and saved progress.</p>
          </div>
        </div>
        <div className="chapter-list">
          {work.chapters.map((chapter) => (
            <Link className="chapter-row" key={chapter.id} href={`/read/${work.slug}/${chapter.slug}`}>
              <span>
                <strong>{chapter.title}</strong>
                <br />
                <span className="muted">{chapter.estimatedMinutes} min · {chapter.sections.length} sections</span>
              </span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
