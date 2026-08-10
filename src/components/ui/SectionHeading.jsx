import Reveal from './Reveal'

export default function SectionHeading({ label, title, action, className = '' }) {
    return (
        <Reveal className={`mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10 ${className}`}>
            <div>
                {label && (
                    <div className="label-mono mb-2.5 flex items-center gap-2">
                        <span className="bg-accent inline-block h-px w-6" />
                        {label}
                    </div>
                )}
                <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
            </div>
            {action}
        </Reveal>
    )
}
