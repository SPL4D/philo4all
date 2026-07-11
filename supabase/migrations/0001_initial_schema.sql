create extension if not exists "pgcrypto";

create table public.authors (
  id text primary key,
  name text not null,
  sort_name text not null,
  lifespan text,
  portrait_hint text,
  traditions text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.works (
  id text primary key,
  slug text not null unique,
  title text not null,
  author_id text not null references public.authors(id) on delete restrict,
  tradition text not null,
  era text not null,
  summary text not null,
  reading_length text not null check (reading_length in ('Short', 'Medium', 'Long')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.work_sources (
  id uuid primary key default gen_random_uuid(),
  work_id text not null unique references public.works(id) on delete cascade,
  provider text not null,
  source_url text not null,
  translator text,
  editor text,
  publication_year integer,
  rights text not null,
  jurisdiction_note text not null,
  created_at timestamptz not null default now()
);

create table public.chapters (
  id text primary key,
  work_id text not null references public.works(id) on delete cascade,
  slug text not null,
  title text not null,
  chapter_order integer not null,
  estimated_minutes integer not null default 5,
  created_at timestamptz not null default now(),
  unique (work_id, slug),
  unique (work_id, chapter_order)
);

create table public.chapter_sections (
  id text primary key,
  chapter_id text not null references public.chapters(id) on delete cascade,
  title text,
  section_order integer not null,
  paragraphs text[] not null,
  created_at timestamptz not null default now(),
  unique (chapter_id, section_order)
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  work_id text not null references public.works(id) on delete cascade,
  chapter_id text not null references public.chapters(id) on delete cascade,
  section_id text references public.chapter_sections(id) on delete set null,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, work_id)
);

create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  work_id text not null references public.works(id) on delete cascade,
  chapter_id text not null references public.chapters(id) on delete cascade,
  section_id text not null references public.chapter_sections(id) on delete cascade,
  label text not null,
  created_at timestamptz not null default now(),
  unique (user_id, section_id)
);

create table public.audio_assets (
  id uuid primary key default gen_random_uuid(),
  work_id text not null references public.works(id) on delete cascade,
  chapter_id text references public.chapters(id) on delete cascade,
  provider text,
  voice_name text,
  status text not null default 'planned' check (status in ('planned', 'generating', 'ready', 'failed')),
  storage_path text,
  created_at timestamptz not null default now()
);

create index works_author_id_idx on public.works(author_id);
create index works_tradition_idx on public.works(tradition);
create index work_sources_work_id_idx on public.work_sources(work_id);
create index chapters_work_id_idx on public.chapters(work_id);
create index chapter_sections_chapter_id_idx on public.chapter_sections(chapter_id);
create index reading_progress_user_id_idx on public.reading_progress(user_id);
create index reading_progress_work_id_idx on public.reading_progress(work_id);
create index bookmarks_user_id_idx on public.bookmarks(user_id);
create index bookmarks_work_id_idx on public.bookmarks(work_id);
create index audio_assets_work_id_idx on public.audio_assets(work_id);

alter table public.authors enable row level security;
alter table public.works enable row level security;
alter table public.work_sources enable row level security;
alter table public.chapters enable row level security;
alter table public.chapter_sections enable row level security;
alter table public.profiles enable row level security;
alter table public.reading_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.audio_assets enable row level security;

create policy "Public authors are readable" on public.authors for select using (true);
create policy "Public works are readable" on public.works for select using (true);
create policy "Public work sources are readable" on public.work_sources for select using (true);
create policy "Public chapters are readable" on public.chapters for select using (true);
create policy "Public chapter sections are readable" on public.chapter_sections for select using (true);
create policy "Ready audio assets are readable" on public.audio_assets for select using (status = 'ready');

create policy "Users can read their own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Users can insert their own profile" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "Users manage own reading progress" on public.reading_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage own bookmarks" on public.bookmarks
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
