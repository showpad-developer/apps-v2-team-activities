import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: { https: false },
    build: {
        target: 'ES2022',
        outDir: '../dist/user-settings',
    },
});
