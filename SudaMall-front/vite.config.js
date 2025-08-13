import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 
import mkcert from 'vite-plugin-mkcert'
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
    mkcert()
  ],
   server: {
    host: '0.0.0.0', // allows access via LAN
    port: 5173  // (optional) use a fixed port
  },
})