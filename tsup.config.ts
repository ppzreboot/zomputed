import { defineConfig } from 'tsup'

export default defineConfig({
    entryPoints: ['./zomputed.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: false,
    minify: false,
    clean: true,
    external: ['react'],
})
