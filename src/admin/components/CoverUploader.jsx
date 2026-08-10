import { useRef, useState } from 'react'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import { uploadImage, removeImage } from '../../lib/storage'
import { useLanguage } from '../../context/LanguageContext'

/** Tek kapak görseli: sürükle-bırak veya tıkla, önizlemeli. */
export default function CoverUploader({ url, path, folder, onChange }) {
    const { t } = useLanguage()
    const inputRef = useRef(null)
    const [busy, setBusy] = useState(false)
    const [dragOver, setDragOver] = useState(false)
    const [error, setError] = useState('')

    async function handleFile(file) {
        if (!file) return
        setError('')
        setBusy(true)
        try {
            const uploaded = await uploadImage(file, folder)
            if (path) await removeImage(path) // eskisini temizle
            onChange(uploaded)
        } catch (err) {
            setError(err.message?.startsWith('errors.') ? t(err.message) : err.message)
        } finally {
            setBusy(false)
        }
    }

    async function clear() {
        if (path) await removeImage(path)
        onChange({ url: null, path: null })
    }

    return (
        <div>
            <span className="label-mono mb-2 block">Kapak Görseli</span>

            {url ? (
                <div className="border-line group relative aspect-[16/9] overflow-hidden rounded-xl border">
                    <img src={url} alt="Kapak" className="h-full w-full object-cover" />
                    <button
                        type="button"
                        onClick={clear}
                        aria-label="Kaldır"
                        className="absolute top-2 right-2 rounded-lg border border-white/20 bg-black/60 p-2 text-white/80 backdrop-blur transition hover:text-white"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault()
                        setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault()
                        setDragOver(false)
                        handleFile(e.dataTransfer.files?.[0])
                    }}
                    className={`flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed transition-colors ${
                        dragOver ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong'
                    }`}
                >
                    {busy ? (
                        <Loader2 size={20} className="text-accent animate-spin" />
                    ) : (
                        <UploadCloud size={20} className="text-faint" />
                    )}
                    <span className="text-muted text-sm">Sürükle bırak ya da tıkla</span>
                    <span className="text-faint font-mono text-[10px]">JPG · PNG · WebP — maks. 5 MB</span>
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    handleFile(e.target.files?.[0])
                    e.target.value = ''
                }}
            />

            {error && <p className="text-danger mt-2 text-xs">{error}</p>}
        </div>
    )
}
