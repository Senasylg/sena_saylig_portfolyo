import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        open: false,
    },
    build: {
        outDir: 'dist',
        // Admin paneli zaten React.lazy ile ayrı chunk'a düşüyor.
        // Buradaki gruplama sadece public bundle'ı stabil tutmak için.
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return
                    if (id.includes('react-markdown') || id.includes('remark') ||
                        id.includes('micromark') || id.includes('mdast') ||
                        id.includes('hast') || id.includes('unist')) {
                        return 'markdown'
                    }
                    if (id.includes('@dnd-kit')) return 'dnd'
                    if (id.includes('@supabase')) return 'supabase'
                },
            },
        },
    },
})
