import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kino-cinema-backend/', // Replace 'my-vite-app' with your repository name
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        aboutUs: './about-us.html',
        movies: './movies.html',
      },
    },
  },
});
