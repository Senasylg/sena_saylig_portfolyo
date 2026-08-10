import { useLanguage } from '../../context/LanguageContext'
import categoryStyle from '../../lib/categories'

export default function CategoryFilter({ categories, value, onChange, counts = {} }) {
    const { t } = useLanguage()
    const options = ['all', ...categories]

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const active = value === option
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        style={option === 'all' ? undefined : categoryStyle(option)}
                        className={`rounded-lg border px-3.5 py-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase transition-all ${
                            active
                                ? option === 'all'
                                    ? 'border-accent bg-accent-soft text-accent'
                                    : 'cat-chip'
                                : 'border-line text-muted hover:border-line-strong hover:text-ink'
                        }`}
                    >
                        {option === 'all' ? t('common.all') : t(`categories.${option}`)}
                        {counts[option] != null && (
                            <span className="ml-1.5 opacity-60">{counts[option]}</span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
