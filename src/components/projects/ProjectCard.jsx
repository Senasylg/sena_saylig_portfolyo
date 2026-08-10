import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import categoryStyle from '../../lib/categories'

/**
 * Proje kartı.
 * Görsel baskın, kategori kendi renginde, teknolojiler okunur rozetler halinde.
 */
export default function ProjectCard({ project, index = 0, className = '' }) {
    const { t, lang } = useLanguage()
    const content = project.content[lang] || project.content.tr
    const title = content.title || project.slug

    return (
        <Link
            to={`/projects/${project.slug}`}
            style={categoryStyle(project.category)}
            className={`group border-line bg-elev card-hover flex h-full flex-col overflow-hidden rounded-2xl border ${className}`}
        >
            <div className="bg-surface relative aspect-[3/2] w-full overflow-hidden">
                {project.coverImage ? (
                    <img
                        src={project.coverImage}
                        alt={title}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                ) : (
                    <div className="text-faint flex h-full w-full items-center justify-center px-6 text-center font-mono text-xs">
                        {title}
                    </div>
                )}

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="cat-chip rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] uppercase backdrop-blur-md">
                        {t(`categories.${project.category}`)}
                    </span>
                    {project.featured && (
                        <span className="text-warm border-warm/45 bg-warm-soft inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] uppercase backdrop-blur-md">
                            <Star size={9} fill="currentColor" />
                            {t('projects.featured')}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg leading-snug font-semibold sm:text-xl">{title}</h3>

                {content.description && (
                    <p className="text-muted line-clamp-3 text-[15px] leading-relaxed">
                        {content.description}
                    </p>
                )}

                {project.technologies.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="border-line bg-surface text-muted rounded-md border px-2 py-1 font-mono text-[10.5px]"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="text-faint rounded-md px-2 py-1 font-mono text-[10.5px]">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="border-line mt-1 flex items-center justify-between border-t pt-3.5">
                    <span className="cat-text text-sm font-medium">{t('common.viewProject')}</span>
                    <ArrowRight
                        size={16}
                        className="cat-text transition-transform duration-300 group-hover:translate-x-1"
                    />
                </div>
            </div>
        </Link>
    )
}
