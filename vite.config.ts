import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

export default ({ mode }: { mode: string }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Log to ensure variables are loaded correctly
  console.log("🚀 ~ mode:", mode);
  console.log("🚀 ~ STAGING_API_URL:", env.VITE_STAGING_API_URL);

  return defineConfig({
    server: {
      proxy: {
        '/api': {
          secure: false,
          changeOrigin: true,
          target: env.VITE_STAGING_API_URL, // Use the loaded env variable here
        },
      },
    },
    plugins: [react()],
  });
};
