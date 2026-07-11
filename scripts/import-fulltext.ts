import { mkdir, writeFile } from "node:fs/promises";
import type { Chapter } from "@philo4all/content";

type ImportConfig = {
  workId: string;
  url: string;
  chapterPattern?: RegExp;
  keepOnlyAfter?: RegExp;
  keepOnlyAfterOccurrence?: "first" | "last";
  stopBefore?: RegExp;
};

const configs: ImportConfig[] = [
  {
    workId: "apology",
    url: "https://www.gutenberg.org/files/1656/1656-0.txt",
    keepOnlyAfter: /^APOLOGY\./m
  },
  {
    workId: "meditations",
    url: "https://www.gutenberg.org/files/2680/2680-0.txt",
    chapterPattern: /^THE\s+(FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH|SEVENTH|EIGHTH|NINTH|TENTH|ELEVENTH|TWELFTH)\s+BOOK$/gim,
    keepOnlyAfter: /^THE\s+FIRST\s+BOOK$/m
  },
  {
    workId: "enchiridion",
    url: "https://www.gutenberg.org/files/45109/45109-0.txt",
    keepOnlyAfter: /^THE ENCHIRIDION\./m
  },
  {
    workId: "thus-spake-zarathustra",
    url: "https://www.gutenberg.org/files/1998/1998-0.txt",
    chapterPattern: /^(ZARATHUSTRA'S PROLOGUE\.|[IVXLCDM]+\.\s+[A-Z][A-Z ',;-]+\.?)$/gm,
    keepOnlyAfter: /^ZARATHUSTRA'S PROLOGUE\./m
  },
  {
    workId: "on-liberty",
    url: "https://www.gutenberg.org/files/34901/34901.txt",
    chapterPattern: /^CHAPTER\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^CHAPTER\s+I\.?$/m,
    keepOnlyAfterOccurrence: "last"
  },
  {
    workId: "republic",
    url: "https://www.gutenberg.org/files/1497/1497-0.txt",
    chapterPattern: /^\s*BOOK\s+([IVXLCDM]+)\.\s*$/gim,
    keepOnlyAfter: /^\s*BOOK\s+I\.\s*$/m,
    keepOnlyAfterOccurrence: "last"
  },
  {
    workId: "symposium",
    url: "https://www.gutenberg.org/files/1600/1600.txt",
    keepOnlyAfter: /^SYMPOSIUM$/m
  },
  {
    workId: "phaedo",
    url: "https://www.gutenberg.org/files/1658/1658.txt",
    keepOnlyAfter: /^PHAEDO$/m
  },
  {
    workId: "nicomachean-ethics",
    url: "https://www.gutenberg.org/files/8438/8438-0.txt",
    chapterPattern: /^BOOK\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^BOOK\s+I\.?$/m,
    keepOnlyAfterOccurrence: "first",
    stopBefore: /^NOTES$/m
  },
  {
    workId: "discourse-on-method",
    url: "https://www.gutenberg.org/files/59/59-0.txt",
    chapterPattern: /^PART\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^PART\s+I\.?$/m
  },
  {
    workId: "enquiry-human-understanding",
    url: "https://www.gutenberg.org/files/9662/9662.txt",
    chapterPattern: /^SECTION\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^SECTION\s+I\.?$/m
  },
  {
    workId: "essay-human-understanding",
    url: "https://www.gutenberg.org/files/10615/10615-0.txt",
    chapterPattern: /^CHAPTER\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^CHAPTER\s+I\.?$/m,
    keepOnlyAfterOccurrence: "last"
  },
  {
    workId: "ethics-spinoza",
    url: "https://www.gutenberg.org/files/3800/3800.txt",
    chapterPattern: /^(?:PART|Part)\s+([IVXLCDM]+)(?:[.:](?:\s*[A-Z][A-Z ,;'-]*)?)?\.?\s*$/gm,
    keepOnlyAfter: /^PART\s+I/m,
    keepOnlyAfterOccurrence: "first"
  },
  {
    workId: "groundwork",
    url: "https://www.gutenberg.org/files/5682/5682-0.txt",
    chapterPattern: /^\s*(PREFACE|FIRST SECTION|SECOND SECTION|THIRD SECTION)\s*$/gim,
    keepOnlyAfter: /^\s*PREFACE\s*$/m
  },
  {
    workId: "problems-of-philosophy",
    url: "https://www.gutenberg.org/files/5827/5827-0.txt",
    chapterPattern: /^CHAPTER\s+([IVXLCDM]+)\.?\s+.+$/gim,
    keepOnlyAfter: /^CHAPTER\s+I\.?/m
  },
  {
    workId: "pragmatism",
    url: "https://www.gutenberg.org/files/5116/5116.txt",
    chapterPattern: /^Lecture\s+([IVXLCDM]+)\.?$/gim,
    keepOnlyAfter: /^Lecture\s+I\.?$/m,
    keepOnlyAfterOccurrence: "last"
  },
  {
    workId: "genealogy-of-morals",
    url: "https://www.gutenberg.org/files/52319/52319-0.txt",
    chapterPattern: /^(PREFACE\.|FIRST ESSAY\..+|SECOND ESSAY\..+|THIRD ESSAY\..+)$/gim,
    keepOnlyAfter: /^PREFACE\.$/m
  }
];

const romanToNumber = new Map([
  ["I", 1],
  ["II", 2],
  ["III", 3],
  ["IV", 4],
  ["V", 5],
  ["VI", 6],
  ["VII", 7],
  ["VIII", 8],
  ["IX", 9],
  ["X", 10],
  ["XI", 11],
  ["XII", 12],
  ["XIII", 13],
  ["XIV", 14],
  ["XV", 15]
]);

const ordinalToRoman = new Map([
  ["FIRST", "I"],
  ["SECOND", "II"],
  ["THIRD", "III"],
  ["FOURTH", "IV"],
  ["FIFTH", "V"],
  ["SIXTH", "VI"],
  ["SEVENTH", "VII"],
  ["EIGHTH", "VIII"],
  ["NINTH", "IX"],
  ["TENTH", "X"],
  ["ELEVENTH", "XI"],
  ["TWELFTH", "XII"]
]);

function stripGutenbergBoilerplate(raw: string) {
  const startMatch = raw.match(/\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i);
  const endMatch = raw.match(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i);
  const started = startMatch ? raw.slice((startMatch.index ?? 0) + startMatch[0].length) : raw;
  const ended = endMatch ? started.slice(0, Math.max(0, (endMatch.index ?? raw.length) - (startMatch ? (startMatch.index ?? 0) + startMatch[0].length : 0))) : started;

  return ended
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \u00a0]+$/gm, "")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function titleFromHeading(heading: string, fallbackOrder: number) {
  const normalized = heading.replace(/\s+/g, " ").trim().replace(/\.$/, "");
  const ordinalBook = normalized.match(/^THE\s+(FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH|SEVENTH|EIGHTH|NINTH|TENTH|ELEVENTH|TWELFTH)\s+BOOK$/i);
  if (ordinalBook) {
    return `Book ${ordinalToRoman.get(ordinalBook[1]!.toUpperCase()) ?? fallbackOrder}`;
  }

  const roman = normalized.match(/^(BOOK|CHAPTER|SECTION|PART|Lecture)\s+([IVXLCDM]+)/i);
  if (roman) {
    const label = roman[1]![0]!.toUpperCase() + roman[1]!.slice(1).toLowerCase();
    return `${label} ${roman[2]!.toUpperCase()}`;
  }

  if (/^[IVXLCDM]+\./.test(normalized)) {
    return normalized.replace(/\.$/, "");
  }

  if (normalized.length > 0) {
    return normalized
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return `Part ${fallbackOrder}`;
}

function paragraphsFromText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 40)
    .filter((paragraph) => !/^Project Gutenberg/i.test(paragraph))
    .filter((paragraph) => !/^Produced by /i.test(paragraph))
    .filter((paragraph) => !/^Transcribed by /i.test(paragraph));
}

