import { mkdir, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

type Selection = { title: string; author: string; url: string; tradition: string };

const selections: Selection[] = [
  { title: "Apology", author: "Plato", url: "https://classics.mit.edu/Plato/apology.html", tradition: "Platonism" },
  { title: "Crito", author: "Plato", url: "https://classics.mit.edu/Plato/crito.html", tradition: "Platonism" },
  { title: "Phaedo", author: "Plato", url: "https://classics.mit.edu/Plato/phaedo.html", tradition: "Platonism" },
  { title: "Symposium", author: "Plato", url: "https://classics.mit.edu/Plato/symposium.html", tradition: "Platonism" },
  { title: "Republic", author: "Plato", url: "https://classics.mit.edu/Plato/republic.html", tradition: "Platonism" },
  { title: "Gorgias", author: "Plato", url: "https://classics.mit.edu/Plato/gorgias.html", tradition: "Platonism" },
  { title: "Meno", author: "Plato", url: "https://classics.mit.edu/Plato/meno.html", tradition: "Platonism" },
  { title: "Protagoras", author: "Plato", url: "https://classics.mit.edu/Plato/protagoras.html", tradition: "Platonism" },
  { title: "Nicomachean Ethics", author: "Aristotle", url: "https://classics.mit.edu/Aristotle/nicomachaen.html", tradition: "Aristotelianism" },
  { title: "Politics", author: "Aristotle", url: "https://classics.mit.edu/Aristotle/politics.html", tradition: "Aristotelianism" },
  { title: "Metaphysics", author: "Aristotle", url: "https://classics.mit.edu/Aristotle/metaphysics.html", tradition: "Aristotelianism" },
  { title: "Poetics", author: "Aristotle", url: "https://classics.mit.edu/Aristotle/poetics.html", tradition: "Aristotelianism" },
  { title: "On the Soul", author: "Aristotle", url: "https://classics.mit.edu/Aristotle/soul.html", tradition: "Aristotelianism" },
  { title: "Meditations", author: "Marcus Aurelius", url: "https://classics.mit.edu/Antoninus/meditations.html", tradition: "Stoicism" },
  { title: "The Enchiridion", author: "Epictetus", url: "https://classics.mit.edu/Epictetus/epicench.html", tradition: "Stoicism" }
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function htmlDecode(text: string) {
  return text.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/g, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}

type SourceChapter = { title: string; paragraphs: string[] };

function chapterHeading(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().replace(/[.:]+$/, "");
  if (!normalized || normalized.length > 100 || normalized !== normalized.toUpperCase()) return undefined;
  if (/^(THE )?(INTRODUCTION|CONCLUSION|ARGUMENT|PREFACE)$/.test(normalized)) return normalized;
  if (/^(BOOK|CHAPTER|DIALOGUE|PART)\s+(?:[IVXLCDM]+|ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|ELEVEN|TWELVE|[0-9]+)$/.test(normalized)) return normalized;
  return undefined;
}

function chaptersFromText(text: string): SourceChapter[] {
  const lines = text.replace(/\r/g, "").split("\n");
  const translation = lines.findIndex((line) => /^Translated by\b/i.test(line.trim()));
  const body = translation >= 0 ? lines.slice(translation + 1) : lines;
  const chapters: SourceChapter[] = [];
  let active: SourceChapter = { title: "Complete text", paragraphs: [] };
  let buffer: string[] = [];

  const flush = () => {
    const raw = buffer.join("\n").trim();
    buffer = [];
    if (!raw || /^[-_]{8,}$/.test(raw)) return;
    const heading = chapterHeading(raw);
    if (heading) {
      if (active.paragraphs.length) chapters.push(active);
      active = { title: heading, paragraphs: [] };
      return;
    }
    const paragraph = raw.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    if (paragraph.length > 35 && !/^C\. Stevenson, Web Atomics\.?$/i.test(paragraph)) active.paragraphs.push(paragraph);
  };

  for (const line of body) {
    if (line.trim()) buffer.push(line); else flush();
  }
  flush();
  if (active.paragraphs.length) chapters.push(active);
  return chapters.length ? chapters : [{ title: "Complete text", paragraphs: [] }];
}

async function fetchTextOnly(selection: Selection) {
  const page = await fetch(selection.url).then((response) => response.text());
  const href = page.match(/text-only version is\s*<A HREF="([^"]+)"/i)?.[1];
  if (!href) throw new Error(`MIT text-only download link missing for ${selection.title}`);
  const sourceUrl = new URL(href, selection.url).toString();
  const payload = await fetch(sourceUrl).then((response) => response.text());
  const pre = payload.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i)?.[1] ?? payload;
  const text = htmlDecode(pre)
    .replace(/^\s*Provided by The Internet Classics Archive\.[\s\S]*?\n\s*http:\/\/classics\.mit\.edu\/\/[^\n]+\n\s*/i, "")
    .replace(/\n\s*\[?End of[^\n]*\][\s\S]*$/i, "")
    .trim();
  return { text, sourceUrl };
}

