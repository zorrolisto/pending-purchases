import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/my-app.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
