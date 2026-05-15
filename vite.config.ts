import typescript from '@rollup/plugin-typescript';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/presentation/routes',
      routeFileIgnorePrefix: '-',
      routeFileIgnorePattern:
        '(./-components/.*|.*\\.test\\.tsx|.*\\.hook\\.ts)',
    }),
    react({
      tsDecorators: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vibekeun',
        short_name: 'Vibekeun',
        description: 'Vibekeun PWA Application',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Agar tidak perlu import 'describe', 'it', dll
    environment: 'jsdom',
    setupFiles: './__test__/setup.ts', // File setup (lihat langkah B)
  },
});
