import { useState } from 'react'
import { X, Plus } from 'lucide-react'

/** Teknoloji etiketleri: Enter ile ekle, × ile sil, Backspace ile sonuncuyu sil. */
export default function TechInput({ value = [], onChange }) {
    const [draft, setDraft] = useState('')

    function add() {
        const tech = draft.trim()
        if (!tech) return
        if (value.some((t) => t.toLocaleLowerCase('tr') === tech.toLocaleLowerCase('tr'))) {
            setDraft('')
            return
        }
        onChange([...value, tech])
        setDraft('')
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault()
            add()
        } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
            onChange(value.slice(0, -1))
        }
    }

    return (
        <div>
            <span className="label-mono mb-2 block">Teknolojiler</span>
            <div className="border-line focus-within:border-accent flex flex-wrap items-center gap-2 rounded-xl border p-2.5 transition-colors">
                {value.map((tech) => (
                    <span
                        key={tech}
                        className="bg-surface text-ink inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11px]"
                    >
                        {tech}
                        <button
                            type="button"
                            onClick={() => onChange(value.filter((t) => t !== tech))}
                            aria-label={`${tech} kaldır`}
                            className="text-faint hover:text-danger transition"
                        >
                            <X size={11} />
                        </button>
                    </span>
                ))}
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={add}
                    placeholder={value.length === 0 ? 'Python, React, SOLIDWORKS…' : ''}
                    className="placeholder:text-faint min-w-[140px] flex-1 bg-transparent px-1 py-1 text-sm outline-none"
                />
                <button
                    type="button"
                    onClick={add}
                    aria-label="Ekle"
                    className="text-faint hover:text-ink hover:bg-surface rounded-lg p-1.5 transition"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    )
}
