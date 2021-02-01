import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "layouts/index.vue";

/**
 * Note: 子菜单仅当路由的children.length >= 1时才出现
 *
 * hidden: true                   设置为true时路由将显示在sidebar中(默认false)
 * alwaysShow: true               如果设置为true则总是显示在菜单根目录
 *                                如果不设置alwaysShow, 当路由有超过一个子路由时,
 *                                将会变为嵌套模式, 否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect时，breadcrumb中点击将不会跳转
 * name:'router-name'             name用于<keep-alive> (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    页面可访问角色设置 
    title: 'title'               sidebar和breadcrumb显示的标题 
    icon: 'svg-name'/'el-icon-x' sidebar中显示的图标
    breadcrumb: false            设置为false，将不会出现在面包屑中
    activeMenu: '/example/list'  如果设置一个path, sidebar将会在高亮匹配项
  }
 */
export const routes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: { title: "导航", icon: "el-icon-s-home" },
    children: [
      {
        path: "home",
        component: () => import("views/home.vue"),
        name: "Home",
        meta: { title: "首页", icon: "el-icon-s-home" },
        children: [
          {
            path: ":id",
            component: () => import("views/detail.vue"),
            name: "Detail",
            hidden: true,
            meta: {
              title: "详情",
              icon: "el-icon-s-home",
              activeMenu: "/home",
            },
          },
        ],
      },
    ],
  },

  {
    path: "/users",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "el-icon-user-solid",
    },
    redirect: '/users/list',
    children: [
      {
        path: "list",
        component: () => import("views/users/list.vue"),
        meta: {
          title: "用户列表",
          icon: "el-icon-document",
        },
      },
      {
        path: "create",
        component: () => import("views/users/create.vue"),
        hidden: true,
        meta: {
          title: "创建新用户",
          activeMenu: "/users/list",
        },
      },
      {
        path: "edit/:id(\\d+)",
        name: "userEdit",
        component: () => import("views/users/edit.vue"),
        hidden: true,
        meta: {
          title: "编辑用户信息",
          activeMenu: "/users/list",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
