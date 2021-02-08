## Vite2项目最佳实践

### 配套视频演示

我专门录了一套视频演示本文所做的所有操作，喜欢看视频学习的小伙伴移步：
[「备战2021」Vite2 + Vue3项目最佳实践](https://www.bilibili.com/video/BV1vX4y1K7bQ)

制作不易，求`3连`，求`关注`

### vite2来了

`Vite1`还没用上，`Vite2`已经更新了，全新插件架构，丝滑的开发体验，和`Vue3`的完美结合。 2021年第一弹，村长打算以Vite2+Vue3为主题开启大家的前端学习之旅。

### 2021先学学vite准没错

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a26ab28cab8d45a981986b581ae71d04~tplv-k3u1fbpfcp-zoom-1.image)

### 本文目标

- `vite2`变化分析
- 项目中常见任务`vite2+vue3`实践


### 创建Vite2项目

闲言碎语不必说，下面我们表一表好汉`vite2`

使用npm:

```bash
$ npm init @vitejs/app
```

> 按提示指定项目名称和模板，或直接指定
>
> ```bash
> $ npm init @vitejs/app my-vue-app --template vue
> ```



### Vite2主要变化

对我们之前项目影响较大的我已经都标记出来了：

- 配置选项变化：`vue特有选项`、创建选项、css选项、jsx选项等
- `别名行为变化`：不再要求`/`开头或结尾
- `Vue支持`：通过 [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)插件支持
- React支持
- HMR API变化
- 清单格式变化
- `插件API重新设计`



#### Vue支持

Vue的整合也通过插件实现，和其他框架一视同仁：

<img src="https://gitee.com/57code/picgo/raw/master/image-20210114183159562.png" style="zoom:80%;" />



SFC定义默认使用`setup script`，语法比较激进，但更简洁，好评！

<img src="https://gitee.com/57code/picgo/raw/master/image-20210116192013356.png" style="zoom:40%;" />

#### 别名定义

不再需要像`vite1`一样在别名前后加上`/`，这和`webpack`项目配置可以保持一致便于移植，好评！

```js
import path from 'path'

export default {
  alias: {
    "@": path.resolve(__dirname, "src"),
    "comps": path.resolve(__dirname, "src/components"),
  },
}
```

`App.vue`里面用一下试试

```vue
<script setup>
import HelloWorld from 'comps/HelloWorld.vue'
</script>
```



#### 插件API重新设计

`Vite2`主要变化在插件体系，这样更标准化、易扩展。`Vite2`插件API扩展自`Rollup`插件体系，因此能兼容现存的`Rollup`插件，编写的Vite插件也可以同时运行于开发和创建，好评！

> 插件编写我会另开专题讨论，欢迎大家关注我。



##### Vue3 Jsx支持

`vue3`中`jsx`支持需要引入插件：`@vitejs/plugin-vue-jsx`

```bash
$ npm i @vitejs/plugin-vue-jsx -D
```

注册插件，`vite.config.js`

```js
import vueJsx from "@vitejs/plugin-vue-jsx";

export default {
  plugins: [vue(), vueJsx()],
}
```

用法也有要求，改造一下`App.vue`

```vue
<!-- 1.标记为jsx -->
<script setup lang="jsx">
import { defineComponent } from "vue";
import HelloWorld from "comps/HelloWorld.vue";
import logo from "./assets/logo.png"

// 2.用defineComponent定义组件且要导出
export default defineComponent({
  render: () => (
    <>
      <img alt="Vue logo" src={logo} />
      <HelloWorld msg="Hello Vue 3 + Vite" />
    </>
  ),
});
</script>
```



##### Mock插件应用

之前给大家介绍的[vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)已经重构支持了Vite2。



安装插件

```bash
npm i mockjs -S
```

```bash
npm i vite-plugin-mock cross-env -D
```



配置，`vite.config.js`

```js
import { viteMockServe } from 'vite-plugin-mock'

export default {
  plugins: [ viteMockServe({ supportTs: false }) ]
}
```



设置环境变量，`package.json`

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite",
    "build": "vite build"
  },
} 
```





### 项目基础架构

#### 路由

安装`vue-router 4.x`

```js
npm i vue-router@next -S
```

<img src="https://gitee.com/57code/picgo/raw/master/image-20210118170758418.png" style="zoom:33%;" />



路由配置，`router/index.js`

```js
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('views/home.vue') }
  ]
});

