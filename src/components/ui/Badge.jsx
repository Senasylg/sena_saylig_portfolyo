export default function Badge({ children, tone = 'neutral', className = '' }) {
    const tones = {
        neutral: 'border-line text-muted',
        accent: 'border-accent/40 text-accent bg-accent-soft',
        success: 'border-emerald-500/30 text-emerald-500',
        warn: 'border-warn/40 text-warn',
    }
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${
                tones[tone] || tones.neutral
            } ${className}`}
        >
            {children}
        </span>
    )
}
