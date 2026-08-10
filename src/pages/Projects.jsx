import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import ProjectCard from '../components/projects/ProjectCard'
import CategoryFilter from '../components/projects/CategoryFilter'
import Reveal from '../components/ui/Reveal'
import { usePublishedProjects } from '../lib/useProjects'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
    const { t, lang } = useLanguage()
    const { projects, loading } = usePublishedProjects()
    const [category, setCategory] = useState('all')
    const [query, setQuery] = useState('')

    useDocumentTitle(t('projects.title'))

    // Yalnızca gerçekten proje bulunan kategorileri göster.
    const categories = useMemo(
        () => [...new Set(projects.map((p) => p.category))].filter(Boolean),
        [projects],
    )

    const counts = useMemo(() => {
        const map = { all: projects.length }
        for (const project of projects) {
            map[project.category] = (map[project.category] || 0) + 1
        }
        return map
    }, [projects])

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase('tr')
        return projects.filter((project) => {
            if (category !== 'all' && project.category !== category) return false
            if (!q) return true
            const content = project.content[lang] || project.content.tr
            const haystack = [
                content.title,
                content.description,
                ...project.technologies,
                t(`categories.${project.category}`),
            ]
                .join(' ')
                .toLocaleLowerCase('tr')
            return haystack.includes(q)
        })
    }, [projects, category, query, lang, t])

    const hasFilters = category !== 'all' || query.trim() !== ''

    return (
        <div className="relative">
            <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />

            <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
                <Reveal>
                    <div className="label-mono mb-3 flex items-center gap-2">
                        <span className="bg-accent inline-block h-px w-6" />
                        {t('projects.label')}
                    </div>
                    <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
                        {t('projects.title')}
                    </h1>
                    <p className="text-muted mt-4 max-w-xl leading-relaxed">{t('projects.subtitle')}</p>
                </Reveal>

                <Reveal
                    delay={0.06}
                    className="border-line mt-9 flex flex-wrap items-center gap-4 border-y py-4"
                >
                    <CategoryFilter
                        categories={categories}
                        value={category}
                        onChange={setCategory}
                        counts={counts}
                    />

                    <div className="border-line focus-within:border-accent ml-auto flex items-center gap-2 rounded-lg border px-3.5 py-2 transition-colors">
                        <Search size={15} className="text-faint" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('projects.searchPlaceholder')}
                            className="placeholder:text-faint w-44 bg-transparent text-sm outline-none sm:w-56"
                            aria-label={t('common.search')}
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                aria-label={t('common.clearFilters')}
                                className="text-faint hover:text-ink transition"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </Reveal>

                {loading ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-surface h-[420px] animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="text-muted">
                            {projects.length === 0 ? t('projects.empty') : t('projects.emptyFiltered')}
                        </p>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={() => {
                                    setCategory('all')
                                    setQuery('')
                                }}
                                className="text-accent mt-4 font-mono text-xs tracking-[0.1em] uppercase hover:underline"
                            >
                                {t('common.clearFilters')}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((project, index) => (
                            <Reveal key={project.id} delay={Math.min(index, 5) * 0.05}>
                                <ProjectCard project={project} index={index} />
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
