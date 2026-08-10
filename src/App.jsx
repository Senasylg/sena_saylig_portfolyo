import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Admin paneli ayrı bir chunk olarak yüklenir.
 * Ağır bağımlılıklar (markdown editörü, drag & drop) public bundle'a girmez.
 */
const AdminApp = lazy(() => import('./admin/AdminApp'))

/** Detay sayfası markdown motorunu kullanır; onu da ayrı chunk'ta tutuyoruz. */
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

function RouteFallback() {
    return <div className="min-h-dvh" aria-hidden />
}

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <Routes>
                        <Route element={<PublicLayout />}>
                            <Route index element={<Home />} />
                            <Route path="projects" element={<Projects />} />
                            <Route
                                path="projects/:slug"
                                element={
                                    <Suspense fallback={<RouteFallback />}>
                                        <ProjectDetail />
                                    </Suspense>
                                }
                            />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>

                        <Route
                            path="/admin/*"
                            element={
                                <Suspense fallback={<RouteFallback />}>
                                    <AdminApp />
                                </Suspense>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}