async function main() {
  await rm("content-sources", { recursive: true, force: true });
  await rm("content-markdown", { recursive: true, force: true });
  await rm("content-index", { recursive: true, force: true });
  await mkdir("content-sources/mit-classics", { recursive: true });
  await mkdir("content-markdown/mit-classics", { recursive: true });
  await mkdir("content-index", { recursive: true });

  const documents: object[] = [];
  const passageRecords: object[] = [];
  for (const selection of selections) {
    const slug = slugify(`${selection.author}-${selection.title}`);
    const { text, sourceUrl } = await fetchTextOnly(selection);
    const sourcePath = `content-sources/mit-classics/${slug}.txt`;
    const markdownPath = `content-markdown/mit-classics/${slug}.md`;
    const checksum = createHash("sha256").update(text).digest("hex");
    await writeFile(sourcePath, `${text}\n`);
    const chapters = chaptersFromText(text);
    const markdown = [
      "---", `id: ${JSON.stringify(slug)}`, `title: ${JSON.stringify(selection.title)}`, `author: ${JSON.stringify(selection.author)}`,
      `tradition: ${JSON.stringify(selection.tradition)}`, "source_provider: \"MIT Internet Classics Archive\"", `source_url: ${JSON.stringify(selection.url)}`,
      `text_download_url: ${JSON.stringify(sourceUrl)}`, `source_sha256: ${JSON.stringify(checksum)}`, "passage_scheme: \"chapter.verse; a verse is one source paragraph\"", "---", "", `# ${selection.title}`, ""
    ];
    let passageCount = 0;
    chapters.forEach((chapter, chapterIndex) => {
      const chapterNumber = chapterIndex + 1;
      markdown.push(`## ${chapter.title}`, "");
      chapter.paragraphs.forEach((paragraph, paragraphIndex) => {
        const verse = paragraphIndex + 1;
        const id = `${slug}-${String(chapterNumber).padStart(3, "0")}-${String(verse).padStart(4, "0")}`;
        markdown.push(`<a id=\"${id}\"></a>`, `**${chapterNumber}.${verse}** ${paragraph}`, "");
        passageRecords.push({ id, documentId: slug, chapter: chapterNumber, verse, anchor: id, text: paragraph });
        passageCount += 1;
      });
    });
    await writeFile(markdownPath, `${markdown.join("\n").trimEnd()}\n`);
    documents.push({ id: slug, title: selection.title, author: selection.author, tradition: selection.tradition, sourcePath, sourceUrl: selection.url, markdownPath, checksum, chapterCount: chapters.length, passageCount });
  }
  await writeFile("content-index/documents.json", `${JSON.stringify(documents, null, 2)}\n`);
  await writeFile("content-index/passages.ndjson", `${passageRecords.map((record) => JSON.stringify(record)).join("\n")}\n`);
  await writeFile("content-sources/mit-classics/MANIFEST.md", `# MIT Internet Classics Archive: Curated 15\n\nA deliberately focused collection of 15 foundational Greek and Roman philosophical works. Source pages and exact text-download URLs are recorded in each Markdown file's front matter and in \`content-index/documents.json\`.\n\n${selections.map((work) => `- ${work.author}, *${work.title}* — ${work.url}`).join("\n")}\n`);
  console.log(`Built ${documents.length} curated MIT Classics works and ${passageRecords.length} passages.`);
}

main().catch((error: unknown) => { console.error(error); process.exit(1); });