export default router
```



引入，`main.js`

```js
import router from "@/router";
createApp(App).use(router).mount("#app");
```

> 别忘了创建`home.vue`并修改`App.vue`
>
> 路由用法略有变化，[村长的视频教程](https://www.bilibili.com/video/BV1Wh411X7Xp?p=19)



#### 状态管理

安装`vuex 4.x`

```bash
npm i vuex@next -S
```

<img src="https://gitee.com/57code/picgo/raw/master/image-20210118181504903.png" alt="image" style="zoom:33%;" />



Store配置，`store/index.js`

```js
import {createStore} from 'vuex';

export default createStore({
  state: {
    couter: 0
  }
});
```



引入，`main.js`

```js
import store from "@/store";
createApp(App).use(store).mount("#app");
```

> 用法和以前基本一样，[村长的视频教程](https://www.bilibili.com/video/BV1Wh411X7Xp?p=23)





#### 样式组织

 安装sass

```bash
npm i sass -D
```



`styles`目录保存各种样式

![截屏2020-12-24 上午11.51.30](https://gitee.com/57code/picgo/raw/master/%E6%88%AA%E5%B1%8F2020-12-24%20%E4%B8%8A%E5%8D%8811.51.30.png)

`index.scss`作为出口组织这些样式，同时编写一些全局样式

![image-20201224115414266](https://gitee.com/57code/picgo/raw/master/image-20201224115414266.png)

最后在`main.js`导入

```js
import "styles/index.scss";
```

> 注意在`vite.config.js`添加`styles`别名



#### UI库

就用我们[花果山团队](https://www.yuque.com/hugsun)自家的[element3](https://github.com/hug-sun/element3)。

> [中文文档](https://element3-ui.com/)



安装

```bash
npm i element3 -S
```



完整引入，`main.js`

```js
import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

createApp(App).use(element3)
```



按需引入，`main.js`

```js
import "element3/lib/theme-chalk/button.css";
import { ElButton } from "element3"
createApp(App).use(ElButton)
```



抽取成插件会更好，`plugins/element3.js`

```js
// 完整引入
import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

// 按需引入
// import { ElButton } from "element3";
// import "element3/lib/theme-chalk/button.css";

export default function (app) {
  // 完整引入
  app.use(element3)

  // 按需引入
  // app.use(ElButton);
}
```



测试

```html
<el-button>my button</el-button>
```



#### 基础布局

我们应用需要一个基本布局页，类似下图，将来每个页面以布局页为父页面即可：

![image-20201223143247535](https://gitee.com/57code/picgo/raw/master/image-20201223143247535.png)



布局页面，`layout/index.vue`

```vue
<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container"></div>
    <!-- 内容容器 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <navbar />
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar.vue";
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
```

> 别忘了创建`AppMain.vue`和`Navbar.vue`



路由配置，`router/index.js`

```js
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
```



#### 动态导航

##### 侧边导航

根据路由表动态生成侧边导航菜单。

![image-20201225180300250](https://gitee.com/57code/picgo/raw/master/image-20201225180300250.png)



首先创建侧边栏组件，递归输出`routes`中的配置为多级菜单，`layout/Sidebar/index.vue`

```vue
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { routes } from "@/router";
import variables from "styles/variables.module.scss";

const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

```

> 注意：`sass`文件导出变量解析需要用到`css module`，因此`variables`文件要加上`module`中缀。



添加相关样式：

- `styles/variables.module.scss`
- `styles/sidebar.scss`
- `styles/index.scss`中引入



创建`SidebarItem.vue`组件，解析当前路由是导航链接还是父菜单：

![image-20201229123955087](https://gitee.com/57code/picgo/raw/master/image-20201229123955087.png)



##### 面包屑

通过路由匹配数组可以动态生成面包屑。



面包屑组件，`layouts/components/Breadcrumb.vue`

```vue
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from "path-to-regexp";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const levelList = ref(null);
const router = useRouter();
const route = useRoute();

const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);

  const first = matched[0];
  if (first.path !== "/") {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
}

const pathCompile = (path) => {  
  var toPath = compile(path);
  return toPath(route.params);
}

const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
}

