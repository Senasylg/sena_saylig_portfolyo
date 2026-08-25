-- =====================================================================
--  Sena Şaylıg — Portfolyo veritabanı şeması
--
--  Supabase → SQL Editor → New query → bu dosyanın TAMAMINI yapıştır → Run
--  Ayrıntılı kurulum: docs/SUPABASE_SETUP.md
--
--  Güvenlik notu: yetkilendirme burada, veritabanı seviyesinde yapılır.
--  Frontend'deki rota koruması yalnızca kullanıcı deneyimi içindir; bu
--  politikalar sayesinde anonim bir istemci taslak projeleri okuyamaz ve
--  hiçbir şey yazamaz — API'yi doğrudan çağırsa bile.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) admins — kimin yönetici olduğunu belirleyen tek kaynak
-- ---------------------------------------------------------------------
create table if not exists public.admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Yardımcı fonksiyon: çağıran kullanıcı admin mi?
-- security definer + admins üzerinde RLS olması nedeniyle politika içinde
-- doğrudan sorgu yerine bu fonksiyon kullanılır (sonsuz döngüyü önler).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins can read admin list" on public.admins;
create policy "admins can read admin list"
    on public.admins for select
    using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- 2) projects
-- ---------------------------------------------------------------------
create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    category text not null default 'software',
    cover_image text,
    cover_path text,
    gallery jsonb not null default '[]'::jsonb,
    technologies text[] not null default '{}',
    github_url text,
    demo_url text,
    docs_url text,
    featured boolean not null default false,
    status text not null default 'draft' check (status in ('draft', 'published')),
    sort_order integer not null default 0,
    project_date date,
    content jsonb not null default '{"tr":{},"en":{}}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists projects_status_order_idx
    on public.projects (status, sort_order);
create index if not exists projects_slug_idx
    on public.projects (slug);

alter table public.projects enable row level security;

-- Herkes YALNIZCA yayınlanmış projeleri okuyabilir.
drop policy if exists "public reads published projects" on public.projects;
create policy "public reads published projects"
    on public.projects for select
    using (status = 'published');

-- Admin her şeyi okur/yazar/siler.
drop policy if exists "admin full access to projects" on public.projects;
create policy "admin full access to projects"
    on public.projects for all
    using (public.is_admin())
    with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 3) messages — iletişim formu
-- ---------------------------------------------------------------------
create table if not exists public.messages (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 120),
    email text not null check (char_length(email) between 3 and 200),
    message text not null check (char_length(message) between 10 and 4000),
    read boolean not null default false,
    created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Herkes mesaj GÖNDEREBİLİR ama gelen kutusunu OKUYAMAZ.
drop policy if exists "anyone can send a message" on public.messages;
create policy "anyone can send a message"
    on public.messages for insert
    with check (true);

drop policy if exists "admin reads messages" on public.messages;
create policy "admin reads messages"
    on public.messages for select
    using (public.is_admin());

drop policy if exists "admin updates messages" on public.messages;
create policy "admin updates messages"
    on public.messages for update
    using (public.is_admin())
    with check (public.is_admin());

drop policy if exists "admin deletes messages" on public.messages;
create policy "admin deletes messages"
    on public.messages for delete
    using (public.is_admin());

-- ---------------------------------------------------------------------
-- 4) Storage — proje görselleri
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'project-images',
    'project-images',
    true,
    5242880, -- 5 MB
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Görseller herkese açık okunur (sitede gösterilecekler).
drop policy if exists "public reads project images" on storage.objects;
create policy "public reads project images"
    on storage.objects for select
    using (bucket_id = 'project-images');

-- Yükleme / değiştirme / silme yalnızca admin.
drop policy if exists "admin uploads project images" on storage.objects;
create policy "admin uploads project images"
    on storage.objects for insert
    with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admin updates project images" on storage.objects;
create policy "admin updates project images"
    on storage.objects for update
    using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admin deletes project images" on storage.objects;
create policy "admin deletes project images"
    on storage.objects for delete
    using (bucket_id = 'project-images' and public.is_admin());

-- ---------------------------------------------------------------------
-- 5) Proje başlangıç verisi
--
--    Projeler ayrı bir dosyada: supabase/seed.sql
--    Bu dosyayı çalıştırdıktan SONRA onu da çalıştır.
--    seed.sql, src/data/seedProjects.js içinden üretilir:
--        node supabase/generate-seed.mjs
-- ---------------------------------------------------------------------

-- =====================================================================
--  SON ADIM (bunu kendin yapacaksın):
--
--  1. Authentication → Users → "Add user" ile kendine bir hesap oluştur.
--  2. Authentication → Providers → Email → "Allow new users to sign up"
--     seçeneğini KAPAT (başkası kayıt olamasın).
--  3. Aşağıdaki satırı kendi e-postanla çalıştır:
--
--     insert into public.admins (user_id)
--     select id from auth.users where email = 'senasaylig@gmail.com'
--     on conflict do nothing;
--
--  Bu satırı çalıştırmadan giriş yapsan bile panel sana 404 gösterir ve
--  veritabanı hiçbir yazma işlemine izin vermez.
-- =====================================================================
