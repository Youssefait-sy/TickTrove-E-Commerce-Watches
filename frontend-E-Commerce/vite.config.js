import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:1337',
        changeOrigin:true,
        headers:{
          Accept : 'application/json',
          'Content-Type' : 'application/json'
        }
      }
    }
  }
})
