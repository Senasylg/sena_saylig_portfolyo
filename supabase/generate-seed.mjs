/**
 * supabase/seed.sql dosyasini src/data/seedProjects.js icinden uretir.
 *
 * Calistirmak icin proje kokunde:  node supabase/generate-seed.mjs
 *
 * Boylece seed verisi tek yerde tutulur; demo mod ile veritabani birbirinden
 * ayrisip tutarsiz hale gelmez.
 */
import { writeFileSync } from 'node:fs'
import { seedProjects } from '../src/data/seedProjects.js'

/** PostgreSQL string literali: tek tirnaklar ikilenir. */
const q = (value) => (value == null ? 'null' : `'${String(value).replace(/'/g, "''")}'`)

const textArray = (items) =>
    items.length === 0 ? "'{}'" : `array[${items.map(q).join(', ')}]`

const jsonbLocale = (c) =>
    `jsonb_build_object(
            'title', ${q(c.title)},
            'description', ${q(c.description)},
            'overview', ${q(c.overview)},
            'problem', ${q(c.problem)},
            'solution', ${q(c.solution)},
            'methodology', ${q(c.methodology)},
            'results', ${q(c.results)},
            'challenges', ${q(c.challenges)},
            'futureImprovements', ${q(c.futureImprovements)}
        )`

const rows = seedProjects.map(
    (p) => `(
    ${q(p.slug)}, ${q(p.category)}, ${q(p.coverImage)},
    ${textArray(p.technologies)},
    ${p.featured}, ${q(p.status)}, ${p.sortOrder},
    jsonb_build_object(
        'tr', ${jsonbLocale(p.content.tr)},
        'en', ${jsonbLocale(p.content.en)}
    )
)`,
)

const sql = `-- =====================================================================
--  Proje baslangic verisi  (OTOMATIK URETILDI - elle duzenleme)
--
--  Kaynak : src/data/seedProjects.js
--  Uretim : node supabase/generate-seed.mjs
--
--  Once supabase/schema.sql dosyasini calistir, sonra bunu.
--  Ayni slug varsa atlanir; mevcut projelerin uzerine yazmaz.
--
--  NOT: problem / solution / methodology / results / challenges /
--  future_improvements alanlari bilerek bos -- bu bilgiler elde yok,
--  uydurulmadi. Admin panelinden doldurulabilir.
-- =====================================================================

insert into public.projects
    (slug, category, cover_image, technologies, featured, status, sort_order, content)
values
${rows.join(',\n')}
on conflict (slug) do nothing;
`

writeFileSync(new URL('./seed.sql', import.meta.url), sql)
console.log(`OK: supabase/seed.sql uretildi (${seedProjects.length} proje)`)
