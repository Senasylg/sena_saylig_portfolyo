import { useCallback, useEffect, useState } from 'react'
import { listPublishedProjects, getPublishedProjectBySlug } from './projectsRepo'

/** Yayınlanmış projeleri getirir. */
export function usePublishedProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const load = useCallback(() => {
        let active = true
        setLoading(true)
        setError(null)
        listPublishedProjects()
            .then((data) => {
                if (active) setProjects(data)
            })
            .catch((err) => {
                if (active) setError(err)
            })
            .finally(() => {
                if (active) setLoading(false)
            })
        return () => {
            active = false
        }
    }, [])

    useEffect(() => load(), [load])

    return { projects, loading, error, reload: load }
}

/** Slug ile tek yayınlanmış proje. */
export function usePublishedProject(slug) {
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let active = true
        setLoading(true)
        setError(null)
        getPublishedProjectBySlug(slug)
            .then((data) => {
                if (active) setProject(data)
            })
            .catch((err) => {
                if (active) setError(err)
            })
            .finally(() => {
                if (active) setLoading(false)
            })
        return () => {
            active = false
        }
    }, [slug])

    return { project, loading, error }
}
