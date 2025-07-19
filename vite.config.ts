import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    // No need to define process.env.GEMINI_API_KEY, Vite exposes VITE_ variables automatically
  };
});
