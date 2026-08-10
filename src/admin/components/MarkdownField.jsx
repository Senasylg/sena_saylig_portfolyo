import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Eye, PenLine, Bold, Italic, List, Link2, Heading2 } from 'lucide-react'

/**
 * Markdown alanı: yazma / önizleme sekmeleri + basit biçimlendirme araç çubuğu.
 *
 * Rich text (TipTap vb.) yerine markdown tercih edildi:
 * react-markdown ham HTML enjekte etmez, dolayısıyla XSS'e kapalıdır ve
 * bundle'a çok daha az yük getirir.
 */
export default function MarkdownField({ label, value, onChange, rows = 8, placeholder }) {
    const [preview, setPreview] = useState(false)
    const id = `md-${label.replace(/\s+/g, '-').toLowerCase()}`

    function wrap(before, after = before) {
        const el = document.getElementById(id)
        if (!el) return
        const { selectionStart: start, selectionEnd: end } = el
        const selected = value.slice(start, end)
        const next = value.slice(0, start) + before + selected + after + value.slice(end)
        onChange(next)
        requestAnimationFrame(() => {
            el.focus()
            el.setSelectionRange(start + before.length, end + before.length)
        })
    }

    const tools = [
        { Icon: Bold, title: 'Kalın', run: () => wrap('**') },
        { Icon: Italic, title: 'İtalik', run: () => wrap('*') },
        { Icon: Heading2, title: 'Başlık', run: () => wrap('## ', '') },
        { Icon: List, title: 'Liste', run: () => wrap('- ', '') },
        { Icon: Link2, title: 'Bağlantı', run: () => wrap('[', '](https://)') },
    ]

    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor={id} className="label-mono">
                    {label}
                </label>
                <div className="flex items-center gap-0.5">
                    {!preview &&
                        tools.map(({ Icon, title, run }) => (
                            <button
                                key={title}
                                type="button"
                                onClick={run}
                                title={title}
                                className="text-faint hover:text-ink hover:bg-surface rounded p-1.5 transition"
                            >
                                <Icon size={13} />
                            </button>
                        ))}
                    <button
                        type="button"
                        onClick={() => setPreview((p) => !p)}
                        className="text-faint hover:text-ink hover:bg-surface ml-1 flex items-center gap-1.5 rounded px-2 py-1.5 font-mono text-[10px] tracking-wider uppercase transition"
                    >
                        {preview ? <PenLine size={12} /> : <Eye size={12} />}
                        {preview ? 'Yaz' : 'Önizle'}
                    </button>
                </div>
            </div>

            {preview ? (
                <div className="border-line bg-surface/40 min-h-[120px] rounded-xl border p-4">
                    {value.trim() ? (
                        <div className="prose-ss text-[15px]">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-faint font-mono text-xs">Boş — bu bölüm sitede görünmeyecek.</p>
                    )}
                </div>
            ) : (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="border-line focus:border-accent placeholder:text-faint w-full resize-y rounded-xl border bg-transparent px-4 py-3 font-mono text-[13px] leading-relaxed outline-none transition-colors"
                />
            )}
        </div>
    )
}
