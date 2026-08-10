import { ArrowLeft } from 'lucide-react'
import MagneticButton from '../components/ui/MagneticButton'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound({ message }) {
    const { t } = useLanguage()
    useDocumentTitle(t('notFound.title'))

    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 text-center">
            <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
            <div className="text-accent/20 font-mono text-[20vw] leading-none font-bold select-none sm:text-[13vw]">
                404
            </div>
            <h1 className="-mt-4 text-2xl font-bold sm:text-3xl">{t('notFound.title')}</h1>
            <p className="text-muted mt-4 max-w-sm text-sm leading-relaxed">
                {message || t('notFound.body')}
            </p>
            <div className="mt-9">
                <MagneticButton to="/">
                    <ArrowLeft size={15} />
                    {t('notFound.cta')}
                </MagneticButton>
            </div>
        </div>
    )
}
