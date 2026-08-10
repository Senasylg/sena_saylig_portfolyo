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
-- 5) Mevcut 6 projenin başlangıç verisi
--
--    NOT: cover_image alanları boş bırakıldı. Görseller şu an uygulama
--    paketinin içinde (src/assets/projects/). Admin panelinden kapak
--    yüklediğinde Storage URL'si buraya yazılır ve o kullanılır.
--
--    problem / solution / methodology / results / challenges /
--    future_improvements alanları BİLEREK boş: bu bilgiler elde yok,
--    uydurulmadı. Admin panelinden doldurulabilir.
-- ---------------------------------------------------------------------
insert into public.projects (slug, category, technologies, featured, status, sort_order, content)
values
(
    'stok-takip-sistemi', 'software',
    array['C#', 'MS SQL Server', 'Qt Designer', 'PyQt5', 'SQLite'],
    true, 'published', 1,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Stok Takip Sistemi',
            'description', 'TechDepot teknoloji mağazasının stok yönetimini optimize etmek için geliştirdiğim bu sistem, iki versiyon halinde uygulanmıştır. İlk versiyon C# Windows Forms ve MS SQL Server, ikinci versiyon ise PyQt5, Qt Designer ve SQLite kullanılarak geliştirilmiştir. Sistem; ürün yönetimi, stok takip, satış, müşteri ve personel yönetimi, raporlama ve analiz modüllerini içermektedir.',
            'overview', 'TechDepot teknoloji mağazasının stok yönetimini optimize etmek için geliştirdiğim bu sistem, iki versiyon halinde uygulanmıştır. İlk versiyon C# Windows Forms ve MS SQL Server, ikinci versiyon ise PyQt5, Qt Designer ve SQLite kullanılarak geliştirilmiştir. Sistem; ürün yönetimi, stok takip, satış, müşteri ve personel yönetimi, raporlama ve analiz modüllerini içermektedir.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Inventory Tracking System',
            'description', 'Built to optimise inventory management for the TechDepot technology store, this system was implemented in two versions. The first uses C# Windows Forms with MS SQL Server; the second was developed with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, plus reporting and analytics modules.',
            'overview', 'Built to optimise inventory management for the TechDepot technology store, this system was implemented in two versions. The first uses C# Windows Forms with MS SQL Server; the second was developed with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, plus reporting and analytics modules.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
),
(
    'kavsak-trafik-simulasyonu', 'simulation',
    array['Arena Rockwell Simulation', 'Minitab', 'Excel'],
    true, 'published', 2,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Kavşak Sinyalize Trafik Işığı Simülasyonu',
            'description', 'Balıkesir Yeniçayırhisar kavşağı için çalıştığım projede, trafik akışını iyileştirmek amacıyla sinyalize trafik ışığı sistemi modellemesi ve simülasyonu yaptım. Gerçek verilerle araç yoğunluğunu ve bekleme sürelerini analiz ederek, farklı ışıklandırma senaryolarının etkilerini değerlendirdim.',
            'overview', 'Balıkesir Yeniçayırhisar kavşağı için çalıştığım projede, trafik akışını iyileştirmek amacıyla sinyalize trafik ışığı sistemi modellemesi ve simülasyonu yaptım. Gerçek verilerle araç yoğunluğunu ve bekleme sürelerini analiz ederek, farklı ışıklandırma senaryolarının etkilerini değerlendirdim.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Signalised Junction Traffic Simulation',
            'description', 'For the Balıkesir Yeniçayırhisar junction, I modelled and simulated a signalised traffic light system to improve traffic flow. Using real data, I analysed vehicle density and waiting times, and evaluated the impact of different signal timing scenarios.',
            'overview', 'For the Balıkesir Yeniçayırhisar junction, I modelled and simulated a signalised traffic light system to improve traffic flow. Using real data, I analysed vehicle density and waiting times, and evaluated the impact of different signal timing scenarios.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
),
(
    'fizikadiyet-web-sitesi', 'web',
    array['HTML', 'CSS', 'JavaScript', 'React', 'Figma'],
    true, 'published', 3,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Web Site Tasarımı',
            'description', 'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için modern, kullanıcı deneyimi odaklı kurumsal web sitesi geliştirdim. Performans ve SEO uyumuna öncelik verilerek hazırlanan bu tasarım, marka kimliğini dijital ortamda etkili şekilde yansıtmayı amaçlamaktadır.',
            'overview', 'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için modern, kullanıcı deneyimi odaklı kurumsal web sitesi geliştirdim. Performans ve SEO uyumuna öncelik verilerek hazırlanan bu tasarım, marka kimliğini dijital ortamda etkili şekilde yansıtmayı amaçlamaktadır.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Corporate Website Design',
            'description', 'I developed a modern, experience-focused corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. Built with performance and SEO in mind, the design aims to carry the brand identity effectively into the digital space.',
            'overview', 'I developed a modern, experience-focused corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. Built with performance and SEO in mind, the design aims to carry the brand identity effectively into the digital space.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
),
(
    'elma-ambalaj-hatti-tasarimi', 'design',
    array['SOLIDWORKS'],
    false, 'published', 4,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Elma Ambalaj Hattı Tasarımı',
            'description', 'SolidWorks ile tasarladığım elma ambalaj hattı, dizim, karton yerleştirme, kapak kapama ve etiketleme gibi temel işlemleri içeren verimli bir sistemdir. Amaç, süreci hızlandırarak iş gücü verimliliğini artırmaktır.',
            'overview', 'SolidWorks ile tasarladığım elma ambalaj hattı, dizim, karton yerleştirme, kapak kapama ve etiketleme gibi temel işlemleri içeren verimli bir sistemdir. Amaç, süreci hızlandırarak iş gücü verimliliğini artırmaktır.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Apple Packing Line Design',
            'description', 'The apple packing line I designed in SolidWorks is an efficient system covering the core operations of arranging, carton placement, lid closing and labelling. The goal is to speed up the process and increase labour efficiency.',
            'overview', 'The apple packing line I designed in SolidWorks is an efficient system covering the core operations of arranging, carton placement, lid closing and labelling. The goal is to speed up the process and increase labour efficiency.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
),
(
    'ergonomik-risk-degerlendirme', 'research',
    array['CATIA', 'SOLIDWORKS'],
    false, 'published', 5,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Ergonomik Risk Değerlendirme',
            'description', 'Ergonomi dersi kapsamında, çelik fabrikasında ergonomik risk değerlendirmesi gerçekleştirdik. REBA metodunun uygulanması için CATIA''daki dijital insan modelleme aracıyla çalışma duruşları simüle edildi. Mevcut durum analiz edilerek, çalışan konforunu artırmak amacıyla yenilikçi paketleme makinesi tasarlandı.',
            'overview', 'Ergonomi dersi kapsamında, çelik fabrikasında ergonomik risk değerlendirmesi gerçekleştirdik. REBA metodunun uygulanması için CATIA''daki dijital insan modelleme aracıyla çalışma duruşları simüle edildi. Mevcut durum analiz edilerek, çalışan konforunu artırmak amacıyla yenilikçi paketleme makinesi tasarlandı.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Ergonomic Risk Assessment',
            'description', 'As part of an ergonomics course, we carried out an ergonomic risk assessment at a steel plant. Working postures were simulated with CATIA''s digital human modelling tool in order to apply the REBA method. After analysing the current state, an innovative packaging machine was designed to improve worker comfort.',
            'overview', 'As part of an ergonomics course, we carried out an ergonomic risk assessment at a steel plant. Working postures were simulated with CATIA''s digital human modelling tool in order to apply the REBA method. After analysing the current state, an innovative packaging machine was designed to improve worker comfort.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
),
(
    'lego-kepce-tasarimi', 'design',
    array['SOLIDWORKS'],
    false, 'published', 6,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Legodan Kepçe Tasarımı',
            'description', 'SolidWorks kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Mekanik uyum ve estetik detaylara odaklanarak 3D modelleme ve montaj simülasyonları gerçekleştirdim.',
            'overview', 'SolidWorks kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Mekanik uyum ve estetik detaylara odaklanarak 3D modelleme ve montaj simülasyonları gerçekleştirdim.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Lego-Style Excavator Design',
            'description', 'I designed a functional Lego-style excavator using SolidWorks. Focusing on mechanical fit and aesthetic detail, I carried out 3D modelling and assembly simulations.',
            'overview', 'I designed a functional Lego-style excavator using SolidWorks. Focusing on mechanical fit and aesthetic detail, I carried out 3D modelling and assembly simulations.',
            'problem', '', 'solution', '', 'methodology', '', 'results', '', 'challenges', '', 'futureImprovements', ''
        )
    )
)
on conflict (slug) do nothing;

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
