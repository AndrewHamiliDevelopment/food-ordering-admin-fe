import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log("🚀 ~ mode:", mode);
  console.log("🚀 ~ STAGING_API_URL:", process.env.VITE_STAGING_API_URL);

  return defineConfig({
    server: {
      proxy: {
        '/api': {
          secure: false,
          changeOrigin: true,
          target: process.env.VITE_STAGING_API_URL
        }
      }
    },
    plugins: [react()],
  });
};
