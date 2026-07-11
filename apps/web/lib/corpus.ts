import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Chapter, Tradition, Work } from "@philo4all/content";

type CorpusDocument = {
  id: string;
  title: string;
  author: string;
  sourcePath: string;
  sourceUrl?: string;
  markdownPath: string;
  checksum: string;
  chapterCount: number;
  passageCount: number;
};

export type CatalogWork = Work & { authorName: string };

// Resolve relative to this module so `next dev`, `next build`, and one-off
// import scripts all locate the workspace corpus consistently.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const indexPath = resolve(root, "content-index/documents.json");

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function traditionFor(document: CorpusDocument): Tradition {
  const value = `${document.title} ${document.sourcePath}`.toLowerCase();
  if (/stoic|epictetus|seneca|marcus aurelius/.test(value)) return "Stoicism";
  if (/plato/.test(value)) return "Platonism";
  if (/aristotle/.test(value)) return "Aristotelianism";
  if (/kant/.test(value)) return "Deontology";
  if (/hume|locke|berkeley/.test(value)) return "Empiricism";
  if (/descartes/.test(value)) return "Rationalism";
  if (/spinoza/.test(value)) return "Spinozism";
  if (/nietzsche/.test(value)) return "Existentialism";
  if (/james/.test(value)) return "Pragmatism";
  return "Ethics";
}

function readingLength(passages: number): Work["readingLength"] {
  return passages > 900 ? "Long" : passages > 250 ? "Medium" : "Short";
}

function placeholderChapter(id: string): Chapter {
  return { id: `${id}-chapter-1`, slug: "chapter-1", title: "Read work", order: 1, estimatedMinutes: 1, sections: [{ id: `${id}-chapter-1-section-1`, order: 1, paragraphs: ["Loading text…"] }] };
}

function toCatalogWork(document: CorpusDocument): CatalogWork {
  const id = slugify(`${document.author}-${document.title}`);
  return {
    id,
    slug: id,
    title: document.title,
    authorId: slugify(document.author),
    authorName: document.author,
    tradition: traditionFor(document),
    era: "Public-domain classic",
    summary: `${document.passageCount.toLocaleString()} addressable passages from the Project Gutenberg edition.`,
    readingLength: readingLength(document.passageCount),
    source: { provider: "MIT Internet Classics Archive", sourceUrl: document.sourceUrl ?? "https://classics.mit.edu/", rights: "Internet Classics Archive edition, sourced from MIT's archive.", jurisdictionNote: "Retain source attribution and confirm rights for your intended use." },
    chapters: [placeholderChapter(id)]
  };
}

function documents() {
  const rows = JSON.parse(readFileSync(indexPath, "utf8")) as CorpusDocument[];
  const seen = new Set<string>();
  return rows.filter((row) => !seen.has(row.checksum) && seen.add(row.checksum));
}

export function getCorpusWorks(): CatalogWork[] {
  return documents().map(toCatalogWork).sort((a, b) => a.title.localeCompare(b.title));
}

export function getCorpusTraditions() {
  return Array.from(new Set(getCorpusWorks().map((work) => work.tradition))).sort() as Tradition[];
}

export function getCorpusWorkBySlug(slug: string): CatalogWork | undefined {
  const document = documents().find((row) => slugify(`${row.author}-${row.title}`) === slug);
  if (!document) return undefined;
  const catalog = toCatalogWork(document);
  const lines = readFileSync(resolve(root, document.markdownPath), "utf8").split("\n");
  const chapters: Chapter[] = [];
  let title = "Chapter 1";
  let paragraphs: string[] = [];
  const append = () => {
    if (!paragraphs.length) return;
    const order = chapters.length + 1;
    const chapterId = `${catalog.id}-chapter-${order}`;
    chapters.push({ id: chapterId, slug: `chapter-${order}`, title, order, estimatedMinutes: Math.max(1, Math.ceil(paragraphs.join(" ").split(/\s+/).length / 220)), sections: [{ id: `${chapterId}-passages`, title: "Passages", order: 1, paragraphs }] });
  };
  for (const line of lines) {
    if (line.startsWith("## ")) { append(); title = line.slice(3).trim(); paragraphs = []; }
    const passage = line.match(/^\*\*(\d+\.\d+)\*\*\s+(.+)$/);
    if (passage?.[1] && passage[2]) paragraphs.push(`${passage[1]} ${passage[2]}`);
  }
  append();
  return { ...catalog, chapters: chapters.length ? chapters : [placeholderChapter(catalog.id)] };
}
