import vue from "@vitejs/plugin-vue";
import path from "path";
import myExample from './plugins/vite-plugin-my-example'
import vueI18n from './plugins/vite-plugin-vue-i18n'
export default {
  alias: {
    "@": path.resolve(__dirname, "src")
  },
  plugins: [vue(), myExample(), vueI18n],
}
