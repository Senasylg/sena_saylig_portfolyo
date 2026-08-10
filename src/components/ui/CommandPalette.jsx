import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
    Home, User, FolderOpen, Mail, Sun, Moon, Languages, Github, Linkedin, CornerDownLeft,
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import profile from '../../data/profile'

/** Ctrl/⌘ + K ile açılan hızlı gezinme paleti. */
export default function CommandPalette({ open, onClose, projects = [] }) {
    const navigate = useNavigate()
    const { t, pick, toggleLang } = useLanguage()
    const { isDark, toggleTheme } = useTheme()
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(0)
    const inputRef = useRef(null)

    const groups = useMemo(() => {
        const q = query.trim().toLocaleLowerCase('tr')
        const match = (label) => !q || label.toLocaleLowerCase('tr').includes(q)

        const pages = [
            { id: 'home', label: t('nav.home'), Icon: Home, run: () => navigate('/') },
            { id: 'about', label: t('nav.about'), Icon: User, run: () => navigate('/about') },
            { id: 'projects', label: t('nav.projects'), Icon: FolderOpen, run: () => navigate('/projects') },
            { id: 'contact', label: t('nav.contact'), Icon: Mail, run: () => navigate('/contact') },
        ].filter((item) => match(item.label))

        const projectItems = projects
            .map((project) => ({
                id: `p-${project.id}`,
                label: pick(
                    { tr: project.content.tr.title, en: project.content.en.title },
                    project.slug,
                ),
                Icon: FolderOpen,
                run: () => navigate(`/projects/${project.slug}`),
            }))
            .filter((item) => match(item.label))
            .slice(0, 6)

        const actions = [
            {
                id: 'theme',
                label: t('palette.theme'),
                Icon: isDark ? Sun : Moon,
                run: toggleTheme,
                keepOpen: true,
            },
            { id: 'lang', label: t('palette.lang'), Icon: Languages, run: toggleLang, keepOpen: true },
            {
                id: 'github',
                label: t('palette.github'),
                Icon: Github,
                run: () => window.open(profile.github, '_blank', 'noopener'),
            },
            {
                id: 'linkedin',
                label: t('palette.linkedin'),
                Icon: Linkedin,
                run: () => window.open(profile.linkedin, '_blank', 'noopener'),
            },
            {
                id: 'email',
                label: t('palette.email'),
                Icon: Mail,
                run: () => {
                    window.location.href = `mailto:${profile.email}`
                },
            },
        ].filter((item) => match(item.label))

        return [
            { title: t('palette.pages'), items: pages },
            { title: t('palette.projects'), items: projectItems },
            { title: t('palette.actions'), items: actions },
        ].filter((group) => group.items.length > 0)
    }, [query, projects, t, pick, navigate, isDark, toggleTheme, toggleLang])

    const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])

    useEffect(() => setActive(0), [query])

    useEffect(() => {
        if (!open) return
        setQuery('')
        setActive(0)
        const id = requestAnimationFrame(() => inputRef.current?.focus())
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            cancelAnimationFrame(id)
            document.body.style.overflow = previousOverflow
        }
    }, [open])

    useEffect(() => {
        if (!open) return
        const handler = (event) => {
            if (event.key === 'Escape') {
                onClose()
            } else if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActive((i) => (i + 1) % Math.max(flat.length, 1))
            } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActive((i) => (i - 1 + flat.length) % Math.max(flat.length, 1))
            } else if (event.key === 'Enter') {
                event.preventDefault()
                const item = flat[active]
                if (item) {
                    item.run()
                    if (!item.keepOpen) onClose()
                }
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, flat, active, onClose])

    if (typeof document === 'undefined') return null

    let runningIndex = -1

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[150] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="border-line bg-elev w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('palette.placeholder')}
                            className="border-line placeholder:text-faint w-full border-b bg-transparent px-5 py-4 text-[15px] outline-none"
                        />

                        <div className="max-h-[52vh] overflow-y-auto p-2">
                            {flat.length === 0 && (
                                <p className="text-faint px-4 py-8 text-center text-sm">{t('palette.empty')}</p>
                            )}
                            {groups.map((group) => (
                                <div key={group.title} className="mb-1">
                                    <div className="label-mono px-3 py-2">{group.title}</div>
                                    {group.items.map((item) => {
                                        runningIndex += 1
                                        const index = runningIndex
                                        const isActive = index === active
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onMouseEnter={() => setActive(index)}
                                                onClick={() => {
                                                    item.run()
                                                    if (!item.keepOpen) onClose()
                                                }}
                                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                                    isActive ? 'bg-surface text-ink' : 'text-muted'
                                                }`}
                                            >
                                                <item.Icon size={15} className={isActive ? 'text-accent' : ''} />
                                                <span className="flex-1 truncate">{item.label}</span>
                                                {isActive && <CornerDownLeft size={13} className="text-faint" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    )
}
