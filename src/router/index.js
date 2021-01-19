import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from 'layouts/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
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
});

export default router