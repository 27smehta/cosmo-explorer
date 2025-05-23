import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/iss-now': {
        target: 'https://api.wheretheiss.at',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/iss-now/, '/v1/satellites/25544'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('User-Agent', 'CosmoExplorer/1.0');
            proxyReq.setHeader('Accept', 'application/json');
          });
        }
      },
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}));