function buildSections(workId: string, chapterId: string, paragraphs: string[]) {
  const sections = [];
  const chunkSize = 10;
  for (let index = 0; index < paragraphs.length; index += chunkSize) {
    const chunk = paragraphs.slice(index, index + chunkSize);
    sections.push({
      id: `${chapterId}-section-${sections.length + 1}`,
      order: sections.length + 1,
      title: sections.length === 0 ? "Text" : undefined,
      paragraphs: chunk
    });
  }

  return sections.length > 0
    ? sections
    : [
        {
          id: `${workId}-empty-section-1`,
          order: 1,
          title: "Text",
          paragraphs: ["This work could not be imported cleanly. Re-run the full-text import and inspect the source formatting."]
        }
      ];
}

function splitByHeadings(config: ImportConfig, text: string) {
  if (!config.chapterPattern) {
    return [{ heading: "Complete Text", body: text }];
  }

  const pattern = new RegExp(config.chapterPattern.source, config.chapterPattern.flags.includes("g") ? config.chapterPattern.flags : `${config.chapterPattern.flags}g`);
  const matches = Array.from(text.matchAll(pattern)).filter((match) => typeof match.index === "number");

  if (matches.length < 2) {
    return [{ heading: "Complete Text", body: text }];
  }

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const next = matches[index + 1]?.index ?? text.length;
    return {
      heading: match[0],
      body: text.slice(start + match[0].length, next).trim()
    };
  });
}

