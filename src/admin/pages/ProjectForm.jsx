import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, Globe, FileEdit, Eye, AlertCircle, Check, Star } from 'lucide-react'
import MarkdownField from '../components/MarkdownField'
import TechInput from '../components/TechInput'
import CoverUploader from '../components/CoverUploader'
import GalleryUploader from '../components/GalleryUploader'
import {
    EMPTY_PROJECT, createProject, updateProject, getProjectById, isSlugAvailable,
} from '../../lib/projectsRepo'
import { CATEGORIES } from '../../data/seedProjects'
import slugify from '../../lib/slugify'
import { nullifyEmpty, safeUrl } from '../../lib/validate'

const TABS = [
    { id: 'basics', label: 'Temel Bilgiler' },
    { id: 'tr', label: '🇹🇷 Türkçe' },
    { id: 'en', label: '🇬🇧 English' },
    { id: 'media', label: 'Görseller' },
    { id: 'links', label: 'Bağlantılar' },
]

const CONTENT_FIELDS = [
    { key: 'description', label: 'Kısa Açıklama', type: 'text', rows: 3 },
    { key: 'overview', label: 'Genel Bakış', type: 'md' },
    { key: 'problem', label: 'Problem', type: 'md' },
    { key: 'solution', label: 'Yaklaşım / Çözüm', type: 'md' },
    { key: 'methodology', label: 'Metodoloji', type: 'md' },
    { key: 'results', label: 'Sonuçlar', type: 'md' },
    { key: 'challenges', label: 'Zorluklar', type: 'md' },
    { key: 'futureImprovements', label: 'Gelecek Geliştirmeler', type: 'md' },
]

const inputClass =
    'w-full rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-faint'

