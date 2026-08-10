# Sena Şaylıg — Portfolyo

Endüstri ve bilgisayar mühendisliğinin kesişiminde ürettiğim projelerin portfolyosu.
İki ayrı deneyimden oluşuyor:

- **Herkese açık site** — projelerin keşfedildiği, iki dilli (TR/EN), koyu/açık temalı arayüz
- **Gizli yönetim paneli** — yeni proje eklemek, düzenlemek ve yayınlamak için; kod yazmadan

Yeni bir proje eklemek için tek yapılması gereken panele girip formu doldurmak.
Yayınla'ya basıldığı anda proje sitede ve `/projects/<slug>` adresinde görünür.

## Teknolojiler

| Katman | Seçim |
|---|---|
| Build | Vite 6 + React 19 |
| Yönlendirme | React Router 7 |
| Stil | Tailwind CSS 4 (CSS değişkeni tabanlı tema) |
| Animasyon | Motion |
| Backend | Supabase — Postgres + Auth + Storage + Row Level Security |
| İçerik | Markdown (`react-markdown`, ham HTML enjekte etmez → XSS'e kapalı) |
| Deploy | Vercel |

## Kurulum

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

Supabase yapılandırılmamışsa site **demo modda** çalışır: projeler
`src/data/seedProjects.js` dosyasından salt okunur gelir ve `/admin` 404 döner.
Paneli açmak için → **[docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)**

```bash
npm run build     # üretim derlemesi → dist/
npm run preview   # derlenmiş çıktıyı yerelde çalıştır
```

## Yapı

```
src/
  main.jsx  App.jsx            App.jsx yalnızca router + provider'lar
  styles/index.css             tema değişkenleri, tipografi, yardımcı sınıflar
  context/                     ThemeContext · LanguageContext · AuthContext
  i18n/                        tr.js · en.js  (arayüz metinleri)
  data/
    profile.js                 kişisel bilgiler — tek doğruluk kaynağı
    seedProjects.js            Supabase yokken kullanılan başlangıç verisi
  lib/
    supabase.js                istemci; env yoksa null döner
    projectsRepo.js            veri katmanı — Supabase ya da seed
    storage.js  validate.js  slugify.js  categories.js
  components/
    layout/   Navbar · Footer · ScrollProgress · PublicLayout
    ui/       Reveal · MagneticButton · Lightbox · CommandPalette · CustomCursor
    home/     Hero · Manifesto · FocusAreas · Journey · Stack · ContactBlock
    projects/ ProjectCard · ProjectCarousel · CategoryFilter · ProjectDetailView
  pages/                       Home · Projects · ProjectDetail · About · Contact · NotFound
  admin/                       lazy yüklenen yönetim paneli (public bundle'a girmez)
supabase/schema.sql            tablolar + RLS politikaları + storage + seed
docs/SUPABASE_SETUP.md         adım adım kurulum
```

**Proje verisi hiçbir bileşene gömülü değildir.** Tüm okuma/yazma
`src/lib/projectsRepo.js` üzerinden geçer; Supabase bağlıysa veritabanından,
değilse seed dosyasından okur. Arayüz her iki durumda da aynıdır.

## Herkese açık rotalar

```
/                    ana sayfa — yatay proje şeridi, tanıtım, çalışma alanları, deneyim
/projects            tüm projeler; kategori filtresi + arama
/projects/:slug      proje detayı; markdown bölümler, galeri, lightbox
/about               hakkımda
/contact             iletişim formu + kanallar
```

Ekstra: `Ctrl/⌘ + K` ile komut paleti (sayfa/proje arama, dil ve tema değiştirme).

## Yönetim paneli

`/admin` — public navigasyonda **linki yoktur** ve `robots.txt` ile indekslenmez.

```
/admin/login                    giriş
/admin/projects                 liste · sürükle-bırak sıralama · yayınla/taslak · öne çıkar · sil
/admin/projects/new             yeni proje
/admin/projects/:id/edit        düzenleme
/admin/projects/:id/preview     yayınlamadan önce önizleme
/admin/messages                 iletişim formu mesajları
```

Proje formu sekmeli: **Temel Bilgiler · Türkçe · English · Görseller · Bağlantılar**.
Her proje iki dilde ayrı ayrı yazılır; ziyaretçi dili değiştirdiğinde proje içeriği de değişir.
Boş bırakılan bölümler ve bağlantılar sitede **hiç render edilmez** — sahte içerik oluşmaz.

## Güvenlik

`/admin` adresinin bilinmemesi güvenlik sayılmaz. Asıl koruma veritabanındadır:

- Yetkilendirme PostgreSQL **Row Level Security** ile zorlanır. Anonim istemci yalnızca
  yayınlanmış projeleri okuyabilir; taslakları API'yi doğrudan çağırsa bile göremez.
- Yönetici olmak `admins` tablosunda kayıtlı olmayı gerektirir. Giriş yapmış ama kayıtlı
  olmayan kullanıcıya panel 404 gösterir.
- Frontend'de yalnızca `anon` anahtarı bulunur — bu anahtar public olmak üzere tasarlanmıştır
  ve tek başına hiçbir yetki vermez. `service_role` anahtarı hiçbir yerde kullanılmaz.
- Şifre kodda tutulmaz; doğrulama Supabase Auth tarafında yapılır.
- `.env.local` sürüm kontrolüne girmez.
- Yüklenen dosyalar hem istemcide hem storage politikasında doğrulanır (yalnızca görsel, ≤5 MB).
- İçerik markdown olarak render edilir; ham HTML çalıştırılmaz.

## Deploy

Vercel'e bağlı; `main` dalına push edildiğinde otomatik yayınlanır.
`vercel.json` build komutunu, `dist` çıktısını, SPA yönlendirmesini ve `/admin` için
`noindex` başlığını sabitler.

Ortam değişkenleri Vercel panelinden de eklenmelidir:
`VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY`.

## Notlar

- Arayüz Türkçe ve koyu tema ile açılır; tercihler `localStorage`'da saklanır.
- `prefers-reduced-motion` açıkken tüm animasyonlar devre dışı kalır.
- Yönetim paneli ve markdown motoru ayrı chunk'lara ayrılmıştır; herkese açık sayfaların
  yüklenme boyutunu etkilemezler.
- `legacy/` klasöründe sitenin Create React App tabanlı önceki sürümü referans olarak durur
  (derlemeye dahil değildir).
