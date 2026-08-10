import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Tam ekran görsel görüntüleyici.
 * Klavye: Esc kapatır, ok tuşları gezinir.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }) {
    const open = index !== null && index >= 0 && images.length > 0

    const next = useCallback(() => {
        onIndexChange((index + 1) % images.length)
    }, [index, images.length, onIndexChange])

    const prev = useCallback(() => {
        onIndexChange((index - 1 + images.length) % images.length)
    }, [index, images.length, onIndexChange])

    useEffect(() => {
        if (!open) return
        const handler = (event) => {
            if (event.key === 'Escape') onClose()
            if (event.key === 'ArrowRight') next()
            if (event.key === 'ArrowLeft') prev()
        }
        window.addEventListener('keydown', handler)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handler)
            document.body.style.overflow = previousOverflow
        }
    }, [open, onClose, next, prev])

    if (typeof document === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 rounded-full border border-white/15 p-2.5 text-white/70 transition hover:border-white/40 hover:text-white sm:top-6 sm:right-6"
                    >
                        <X size={18} />
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Previous"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prev()
                                }}
                                className="absolute left-2 z-10 rounded-full border border-white/15 p-2.5 text-white/70 transition hover:border-white/40 hover:text-white sm:left-6"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                aria-label="Next"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    next()
                                }}
                                className="absolute right-2 z-10 rounded-full border border-white/15 p-2.5 text-white/70 transition hover:border-white/40 hover:text-white sm:right-6"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                    <motion.img
                        key={index}
                        src={images[index]?.url}
                        alt={images[index]?.alt || ''}
                        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {images.length > 1 && (
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-white/50">
                            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    )
}
