import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

export default {
  alias: {
    "@": path.resolve(__dirname, "src"),
    comps: path.resolve(__dirname, "src/components"),
    "styles": path.resolve(__dirname, "src/styles"),
    // "/api/": path.resolve(__dirname, "src/api"),
    // "/dirs/": path.resolve(__dirname, "src/directive"),
    // "/views/": path.resolve(__dirname, "src/views"),
    // "/layout/": path.resolve(__dirname, "src/layout"),
    // "/utils/": path.resolve(__dirname, "src/utils"),
  },
  plugins: [vue(), vueJsx(), viteMockServe({ supportTs: false })],
}
