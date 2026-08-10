import { useParams } from 'react-router-dom'
import ProjectDetailView from '../components/projects/ProjectDetailView'
import NotFound from './NotFound'
import { usePublishedProject, usePublishedProjects } from '../lib/useProjects'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'

export default function ProjectDetail() {
    const { slug } = useParams()
    const { lang, t } = useLanguage()
    const { project, loading } = usePublishedProject(slug)
    const { projects } = usePublishedProjects()

    const title = project ? (project.content[lang] || project.content.tr).title : ''
    useDocumentTitle(title)

    if (loading) {
        return (
            <div className="mx-auto max-w-[1400px] px-5 pt-40 sm:px-8">
                <div className="bg-surface h-4 w-28 animate-pulse rounded" />
                <div className="bg-surface mt-6 h-16 w-2/3 animate-pulse rounded" />
                <div className="bg-surface mt-10 aspect-[16/9] animate-pulse rounded-2xl" />
                <span className="sr-only">{t('common.loading')}</span>
            </div>
        )
    }

    // Yayınlanmamış ya da olmayan proje → 404 (taslakların varlığı sızdırılmaz).
    if (!project) return <NotFound message={t('detail.notFound')} />

    return <ProjectDetailView project={project} siblings={projects} />
}
