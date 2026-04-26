import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePrefix: '-',
      routeFileIgnorePattern: '.*/-components/.*'
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Agar tidak perlu import 'describe', 'it', dll
    environment: 'jsdom',
    setupFiles: './test/setup.ts', // File setup (lihat langkah B)
  },
});
