import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        fileURLToPath(new URL('index.html', import.meta.url)),
        fileURLToPath(new URL('profil/index.html', import.meta.url)),
        fileURLToPath(new URL('kegiatan/gotong-royong-lingkungan/index.html', import.meta.url)),
        fileURLToPath(new URL('kegiatan/ruang-belajar-budaya/index.html', import.meta.url)),
        fileURLToPath(new URL('kegiatan/lapang-dan-olahraga/index.html', import.meta.url)),
        fileURLToPath(new URL('cerita/renovasi-lapang-voli/index.html', import.meta.url)),
        fileURLToPath(new URL('cerita/krisis-air-bersih/index.html', import.meta.url)),
        fileURLToPath(new URL('cerita/phbn-hut-ri-81/index.html', import.meta.url)),
      ],
    },
  },
});
