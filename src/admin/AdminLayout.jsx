import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutGrid, Inbox, LogOut, ExternalLink, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import profile from '../data/profile'

/**
 * Admin kabuğu.
 * Public siteden bilerek farklı: yoğun, fonksiyonel, dashboard dili.
 */
export default function AdminLayout() {
    const { user, signOut } = useAuth()
    const { isDark, toggleTheme } = useTheme()

    const nav = [
        { to: '/admin/projects', label: 'Projeler', Icon: LayoutGrid, end: false },
        { to: '/admin/messages', label: 'Mesajlar', Icon: Inbox, end: false },
    ]

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            isActive ? 'bg-surface text-ink' : 'text-muted hover:text-ink hover:bg-surface/60'
        }`

    return (
        <div className="bg-bg min-h-dvh md:flex">
            <aside className="border-line bg-elev/60 border-b md:sticky md:top-0 md:h-dvh md:w-60 md:shrink-0 md:border-r md:border-b-0">
                <div className="flex items-center justify-between p-4 md:block">
                    <Link to="/admin" className="flex items-center gap-2.5">
                        <span className="border-line-strong text-accent flex h-8 w-8 items-center justify-center rounded-md border font-mono text-[11px]">
                            {profile.initials}
                        </span>
                        <div className="leading-tight">
                            <div className="text-sm font-medium">Yönetim</div>
                            <div className="text-faint font-mono text-[10px]">admin panel</div>
                        </div>
                    </Link>

                    <nav className="flex gap-1 md:mt-6 md:flex-col">
                        {nav.map(({ to, label, Icon, end }) => (
                            <NavLink key={to} to={to} end={end} className={linkClass}>
                                <Icon size={16} />
                                <span className="hidden sm:inline">{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="border-line hidden p-4 md:absolute md:bottom-0 md:block md:w-60 md:border-t">
                    <div className="text-faint mb-3 truncate font-mono text-[10px]">{user?.email}</div>
                    <div className="flex items-center gap-1">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Siteyi aç"
                            className="text-muted hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                        >
                            <ExternalLink size={15} />
                        </a>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            title="Tema"
                            className="text-muted hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                        >
                            {isDark ? <Sun size={15} /> : <Moon size={15} />}
                        </button>
                        <button
                            type="button"
                            onClick={signOut}
                            title="Çıkış yap"
                            className="text-muted hover:text-danger hover:bg-surface ml-auto rounded-lg p-2 transition"
                        >
                            <LogOut size={15} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="min-w-0 flex-1">
                <Outlet />
            </main>

            {/* Mobil alt bar */}
            <div className="border-line bg-elev/95 fixed inset-x-0 bottom-0 z-40 flex items-center gap-1 border-t p-2 backdrop-blur md:hidden">
                <span className="text-faint flex-1 truncate px-2 font-mono text-[10px]">{user?.email}</span>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="text-muted hover:text-ink rounded-lg p-2"
                    aria-label="Tema"
                >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                    type="button"
                    onClick={signOut}
                    className="text-muted hover:text-danger rounded-lg p-2"
                    aria-label="Çıkış"
                >
                    <LogOut size={15} />
                </button>
            </div>
        </div>
    )
}
