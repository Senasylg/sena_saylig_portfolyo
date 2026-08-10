import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import tr from '../i18n/tr'
import en from '../i18n/en'

const DICTIONARIES = { tr, en }
const STORAGE_KEY = 'ss-lang'
const DEFAULT_LANG = 'tr' // Site Türkçe açılır.

const LanguageContext = createContext(null)

function readStored() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored === 'tr' || stored === 'en' ? stored : DEFAULT_LANG
    } catch {
        return DEFAULT_LANG
    }
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(readStored)

    useEffect(() => {
        document.documentElement.lang = lang
        try {
            localStorage.setItem(STORAGE_KEY, lang)
        } catch {
            /* localStorage kapalı olabilir; tercih sadece bu oturumda geçerli olur. */
        }
    }, [lang])

    const setLang = useCallback((next) => {
        setLangState(next === 'en' ? 'en' : 'tr')
    }, [])

    const toggleLang = useCallback(() => {
        setLangState((prev) => (prev === 'tr' ? 'en' : 'tr'))
    }, [])

    /**
     * Nokta ile ayrılmış anahtar okuyucu: t('detail.gallery')
     * Sözlükte fonksiyon varsa argümanlarla çağrılır: t('projects.count', 4)
     * Anahtar bulunamazsa anahtarın kendisi döner (sessiz hata yerine görünür iz).
     */
    const t = useCallback(
        (key, ...args) => {
            const value = key.split('.').reduce((acc, part) => acc?.[part], DICTIONARIES[lang])
            if (typeof value === 'function') return value(...args)
            return value ?? key
        },
        [lang],
    )

    /** İki dilli içerik nesnelerinden ({tr, en}) aktif dildekini seçer. */
    const pick = useCallback(
        (obj, fallback = '') => {
            if (!obj) return fallback
            if (typeof obj === 'string') return obj
            return obj[lang] || obj[lang === 'tr' ? 'en' : 'tr'] || fallback
        },
        [lang],
    )

    const value = useMemo(
        () => ({ lang, setLang, toggleLang, t, pick, otherLang: lang === 'tr' ? 'en' : 'tr' }),
        [lang, setLang, toggleLang, t, pick],
    )

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
    return ctx
}
