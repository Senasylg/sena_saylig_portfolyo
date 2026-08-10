export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']

/**
 * Yüklenen dosyayı doğrular. Hata yoksa null döner.
 * Aynı kurallar Supabase Storage policy'sinde de tanımlıdır (bkz. supabase/schema.sql),
 * yani client doğrulaması atlansa bile sunucu reddeder.
 */
export function validateImageFile(file) {
    if (!file) return 'errors.fileMissing'
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return 'errors.fileType'
    if (file.size > MAX_IMAGE_BYTES) return 'errors.fileSize'
    return null
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim())
}

/** Boş string / null / undefined → null. Opsiyonel URL alanları için. */
export function nullifyEmpty(value) {
    const trimmed = String(value ?? '').trim()
    return trimmed === '' ? null : trimmed
}

/**
 * Sadece http(s) şemasına izin verir — `javascript:` gibi şemaları eler.
 * Geçersizse null döner ki UI'da buton hiç render edilmesin.
 */
export function safeUrl(value) {
    const raw = nullifyEmpty(value)
    if (!raw) return null
    try {
        const parsed = new URL(raw)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : null
    } catch {
        return null
    }
}
