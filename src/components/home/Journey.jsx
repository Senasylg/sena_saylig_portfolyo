import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

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
                            <article className="border-line bg-bg h-full rounded-2xl border p-5">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <span className="label-mono">{pick(item.period)}</span>
                                    <span className="bg-accent h-2 w-2 rounded-full" />
                                </div>
                                <div className="text-accent text-sm font-semibold">{item.org}</div>
                                <h3 className="mt-1.5 text-lg leading-snug font-semibold">
                                    {pick(item.title)}
                                </h3>
                                {pick(item.body)?.trim() && (
                                    <p className="text-muted mt-2.5 text-[15px] leading-relaxed">
                                        {pick(item.body)}
                                    </p>
                                )}
                                {item.tags.length > 0 && (
                                    <div className="border-line mt-4 flex flex-wrap gap-1.5 border-t pt-4">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="border-line bg-surface text-muted rounded-md border px-2 py-1 font-mono text-[10.5px]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
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
