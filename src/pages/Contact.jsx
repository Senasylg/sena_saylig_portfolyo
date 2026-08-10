import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Phone, Send, Check, ArrowUpRight } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'
import { sendMessage } from '../lib/projectsRepo'
import { isSupabaseConfigured } from '../lib/supabase'
import { isValidEmail } from '../lib/validate'
import profile from '../data/profile'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
    const { t, pick } = useLanguage()
    useDocumentTitle(t('contact.title'))

    const [values, setValues] = useState(EMPTY)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle') // idle | sending | sent | error
    const [honeypot, setHoneypot] = useState('')

    const channels = [
        { key: 'email', Icon: Mail, label: t('contact.emailLabel'), value: profile.email, href: `mailto:${profile.email}` },
        { key: 'location', Icon: MapPin, label: t('contact.locationLabel'), value: pick(profile.location), href: profile.mapsUrl },
        { key: 'github', Icon: Github, label: 'GitHub', value: 'Senasylg', href: profile.github },
        { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn', value: profile.name, href: profile.linkedin },
        ...(profile.showPhone
            ? [{ key: 'phone', Icon: Phone, label: t('contact.phoneLabel'), value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` }]
            : []),
    ]

    function validate() {
        const next = {}
        if (!values.name.trim()) next.name = t('errors.required')
        if (!values.email.trim()) next.email = t('errors.required')
        else if (!isValidEmail(values.email)) next.email = t('errors.invalidEmail')
        if (values.message.trim().length < 10) next.message = t('errors.tooShort')
        setErrors(next)
        return Object.keys(next).length === 0
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (honeypot) return // bot tuzağı: gerçek kullanıcı bu alanı göremez
        if (!validate()) return

        setStatus('sending')
        try {
            await sendMessage(values)
            setStatus('sent')
            setValues(EMPTY)
        } catch {
            setStatus('error')
        }
    }

    function update(field, value) {
        setValues((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
        if (status === 'sent' || status === 'error') setStatus('idle')
    }

    const fieldClass = (field) =>
        `w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-faint ${
            errors[field] ? 'border-danger' : 'border-line focus:border-accent'
        }`

    return (
        <div className="relative overflow-hidden">
            <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />
            <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
                <Reveal>
                    <div className="label-mono mb-3 flex items-center gap-2">
                        <span className="bg-accent inline-block h-px w-6" />
                        {t('contact.label')}
                    </div>
                    <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
                        {t('contact.title')}
                    </h1>
                    <p className="text-muted mt-4 max-w-xl leading-relaxed">{t('contact.subtitle')}</p>
                </Reveal>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                    <Reveal delay={0.08}>
                        <ul className="border-line divide-line divide-y border-y">
                            {channels.map(({ key, Icon, label, value, href }) => (
                                <li key={key}>
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 py-5 transition-colors"
                                    >
                                        <Icon size={17} className="text-faint group-hover:text-accent transition-colors" />
                                        <div className="min-w-0 flex-1">
                                            <div className="label-mono">{label}</div>
                                            <div className="group-hover:text-accent mt-1 truncate text-sm transition-colors">
                                                {value}
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            size={14}
                                            className="text-faint opacity-0 transition group-hover:opacity-100"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal delay={0.14}>
                        {!isSupabaseConfigured ? (
                            <div className="border-line bg-elev rounded-2xl border p-8">
                                <p className="text-muted text-sm leading-relaxed">{t('contact.disabled')}</p>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="bg-ink text-bg hover:bg-accent mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors"
                                >
                                    <Mail size={15} />
                                    {profile.email}
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                {/* Bot tuzağı — ekran okuyucudan ve görünümden gizli */}
                                <input
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                                />

                                <div>
                                    <label htmlFor="name" className="label-mono mb-2 block">
                                        {t('contact.name')}
                                    </label>
                                    <input
                                        id="name"
                                        value={values.name}
                                        onChange={(e) => update('name', e.target.value)}
                                        placeholder={t('contact.namePlaceholder')}
                                        className={fieldClass('name')}
                                    />
                                    {errors.name && <p className="text-danger mt-1.5 text-xs">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="label-mono mb-2 block">
                                        {t('contact.email')}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        onChange={(e) => update('email', e.target.value)}
                                        placeholder={t('contact.emailPlaceholder')}
                                        className={fieldClass('email')}
                                    />
                                    {errors.email && <p className="text-danger mt-1.5 text-xs">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="label-mono mb-2 block">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={7}
                                        value={values.message}
                                        onChange={(e) => update('message', e.target.value)}
                                        placeholder={t('contact.messagePlaceholder')}
                                        className={`${fieldClass('message')} resize-y`}
                                    />
                                    {errors.message && <p className="text-danger mt-1.5 text-xs">{errors.message}</p>}
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="bg-ink text-bg hover:bg-accent inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        {status === 'sent' ? <Check size={15} /> : <Send size={15} />}
                                        {status === 'sending' ? t('contact.sending') : t('contact.send')}
                                    </button>

                                    {status === 'sent' && (
                                        <p className="text-accent-2 text-sm">{t('contact.success')}</p>
                                    )}
                                    {status === 'error' && (
                                        <p className="text-danger text-sm">{t('contact.error')}</p>
                                    )}
                                </div>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
