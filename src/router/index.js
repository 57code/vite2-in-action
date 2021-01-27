import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from 'layouts/index.vue'

export const routes = [
  {
    path: "/",
    component: Layout,
    alwaysShow: true,
    meta: { title: '导航', icon: "el-icon-setting"  },
    children: [
      {
        path: "",
        component: () => import('views/home.vue'),
        name: "Home",
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router