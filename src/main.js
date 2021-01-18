import { createApp } from "vue";
import App from "./App.vue";

// 全局样式
import "styles/index.scss";

// element3
import useElement from 'plugins/element3'

const app = createApp(App)
useElement(app)
app.mount("#app");
