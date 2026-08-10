import { Routes, Route, Navigate } from 'react-router-dom'
import AdminGuard from './AdminGuard'
import AdminLayout from './AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectForm from './pages/ProjectForm'
import Preview from './pages/Preview'
import Messages from './pages/Messages'

/**
 * Özel admin uygulaması — App.jsx içinde React.lazy ile ayrı chunk olarak yüklenir.
 * Public bundle bu dosyayı ve bağımlılıklarını içermez.
 */
export default function AdminApp() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route
                element={
                    <AdminGuard>
                        <AdminLayout />
                    </AdminGuard>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Dashboard />} />
                <Route path="projects/new" element={<ProjectForm mode="create" />} />
                <Route path="projects/:id/edit" element={<ProjectForm mode="edit" />} />
                <Route path="messages" element={<Messages />} />
            </Route>

            {/* Önizleme layout'suz açılır: gerçek public görünümü birebir gösterir. */}
            <Route
                path="projects/:id/preview"
                element={
                    <AdminGuard>
                        <Preview />
                    </AdminGuard>
                }
            />

            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    )
}
