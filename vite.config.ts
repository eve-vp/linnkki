// vite.config.ts
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
plugins: [reactRefresh()],
esbuild: {
    loader: 'tsx',
    // Desactiva la generación de source maps en desarrollo
    sourcemap: false,
},
});
