import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

export default {
  alias: {
    "@": path.resolve(__dirname, "src"),
    // "/api/": path.resolve(__dirname, "src/api"),
    comps: path.resolve(__dirname, "src/components"),
    // "/dirs/": path.resolve(__dirname, "src/directive"),
    // "/views/": path.resolve(__dirname, "src/views"),
    // "/styles/": path.resolve(__dirname, "src/styles"),
    // "/layout/": path.resolve(__dirname, "src/layout"),
    // "/utils/": path.resolve(__dirname, "src/utils"),
  },
  plugins: [vue(), vueJsx(), viteMockServe({ supportTs: false })],
}
