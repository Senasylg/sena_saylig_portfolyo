import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, LayoutGrid } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Ana sayfadaki yatay proje şeridi.
 *
 * TÜM yayınlanmış projeler burada listelenir (öne çıkanlar başa alınır).
 * Kaydırma yerel CSS scroll-snap ile yapılır: dokunmatik, trackpad ve
 * fare tekerleği doğal çalışır; ok butonları ve sürükleme ek kolaylıktır.
 */
export default function ProjectCarousel({ projects, loading }) {
    const { t } = useLanguage()
    const trackRef = useRef(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(false)
    const [active, setActive] = useState(0)

    // Öne çıkanlar başta, geri kalanlar mevcut sırasıyla.
    const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

    const syncArrows = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const max = el.scrollWidth - el.clientWidth
        setCanPrev(el.scrollLeft > 8)
        setCanNext(el.scrollLeft < max - 8)

        const card = el.querySelector('[data-card]')
        if (card) {
            const step = card.getBoundingClientRect().width + 20
            setActive(Math.min(ordered.length - 1, Math.round(el.scrollLeft / step)))
        }
    }, [ordered.length])

    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        syncArrows()
        el.addEventListener('scroll', syncArrows, { passive: true })
        window.addEventListener('resize', syncArrows)
        return () => {
            el.removeEventListener('scroll', syncArrows)
            window.removeEventListener('resize', syncArrows)
        }
    }, [syncArrows, projects.length])

    function scrollByCard(direction) {
        const el = trackRef.current
        if (!el) return
        const card = el.querySelector('[data-card]')
        const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
        el.scrollBy({ left: step * direction, behavior: 'smooth' })
    }

    // Fare ile sürükleyerek kaydırma (masaüstü kolaylığı).
    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        let down = false
        let startX = 0
        let startScroll = 0
        let moved = false

        const onDown = (e) => {
            if (e.pointerType !== 'mouse') return
            down = true
            moved = false
            startX = e.clientX
            startScroll = el.scrollLeft
        }
        const onMove = (e) => {
            if (!down) return
            const delta = e.clientX - startX
            if (Math.abs(delta) > 4) moved = true
            el.scrollLeft = startScroll - delta
        }
        const onUp = () => {
            down = false
        }
        // Sürükleme sonrası istemsiz tıklamayı engelle.
        const onClick = (e) => {
            if (moved) {
                e.preventDefault()
                e.stopPropagation()
                moved = false
            }
        }

        el.addEventListener('pointerdown', onDown)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        el.addEventListener('click', onClick, true)
        return () => {
            el.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            el.removeEventListener('click', onClick, true)
        }
    }, [])

    if (!loading && ordered.length === 0) return null

    const arrowClass =
        'flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-30'

    return (
        <section className="py-14 sm:py-20">
            <div className="mx-auto mb-7 flex max-w-[1400px] flex-wrap items-end justify-between gap-5 px-5 sm:px-8">
                <div>
                    <div className="label-mono mb-2.5 flex items-center gap-2">
                        <span className="bg-accent inline-block h-px w-6" />
                        {t('home.workLabel')}
                    </div>
                    <h2 className="text-3xl font-semibold sm:text-4xl">{t('home.workTitle')}</h2>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/projects"
                        className="border-line-strong hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                    >
                        {t('home.workCta')}
                        <ArrowRight size={15} />
                    </Link>
                    <div className="hidden items-center gap-2 sm:flex">
                        <button
                            type="button"
                            onClick={() => scrollByCard(-1)}
                            disabled={!canPrev}
                            aria-label={t('common.prev')}
                            className={arrowClass}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard(1)}
                            disabled={!canNext}
                            aria-label={t('common.next')}
                            className={arrowClass}
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={trackRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8"
                role="region"
                aria-label={t('projects.title')}
                tabIndex={0}
            >
                {loading
                    ? [0, 1, 2].map((i) => (
                          <div
                              key={i}
                              className="bg-surface h-[420px] w-[86%] shrink-0 animate-pulse rounded-2xl sm:w-[48%] lg:w-[32%]"
                          />
                      ))
                    : ordered.map((project, index) => (
                          <div
                              key={project.id}
                              data-card
                              className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
                          >
                              <ProjectCard project={project} index={index} />
                          </div>
                      ))}

                {/* Şeridin sonundaki "hepsini gör" kartı */}
                {!loading && ordered.length > 0 && (
                    <Link
                        to="/projects"
                        className="group border-line hover:border-accent hover:bg-surface/50 flex w-[70%] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed transition-colors sm:w-[38%] lg:w-[26%]"
                    >
                        <span className="border-line group-hover:border-accent group-hover:text-accent text-muted flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
                            <LayoutGrid size={20} />
                        </span>
                        <span className="text-center text-base font-medium">{t('home.workCta')}</span>
                        <span className="label-mono">{t('projects.count', ordered.length)}</span>
                    </Link>
                )}
            </div>

            {/* İlerleme göstergesi */}
            {!loading && ordered.length > 1 && (
                <div className="mx-auto mt-5 flex max-w-[1400px] items-center gap-3 px-5 sm:px-8">
                    <div className="bg-line h-px flex-1">
                        <div
                            className="bg-accent h-px transition-all duration-300"
                            style={{ width: `${((active + 1) / ordered.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-faint font-mono text-[11px]">
                        {String(active + 1).padStart(2, '0')} / {String(ordered.length).padStart(2, '0')}
                    </span>
                </div>
            )}
        </section>
    )
}
