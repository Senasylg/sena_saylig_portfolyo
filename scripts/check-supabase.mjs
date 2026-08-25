/**
 * Supabase kurulumunu bastan sona dogrular.
 *
 *   npm run check:supabase
 *
 * .env.local dosyasindaki anahtarlarla baglanir ve sirayla kontrol eder:
 * tablolar duruyor mu, seed yuklendi mi, RLS anonim istemciyi gercekten
 * engelliyor mu, admin hesabi tanimli mi.
 *
 * Sadece anon anahtari kullanir; yani tam olarak sitenin gordugu yerden bakar.
 */
import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

const ok = (m, extra = '') => console.log(`${GREEN}  ✓${RESET} ${m}${extra ? ` ${DIM}${extra}${RESET}` : ''}`)
const bad = (m, hint = '') => {
    console.log(`${RED}  ✗${RESET} ${m}`)
    if (hint) console.log(`${DIM}     → ${hint}${RESET}`)
    failures += 1
}
const warn = (m, hint = '') => {
    console.log(`${YELLOW}  !${RESET} ${m}`)
    if (hint) console.log(`${DIM}     → ${hint}${RESET}`)
}

let failures = 0

console.log('\nSupabase kurulum kontrolu\n' + '─'.repeat(48))

/* -------------------------------------------------- 1) .env.local */
if (!existsSync('.env.local')) {
    bad('.env.local dosyasi yok', 'docs/SUPABASE_SETUP.md 6. adima bak. .env.example dosyasini kopyala.')
    process.exit(1)
}

const env = Object.fromEntries(
    readFileSync('.env.local', 'utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => {
            const i = line.indexOf('=')
            return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
        }),
)

const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
    bad('VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY bos', 'Supabase → Project Settings → API')
    process.exit(1)
}
ok('.env.local okundu', url)

if (/service_role/i.test(key)) {
    bad('service_role anahtari kullanilmis!', 'Bu anahtar tum guvenlik kurallarini atlar. anon / public anahtarini kullan.')
    process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

/* -------------------------------------------------- 2) Tablolar */
console.log('\nTablolar')
const { error: projErr, count: publishedCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

if (projErr) {
    bad('projects tablosu okunamadi: ' + projErr.message, 'supabase/schema.sql calistirildi mi?')
} else {
    ok('projects tablosu erisilebilir', `${publishedCount} yayinlanmis proje`)
    if (publishedCount === 0) {
        warn('Hic yayinlanmis proje yok', 'supabase/seed.sql calistirildi mi?')
    }
}

const { error: msgInsertErr } = await supabase.from('messages').insert({
    name: 'Kurulum kontrolu',
    email: 'kontrol@example.com',
    message: 'Bu kayit check-supabase scripti tarafindan olusturuldu, silebilirsin.',
})
if (msgInsertErr) {
    bad('Iletisim formu mesaj yazamiyor: ' + msgInsertErr.message, 'messages insert politikasi eksik olabilir.')
} else {
    ok('Iletisim formu mesaj gonderebiliyor', '(test mesaji birakildi, panelden silebilirsin)')
}

/* -------------------------------------------------- 3) RLS */
console.log('\nGuvenlik (anonim istemci olarak)')

const { data: drafts, error: draftErr } = await supabase
    .from('projects')
    .select('id')
    .eq('status', 'draft')

if (draftErr) {
    ok('Taslak projeler okunamiyor', 'RLS engelliyor')
} else if ((drafts || []).length > 0) {
    bad(`Taslak projeler anonim okunabiliyor (${drafts.length} kayit)!`, 'projects tablosundaki SELECT politikasini kontrol et.')
} else {
    ok('Taslak projeler anonim istemciye gorunmuyor')
}

const { data: inbox, error: inboxErr } = await supabase.from('messages').select('id').limit(1)
if (inboxErr || (inbox || []).length === 0) {
    ok('Gelen kutusu anonim istemciye kapali')
} else {
    bad('Mesajlar anonim olarak okunabiliyor!', 'messages tablosunda SELECT yalnizca admine acik olmali.')
}

const { error: writeErr } = await supabase
    .from('projects')
    .insert({ slug: 'rls-kontrol-' + Date.now(), category: 'software' })
if (writeErr) {
    ok('Anonim istemci proje yazamiyor', 'RLS engelliyor')
} else {
    bad('Anonim istemci proje YAZABILIYOR!', 'projects tablosundaki INSERT politikasi hatali. Bu ciddi bir acik.')
}

/* -------------------------------------------------- 4) Admin */
console.log('\nAdmin hesabi')
const { error: adminErr } = await supabase.from('admins').select('user_id').limit(1)
if (adminErr && !/permission|policy|denied/i.test(adminErr.message)) {
    bad('admins tablosu bulunamadi: ' + adminErr.message, 'supabase/schema.sql calistirildi mi?')
} else {
    ok('admins tablosu mevcut ve anonim istemciye kapali')
    warn('Kendini admins tablosuna ekledigini bu scriptten dogrulayamam', "SQL Editor'de: select * from public.admins;  → 1 satir donmeli")
}

/* -------------------------------------------------- Sonuc */
console.log('\n' + '─'.repeat(48))
if (failures === 0) {
    console.log(`${GREEN}Kurulum saglam.${RESET} Simdi: npm run dev → http://localhost:3000/admin\n`)
} else {
    console.log(`${RED}${failures} sorun bulundu.${RESET} docs/SUPABASE_SETUP.md dosyasindaki adimlari kontrol et.\n`)
    process.exitCode = 1
}
