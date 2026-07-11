export type Tradition =
  | "Platonism"
  | "Stoicism"
  | "Ancient Greek"
  | "Aristotelianism"
  | "Rationalism"
  | "Empiricism"
  | "Spinozism"
  | "Deontology"
  | "Analytic Philosophy"
  | "Pragmatism"
  | "Existentialism"
  | "Enlightenment"
  | "Ethics";

export type SourceProvider = "Project Gutenberg" | "MIT Internet Classics Archive" | "Standard Ebooks" | "Wikisource" | "Manual Public-Domain Source";

export type Author = {
  id: string;
  name: string;
  sortName: string;
  lifespan: string;
  traditions: Tradition[];
  portraitHint: string;
};

export type WorkSource = {
  provider: SourceProvider;
  sourceUrl: string;
  translator?: string;
  editor?: string;
  publicationYear?: number;
  rights: string;
  jurisdictionNote: string;
};

export type ChapterSection = {
  id: string;
  title?: string;
  order: number;
  paragraphs: string[];
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  order: number;
  sections: ChapterSection[];
  estimatedMinutes: number;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  authorId: string;
  tradition: Tradition;
  era: string;
  summary: string;
  readingLength: "Short" | "Medium" | "Long";
  source: WorkSource;
  chapters: Chapter[];
  featured?: boolean;
};

export type Library = {
  authors: Author[];
  works: Work[];
};

export type ReadingProgress = {
  workId: string;
  chapterId: string;
  sectionId?: string;
  progressPercent: number;
  updatedAt: string;
};

export type Bookmark = {
  id: string;
  workId: string;
  chapterId: string;
  sectionId: string;
  label: string;
  createdAt: string;
};
