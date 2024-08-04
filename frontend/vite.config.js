// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/Lively_chatapp/', // Make sure this matches your repository name
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react'],
//         },
//       },
//     },
//   },
//  });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
