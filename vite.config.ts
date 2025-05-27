
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Minify for production builds
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs and comments in production
        drop_console: true,
        drop_debugger: true
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query'
          ],
          ui: ['lucide-react', '@radix-ui/react-avatar']
        }
      }
    },
    // Generate sourcemaps only in development
    sourcemap: mode !== 'production',
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
}));
