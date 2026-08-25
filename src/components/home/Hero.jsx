import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Github, Linkedin, Mail, MapPin, GraduationCap } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

/**
 * Hero.
 *
 * Klasik "Hello, I'm X, a passionate engineer" klişesinden kaçınıldı; bunun
 * yerine isim + tek cümlelik tanım, yanında kompakt bilgi kartı ve altında
 * gerçek verilerden hesaplanan sayaç şeridi var.
 */
export default function Hero({ projectCount = 0 }) {
    const { t, pick } = useLanguage()
    const reduced = useReducedMotion()
    const tagline = pick(profile.tagline)
    const [typed, setTyped] = useState(reduced ? tagline : '')

    useEffect(() => {
        if (reduced) {
            setTyped(tagline)
            return
        }
        setTyped('')
        let index = 0
        const timer = setInterval(() => {
            index += 1
            setTyped(tagline.slice(0, index))
            if (index >= tagline.length) clearInterval(timer)
        }, 24)
        return () => clearInterval(timer)
    }, [tagline, reduced])

    // Sayaçlar mevcut gerçek veriden türetiliyor — sabit/uydurma sayı yok.
    const stats = [
        { value: projectCount || profile.stack.length, label: t('hero.statProjects') },
        {
            value: profile.journey.filter((item) => item.kind === 'internship').length,
            label: t('hero.statInternships'),
        },
        { value: profile.focus.length, label: t('hero.statFocus') },
        { value: 2, label: t('hero.statMajors') },
    ]

    const marquee = [...profile.disciplines, ...profile.disciplines]

    const fade = (delay = 0) =>
        reduced
            ? {}
            : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
              }

    return (
        <section className="grain relative overflow-hidden pt-28 pb-0 sm:pt-32">
            <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />
            <div
                className="bg-accent/18 pointer-events-none absolute -top-32 -right-24 -z-10 h-[460px] w-[460px] rounded-full blur-[130px]"
                aria-hidden
            />
            <div
                className="bg-warm/10 pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full blur-[140px]"
                aria-hidden
            />

            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
                    {/* --------- Sol: isim + tanım + CTA --------- */}
                    <div>
                        <motion.div className="label-mono mb-5 flex items-center gap-2.5" {...fade(0)}>
                            <span className="bg-accent-hi inline-block h-2 w-2 rounded-full" />
                            {pick(profile.role)}
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.035em]"
                            {...fade(0.05)}
                        >
                            Sena
                            <br />
                            <span className="text-gradient">Şaylıg</span>
                        </motion.h1>

                        <motion.p
                            className="text-muted mt-6 max-w-xl font-mono text-[15px] leading-relaxed"
                            {...fade(0.15)}
                        >
                            {typed}
                            <span className="text-accent-hi animate-caret">_</span>
                        </motion.p>

                        <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...fade(0.25)}>
                            <MagneticButton to="/projects">
                                {t('hero.cta')}
                                <ArrowRight size={16} />
                            </MagneticButton>
                            <MagneticButton to="/about" variant="outline">
                                {t('hero.secondary')}
                            </MagneticButton>
                            <div className="flex items-center gap-1">
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-muted hover:text-accent hover:bg-surface rounded-full p-2.5 transition-colors"
                                >
                                    <Github size={19} />
                                </a>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-muted hover:text-accent hover:bg-surface rounded-full p-2.5 transition-colors"
                                >
                                    <Linkedin size={19} />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* --------- Sağ: kimlik kartı --------- */}
                    <motion.aside
                        className="ring-gradient bg-elev/70 rounded-2xl p-5 backdrop-blur-md sm:p-6"
                        {...fade(0.2)}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={profile.portrait}
                                alt={profile.name}
                                className="border-line h-16 w-16 rounded-xl border object-cover object-center"
                                decoding="async"
                            />
                            <div className="min-w-0">
                                <div className="text-base font-semibold">{profile.name}</div>
                                <div className="text-muted mt-0.5 truncate text-sm">{pick(profile.role)}</div>
                            </div>
                        </div>

                        <ul className="border-line mt-5 space-y-3 border-t pt-5 text-sm">
                            <li className="flex items-center gap-3">
                                <GraduationCap size={16} className="text-accent-hi shrink-0" />
                                <span className="text-muted">Balıkesir Üniversitesi</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-accent-hi shrink-0" />
                                <span className="text-muted">{pick(profile.location)}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-accent-hi shrink-0" />
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="text-muted hover:text-accent truncate transition-colors"
                                >
                                    {profile.email}
                                </a>
                            </li>
                        </ul>

                        <div className="border-line mt-5 grid grid-cols-4 gap-2 border-t pt-5">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-accent text-xl font-bold">{stat.value}</div>
                                    <div className="text-faint mt-0.5 text-[11px] leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* --------- Disiplin şeridi --------- */}
            <motion.div
                className="border-line mt-12 overflow-hidden border-y py-3.5"
                {...fade(0.4)}
            >
                <div className={`flex w-max gap-10 ${reduced ? '' : 'animate-marquee'}`}>
                    {marquee.map((item, i) => (
                        <div key={`${item.no}-${i}`} className="flex shrink-0 items-baseline gap-2.5">
                            <span className="text-accent-hi font-mono text-[11px] font-medium">{item.no}</span>
                            <span className="text-base font-semibold tracking-[0.04em] uppercase">
                                {pick(item)}
                            </span>
                            <span className="text-faint">/</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
