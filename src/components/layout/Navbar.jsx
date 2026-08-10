import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import profile from '../../data/profile'

/**
 * Public navigasyon.
 * Admin paneline BİLEREK link konmamıştır (§29/§30).
 */
export default function Navbar({ onOpenPalette }) {
    const { t, lang, toggleLang, otherLang } = useLanguage()
    const { isDark, toggleTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => setOpen(false), [location.pathname])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    const links = [
        { to: '/', label: t('nav.home'), end: true },
        { to: '/about', label: t('nav.about') },
        { to: '/projects', label: t('nav.projects') },
        { to: '/contact', label: t('nav.contact') },
    ]

    const linkClass = ({ isActive }) =>
        `relative py-1 text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
                    scrolled ? 'border-line bg-bg/80 border-b backdrop-blur-xl' : 'border-b border-transparent'
                }`}
            >
                <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:h-18 sm:px-8">
                    <Link to="/" className="group flex items-center gap-2.5" aria-label={profile.name}>
                        <span className="border-line-strong text-accent group-hover:border-accent flex h-8 w-8 items-center justify-center rounded-md border font-mono text-[11px] tracking-tight transition-colors">
                            {profile.initials}
                        </span>
                        <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
                    </Link>

                    <ul className="hidden items-center gap-8 md:flex">
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to} end={link.end} className={linkClass}>
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="nav-underline"
                                                    className="bg-accent absolute -bottom-0.5 left-0 h-px w-full"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={onOpenPalette}
                            aria-label={t('common.search')}
                            className="text-muted hover:text-ink hover:border-line-strong hidden items-center gap-2 rounded-full border border-transparent px-3 py-1.5 transition sm:flex"
                        >
                            <Search size={15} />
                            <kbd className="border-line text-faint rounded border px-1.5 py-0.5 font-mono text-[10px]">
                                ⌘K
                            </kbd>
                        </button>

                        <button
                            type="button"
                            onClick={toggleLang}
                            aria-label={t('common.toggleLang')}
                            className="text-muted hover:text-ink px-2.5 py-2 font-mono text-xs tracking-wider uppercase transition"
                        >
                            <span className="text-ink">{lang}</span>
                            <span className="text-faint"> / {otherLang}</span>
                        </button>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={t('common.toggleTheme')}
                            className="text-muted hover:text-ink p-2 transition"
                        >
                            {isDark ? <Sun size={17} /> : <Moon size={17} />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-label={t('common.openMenu')}
                            className="text-muted hover:text-ink p-2 transition md:hidden"
                        >
                            <Menu size={19} />
                        </button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="bg-bg fixed inset-0 z-[110] flex flex-col md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex h-16 items-center justify-between px-5">
                            <span className="label-mono">{t('nav.menu')}</span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label={t('nav.close')}
                                className="text-muted hover:text-ink p-2"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <ul className="flex flex-1 flex-col justify-center gap-2 px-6 pb-24">
                            {links.map((link, i) => (
                                <motion.li
                                    key={link.to}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                                >
                                    <NavLink
                                        to={link.to}
                                        end={link.end}
                                        className={({ isActive }) =>
                                            `border-line flex items-baseline gap-4 border-b py-5 text-3xl font-light transition-colors ${
                                                isActive ? 'text-accent' : 'text-ink'
                                            }`
                                        }
                                    >
                                        <span className="label-mono">0{i + 1}</span>
                                        {link.label}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
