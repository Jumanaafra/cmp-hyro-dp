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
        if (req.url.startsWith('/api/')) {
          const endpoint = req.url.split('?')[0].replace('/api/', '');
          try {
            const module = await server.ssrLoadModule(`/api/${endpoint}.js`);
            const handler = module.default || module;
            await handler(req, res);
          } catch (err) {
            console.error(`[Vite API Error: /api/${endpoint}]`, err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `API route /api/${endpoint} error: ${err.message}` }));
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
    cssCodeSplit: true,
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase SDK in its own long-cached chunk (loaded only when needed)
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          // React core + router in a stable vendor chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Icons chunk to keep core application bundle minimal
          icons: ['react-icons/lu'],
        },
      },
    },
  },
})
