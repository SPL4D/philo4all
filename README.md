# Philo4All

Philo4All is a nonprofit-style philosophy reader for public-domain classics. This V1 scaffold ships a Next.js web reader, an Expo mobile app shell, shared content/types, a Supabase-ready schema, and a curated seed library.

## Quick Start

```bash
npm install
npm run content:validate
npm run dev
```

The web app runs from `apps/web`. The mobile app lives in `apps/mobile` and can be started with:

```bash
npm run start -w apps/mobile
```

## Current V1 Scope

- Public library browsing
- Work detail pages
- Reader with chapter navigation, bookmarks, progress, and typography controls
- Local-first demo state, ready to wire to Supabase auth/session data
- Supabase schema and RLS policies in `supabase/migrations`
- Content import/validation pipeline for curated public-domain works

## Content Note

Seed works include short public-domain sample chapters and full source metadata. Before launch, each work should go through the content QA checklist in `docs/content-qa.md`.
