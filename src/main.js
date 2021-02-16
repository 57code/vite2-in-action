import { createApp } from "vue";
import App from "./App.vue";

// 全局样式
import "styles/index.scss";

// element3
import element3 from "plugins/element3";

// router
import router from "@/router";

// store
import store from '@/store'

fetch('/api/users').then(res => res.json()).then(users => console.log(users))

createApp(App).use(element3).use(router).use(store).mount("#app");
