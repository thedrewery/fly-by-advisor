// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import replace from '@rollup/plugin-replace';
// import dotenv from 'dotenv'
// import process from 'dotenv'

// dotenv.config()

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     replace({
//       'process.env': JSON.stringify(process.env),
//     }),
//     vue()
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     '/maps': {
  //       target: 'https://maps.googleapis.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/maps/, ''),
  //     },
  //   },
  // },
});