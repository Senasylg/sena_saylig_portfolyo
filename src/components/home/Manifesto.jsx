import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

export default function Manifesto() {
    const { t, pick } = useLanguage()

    return (
        <section className="border-line bg-elev/40 border-y">
            <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
                <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                    <Reveal>
                        <div className="label-mono mb-4 flex items-center gap-2">
                            <span className="bg-accent inline-block h-px w-6" />
                            {t('home.aboutLabel')}
                        </div>
                        <div className="border-line relative aspect-[4/5] max-w-xs overflow-hidden rounded-2xl border">
                            <img
                                src={profile.portrait}
                                alt={profile.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Reveal>

                    <div>
                        <Reveal delay={0.06}>
                            <h2 className="text-2xl leading-[1.25] font-semibold sm:text-3xl">
                                {pick(profile.intro)}
                            </h2>
                        </Reveal>

                        <div className="mt-6 space-y-4">
                            {pick(profile.manifesto).map((paragraph, index) => (
                                <Reveal key={index} delay={0.1 + index * 0.05}>
                                    <p className="text-muted max-w-2xl text-[16px] leading-relaxed">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.25}>
                            <Link
                                to="/about"
                                className="text-accent group mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                {t('home.aboutCta')}
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
