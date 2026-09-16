import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync } from 'node:fs';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        {
            name: 'spa-404-fallback',
            writeBundle() {
                copyFileSync('dist/index.html', 'dist/404.html');
            },
        },
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('framer-motion'))
                        return 'motion';
                    if (id.includes('node_modules/react') || id.includes('react-router'))
                        return 'vendor';
                },
            },
        },
    },
});
