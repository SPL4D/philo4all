# Content Import Pipeline

V1 keeps the canonical launch catalog in `packages/content/src/seed-library.ts`.

Use:

```bash
npm run content:validate
npm run content:export-sql > supabase/seed.sql
```

Recommended launch workflow:

1. Pick a candidate work from Project Gutenberg, Standard Ebooks, or Wikisource.
2. Verify source, translator/editor, publication year, and jurisdiction notes.
3. Normalize the work into author, work, chapter, and section records.
4. Run validation.
5. Export seed SQL and apply it after the Supabase migration.
6. Complete `docs/content-qa.md` before launch promotion.

The next content goal should replace the hand-normalized seed file with EPUB/HTML/plain-text adapters while preserving the same TypeScript shape.
