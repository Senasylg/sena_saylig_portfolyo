import { MapPin, BookOpen, ArrowRight, Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'
import courseGroups from '../../data/courses'

/** Kartların sırayla aldığı vurgu renkleri. */
const CARD_COLORS = [
    'var(--cat-ai)',
    'var(--cat-software)',
    'var(--cat-web)',
    'var(--cat-optimization)',
    'var(--cat-design)',
    'var(--cat-research)',
]

/** Eğitim ve staj geçmişi — kart tabanlı zaman çizelgesi. */
export default function Journey({ label, title }) {
    const { t, pick } = useLanguage()

    return (
        <section className="border-line bg-elev/40 border-y">
            <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
                <SectionHeading
                    label={label || t('home.journeyLabel')}
                    title={title || t('home.journeyTitle')}
                />

                <div className="grid gap-4 lg:grid-cols-3">
                    {profile.journey.map((item, index) => (
                        <Reveal key={item.id} delay={index * 0.06}>
                            <article
                                style={{ '--cat': CARD_COLORS[index % CARD_COLORS.length] }}
                                className="border-line bg-bg card-hover relative h-full overflow-hidden rounded-2xl border p-5"
                            >
                                {/* Kartın üstünde ince renk şeridi */}
                                <span
                                    className="absolute inset-x-0 top-0 h-1"
                                    style={{ background: 'var(--cat)' }}
                                    aria-hidden
                                />
                                <div className="mt-1 mb-3 flex items-center justify-between gap-3">
                                    <span className="label-mono">{pick(item.period)}</span>
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{ background: 'var(--cat)' }}
                                    />
                                </div>
                                <div className="cat-text text-sm font-semibold">{item.org}</div>
                                {pick(item.location)?.trim() && (
                                    <div className="text-faint mt-1 flex items-center gap-1.5 text-xs">
                                        <MapPin size={12} className="shrink-0" />
                                        {pick(item.location)}
                                    </div>
                                )}
                                <h3 className="mt-1.5 text-lg leading-snug font-semibold">
                                    {pick(item.title)}
                                </h3>
                                {pick(item.body)?.trim() && (
                                    <p className="text-muted mt-2.5 text-[15px] leading-relaxed">
                                        {pick(item.body)}
                                    </p>
                                )}
                                {/* Öne çıkan maddeler (şu an yalnızca eğitim kartlarında) */}
                                {item.highlights?.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {item.highlights.map((h) => (
                                            <li
                                                key={pick(h)}
                                                className="text-muted flex items-start gap-2.5 text-sm leading-relaxed"
                                            >
                                                <Check
                                                    size={14}
                                                    className="text-accent-hi mt-1 shrink-0"
                                                />
                                                {pick(h)}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Eğitim kartlarında o bölümün ders sayısı ve listeye bağlantı */}
                                {item.coursesGroup && (
                                    <a
                                        href="#dersler"
                                        className="border-line hover:border-accent hover:text-accent text-muted group mt-4 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors"
                                    >
                                        <BookOpen size={15} className="text-accent-hi shrink-0" />
                                        <span className="flex-1">
                                            {t(
                                                'courses.departmentCount',
                                                courseGroups.find((g) => g.id === item.coursesGroup)
                                                    ?.courses.length ?? 0,
                                            )}
                                        </span>
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </a>
                                )}
                                {item.tags.length > 0 && (
                                    <div className="border-line mt-4 flex flex-wrap gap-1.5 border-t pt-4">
                                        {item.tags.map((tag) => {
                                            // Etiket düz metin ya da { tr, en } olabilir.
                                            const label = typeof tag === 'string' ? tag : pick(tag)
                                            return (
                                                <span
                                                    key={label}
                                                    className="border-line bg-surface text-muted rounded-md border px-2 py-1 font-mono text-[10.5px]"
                                                >
                                                    {label}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )}
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
