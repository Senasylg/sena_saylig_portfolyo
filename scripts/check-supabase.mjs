/**
 * Supabase kurulumunu bastan sona dogrular.
 *
 *   npm run check:supabase
 *
 * .env.local dosyasindaki anahtarlarla PostgREST API'sine dogrudan istek atar
 * ve sirayla kontrol eder: tablolar duruyor mu, seed yuklendi mi, RLS anonim
 * istemciyi gercekten engelliyor mu, admin tablosu kapali mi.
 *
 * Bilerek supabase-js kullanilmiyor: o kutuphane realtime icin native
 * WebSocket istiyor ve Node 20'de calismiyor. Duz fetch her yerde calisir.
 *
 * Sadece anon anahtari kullanir; yani tam olarak sitenin gordugu yerden bakar.
 */
import { readFileSync, existsSync } from 'node:fs'

const C = {
    green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', dim: '\x1b[2m', reset: '\x1b[0m',
}

let failures = 0
const ok = (m, extra = '') =>
    console.log(`${C.green}  ✓${C.reset} ${m}${extra ? ` ${C.dim}${extra}${C.reset}` : ''}`)
const bad = (m, hint = '') => {
    console.log(`${C.red}  ✗${C.reset} ${m}`)
    if (hint) console.log(`${C.dim}     → ${hint}${C.reset}`)
    failures += 1
}
const warn = (m, hint = '') => {
    console.log(`${C.yellow}  !${C.reset} ${m}`)
    if (hint) console.log(`${C.dim}     → ${hint}${C.reset}`)
}

console.log('\nSupabase kurulum kontrolu\n' + '─'.repeat(52))

/* ------------------------------------------------------ 1) .env.local */
if (!existsSync('.env.local')) {
    bad('.env.local dosyasi yok', 'docs/SUPABASE_SETUP.md 6. adima bak.')
    process.exit(1)
}

const env = Object.fromEntries(
    readFileSync('.env.local', 'utf8')
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#') && l.includes('='))
        .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
)

const rawUrl = env.VITE_SUPABASE_URL || ''
const key = env.VITE_SUPABASE_ANON_KEY || ''

if (!rawUrl || !key) {
    bad('VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY bos', 'Supabase → Project Settings → API')
    process.exit(1)
}

// Yaygin hata: "Project URL" yerine REST endpoint'i kopyalanmasi.
const url = rawUrl.replace(/\/+$/, '').replace(/\/rest\/v1$/, '')
if (url !== rawUrl.replace(/\/+$/, '')) {
    warn(
        'VITE_SUPABASE_URL sonunda /rest/v1 vardi, kirpildi',
        `.env.local icinde su olmali:  ${url}`,
    )
} else {
    ok('.env.local okundu', url)
}

if (key.length < 100) {
    bad('anon anahtari cok kisa görünüyor', 'Project Settings → API → anon / public anahtarini kopyala.')
    process.exit(1)
}

const headers = { apikey: key, Authorization: `Bearer ${key}` }

/** PostgREST istegi. { status, body } doner. */
async function api(path, init = {}) {
    const res = await fetch(`${url}/rest/v1/${path}`, {
        ...init,
        headers: { ...headers, 'Content-Type': 'application/json', ...(init.headers || {}) },
    })
    const text = await res.text()
    let body
    try {
        body = text ? JSON.parse(text) : null
    } catch {
        body = text
    }
    return { status: res.status, ok: res.ok, body }
}

/* ------------------------------------------------------ 2) Baglanti */
console.log('\nBaglanti')
// Ciplak /rest/v1/ adresi yeni Supabase surumlerinde her zaman 401 doner;
// bu yuzden gercek bir tablo uzerinden yoklaniyor.
try {
    const ping = await api('projects?select=id&limit=1')
    if (ping.status === 401) {
        bad('Anahtar reddedildi (401)', 'anon anahtari yanlis ya da baska bir projeye ait.')
        process.exit(1)
    }
    if (ping.status === 404) {
        bad('projects tablosu yok (404)', 'supabase/schema.sql calistirildi mi?')
        process.exit(1)
    }
    ok('Supabase projesine ulasildi', `HTTP ${ping.status}`)
} catch (err) {
    bad('Supabase adresine ulasilamadi: ' + err.message, 'URL dogru mu? Internet baglantisi var mi?')
    process.exit(1)
}

/* ------------------------------------------------------ 3) Tablolar */
console.log('\nTablolar ve veri')

const projects = await api('projects?select=id,slug,status&limit=500')
if (!projects.ok) {
    bad(
        'projects tablosu okunamadi: ' + JSON.stringify(projects.body),
        'supabase/schema.sql calistirildi mi?',
    )
} else {
    const list = projects.body || []
    ok('projects tablosu erisilebilir', `${list.length} yayinlanmis proje`)
    if (list.length === 0) {
        bad('Hic yayinlanmis proje yok', 'supabase/seed.sql calistirildi mi?')
    } else if (list.length < 18) {
        warn(`Beklenen 18, gorunen ${list.length}`, 'seed.sql tamamen calisti mi?')
    }
}

const admins = await api('admins?select=user_id&limit=1')
if (admins.status === 404 || (admins.body && /does not exist/i.test(JSON.stringify(admins.body)))) {
    bad('admins tablosu yok', 'supabase/schema.sql calistirildi mi?')
} else {
    ok('admins tablosu mevcut')
}

/* ------------------------------------------------------ 4) RLS */
console.log('\nGuvenlik  ' + C.dim + '(anonim istemci olarak)' + C.reset)

const drafts = await api('projects?select=id&status=eq.draft')
if (drafts.ok && (drafts.body || []).length > 0) {
    bad(
        `Taslak projeler anonim okunabiliyor (${drafts.body.length} kayit)!`,
        'projects tablosundaki SELECT politikasini kontrol et.',
    )
} else {
    ok('Taslak projeler anonim istemciye gorunmuyor')
}

const inbox = await api('messages?select=id&limit=1')
if (inbox.ok && (inbox.body || []).length > 0) {
    bad(
        'Gelen kutusu anonim olarak okunabiliyor!',
        'messages tablosunda SELECT yalnizca admine acik olmali.',
    )
} else {
    ok('Gelen kutusu anonim istemciye kapali')
}

const adminList = await api('admins?select=user_id')
if (adminList.ok && (adminList.body || []).length > 0) {
    warn('admins tablosu anonim okunabiliyor', 'Kritik degil ama kapatmak daha iyi.')
} else {
    ok('admins tablosu anonim istemciye kapali')
}

const write = await api('projects', {
    method: 'POST',
    body: JSON.stringify({ slug: 'rls-kontrol-' + Date.now(), category: 'software' }),
})
if (write.ok) {
    bad(
        'Anonim istemci proje YAZABILIYOR!',
        'projects INSERT politikasi hatali. Bu ciddi bir acik — schema.sql yeniden calistirilmali.',
    )
} else {
    ok('Anonim istemci proje yazamiyor', `HTTP ${write.status}`)
}

/* ------------------------------------------------------ 5) Iletisim formu */
console.log('\nIletisim formu')
const msg = await api('messages', {
    method: 'POST',
    body: JSON.stringify({
        name: 'Kurulum kontrolu',
        email: 'kontrol@example.com',
        message: 'Bu kayit check-supabase scripti tarafindan olusturuldu, panelden silebilirsin.',
    }),
})
if (msg.ok || msg.status === 201) {
    ok('Ziyaretci mesaj gonderebiliyor', '(test mesaji birakildi — panelden sil)')
} else {
    bad('Iletisim formu mesaj yazamiyor: ' + JSON.stringify(msg.body), 'messages INSERT politikasi eksik.')
}

/* ------------------------------------------------------ Sonuc */
console.log('\n' + '─'.repeat(52))
if (failures === 0) {
    console.log(`${C.green}Kurulum saglam.${C.reset}`)
    console.log(`${C.dim}Son adim: SQL Editor'de  select * from public.admins;  → 1 satir donmeli.${C.reset}`)
    console.log(`${C.dim}Sonra: npm run dev → http://localhost:3000/admin${C.reset}\n`)
} else {
    console.log(`${C.red}${failures} sorun bulundu.${C.reset} docs/SUPABASE_SETUP.md adimlarini kontrol et.\n`)
    process.exitCode = 1
}
