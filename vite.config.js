import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/public": {
        target: "https://cloud.istreams-erp.com:4439/iStreamsSmartPublic.asmx",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/public/, ""),
      },
    },
  },
});