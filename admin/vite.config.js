import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5174, 
  },
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:4000/api',
      VITE_ADMIN_API_URL: process.env.VITE_ADMIN_API_URL || 'http://localhost:4000/api',
    },
  },
});
