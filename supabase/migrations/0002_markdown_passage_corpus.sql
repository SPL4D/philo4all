-- Import `content-index/documents.json` into text_documents and
-- `content-index/passages.ndjson` into text_passages. A passage is one source
-- paragraph, giving stable Bible-style chapter.verse addresses and deep links.

create table public.text_documents (
  id text primary key,
  title text not null,
  author text not null,
  source_provider text not null,
  source_url text,
  source_path text not null unique,
  markdown_path text not null unique,
  source_sha256 text not null,
  created_at timestamptz not null default now()
);

create table public.text_passages (
  id text primary key,
  document_id text not null references public.text_documents(id) on delete cascade,
  chapter_number integer not null check (chapter_number > 0),
  verse_number integer not null check (verse_number > 0),
  anchor text not null unique,
  body text not null,
  created_at timestamptz not null default now(),
  unique (document_id, chapter_number, verse_number)
);

create index text_passages_document_location_idx
  on public.text_passages (document_id, chapter_number, verse_number);

create index text_passages_search_idx
  on public.text_passages using gin (to_tsvector('english', body));

alter table public.text_documents enable row level security;
alter table public.text_passages enable row level security;

create policy "Public text documents are readable" on public.text_documents
  for select using (true);

create policy "Public text passages are readable" on public.text_passages
  for select using (true);
