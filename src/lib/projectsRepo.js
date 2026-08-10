import { supabase, isSupabaseConfigured } from './supabase'
import seedProjects from '../data/seedProjects'

/**
 * Proje veri katmanı.
 *
 * Supabase yapılandırılmışsa tüm okuma/yazma DB üzerinden yapılır.
 * Yapılandırılmamışsa `seedProjects` üzerinden salt okunur "demo mod" çalışır.
 *
 * ÖNEMLİ: Buradaki `status` filtreleri sadece kullanıcı deneyimi içindir.
 * Asıl yetkilendirme Postgres Row Level Security ile yapılır (supabase/schema.sql):
 * anonim istemci taslak projeleri hiçbir sorguyla çekemez.
 */

const TABLE = 'projects'

const EMPTY_LOCALE = {
    title: '',
    description: '',
    overview: '',
    problem: '',
    solution: '',
    methodology: '',
    results: '',
    challenges: '',
    futureImprovements: '',
}

export const EMPTY_PROJECT = {
    id: null,
    slug: '',
    category: 'software',
    coverImage: null,
    coverPath: null,
    gallery: [],
    technologies: [],
    githubUrl: null,
    demoUrl: null,
    docsUrl: null,
    featured: false,
    status: 'draft',
    sortOrder: 0,
    projectDate: null,
    content: { tr: { ...EMPTY_LOCALE }, en: { ...EMPTY_LOCALE } },
}

/** DB satırı (snake_case) → uygulama nesnesi (camelCase). */
function fromRow(row) {
    return {
        id: row.id,
        slug: row.slug,
        category: row.category || 'software',
        coverImage: row.cover_image || null,
        coverPath: row.cover_path || null,
        gallery: Array.isArray(row.gallery) ? row.gallery : [],
        technologies: Array.isArray(row.technologies) ? row.technologies : [],
        githubUrl: row.github_url || null,
        demoUrl: row.demo_url || null,
        docsUrl: row.docs_url || null,
        featured: Boolean(row.featured),
        status: row.status === 'published' ? 'published' : 'draft',
        sortOrder: row.sort_order ?? 0,
        projectDate: row.project_date || null,
        content: {
            tr: { ...EMPTY_LOCALE, ...(row.content?.tr || {}) },
            en: { ...EMPTY_LOCALE, ...(row.content?.en || {}) },
        },
        createdAt: row.created_at || null,
        updatedAt: row.updated_at || null,
    }
}

/** Uygulama nesnesi → DB satırı. */
function toRow(project) {
    return {
        slug: project.slug,
        category: project.category,
        cover_image: project.coverImage || null,
        cover_path: project.coverPath || null,
        gallery: project.gallery || [],
        technologies: project.technologies || [],
        github_url: project.githubUrl || null,
        demo_url: project.demoUrl || null,
        docs_url: project.docsUrl || null,
        featured: Boolean(project.featured),
        status: project.status === 'published' ? 'published' : 'draft',
        sort_order: project.sortOrder ?? 0,
        project_date: project.projectDate || null,
        content: {
            tr: { ...EMPTY_LOCALE, ...(project.content?.tr || {}) },
            en: { ...EMPTY_LOCALE, ...(project.content?.en || {}) },
        },
        updated_at: new Date().toISOString(),
    }
}

const bySortOrder = (a, b) => a.sortOrder - b.sortOrder

/* -------------------------------------------------------------------- */
/* Public okuma                                                          */
/* -------------------------------------------------------------------- */

/** Public Projects sayfası — yalnızca yayınlanmış projeler. */
export async function listPublishedProjects() {
    if (!isSupabaseConfigured) {
        return seedProjects.filter((p) => p.status === 'published').sort(bySortOrder)
    }
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })
    if (error) throw error
    return (data || []).map(fromRow)
}