export default function ProjectForm({ mode }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = mode === 'edit'

    const [project, setProject] = useState(EMPTY_PROJECT)
    const [tab, setTab] = useState('basics')
    const [loading, setLoading] = useState(isEdit)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [saved, setSaved] = useState(false)
    const [slugTouched, setSlugTouched] = useState(isEdit)
    const [slugFree, setSlugFree] = useState(true)

    useEffect(() => {
        document.title = isEdit ? 'Proje düzenle — Yönetim' : 'Yeni proje — Yönetim'
    }, [isEdit])

    useEffect(() => {
        if (!isEdit) return
        let active = true
        getProjectById(id)
            .then((data) => {
                if (!active) return
                if (!data) {
                    setError('Proje bulunamadı.')
                } else {
                    setProject(data)
                }
            })
            .catch((err) => active && setError(err.message))
            .finally(() => active && setLoading(false))
        return () => {
            active = false
        }
    }, [id, isEdit])

    // Slug'ı Türkçe başlıktan türet (kullanıcı elle değiştirene kadar).
    useEffect(() => {
        if (slugTouched) return
        setProject((prev) => ({ ...prev, slug: slugify(prev.content.tr.title) }))
    }, [project.content.tr.title, slugTouched])

    // Slug benzersizliği
    useEffect(() => {
        if (!project.slug) {
            setSlugFree(true)
            return
        }
        let active = true
        const timer = setTimeout(() => {
            isSlugAvailable(project.slug, isEdit ? id : null)
                .then((free) => active && setSlugFree(free))
                .catch(() => active && setSlugFree(true))
        }, 300)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [project.slug, id, isEdit])

    const setField = useCallback((field, value) => {
        setProject((prev) => ({ ...prev, [field]: value }))
        setSaved(false)
    }, [])

    const setContent = useCallback((lang, field, value) => {
        setProject((prev) => ({
            ...prev,
            content: { ...prev.content, [lang]: { ...prev.content[lang], [field]: value } },
        }))
        setSaved(false)
    }, [])

    const problems = useMemo(() => {
        const list = []
        if (!project.content.tr.title.trim()) list.push('Türkçe proje adı zorunlu.')
        if (!project.slug.trim()) list.push('Slug zorunlu.')
        if (!slugFree) list.push('Bu slug başka bir projede kullanılıyor.')
        for (const key of ['githubUrl', 'demoUrl', 'docsUrl']) {
            if (nullifyEmpty(project[key]) && !safeUrl(project[key])) {
                list.push('Bağlantılar http:// veya https:// ile başlamalı.')
                break
            }
        }
        return list
    }, [project, slugFree])

    async function save(nextStatus) {
        if (problems.length > 0) {
            setError(problems[0])
            return
        }
        setError('')
        setSaving(true)

        const payload = {
            ...project,
            status: nextStatus ?? project.status,
            githubUrl: safeUrl(project.githubUrl),
            demoUrl: safeUrl(project.demoUrl),
            docsUrl: safeUrl(project.docsUrl),
            projectDate: nullifyEmpty(project.projectDate),
            // İngilizce başlık boşsa Türkçesine düş — dil değişince başlık kaybolmasın.
            content: {
                ...project.content,
                en: {
                    ...project.content.en,
                    title: project.content.en.title.trim() || project.content.tr.title,
                    description: project.content.en.description.trim() || project.content.tr.description,
                },
            },
        }

        try {
            if (isEdit) {
                const updated = await updateProject(id, payload)
                setProject(updated)
            } else {
                const created = await createProject(payload)
                navigate(`/admin/projects/${created.id}/edit`, { replace: true })
            }
            setSaved(true)
            setTimeout(() => setSaved(false), 2500)
        } catch (err) {
            setError(
                err.message === 'SUPABASE_NOT_CONFIGURED'
                    ? 'Supabase bağlı değil — kaydetmek için .env.local dosyasına anahtarları ekle (docs/SUPABASE_SETUP.md).'
                    : err.message,
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
                <div className="bg-surface h-8 w-48 animate-pulse rounded" />
                <div className="bg-surface mt-6 h-64 animate-pulse rounded-xl" />
            </div>
        )
    }

    const published = project.status === 'published'

    return (
        <div className="mx-auto max-w-3xl px-5 py-8 pb-28 sm:px-8 sm:py-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <Link
                    to="/admin/projects"
                    className="text-muted hover:text-ink inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase transition"
                >
                    <ArrowLeft size={14} />
                    Projeler
                </Link>

                <div className="flex items-center gap-2">
                    {isEdit && (
                        <Link
                            to={`/admin/projects/${id}/preview`}
                            className="border-line hover:bg-surface inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition"
                        >
                            <Eye size={15} />
                            Önizle
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={() => save('draft')}
                        disabled={saving}
                        className="border-line hover:bg-surface inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition disabled:opacity-50"
                    >
                        <Save size={15} />
                        Taslak kaydet
                    </button>
                    <button
                        type="button"
                        onClick={() => save(published ? 'draft' : 'published')}
                        disabled={saving}
                        className="bg-ink text-bg hover:bg-accent inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {published ? <FileEdit size={15} /> : <Globe size={15} />}
                        {published ? 'Yayından kaldır' : 'Yayınla'}
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-medium tracking-tight">
                {project.content.tr.title || (isEdit ? 'Proje' : 'Yeni Proje')}
            </h1>
            <div className="text-faint mt-1.5 flex items-center gap-2 font-mono text-[11px]">
                <span
                    className={`rounded-full border px-2 py-0.5 ${
                        published ? 'border-emerald-500/30 text-emerald-500' : 'border-warn/40 text-warn'
                    }`}
                >
                    {published ? 'Yayında' : 'Taslak'}
                </span>
                {project.slug && <span>/projects/{project.slug}</span>}
            </div>

            {error && (
                <div className="border-danger/30 bg-danger/10 text-danger mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-sm">
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {saved && (
                <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-500">
                    <Check size={15} />
                    Kaydedildi.
                </div>
            )}

            <div className="border-line mt-7 mb-7 flex gap-1 overflow-x-auto border-b">
                {TABS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setTab(item.id)}
                        className={`shrink-0 border-b-2 px-3.5 py-2.5 text-sm transition-colors ${
                            tab === item.id
                                ? 'border-accent text-ink'
                                : 'text-muted hover:text-ink border-transparent'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* ---------------- Temel bilgiler ---------------- */}
            {tab === 'basics' && (
                <div className="space-y-6">
                    <div>
                        <label htmlFor="slug" className="label-mono mb-2 block">
                            Slug (URL)
                        </label>
                        <input
                            id="slug"
                            value={project.slug}
                            onChange={(e) => {
                                setSlugTouched(true)
                                setField('slug', slugify(e.target.value))
                            }}
                            placeholder="proje-adi"
                            className={`${inputClass} font-mono ${!slugFree ? 'border-danger' : ''}`}
                        />
                        {!slugFree && (
                            <p className="text-danger mt-1.5 text-xs">Bu slug zaten kullanılıyor.</p>
                        )}
                        {!slugTouched && (
                            <p className="text-faint mt-1.5 text-xs">Türkçe başlıktan otomatik üretiliyor.</p>
                        )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="category" className="label-mono mb-2 block">
                                Kategori
                            </label>
                            <select
                                id="category"
                                value={project.category}
                                onChange={(e) => setField('category', e.target.value)}
                                className={inputClass}
                            >
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="date" className="label-mono mb-2 block">
                                Proje Tarihi (opsiyonel)
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={project.projectDate || ''}
                                onChange={(e) => setField('projectDate', e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <TechInput
                        value={project.technologies}
                        onChange={(next) => setField('technologies', next)}
                    />

                    <label className="border-line hover:bg-surface/50 flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition">
                        <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => setField('featured', e.target.checked)}
                            className="accent-accent h-4 w-4"
                        />
                        <Star size={15} className={project.featured ? 'text-accent' : 'text-faint'} />
                        <span className="text-sm">
                            Öne çıkar
                            <span className="text-faint block font-mono text-[10px]">
                                Ana sayfada büyük kartla gösterilir
                            </span>
                        </span>
                    </label>
                </div>
            )}

            {/* ---------------- İçerik (TR / EN) ---------------- */}
            {(tab === 'tr' || tab === 'en') && (
                <div className="space-y-6">
                    <div>
                        <label htmlFor={`title-${tab}`} className="label-mono mb-2 block">
                            Proje Adı {tab === 'en' && '(boşsa Türkçesi kullanılır)'}
                        </label>
                        <input
                            id={`title-${tab}`}
                            value={project.content[tab].title}
                            onChange={(e) => setContent(tab, 'title', e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {CONTENT_FIELDS.map((field) =>
                        field.type === 'text' ? (
                            <div key={field.key}>
                                <label htmlFor={`${field.key}-${tab}`} className="label-mono mb-2 block">
                                    {field.label}
                                </label>
                                <textarea
                                    id={`${field.key}-${tab}`}
                                    rows={field.rows}
                                    value={project.content[tab][field.key]}
                                    onChange={(e) => setContent(tab, field.key, e.target.value)}
                                    placeholder="Kartlarda ve detay sayfasının girişinde görünür."
                                    className={`${inputClass} resize-y`}
                                />
                            </div>
                        ) : (
                            <MarkdownField
                                key={`${field.key}-${tab}`}
                                label={field.label}
                                value={project.content[tab][field.key]}
                                onChange={(value) => setContent(tab, field.key, value)}
                                placeholder="Markdown kullanabilirsin. Boş bırakırsan bu bölüm sitede görünmez."
                            />
                        ),
                    )}
                </div>
            )}

            {/* ---------------- Görseller ---------------- */}
            {tab === 'media' && (
                <div className="space-y-8">
                    <CoverUploader
                        url={project.coverImage}
                        path={project.coverPath}
                        folder={project.slug || 'proje'}
                        onChange={({ url, path }) =>
                            setProject((prev) => ({ ...prev, coverImage: url, coverPath: path }))
                        }
                    />
                    <GalleryUploader
                        images={project.gallery}
                        folder={project.slug || 'proje'}
                        onChange={(next) => setField('gallery', next)}
                    />
                </div>
            )}

            {/* ---------------- Bağlantılar ---------------- */}
            {tab === 'links' && (
                <div className="space-y-5">
                    <p className="text-faint font-mono text-[11px]">
                        Boş bıraktığın bağlantılar sitede buton olarak hiç görünmez.
                    </p>
                    {[
                        { key: 'githubUrl', label: 'GitHub URL' },
                        { key: 'demoUrl', label: 'Canlı Demo URL' },
                        { key: 'docsUrl', label: 'Dokümantasyon URL' },
                    ].map((field) => (
                        <div key={field.key}>
                            <label htmlFor={field.key} className="label-mono mb-2 block">
                                {field.label}
                            </label>
                            <input
                                id={field.key}
                                type="url"
                                value={project[field.key] || ''}
                                onChange={(e) => setField(field.key, e.target.value)}
                                placeholder="https://"
                                className={`${inputClass} font-mono text-[13px]`}
                            />
                        </div>
                    ))}
                </div>
            )}

            {problems.length > 0 && (
                <ul className="text-faint mt-8 space-y-1 font-mono text-[11px]">
                    {problems.map((problem) => (
                        <li key={problem}>• {problem}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
