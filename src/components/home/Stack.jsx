import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { useLanguage } from '../../context/LanguageContext'
import profile from '../../data/profile'

const ACCENTS = ['var(--cat-design)', 'var(--cat-simulation)', 'var(--cat-software)', 'var(--cat-web)']

/** Araç listesi. Eski sitedeki yüzde barları bilerek kaldırıldı (CV hissi veriyordu). */
export default function Stack({ label, title }) {
    const { t, pick } = useLanguage()

    return (
        <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
            <SectionHeading label={label || t('home.stackLabel')} title={title || t('home.stackTitle')} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {profile.stack.map((group, index) => (
                    <Reveal key={group.group.en} delay={index * 0.05}>
                        <div
                            style={{ '--cat': ACCENTS[index % ACCENTS.length] }}
                            className="border-line bg-elev h-full rounded-2xl border p-5"
                        >
                            <div className="border-line mb-4 flex items-center gap-2 border-b pb-3">
                                <span className="cat-text text-sm font-semibold">{pick(group.group)}</span>
                                <span className="text-faint ml-auto font-mono text-[11px]">
                                    {group.items.length}
                                </span>
                            </div>
                            <ul className="flex flex-wrap gap-1.5">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="border-line bg-surface text-muted rounded-md border px-2.5 py-1.5 font-mono text-[11px]"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
