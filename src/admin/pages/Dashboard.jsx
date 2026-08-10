import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import {
    SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    Plus, GripVertical, Star, Eye, Pencil, Trash2, Globe, FileEdit, ExternalLink, AlertCircle,
} from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import {
    listAllProjects, deleteProject, setProjectStatus, setProjectFeatured, persistOrder,
} from '../../lib/projectsRepo'
import { removeProjectImages } from '../../lib/storage'

const FILTERS = [
    { id: 'all', label: 'Tümü' },
    { id: 'published', label: 'Yayında' },
    { id: 'draft', label: 'Taslak' },
]

/** Sunum bileşeni — sürükleme davranışı dışarıdan enjekte edilir. */
function ProjectRow({
    project, onToggleStatus, onToggleFeatured, onDelete,
    innerRef, style, dragHandle, dragging,
}) {
    const title = project.content.tr.title || project.content.en.title || project.slug
    const published = project.status === 'published'

    return (
        <li
            ref={innerRef}
            style={style}
            className={`border-line bg-elev flex items-center gap-3 rounded-xl border p-3 ${
                dragging ? 'z-10 opacity-90 shadow-lift' : ''
            }`}
        >
            {dragHandle ?? <span className="w-6" />}

            <div className="bg-surface hidden h-12 w-16 shrink-0 overflow-hidden rounded-lg sm:block">
                {project.coverImage && (
                    <img src={project.coverImage} alt="" className="h-full w-full object-cover" loading="lazy" />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{title}</span>
                    {project.featured && <Star size={12} className="text-accent shrink-0" fill="currentColor" />}
                </div>
                <div className="text-faint mt-1 flex items-center gap-2 font-mono text-[10px]">
                    <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${
                            published ? 'border-emerald-500/30 text-emerald-500' : 'border-warn/40 text-warn'
                        }`}
                    >
                        {published ? <Globe size={9} /> : <FileEdit size={9} />}
                        {published ? 'Yayında' : 'Taslak'}
                    </span>
                    <span className="truncate">/{project.slug}</span>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
                <button
                    type="button"
                    onClick={() => onToggleFeatured(project)}
                    title={project.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                    className={`hover:bg-surface rounded-lg p-2 transition ${
                        project.featured ? 'text-accent' : 'text-faint hover:text-ink'
                    }`}
                >
                    <Star size={15} fill={project.featured ? 'currentColor' : 'none'} />
                </button>
                <button
                    type="button"
                    onClick={() => onToggleStatus(project)}
                    title={published ? 'Yayından kaldır' : 'Yayınla'}
                    className="text-faint hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                >
                    {published ? <FileEdit size={15} /> : <Globe size={15} />}
                </button>
                <Link
                    to={`/admin/projects/${project.id}/preview`}
                    title="Önizle"
                    className="text-faint hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                >
                    <Eye size={15} />
                </Link>
                <Link
                    to={`/admin/projects/${project.id}/edit`}
                    title="Düzenle"
                    className="text-faint hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                >
                    <Pencil size={15} />
                </Link>
                <button
                    type="button"
                    onClick={() => onDelete(project)}
                    title="Sil"
                    className="text-faint hover:text-danger hover:bg-surface rounded-lg p-2 transition"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </li>
    )
}

/** Sürüklenebilir sarmalayıcı — yalnızca DndContext içinde kullanılır. */
function SortableRow(props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props.project.id,
    })

    return (
        <ProjectRow
            {...props}
            innerRef={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            dragging={isDragging}
            dragHandle={
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    aria-label="Sırala"
                    className="text-faint hover:text-ink cursor-grab touch-none p-1 active:cursor-grabbing"
                >
                    <GripVertical size={16} />
                </button>
            }
        />
    )
}

export default function Dashboard() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('all')
    const [pendingDelete, setPendingDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            setProjects(await listAllProjects())
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        document.title = 'Projeler — Yönetim'
        load()
    }, [load])

    const visible = useMemo(
        () => (filter === 'all' ? projects : projects.filter((p) => p.status === filter)),
        [projects, filter],
    )

    // Sıralama yalnızca filtresiz listede anlamlı — filtreliyken sürükleme kapalı.
    const sortable = filter === 'all'

    async function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = projects.findIndex((p) => p.id === active.id)
        const newIndex = projects.findIndex((p) => p.id === over.id)
        const next = [...projects]
        next.splice(newIndex, 0, next.splice(oldIndex, 1)[0])
        setProjects(next.map((p, i) => ({ ...p, sortOrder: i + 1 })))

        try {
            await persistOrder(next.map((p) => p.id))
        } catch (err) {
            setError(err)
            load()
        }
    }

    async function toggleStatus(project) {
        const next = project.status === 'published' ? 'draft' : 'published'
        setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, status: next } : p)))
        try {
            await setProjectStatus(project.id, next)
        } catch (err) {
            setError(err)
            load()
        }
    }

    async function toggleFeatured(project) {
        const next = !project.featured
        setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, featured: next } : p)))
        try {
            await setProjectFeatured(project.id, next)
        } catch (err) {
            setError(err)
            load()
        }
    }

    async function confirmDelete() {
        if (!pendingDelete) return
        setDeleting(true)
        try {
            await removeProjectImages(pendingDelete)
            await deleteProject(pendingDelete.id)
            setProjects((prev) => prev.filter((p) => p.id !== pendingDelete.id))
            setPendingDelete(null)
        } catch (err) {
            setError(err)
        } finally {
            setDeleting(false)
        }
    }

    const counts = useMemo(
        () => ({
            all: projects.length,
            published: projects.filter((p) => p.status === 'published').length,
            draft: projects.filter((p) => p.status === 'draft').length,
        }),
        [projects],
    )

    return (
        <div className="mx-auto max-w-4xl px-5 py-8 pb-24 sm:px-8 sm:py-10">
            <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight">Projeler</h1>
                    <p className="text-faint mt-1 font-mono text-[11px]">
                        {counts.published} yayında · {counts.draft} taslak
                    </p>
                </div>
                <Link
                    to="/admin/projects/new"
                    className="bg-ink text-bg hover:bg-accent inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Yeni Proje
                </Link>
            </header>

            {error && (
                <div className="border-danger/30 bg-danger/10 text-danger mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <div>
                        <p className="font-medium">İşlem tamamlanamadı.</p>
                        <p className="mt-1 font-mono text-xs opacity-80">
                            {error.message === 'SUPABASE_NOT_CONFIGURED'
                                ? 'Supabase bağlı değil — .env.local dosyasına anahtarları ekle (docs/SUPABASE_SETUP.md).'
                                : error.message}
                        </p>
                    </div>
                </div>
            )}

            <div className="mb-5 flex flex-wrap items-center gap-2">
                {FILTERS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setFilter(item.id)}
                        className={`rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase transition ${
                            filter === item.id ? 'bg-surface text-ink' : 'text-faint hover:text-ink'
                        }`}
                    >
                        {item.label} <span className="opacity-50">{counts[item.id]}</span>
                    </button>
                ))}
                {!sortable && (
                    <span className="text-faint ml-auto font-mono text-[10px]">
                        Sıralamak için “Tümü” filtresine geç
                    </span>
                )}
            </div>

            {loading ? (
                <ul className="space-y-2">
                    {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="bg-surface h-[72px] animate-pulse rounded-xl" />
                    ))}
                </ul>
            ) : visible.length === 0 ? (
                <div className="border-line rounded-2xl border border-dashed py-20 text-center">
                    <p className="text-muted text-sm">Bu filtrede proje yok.</p>
                    <Link
                        to="/admin/projects/new"
                        className="text-accent mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase hover:underline"
                    >
                        <Plus size={13} /> İlk projeyi ekle
                    </Link>
                </div>
            ) : sortable ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={visible.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                        <ul className="space-y-2">
                            {visible.map((project) => (
                                <SortableRow
                                    key={project.id}
                                    project={project}
                                    onToggleStatus={toggleStatus}
                                    onToggleFeatured={toggleFeatured}
                                    onDelete={setPendingDelete}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            ) : (
                <ul className="space-y-2">
                    {visible.map((project) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            onToggleStatus={toggleStatus}
                            onToggleFeatured={toggleFeatured}
                            onDelete={setPendingDelete}
                        />
                    ))}
                </ul>
            )}

            <p className="text-faint mt-6 flex items-center gap-2 font-mono text-[10px]">
                <ExternalLink size={11} />
                Yalnızca “Yayında” projeler herkese açık sitede görünür.
            </p>

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                busy={deleting}
                title="Proje silinsin mi?"
                body={`“${
                    pendingDelete?.content?.tr?.title || pendingDelete?.slug || ''
                }” kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    )
}
