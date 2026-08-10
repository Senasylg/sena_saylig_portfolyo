import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/**
 * Masaüstünde (fare olan cihazlarda) özel imleç.
 * Dokunmatik cihazlarda ve reduced-motion'da hiç render edilmez.
 */
export default function CustomCursor() {
    const reduced = useReducedMotion()
    const [enabled, setEnabled] = useState(false)
    const [hovering, setHovering] = useState(false)

    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
    const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

    useEffect(() => {
        if (reduced) return
        const canHover = window.matchMedia('(pointer: fine)').matches
        if (!canHover) return

        setEnabled(true)
        document.body.classList.add('cursor-host')

        const move = (event) => {
            x.set(event.clientX)
            y.set(event.clientY)
            const target = event.target
            const interactive =
                target instanceof Element &&
                Boolean(target.closest('a, button, [role="button"], input, textarea, select, label'))
            setHovering(interactive)
        }

        window.addEventListener('pointermove', move, { passive: true })
        return () => {
            window.removeEventListener('pointermove', move)
            document.body.classList.remove('cursor-host')
        }
    }, [reduced, x, y])

    if (!enabled) return null

    return (
        <>
            <motion.div
                aria-hidden
                className="bg-accent pointer-events-none fixed top-0 left-0 z-[200] h-1.5 w-1.5 rounded-full"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            />
            <motion.div
                aria-hidden
                className="border-accent/50 pointer-events-none fixed top-0 left-0 z-[200] rounded-full border"
                style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
                animate={{ width: hovering ? 44 : 26, height: hovering ? 44 : 26, opacity: hovering ? 1 : 0.55 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
        </>
    )
}
