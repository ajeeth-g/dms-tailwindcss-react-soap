// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/public": {
        target: "http://103.168.19.35/iStWebPublic/iStreamsSmartPublic.asmx",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/public/, ""),
      },
      "/api": {
        target:
          "http://103.168.19.35/iStWebClient_Demo/istreamssmartservice.asmx",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
