import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
plugins: [reactRefresh()],
esbuild: {
    loader: 'tsx', // This will load .tsx files as well
},
});
