import Reveal from '../components/ui/Reveal'
import Journey from '../components/home/Journey'
import Stack from '../components/home/Stack'
import FocusAreas from '../components/home/FocusAreas'
import ContactBlock from '../components/home/ContactBlock'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function About() {
    const { t, pick } = useLanguage()
    useDocumentTitle(t('about.title'))

    return (
        <>
            <section className="relative overflow-hidden">
                <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />
                <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-14 sm:px-8 sm:pt-32">
                    <Reveal>
                        <div className="label-mono mb-3 flex items-center gap-2">
                            <span className="bg-accent inline-block h-px w-6" />
                            {t('about.label')}
                        </div>
                        <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
                            {t('about.title')}
                        </h1>
                    </Reveal>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                        <Reveal delay={0.08}>
                            <div className="border-line relative aspect-[4/5] overflow-hidden rounded-2xl border">
                                <img
                                    src={profile.portrait}
                                    alt={profile.name}
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="border-line text-muted mt-6 space-y-2 border-t pt-6 font-mono text-xs">
                                <div className="flex justify-between gap-4">
                                    <span className="text-faint">{t('contact.locationLabel')}</span>
                                    <span>{pick(profile.location)}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-faint">{t('contact.emailLabel')}</span>
                                    <a href={`mailto:${profile.email}`} className="hover:text-accent transition">
                                        {profile.email}
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <div>
                            <Reveal delay={0.12}>
                                <p className="text-xl leading-[1.35] font-semibold sm:text-2xl">
                                    {pick(profile.intro)}
                                </p>
                            </Reveal>
                            <div className="mt-6 space-y-4">
                                {pick(profile.manifesto).map((paragraph, index) => (
                                    <Reveal key={index} delay={0.16 + index * 0.05}>
                                        <p className="text-muted leading-relaxed">{paragraph}</p>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Journey label={t('about.label')} title={t('about.journeyTitle')} />
            <FocusAreas />
            <Stack label={t('about.label')} title={t('about.stackTitle')} />
            <ContactBlock />
        </>
    )
}