getBreadcrumb();
watch(route, getBreadcrumb)

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
```

> 别忘了添加依赖：`path-to-regexp`
>
> 注意：`vue-router4`已经不再使用`path-to-regexp`解析动态`path`，因此这里后续还需要改进。



#### 数据封装

统一封装数据请求服务，有利于解决一下问题：

- 统一配置请求
- 请求、响应统一处理



准备工作：

- 安装`axios`: 

  ```bash
  npm i axios -S
  ```

- 添加配置文件：`.env.development`

  ```
  VITE_BASE_API=/api
  ```



请求封装，`utils/request.js`

```js
import axios from "axios";
import { Message, Msgbox } from "element3";

// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求时携带cookie
  // withCredentials: true,
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 模拟指定请求令牌
    config.headers["X-Token"] = "my token";
    return config;
  },
  (error) => {
    // 请求错误的统一处理
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  (response) => {
    const res = response.data;

    // 如果状态码不是20000则认为有错误
    if (res.code !== 20000) {
      Message.error({
        message: res.message || "Error",
        duration: 5 * 1000,
      });

      // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        Msgbox.confirm("您已登出, 请重新登录", "确认", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

```



#### 业务处理

##### 结构化数据展示

使用`el-table`展示结构化数据，配合`el-pagination`做数据分页。

![image-20210201110626262](https://gitee.com/57code/picgo/raw/master/image-20210201110626262.png)

文件组织结构如下：`list.vue`展示列表，`edit.vue`和`create.vue`编辑或创建，内部复用`detail.vue`处理，`model`中负责数据业务处理。

![image-20210201110542893](https://gitee.com/57code/picgo/raw/master/image-20210201110542893.png)

`list.vue`中的数据展示

```vue
<el-table v-loading="loading" :data="list">
  <el-table-column label="ID" prop="id"></el-table-column>
  <el-table-column label="账户名" prop="name"></el-table-column>
  <el-table-column label="年龄" prop="age"></el-table-column>
</el-table>
```



`list`和`loading`数据的获取逻辑，可以使用`compsition-api`提取到`userModel.js`

```js
export function useList() {
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [], // 列表数据
  });

  // 获取列表
  function getList() {
    state.loading = true;
    return request({
      url: "/getUsers",
      method: "get",
    }).then(({ data, total }) => {
      // 设置列表数据
      state.list = data;
    }).finally(() => {
      state.loading = false;
    });
  }
  
  // 首次获取数据
  getList();

  return { state, getList };
}
```



`list.vue`中使用

```js
import { useList } from "./model/userModel";
```

```js
const { state, getList } = useList();
```



分页处理，`list.vue`

```html
<pagination
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
```

数据也在`userModel`中处理

```js
const state = reactive({
  total: 0,   // 总条数
  listQuery: {// 分页查询参数
    page: 1,  // 当前页码
    limit: 5, // 每页条数
  },
});
```

```js
request({
  url: "/getUsers",
  method: "get",
  params: state.listQuery, // 在查询中加入分页参数
})
```



##### 表单处理

用户数据新增、编辑使用`el-form`处理



可用一个组件`detail.vue`来处理，区别仅在于初始化时是否获取信息回填到表单。

```html
<el-form ref="form" :model="model" :rules="rules">
  <el-form-item prop="name" label="用户名">
    <el-input v-model="model.name"></el-input>
  </el-form-item>
  <el-form-item prop="age" label="用户年龄">
    <el-input v-model.number="model.age"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="submitForm" type="primary">提交</el-button>
  </el-form-item>
</el-form>
```



数据处理同样可以提取到`userModel`中处理。

```js
export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  // 初始化时，根据isEdit判定是否需要获取详情
  onMounted(() => {
    if (isEdit && id) {
      // 获取详情
      request({
        url: "/getUser",
        method: "get",
        params: { id },
      }).then(({ data }) => {
        model.value = data;
      });
    }
  });
  return { model };
}
```

### 配套视频演示

我专门录了一套视频演示本文所做的所有操作，喜欢看视频学习的小伙伴移步：
[「备战2021」Vite2 + Vue3项目最佳实践](https://www.bilibili.com/video/BV1vX4y1K7bQ)

制作不易，求`3连`，求`关注`


### 关注村长

欢迎关注我的公众号「村长学前端」跟我一起学习最新前端知识。

