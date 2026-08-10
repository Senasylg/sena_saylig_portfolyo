import Hero from '../components/home/Hero'
import Manifesto from '../components/home/Manifesto'
import ProjectCarousel from '../components/projects/ProjectCarousel'
import FocusAreas from '../components/home/FocusAreas'
import Journey from '../components/home/Journey'
import Stack from '../components/home/Stack'
import ContactBlock from '../components/home/ContactBlock'
import { usePublishedProjects } from '../lib/useProjects'
import useDocumentTitle from '../lib/useDocumentTitle'
import { useLanguage } from '../context/LanguageContext'
import profile from '../data/profile'

export default function Home() {
    const { projects, loading } = usePublishedProjects()
    const { pick } = useLanguage()
    useDocumentTitle(`${profile.name} — ${pick(profile.role)}`)

    return (
        <>
            <Hero projectCount={projects.length} />
            <ProjectCarousel projects={projects} loading={loading} />
            <Manifesto />
            <FocusAreas />
            <Journey />
            <Stack />
            <ContactBlock />
        </>
    )
}
