import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiProxy = {
  "/api/who": {
    target: "https://ghoapi.azureedge.net",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/who/, "/api")
  },
  "/api/ct": {
    target: "https://clinicaltrials.gov",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/ct/, "/api/v2")
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: apiProxy
  },
  preview: {
    proxy: apiProxy
  }
});
