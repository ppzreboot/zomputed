import { defineConfig } from 'tsup'

export default defineConfig({
    entryPoints: ['./zomputed.ts'],
    format: ['esm'],
    dts: true,
    minify: false,
    clean: true,
    external: ['zustand'],
})
