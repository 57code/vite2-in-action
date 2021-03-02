import { createApp } from "vue";
import App from "./App.vue";

// 全局样式
import "styles/index.scss";

// element3
import element3 from "plugins/element3";

// router
import router from "/@/router";

// store
import store from "/@/store";

// i18n
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

createApp(App).use(element3).use(router).use(store).use(i18n).mount("#app");
