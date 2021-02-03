import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

export default {
  alias: {
    "@": path.resolve(__dirname, "src")
  },
  plugins: [vue(), viteMockServe({ supportTs: false })],
}
