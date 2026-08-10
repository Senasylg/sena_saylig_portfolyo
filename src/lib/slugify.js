const TR_MAP = {
    ç: 'c', Ç: 'c',
    ğ: 'g', Ğ: 'g',
    ı: 'i', I: 'i', İ: 'i',
    ö: 'o', Ö: 'o',
    ş: 's', Ş: 's',
    ü: 'u', Ü: 'u',
}

// Aksan işaretleri (combining diacritical marks) bloğu: U+0300–U+036F.
const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g')

/**
 * Türkçe karakterleri de doğru çeviren slug üretici.
 * "Elma Ambalaj Hattı Tasarımı" → "elma-ambalaj-hatti-tasarimi"
 */
export function slugify(input) {
    if (!input) return ''
    return String(input)
        .split('')
        .map((ch) => TR_MAP[ch] ?? ch)
        .join('')
        .normalize('NFD')
        .replace(COMBINING_MARKS, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80)
}

export default slugify
