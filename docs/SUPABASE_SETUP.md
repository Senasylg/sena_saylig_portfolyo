# Supabase Kurulumu

Bu adımları bir kez yaptığında admin paneli çalışmaya başlar ve yeni proje eklemek için
bir daha kod yazman gerekmez.

**Süre:** ~10 dakika · **Ücret:** yok (ücretsiz plan fazlasıyla yeter)

> Supabase kurulmadan da site çalışır. O durumda projeler `src/data/seedProjects.js`
> dosyasından **salt okunur** gelir ve `/admin` adresi 404 döner.

---

## 1. Proje oluştur

1. [supabase.com](https://supabase.com) → **Start your project** → GitHub ile giriş yap.
2. **New project**
   - **Name:** `sena-portfolio`
   - **Database Password:** güçlü bir şifre üret ve **bir yere kaydet** (bu şifre giriş şifren değil, veritabanı şifresi)
   - **Region:** `Frankfurt (eu-central-1)` — Türkiye'ye en yakın olanı
3. Proje hazırlanana kadar ~2 dakika bekle.

## 2. Şemayı kur

1. Sol menüden **SQL Editor** → **New query**
2. Bu depodaki [`supabase/schema.sql`](../supabase/schema.sql) dosyasının **tamamını** kopyalayıp yapıştır.
3. **Run**

Bu adım şunları oluşturur:
- `projects`, `messages`, `admins` tabloları
- Row Level Security politikaları (asıl güvenlik katmanı)
- `project-images` storage bucket'ı (5 MB sınırı + yalnızca görsel tipleri)
- Mevcut 6 projenin başlangıç kaydı

## 3. Kendine kullanıcı oluştur

1. **Authentication** → **Users** → **Add user** → **Create new user**
2. E-posta: `senasaylig@gmail.com`, güçlü bir şifre belirle
3. **Auto Confirm User** seçeneğini işaretle
4. **Create user**

## 4. Kendini admin yap ⚠️ (bu adım atlanırsa panel açılmaz)

**SQL Editor** → **New query** → çalıştır:

```sql
insert into public.admins (user_id)
select id from auth.users where email = 'senasaylig@gmail.com'
on conflict do nothing;
```

Doğrula (1 satır dönmeli):

```sql
select * from public.admins;
```

## 5. Başkalarının kayıt olmasını kapat

**Authentication** → **Sign In / Providers** → **Email** →
**Allow new users to sign up** seçeneğini **kapat** → Save.

Böylece siteye kimse kendi kendine hesap açamaz.

## 6. Anahtarları projeye ekle

1. **Project Settings** → **API**
2. Şu iki değeri kopyala:
   - **Project URL**
   - **anon / public** anahtarı

Proje klasöründe `.env.example` dosyasını `.env.local` adıyla kopyala ve doldur:

```bash
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Sunucuyu yeniden başlat:

```bash
npm run dev
```

> **`service_role` anahtarını asla kullanma.** O anahtar tüm güvenlik kurallarını atlar
> ve frontend'e konulursa herkes veritabanına tam erişim kazanır. Sadece `anon` anahtarı gerekli.

## 7. Vercel'e de ekle

Vercel → projen → **Settings** → **Environment Variables** → aynı iki değişkeni ekle
(`Production`, `Preview`, `Development` üçü de işaretli) → **Save** → **Redeploy**.

Bu yapılmazsa canlı site salt okunur "demo mod"da kalır.

---

## Kontrol listesi

- [ ] `localhost:3000/admin/login` açılıyor
- [ ] E-posta + şifre ile giriş yapabiliyorum
- [ ] Dashboard'da 6 proje listeleniyor
- [ ] Yeni proje ekleyip kapak görseli yükleyebiliyorum
- [ ] Taslak kaydettiğim proje herkese açık `/projects` sayfasında **görünmüyor**
- [ ] Yayınladığımda `/projects/slug` adresi açılıyor
- [ ] İletişim formundan gönderdiğim mesaj **Mesajlar** sekmesinde görünüyor

---

## Sık karşılaşılan sorunlar

**`/admin` 404 veriyor**
`.env.local` yok ya da boş; ya da 4. adımdaki `admins` kaydı yapılmadı.
Doğru anahtarları girdikten sonra dev sunucusunu **yeniden başlatman** gerekir
(Vite env değişkenlerini sadece açılışta okur).

**Giriş yapıyorum ama yine 404**
`admins` tablosunda kaydın yok. 4. adımı çalıştır.

**"new row violates row-level security policy"**
Aynı sebep — giriş yaptığın kullanıcı `admins` tablosunda değil.

**Görsel yüklenmiyor**
Dosya 5 MB'ı aşıyor ya da desteklenmeyen bir tip. İzin verilenler: JPG, PNG, WebP, AVIF, GIF.

**Canlı sitede projeler görünüyor ama admin çalışmıyor**
Vercel'de environment variable eklenmemiş (7. adım) ya da eklenip **redeploy** yapılmamış.

---

## Güvenlik nasıl sağlanıyor?

`/admin` adresinin gizli olması **güvenlik değildir** — asıl koruma veritabanında:

| Kim | Yapabildiği |
|---|---|
| Anonim ziyaretçi | Yalnızca `status = 'published'` projeleri okur. Mesaj gönderebilir ama gelen kutusunu **okuyamaz**. Hiçbir şey yazamaz/silemez. |
| Giriş yapmış ama `admins`'te olmayan kullanıcı | Anonim ziyaretçiyle aynı. Panel 404 gösterir. |
| `admins` tablosundaki kullanıcı | Tam yetki. |

Bu kurallar PostgreSQL'in kendi Row Level Security katmanında zorlanır. Biri tarayıcı
konsolundan API'yi doğrudan çağırsa bile taslak projeleri göremez ya da veri yazamaz.
