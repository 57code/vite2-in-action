<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
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
