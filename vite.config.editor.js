import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './config-editor',
  build: {
    outDir: '../dist-editor',
  },
  server: {
    port: 5174,
    open: true,
  },
});
