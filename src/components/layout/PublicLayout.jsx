import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import CustomCursor from '../ui/CustomCursor'
import CommandPalette from '../ui/CommandPalette'
import { usePublishedProjects } from '../../lib/useProjects'

export default function PublicLayout() {
    const [paletteOpen, setPaletteOpen] = useState(false)
    const { projects } = usePublishedProjects()
    const { pathname } = useLocation()

    // Rota değişince başa dön.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }, [pathname])

    useEffect(() => {
        const handler = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setPaletteOpen((prev) => !prev)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    return (
        <div className="flex min-h-dvh flex-col">
            <ScrollProgress />
            <CustomCursor />
            <Navbar onOpenPalette={() => setPaletteOpen(true)} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                projects={projects}
            />
        </div>
    )
}
