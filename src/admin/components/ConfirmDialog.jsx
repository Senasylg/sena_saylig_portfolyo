import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'

/** Geri alınamaz işlemler için onay penceresi. */
export default function ConfirmDialog({
    open,
    title,
    body,
    confirmLabel = 'Sil',
    cancelLabel = 'Vazgeç',
    busy = false,
    onConfirm,
    onCancel,
}) {
    useEffect(() => {
        if (!open) return
        const handler = (e) => e.key === 'Escape' && onCancel()
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, onCancel])

    if (!open || typeof document === 'undefined') return null

    return createPortal(
        <div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm"
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="border-line bg-elev w-full max-w-sm rounded-2xl border p-6 shadow-lift"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-danger mb-4 flex items-center gap-3">
                    <span className="border-danger/30 bg-danger/10 flex h-9 w-9 items-center justify-center rounded-lg border">
                        <AlertTriangle size={16} />
                    </span>
                    <h2 className="text-ink text-base font-medium">{title}</h2>
                </div>
                <p className="text-muted text-sm leading-relaxed">{body}</p>
                <div className="mt-7 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border-line hover:bg-surface rounded-lg border px-4 py-2 text-sm transition"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={busy}
                        className="bg-danger rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        {busy ? '…' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    )
}
