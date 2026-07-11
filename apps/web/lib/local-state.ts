"use client";

import type { Bookmark, ReadingProgress } from "@philo4all/content";

const progressKey = "philo4all.progress";
const bookmarksKey = "philo4all.bookmarks";

export function readProgress(): ReadingProgress[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(progressKey);
  return raw ? (JSON.parse(raw) as ReadingProgress[]) : [];
}

export function writeProgress(progress: ReadingProgress) {
  const current = readProgress().filter((item) => item.workId !== progress.workId);
  window.localStorage.setItem(progressKey, JSON.stringify([...current, progress]));
}

export function readBookmarks(): Bookmark[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(bookmarksKey);
  return raw ? (JSON.parse(raw) as Bookmark[]) : [];
}

export function writeBookmarks(bookmarks: Bookmark[]) {
  window.localStorage.setItem(bookmarksKey, JSON.stringify(bookmarks));
}
