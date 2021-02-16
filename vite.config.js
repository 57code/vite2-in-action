import vue from "@vitejs/plugin-vue";
import path from "path";
import myExample from './plugins/vite-plugin-my-example'

export default {
  alias: {
    "@": path.resolve(__dirname, "src")
  },
  plugins: [vue(), myExample()],
}
