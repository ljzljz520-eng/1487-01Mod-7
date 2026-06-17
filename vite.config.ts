import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: './src/index.ts',
      name: 'SolidWebComponentsUI',
      fileName: (format) => `solid-web-components-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'Solid',
        },
      },
    },
  },
});