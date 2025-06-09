import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👈 Agrega esto


export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'resources'), // 👈 Aquí le dices que "@" apunta a resources/src
        },
      },
});
