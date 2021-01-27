<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>
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
import Sidebar from "./components/Sidebar/index.vue";
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
