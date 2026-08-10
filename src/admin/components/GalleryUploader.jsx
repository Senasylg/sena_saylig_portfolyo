import { useRef, useState } from 'react'
import {
    DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import {
    SortableContext, rectSortingStrategy, sortableKeyboardCoordinates, useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, X, Loader2, GripVertical } from 'lucide-react'
import { uploadImage, removeImage } from '../../lib/storage'
import { useLanguage } from '../../context/LanguageContext'

function SortableThumb({ image, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: image.url,
    })

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`border-line group relative aspect-[4/3] overflow-hidden rounded-xl border ${
                isDragging ? 'z-10 opacity-80' : ''
            }`}
        >
            <img src={image.url} alt={image.alt || ''} className="h-full w-full object-cover" loading="lazy" />
            <button
                type="button"
                {...attributes}
                {...listeners}
                aria-label="Sırala"
                className="absolute top-1.5 left-1.5 cursor-grab touch-none rounded-md border border-white/20 bg-black/55 p-1.5 text-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100 active:cursor-grabbing"
            >
                <GripVertical size={12} />
            </button>
            <button
                type="button"
                onClick={() => onRemove(image)}
                aria-label="Sil"
                className="absolute top-1.5 right-1.5 rounded-md border border-white/20 bg-black/55 p-1.5 text-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:text-white"
            >
                <X size={12} />
            </button>
        </div>
    )
}

/** Çoklu görsel: yükleme, sürükleyerek sıralama, tek tek silme. */
export default function GalleryUploader({ images = [], folder, onChange }) {
    const { t } = useLanguage()
    const inputRef = useRef(null)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    async function handleFiles(fileList) {
        const files = Array.from(fileList || [])
        if (files.length === 0) return
        setError('')
        setBusy(true)
        const uploaded = []
        for (const file of files) {
            try {
                uploaded.push(await uploadImage(file, folder))
            } catch (err) {
                setError(err.message?.startsWith('errors.') ? t(err.message) : err.message)
            }
        }
        if (uploaded.length > 0) onChange([...images, ...uploaded])
        setBusy(false)
    }

    async function handleRemove(image) {
        onChange(images.filter((item) => item.url !== image.url))
        if (image.path) await removeImage(image.path)
    }

    function handleDragEnd({ active, over }) {
        if (!over || active.id === over.id) return
        const oldIndex = images.findIndex((i) => i.url === active.id)
        const newIndex = images.findIndex((i) => i.url === over.id)
        const next = [...images]
        next.splice(newIndex, 0, next.splice(oldIndex, 1)[0])
        onChange(next)
    }

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="label-mono">Galeri</span>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-muted hover:text-ink hover:bg-surface flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase transition"
                >
                    {busy ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                    Görsel ekle
                </button>
            </div>

            {images.length === 0 ? (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault()
                        handleFiles(e.dataTransfer.files)
                    }}
                    className="border-line hover:border-line-strong text-faint flex w-full items-center justify-center rounded-xl border border-dashed py-10 text-sm transition-colors"
                >
                    Henüz görsel yok — eklemek için tıkla
                </button>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map((i) => i.url)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {images.map((image) => (
                                <SortableThumb key={image.url} image={image} onRemove={handleRemove} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                    handleFiles(e.target.files)
                    e.target.value = ''
                }}
            />

            {error && <p className="text-danger mt-2 text-xs">{error}</p>}
        </div>
    )
}