/** Slug ile tek proje. Yayınlanmamışsa null döner (RLS zaten engeller). */
export async function getPublishedProjectBySlug(slug) {
    if (!isSupabaseConfigured) {
        return seedProjects.find((p) => p.slug === slug && p.status === 'published') || null
    }
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()
    if (error) throw error
    return data ? fromRow(data) : null
}

/* -------------------------------------------------------------------- */
/* Admin okuma / yazma                                                   */
/* -------------------------------------------------------------------- */

/** Admin dashboard — taslaklar dahil hepsi. RLS admin olmayanı reddeder. */
export async function listAllProjects() {
    if (!isSupabaseConfigured) {
        return [...seedProjects].sort(bySortOrder)
    }
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('sort_order', { ascending: true })
    if (error) throw error
    return (data || []).map(fromRow)
}

export async function getProjectById(id) {
    if (!isSupabaseConfigured) {
        return seedProjects.find((p) => p.id === id) || null
    }
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data ? fromRow(data) : null
}

/** Slug benzersiz mi? `exceptId` düzenleme sırasında kendini hariç tutmak için. */
export async function isSlugAvailable(slug, exceptId = null) {
    if (!slug) return false
    if (!isSupabaseConfigured) {
        return !seedProjects.some((p) => p.slug === slug && p.id !== exceptId)
    }
    let query = supabase.from(TABLE).select('id').eq('slug', slug)
    if (exceptId) query = query.neq('id', exceptId)
    const { data, error } = await query
    if (error) throw error
    return (data || []).length === 0
}

export async function createProject(project) {
    assertWritable()
    const nextOrder = project.sortOrder ?? (await nextSortOrder())
    const { data, error } = await supabase
        .from(TABLE)
        .insert({ ...toRow({ ...project, sortOrder: nextOrder }), created_at: new Date().toISOString() })
        .select()
        .single()
    if (error) throw error
    return fromRow(data)
}

export async function updateProject(id, project) {
    assertWritable()
    const { data, error } = await supabase
        .from(TABLE)
        .update(toRow(project))
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return fromRow(data)
}

export async function deleteProject(id) {
    assertWritable()
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw error
}

export async function setProjectStatus(id, status) {
    assertWritable()
    const { error } = await supabase
        .from(TABLE)
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
    if (error) throw error
}

export async function setProjectFeatured(id, featured) {
    assertWritable()
    const { error } = await supabase
        .from(TABLE)
        .update({ featured, updated_at: new Date().toISOString() })
        .eq('id', id)
    if (error) throw error
}

/** Drag & drop sıralaması sonrası tüm sort_order değerlerini yazar. */
export async function persistOrder(orderedIds) {
    assertWritable()
    const updates = orderedIds.map((id, index) =>
        supabase.from(TABLE).update({ sort_order: index + 1 }).eq('id', id),
    )
    const results = await Promise.all(updates)
    const failed = results.find((r) => r.error)
    if (failed) throw failed.error
}

async function nextSortOrder() {
    const { data, error } = await supabase
        .from(TABLE)
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
    if (error) throw error
    return (data?.[0]?.sort_order ?? 0) + 1
}

function assertWritable() {
    if (!isSupabaseConfigured) {
        throw new Error('SUPABASE_NOT_CONFIGURED')
    }
}

/* -------------------------------------------------------------------- */
/* İletişim mesajları                                                    */
/* -------------------------------------------------------------------- */

export async function sendMessage({ name, email, message }) {
    assertWritable()
    const { error } = await supabase.from('messages').insert({
        name: name.trim().slice(0, 120),
        email: email.trim().slice(0, 200),
        message: message.trim().slice(0, 4000),
    })
    if (error) throw error
}

export async function listMessages() {
    assertWritable()
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
}

export async function markMessageRead(id, read = true) {
    assertWritable()
    const { error } = await supabase.from('messages').update({ read }).eq('id', id)
    if (error) throw error
}

export async function deleteMessage(id) {
    assertWritable()
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) throw error
}
