import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { getAuthorById, type Work } from "@philo4all/content";

export function WorkCard({ work }: { work: Work & { authorName?: string } }) {
  const author = getAuthorById(work.authorId);

  return (
    <article className="work-card">
      <div className="meta-line">{work.tradition}</div>
      <h3>{work.title}</h3>
      <div className="muted">{work.authorName ?? author?.name ?? "Unknown author"} · {work.era}</div>
      <p>{work.summary}</p>
      <div className="card-footer">
        <span className="muted" aria-label={`${work.readingLength} reading length`}>
          <Clock3 aria-hidden="true" size={16} /> {work.readingLength}
        </span>
        <Link className="button secondary" href={`/works/${work.slug}`}>
          Open <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}
