import { motion, useScroll, useSpring } from 'motion/react'

/** Sayfa üstünde ince ilerleme çubuğu (eski sitedeki davranışın sadeleşmiş hali). */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

    return (
        <motion.div
            aria-hidden
            className="from-accent to-accent-2 fixed top-0 left-0 z-[90] h-[2px] w-full origin-left bg-gradient-to-r"
            style={{ scaleX: width }}
        />
    )
}
