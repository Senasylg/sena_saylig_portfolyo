import { useEffect } from 'react'

const SUFFIX = 'Sena Şaylıg'

/** Sayfa başlığını ayarlar. Ayrılırken önceki başlığa geri döner. */
export default function useDocumentTitle(title) {
    useEffect(() => {
        if (!title) return
        const previous = document.title
        document.title = title.includes(SUFFIX) ? title : `${title} — ${SUFFIX}`
        return () => {
            document.title = previous
        }
    }, [title])
}
