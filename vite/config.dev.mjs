import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    define: {
        'import.meta.env.MODE': JSON.stringify(process.env.MODE || 'arcade')
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
