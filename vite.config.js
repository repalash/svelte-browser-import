import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import license from 'rollup-plugin-license';
import packageJson from "./package.json";

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'svelte-browser-import',
            fileName: (format) => `svelte-browser-import.${format}.js`,
            formats: ['es', 'umd'],
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
    plugins: [
        dts(),
        license({
            banner: `
        @license
        ${packageJson.name} v${packageJson.version}
        Copyright 2022<%= moment().format('YYYY') > 2022 ? '-' + moment().format('YYYY') : null %> ${packageJson.author}
        ${packageJson.license} License
      `
        })
    ]
})
