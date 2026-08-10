import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/**
 * Supabase yapılandırılmış mı?
 *
 * Yapılandırılmamışsa site "demo mod"da çalışır: projeler `data/seedProjects.js`ten
 * salt okunur biçimde gelir, admin paneli uyarı gösterir. Böylece key'ler girilmeden
 * de site tam olarak ayağa kalkar.
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
    ? createClient(url, anonKey, {
          auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: false,
          },
      })
    : null

export const PROJECT_BUCKET = 'project-images'
