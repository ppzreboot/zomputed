import { defineConfig } from 'tsup'

export default defineConfig({
    entryPoints: ['./src/mod.ts'],
    format: ['esm'],
    dts: true,
    minify: false,
    sourcemap: true,
    clean: true,
    external: ['zustand'],
})
