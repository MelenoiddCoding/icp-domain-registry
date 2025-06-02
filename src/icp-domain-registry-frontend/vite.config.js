import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),

    
    EnvironmentPlugin([
      'DFX_NETWORK',
      'CANISTER_ID_icp_domain_registry_backend', 
    ]),
  ],
  resolve: {
    alias: {
      declarations: fileURLToPath(new URL('../declarations', import.meta.url)),
    },
    dedupe: ['@dfinity/agent'],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
