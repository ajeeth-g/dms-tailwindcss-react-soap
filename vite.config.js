import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/public": {
        target: "https://istreamserp-001-site1.anytempurl.com/iStreamsSmartPublic.asmx",
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
