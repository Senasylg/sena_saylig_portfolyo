import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

export default function Footer() {
    const { t, pick } = useLanguage()
    const year = new Date().getFullYear()

    const sections = [
        { to: '/', label: t('nav.home') },
        { to: '/about', label: t('nav.about') },
        { to: '/projects', label: t('nav.projects') },
        { to: '/contact', label: t('nav.contact') },
    ]

    const elsewhere = [
        { href: profile.github, label: 'GitHub', Icon: Github },
        { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
        { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    ]

    return (
        <footer className="border-line border-t">
            <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-14">
                <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <div className="text-xl font-bold tracking-tight sm:text-2xl">{profile.name}</div>
                        <p className="text-muted mt-3 max-w-sm text-sm leading-relaxed">
                            {pick(profile.tagline)}
                        </p>
                        <p className="text-faint mt-4 font-mono text-xs">{pick(profile.location)}</p>
                    </div>

                    <div>
                        <div className="label-mono mb-4">{t('footer.sections')}</div>
                        <ul className="space-y-2.5">
                            {sections.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="text-muted hover:text-ink text-sm transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="label-mono mb-4">{t('footer.elsewhere')}</div>
                        <ul className="space-y-2.5">
                            {elsewhere.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-ink group inline-flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <item.Icon size={14} />
                                        {item.label}
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-line text-faint mt-14 flex flex-col gap-2 border-t pt-6 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} {profile.name}. {t('footer.rights')}
                    </span>
                    <span>{t('footer.builtWith')}</span>
                </div>
            </div>
        </footer>
    )
}
