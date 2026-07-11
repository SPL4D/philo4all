import { library } from "./seed-library";
import { fullTextChapters } from "./generated/fulltext";
import type { Author, Bookmark, Chapter, Library, ReadingProgress, Tradition, Work } from "./types";

function hydrateWork(work: Work): Work {
  return {
    ...work,
    chapters: fullTextChapters[work.id] ?? work.chapters
  };
}

export function getLibrary(): Library {
  return {
    authors: library.authors,
    works: library.works.map(hydrateWork)
  };
}

export function getAuthors(): Author[] {
  return [...library.authors].sort((a, b) => a.sortName.localeCompare(b.sortName));
}

export function getWorks(): Work[] {
  return library.works.map(hydrateWork).sort((a, b) => a.title.localeCompare(b.title));
}

export function getFeaturedWorks(): Work[] {
  return library.works.filter((work) => work.featured).map(hydrateWork);
}

export function getWorkBySlug(slug: string): Work | undefined {
  const work = library.works.find((candidate) => candidate.slug === slug);
  return work ? hydrateWork(work) : undefined;
}

export function getAuthorById(authorId: string): Author | undefined {
  return library.authors.find((author) => author.id === authorId);
}

export function getChapterBySlug(work: Work, chapterSlug: string): Chapter | undefined {
  return work.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getTraditions(): Tradition[] {
  return Array.from(new Set(library.works.map((work) => work.tradition))).sort();
}

export function getNextChapter(work: Work, chapter: Chapter): Chapter | undefined {
  return work.chapters.find((candidate) => candidate.order === chapter.order + 1);
}

export function getPreviousChapter(work: Work, chapter: Chapter): Chapter | undefined {
  return work.chapters.find((candidate) => candidate.order === chapter.order - 1);
}

export function getWorkProgress(work: Work, progress?: ReadingProgress): number {
  if (!progress || progress.workId !== work.id) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(progress.progressPercent)));
}

export function buildBookmarkLabel(work: Work, chapter: Chapter, sectionId: string): string {
  const section = chapter.sections.find((candidate) => candidate.id === sectionId);
  const location = section?.title ? `${chapter.title}: ${section.title}` : chapter.title;
  return `${work.title} - ${location}`;
}

export function createBookmark(params: {
  work: Work;
  chapter: Chapter;
  sectionId: string;
  now?: Date;
}): Bookmark {
  const now = params.now ?? new Date();

  return {
    id: `${params.work.id}-${params.chapter.id}-${params.sectionId}`,
    workId: params.work.id,
    chapterId: params.chapter.id,
    sectionId: params.sectionId,
    label: buildBookmarkLabel(params.work, params.chapter, params.sectionId),
    createdAt: now.toISOString()
  };
}

export function validateLibrary(candidate: Library): string[] {
  const errors: string[] = [];
  const authorIds = new Set(candidate.authors.map((author) => author.id));
  const workSlugs = new Set<string>();

  for (const work of candidate.works) {
    if (!authorIds.has(work.authorId)) {
      errors.push(`Work "${work.title}" references missing author "${work.authorId}".`);
    }

    if (workSlugs.has(work.slug)) {
      errors.push(`Duplicate work slug "${work.slug}".`);
    }
    workSlugs.add(work.slug);

    if (!work.source.sourceUrl || !work.source.rights || !work.source.jurisdictionNote) {
      errors.push(`Work "${work.title}" is missing source rights metadata.`);
    }

    const chapterSlugs = new Set<string>();
    for (const chapter of work.chapters) {
      if (chapterSlugs.has(chapter.slug)) {
        errors.push(`Duplicate chapter slug "${chapter.slug}" in "${work.title}".`);
      }
      chapterSlugs.add(chapter.slug);

      if (chapter.sections.length === 0) {
        errors.push(`Chapter "${chapter.title}" in "${work.title}" has no sections.`);
      }
    }
  }

  return errors;
}
