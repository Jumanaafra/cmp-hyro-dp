import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Custom Vite plugin to handle Vercel serverless functions locally
function apiDevServer() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      // Load environment variables from .env into process.env for API handlers
      const env = loadEnv(server.config.mode, process.cwd(), '');
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/chat')) {
          try {
            const module = await server.ssrLoadModule('/api/chat.js');
            const handler = module.default || module;
            await handler(req, res);
          } catch (err) {
            console.error('[Vite API Error]', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        } else {
          next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevServer()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase SDK in its own long-cached chunk
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          // React + Router in a stable vendor chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
