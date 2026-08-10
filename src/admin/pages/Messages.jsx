import { useCallback, useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2, AlertCircle, Reply } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import { listMessages, markMessageRead, deleteMessage } from '../../lib/projectsRepo'

/** İletişim formundan gelen mesajlar. Anonim kullanıcı bu tabloyu okuyamaz (RLS). */
export default function Messages() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pendingDelete, setPendingDelete] = useState(null)
    const [busy, setBusy] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            setMessages(await listMessages())
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        document.title = 'Mesajlar — Yönetim'
        load()
    }, [load])

    async function toggleRead(message) {
        const next = !message.read
        setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, read: next } : m)))
        try {
            await markMessageRead(message.id, next)
        } catch (err) {
            setError(err)
            load()
        }
    }

    async function confirmDelete() {
        if (!pendingDelete) return
        setBusy(true)
        try {
            await deleteMessage(pendingDelete.id)
            setMessages((prev) => prev.filter((m) => m.id !== pendingDelete.id))
            setPendingDelete(null)
        } catch (err) {
            setError(err)
        } finally {
            setBusy(false)
        }
    }

    const unread = messages.filter((m) => !m.read).length

    return (
        <div className="mx-auto max-w-3xl px-5 py-8 pb-24 sm:px-8 sm:py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-medium tracking-tight">Mesajlar</h1>
                <p className="text-faint mt-1 font-mono text-[11px]">
                    {messages.length} mesaj · {unread} okunmamış
                </p>
            </header>

            {error && (
                <div className="border-danger/30 bg-danger/10 text-danger mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span className="font-mono text-xs">
                        {error.message === 'SUPABASE_NOT_CONFIGURED'
                            ? 'Supabase bağlı değil (docs/SUPABASE_SETUP.md).'
                            : error.message}
                    </span>
                </div>
            )}

            {loading ? (
                <ul className="space-y-2">
                    {[0, 1, 2].map((i) => (
                        <li key={i} className="bg-surface h-24 animate-pulse rounded-xl" />
                    ))}
                </ul>
            ) : messages.length === 0 ? (
                <div className="border-line rounded-2xl border border-dashed py-20 text-center">
                    <p className="text-muted text-sm">Henüz mesaj yok.</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            className={`border-line bg-elev rounded-xl border p-4 ${
                                message.read ? 'opacity-70' : ''
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        {!message.read && (
                                            <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                                        )}
                                        <span className="truncate text-sm font-medium">{message.name}</span>
                                    </div>
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="text-faint hover:text-accent mt-0.5 block truncate font-mono text-[11px] transition"
                                    >
                                        {message.email}
                                    </a>
                                </div>
                                <div className="flex shrink-0 items-center gap-0.5">
                                    <a
                                        href={`mailto:${message.email}`}
                                        title="Yanıtla"
                                        className="text-faint hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                                    >
                                        <Reply size={15} />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => toggleRead(message)}
                                        title={message.read ? 'Okunmadı yap' : 'Okundu yap'}
                                        className="text-faint hover:text-ink hover:bg-surface rounded-lg p-2 transition"
                                    >
                                        {message.read ? <Mail size={15} /> : <MailOpen size={15} />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPendingDelete(message)}
                                        title="Sil"
                                        className="text-faint hover:text-danger hover:bg-surface rounded-lg p-2 transition"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-muted mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                                {message.message}
                            </p>

                            <div className="text-faint mt-3 font-mono text-[10px]">
                                {new Date(message.created_at).toLocaleString('tr-TR')}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                busy={busy}
                title="Mesaj silinsin mi?"
                body="Bu mesaj kalıcı olarak silinecek. Bu işlem geri alınamaz."
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    )
}
