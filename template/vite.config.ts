import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import pkg from './package.json';
const pkg = require('./package.json')

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: codixServer } = await import('@codixjs/vite');
  return {
    resolve: {
      extensions: [
        '.tsx', 
        '.ts', 
        '.jsx', 
        '.js', 
        '.json', 
        '.less', 
        '.css'
      ],
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {}
        },
      }
    },
    build: {
      rollupOptions: {
        manualChunks: {
          vonder: [
            'react', 
            'react-dom'
          ],
        }
      }
    },
    optimizeDeps: {
      include: ["react/jsx-runtime", "react", "react-dom"],
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        }
      }),
      codixServer(pkg.config)
    ]
  }
})
