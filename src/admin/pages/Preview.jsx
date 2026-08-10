import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Eye } from 'lucide-react'
import ProjectDetailView from '../../components/projects/ProjectDetailView'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { getProjectById } from '../../lib/projectsRepo'

/**
 * Yayınlamadan önce önizleme.
 * Public detay bileşeninin ta kendisini kullanır — gördüğün şey birebir yayınlanacak olan.
 * Rota AdminGuard arkasındadır; herkese açık değildir.
 */
export default function Preview() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'Önizleme — Yönetim'
        let active = true
        getProjectById(id)
            .then((data) => active && setProject(data))
            .finally(() => active && setLoading(false))
        return () => {
            active = false
        }
    }, [id])

    if (loading) {
        return (
            <div className="flex min-h-dvh items-center justify-center">
                <div className="border-line border-t-accent h-6 w-6 animate-spin rounded-full border-2" />
            </div>
        )
    }

    if (!project) {
        return (
            <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
                <p className="text-muted text-sm">Proje bulunamadı.</p>
                <Link to="/admin/projects" className="text-accent font-mono text-xs uppercase hover:underline">
                    Projelere dön
                </Link>
            </div>
        )
    }

    return (
        <div className="flex min-h-dvh flex-col">
            <div className="bg-warn/15 border-warn/30 text-warn sticky top-0 z-[130] flex items-center justify-between gap-4 border-b px-4 py-2 backdrop-blur">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
                    <Eye size={13} />
                    Önizleme —{' '}
                    {project.status === 'published' ? 'yayında' : 'taslak, sitede görünmüyor'}
                </span>
                <Link
                    to={`/admin/projects/${id}/edit`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase hover:underline"
                >
                    <ArrowLeft size={12} />
                    Düzenlemeye dön
                </Link>
            </div>

            <Navbar onOpenPalette={() => {}} />
            <main className="flex-1">
                <ProjectDetailView project={project} />
            </main>
            <Footer />
        </div>
    )
}
