import { getLibrary } from "@philo4all/content";

function sqlString(value: string | undefined) {
  if (value === undefined) {
    return "null";
  }

  return `'${value.replaceAll("'", "''")}'`;
}

function sqlArray(values: string[]) {
  return `array[${values.map(sqlString).join(", ")}]`;
}

const library = getLibrary();
const statements: string[] = [];

for (const author of library.authors) {
  statements.push(
    `insert into public.authors (id, name, sort_name, lifespan, portrait_hint, traditions) values (${sqlString(author.id)}, ${sqlString(author.name)}, ${sqlString(author.sortName)}, ${sqlString(author.lifespan)}, ${sqlString(author.portraitHint)}, ${sqlArray(author.traditions)}) on conflict (id) do update set name = excluded.name, sort_name = excluded.sort_name, lifespan = excluded.lifespan, portrait_hint = excluded.portrait_hint, traditions = excluded.traditions;`
  );
}

for (const work of library.works) {
  statements.push(
    `insert into public.works (id, slug, title, author_id, tradition, era, summary, reading_length, featured) values (${sqlString(work.id)}, ${sqlString(work.slug)}, ${sqlString(work.title)}, ${sqlString(work.authorId)}, ${sqlString(work.tradition)}, ${sqlString(work.era)}, ${sqlString(work.summary)}, ${sqlString(work.readingLength)}, ${work.featured ? "true" : "false"}) on conflict (id) do update set slug = excluded.slug, title = excluded.title, author_id = excluded.author_id, tradition = excluded.tradition, era = excluded.era, summary = excluded.summary, reading_length = excluded.reading_length, featured = excluded.featured;`
  );
  statements.push(
    `insert into public.work_sources (work_id, provider, source_url, translator, editor, publication_year, rights, jurisdiction_note) values (${sqlString(work.id)}, ${sqlString(work.source.provider)}, ${sqlString(work.source.sourceUrl)}, ${sqlString(work.source.translator)}, ${sqlString(work.source.editor)}, ${work.source.publicationYear ?? "null"}, ${sqlString(work.source.rights)}, ${sqlString(work.source.jurisdictionNote)}) on conflict (work_id) do update set provider = excluded.provider, source_url = excluded.source_url, translator = excluded.translator, editor = excluded.editor, publication_year = excluded.publication_year, rights = excluded.rights, jurisdiction_note = excluded.jurisdiction_note;`
  );

  for (const chapter of work.chapters) {
    statements.push(
      `insert into public.chapters (id, work_id, slug, title, chapter_order, estimated_minutes) values (${sqlString(chapter.id)}, ${sqlString(work.id)}, ${sqlString(chapter.slug)}, ${sqlString(chapter.title)}, ${chapter.order}, ${chapter.estimatedMinutes}) on conflict (id) do update set work_id = excluded.work_id, slug = excluded.slug, title = excluded.title, chapter_order = excluded.chapter_order, estimated_minutes = excluded.estimated_minutes;`
    );

    for (const section of chapter.sections) {
      statements.push(
        `insert into public.chapter_sections (id, chapter_id, title, section_order, paragraphs) values (${sqlString(section.id)}, ${sqlString(chapter.id)}, ${sqlString(section.title)}, ${section.order}, ${sqlArray(section.paragraphs)}) on conflict (id) do update set chapter_id = excluded.chapter_id, title = excluded.title, section_order = excluded.section_order, paragraphs = excluded.paragraphs;`
      );
    }
  }
}

console.log(statements.join("\n"));
