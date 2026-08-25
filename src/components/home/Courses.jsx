import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import courseGroups from '../../data/courses'

const GROUP_ACCENT = {
    core: 'var(--c-accent)',
    computer: 'var(--cat-software)',
    industrial: 'var(--cat-optimization)',
    elective: 'var(--cat-research)',
}

/**
 * Alınan dersler — sekmeli liste.
 *
 * İki bölümde de okunan temel dersler ayrı bir grupta bir kez listeleniyor;
 * bölüm sekmeleri yalnızca o bölüme özgü dersleri gösteriyor.
 */
export default function Courses() {
    const { t, pick } = useLanguage()
    const [active, setActive] = useState(courseGroups[0].id)

    const group = courseGroups.find((g) => g.id === active) || courseGroups[0]
    const total = courseGroups.reduce((sum, g) => sum + g.courses.length, 0)

    return (
        <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
            <SectionHeading
                label={t('courses.label')}
                title={t('courses.title')}
                action={
                    <span className="label-mono flex items-center gap-2">
                        <GraduationCap size={15} />
                        {t('courses.total', total)}
                    </span>
                }
            />

            {/* Grup sekmeleri */}
            <Reveal className="mb-6 flex flex-wrap gap-2">
                {courseGroups.map((item) => {
                    const isActive = item.id === active
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActive(item.id)}
                            style={{ '--cat': GROUP_ACCENT[item.id] }}
                            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
                                isActive
                                    ? 'cat-chip'
                                    : 'border-line text-muted hover:border-line-strong hover:text-ink'
                            }`}
                        >
                            {pick(item.label)}
                            <span className="ml-2 font-mono text-[11px] opacity-60">
                                {item.courses.length}
                            </span>
                        </button>
                    )
                })}
            </Reveal>

            <Reveal key={group.id} style={{ '--cat': GROUP_ACCENT[group.id] }}>
                <p className="text-muted mb-5 max-w-2xl text-[15px] leading-relaxed">
                    {pick(group.note)}
                </p>

                <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                    {group.courses.map((course, index) => (
                        <li
                            key={pick(course)}
                            className="border-line hover:text-ink text-muted flex items-baseline gap-3 border-b py-2.5 text-[15px] transition-colors"
                        >
                            <span className="text-faint shrink-0 font-mono text-[11px]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                                className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                                style={{ background: 'var(--cat)' }}
                                aria-hidden
                            />
                            {pick(course)}
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    )
}
