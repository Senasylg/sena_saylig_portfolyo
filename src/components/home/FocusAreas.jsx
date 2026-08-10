import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

const ACCENTS = ['var(--cat-design)', 'var(--cat-simulation)', 'var(--cat-software)', 'var(--cat-web)']

export default function FocusAreas() {
    const { t, pick } = useLanguage()

    return (
        <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
            <SectionHeading label={t('home.focusLabel')} title={t('home.focusTitle')} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {profile.focus.map((item, index) => (
                    <Reveal key={item.no} delay={index * 0.05}>
                        <div
                            style={{ '--cat': ACCENTS[index % ACCENTS.length] }}
                            className="border-line bg-elev card-hover h-full rounded-2xl border p-5"
                        >
                            <div className="mb-3 flex items-center gap-2.5">
                                <span className="cat-chip flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs font-semibold">
                                    {item.no}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold">{pick(item.title)}</h3>
                            <p className="text-muted mt-2 text-[15px] leading-relaxed">{pick(item.body)}</p>
                            <div className="border-line mt-4 flex flex-wrap gap-1.5 border-t pt-4">
                                {item.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="border-line bg-surface text-muted rounded-md border px-2 py-1 font-mono text-[10.5px]"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
