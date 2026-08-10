import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'

const BASE =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 select-none'

const VARIANTS = {
    primary: 'bg-ink text-bg hover:bg-accent',
    outline: 'border border-line-strong text-ink hover:border-accent hover:text-accent',
    ghost: 'text-muted hover:text-ink',
}

/**
 * İmleç yaklaştıkça hafifçe ona doğru kayan buton.
 * Dokunmatik cihazlarda ve prefers-reduced-motion açıkken düz bir butona indirgenir.
 */
export default function MagneticButton({
    children,
    to,
    href,
    onClick,
    variant = 'primary',
    className = '',
    strength = 0.25,
    ...rest
}) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMove = (event) => {
        if (reduced || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setOffset({
            x: (event.clientX - (rect.left + rect.width / 2)) * strength,
            y: (event.clientY - (rect.top + rect.height / 2)) * strength,
        })
    }

    const reset = () => setOffset({ x: 0, y: 0 })

    const inner = { className: `${BASE} ${VARIANTS[variant] || VARIANTS.primary} ${className}`, ...rest }

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            onMouseMove={handleMove}
            onMouseLeave={reset}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.5 }}
        >
            {to ? (
                <Link to={to} {...inner}>
                    {children}
                </Link>
            ) : href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" {...inner}>
                    {children}
                </a>
            ) : (
                <button type="button" onClick={onClick} {...inner}>
                    {children}
                </button>
            )}
        </motion.div>
    )
}
