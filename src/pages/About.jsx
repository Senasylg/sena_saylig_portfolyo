import { Mail, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Journey from '../components/home/Journey'
import Courses from '../components/home/Courses'
import Stack from '../components/home/Stack'
import FocusAreas from '../components/home/FocusAreas'
import ContactBlock from '../components/home/ContactBlock'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function About() {
    const { t, pick } = useLanguage()
    useDocumentTitle(t('about.title'))

    const channels = [
        { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
        { href: profile.github, label: 'github.com/Senasylg', Icon: Github },
        { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
    ]

    return (
        <>
            <section className="grain relative overflow-hidden">
                <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />
                <div
                    className="bg-accent/15 pointer-events-none absolute -top-40 right-0 -z-10 h-[480px] w-[480px] rounded-full blur-[140px]"
                    aria-hidden
                />

                <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-14 sm:px-8 sm:pt-32">
                    <Reveal>
                        <div className="label-mono mb-3 flex items-center gap-2">
                            <span className="bar-gradient inline-block h-[3px] w-8 rounded-full" />
                            {t('about.label')}
                        </div>
                        <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
                            {t('about.title')}
                        </h1>
                    </Reveal>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
                        {/* --------- Portre + iletişim kartı (masaüstünde yapışkan) --------- */}
                        <Reveal className="lg:sticky lg:top-28 lg:self-start">
                            <div className="ring-gradient overflow-hidden rounded-2xl">
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                                    <img
                                        src={profile.portrait}
                                        alt={profile.name}
                                        decoding="async"
                                        className="h-full w-full object-cover object-center"
                                    />
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent"
                                        aria-hidden
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <div className="text-lg font-bold text-white">{profile.name}</div>
                                        <div className="mt-0.5 text-sm text-white/75">{pick(profile.role)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-line bg-elev divide-line mt-4 divide-y rounded-2xl border">
                                <div className="flex items-center gap-3 px-4 py-3.5">
                                    <MapPin size={16} className="text-accent-hi shrink-0" />
                                    <span className="text-muted text-sm">{pick(profile.location)}</span>
                                </div>
                                {channels.map(({ href, label, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="group hover:bg-surface/60 flex items-center gap-3 px-4 py-3.5 transition-colors"
                                    >
                                        <Icon size={16} className="text-accent-hi shrink-0" />
                                        <span className="text-muted group-hover:text-ink flex-1 truncate text-sm transition-colors">
                                            {label}
                                        </span>
                                        <ArrowUpRight
                                            size={13}
                                            className="text-faint opacity-0 transition group-hover:opacity-100"
                                        />
                                    </a>
                                ))}
                            </div>
                        </Reveal>

                        {/* --------- Metin --------- */}
                        <div>
                            <Reveal delay={0.08}>
                                <p className="text-2xl leading-[1.3] font-bold tracking-[-0.02em] sm:text-3xl">
                                    {pick(profile.intro)}
                                </p>
                            </Reveal>

                            <div className="mt-8 space-y-6">
                                {pick(profile.manifesto).map((paragraph, index) => (
                                    <Reveal key={index} delay={0.12 + index * 0.05}>
                                        <div className="flex gap-5">
                                            <span className="text-faint mt-1.5 hidden shrink-0 font-mono text-[11px] sm:block">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <p className="text-muted max-w-2xl leading-relaxed">{paragraph}</p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            {/* Disiplin kartları */}
                            <Reveal delay={0.3}>
                                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                                    {profile.disciplines.map((item) => (
                                        <div
                                            key={item.no}
                                            className="border-line bg-elev flex items-center gap-4 rounded-xl border p-4"
                                        >
                                            <span className="text-accent-hi font-mono text-sm font-semibold">
                                                {item.no}
                                            </span>
                                            <span className="font-semibold tracking-[0.03em] uppercase">
                                                {pick(item)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <Journey label={t('about.label')} title={t('about.journeyTitle')} />
            <Courses />
            <FocusAreas />
            <Stack label={t('about.label')} title={t('about.stackTitle')} />
            <ContactBlock />
        </>
    )
}
