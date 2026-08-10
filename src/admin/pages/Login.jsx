import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Lock, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import NotFound from '../../pages/NotFound'
import profile from '../../data/profile'

/**
 * Admin girişi.
 *
 * Şifre hiçbir yerde koda gömülü DEĞİLDİR — doğrulama Supabase Auth tarafında yapılır.
 * Hata mesajı bilerek genel tutulur ("e-posta var / şifre yanlış" ayrımı sızdırılmaz).
 */
export default function Login() {
    const { signIn, session, isAdmin, loading, configured } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        document.title = 'Yönetim'
    }, [])

    // Supabase kurulmamışsa panelin varlığını ele verme.
    if (!configured) return <NotFound />

    if (!loading && session && isAdmin) return <Navigate to="/admin" replace />

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setBusy(true)
        try {
            await signIn(email.trim(), password)
            navigate('/admin', { replace: true })
        } catch {
            setError('Giriş bilgileri doğrulanamadı.')
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="bg-bg relative flex min-h-dvh items-center justify-center overflow-hidden px-5">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

            <div className="border-line bg-elev relative w-full max-w-sm rounded-2xl border p-8 shadow-lift">
                <div className="mb-8 flex items-center gap-3">
                    <span className="border-line-strong text-accent flex h-9 w-9 items-center justify-center rounded-lg border">
                        <Lock size={16} />
                    </span>
                    <div>
                        <div className="text-sm font-medium">Yönetim Girişi</div>
                        <div className="text-faint font-mono text-[10px] tracking-widest uppercase">
                            {profile.initials} · admin
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="admin-email" className="label-mono mb-2 block">
                            E-posta
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            required
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-line focus:border-accent w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-password" className="label-mono mb-2 block">
                            Şifre
                        </label>
                        <input
                            id="admin-password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-line focus:border-accent w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-danger flex items-center gap-2 text-xs">
                            <AlertCircle size={13} />
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={busy}
                        className="bg-ink text-bg hover:bg-accent flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        <LogIn size={15} />
                        {busy ? 'Kontrol ediliyor…' : 'Giriş yap'}
                    </button>
                </form>
            </div>
        </div>
    )
}
