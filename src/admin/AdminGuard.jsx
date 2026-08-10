import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NotFound from '../pages/NotFound'

/**
 * Admin rota koruması.
 *
 * ÖNEMLİ: Bu yalnızca arayüz katmanıdır. Gerçek yetkilendirme Supabase
 * Row Level Security ile veritabanında yapılır — bu bileşen atlansa bile
 * yetkisiz bir istemci hiçbir admin verisini okuyamaz/yazamaz.
 *
 * Giriş yapmamış kullanıcı login'e yönlendirilir. Giriş yapmış ama `admins`
 * tablosunda olmayan kullanıcıya 404 gösterilir — panelin varlığı doğrulanmaz.
 */
export default function AdminGuard({ children }) {
    const { session, isAdmin, loading, configured } = useAuth()

    // Supabase kurulmamışsa panel anlamlı çalışamaz; varlığını ele vermemek için 404.
    if (!configured) return <NotFound />

    if (loading) {
        return (
            <div className="bg-bg flex min-h-dvh items-center justify-center">
                <div className="border-line border-t-accent h-6 w-6 animate-spin rounded-full border-2" />
            </div>
        )
    }

    if (!session) return <Navigate to="/admin/login" replace />
    if (!isAdmin) return <NotFound />

    return children
}
