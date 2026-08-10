import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ss-theme'
const DEFAULT_THEME = 'dark' // Site koyu temada açılır.

const ThemeContext = createContext(null)

function readStored() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME
    } catch {
        return DEFAULT_THEME
    }
}

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(readStored)

    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', theme === 'dark')
        root.style.colorScheme = theme
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch {
            /* yok sayılır */
        }
    }, [theme])

    const setTheme = useCallback((next) => {
        setThemeState(next === 'light' ? 'light' : 'dark')
    }, [])

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [])

    const value = useMemo(
        () => ({ theme, setTheme, toggleTheme, isDark: theme === 'dark' }),
        [theme, setTheme, toggleTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
    return ctx
}
