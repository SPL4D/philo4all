"use client";

import { ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWorks, type Bookmark } from "@philo4all/content";
import { readBookmarks, writeBookmarks } from "../../lib/local-state";

export function SavedClient() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(readBookmarks());
  }, []);

  function removeBookmark(id: string) {
    const nextBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(nextBookmarks);
    writeBookmarks(nextBookmarks);
  }

  if (bookmarks.length === 0) {
    return (
      <div className="panel">
        <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>No saved passages yet</h2>
        <p className="muted">Open a chapter and tap Bookmark to save your place.</p>
        <Link className="button primary" href="/library">
          Open library <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="saved-list">
      {bookmarks.map((bookmark) => {
        const work = getWorks().find((candidate) => candidate.id === bookmark.workId);
        const chapter = work?.chapters.find((candidate) => candidate.id === bookmark.chapterId);
        const href = work && chapter ? `/read/${work.slug}/${chapter.slug}#${bookmark.sectionId}` : "/library";

        return (
          <article className="chapter-row" key={bookmark.id}>
            <Link href={href}>
              <strong>{bookmark.label}</strong>
              <br />
              <span className="muted">{new Date(bookmark.createdAt).toLocaleDateString()}</span>
            </Link>
            <button className="icon-button" onClick={() => removeBookmark(bookmark.id)} aria-label={`Remove ${bookmark.label}`}>
              <Trash2 aria-hidden="true" size={18} />
            </button>
          </article>
        );
      })}
    </div>
  );
}
