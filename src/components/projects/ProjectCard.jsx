import { Link } from 'react-router-dom'
import { ArrowUpRight, Star } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import categoryStyle from '../../lib/categories'

/**
 * Proje kartı.
 *
 * Etiketler görselin üstünde durduğu için beyaz/açık görsellerde okunabilirlik
 * sorunu oluşuyordu; bu yüzden görselin üst kısmına koyu bir degrade perde
 * ekleniyor ve etiketler koyu cam görünümlü hap şeklinde veriliyor.
 * Böylece kapak hangi renkte olursa olsun yazılar okunur kalıyor.
 */
export default function ProjectCard({ project, index = 0, className = '' }) {
    const { t, lang } = useLanguage()
    const content = project.content[lang] || project.content.tr
    const title = content.title || project.slug

    return (
        <Link
            to={`/projects/${project.slug}`}
            style={categoryStyle(project.category)}
            className={`group border-line bg-elev card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border ${className}`}
        >
            <div className="bg-surface relative aspect-[3/2] w-full overflow-hidden">
                {project.coverImage ? (
                    <img
                        src={project.coverImage}
                        alt={title}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                ) : (
                    <div className="bg-grid text-faint flex h-full w-full items-center justify-center px-6 text-center font-mono text-xs">
                        {title}
                    </div>
                )}

                {/* Etiketlerin her zaman okunmasını sağlayan perde */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 via-black/35 to-transparent"
                    aria-hidden
                />

                <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-md">
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: 'var(--cat)' }}
                            aria-hidden
                        />
                        {t(`categories.${project.category}`)}
                    </span>
                    {project.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-black/65 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.1em] text-amber-300 uppercase backdrop-blur-md">
                            <Star size={9} fill="currentColor" />
                            {t('projects.featured')}
                        </span>
                    )}
                </div>

                {/* Hover'da beliren ok */}
                <span className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ background: 'var(--cat)' }}>
                    <ArrowUpRight size={17} />
                </span>
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
            </div>

            {/* Alt kenarda kategori renginde, hover'da dolan çizgi */}
            <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: 'var(--cat)' }}
                aria-hidden
            />
        </Link>
    )
}
