import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight, Github, ExternalLink, FileText, Maximize2, Star } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Lightbox from '../ui/Lightbox'
import { useLanguage } from '../../context/LanguageContext'
import { safeUrl } from '../../lib/validate'
import categoryStyle from '../../lib/categories'

/**
 * Proje detay görünümü.
 *
 * Hem public `/projects/:slug` sayfası hem de admin önizlemesi bunu kullanır;
 * böylece önizleme birebir gerçek görünümü gösterir.
 *
 * Boş içerik alanları HİÇ render edilmez — doldurulmamış bölümler görünmez.
 */
export default function ProjectDetailView({ project, siblings = [], isPreview = false }) {
    const { t, lang } = useLanguage()
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const content = project.content[lang] || project.content.tr
    const title = content.title || project.slug

    // Kapak görseli galerinin başına eklenir: tek görsel olsa bile galeri boş kalmaz.
    const images = useMemo(() => {
        const gallery = (project.gallery || []).filter((item) => item?.url)
        return project.coverImage ? [{ url: project.coverImage, alt: title }, ...gallery] : gallery
    }, [project.coverImage, project.gallery, title])

    const sections = [
        { key: 'overview', body: content.overview },
        { key: 'problem', body: content.problem },
        { key: 'solution', body: content.solution },
        { key: 'methodology', body: content.methodology },
        { key: 'results', body: content.results },
        { key: 'challenges', body: content.challenges },
        { key: 'futureImprovements', body: content.futureImprovements },
    ].filter((section) => String(section.body || '').trim() !== '')

    // Boş / geçersiz link varsa buton hiç gösterilmez (sahte URL yok).
    const links = [
        { key: 'github', url: safeUrl(project.githubUrl), Icon: Github },
        { key: 'demo', url: safeUrl(project.demoUrl), Icon: ExternalLink },
        { key: 'docs', url: safeUrl(project.docsUrl), Icon: FileText },
    ].filter((link) => Boolean(link.url))

    const index = siblings.findIndex((p) => p.id === project.id)
    const prev = index > 0 ? siblings[index - 1] : null
    const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null

    return (
        <article style={categoryStyle(project.category)} className="pb-8">
            {/* ---------------- Tam genişlik kapak + başlık ---------------- */}
            <header className="relative">
                <div className="bg-surface relative min-h-[52vh] w-full overflow-hidden sm:min-h-[62vh]">
                    {project.coverImage ? (
                        <>
                            <img
                                src={project.coverImage}
                                alt={title}
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/35" />
                            <button
                                type="button"
                                onClick={() => setLightboxIndex(0)}
                                aria-label={title}
                                className="absolute top-24 right-5 rounded-full border border-white/25 bg-black/45 p-2.5 text-white/85 backdrop-blur-md transition hover:bg-black/70 sm:right-8"
                            >
                                <Maximize2 size={16} />
                            </button>
                        </>
                    ) : (
                        <div className="bg-grid absolute inset-0" aria-hidden />
                    )}

                    <div className="relative mx-auto flex min-h-[52vh] max-w-[1400px] flex-col justify-end px-5 pt-28 pb-10 sm:min-h-[62vh] sm:px-8 sm:pb-14">
                        {!isPreview && (
                            <Link
                                to="/projects"
                                className={`group mb-6 inline-flex w-fit items-center gap-2 font-mono text-[11px] font-medium tracking-[0.1em] uppercase transition-colors ${
                                    project.coverImage
                                        ? 'text-white/70 hover:text-white'
                                        : 'text-muted hover:text-accent'
                                }`}
                            >
                                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                                {t('common.backToProjects')}
                            </Link>
                        )}

                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span
                                className={`cat-chip rounded-full border px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.1em] uppercase backdrop-blur-md ${
                                    project.coverImage ? 'bg-black/40' : ''
                                }`}
                            >
                                {t(`categories.${project.category}`)}
                            </span>
                            {project.featured && (
                                <span className="text-warm border-warm/50 inline-flex items-center gap-1.5 rounded-full border bg-black/40 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.1em] uppercase backdrop-blur-md">
                                    <Star size={10} fill="currentColor" />
                                    {t('projects.featured')}
                                </span>
                            )}
                            {project.projectDate && (
                                <span
                                    className={`rounded-full border px-3 py-1.5 font-mono text-[11px] backdrop-blur-md ${
                                        project.coverImage
                                            ? 'border-white/25 bg-black/40 text-white/80'
                                            : 'border-line text-muted'
                                    }`}
                                >
                                    {new Date(project.projectDate).getFullYear()}
                                </span>
                            )}
                        </div>

                        <h1
                            className={`max-w-4xl text-4xl leading-[1.06] font-bold tracking-[-0.03em] sm:text-6xl ${
                                project.coverImage ? 'text-white' : ''
                            }`}
                        >
                            {title}
                        </h1>

                        {content.description && (
                            <p
                                className={`mt-5 max-w-2xl text-lg leading-relaxed ${
                                    project.coverImage ? 'text-white/85' : 'text-muted'
                                }`}
                            >
                                {content.description}
                            </p>
                        )}
                    </div>
                </div>
            </header>

            {/* ---------------- Teknolojiler + bağlantılar şeridi ---------------- */}
            {(project.technologies.length > 0 || links.length > 0) && (
                <div className="border-line bg-elev/60 border-b">
                    <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-5 px-5 py-6 sm:px-8">
                        {project.technologies.length > 0 && (
                            <div className="min-w-0 flex-1">
                                <div className="label-mono mb-2.5">{t('detail.technologies')}</div>
                                <ul className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <li
                                            key={tech}
                                            className="cat-chip rounded-lg border px-3 py-1.5 font-mono text-[12px] font-medium"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {links.length > 0 && (
                            <div>
                                <div className="label-mono mb-2.5">{t('detail.links')}</div>
                                <div className="flex flex-wrap gap-2">
                                    {links.map(({ key, url, Icon }) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border-line-strong hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                                        >
                                            <Icon size={15} />
                                            {t(`detail.${key}`)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
                <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:gap-16">
                    {/* ---------------- İçerik ---------------- */}
                    <div className="min-w-0 max-w-3xl">
                        {sections.map((section, i) => (
                            <Reveal key={section.key} delay={i * 0.04} className="mb-10 last:mb-0">
                                <h2
                                    id={section.key}
                                    className="border-line mb-4 flex items-baseline gap-3 border-b pb-2.5 text-base font-semibold"
                                >
                                    <span className="cat-text font-mono text-[11px]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {t(`detail.${section.key}`)}
                                </h2>
                                <div className="prose-ss">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
                                </div>
                            </Reveal>
                        ))}

                        {/* ---------------- Galeri (kapak dahil) ---------------- */}
                        {images.length > 0 && (
                            <Reveal className={sections.length > 0 ? 'mt-14' : ''}>
                                <h2 className="border-line mb-5 border-b pb-2.5 text-base font-semibold">
                                    {t('detail.gallery')}
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {images.map((image, i) => (
                                        <button
                                            key={image.url}
                                            type="button"
                                            onClick={() => setLightboxIndex(i)}
                                            className={`group border-line bg-surface card-hover relative aspect-[3/2] overflow-hidden rounded-xl border ${
                                                images.length === 1 ? 'sm:col-span-2' : ''
                                            }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.alt || `${title} ${i + 1}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                            />
                                            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                                            <span className="absolute right-3 bottom-3 rounded-full border border-white/25 bg-black/55 p-2 text-white/90 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                                                <Maximize2 size={14} />
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* ---------------- Yan panel ---------------- */}
                    {sections.length > 1 && (
                        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
                            <div className="label-mono border-line mb-3.5 border-b pb-2.5">
                                {t('detail.contents')}
                            </div>
                            <ul className="space-y-2">
                                {sections.map((section, i) => (
                                    <li key={section.key}>
                                        <a
                                            href={`#${section.key}`}
                                            className="text-muted hover:text-accent flex items-baseline gap-2.5 text-sm transition-colors"
                                        >
                                            <span className="text-faint font-mono text-[10px]">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {t(`detail.${section.key}`)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>
            </div>

            {/* ---------------- Önceki / sonraki ---------------- */}
            {!isPreview && (prev || next) && (
                <nav className="border-line mx-auto grid max-w-[1400px] gap-px border-t sm:grid-cols-2">
                    {prev ? (
                        <Link
                            to={`/projects/${prev.slug}`}
                            className="group hover:bg-surface/60 px-5 py-8 transition-colors sm:px-8"
                        >
                            <div className="label-mono mb-1.5 flex items-center gap-2">
                                <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
                                {t('detail.prev')}
                            </div>
                            <div className="group-hover:text-accent text-lg font-semibold transition-colors">
                                {(prev.content[lang] || prev.content.tr).title}
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden sm:block" />
                    )}
                    {next && (
                        <Link
                            to={`/projects/${next.slug}`}
                            className="group border-line hover:bg-surface/60 border-t px-5 py-8 transition-colors sm:border-t-0 sm:border-l sm:px-8 sm:text-right"
                        >
                            <div className="label-mono mb-1.5 flex items-center gap-2 sm:justify-end">
                                {t('detail.next')}
                                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                            </div>
                            <div className="group-hover:text-accent text-lg font-semibold transition-colors">
                                {(next.content[lang] || next.content.tr).title}
                            </div>
                        </Link>
                    )}
                </nav>
            )}

            <Lightbox
                images={images}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
            />
        </article>
    )
}
