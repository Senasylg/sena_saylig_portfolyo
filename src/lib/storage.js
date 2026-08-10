import { supabase, isSupabaseConfigured, PROJECT_BUCKET } from './supabase'
import { validateImageFile } from './validate'
import slugify from './slugify'

/**
 * Görsel yükleme / silme.
 *
 * Bucket policy'si (supabase/schema.sql) yüklemeyi yalnızca `admins` tablosundaki
 * kullanıcıya, 5 MB altına ve image/* MIME tiplerine sınırlar. Buradaki doğrulama
 * hatayı erken yakalamak içindir, güvenliğin kendisi değildir.
 */

/**
 * @returns {Promise<{url: string, path: string}>}
 * @throws  {Error} message alanı i18n anahtarı taşır (errors.fileType gibi)
 */
export async function uploadImage(file, folder = 'misc') {
    if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED')

    const validationKey = validateImageFile(file)
    if (validationKey) throw new Error(validationKey)

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
    const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'
    const path = `${slugify(folder) || 'misc'}/${Date.now()}-${base}.${ext}`

    const { error } = await supabase.storage.from(PROJECT_BUCKET).upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
        contentType: file.type,
    })
    if (error) throw error

    const { data } = supabase.storage.from(PROJECT_BUCKET).getPublicUrl(path)
    return { url: data.publicUrl, path }
}

/** Storage'daki dosyayı siler. Path yoksa (seed/harici görsel) sessizce geçer. */
export async function removeImage(path) {
    if (!isSupabaseConfigured || !path) return
    await supabase.storage.from(PROJECT_BUCKET).remove([path])
}

/** Bir projeye ait tüm yüklenmiş görselleri temizler (proje silinirken). */
export async function removeProjectImages(project) {
    if (!isSupabaseConfigured || !project) return
    const paths = [
        project.coverPath,
        ...(project.gallery || []).map((item) => item?.path),
    ].filter(Boolean)
    if (paths.length === 0) return
    await supabase.storage.from(PROJECT_BUCKET).remove(paths)
}
