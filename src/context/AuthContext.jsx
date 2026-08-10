import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

/**
 * Admin oturumu.
 *
 * `isAdmin`, kullanıcının `admins` tablosunda kaydı olup olmadığına bakar.
 * Bu bir kolaylıktır — asıl koruma Row Level Security'dir: `admins` içinde
 * olmayan bir kullanıcı giriş yapsa bile hiçbir proje yazma/okuma işlemi
 * yapamaz, çünkü Postgres politikaları reddeder.
 */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(isSupabaseConfigured)

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setLoading(false)
            return
        }

        let active = true

        async function resolveAdmin(nextSession) {
            if (!nextSession?.user) {
                if (active) setIsAdmin(false)
                return
            }
            const { data, error } = await supabase
                .from('admins')
                .select('user_id')
                .eq('user_id', nextSession.user.id)
                .maybeSingle()
            if (active) setIsAdmin(!error && Boolean(data))
        }

        supabase.auth.getSession().then(async ({ data }) => {
            if (!active) return
            setSession(data.session ?? null)
            await resolveAdmin(data.session)
            if (active) setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
            if (!active) return
            setSession(nextSession)
            setLoading(true)
            await resolveAdmin(nextSession)
            if (active) setLoading(false)
        })

        return () => {
            active = false
            listener?.subscription?.unsubscribe()
        }
    }, [])

    const signIn = useCallback(async (email, password) => {
        if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
    }, [])

    const signOut = useCallback(async () => {
        if (!isSupabaseConfigured) return
        await supabase.auth.signOut()
    }, [])

    const value = useMemo(
        () => ({
            session,
            user: session?.user ?? null,
            isAdmin,
            loading,
            signIn,
            signOut,
            configured: isSupabaseConfigured,
        }),
        [session, isAdmin, loading, signIn, signOut],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}
