import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

export default function ContactBlock() {
    const { t } = useLanguage()

    const links = [
        { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
        { href: profile.github, label: 'github.com/Senasylg', Icon: Github },
        { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
    ]

    return (
        <section className="border-line bg-elev/40 relative overflow-hidden border-t">
            <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
            <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
                <Reveal>
                    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                            <div className="label-mono mb-4 flex items-center gap-2">
                                <span className="bg-accent inline-block h-px w-6" />
                                {t('home.contactLabel')}
                            </div>
                            <h2 className="max-w-2xl text-3xl leading-[1.1] font-bold sm:text-5xl">
                                {t('home.contactTitle')}
                            </h2>
                            <p className="text-muted mt-5 max-w-lg leading-relaxed">{t('home.contactBody')}</p>
                            <div className="mt-7">
                                <MagneticButton to="/contact">
                                    {t('nav.contact')}
                                    <ArrowRight size={16} />
                                </MagneticButton>
                            </div>
                        </div>

                        <ul className="border-line bg-bg divide-line divide-y rounded-2xl border">
                            {links.map(({ href, label, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="group hover:bg-surface/60 flex items-center gap-3.5 px-5 py-4 transition-colors"
                                    >
                                        <Icon size={17} className="text-accent-hi shrink-0" />
                                        <span className="text-muted group-hover:text-ink flex-1 truncate text-sm transition-colors">
                                            {label}
                                        </span>
                                        <ArrowRight
                                            size={14}
                                            className="text-faint transition-transform group-hover:translate-x-1"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
