"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getChapterBySlug, type ReadingProgress, type Work } from "@philo4all/content";
import { readProgress } from "../lib/local-state";

export function ContinueReading({ works }: { works: Work[] }) {
  const [progress, setProgress] = useState<ReadingProgress[]>([]);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const latest = useMemo(() => {
    return [...progress].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  }, [progress]);

  const work = latest ? works.find((candidate) => candidate.id === latest.workId) : works[0];
  const chapter = work
    ? work.chapters.find((candidate) => candidate.id === latest?.chapterId) ?? work.chapters[0]
    : undefined;

  if (!work || !chapter) {
    return null;
  }

  const href = `/read/${work.slug}/${chapter.slug}`;

  return (
    <section className="reader-card" aria-labelledby="continue-title">
      <div className="reader-card-head">
        <div>
          <div className="meta-line">{latest ? "Continue reading" : "Start reading"}</div>
          <div id="continue-title" className="reader-card-title">
            {work.title}
          </div>
        </div>
        <Link className="button primary" href={href}>
          {latest ? "Resume" : "Begin"} <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
      <p className="muted">{chapter.title}</p>
      <div className="progress-bar" aria-label={`${latest?.progressPercent ?? 0}% complete`}>
        <span style={{ width: `${latest?.progressPercent ?? 0}%` }} />
      </div>
    </section>
  );
}