function estimateMinutes(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

async function importWork(config: ImportConfig): Promise<Chapter[]> {
  const response = await fetch(config.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${config.url}: ${response.status}`);
  }

  let text = stripGutenbergBoilerplate(await response.text());
  if (config.keepOnlyAfter) {
    const pattern = new RegExp(config.keepOnlyAfter.source, config.keepOnlyAfter.flags.includes("g") ? config.keepOnlyAfter.flags : `${config.keepOnlyAfter.flags}g`);
    const matches = Array.from(text.matchAll(pattern));
    const match = config.keepOnlyAfterOccurrence === "last" ? matches.at(-1) : matches[0];
    if (typeof match?.index === "number") {
      text = text.slice(match.index).trim();
    }
  }
  if (config.stopBefore) {
    const match = text.match(config.stopBefore);
    if (typeof match?.index === "number") {
      text = text.slice(0, match.index).trim();
    }
  }

  return splitByHeadings(config, text)
    .map((part, index): Chapter => {
      const order = index + 1;
      const title = titleFromHeading(part.heading, order);
      const fallbackSlug = romanToNumber.has(title.split(" ").at(-1) ?? "") ? `${title.split(" ")[0]?.toLowerCase()}-${title.split(" ").at(-1)?.toLowerCase()}` : slugify(title);
      const slug = config.workId === "meditations" && /^Book [IVXLCDM]+$/.test(title) ? `book-${title.split(" ")[1]!.toLowerCase()}` : fallbackSlug;
      const chapterId = `${config.workId}-${slug}`;
      const paragraphs = paragraphsFromText(part.body);

      return {
        id: chapterId,
        slug,
        title,
        order,
        sections: buildSections(config.workId, chapterId, paragraphs),
        estimatedMinutes: estimateMinutes(paragraphs)
      };
    })
    .filter((chapter) => chapter.sections.some((section) => section.paragraphs.length > 0));
}

async function main() {
  const output: Record<string, Chapter[]> = {};

  for (const config of configs) {
    console.log(`Importing ${config.workId}...`);
    output[config.workId] = await importWork(config);
  }

  const generated = `import type { Chapter } from "../types";

// Generated by scripts/import-fulltext.ts from public-domain Project Gutenberg plain text.
// Do not edit by hand; update the importer config and rerun npm run content:import-fulltext.
export const fullTextChapters: Record<string, Chapter[]> = ${JSON.stringify(output, null, 2)};
`;

  await mkdir("packages/content/src/generated", { recursive: true });
  await writeFile("packages/content/src/generated/fulltext.ts", generated);

  for (const [workId, chapters] of Object.entries(output)) {
    const paragraphs = chapters.reduce((count, chapter) => count + chapter.sections.reduce((inner, section) => inner + section.paragraphs.length, 0), 0);
    console.log(`${workId}: ${chapters.length} chapters, ${paragraphs} paragraphs`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
