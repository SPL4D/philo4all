"use client";

import { Bookmark, ChevronLeft, ChevronRight, Minus, Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createBookmark,
  getNextChapter,
  getPreviousChapter,
  type Bookmark as BookmarkRecord,
  type Chapter,
  type Work
} from "@philo4all/content";
import { readBookmarks, writeBookmarks, writeProgress } from "../lib/local-state";

type ReaderProps = {
  work: Work;
  chapter: Chapter;
};

export function Reader({ work, chapter }: ReaderProps) {
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState<"cream" | "dark">("cream");
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);

  const firstSection = chapter.sections[0];
  const activeBookmark = useMemo(() => {
    if (!firstSection) {
      return undefined;
    }

    return bookmarks.find((bookmark) => bookmark.sectionId === firstSection.id);
  }, [bookmarks, firstSection]);

  useEffect(() => {
    setBookmarks(readBookmarks());
    writeProgress({
      workId: work.id,
      chapterId: chapter.id,
      sectionId: firstSection?.id,
      progressPercent: Math.round((chapter.order / work.chapters.length) * 100),
      updatedAt: new Date().toISOString()
    });
  }, [chapter.id, chapter.order, firstSection?.id, work.chapters.length, work.id]);

  const previousChapter = getPreviousChapter(work, chapter);
  const nextChapter = getNextChapter(work, chapter);

  function toggleBookmark() {
    if (!firstSection) {
      return;
    }

    const nextBookmarks = activeBookmark
      ? bookmarks.filter((bookmark) => bookmark.id !== activeBookmark.id)
      : [...bookmarks, createBookmark({ work, chapter, sectionId: firstSection.id })];

    setBookmarks(nextBookmarks);
    writeBookmarks(nextBookmarks);
  }

  return (
    <div className="reader-shell">
      <div className="reader-toolbar" aria-label="Reader controls">
        <div className="tool-group">
          <Link className="icon-button" href={`/works/${work.slug}`}>
            <ChevronLeft aria-hidden="true" size={18} />
            {work.title}
          </Link>
          <select
            className="select"
            value={chapter.slug}
            aria-label="Choose chapter"
            onChange={(event) => {
              window.location.href = `/read/${work.slug}/${event.target.value}`;
            }}
          >
            {work.chapters.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-group">
          <button className={`icon-button ${activeBookmark ? "active" : ""}`} onClick={toggleBookmark}>
            <Bookmark aria-hidden="true" size={18} />
            Bookmark
          </button>
          <button className="icon-button" onClick={() => setFontSize((size) => Math.max(16, size - 1))} aria-label="Decrease text size">
            <Minus aria-hidden="true" size={18} />
          </button>
          <button className="icon-button" onClick={() => setFontSize((size) => Math.min(26, size + 1))} aria-label="Increase text size">
            <Plus aria-hidden="true" size={18} />
          </button>
          <button className="icon-button" onClick={() => setTheme((value) => (value === "cream" ? "dark" : "cream"))}>
            <Settings2 aria-hidden="true" size={18} />
            {theme === "cream" ? "Dark" : "Cream"}
          </button>
        </div>
      </div>

      <article className={`reader-document ${theme === "dark" ? "theme-dark" : ""}`}>
        <div className="reader-kicker">{work.title}</div>
        <h1 className="reader-title">{chapter.title}</h1>
        <div
          className="reader-prose"
          style={{
            "--reader-size": `${fontSize}px`,
            "--reader-line-height": 1.85
          } as React.CSSProperties}
        >
          {chapter.sections.map((section) => (
            <section key={section.id} id={section.id}>
              {section.title ? <h2>{section.title}</h2> : null}
              {section.paragraphs.map((paragraph) => {
                const passage = paragraph.match(/^(\d+\.\d+)\s+(.+)$/);
                return (
                  <p key={paragraph}>
                    {passage ? <span className="passage-number">{passage[1]}</span> : null}
                    {passage ? passage[2] : paragraph}
                  </p>
                );
              })}
            </section>
          ))}
        </div>
      </article>

      <nav className="reader-nav" aria-label="Chapter navigation">
        {previousChapter ? (
          <Link className="button secondary" href={`/read/${work.slug}/${previousChapter.slug}`}>
            <ChevronLeft aria-hidden="true" size={18} />
            {previousChapter.title}
          </Link>
        ) : (
          <span />
        )}
        {nextChapter ? (
          <Link className="button primary" href={`/read/${work.slug}/${nextChapter.slug}`}>
            {nextChapter.title}
            <ChevronRight aria-hidden="true" size={18} />
          </Link>
        ) : (
          <Link className="button primary" href="/library">
            Back to library
            <ChevronRight aria-hidden="true" size={18} />
          </Link>
        )}
      </nav>
    </div>
  );
}
